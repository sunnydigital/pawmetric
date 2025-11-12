from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

from app.models import ScanType, ScanStatus, ActivityType, DocumentType


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    refresh_token: str


# Pet Schemas
class PetBase(BaseModel):
    name: str
    breed: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[float] = None
    gender: Optional[str] = None
    birthday: Optional[datetime] = None
    microchip_id: Optional[str] = None


class PetCreate(PetBase):
    pass


class PetUpdate(BaseModel):
    name: Optional[str] = None
    breed: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[float] = None
    gender: Optional[str] = None
    birthday: Optional[datetime] = None
    microchip_id: Optional[str] = None


class HealthScoreResponse(BaseModel):
    id: UUID
    pet_id: UUID
    overall_score: int
    eye_score: Optional[int] = None
    ear_score: Optional[int] = None
    nose_score: Optional[int] = None
    dental_score: Optional[int] = None
    skin_coat_score: Optional[int] = None
    neck_throat_score: Optional[int] = None
    body_score: Optional[int] = None
    legs_joints_score: Optional[int] = None
    paws_nails_score: Optional[int] = None
    last_updated: datetime

    model_config = ConfigDict(from_attributes=True)


class PetResponse(PetBase):
    id: UUID
    user_id: UUID
    photo_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    health_score: Optional[HealthScoreResponse] = None

    model_config = ConfigDict(from_attributes=True)


# Health Scan Schemas
class HealthScanCreate(BaseModel):
    pet_id: UUID
    scan_type: ScanType
    notes: Optional[str] = None


class HealthScanResponse(BaseModel):
    id: UUID
    pet_id: UUID
    scan_type: ScanType
    image_url: str
    status: ScanStatus
    score: Optional[int] = None
    findings: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None
    scanned_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Activity Schemas
class ActivityCreate(BaseModel):
    pet_id: UUID
    type: ActivityType
    title: str
    description: Optional[str] = None
    data: Optional[Dict[str, Any]] = None
    timestamp: Optional[datetime] = None


class ActivityResponse(BaseModel):
    id: UUID
    pet_id: UUID
    type: ActivityType
    title: str
    description: Optional[str] = None
    data: Optional[Dict[str, Any]] = None
    image_url: Optional[str] = None
    timestamp: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Veterinarian Schemas
class VeterinarianBase(BaseModel):
    name: str
    clinic_name: str
    specialty: Optional[List[str]] = None
    address: str
    city: str
    state: str
    zip_code: str
    latitude: float
    longitude: float
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    hours: Optional[Dict[str, Any]] = None
    rating: Optional[float] = None
    review_count: int = 0
    image_url: Optional[str] = None
    description: Optional[str] = None
    accepts_emergencies: bool = False


class VeterinarianCreate(VeterinarianBase):
    pass


class VeterinarianResponse(VeterinarianBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Chat Message Schemas
class ChatMessageCreate(BaseModel):
    vet_id: Optional[UUID] = None
    message: str
    is_from_user: bool = True


class ChatMessageResponse(BaseModel):
    id: UUID
    user_id: UUID
    vet_id: Optional[UUID] = None
    message: str
    is_from_user: bool
    attachment_url: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Document Schemas
class DocumentCreate(BaseModel):
    pet_id: UUID
    type: DocumentType
    title: str
    description: Optional[str] = None


class DocumentResponse(BaseModel):
    id: UUID
    pet_id: UUID
    type: DocumentType
    title: str
    description: Optional[str] = None
    file_url: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Analytics Schemas
class HealthTrendData(BaseModel):
    date: datetime
    score: int


class HealthAnalyticsResponse(BaseModel):
    pet_id: UUID
    current_score: int
    trend: List[HealthTrendData]
    total_scans: int
    scans_by_type: Dict[str, int]
    recent_activities: List[ActivityResponse]


# Response wrapper
class SuccessResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None
    message: Optional[str] = None
