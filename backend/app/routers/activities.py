from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import uuid
import os
import json
from datetime import datetime

from app.database import get_db
from app.models import User, Pet, Activity, ActivityType
from app.schemas import ActivityCreate, ActivityResponse
from app.auth import get_current_user
from app.config import settings

router = APIRouter(prefix="/activities", tags=["Activities"])


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_activity(
    activity_data: ActivityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new activity"""
    # Verify pet ownership
    pet = db.query(Pet).filter(Pet.id == activity_data.pet_id).first()
    if not pet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pet not found"
        )

    if pet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this pet"
        )

    # Create activity
    activity = Activity(
        pet_id=activity_data.pet_id,
        type=activity_data.type,
        title=activity_data.title,
        description=activity_data.description,
        data=activity_data.data,
        timestamp=activity_data.timestamp or datetime.utcnow()
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return {
        "success": True,
        "data": {"activity": activity}
    }


@router.post("/with-image", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_activity_with_image(
    pet_id: uuid.UUID = Form(...),
    type: ActivityType = Form(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    data: Optional[str] = Form(None),
    timestamp: Optional[str] = Form(None),
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new activity with an image"""
    # Verify pet ownership
    pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if not pet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pet not found"
        )

    if pet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this pet"
        )

    # Save image file
    file_extension = os.path.splitext(image.filename)[1]
    filename = f"activity-{pet_id}-{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, "activities", filename)

    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "wb") as buffer:
        content = await image.read()
        buffer.write(content)

    # Parse data JSON if provided
    parsed_data = json.loads(data) if data else None

    # Parse timestamp if provided
    parsed_timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00')) if timestamp else datetime.utcnow()

    # Create activity
    activity = Activity(
        pet_id=pet_id,
        type=type,
        title=title,
        description=description,
        data=parsed_data,
        image_url=f"/uploads/activities/{filename}",
        timestamp=parsed_timestamp
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return {
        "success": True,
        "data": {"activity": activity}
    }


@router.get("/pet/{pet_id}", response_model=dict)
async def get_activities(
    pet_id: uuid.UUID,
    type: Optional[ActivityType] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get activities for a pet"""
    # Verify pet ownership
    pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if not pet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pet not found"
        )

    if pet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this pet"
        )

    # Query activities
    query = db.query(Activity).filter(Activity.pet_id == pet_id)

    if type:
        query = query.filter(Activity.type == type)

    if start_date:
        query = query.filter(Activity.timestamp >= start_date)

    if end_date:
        query = query.filter(Activity.timestamp <= end_date)

    activities = query.order_by(Activity.timestamp.desc()).limit(limit).all()

    return {
        "success": True,
        "data": {"activities": activities}
    }


@router.get("/{activity_id}", response_model=dict)
async def get_activity(
    activity_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific activity"""
    activity = db.query(Activity).filter(Activity.id == activity_id).first()

    if not activity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Activity not found"
        )

    # Verify ownership through pet
    pet = db.query(Pet).filter(Pet.id == activity.pet_id).first()
    if pet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this activity"
        )

    return {
        "success": True,
        "data": {"activity": activity}
    }


@router.delete("/{activity_id}", response_model=dict)
async def delete_activity(
    activity_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an activity"""
    activity = db.query(Activity).filter(Activity.id == activity_id).first()

    if not activity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Activity not found"
        )

    # Verify ownership through pet
    pet = db.query(Pet).filter(Pet.id == activity.pet_id).first()
    if pet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this activity"
        )

    db.delete(activity)
    db.commit()

    return {
        "success": True,
        "message": "Activity deleted successfully"
    }
