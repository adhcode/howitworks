#!/bin/bash

# This script seeds properties via the API endpoint
# First, make sure the backend is running on localhost:3004

API_URL="http://localhost:3004/api"

echo "🌱 Seeding properties via API..."

# First, login as admin to get token
echo "📝 Logging in as admin..."
LOGIN_RESPONSE=$(curl -s -X POST "${API_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get admin token. Please ensure the backend is running and admin user exists."
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Admin token obtained"

# Property 1: Luxury Villa
echo "Creating: Luxury Villa in Lekki Phase 1..."
curl -s -X POST "${API_URL}/properties" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Luxury Villa in Lekki Phase 1",
    "description": "Stunning 5-bedroom villa with modern amenities, swimming pool, and garden. Located in the heart of Lekki with easy access to major landmarks.",
    "price": 85000000,
    "location": "Lekki Phase 1, Lagos",
    "bedrooms": 5,
    "bathrooms": 6,
    "area": 450,
    "propertyType": "Villa",
    "images": ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
    "featured": true
  }' | echo "✅ Property 1 created"

# Property 2: Modern Apartment
echo "Creating: Modern 3-Bedroom Apartment..."
curl -s -X POST "${API_URL}/properties" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern 3-Bedroom Apartment",
    "description": "Beautifully designed apartment with contemporary finishes. Features include fitted kitchen, spacious living area, and balcony.",
    "price": 32000000,
    "location": "Victoria Island, Lagos",
    "bedrooms": 3,
    "bathrooms": 3,
    "area": 180,
    "propertyType": "Apartment",
    "images": ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    "featured": true
  }' | echo "✅ Property 2 created"

# Property 3: Spacious Duplex
echo "Creating: Spacious Duplex in Ikoyi..."
curl -s -X POST "${API_URL}/properties" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spacious Duplex in Ikoyi",
    "description": "Elegant 4-bedroom duplex with premium finishing, large compound, and excellent security. Perfect for family living.",
    "price": 120000000,
    "location": "Ikoyi, Lagos",
    "bedrooms": 4,
    "bathrooms": 5,
    "area": 380,
    "propertyType": "Duplex",
    "images": ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
    "featured": true
  }' | echo "✅ Property 3 created"

# Property 4: Executive Mansion
echo "Creating: Executive 6-Bedroom Mansion..."
curl -s -X POST "${API_URL}/properties" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Executive 6-Bedroom Mansion",
    "description": "Grand mansion with state-of-the-art facilities including cinema room, gym, and staff quarters. Ultimate luxury living.",
    "price": 250000000,
    "location": "Banana Island, Lagos",
    "bedrooms": 6,
    "bathrooms": 7,
    "area": 650,
    "propertyType": "Mansion",
    "images": ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800"],
    "featured": true
  }' | echo "✅ Property 4 created"

# Property 5: Penthouse
echo "Creating: Penthouse with Ocean View..."
curl -s -X POST "${API_URL}/properties" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Penthouse with Ocean View",
    "description": "Luxurious penthouse with breathtaking ocean views. Features include rooftop terrace, infinity pool, and smart home technology.",
    "price": 180000000,
    "location": "Eko Atlantic, Lagos",
    "bedrooms": 4,
    "bathrooms": 5,
    "area": 420,
    "propertyType": "Penthouse",
    "images": ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800"],
    "featured": true
  }' | echo "✅ Property 5 created"

# Property 6: Townhouse
echo "Creating: Townhouse in Gated Estate..."
curl -s -X POST "${API_URL}/properties" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Townhouse in Gated Estate",
    "description": "Well-maintained townhouse in a secure gated estate with 24/7 security, playground, and recreational facilities.",
    "price": 45000000,
    "location": "Lekki Gardens, Lagos",
    "bedrooms": 4,
    "bathrooms": 4,
    "area": 220,
    "propertyType": "Townhouse",
    "images": ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600573472591-ee6b68d14f08?w=800"],
    "featured": false
  }' | echo "✅ Property 6 created"

echo ""
echo "✨ Seeding completed! Check your database."
