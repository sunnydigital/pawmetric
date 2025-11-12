"""
Seed database with sample data for testing and development
"""
from sqlalchemy.orm import Session
import random
from datetime import datetime, timedelta

from app.database import SessionLocal, init_db
from app.models import User, Pet, HealthScore, Veterinarian, HealthScan, Activity, ScanType, ActivityType, ScanStatus
from app.auth import hash_password


def seed_database():
    """Seed the database with sample data"""
    print("🌱 Seeding database...")

    # Initialize database
    init_db()

    db: Session = SessionLocal()

    try:
        # Check if data already exists
        existing_users = db.query(User).count()
        if existing_users > 0:
            print("⚠️  Database already has data. Skipping seed.")
            return

        # Create sample users
        print("👤 Creating users...")
        users = [
            User(
                email="demo@pawmetric.com",
                password=hash_password("password123"),
                name="Demo User"
            ),
            User(
                email="john@example.com",
                password=hash_password("password123"),
                name="John Doe"
            )
        ]
        db.add_all(users)
        db.commit()
        print(f"✅ Created {len(users)} users")

        # Create sample pets
        print("🐕 Creating pets...")
        pets = [
            Pet(
                user_id=users[0].id,
                name="Max",
                breed="Golden Retriever",
                age=3,
                weight=30.5,
                gender="male",
                birthday=datetime.utcnow() - timedelta(days=3*365)
            ),
            Pet(
                user_id=users[0].id,
                name="Luna",
                breed="Labrador",
                age=2,
                weight=25.0,
                gender="female",
                birthday=datetime.utcnow() - timedelta(days=2*365)
            ),
            Pet(
                user_id=users[1].id,
                name="Charlie",
                breed="Beagle",
                age=5,
                weight=12.0,
                gender="male",
                birthday=datetime.utcnow() - timedelta(days=5*365)
            )
        ]
        db.add_all(pets)
        db.commit()
        print(f"✅ Created {len(pets)} pets")

        # Create health scores
        print("💊 Creating health scores...")
        for pet in pets:
            health_score = HealthScore(
                pet_id=pet.id,
                overall_score=random.randint(80, 95),
                eye_score=random.randint(85, 98),
                ear_score=random.randint(80, 95),
                nose_score=random.randint(85, 97),
                dental_score=random.randint(75, 90),
                skin_coat_score=random.randint(85, 98),
                neck_throat_score=random.randint(88, 96),
                body_score=random.randint(80, 95),
                legs_joints_score=random.randint(82, 94),
                paws_nails_score=random.randint(85, 97)
            )
            db.add(health_score)
        db.commit()
        print(f"✅ Created health scores")

        # Create sample veterinarians
        print("👨‍⚕️ Creating veterinarians...")
        veterinarians = [
            Veterinarian(
                name="Dr. Sarah Johnson",
                clinic_name="Happy Paws Veterinary Clinic",
                specialty=["General Practice", "Surgery"],
                address="123 Main St",
                city="San Francisco",
                state="CA",
                zip_code="94102",
                latitude=37.7749,
                longitude=-122.4194,
                phone="(555) 123-4567",
                email="info@happypaws.com",
                website="https://happypaws.com",
                hours={"mon-fri": "8:00-18:00", "sat": "9:00-14:00", "sun": "closed"},
                rating=4.8,
                review_count=234,
                description="Full-service veterinary clinic with experienced staff",
                accepts_emergencies=True
            ),
            Veterinarian(
                name="Dr. Michael Chen",
                clinic_name="Pet Care Center",
                specialty=["Cardiology", "Internal Medicine"],
                address="456 Oak Ave",
                city="San Francisco",
                state="CA",
                zip_code="94103",
                latitude=37.7699,
                longitude=-122.4211,
                phone="(555) 234-5678",
                email="contact@petcarecenter.com",
                rating=4.9,
                review_count=189,
                description="Specialized care for complex medical conditions",
                accepts_emergencies=False
            ),
            Veterinarian(
                name="Dr. Emily Rodriguez",
                clinic_name="24/7 Animal Hospital",
                specialty=["Emergency Care", "Critical Care"],
                address="789 Pine St",
                city="San Francisco",
                state="CA",
                zip_code="94104",
                latitude=37.7799,
                longitude=-122.4094,
                phone="(555) 345-6789",
                email="emergency@247animal.com",
                website="https://247animal.com",
                hours={"all": "24/7"},
                rating=4.7,
                review_count=456,
                description="24-hour emergency veterinary services",
                accepts_emergencies=True
            )
        ]
        db.add_all(veterinarians)
        db.commit()
        print(f"✅ Created {len(veterinarians)} veterinarians")

        # Create sample health scans
        print("📸 Creating health scans...")
        scan_types = [ScanType.EYE, ScanType.EAR, ScanType.DENTAL, ScanType.SKIN_COAT]
        for pet in pets[:2]:  # Only for first 2 pets
            for i, scan_type in enumerate(scan_types):
                scan = HealthScan(
                    pet_id=pet.id,
                    scan_type=scan_type,
                    image_url=f"/uploads/scans/sample-{scan_type.value.lower()}.jpg",
                    status=ScanStatus.COMPLETED,
                    score=random.randint(85, 98),
                    findings={
                        "status": "healthy",
                        "details": "No abnormalities detected",
                        "confidence": 0.92
                    },
                    scanned_at=datetime.utcnow() - timedelta(days=i*7)
                )
                db.add(scan)
        db.commit()
        print(f"✅ Created sample health scans")

        # Create sample activities
        print("🎾 Creating activities...")
        for pet in pets[:2]:
            # Meals
            for i in range(5):
                activity = Activity(
                    pet_id=pet.id,
                    type=ActivityType.MEAL,
                    title="Morning Meal",
                    description="Regular dog food",
                    data={"calories": 350, "food_type": "dry"},
                    timestamp=datetime.utcnow() - timedelta(days=i)
                )
                db.add(activity)

            # Walks
            for i in range(3):
                activity = Activity(
                    pet_id=pet.id,
                    type=ActivityType.WALK,
                    title="Morning Walk",
                    description="Park walk",
                    data={"duration_minutes": 30, "distance_km": 2.5},
                    timestamp=datetime.utcnow() - timedelta(days=i)
                )
                db.add(activity)
        db.commit()
        print(f"✅ Created sample activities")

        print("🎉 Database seeding completed successfully!")
        print("\n📝 Sample credentials:")
        print("   Email: demo@pawmetric.com")
        print("   Password: password123")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
