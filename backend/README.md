# Real Estate Backend API

A comprehensive NestJS backend API for the real estate platform with JWT-based authentication and role-based access control supporting three user types: Admin, Realtor, and Investor.

## Features

- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Three user roles (Admin, Realtor, Investor)
- **User Management**: Complete user registration and profile management
- **Realtor Dashboard**: Lead tracking, commission management, performance metrics
- **Investor Dashboard**: Investment tracking, property inquiries, portfolio management
- **Admin Dashboard**: System-wide analytics, user management, oversight
- **Property Management**: Property listings with search and filtering
- **Lead Management**: Customer inquiry tracking and status management
- **Investment Tracking**: Investment opportunities and portfolio management
- **Commission Tracking**: Financial tracking for realtor commissions
- **Blog Management**: Content management system for blog posts
- **API Documentation**: Auto-generated Swagger documentation

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Password Hashing**: bcrypt
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Run the setup script:
```bash
./setup.sh
```

Or manually:

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials and JWT secret:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/real_estate_db"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin123
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Seed default users:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001/api`

## Default Users

After running the seed script, you'll have these default users:

- **Admin**: admin@example.com / admin123
- **Realtor**: realtor@example.com / realtor123  
- **Investor**: investor@example.com / investor123

## API Documentation

Once the server is running, visit `http://localhost:3001/api/docs` for interactive Swagger documentation.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get current user profile (requires JWT)

### Authentication Headers
All protected endpoints require:
- `Authorization: Bearer <jwt_token>`

### Admin Endpoints (Admin role required)
- `GET /api/admin/realtors` - Get all realtors
- `GET /api/admin/realtors/:id` - Get realtor by ID
- `GET /api/admin/investors` - Get all investors
- `GET /api/admin/investors/:id` - Get investor by ID
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/status` - Update user status

### Realtor Endpoints (Realtor role required)
- `GET /api/realtor/profile` - Get realtor profile
- `PUT /api/realtor/profile` - Update realtor profile
- `GET /api/realtor/dashboard` - Get realtor dashboard
- `GET /api/realtor/performance` - Get performance metrics
- `GET /api/realtor/commissions` - Get commissions
- `GET /api/realtor/leads` - Get leads
- `PUT /api/realtor/leads/:id/status` - Update lead status

### Investor Endpoints (Investor role required)
- `GET /api/investor/profile` - Get investor profile
- `PUT /api/investor/profile` - Update investor profile
- `GET /api/investor/dashboard` - Get investor dashboard
- `GET /api/investor/investments` - Get investor investments
- `POST /api/investor/investments` - Create new investment
- `GET /api/investor/investments/:id` - Get investment by ID

### Commission Endpoints
- `GET /api/commissions` - Get all commissions (Admin only)
- `GET /api/commissions/realtor/:realtorId` - Get realtor commissions
- `POST /api/commissions/:id/request-payout` - Request commission payout
- `GET /api/commissions/:id` - Get commission by ID
- `PUT /api/commissions/:id/status` - Update commission status (Admin only)

### Public Endpoints (No authentication required)
- `GET /api/properties` - Get properties with filters
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads (with filters)
- `GET /api/leads/:id` - Get lead by ID
- `PUT /api/leads/:id/status` - Update lead status
- `GET /api/blog` - Get blog posts
- `GET /api/blog/featured` - Get featured blog posts
- `GET /api/blog/:slug` - Get blog post by slug

## Database Schema

The application uses the following main entities:
- **User**: Base user entity with authentication (Admin, Realtor, Investor)
- **Realtor**: Agent profiles with banking information and slug for referrals
- **Investor**: Investor profiles with investment preferences and budget
- **Property**: Property listings with images and details
- **Lead**: Customer inquiries and contact information (supports investor inquiries)
- **Investment**: Investment tracking for investors in properties
- **Commission**: Payment tracking for realtors
- **Blog**: Content management for blog posts

### User Roles
- **ADMIN**: Full system access, user management, analytics
- **REALTOR**: Property management, lead tracking, commission management
- **INVESTOR**: Investment tracking, property inquiries, portfolio management

## Development

### Running Tests
```bash
npm run test
npm run test:e2e
npm run test:cov
```

### Building for Production
```bash
npm run build
npm run start:prod
```

### Database Operations
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio
```

## Project Structure

```
src/
├── admin/           # Admin module (user management, analytics)
├── blog/            # Blog management module
├── commission/      # Commission tracking module
├── common/          # Shared utilities and guards
│   ├── guards/      # Authentication and authorization guards
│   └── utils/       # Utility functions
├── lead/            # Lead management module
├── prisma/          # Database service
├── property/        # Property management module
├── realtor/         # Realtor management module
├── app.module.ts    # Main application module
└── main.ts          # Application entry point
```

## Frontend Integration

The frontend should make API calls to this backend instead of using Next.js API routes. Update your frontend API calls to point to `http://localhost:3001/api` and include JWT authentication.

### Authentication Flow
```typescript
// 1. Login
const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123',
  }),
});

const { access_token, user } = await loginResponse.json();

// 2. Store token (localStorage, cookies, etc.)
localStorage.setItem('token', access_token);
localStorage.setItem('user', JSON.stringify(user));
```

### Authenticated API Calls
```typescript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3001/api/realtor/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
```

### Role-Based Routing
```typescript
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Redirect based on user role
switch (user.role) {
  case 'ADMIN':
    router.push('/admin/dashboard');
    break;
  case 'REALTOR':
    router.push('/realtor/dashboard');
    break;
  case 'INVESTOR':
    router.push('/investor/dashboard');
    break;
  default:
    router.push('/login');
}
```