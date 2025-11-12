from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Enum, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from datetime import datetime
import uuid
import enum

from app.database import Base


class ScanType(str, enum.Enum):
    EYE = "EYE"
    EAR = "EAR"
    NOSE = "NOSE"
    DENTAL = "DENTAL"
    SKIN_COAT = "SKIN_COAT"
    NECK_THROAT = "NECK_THROAT"
    BODY_ABDOMEN = "BODY_ABDOMEN"
    LEGS_JOINTS = "LEGS_JOINTS"
    PAWS_NAILS = "PAWS_NAILS"


class ScanStatus(str, enum.Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class ActivityType(str, enum.Enum):
    MEAL = "MEAL"
    WALK = "WALK"
    PLAY = "PLAY"
    MEDICATION = "MEDICATION"
    VET_VISIT = "VET_VISIT"
    GROOMING = "GROOMING"


class DocumentType(str, enum.Enum):
    VACCINATION_RECORD = "VACCINATION_RECORD"
    MEDICAL_RECORD = "MEDICAL_RECORD"
    LAB_RESULT = "LAB_RESULT"
    PRESCRIPTION = "PRESCRIPTION"
    INSURANCE = "INSURANCE"
    OTHER = "OTHER"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    pets = relationship("Pet", back_populates="user", cascade="all, delete-orphan")
    refresh_tokens = relationship("RefreshToken", back_populates="user", cascade="all, delete-orphan")
    chat_messages = relationship("ChatMessage", back_populates="user", cascade="all, delete-orphan")


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    token = Column(String, unique=True, nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="refresh_tokens")


class Pet(Base):
    __tablename__ = "pets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    breed = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True)
    gender = Column(String, nullable=True)
    birthday = Column(DateTime, nullable=True)
    photo_url = Column(String, nullable=True)
    microchip_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="pets")
    health_scans = relationship("HealthScan", back_populates="pet", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="pet", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="pet", cascade="all, delete-orphan")
    health_score = relationship("HealthScore", back_populates="pet", uselist=False, cascade="all, delete-orphan")


class HealthScore(Base):
    __tablename__ = "health_scores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pet_id = Column(UUID(as_uuid=True), ForeignKey("pets.id", ondelete="CASCADE"), unique=True, nullable=False)
    overall_score = Column(Integer, default=0)
    eye_score = Column(Integer, nullable=True)
    ear_score = Column(Integer, nullable=True)
    nose_score = Column(Integer, nullable=True)
    dental_score = Column(Integer, nullable=True)
    skin_coat_score = Column(Integer, nullable=True)
    neck_throat_score = Column(Integer, nullable=True)
    body_score = Column(Integer, nullable=True)
    legs_joints_score = Column(Integer, nullable=True)
    paws_nails_score = Column(Integer, nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow)

    # Relationships
    pet = relationship("Pet", back_populates="health_score")


class HealthScan(Base):
    __tablename__ = "health_scans"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pet_id = Column(UUID(as_uuid=True), ForeignKey("pets.id", ondelete="CASCADE"), nullable=False, index=True)
    scan_type = Column(Enum(ScanType), nullable=False, index=True)
    image_url = Column(String, nullable=False)
    status = Column(Enum(ScanStatus), default=ScanStatus.PENDING)
    score = Column(Integer, nullable=True)
    findings = Column(JSON, nullable=True)
    notes = Column(Text, nullable=True)
    scanned_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    pet = relationship("Pet", back_populates="health_scans")


class Activity(Base):
    __tablename__ = "activities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pet_id = Column(UUID(as_uuid=True), ForeignKey("pets.id", ondelete="CASCADE"), nullable=False, index=True)
    type = Column(Enum(ActivityType), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    data = Column(JSON, nullable=True)
    image_url = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    pet = relationship("Pet", back_populates="activities")


class Veterinarian(Base):
    __tablename__ = "veterinarians"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    clinic_name = Column(String, nullable=False)
    specialty = Column(ARRAY(String), nullable=True)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    website = Column(String, nullable=True)
    hours = Column(JSON, nullable=True)
    rating = Column(Float, nullable=True)
    review_count = Column(Integer, default=0)
    image_url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    accepts_emergencies = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    chat_messages = relationship("ChatMessage", back_populates="veterinarian")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    vet_id = Column(UUID(as_uuid=True), ForeignKey("veterinarians.id", ondelete="SET NULL"), nullable=True)
    message = Column(Text, nullable=False)
    is_from_user = Column(Boolean, default=True)
    attachment_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    user = relationship("User", back_populates="chat_messages")
    veterinarian = relationship("Veterinarian", back_populates="chat_messages")


class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pet_id = Column(UUID(as_uuid=True), ForeignKey("pets.id", ondelete="CASCADE"), nullable=False, index=True)
    type = Column(Enum(DocumentType), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    file_url = Column(String, nullable=False)
    file_size = Column(Integer, nullable=True)
    mime_type = Column(String, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    pet = relationship("Pet", back_populates="documents")
