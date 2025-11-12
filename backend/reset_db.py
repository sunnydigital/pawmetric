"""
Reset database by dropping all tables and re-seeding
"""
from app.database import Base, engine, init_db
from seed import seed_database


def reset_database():
    """Drop all tables and recreate them"""
    print("⚠️  Resetting database...")
    print("🗑️  Dropping all tables...")

    # Drop all tables
    Base.metadata.drop_all(bind=engine)
    print("✅ All tables dropped")

    # Recreate all tables
    print("📦 Recreating tables...")
    init_db()
    print("✅ Tables recreated")

    # Seed with sample data
    seed_database()


if __name__ == "__main__":
    reset_database()
