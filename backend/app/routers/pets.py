from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import uuid
import os

from app.database import get_db
from app.models import User, Pet, HealthScore
from app.schemas import PetCreate, PetUpdate, PetResponse
from app.auth import get_current_user
from app.config import settings

router = APIRouter(prefix="/pets", tags=["Pets"])


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_pet(
    pet_data: PetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new pet"""
    new_pet = Pet(
        user_id=current_user.id,
        name=pet_data.name,
        breed=pet_data.breed,
        age=pet_data.age,
        weight=pet_data.weight,
        gender=pet_data.gender,
        birthday=pet_data.birthday,
        microchip_id=pet_data.microchip_id
    )

    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)

    # Create initial health score
    health_score = HealthScore(pet_id=new_pet.id, overall_score=85)
    db.add(health_score)
    db.commit()
    db.refresh(health_score)

    return {
        "success": True,
        "data": {"pet": PetResponse.model_validate(new_pet)}
    }


@router.get("", response_model=dict)
async def get_pets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all pets for the current user"""
    pets = db.query(Pet).filter(Pet.user_id == current_user.id).all()

    # Convert to PetResponse objects
    pets_data = [PetResponse.model_validate(pet) for pet in pets]

    return {
        "success": True,
        "data": {"pets": pets_data}
    }


@router.get("/{pet_id}", response_model=dict)
async def get_pet(
    pet_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific pet"""
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

    return {
        "success": True,
        "data": {"pet": PetResponse.model_validate(pet)}
    }


@router.put("/{pet_id}", response_model=dict)
async def update_pet(
    pet_id: uuid.UUID,
    pet_data: PetUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a pet"""
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

    # Update fields
    update_data = pet_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(pet, field, value)

    db.commit()
    db.refresh(pet)

    return {
        "success": True,
        "data": {"pet": PetResponse.model_validate(pet)}
    }


@router.delete("/{pet_id}", response_model=dict)
async def delete_pet(
    pet_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a pet"""
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

    db.delete(pet)
    db.commit()

    return {
        "success": True,
        "message": "Pet deleted successfully"
    }


@router.post("/{pet_id}/photo", response_model=dict)
async def upload_pet_photo(
    pet_id: uuid.UUID,
    photo: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload pet photo"""
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

    # Save file
    file_extension = os.path.splitext(photo.filename)[1]
    filename = f"pet-{pet_id}-{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, "pets", filename)

    with open(file_path, "wb") as buffer:
        content = await photo.read()
        buffer.write(content)

    # Update pet photo URL
    pet.photo_url = f"/uploads/pets/{filename}"
    db.commit()
    db.refresh(pet)

    return {
        "success": True,
        "data": {"pet": PetResponse.model_validate(pet)}
    }
