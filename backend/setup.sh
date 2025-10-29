#!/bin/bash

echo "🚀 Setting up Real Estate Backend with JWT Authentication..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials and JWT secret"
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with:"
echo "   - Database credentials (DATABASE_URL)"
echo "   - JWT secret (JWT_SECRET)"
echo "   - Default admin user details (optional)"
echo ""
echo "2. Run 'npx prisma db push' to create database tables"
echo "3. Run 'npm run seed' to create default users"
echo "4. Run 'npm run start:dev' to start the development server"
echo ""
echo "🔐 Default Users (after seeding):"
echo "   Admin: admin@example.com / admin123"
echo "   Realtor: realtor@example.com / realtor123"
echo "   Investor: investor@example.com / investor123"
echo ""
echo "🌐 API Endpoints:"
echo "   API: http://localhost:3001/api"
echo "   Documentation: http://localhost:3001/api/docs"
echo "   Auth: http://localhost:3001/api/auth/login"