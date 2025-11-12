from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import json
from datetime import datetime

from app.database import get_db
from app.models import User, ChatMessage, Veterinarian
from app.schemas import ChatMessageCreate, ChatMessageResponse
from app.auth import get_current_user

router = APIRouter(prefix="/chat", tags=["Chat"])


# Store active WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_message(self, message: dict, user_id: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(message)

    async def broadcast(self, message: dict):
        for connection in self.active_connections.values():
            await connection.send_json(message)


manager = ConnectionManager()


@router.post("/messages", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_message(
    message_data: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new chat message"""
    # Verify veterinarian exists if vet_id provided
    if message_data.vet_id:
        vet = db.query(Veterinarian).filter(Veterinarian.id == message_data.vet_id).first()
        if not vet:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Veterinarian not found"
            )

    # Create message
    message = ChatMessage(
        user_id=current_user.id,
        vet_id=message_data.vet_id,
        message=message_data.message,
        is_from_user=message_data.is_from_user
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    # Send to WebSocket if user is connected
    await manager.send_message(
        {
            "type": "new_message",
            "data": {
                "id": str(message.id),
                "message": message.message,
                "is_from_user": message.is_from_user,
                "created_at": message.created_at.isoformat()
            }
        },
        str(current_user.id)
    )

    return {
        "success": True,
        "data": {"message": message}
    }


@router.get("/messages", response_model=dict)
async def get_messages(
    vet_id: Optional[uuid.UUID] = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get chat messages for the current user"""
    query = db.query(ChatMessage).filter(ChatMessage.user_id == current_user.id)

    if vet_id:
        query = query.filter(ChatMessage.vet_id == vet_id)

    messages = query.order_by(ChatMessage.created_at.desc()).limit(limit).all()

    return {
        "success": True,
        "data": {"messages": messages}
    }


@router.get("/messages/{message_id}", response_model=dict)
async def get_message(
    message_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific message"""
    message = db.query(ChatMessage).filter(ChatMessage.id == message_id).first()

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )

    if message.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this message"
        )

    return {
        "success": True,
        "data": {"message": message}
    }


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str,
    db: Session = Depends(get_db)
):
    """WebSocket endpoint for real-time chat"""
    await manager.connect(websocket, user_id)

    try:
        while True:
            # Receive message from client
            data = await websocket.receive_json()

            # Handle different message types
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})

            elif data.get("type") == "message":
                # Save message to database
                message = ChatMessage(
                    user_id=uuid.UUID(user_id),
                    vet_id=uuid.UUID(data.get("vet_id")) if data.get("vet_id") else None,
                    message=data.get("message", ""),
                    is_from_user=data.get("is_from_user", True)
                )

                db.add(message)
                db.commit()
                db.refresh(message)

                # Send confirmation back
                await websocket.send_json({
                    "type": "message_sent",
                    "data": {
                        "id": str(message.id),
                        "message": message.message,
                        "created_at": message.created_at.isoformat()
                    }
                })

    except WebSocketDisconnect:
        manager.disconnect(user_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(user_id)
