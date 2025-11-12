from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import os

from app.config import settings
from app.database import init_db
from app.supabase_client import init_supabase_storage

# Import routers
from app.routers import auth, pets, health_scans, activities, veterinarians, chat, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup
    print("🚀 Starting PawMetric API...")
    print(f"📊 Environment: {settings.DEBUG and 'Development' or 'Production'}")

    # Initialize database tables
    print("📦 Initializing database...")
    init_db()
    print("✅ Database initialized")

    # Initialize Supabase storage
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        print("☁️  Initializing Supabase storage...")
        init_supabase_storage()
        print("✅ Supabase storage initialized")
    else:
        print("⚠️  Supabase not configured - file uploads will not work")

    print("✨ PawMetric API is ready!")

    yield

    # Shutdown (if needed in the future)
    print("👋 Shutting down PawMetric API...")


# Create FastAPI app
app = FastAPI(
    title="PawMetric API",
    description="Backend API for PetScope/PawMetric - Pet Health Monitoring Application",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(pets.router, prefix="/api/v1")
app.include_router(health_scans.router, prefix="/api/v1")
app.include_router(activities.router, prefix="/api/v1")
app.include_router(veterinarians.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")
app.include_router(analytics.router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to PawMetric API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "pawmetric-api",
        "version": "1.0.0"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    print(f"❌ Unhandled exception: {exc}")

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "An unexpected error occurred",
            "detail": str(exc) if settings.DEBUG else None
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        log_level="info"
    )
