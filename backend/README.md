# PawMetric Backend API

Backend API for PetScope/PawMetric - A comprehensive pet health monitoring application built with FastAPI, SQLAlchemy, and Supabase.

## Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 🐕 **Pet Management** - CRUD operations for pet profiles
- 📸 **Health Scanning** - AI-powered health assessments with image upload
- 📊 **Activity Tracking** - Log meals, walks, and other activities
- 🏥 **Veterinary Directory** - Find nearby vets with location-based search
- 💬 **Real-time Chat** - WebSocket-based chat with veterinarians
- 📈 **Analytics** - Health trends and comprehensive dashboards
- ☁️ **Supabase Integration** - PostgreSQL database and file storage

## Tech Stack

- **Framework**: FastAPI 0.115.5
- **Database**: PostgreSQL (via Supabase)
- **ORM**: SQLAlchemy 2.0.36
- **Authentication**: JWT with python-jose
- **File Storage**: Supabase Storage
- **WebSocket**: Native FastAPI WebSocket support
- **Validation**: Pydantic v2

## Prerequisites

- Python 3.10+
- PostgreSQL (or Supabase account)
- pip or poetry for package management

## Installation

### 1. Clone the repository

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

# Database (Supabase PostgreSQL URL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres

# JWT Secret
JWT_SECRET_KEY=your-super-secret-key-min-32-characters
```

### 5. Initialize the database

The database tables will be created automatically on first run, or you can run:

```bash
python -c "from app.database import init_db; init_db()"
```

### 6. (Optional) Seed the database with sample data

```bash
python seed.py
```

This creates:
- 2 sample users (demo@pawmetric.com / password123)
- 3 sample pets
- Sample veterinarians in San Francisco
- Sample health scans and activities

## Running the Server

### Development mode (with auto-reload)

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Pets
- `GET /api/v1/pets` - Get all pets for current user
- `POST /api/v1/pets` - Create new pet
- `GET /api/v1/pets/{pet_id}` - Get pet by ID
- `PUT /api/v1/pets/{pet_id}` - Update pet
- `DELETE /api/v1/pets/{pet_id}` - Delete pet
- `POST /api/v1/pets/{pet_id}/photo` - Upload pet photo

### Health Scans
- `POST /api/v1/health-scans` - Create new health scan (with image upload)
- `GET /api/v1/health-scans/pet/{pet_id}` - Get scans for a pet
- `GET /api/v1/health-scans/pet/{pet_id}/score` - Get health score
- `GET /api/v1/health-scans/{scan_id}` - Get specific scan

### Activities
- `POST /api/v1/activities` - Create new activity
- `POST /api/v1/activities/with-image` - Create activity with image
- `GET /api/v1/activities/pet/{pet_id}` - Get activities for a pet
- `GET /api/v1/activities/{activity_id}` - Get specific activity
- `DELETE /api/v1/activities/{activity_id}` - Delete activity

### Veterinarians
- `GET /api/v1/veterinarians` - Get veterinarians (with location filtering)
- `POST /api/v1/veterinarians` - Create veterinarian
- `GET /api/v1/veterinarians/{vet_id}` - Get veterinarian by ID
- `PUT /api/v1/veterinarians/{vet_id}` - Update veterinarian
- `DELETE /api/v1/veterinarians/{vet_id}` - Delete veterinarian

### Chat
- `POST /api/v1/chat/messages` - Send chat message
- `GET /api/v1/chat/messages` - Get chat messages
- `GET /api/v1/chat/messages/{message_id}` - Get specific message
- `WS /api/v1/chat/ws/{user_id}` - WebSocket connection for real-time chat

### Analytics
- `GET /api/v1/analytics/pet/{pet_id}/health-trends` - Get health trends
- `GET /api/v1/analytics/pet/{pet_id}/activity-summary` - Get activity summary
- `GET /api/v1/analytics/pet/{pet_id}/scan-statistics` - Get scan statistics
- `GET /api/v1/analytics/pet/{pet_id}/dashboard` - Get dashboard data

## Database Schema

The application uses the following main models:

- **User** - User accounts with authentication
- **Pet** - Pet profiles
- **HealthScore** - Overall and individual health scores
- **HealthScan** - Health scan records with AI analysis
- **Activity** - Activity logs (meals, walks, etc.)
- **Veterinarian** - Veterinary clinic information
- **ChatMessage** - Chat messages between users and vets
- **Document** - Pet medical documents
- **RefreshToken** - JWT refresh tokens

## Supabase Setup

### 1. Create a Supabase project

1. Go to https://supabase.com
2. Create a new project
3. Copy your project URL and API keys

### 2. Get your database URL

In Supabase dashboard:
1. Go to Settings > Database
2. Copy the "Connection string" under "Connection pooling"
3. Add it to your `.env` file as `DATABASE_URL`

### 3. Create storage bucket

```sql
-- Run this in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('pawmetric-uploads', 'pawmetric-uploads', true);
```

Or the bucket will be created automatically on first run.

## File Upload

Files are stored in Supabase Storage in the following structure:

```
pawmetric-uploads/
├── pets/          # Pet profile photos
├── scans/         # Health scan images
├── activities/    # Activity images
└── documents/     # Medical documents
```

## WebSocket Usage

Connect to the WebSocket endpoint for real-time chat:

```javascript
const ws = new WebSocket('ws://localhost:8000/api/v1/chat/ws/{user_id}');

// Send message
ws.send(JSON.stringify({
  type: 'message',
  message: 'Hello!',
  vet_id: 'vet-uuid',
  is_from_user: true
}));

// Receive message
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

## Development

### Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py          # Configuration settings
│   ├── database.py        # Database connection
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── auth.py            # Authentication utilities
│   ├── supabase_client.py # Supabase client
│   └── routers/           # API route handlers
│       ├── auth.py
│       ├── pets.py
│       ├── health_scans.py
│       ├── activities.py
│       ├── veterinarians.py
│       ├── chat.py
│       └── analytics.py
├── main.py                # FastAPI application
├── seed.py                # Database seeding script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
└── README.md             # This file
```

### Adding New Endpoints

1. Create or modify a router in `app/routers/`
2. Add Pydantic schemas to `app/schemas.py` if needed
3. Add database models to `app/models.py` if needed
4. Include the router in `main.py`

## Deployment

### Using Docker (Recommended)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Using a Platform (Render, Railway, Fly.io)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy!

Most platforms will automatically detect the Python app and install dependencies.

## Testing

### Manual Testing

Use the interactive API docs at http://localhost:8000/docs to test endpoints.

### API Testing Tools

- **Postman**: Import endpoints from OpenAPI spec at `/openapi.json`
- **HTTPie**: Command-line HTTP client
- **curl**: Traditional HTTP client

Example with curl:

```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### Database connection errors

- Verify your `DATABASE_URL` is correct
- Check that your Supabase project is running
- Ensure your IP is allowed in Supabase settings

### File upload errors

- Verify Supabase storage bucket exists
- Check `SUPABASE_KEY` has correct permissions
- Ensure bucket is public or use signed URLs

### Import errors

- Make sure virtual environment is activated
- Install all dependencies: `pip install -r requirements.txt`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
