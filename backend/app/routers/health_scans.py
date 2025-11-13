from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import os
import random
from datetime import datetime

from app.database import get_db
from app.models import User, Pet, HealthScan, HealthScore, ScanType, ScanStatus
from app.schemas import HealthScanResponse, HealthScoreResponse
from app.auth import get_current_user
from app.config import settings

router = APIRouter(prefix="/health-scans", tags=["Health Scans"])


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_health_scan(
    pet_id: uuid.UUID = Form(...),
    scan_type: ScanType = Form(...),
    notes: Optional[str] = Form(None),
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new health scan"""
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
    filename = f"scan-{pet_id}-{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, "scans", filename)

    with open(file_path, "wb") as buffer:
        content = await image.read()
        buffer.write(content)

    # Mock AI analysis (replace with actual AI model in production)
    mock_score = random.randint(80, 98)
    mock_findings = {
        "status": "healthy" if mock_score > 85 else "needs_attention",
        "details": "No abnormalities detected. Continue regular monitoring." if mock_score > 85
                   else "Minor concerns detected. Consider scheduling a vet visit.",
        "confidence": round(random.uniform(0.80, 0.95), 2),
        "analyzed_at": datetime.utcnow().isoformat()
    }

    # Create health scan record
    health_scan = HealthScan(
        pet_id=pet_id,
        scan_type=scan_type,
        image_url=f"/uploads/scans/{filename}",
        status=ScanStatus.COMPLETED,
        score=mock_score,
        findings=mock_findings,
        notes=notes
    )

    db.add(health_scan)
    db.commit()
    db.refresh(health_scan)

    # Update health score
    health_score = db.query(HealthScore).filter(HealthScore.pet_id == pet_id).first()
    if health_score:
        # Map scan type to score field
        score_mapping = {
            ScanType.EYE: "eye_score",
            ScanType.EAR: "ear_score",
            ScanType.NOSE: "nose_score",
            ScanType.DENTAL: "dental_score",
            ScanType.SKIN_COAT: "skin_coat_score",
            ScanType.NECK_THROAT: "neck_throat_score",
            ScanType.BODY_ABDOMEN: "body_score",
            ScanType.LEGS_JOINTS: "legs_joints_score",
            ScanType.PAWS_NAILS: "paws_nails_score"
        }

        if scan_type in score_mapping:
            setattr(health_score, score_mapping[scan_type], mock_score)

        # Recalculate overall score
        all_scans = db.query(HealthScan).filter(
            HealthScan.pet_id == pet_id,
            HealthScan.status == ScanStatus.COMPLETED,
            HealthScan.score.isnot(None)
        ).all()

        if all_scans:
            avg_score = sum(scan.score for scan in all_scans) // len(all_scans)
            health_score.overall_score = avg_score
            health_score.last_updated = datetime.utcnow()

        db.commit()

    return {
        "success": True,
        "data": {"health_scan": HealthScanResponse.model_validate(health_scan)}
    }


@router.get("/pet/{pet_id}", response_model=dict)
async def get_health_scans(
    pet_id: uuid.UUID,
    scan_type: Optional[ScanType] = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get health scans for a pet"""
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

    # Query health scans
    query = db.query(HealthScan).filter(HealthScan.pet_id == pet_id)

    if scan_type:
        query = query.filter(HealthScan.scan_type == scan_type)

    health_scans = query.order_by(HealthScan.scanned_at.desc()).limit(limit).all()
    scans_data = [HealthScanResponse.model_validate(scan) for scan in health_scans]

    return {
        "success": True,
        "data": {"scans": scans_data}
    }


@router.get("/pet/{pet_id}/score", response_model=dict)
async def get_health_score(
    pet_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get health score for a pet"""
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

    health_score = db.query(HealthScore).filter(HealthScore.pet_id == pet_id).first()

    if not health_score:
        # Create default health score if not exists
        health_score = HealthScore(pet_id=pet_id, overall_score=85)
        db.add(health_score)
        db.commit()
        db.refresh(health_score)

    return {
        "success": True,
        "data": {"health_score": HealthScoreResponse.model_validate(health_score)}
    }


@router.get("/{scan_id}", response_model=dict)
async def get_health_scan(
    scan_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific health scan"""
    health_scan = db.query(HealthScan).filter(HealthScan.id == scan_id).first()

    if not health_scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health scan not found"
        )

    # Verify ownership through pet
    pet = db.query(Pet).filter(Pet.id == health_scan.pet_id).first()
    if pet.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this health scan"
        )

    return {
        "success": True,
        "data": {"health_scan": HealthScanResponse.model_validate(health_scan)}
    }
