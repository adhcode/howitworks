# HowItWorks Real Estate Platform - Deployment Guide

## 🌐 Production Domains

- **Backend API**: https://howitworks-production.up.railway.app
- **Main App**: https://app.howitworks.com.ng
- **Marketing Website**: https://howitworks.com.ng or https://www.howitworks.com.ng

## 🔧 Backend Configuration (Railway)

### Environment Variables

Set these in your Railway dashboard:

```env
# Database
DATABASE_URL=your_neon_database_connection_string_here

# Server
PORT=8080
NODE_ENV=production

# CORS - Support both app and marketing website (including www subdomain)
FRONTEND_URL=https://app.howitworks.com.ng,https://howitworks.com.ng,https://www.howitworks.com.ng

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Default Admin User
DEFAULT_ADMIN_EMAIL=admin@howitworks.com.ng
DEFAULT_ADMIN_PASSWORD=change-this-secure-password
DEFAULT_ADMIN_FIRST_NAME=Admin
DEFAULT_ADMIN_LAST_NAME=User

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=HowItWorks <hello@howitworks.com.ng>
```

### Railway Settings

1. **Port Configuration**: Set to `8080` (Railway Settings > Networking > Port)
2. **Domain**: https://howitworks-production.up.railway.app
3. **Auto-deploy**: Enable from main branch

## 🎨 Frontend Configuration

### For App Domain (app.howitworks.com.ng)

Set these environment variables in Vercel:

```env
NEXT_PUBLIC_API_URL=https://howitworks-production.up.railway.app/api
NEXT_PUBLIC_BASE_URL=https://howitworks-production.up.railway.app
```

### For Marketing Website (howitworks.com.ng)

If you want to show properties on the marketing website, set the same variables:

```env
NEXT_PUBLIC_API_URL=https://howitworks-production.up.railway.app/api
NEXT_PUBLIC_BASE_URL=https://howitworks-production.up.railway.app
```

## 🔐 CORS Configuration

The backend automatically supports:
- `https://app.howitworks.com.ng` (main app)
- `https://howitworks.com.ng` (marketing website)
- `https://www.howitworks.com.ng` (marketing website with www)
- `*.vercel.app` (all Vercel preview deployments)
- `*.howitworks.com.ng` (all subdomains)

## 📡 API Access

### Public Endpoints (No Authentication Required)

These endpoints can be used on the marketing website:

```javascript
// Get featured properties
GET https://howitworks-production.up.railway.app/api/properties/featured

// Get all properties with filters
GET https://howitworks-production.up.railway.app/api/properties?page=1&limit=10

// Get property by ID
GET https://howitworks-production.up.railway.app/api/properties/{id}

// Create a lead (contact form submission)
POST https://howitworks-production.up.railway.app/api/leads
```

### Example: Fetch Properties on Marketing Website

```javascript
// In your marketing website code
const API_URL = 'https://howitworks-production.up.railway.app/api';

// Fetch featured properties
async function getFeaturedProperties() {
  const response = await fetch(`${API_URL}/properties/featured`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

// Fetch properties with filters
async function getProperties(filters) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/properties?${params}`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

// Submit contact form
async function submitLead(leadData) {
  const response = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) throw new Error('Failed to submit lead');
  return response.json();
}
```

## 🚀 Deployment Steps

### Backend (Railway)

1. Push changes to GitHub
2. Railway auto-deploys from main branch
3. Verify deployment: `curl https://howitworks-production.up.railway.app/api/properties/featured`

### Frontend (Vercel)

1. Update environment variables in Vercel dashboard
2. Push changes to GitHub
3. Vercel auto-deploys
4. Verify at https://app.howitworks.com.ng

## 🧪 Testing CORS

```bash
# Test from app domain
curl -H "Origin: https://app.howitworks.com.ng" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS -I \
     https://howitworks-production.up.railway.app/api/properties/featured

# Test from marketing domain (without www)
curl -H "Origin: https://howitworks.com.ng" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS -I \
     https://howitworks-production.up.railway.app/api/properties/featured

# Test from marketing domain (with www)
curl -H "Origin: https://www.howitworks.com.ng" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS -I \
     https://howitworks-production.up.railway.app/api/properties/featured
```

Both should return:
```
Access-Control-Allow-Origin: <origin>
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Credentials: true
```

## 📊 Monitoring

### Backend Health Check

```bash
curl https://howitworks-production.up.railway.app/api/properties/featured
```

Should return JSON with featured properties.

### Frontend Health Check

1. Visit https://app.howitworks.com.ng
2. Check browser console for API calls
3. Verify properties load on homepage

## 🐛 Troubleshooting

### Properties Not Loading

1. **Check API URL in frontend .env**
   ```
   NEXT_PUBLIC_API_URL=https://howitworks-production.up.railway.app/api
   ```

2. **Check CORS in browser console**
   - Look for CORS errors
   - Verify Origin header matches allowed domains

3. **Check backend logs in Railway**
   - Look for CORS warnings
   - Verify database connection

4. **Test API directly**
   ```bash
   curl https://howitworks-production.up.railway.app/api/properties/featured
   ```

### CORS Errors

1. **Verify FRONTEND_URL in Railway**
   ```
   FRONTEND_URL=https://app.howitworks.com.ng,https://howitworks.com.ng,https://www.howitworks.com.ng
   ```

2. **Check backend logs for blocked origins**
   ```
   ⚠️  CORS blocked origin: <origin>
   ```

3. **Restart Railway deployment after env changes**

## 📝 Notes

- **Port**: Backend runs on port 8080 (Railway requirement)
- **Database**: Using Neon cloud PostgreSQL
- **File uploads**: Using Cloudinary for property images
- **Email**: Using Resend for notifications
- **SSL**: All domains use HTTPS

## 🔄 Rollback

If deployment fails:

1. **Railway**: Use deployment history to rollback
2. **Vercel**: Revert to previous deployment from dashboard
3. **Database**: Neon provides point-in-time recovery

## 📧 Support

For deployment issues, contact the development team.
