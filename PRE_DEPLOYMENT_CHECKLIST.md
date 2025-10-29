# Pre-Deployment Checklist

Complete this checklist before deploying to production.

## 🔐 Security

- [ ] **Change default admin credentials** in backend/.env
  - Update `DEFAULT_ADMIN_EMAIL`
  - Update `DEFAULT_ADMIN_PASSWORD` (use strong password)
  
- [ ] **Generate strong JWT secret** (min 32 characters)
  ```bash
  # Generate a random secret
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

- [ ] **Review .env files**
  - Ensure no .env files are committed to Git
  - All secrets are in environment variables
  - No hardcoded credentials in code

- [ ] **Update CORS settings**
  - Set `FRONTEND_URL` to your production domain
  - Remove any localhost URLs from production

## 📧 Email Configuration

- [ ] **Resend API Key** obtained from https://resend.com
- [ ] **Domain verified** in Resend dashboard
- [ ] **FROM_EMAIL** configured with verified domain
- [ ] Test email sending works

## 🖼️ Cloudinary Configuration

- [ ] **Cloudinary account** created at https://cloudinary.com
- [ ] **API credentials** copied:
  - Cloud Name
  - API Key
  - API Secret
- [ ] **Upload preset** configured (optional)
- [ ] Test image upload works locally

## 🗄️ Database

- [ ] **PostgreSQL database** ready (Railway provides this)
- [ ] **DATABASE_URL** connection string available
- [ ] **Migrations** tested locally:
  ```bash
  cd backend
  npx prisma migrate dev
  ```
- [ ] **Seed data** prepared (optional):
  ```bash
  npm run seed
  ```

## 📦 Dependencies

- [ ] **Backend dependencies** installed and working:
  ```bash
  cd backend
  npm install
  npm run build
  ```

- [ ] **Frontend dependencies** installed and working:
  ```bash
  cd frontend
  npm install
  npm run build
  ```

## 🧪 Testing

- [ ] **Backend tests** pass:
  ```bash
  cd backend
  npm run start:dev
  # Test API endpoints
  ```

- [ ] **Frontend tests** pass:
  ```bash
  cd frontend
  npm run dev
  # Test all pages load
  ```

- [ ] **Integration tests** complete:
  - [ ] User registration works
  - [ ] User login works
  - [ ] Admin can create properties
  - [ ] Images upload successfully
  - [ ] Realtors can be invited
  - [ ] Leads can be created
  - [ ] Commissions are calculated

## 📝 Documentation

- [ ] **README.md** updated with:
  - Project description
  - Setup instructions
  - Environment variables
  - Deployment instructions

- [ ] **API documentation** available (Swagger at /api/docs)

- [ ] **Environment variables documented** in .env.example files

## 🚀 Deployment Preparation

- [ ] **Git repository** clean:
  ```bash
  git status
  # Ensure no uncommitted changes
  ```

- [ ] **All changes committed**:
  ```bash
  git add .
  git commit -m "Prepare for deployment"
  git push origin main
  ```

- [ ] **Railway account** created and ready

- [ ] **Vercel account** created and ready

- [ ] **Domain name** ready (optional but recommended)

## 🔍 Code Review

- [ ] **No console.logs** in production code (or use proper logging)
- [ ] **Error handling** implemented
- [ ] **Rate limiting** configured (already done)
- [ ] **Input validation** in place (already done)
- [ ] **SQL injection** prevention (Prisma handles this)
- [ ] **XSS protection** in place

## 📊 Monitoring Setup

- [ ] **Error tracking** configured (optional - Sentry, etc.)
- [ ] **Performance monitoring** ready (optional)
- [ ] **Uptime monitoring** configured (optional - UptimeRobot, etc.)

## 🎯 Final Checks

- [ ] **All environment variables** documented
- [ ] **Backup strategy** planned for database
- [ ] **Rollback plan** prepared
- [ ] **Support contacts** ready
- [ ] **Deployment guide** reviewed

---

## ✅ Ready to Deploy!

Once all items are checked, proceed with the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🚨 Important Notes

### Don't Forget:
1. **Change admin password** immediately after first login
2. **Test all features** in production
3. **Monitor logs** for first 24 hours
4. **Keep environment variables** secure
5. **Regular backups** of database

### Common Issues:
- CORS errors → Check FRONTEND_URL matches exactly
- Database errors → Verify DATABASE_URL and run migrations
- Email not sending → Check Resend API key and domain verification
- Images not uploading → Verify Cloudinary credentials

---

## 📞 Need Help?

If you encounter issues:
1. Check the logs (Railway/Vercel dashboards)
2. Verify all environment variables
3. Test backend API directly
4. Review the DEPLOYMENT_GUIDE.md
5. Check database connection

---

## 🎉 Post-Deployment

After successful deployment:
- [ ] Test all features in production
- [ ] Update DNS records (if using custom domain)
- [ ] Set up SSL certificate (automatic on Railway/Vercel)
- [ ] Configure monitoring and alerts
- [ ] Document any production-specific configurations
- [ ] Share access with team members
- [ ] Celebrate! 🎊
