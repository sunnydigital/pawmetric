# Supabase Database Connection Setup

## Problem: "could not translate host name" Error

If you're getting a DNS resolution error like:
```
psycopg2.OperationalError: could not translate host name "db.xxxx.supabase.co" to address
```

This is because the connection string format has changed in Supabase.

## Solution: Get the Correct Connection String

### Step 1: Go to Your Supabase Dashboard

1. Open https://supabase.com/dashboard
2. Select your project (`viownlzuukbtuzyheaov` or whatever your project ref is)

### Step 2: Get the Connection String

1. Click on **Project Settings** (gear icon in the left sidebar)
2. Click on **Database** in the settings menu
3. Scroll down to **Connection string**
4. Select **URI** tab (not JDBC or .NET)
5. Copy the connection string that looks like:

```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**Important Notes:**
- The connection string uses the **pooler** hostname, not `db.xxx.supabase.co`
- The port is usually **6543** (pooler) or **5432** (direct connection)
- Replace `[YOUR-PASSWORD]` with your actual database password
- The format is: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

### Step 3: Update Your .env File

1. Create a `.env` file in the `backend/` directory (if it doesn't exist):
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and update the `DATABASE_URL` with the connection string from Step 2

3. Make sure to replace:
   - `[PROJECT-REF]` with your actual project reference
   - `[YOUR-PASSWORD]` with your database password
   - `[REGION]` with your region (e.g., `us-west-1`, `us-east-1`, etc.)

### Step 4: Test the Connection

```bash
cd backend
python test_connection.py
```

This will test both DNS resolution and the actual database connection.

## Connection String Formats

### ✅ Current Format (Pooler - Recommended)
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### ❌ Old Format (May Not Work)
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## Troubleshooting

### Still getting DNS errors?

1. **Check your internet connection:**
   ```powershell
   ping 8.8.8.8
   ```

2. **Flush DNS cache (Windows):**
   ```powershell
   ipconfig /flushdns
   ```

3. **Test DNS resolution:**
   ```powershell
   nslookup aws-0-us-west-1.pooler.supabase.com
   ```

4. **Check firewall:**
   - Temporarily disable Windows Firewall and test
   - Make sure port 6543 (or 5432) is not blocked

5. **Try a different network:**
   - Some corporate networks block external database connections
   - Try using a mobile hotspot to test

### Can't find your database password?

1. Go to Supabase Dashboard → Project Settings → Database
2. Under **Database Password**, click **Reset database password**
3. Copy the new password and update your `.env` file

## Example .env File

```env
# Supabase Configuration
SUPABASE_URL=https://viownlzuukbtuzyheaov.supabase.co
SUPABASE_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Database Connection (use the pooler connection string)
DATABASE_URL=postgresql://postgres.viownlzuukbtuzyheaov:your-password-here@aws-0-us-west-1.pooler.supabase.com:6543/postgres

# JWT Settings
JWT_SECRET_KEY=your-super-secret-key-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

## Running the Seed Script

After setting up your `.env` file correctly:

```bash
cd backend
python seed.py
```

This should now work without DNS errors!
