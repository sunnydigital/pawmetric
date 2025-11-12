# PawMetric Frontend-Backend Integration Guide

This document explains how the PawMetric frontend (React + TypeScript) integrates with the FastAPI backend.

## Architecture Overview

```
┌──────────────────┐         HTTP/REST API         ┌──────────────────┐
│                  │ ◄──────────────────────────► │                  │
│  React Frontend  │                               │  FastAPI Backend │
│  (Vite + TS)     │                               │  (Python)        │
│                  │                               │                  │
└──────────────────┘                               └──────────────────┘
        │                                                    │
        │                                                    │
   LocalStorage                                       PostgreSQL
   (Tokens/User)                                      (Supabase)
```

## Setup Instructions

### 1. Backend Setup

First, ensure your backend is running:

```bash
cd backend

# Create .env file with your database credentials
cp .env.example .env
# Edit .env and update DATABASE_URL with your Supabase connection string

# Install dependencies
pip install -r requirements.txt

# Run database migrations (create tables)
python -c "from app.database import init_db; init_db()"

# Optional: Seed database with sample data
python seed.py

# Start the backend server
python main.py
```

The backend will start at `http://localhost:8000`

You can view the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2. Frontend Setup

```bash
# From the root directory of the project

# Create .env file for frontend
cp .env.example .env

# Edit .env and set:
# VITE_API_URL=http://localhost:8000

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start at `http://localhost:5173`

## Integration Components

### 1. TypeScript Types (`src/types/api.ts`)

All backend models are mirrored as TypeScript interfaces:

```typescript
import type { User, Pet, HealthScan, Activity } from './types/api';
```

Key types include:
- `User`, `UserCreate`, `UserLogin` - Authentication
- `Pet`, `PetCreate`, `PetUpdate` - Pet management
- `HealthScan`, `HealthScore` - Health monitoring
- `Activity`, `ActivityCreate` - Activity tracking
- `Veterinarian` - Vet directory
- `ChatMessage` - AI chat

### 2. API Client (`src/services/api.ts`)

The API client handles all HTTP communication:

```typescript
import { api } from './services/api';

// Authentication
await api.login({ email, password });
await api.register({ email, password, name });
await api.logout();

// Pets
const pets = await api.getPets();
const newPet = await api.createPet(petData);
await api.updatePet(petId, updates);

// Health Scans
const scans = await api.getHealthScans(petId);
const scan = await api.createHealthScan(petId, scanType, imageFile);
const score = await api.getHealthScore(petId);

// Activities
const activities = await api.getActivities(petId);
await api.createActivity(activityData);

// Veterinarians
const vets = await api.getVeterinarians(lat, lng, radius);

// Chat
const response = await api.sendChatMessage({ message, petId });
```

**Features:**
- Automatic token management (access + refresh tokens)
- Automatic token refresh on 401 errors
- FormData support for file uploads
- Type-safe responses

### 3. Authentication Context (`src/contexts/AuthContext.tsx`)

Manages user authentication state globally:

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      // User is now logged in
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 4. Custom Hooks (`src/hooks/useApi.ts`)

React hooks for common API operations with loading/error states:

```typescript
import { usePets, useHealthScans, useActivities } from './hooks/useApi';

function PetDashboard() {
  const { pets, loading, error, createPet } = usePets();
  const { scans, createScan } = useHealthScans(selectedPetId);
  const { activities, createActivity } = useActivities(selectedPetId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {pets.map(pet => (
        <div key={pet.id}>{pet.name}</div>
      ))}
    </div>
  );
}
```

Available hooks:
- `usePets()` - Manage pets
- `useHealthScans(petId, scanType?)` - Health scans for a pet
- `useHealthScore(petId)` - Health score for a pet
- `useActivities(petId, type?)` - Activities for a pet
- `useVeterinarians(lat?, lng?, radius?, specialty?)` - Find vets
- `useChat()` - AI chat functionality
- `useDashboardStats()` - Dashboard statistics

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Pets
- `GET /api/v1/pets` - Get all user's pets
- `POST /api/v1/pets` - Create new pet
- `GET /api/v1/pets/{id}` - Get specific pet
- `PUT /api/v1/pets/{id}` - Update pet
- `DELETE /api/v1/pets/{id}` - Delete pet
- `POST /api/v1/pets/{id}/photo` - Upload pet photo

### Health Scans
- `POST /api/v1/health-scans` - Create health scan (with image upload)
- `GET /api/v1/health-scans/pet/{petId}` - Get all scans for pet
- `GET /api/v1/health-scans/pet/{petId}/score` - Get health score
- `GET /api/v1/health-scans/{id}` - Get specific scan

### Activities
- `POST /api/v1/activities` - Log new activity
- `GET /api/v1/activities/pet/{petId}` - Get activities for pet
- `GET /api/v1/activities/{id}` - Get specific activity
- `DELETE /api/v1/activities/{id}` - Delete activity

### Veterinarians
- `GET /api/v1/veterinarians` - Get veterinarians (with location filters)
- `GET /api/v1/veterinarians/{id}` - Get specific veterinarian

### Chat
- `POST /api/v1/chat/ask` - Send chat message to AI
- `GET /api/v1/chat/history` - Get chat history

