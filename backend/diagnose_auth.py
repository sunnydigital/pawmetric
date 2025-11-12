"""
Diagnostic script to check authentication issues
"""
import sys
from sqlalchemy.orm import Session

try:
    from app.database import SessionLocal
    from app.models import User
    from app.auth import hash_password, verify_password
except ImportError as e:
    print(f"Error importing modules: {e}")
    print("This script needs to be run in the same Python environment as the API")
    sys.exit(1)


def check_demo_user():
    """Check if demo user exists and test password verification"""
    print("🔍 Checking demo user authentication...")
    print("-" * 50)

    db: Session = SessionLocal()

    try:
        # Check if user exists
        user = db.query(User).filter(User.email == "demo@pawmetric.com").first()

        if not user:
            print("❌ Demo user NOT found in database")
            print("\n💡 Solution: Run the seed script to create demo user:")
            print("   cd /home/user/pawmetric/backend && python seed.py")
            return False

        print(f"✅ Demo user found:")
        print(f"   Email: {user.email}")
        print(f"   Name: {user.name}")
        print(f"   Created: {user.created_at}")
        print(f"   Password hash (first 50 chars): {user.password[:50]}...")

        # Test password verification
        print("\n🔐 Testing password verification...")
        test_password = "password123"

        is_valid = verify_password(test_password, user.password)

        if is_valid:
            print(f"✅ Password verification successful for '{test_password}'")
            print("\n🎉 Authentication should work!")
            print("   Try logging in with:")
            print("   Email: demo@pawmetric.com")
            print("   Password: password123")
            return True
        else:
            print(f"❌ Password verification FAILED for '{test_password}'")
            print("\n💡 Possible issues:")
            print("   1. Password was not hashed correctly")
            print("   2. Password hash format changed")
            print("   3. Database has old password format")
            print("\n💡 Solution: Reset demo user password:")
            print("   Run this script with --reset flag")
            return False

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        db.close()


def reset_demo_password():
    """Reset demo user password"""
    print("🔄 Resetting demo user password...")
    print("-" * 50)

    db: Session = SessionLocal()

    try:
        user = db.query(User).filter(User.email == "demo@pawmetric.com").first()

        if not user:
            print("❌ Demo user not found. Run seed script first.")
            return False

        # Reset password
        new_password = "password123"
        user.password = hash_password(new_password)
        db.commit()

        print(f"✅ Password reset successfully for {user.email}")
        print(f"   New password: {new_password}")

        # Verify it works
        is_valid = verify_password(new_password, user.password)
        if is_valid:
            print("✅ Password verification confirmed")
            return True
        else:
            print("❌ Password verification still failing")
            return False

    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        return False
    finally:
        db.close()


if __name__ == "__main__":
    if "--reset" in sys.argv:
        reset_demo_password()
    else:
        result = check_demo_user()

        if not result:
            print("\n" + "=" * 50)
            print("Run with --reset to fix password issues:")
            print("  python diagnose_auth.py --reset")
