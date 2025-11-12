from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import uuid
from datetime import datetime, timedelta

from app.database import get_db
from app.models import User, Pet, HealthScan, Activity, HealthScore, ScanType, ActivityType
from app.auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard", response_model=dict)
async def get_user_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard stats for the current user"""
    # Get all user's pets
    pets = db.query(Pet).filter(Pet.user_id == current_user.id).all()

    if not pets:
        return {
            "success": True,
            "data": {
                "total_pets": 0,
                "total_scans": 0,
                "total_activities": 0,
                "average_health_score": 0
            }
        }

    # Get total scans across all pets
    total_scans = db.query(func.count(HealthScan.id)).join(Pet).filter(
        Pet.user_id == current_user.id
    ).scalar() or 0

    # Get total activities across all pets
    total_activities = db.query(func.count(Activity.id)).join(Pet).filter(
        Pet.user_id == current_user.id
    ).scalar() or 0

    # Calculate average health score across all pets
    health_scores = db.query(HealthScore).join(Pet).filter(
        Pet.user_id == current_user.id
    ).all()

    avg_health_score = 0
    if health_scores:
        total_score = sum(hs.overall_score for hs in health_scores if hs.overall_score)
        avg_health_score = round(total_score / len(health_scores), 1) if health_scores else 0

    return {
        "success": True,
        "data": {
            "total_pets": len(pets),
            "total_scans": total_scans,
            "total_activities": total_activities,
            "average_health_score": avg_health_score
        }
    }


@router.get("/pet/{pet_id}/health-trends", response_model=dict)
async def get_health_trends(
    pet_id: uuid.UUID,
    days: int = Query(30, ge=1, le=365, description="Number of days to analyze"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get health score trends for a pet"""
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

    # Get date range
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)

    # Get health scans in date range
    scans = db.query(HealthScan).filter(
        HealthScan.pet_id == pet_id,
        HealthScan.scanned_at >= start_date,
        HealthScan.scanned_at <= end_date,
        HealthScan.score.isnot(None)
    ).order_by(HealthScan.scanned_at.asc()).all()

    # Group by date and calculate average score per day
    trend_data = []
    for scan in scans:
        trend_data.append({
            "date": scan.scanned_at.isoformat(),
            "score": scan.score,
            "scan_type": scan.scan_type.value
        })

    return {
        "success": True,
        "data": {
            "trend": trend_data,
            "period_days": days
        }
    }


@router.get("/pet/{pet_id}/activity-summary", response_model=dict)
async def get_activity_summary(
    pet_id: uuid.UUID,
    days: int = Query(30, ge=1, le=365),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get activity summary for a pet"""
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

    # Get date range
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)

    # Get activities in date range
    activities = db.query(Activity).filter(
        Activity.pet_id == pet_id,
        Activity.timestamp >= start_date,
        Activity.timestamp <= end_date
    ).all()

    # Count by type
    activity_counts = {}
    for activity_type in ActivityType:
        count = sum(1 for a in activities if a.type == activity_type)
        activity_counts[activity_type.value] = count

    # Get recent activities
    recent_activities = db.query(Activity).filter(
        Activity.pet_id == pet_id
    ).order_by(Activity.timestamp.desc()).limit(10).all()

    return {
        "success": True,
        "data": {
            "activity_counts": activity_counts,
            "total_activities": len(activities),
            "recent_activities": recent_activities,
            "period_days": days
        }
    }


@router.get("/pet/{pet_id}/scan-statistics", response_model=dict)
async def get_scan_statistics(
    pet_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get scan statistics for a pet"""
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

    # Get all scans
    scans = db.query(HealthScan).filter(HealthScan.pet_id == pet_id).all()

    # Count by scan type
    scans_by_type = {}
    for scan_type in ScanType:
        count = sum(1 for s in scans if s.scan_type == scan_type)
        scans_by_type[scan_type.value] = count

    # Calculate average score by type
    avg_scores_by_type = {}
    for scan_type in ScanType:
        type_scans = [s for s in scans if s.scan_type == scan_type and s.score is not None]
        if type_scans:
            avg_score = sum(s.score for s in type_scans) / len(type_scans)
            avg_scores_by_type[scan_type.value] = round(avg_score, 1)
        else:
            avg_scores_by_type[scan_type.value] = None

    # Get current health score
    health_score = db.query(HealthScore).filter(HealthScore.pet_id == pet_id).first()

    return {
        "success": True,
        "data": {
            "total_scans": len(scans),
            "scans_by_type": scans_by_type,
            "avg_scores_by_type": avg_scores_by_type,
            "current_health_score": health_score
        }
    }


@router.get("/pet/{pet_id}/dashboard", response_model=dict)
async def get_dashboard_data(
    pet_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get comprehensive dashboard data for a pet"""
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

    # Get health score
    health_score = db.query(HealthScore).filter(HealthScore.pet_id == pet_id).first()

    # Get recent scans (last 5)
    recent_scans = db.query(HealthScan).filter(
        HealthScan.pet_id == pet_id
    ).order_by(HealthScan.scanned_at.desc()).limit(5).all()

    # Get recent activities (last 10)
    recent_activities = db.query(Activity).filter(
        Activity.pet_id == pet_id
    ).order_by(Activity.timestamp.desc()).limit(10).all()

    # Get total counts
    total_scans = db.query(func.count(HealthScan.id)).filter(HealthScan.pet_id == pet_id).scalar()
    total_activities = db.query(func.count(Activity.id)).filter(Activity.pet_id == pet_id).scalar()

    return {
        "success": True,
        "data": {
            "pet": pet,
            "health_score": health_score,
            "recent_scans": recent_scans,
            "recent_activities": recent_activities,
            "statistics": {
                "total_scans": total_scans,
                "total_activities": total_activities
            }
        }
    }
