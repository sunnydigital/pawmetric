from supabase import create_client, Client
from app.config import settings

# Initialize Supabase client
supabase: Client = None

if settings.SUPABASE_URL and settings.SUPABASE_KEY:
    supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


def get_supabase() -> Client:
    """Get Supabase client instance"""
    if not supabase:
        raise RuntimeError("Supabase client not initialized. Check your environment variables.")
    return supabase


async def upload_file_to_supabase(
    bucket: str,
    file_path: str,
    file_data: bytes,
    content_type: str = None
) -> str:
    """
    Upload a file to Supabase Storage

    Args:
        bucket: Storage bucket name
        file_path: Path where file will be stored in bucket
        file_data: File content as bytes
        content_type: MIME type of the file

    Returns:
        Public URL of the uploaded file
    """
    client = get_supabase()

    # Upload file
    response = client.storage.from_(bucket).upload(
        file_path,
        file_data,
        file_options={"content-type": content_type} if content_type else None
    )

    # Get public URL
    public_url = client.storage.from_(bucket).get_public_url(file_path)

    return public_url


async def delete_file_from_supabase(bucket: str, file_path: str) -> bool:
    """
    Delete a file from Supabase Storage

    Args:
        bucket: Storage bucket name
        file_path: Path of file to delete

    Returns:
        True if successful
    """
    client = get_supabase()

    response = client.storage.from_(bucket).remove([file_path])

    return True


def init_supabase_storage():
    """Initialize Supabase storage buckets"""
    if not supabase:
        print("Warning: Supabase not configured. File uploads will not work.")
        return

    try:
        # Create main bucket if it doesn't exist
        bucket_name = settings.SUPABASE_STORAGE_BUCKET

        # List existing buckets
        buckets = supabase.storage.list_buckets()
        bucket_exists = any(b.name == bucket_name for b in buckets)

        if not bucket_exists:
            # Create bucket (public for easy access, or set to private and use signed URLs)
            supabase.storage.create_bucket(
                bucket_name,
                options={"public": True}
            )
            print(f"Created Supabase storage bucket: {bucket_name}")
        else:
            print(f"Supabase storage bucket already exists: {bucket_name}")

    except Exception as e:
        print(f"Error initializing Supabase storage: {e}")
