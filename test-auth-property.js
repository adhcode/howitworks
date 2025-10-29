#!/usr/bin/env node

const http = require('http');

async function testWithAuth() {
  console.log('🧪 Testing Property Creation with Authentication...\n');

  // Login first
  console.log('1. Logging in as admin...');
  const loginData = JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  });

  const loginResult = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3004,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    req.write(loginData);
    req.end();
  });

  console.log('Login status:', loginResult.status);
  if (loginResult.status !== 200 && loginResult.status !== 201) {
    console.log('❌ Login failed');
    return;
  }

  const token = loginResult.data.access_token;
  console.log('✅ Token received:', !!token);

  // Now test POST with token
  console.log('\n2. Creating property with auth token...');
  const propertyData = JSON.stringify({
    title: 'Frontend Test Property',
    description: 'Test property from frontend',
    price: 25000000,
    location: 'Lagos',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    propertyType: 'Apartment',
    images: []
  });

  const createResult = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3004,
      path: '/api/properties',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(propertyData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    req.write(propertyData);
    req.end();
  });

  console.log('Create property status:', createResult.status);
  if (createResult.status === 201) {
    console.log('✅ Property created successfully!');
    console.log('Property title:', createResult.data.property.title);
  } else {
    console.log('❌ Property creation failed');
    console.log('Response:', createResult.data);
  }
}

testWithAuth().catch(console.error);