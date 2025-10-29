# Quick Deploy Reference

Fast reference for deploying HowItWorks platform.

## 🚀 Quick Start

### 1. Pre-Deploy Check
```bash
chmod +x deploy-check.sh
./deploy-check.sh
```

### 2. Deploy Backend (Railway)

**Create Project:**
1. Go to https://railway.app
2. New Project → Provision PostgreSQL
3. New Service → GitHub Repo → Select backend

**Environment Variables:**
```env
DATABASE_URL=<auto-provided>
PORT=3004
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=<generate-32-char-secret>
DEFAULT_ADMIN_EMAIL=admin@yourdomain.com
DEFAULT_ADMIN_PASSWORD=<strong-password>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
RESEND_API_KEY=<your-resend-key>
FROM_EMAIL=noreply@yourdomain.com
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Deploy Frontend (Vercel)

**Create Project:**
1. Go to https://vercel.com
2. New Project → Import GitHub Repo
3. Root Directory: `frontend`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_BASE_URL=https://your-backend.railway.app
```

### 4. Update CORS

Go back to Railway → Update `FRONTEND_URL` → Redeploy

---

## 📝 Required Accounts

| Service | Purpose | URL |
|---------|---------|-----|
| Railway | Backend hosting | https://railway.app |
| Vercel | Frontend hosting | https://vercel.com |
| Cloudinary | Image storage | https://cloudinary.com |
| Resend | Email service | https://resend.com |

---

## 🔑 Environment Variables

### Backend (Railway) - 11 variables
```
DATABASE_URL          # Auto-provided by Railway
PORT                  # 3004
NODE_ENV              # production
FRONTEND_URL          # Your Vercel URL
JWT_SECRET            # 32+ character secret
DEFAULT_ADMIN_EMAIL   # Your admin email
DEFAULT_ADMIN_PASSWORD # Strong password
DEFAULT_ADMIN_FIRST_NAME # Admin
DEFAULT_ADMIN_LAST_NAME  # User
CLOUDINARY_CLOUD_NAME # From Cloudinary
CLOUDINARY_API_KEY    # From Cloudinary
CLOUDINARY_API_SECRET # From Cloudinary
RESEND_API_KEY        # From Resend
FROM_EMAIL            # Your verified email
```

### Frontend (Vercel) - 2 variables
```
NEXT_PUBLIC_API_URL      # Railway backend URL + /api
NEXT_PUBLIC_BASE_URL     # Railway backend URL
```

---

## ✅ Deployment Checklist

- [ ] Run `./deploy-check.sh`
- [ ] Create Railway project
- [ ] Add PostgreSQL database
- [ ] Deploy backend to Railway
- [ ] Set all backend env variables
- [ ] Copy Railway backend URL
- [ ] Deploy frontend to Vercel
- [ ] Set frontend env variables
- [ ] Update CORS in Railway
- [ ] Test deployment
- [ ] Change admin password

---

## 🧪 Testing Deployment

### Test Backend
```bash
curl https://your-backend.railway.app/api/health
```

### Test Frontend
Visit: `https://your-app.vercel.app`

### Test Admin Login
1. Go to: `https://your-app.vercel.app/admin/dashboard`
2. Login with admin credentials
3. Change password immediately

---

## 🐛 Common Issues

### CORS Error
- Check `FRONTEND_URL` in Railway matches Vercel URL exactly
- No trailing slashes
- Redeploy backend after changing

### Database Error
- Verify `DATABASE_URL` is set
- Check migrations ran: Railway logs
- Manually run: `railway run npx prisma migrate deploy`

### API Not Found
- Check `NEXT_PUBLIC_API_URL` has `/api` at the end
- Verify backend is running on Railway
- Test backend URL directly

### Images Not Uploading
- Verify Cloudinary credentials
- Check API key is correct
- Test upload locally first

### Emails Not Sending
- Verify Resend API key
- Check domain is verified in Resend
- Test with a simple email first

---

## 📊 Monitoring

### Railway Logs
```bash
railway login
railway link
railway logs
```

### Vercel Logs
Dashboard → Project → Deployments → Click deployment

---

## 🔄 Redeployment

### Backend
```bash
git push origin main
# Railway auto-deploys
```

### Frontend
```bash
git push origin main
# Vercel auto-deploys
```

### Manual Redeploy
- Railway: Dashboard → Service → Deploy
- Vercel: Dashboard → Deployments → Redeploy

---

## 🎯 Post-Deployment

1. **Test all features:**
   - [ ] User registration
   - [ ] User login
   - [ ] Property creation
   - [ ] Image upload
   - [ ] Email sending
   - [ ] Admin panel

2. **Security:**
   - [ ] Change admin password
   - [ ] Verify JWT secret is strong
   - [ ] Check CORS settings
   - [ ] Review environment variables

3. **Monitoring:**
   - [ ] Check Railway logs
   - [ ] Check Vercel logs
   - [ ] Test API endpoints
   - [ ] Monitor error rates

---

## 📞 Support

**Documentation:**
- Full guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Checklist: [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)

**Logs:**
- Railway: `railway logs`
- Vercel: Dashboard → Deployments

**Help:**
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- Prisma: https://www.prisma.io/docs

---

## 🎉 Success!

Your platform is live! 🚀

- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.railway.app
- Admin: https://your-app.vercel.app/admin/dashboard