### Analytics
- `GET /api/v1/analytics/dashboard` - Get dashboard statistics
- `GET /api/v1/analytics/activity/{petId}` - Get activity analytics

## Example: Integrating a Component

Here's how to integrate the login screen with the backend:

```typescript
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function LoginScreen({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      onComplete(); // Navigate to next screen
    } catch (err: any) {
      setError(err.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## Example: Creating a Pet Profile

```typescript
import { useState } from 'react';
import { usePets } from '../hooks/useApi';
import { PetCreate } from '../types/api';

export function PetProfileSetup({ onComplete }: { onComplete: () => void }) {
  const [petData, setPetData] = useState<PetCreate>({
    name: '',
    breed: '',
    age: 0,
    weight: 0,
    gender: 'male',
  });
  const { createPet, loading } = usePets();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pet = await createPet(petData);
    if (pet) {
      onComplete(); // Navigate to home screen
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={petData.name}
        onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        placeholder="Pet Name"
        required
      />
      <input
        type="text"
        value={petData.breed}
        onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
        placeholder="Breed"
        required
      />
      {/* Add more fields... */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Profile'}
      </button>
    </form>
  );
}
```

## Example: Health Scan Upload

```typescript
import { useState } from 'react';
import { useHealthScans } from '../hooks/useApi';
import { ScanType } from '../types/api';

export function ScanCamera({ petId, scanType }: { petId: string; scanType: ScanType }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { createScan, loading } = useHealthScans(petId);

  const handleCapture = async (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const scan = await createScan(scanType, selectedFile, 'Optional notes');
    if (scan) {
      console.log('Scan uploaded:', scan);
      // Navigate to results screen
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => e.target.files && handleCapture(e.target.files[0])}
      />
      {selectedFile && (
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Scan'}
        </button>
      )}
    </div>
  );
}
```

## Authentication Flow

1. **User Registration/Login:**
   - User enters credentials
   - Frontend calls `api.login()` or `api.register()`
   - Backend validates and returns JWT tokens (access + refresh)
   - Tokens are stored in localStorage
   - User data is stored in AuthContext

2. **Authenticated Requests:**
   - All API requests include `Authorization: Bearer <access_token>` header
   - Backend validates token and returns user-specific data

3. **Token Refresh:**
   - When access token expires (401 error), API client automatically:
     - Calls `/auth/refresh` with refresh token
     - Updates access token in localStorage
     - Retries the original request
   - If refresh fails, user is logged out

4. **Logout:**
   - Frontend calls `api.logout()`
   - Backend invalidates refresh token
   - Frontend clears localStorage and AuthContext

## Error Handling

All API responses follow this format:

```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "message": "Error message",
  "detail": "Detailed error information"
}
```

Handle errors in your components:

```typescript
try {
  const response = await api.createPet(petData);
  if (response.success) {
    // Success
  }
} catch (error: any) {
  if (error.message) {
    alert(error.message);
  } else if (error.detail) {
    alert(error.detail);
  } else {
    alert('An error occurred');
  }
}
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_ENV=development
```

### Backend (backend/.env)
```env
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
JWT_SECRET_KEY=your-secret-key-min-32-chars
```

## Testing the Integration

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && python main.py

   # Terminal 2 - Frontend
   npm run dev
   ```

2. **Test authentication:**
   - Go to `http://localhost:5173`
   - Click "Skip to App" or go through onboarding
   - Try logging in with demo credentials:
     - Email: `demo@pawmetric.com`
     - Password: `password123`
   - Check browser DevTools → Network tab to see API calls

3. **Test API endpoints:**
   - Open `http://localhost:8000/docs`
   - Try endpoints directly in Swagger UI
   - Use the "Authorize" button with an access token from localStorage

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
- Check that `CORS_ORIGINS` in `backend/app/config.py` includes your frontend URL
- Default: `["http://localhost:5173", "http://localhost:3000"]`

### 401 Unauthorized
- Token may have expired
- Check localStorage for `pawmetric_access_token`
- Try logging out and back in

### Connection Refused
- Ensure backend is running on port 8000
- Check `VITE_API_URL` in frontend `.env` file

### Database Errors
- See `backend/SUPABASE_SETUP.md` for database setup help
- Run `python test_connection.py` to test database connectivity

## Next Steps

1. **Integrate more components:**
   - Update `LoginScreen` component to use `useAuth()`
   - Update `PetProfileSetup` to use `usePets()`
   - Update `ScanCamera` to use `useHealthScans()`
   - Update `VetDirectoryScreen` to use `useVeterinarians()`

2. **Add error handling:**
   - Show user-friendly error messages
   - Add loading states
   - Handle network errors gracefully

3. **Add real-time features:**
   - WebSocket support for live updates
   - Push notifications

4. **Optimize performance:**
   - Implement caching
   - Lazy load images
   - Pagination for lists

## Resources

- **Frontend:** React + TypeScript + Vite
- **Backend:** FastAPI + SQLAlchemy + PostgreSQL
- **Database:** Supabase (PostgreSQL + Storage)
- **Authentication:** JWT (JSON Web Tokens)
- **API Docs:** `http://localhost:8000/docs`

For more information, see:
- Backend README: `backend/README.md`
- Backend Setup: `backend/SUPABASE_SETUP.md`
- API Documentation: `http://localhost:8000/docs`
