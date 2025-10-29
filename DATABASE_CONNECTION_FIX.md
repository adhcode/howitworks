# Database Connection Issue - Quick Fix

## Problem
```
PrismaClientInitializationError: Can't reach database server at 
`ep-cold-smoke-abzzigen-pooler.eu-west-2.aws.neon.tech:5432`
```

## Possible Causes

### 1. Neon Database is Paused (Most Likely)
Neon free tier databases automatically pause after inactivity. They wake up on first connection but this can take 10-30 seconds.

### 2. Network/Internet Issue
Check your internet connection.

### 3. Database Deleted or Connection String Changed
The database might have been deleted or the connection details changed.

## Solutions

### Solution 1: Wake Up Neon Database (Try This First)

1. **Go to Neon Console:**
   - Visit: https://console.neon.tech
   - Login to your account
   - Find your project: `ep-cold-smoke-abzzigen`

2. **Check Database Status:**
   - If it shows "Paused" or "Idle", click to wake it up
   - Wait 10-30 seconds for it to become active

3. **Restart Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

### Solution 2: Get New Connection String

1. **In Neon Console:**
   - Go to your project dashboard
   - Click on "Connection Details"
   - Copy the connection string
   - It should look like:
     ```
     postgresql://[user]:[password]@[host]/[database]?sslmode=require
     ```

2. **Update backend/.env:**
   ```env
   DATABASE_URL="your-new-connection-string-here"
   ```

3. **Restart Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

### Solution 3: Use Local SQLite (Quick Alternative)

If you want to continue working while fixing Neon:

1. **Update backend/.env:**
   ```env
   # Comment out PostgreSQL
   # DATABASE_URL="postgresql://..."
   
   # Use SQLite instead
   DATABASE_URL="file:./dev.db"
   ```

2. **Update prisma/schema.prisma:**
   ```prisma
   datasource db {
     provider = "sqlite"  // Change from "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Reset Database:**
   ```bash
   cd backend
   rm -f dev.db
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Restart Backend:**
   ```bash
   npm run start:dev
   ```

## Recommended Approach

**For Development:** Use SQLite (Solution 3)
- Faster
- No internet required
- Easy to reset
- Good for testing

**For Production:** Use PostgreSQL (Neon)
- More robust
- Better for production
- Supports more features

## Quick Commands

### Check if Neon is reachable:
```bash
ping ep-cold-smoke-abzzigen-pooler.eu-west-2.aws.neon.tech
```

### Test database connection:
```bash
cd backend
npx prisma db pull
```

### Reset local database:
```bash
cd backend
rm -f dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

## After Fixing

Once database is connected:

1. **Test Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```
   
   Should see:
   ```
   [Nest] Application successfully started
   [Nest] Listening on port 3004
   ```

2. **Test Auth:**
   ```bash
   node test-auth-flow.js
   ```

3. **Test Frontend:**
   - Go to: http://localhost:3000/auth/login
   - Login as admin: admin@example.com / admin123

## Need Help?

If none of these work:
1. Check Neon dashboard for database status
2. Verify your internet connection
3. Try creating a new Neon database
4. Use SQLite for local development
