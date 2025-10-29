# Deployment Guide - HowItWorks Real Estate Platform

Complete guide to deploy the backend on Railway and frontend on Vercel.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] Railway account (https://railway.app)
- [ ] Vercel account (https://vercel.com)
- [ ] Cloudinary account (https://cloudinary.com)
- [ ] Resend account (https://resend.com)
- [ ] GitHub repository with your code

---

## 🚂 Part 1: Deploy Backend to Railway

### Step 1: Create PostgreSQL Database

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Provision PostgreSQL"
4. Wait for database to be created
5. Copy the `DATABASE_URL` from the database settings

### Step 2: Deploy Backend Service

1. In the same Railway project, click "New Service"
2. Select "GitHub Repo"
3. Choose your repository
4. Select the `backend` folder as root directory (if monorepo)

### Step 3: Configure Environment Variables

In Railway, go to your backend service → Variables tab and add:

```env
# Database (automatically provided by Railway if you linked the PostgreSQL)
DATABASE_URL=postgresql://...

# Server
PORT=3004
NODE_ENV=production

# CORS - Update with your Vercel domain
FRONTEND_URL=https://your-app.vercel.app

# JWT Authentication - Generate a strong secret
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# Default Admin User
DEFAULT_ADMIN_EMAIL=admin@yourdomain.com
DEFAULT_ADMIN_PASSWORD=YourSecurePassword123!
DEFAULT_ADMIN_FIRST_NAME=Admin
DEFAULT_ADMIN_LAST_NAME=User

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend Email Configuration
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=HowItWorks <noreply@yourdomain.com>
```

### Step 4: Configure Build & Deploy

Railway should auto-detect NestJS. If not, add these settings:

**Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

**Start Command:**
```bash
npx prisma migrate deploy && npm run start:prod
```

### Step 5: Deploy

1. Click "Deploy" or push to your GitHub repo
2. Railway will automatically build and deploy
3. Wait for deployment to complete
4. Copy your Railway backend URL (e.g., `https://your-backend.railway.app`)

### Step 6: Verify Backend

Test your backend:
```bash
curl https://your-backend.railway.app/api/health
```

---

## ▲ Part 2: Deploy Frontend to Vercel

### Step 1: Connect Repository

1. Go to Vercel dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` folder as root directory (if monorepo)

### Step 2: Configure Project Settings

**Framework Preset:** Next.js
**Root Directory:** `frontend` (if monorepo)
**Build Command:** `npm run build` (default)
**Output Directory:** `.next` (default)

### Step 3: Configure Environment Variables

In Vercel → Project Settings → Environment Variables, add:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_BASE_URL=https://your-backend.railway.app
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy automatically
3. Wait for deployment to complete
4. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 5: Update Backend CORS

Go back to Railway → Backend Service → Variables:
- Update `FRONTEND_URL` to your Vercel URL: `https://your-app.vercel.app`
- Redeploy the backend service

---

## 🔧 Part 3: Post-Deployment Configuration

### 1. Update Cloudinary Settings

In your Cloudinary dashboard:
- Go to Settings → Security
- Add your Vercel domain to "Allowed domains"

### 2. Update Resend Settings

In your Resend dashboard:
- Verify your domain
- Update email templates if needed
- Test email sending

### 3. Database Migrations

Railway automatically runs migrations on deploy. To manually run:

```bash
# Connect to Railway CLI
railway login
railway link

# Run migrations
railway run npx prisma migrate deploy

# Seed database (optional)
railway run npm run seed
```

### 4. Test the Application

1. Visit your Vercel URL
2. Try to register/login
3. Test property creation
4. Test image uploads
5. Test email sending (realtor invitations)

---

## 🔐 Security Checklist

- [ ] Change default admin password after first login
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS only (Railway & Vercel do this by default)
- [ ] Set proper CORS origins
- [ ] Don't commit .env files to Git
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting (already configured)
- [ ] Review Cloudinary security settings

---

## 📊 Monitoring & Logs

### Railway Logs
```bash
railway logs
```

### Vercel Logs
- Go to Vercel Dashboard → Your Project → Deployments
- Click on a deployment to view logs

---

## 🔄 Continuous Deployment

Both Railway and Vercel support automatic deployments:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request** → Preview deployment (Vercel)
3. **Merge to main** → Production deployment

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed:**
```bash
# Check DATABASE_URL is correct
railway variables

# Test database connection
railway run npx prisma db push
```

**Migrations Failed:**
```bash
# Reset database (⚠️ WARNING: Deletes all data)
railway run npx prisma migrate reset

# Or manually run migrations
railway run npx prisma migrate deploy
```

**CORS Errors:**
- Verify FRONTEND_URL matches your Vercel domain exactly
- Check for trailing slashes
- Redeploy after changing environment variables

### Frontend Issues

**API Connection Failed:**
- Verify NEXT_PUBLIC_API_URL is correct
- Check backend is running on Railway
- Test backend URL directly in browser

**Build Failed:**
- Check build logs in Vercel
- Verify all dependencies are in package.json
- Test build locally: `npm run build`

**Environment Variables Not Working:**
- Vercel requires `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding/changing variables

---

## 📝 Environment Variables Summary

### Backend (Railway)
```
DATABASE_URL
PORT
NODE_ENV
FRONTEND_URL
JWT_SECRET
DEFAULT_ADMIN_EMAIL
DEFAULT_ADMIN_PASSWORD
DEFAULT_ADMIN_FIRST_NAME
DEFAULT_ADMIN_LAST_NAME
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RESEND_API_KEY
FROM_EMAIL
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_BASE_URL
```

---

## 🚀 Quick Deploy Commands

### Deploy Backend
```bash
# From backend directory
git add .
git commit -m "Deploy backend"
git push origin main
# Railway auto-deploys
```

### Deploy Frontend
```bash
# From frontend directory
git add .
git commit -m "Deploy frontend"
git push origin main
# Vercel auto-deploys
```

---

## 📞 Support

If you encounter issues:
1. Check Railway logs: `railway logs`
2. Check Vercel deployment logs
3. Verify all environment variables
4. Test backend API endpoints directly
5. Check database connection

---

## ✅ Deployment Checklist

- [ ] PostgreSQL database created on Railway
- [ ] Backend deployed to Railway
- [ ] All backend environment variables set
- [ ] Database migrations run successfully
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] CORS configured correctly
- [ ] Cloudinary configured
- [ ] Resend email configured
- [ ] Default admin user created
- [ ] Can login to admin panel
- [ ] Can create properties
- [ ] Can upload images
- [ ] Can send emails
- [ ] All pages load correctly

---

## 🎉 Success!

Your HowItWorks Real Estate Platform is now live!

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-backend.railway.app
- **Admin Panel:** https://your-app.vercel.app/admin/dashboard

Default admin credentials (change immediately):
- Email: admin@yourdomain.com
- Password: YourSecurePassword123!
