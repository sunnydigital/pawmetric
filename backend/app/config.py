from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""

    # Database (Supabase PostgreSQL)
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/pawmetric"

    # JWT
    JWT_SECRET_KEY: str = "your-secret-key-please-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    RELOAD: bool = True

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    # File Upload (Supabase Storage)
    MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    SUPABASE_STORAGE_BUCKET: str = "pawmetric-uploads"

    # Google Maps API
    GOOGLE_MAPS_API_KEY: str = ""

    # AI Model
    AI_MODEL_ENDPOINT: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
