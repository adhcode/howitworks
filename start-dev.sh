#!/bin/bash

# Start backend and frontend concurrently
echo "🚀 Starting HowItWorks Real Estate Platform..."
echo "Backend: http://localhost:3004"
echo "Frontend: http://localhost:3000"
echo ""

# Start backend in the background
echo "📡 Starting backend server..."
cd backend && npx nest start --watch &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in the background
echo "🌐 Starting frontend server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
function cleanup() {
  echo ""
  echo "🛑 Shutting down servers..."
  kill $BACKEND_PID 2>/dev/null
  kill $FRONTEND_PID 2>/dev/null
  echo "✅ Servers stopped"
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

echo ""
echo "✅ Both servers are starting up..."
echo "📋 Test Credentials:"
echo "   Admin: admin@example.com / admin123"
echo "   Realtor: realtor@example.com / realtor123"
echo "   Investor: investor@example.com / investor123"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep script running
wait