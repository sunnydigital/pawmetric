from datetime import datetime, timedelta
from typing import Optional
import hashlib
import base64
import bcrypt
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import User

# HTTP Bearer token
security = HTTPBearer()


def _pre_hash_password(password: str) -> bytes:
    """Pre-hash password with SHA256 to handle bcrypt's 72-byte limit

    Uses base64 encoding to keep the result under 72 bytes (44 chars for base64 of 32 bytes)
    Returns bytes ready for bcrypt
    """
    hash_bytes = hashlib.sha256(password.encode('utf-8')).digest()
    return base64.b64encode(hash_bytes)


def hash_password(password: str) -> str:
    """Hash a password using SHA256 + bcrypt"""
    pre_hashed = _pre_hash_password(password)
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pre_hashed, salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash

    Supports multiple password formats for backward compatibility:
    1. New format: SHA256 (base64) + bcrypt
    2. Old format: SHA256 (hexdigest) + bcrypt
    3. Legacy format: Direct bcrypt (for very old passwords)
    """
    hashed_bytes = hashed_password.encode('utf-8')

    # Try new method first (SHA256 base64 pre-hashed)
    try:
        pre_hashed = _pre_hash_password(plain_password)
        if bcrypt.checkpw(pre_hashed, hashed_bytes):
            return True
    except (ValueError, Exception):
        # If new method fails, fall through to try old methods
        pass

    # Try old hexdigest method (for passwords created before this fix)
    try:
        pre_hashed_hex = hashlib.sha256(plain_password.encode('utf-8')).hexdigest().encode('utf-8')
        if bcrypt.checkpw(pre_hashed_hex, hashed_bytes):
            return True
    except (ValueError, Exception):
        pass

    # Fall back to direct password method for very old passwords
    # This handles passwords that were hashed before the SHA256 pre-hashing fix
    try:
        # Only try if password is within bcrypt's 72-byte limit
        password_bytes = plain_password.encode('utf-8')
        if len(password_bytes) <= 72:
            if bcrypt.checkpw(password_bytes, hashed_bytes):
                return True
    except (ValueError, Exception):
        pass

    return False


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

    return encoded_jwt


def create_refresh_token(data: dict) -> str:
    """Create a JWT refresh token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

    return encoded_jwt


def verify_token(token: str, token_type: str = "access") -> dict:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])

        if payload.get("type") != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get the current authenticated user"""
    token = credentials.credentials
    payload = verify_token(token, "access")

    user_id: str = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user
