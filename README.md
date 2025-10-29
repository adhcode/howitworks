# HowItWorks Real Estate Platform

A comprehensive real estate platform built with Next.js (frontend) and NestJS (backend), featuring role-based authentication and dashboards for admins, realtors, and investors.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. **Set up the database:**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

3. **Start both servers:**
   ```bash
   # From the root directory
   ./start-dev.sh
   ```

   Or manually:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npx nest start --watch
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 🌐 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3004/api
- **Login Page:** http://localhost:3000/login

## 🔐 Test Credentials

| Role     | Email                    | Password     | Dashboard URL                        |
|----------|--------------------------|--------------|--------------------------------------|
| Admin    | admin@example.com        | admin123     | http://localhost:3000/admin/dashboard |
| Realtor  | realtor@example.com      | realtor123   | http://localhost:3000/realtor/dashboard |
| Investor | investor@example.com     | investor123  | http://localhost:3000/investor/dashboard |

## 🏗️ Architecture

### Backend (NestJS)
- **Port:** 3004
- **Database:** SQLite (dev.db)
- **Authentication:** JWT with role-based access control
- **API Documentation:** Available at http://localhost:3004/api (when Swagger is enabled)

### Frontend (Next.js)
- **Port:** 3000
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **State Management:** React Context + Custom Hooks
- **API Client:** Centralized API client with TypeScript

## 📁 Project Structure

```
howitworks/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── realtor/        # Realtor-specific features
│   │   ├── investor/       # Investor-specific features
│   │   ├── property/       # Property management
│   │   ├── lead/           # Lead management
│   │   ├── commission/     # Commission tracking
│   │   └── admin/          # Admin features
│   ├── prisma/             # Database schema and migrations
│   └── dev.db              # SQLite database file
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API client
│   │   └── providers/      # Context providers
└── test-*.js              # Integration test scripts
```

## 🎯 Features

### Admin Dashboard
- User management (realtors, investors)
- System analytics and reporting
- Content management
- Platform configuration

### Realtor Dashboard
- Lead management
- Commission tracking
- Performance analytics
- Profile management

### Investor Dashboard
- Investment portfolio
- Property browsing
- Investment tracking
- Profile management

### Common Features
- Role-based authentication
- Responsive design
- Real-time data updates
- Comprehensive API integration

## 🧪 Testing

### Run Integration Tests
```bash
# Test backend-frontend connectivity
node test-integration.js

# Full integration test suite
node test-full-integration.js
```

### Manual Testing
1. Open http://localhost:3000/login
2. Use the quick login buttons or enter credentials manually
3. Navigate through different dashboards based on user role
4. Verify data loading and API connectivity

## 🔧 Development

### Backend Development
```bash
cd backend
npx nest start --watch    # Development with hot reload
npx nest build            # Build for production
npm run test              # Run tests
```

### Frontend Development
```bash
cd frontend
npm run dev               # Development server
npm run build             # Build for production
npm run lint              # Run linting
```

### Database Management
```bash
cd backend
npx prisma studio         # Open Prisma Studio (database GUI)
npx prisma migrate dev    # Create new migration
npx prisma db seed        # Seed database with test data
```

## 🚀 Deployment

### Backend Deployment
1. Set up production database (PostgreSQL recommended)
2. Update DATABASE_URL in .env
3. Run migrations: `npx prisma migrate deploy`
4. Build and start: `npm run build && npm run start:prod`

### Frontend Deployment
1. Update API URLs in environment variables
2. Build: `npm run build`
3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- Protected API endpoints
- Rate limiting (100 requests/minute per IP)
- Optimized React Query caching to prevent excessive API calls

## 📚 API Documentation

The backend provides RESTful APIs with the following main endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get current user profile
- `GET /api/investor/dashboard` - Investor dashboard data
- `GET /api/realtor/dashboard` - Realtor dashboard data
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/properties` - Property listings
- `GET /api/leads` - Lead management
- `GET /api/commissions` - Commission tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill processes on ports 3000 and 3004
   lsof -ti:3000 | xargs kill -9
   lsof -ti:3004 | xargs kill -9
   ```

2. **Database connection issues:**
   ```bash
   cd backend
   rm dev.db
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

3. **Frontend build errors:**
   ```bash
   cd frontend
   rm -rf .next node_modules
   npm install
   npm run dev
   ```

4. **Backend module not found:**
   ```bash
   cd backend
   rm -rf node_modules dist
   npm install
   npx nest build
   ```

5. **"Too many requests" errors:**
   - The backend now has rate limiting (100 requests/minute per IP)
   - Frontend uses optimized caching to reduce API calls
   - Use manual refresh buttons instead of relying on auto-refresh
   - Check `RATE_LIMITING_FIXES.md` for detailed information

### Getting Help

If you encounter any issues:
1. Check the console logs in both frontend and backend
2. Run the integration tests to identify connectivity issues
3. Verify all dependencies are installed correctly
4. Ensure both servers are running on the correct ports

---

**Happy coding! 🎉**