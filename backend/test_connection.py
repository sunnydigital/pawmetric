"""
Test database connection with better error handling and diagnostics
"""
import socket
import psycopg2
from app.config import settings

def test_dns_resolution():
    """Test if the hostname can be resolved"""
    try:
        # Extract hostname from DATABASE_URL
        # Format: postgresql://user:password@hostname:port/database
        url_parts = settings.DATABASE_URL.replace("postgresql://", "").split("@")
        if len(url_parts) > 1:
            host_port = url_parts[1].split("/")[0]
            hostname = host_port.split(":")[0]

            print(f"🔍 Testing DNS resolution for: {hostname}")
            ip_address = socket.gethostbyname(hostname)
            print(f"✅ DNS Resolution successful: {hostname} -> {ip_address}")
            return True
        else:
            print("⚠️  Could not parse hostname from DATABASE_URL")
            return False
    except socket.gaierror as e:
        print(f"❌ DNS Resolution failed: {e}")
        print("\n💡 Possible causes:")
        print("   1. No internet connection")
        print("   2. DNS server issues")
        print("   3. VPN or firewall blocking DNS requests")
        print("   4. Incorrect hostname in DATABASE_URL")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_database_connection():
    """Test actual database connection"""
    print(f"\n🔌 Testing database connection...")
    print(f"Database URL: {settings.DATABASE_URL[:20]}...{settings.DATABASE_URL[-20:]}")

    try:
        # Try to connect
        conn = psycopg2.connect(settings.DATABASE_URL)
        print("✅ Database connection successful!")

        # Test a simple query
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"📊 PostgreSQL version: {version[0][:50]}...")

        cursor.close()
        conn.close()
        return True

    except psycopg2.OperationalError as e:
        print(f"❌ Database connection failed: {e}")
        print("\n💡 Possible causes:")
        print("   1. Invalid credentials in DATABASE_URL")
        print("   2. Database not accessible from your network")
        print("   3. Firewall blocking port 5432")
        print("   4. Supabase project paused or deleted")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    print("🔧 PawMetric Database Connection Test\n")
    print("=" * 60)

    # Test DNS first
    dns_ok = test_dns_resolution()

    # If DNS works, test connection
    if dns_ok:
        db_ok = test_database_connection()

        if db_ok:
            print("\n" + "=" * 60)
            print("🎉 All tests passed! Database is ready.")
        else:
            print("\n" + "=" * 60)
            print("⚠️  DNS works but database connection failed.")
            print("   Check your DATABASE_URL credentials and firewall settings.")
    else:
        print("\n" + "=" * 60)
        print("⚠️  DNS resolution failed. Fix network issues before testing connection.")

    print("\n📝 Troubleshooting steps:")
    print("   1. Check your internet connection")
    print("   2. Verify your .env file has the correct DATABASE_URL")
    print("   3. Check Supabase dashboard to ensure project is active")
    print("   4. Try: ipconfig /flushdns (Windows) to clear DNS cache")
    print("   5. Try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)")
