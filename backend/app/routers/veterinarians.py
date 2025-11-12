from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
from math import radians, cos, sin, asin, sqrt

from app.database import get_db
from app.models import User, Veterinarian
from app.schemas import VeterinarianCreate, VeterinarianResponse
from app.auth import get_current_user

router = APIRouter(prefix="/veterinarians", tags=["Veterinarians"])


def haversine(lon1: float, lat1: float, lon2: float, lat2: float) -> float:
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    Returns distance in kilometers
    """
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    km = 6371 * c
    return km


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_veterinarian(
    vet_data: VeterinarianCreate,
    db: Session = Depends(get_db)
):
    """Create a new veterinarian (admin only in production)"""
    new_vet = Veterinarian(**vet_data.model_dump())

    db.add(new_vet)
    db.commit()
    db.refresh(new_vet)

    vet_dict = {
        "id": str(new_vet.id),
        "name": new_vet.name,
        "clinic_name": new_vet.clinic_name,
        "specialty": new_vet.specialty,
        "address": new_vet.address,
        "city": new_vet.city,
        "state": new_vet.state,
        "zip_code": new_vet.zip_code,
        "latitude": new_vet.latitude,
        "longitude": new_vet.longitude,
        "phone": new_vet.phone,
        "email": new_vet.email,
        "website": new_vet.website,
        "hours": new_vet.hours,
        "rating": new_vet.rating,
        "review_count": new_vet.review_count,
        "image_url": new_vet.image_url,
        "description": new_vet.description,
        "accepts_emergencies": new_vet.accepts_emergencies,
        "created_at": new_vet.created_at.isoformat() if new_vet.created_at else None,
    }

    return {
        "success": True,
        "data": {"veterinarian": vet_dict}
    }


@router.get("", response_model=dict)
async def get_veterinarians(
    latitude: Optional[float] = Query(None, description="User's latitude"),
    longitude: Optional[float] = Query(None, description="User's longitude"),
    radius: float = Query(50, description="Search radius in kilometers"),
    specialty: Optional[str] = Query(None, description="Filter by specialty"),
    accepts_emergencies: Optional[bool] = Query(None, description="Filter by emergency services"),
    limit: int = Query(50, le=100),
    db: Session = Depends(get_db)
):
    """Get veterinarians with optional filters"""
    query = db.query(Veterinarian)

    # Filter by specialty
    if specialty:
        query = query.filter(Veterinarian.specialty.contains([specialty]))

    # Filter by emergency services
    if accepts_emergencies is not None:
        query = query.filter(Veterinarian.accepts_emergencies == accepts_emergencies)

    vets = query.limit(limit).all()

    # Calculate distance if coordinates provided
    if latitude is not None and longitude is not None:
        vet_list = []
        for vet in vets:
            distance = haversine(longitude, latitude, vet.longitude, vet.latitude)
            if distance <= radius:
                vet_dict = {
                    "id": str(vet.id),
                    "name": vet.name,
                    "clinic_name": vet.clinic_name,
                    "specialty": vet.specialty,
                    "address": vet.address,
                    "city": vet.city,
                    "state": vet.state,
                    "zip_code": vet.zip_code,
                    "latitude": vet.latitude,
                    "longitude": vet.longitude,
                    "phone": vet.phone,
                    "email": vet.email,
                    "website": vet.website,
                    "hours": vet.hours,
                    "rating": vet.rating,
                    "review_count": vet.review_count,
                    "image_url": vet.image_url,
                    "description": vet.description,
                    "accepts_emergencies": vet.accepts_emergencies,
                    "created_at": vet.created_at.isoformat() if vet.created_at else None,
                    "distance": round(distance, 2)
                }
                vet_list.append(vet_dict)

        # Sort by distance
        vet_list.sort(key=lambda x: x["distance"])
        return {
            "success": True,
            "data": {"veterinarians": vet_list}
        }

    # Convert vets to dictionaries
    vet_list = []
    for vet in vets:
        vet_dict = {
            "id": str(vet.id),
            "name": vet.name,
            "clinic_name": vet.clinic_name,
            "specialty": vet.specialty,
            "address": vet.address,
            "city": vet.city,
            "state": vet.state,
            "zip_code": vet.zip_code,
            "latitude": vet.latitude,
            "longitude": vet.longitude,
            "phone": vet.phone,
            "email": vet.email,
            "website": vet.website,
            "hours": vet.hours,
            "rating": vet.rating,
            "review_count": vet.review_count,
            "image_url": vet.image_url,
            "description": vet.description,
            "accepts_emergencies": vet.accepts_emergencies,
            "created_at": vet.created_at.isoformat() if vet.created_at else None,
        }
        vet_list.append(vet_dict)

    return {
        "success": True,
        "data": {"veterinarians": vet_list}
    }


@router.get("/{vet_id}", response_model=dict)
async def get_veterinarian(
    vet_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    """Get a specific veterinarian"""
    vet = db.query(Veterinarian).filter(Veterinarian.id == vet_id).first()

    if not vet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found"
        )

    vet_dict = {
        "id": str(vet.id),
        "name": vet.name,
        "clinic_name": vet.clinic_name,
        "specialty": vet.specialty,
        "address": vet.address,
        "city": vet.city,
        "state": vet.state,
        "zip_code": vet.zip_code,
        "latitude": vet.latitude,
        "longitude": vet.longitude,
        "phone": vet.phone,
        "email": vet.email,
        "website": vet.website,
        "hours": vet.hours,
        "rating": vet.rating,
        "review_count": vet.review_count,
        "image_url": vet.image_url,
        "description": vet.description,
        "accepts_emergencies": vet.accepts_emergencies,
        "created_at": vet.created_at.isoformat() if vet.created_at else None,
    }

    return {
        "success": True,
        "data": {"veterinarian": vet_dict}
    }


@router.put("/{vet_id}", response_model=dict)
async def update_veterinarian(
    vet_id: uuid.UUID,
    vet_data: VeterinarianCreate,
    db: Session = Depends(get_db)
):
    """Update a veterinarian (admin only in production)"""
    vet = db.query(Veterinarian).filter(Veterinarian.id == vet_id).first()

    if not vet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found"
        )

    # Update fields
    update_data = vet_data.model_dump()
    for field, value in update_data.items():
        setattr(vet, field, value)

    db.commit()
    db.refresh(vet)

    vet_dict = {
        "id": str(vet.id),
        "name": vet.name,
        "clinic_name": vet.clinic_name,
        "specialty": vet.specialty,
        "address": vet.address,
        "city": vet.city,
        "state": vet.state,
        "zip_code": vet.zip_code,
        "latitude": vet.latitude,
        "longitude": vet.longitude,
        "phone": vet.phone,
        "email": vet.email,
        "website": vet.website,
        "hours": vet.hours,
        "rating": vet.rating,
        "review_count": vet.review_count,
        "image_url": vet.image_url,
        "description": vet.description,
        "accepts_emergencies": vet.accepts_emergencies,
        "created_at": vet.created_at.isoformat() if vet.created_at else None,
    }

    return {
        "success": True,
        "data": {"veterinarian": vet_dict}
    }


@router.delete("/{vet_id}", response_model=dict)
async def delete_veterinarian(
    vet_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    """Delete a veterinarian (admin only in production)"""
    vet = db.query(Veterinarian).filter(Veterinarian.id == vet_id).first()

    if not vet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found"
        )

    db.delete(vet)
    db.commit()

    return {
        "success": True,
        "message": "Veterinarian deleted successfully"
    }
