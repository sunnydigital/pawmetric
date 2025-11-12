from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import get_db
from app.models import User, RefreshToken
from app.schemas import UserCreate, UserLogin, UserResponse, TokenResponse, RefreshTokenRequest
from app.auth import hash_password, verify_password, create_access_token, create_refresh_token, verify_token
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )

    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        password=hashed_password,
        name=user_data.name
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate tokens
    access_token = create_access_token(data={"sub": str(new_user.id), "email": new_user.email})
    refresh_token = create_refresh_token(data={"sub": str(new_user.id), "email": new_user.email})

    # Store refresh token
    expires_at = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    db_refresh_token = RefreshToken(
        token=refresh_token,
        user_id=new_user.id,
        expires_at=expires_at
    )
    db.add(db_refresh_token)
    db.commit()

    return {
        "success": True,
        "data": {
            "user": {
                "id": str(new_user.id),
                "email": new_user.email,
                "name": new_user.name,
                "created_at": new_user.created_at
            },
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    }


@router.post("/login", response_model=dict)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    # Find user
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Generate tokens
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
    refresh_token = create_refresh_token(data={"sub": str(user.id), "email": user.email})

    # Store refresh token
    expires_at = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    db_refresh_token = RefreshToken(
        token=refresh_token,
        user_id=user.id,
        expires_at=expires_at
    )
    db.add(db_refresh_token)
    db.commit()

    return {
        "success": True,
        "data": {
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.name,
                "created_at": user.created_at
            },
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    }


@router.post("/refresh", response_model=dict)
async def refresh_token(token_data: RefreshTokenRequest, db: Session = Depends(get_db)):
    """Refresh access token"""
    # Verify refresh token
    payload = verify_token(token_data.refresh_token, "refresh")

    # Check if token exists in database
    db_token = db.query(RefreshToken).filter(RefreshToken.token == token_data.refresh_token).first()
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    # Check if token is expired
    if db_token.expires_at < datetime.utcnow():
        db.delete(db_token)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expired"
        )

    # Generate new access token
    user_id = payload.get("sub")
    email = payload.get("email")
    access_token = create_access_token(data={"sub": user_id, "email": email})

    return {
        "success": True,
        "data": {
            "access_token": access_token,
            "token_type": "bearer"
        }
    }


@router.post("/logout", response_model=dict)
async def logout(token_data: RefreshTokenRequest, db: Session = Depends(get_db)):
    """Logout user"""
    # Delete refresh token
    db.query(RefreshToken).filter(RefreshToken.token == token_data.refresh_token).delete()
    db.commit()

    return {
        "success": True,
        "message": "Logged out successfully"
    }
