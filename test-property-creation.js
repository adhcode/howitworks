#!/usr/bin/env node

const http = require('http');

async function testPropertyCreation() {
  console.log('🧪 Testing Property Creation...\n');

  // First, login as admin to get token
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
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(loginData);
    req.end();
  });

  if (loginResult.status !== 200 && loginResult.status !== 201) {
    console.log('❌ Login failed:', loginResult.status);
    return;
  }

  console.log('✅ Login successful');
  const token = loginResult.data.access_token;

  // Now test property creation
  console.log('\n2. Creating a test property...');
  const propertyData = JSON.stringify({
    title: 'Test Property',
    description: 'A test property created via API',
    price: 50000000,
    location: 'Lagos, Nigeria',
    bedrooms: 3,
    bathrooms: 2,
    area: 200.5,
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
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.write(propertyData);
    req.end();
  });

  if (createResult.status === 201) {
    console.log('✅ Property created successfully');
    console.log('📋 Property details:', createResult.data.property.title);
  } else {
    console.log('❌ Property creation failed:', createResult.status);
    console.log('📝 Response:', createResult.data);
  }

  // Test getting all properties
  console.log('\n3. Fetching all properties...');
  const getResult = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3004,
      path: '/api/properties',
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });

  if (getResult.status === 200) {
    console.log('✅ Properties fetched successfully');
    console.log(`📊 Total properties: ${getResult.data.properties.length}`);
    console.log(`📄 Pagination: Page ${getResult.data.pagination.page} of ${getResult.data.pagination.pages}`);
  } else {
    console.log('❌ Failed to fetch properties:', getResult.status);
  }

  console.log('\n🎉 Property creation test completed!');
}

testPropertyCreation().catch(console.error);