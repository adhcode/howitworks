#!/bin/bash

# Deployment Readiness Check Script
# Run this before deploying to catch common issues

echo "🚀 HowItWorks Deployment Readiness Check"
echo "========================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Error: Run this script from the project root directory${NC}"
    exit 1
fi

echo "📋 Checking Backend..."
echo "---"

# Check backend .env.example exists
if [ -f "backend/.env.example" ]; then
    echo -e "${GREEN}✓${NC} backend/.env.example exists"
else
    echo -e "${RED}✗${NC} backend/.env.example missing"
    ((ERRORS++))
fi

# Check backend .env exists (for local testing)
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} backend/.env exists"
    
    # Check for default passwords
    if grep -q "admin123" backend/.env; then
        echo -e "${YELLOW}⚠${NC}  Warning: Default admin password detected in .env"
        ((WARNINGS++))
    fi
    
    # Check for localhost in production
    if grep -q "localhost" backend/.env; then
        echo -e "${YELLOW}⚠${NC}  Warning: localhost URLs found in .env (okay for local dev)"
    fi
else
    echo -e "${YELLOW}⚠${NC}  backend/.env not found (okay if deploying)"
fi

# Check backend dependencies
if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✓${NC} backend/package.json exists"
    
    cd backend
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓${NC} backend dependencies installed"
    else
        echo -e "${YELLOW}⚠${NC}  backend dependencies not installed (run: cd backend && npm install)"
        ((WARNINGS++))
    fi
    cd ..
else
    echo -e "${RED}✗${NC} backend/package.json missing"
    ((ERRORS++))
fi

# Check Prisma schema
if [ -f "backend/prisma/schema.prisma" ]; then
    echo -e "${GREEN}✓${NC} Prisma schema exists"
else
    echo -e "${RED}✗${NC} Prisma schema missing"
    ((ERRORS++))
fi

# Check for Railway config
if [ -f "backend/railway.json" ]; then
    echo -e "${GREEN}✓${NC} Railway config exists"
else
    echo -e "${YELLOW}⚠${NC}  Railway config missing (optional)"
fi

echo ""
echo "📋 Checking Frontend..."
echo "---"

# Check frontend .env.example exists
if [ -f "frontend/.env.example" ]; then
    echo -e "${GREEN}✓${NC} frontend/.env.example exists"
else
    echo -e "${RED}✗${NC} frontend/.env.example missing"
    ((ERRORS++))
fi

# Check frontend .env exists
if [ -f "frontend/.env" ]; then
    echo -e "${GREEN}✓${NC} frontend/.env exists"
    
    # Check for localhost in production
    if grep -q "localhost" frontend/.env; then
        echo -e "${YELLOW}⚠${NC}  Warning: localhost URLs found in .env (update for production)"
    fi
else
    echo -e "${YELLOW}⚠${NC}  frontend/.env not found (okay if deploying)"
fi

# Check frontend dependencies
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} frontend/package.json exists"
    
    cd frontend
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓${NC} frontend dependencies installed"
    else
        echo -e "${YELLOW}⚠${NC}  frontend dependencies not installed (run: cd frontend && npm install)"
        ((WARNINGS++))
    fi
    cd ..
else
    echo -e "${RED}✗${NC} frontend/package.json missing"
    ((ERRORS++))
fi

echo ""
echo "📋 Checking Git..."
echo "---"

# Check if git repo
if [ -d ".git" ]; then
    echo -e "${GREEN}✓${NC} Git repository initialized"
    
    # Check for uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠${NC}  Warning: Uncommitted changes detected"
        ((WARNINGS++))
    else
        echo -e "${GREEN}✓${NC} No uncommitted changes"
    fi
    
    # Check if .env files are ignored
    if git check-ignore backend/.env frontend/.env > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} .env files are gitignored"
    else
        echo -e "${RED}✗${NC} .env files are NOT gitignored!"
        ((ERRORS++))
    fi
else
    echo -e "${YELLOW}⚠${NC}  Not a git repository"
    ((WARNINGS++))
fi

# Check .gitignore
if [ -f ".gitignore" ]; then
    echo -e "${GREEN}✓${NC} .gitignore exists"
else
    echo -e "${YELLOW}⚠${NC}  .gitignore missing"
    ((WARNINGS++))
fi

echo ""
echo "📋 Checking Documentation..."
echo "---"

# Check for deployment guide
if [ -f "DEPLOYMENT_GUIDE.md" ]; then
    echo -e "${GREEN}✓${NC} DEPLOYMENT_GUIDE.md exists"
else
    echo -e "${YELLOW}⚠${NC}  DEPLOYMENT_GUIDE.md missing"
    ((WARNINGS++))
fi

# Check for README
if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC} README.md exists"
else
    echo -e "${YELLOW}⚠${NC}  README.md missing"
    ((WARNINGS++))
fi

echo ""
echo "========================================"
echo "📊 Summary"
echo "========================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready to deploy!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review PRE_DEPLOYMENT_CHECKLIST.md"
    echo "2. Follow DEPLOYMENT_GUIDE.md"
    echo "3. Deploy to Railway (backend)"
    echo "4. Deploy to Vercel (frontend)"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  ${WARNINGS} warning(s) found${NC}"
    echo "Review warnings above before deploying"
    exit 0
else
    echo -e "${RED}❌ ${ERRORS} error(s) and ${WARNINGS} warning(s) found${NC}"
    echo "Fix errors before deploying"
    exit 1
fi
