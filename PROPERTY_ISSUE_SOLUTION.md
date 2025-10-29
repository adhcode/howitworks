# Property Fetching Issue - Solution Guide

## 🎯 Problem Summary
Properties are not displaying in the admin panel and website, even though the backend API is working correctly.

## ✅ What's Working
- ✅ Backend API running on `http://localhost:3004`
- ✅ Database has 10 properties (2 featured)
- ✅ API endpoints responding correctly
- ✅ Authentication working
- ✅ Can create new properties via API

## 🔍 What's Not Working
- ❌ Properties not showing in admin panel
- ❌ Properties not showing on website homepage
- ❌ Properties not showing on properties page

## 🎯 Root Cause
The backend uses `/api` prefix for all routes, which was correctly configured in the frontend API client.

## 📋 Verification Steps

### Step 1: Verify Both Servers Are Running

```bash
# Check backend (should return process ID)
lsof -ti:3004

# Check frontend (should return process ID)
lsof -ti:3000
```

If either is not running:
```bash
# Start backend
cd backend && npm run start:dev

# Start frontend (in new terminal)
cd frontend && npm run dev
```

### Step 2: Test Backend API Directly

Run the test script:
```bash
node test-properties-debug.js
```

Expected output:
```
✅ Login successful
✅ Found 10 properties
✅ Found 2 featured properties
```

### Step 3: Test Frontend Connection

Run the verification script:
```bash
node verify-frontend-connection.js
```

### Step 4: Test in Browser

Open the HTML test file:
```bash
open test-frontend-api.html
```

Or manually open it in your browser, then:
1. Click "Test Featured Properties"
2. Click "Test All Properties"
3. Check if properties are displayed

### Step 5: Check Browser Console

1. Open `http://localhost:3000` in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for errors (red text)
5. Go to Network tab
6. Refresh page
7. Look for failed requests (red status codes)

## 🔧 Common Issues & Solutions

### Issue 1: Frontend Not Running
**Symptom**: Can't access `http://localhost:3000`

**Solution**:
```bash
cd frontend
npm install  # If first time
npm run dev
```

### Issue 2: Backend Not Running
**Symptom**: API calls fail with "ECONNREFUSED"

**Solution**:
```bash
cd backend
npm install  # If first time
npm run start:dev
```

### Issue 3: CORS Errors
**Symptom**: Browser console shows CORS errors

**Solution**: Backend is already configured for CORS. If still seeing errors:
1. Clear browser cache
2. Try incognito/private window
3. Check backend console for CORS logs

### Issue 4: Authentication Errors (401)
**Symptom**: API calls return 401 Unauthorized

**Solution**:
1. Login via admin panel: `http://localhost:3000/auth/login`
   - Email: `admin@example.com`
   - Password: `admin123`
2. Check localStorage has `access_token`
3. Try the test HTML file to verify auth

### Issue 5: Empty Response
**Symptom**: API returns 200 but no properties

**Solution**: Run seed script to add properties:
```bash
cd backend
npm run seed
```

### Issue 6: Stale Cache
**Symptom**: Old data showing or no data

**Solution**:
```javascript
// In browser console (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
```

## 🧪 Testing Checklist

- [ ] Backend running on port 3004
- [ ] Frontend running on port 3000
- [ ] Can access `http://localhost:3004/api/properties/featured` in browser
- [ ] Can access `http://localhost:3000` in browser
- [ ] No errors in browser console
- [ ] No failed requests in Network tab
- [ ] Can login to admin panel
- [ ] Properties show in test HTML file

## 📊 Expected Behavior

### Homepage (`http://localhost:3000`)
- Should show featured properties section
- Should display 2 featured properties
- Each property should show image, title, price, location

### Properties Page (`http://localhost:3000/properties`)
- Should show all properties
- Should have search/filter options
- Should show 10 properties

### Admin Panel (`http://localhost:3000/admin/properties`)
- Should show all properties in grid
- Should have create/edit/delete buttons
- Should show property stats

## 🐛 Debugging Commands

### Check what's running on ports
```bash
lsof -ti:3000  # Frontend
lsof -ti:3004  # Backend
```

### Test API directly
```bash
# Test featured properties
curl http://localhost:3004/api/properties/featured

# Test all properties
curl http://localhost:3004/api/properties
```

### Check frontend environment
```bash
cat frontend/.env
```

Should show:
```
NEXT_PUBLIC_API_URL=http://localhost:3004/api
```

## 📝 Next Actions

1. **Run verification script**:
   ```bash
   node verify-frontend-connection.js
   ```

2. **Open test HTML file**:
   ```bash
   open test-frontend-api.html
   ```

3. **Check browser console**:
   - Open `http://localhost:3000`
   - Press F12
   - Look for errors

4. **Report findings**:
   - What errors do you see in console?
   - What's the status of network requests?
   - Do properties show in test HTML file?

## 🎓 Understanding the Architecture

```
Browser (localhost:3000)
    ↓
Next.js Frontend
    ↓
API Client (frontend/src/lib/api-client.ts)
    ↓
HTTP Request to http://localhost:3004/api
    ↓
NestJS Backend
    ↓
Database (PostgreSQL)
```

The frontend makes HTTP requests to the backend API, which queries the database and returns JSON data.

## ✨ Success Indicators

When everything is working:
- ✅ No errors in browser console
- ✅ Network requests show 200 status
- ✅ Properties visible on homepage
- ✅ Properties visible in admin panel
- ✅ Can create/edit/delete properties
- ✅ Featured properties show on homepage
