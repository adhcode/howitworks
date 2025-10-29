#!/usr/bin/env node

// Simple test to verify frontend can reach backend API
const http = require('http');

async function testFrontendToBackend() {
  console.log('🧪 Testing Frontend to Backend Connection...\n');

  // Test 1: Direct API call (simulating what frontend does)
  console.log('1. Testing direct API call...');
  
  const postData = JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  });

  const options = {
    hostname: 'localhost',
    port: 3004,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  try {
    const result = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            resolve({ 
              status: res.statusCode, 
              data: response,
              headers: res.headers 
            });
          } catch (e) {
            resolve({ 
              status: res.statusCode, 
              data: data,
              headers: res.headers 
            });
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(postData);
      req.end();
    });

    if (result.status === 200 || result.status === 201) {
      console.log('   ✅ API call successful');
      console.log('   📊 Response status:', result.status);
      console.log('   🔑 Access token received:', !!result.data.access_token);
      console.log('   👤 User data:', result.data.user?.email);
    } else {
      console.log('   ❌ API call failed');
      console.log('   📊 Response status:', result.status);
      console.log('   📝 Response data:', result.data);
    }
  } catch (e) {
    console.log('   ❌ Connection error:', e.message);
    console.log('   💡 This might be why the frontend is failing');
  }

  // Test 2: Check if backend is accepting connections
  console.log('\n2. Testing backend connectivity...');
  try {
    const healthCheck = await new Promise((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost',
        port: 3004,
        path: '/api',
        method: 'GET'
      }, (res) => {
        resolve({ status: res.statusCode });
      });
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      req.end();
    });
    
    console.log('   ✅ Backend is accepting connections');
    console.log('   📊 Health check status:', healthCheck.status);
  } catch (e) {
    console.log('   ❌ Backend connectivity issue:', e.message);
  }

  // Test 3: Check frontend accessibility
  console.log('\n3. Testing frontend accessibility...');
  try {
    const frontendCheck = await new Promise((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
      }, (res) => {
        resolve({ status: res.statusCode });
      });
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      req.end();
    });
    
    console.log('   ✅ Frontend is accessible');
    console.log('   📊 Frontend status:', frontendCheck.status);
  } catch (e) {
    console.log('   ❌ Frontend accessibility issue:', e.message);
  }

  console.log('\n🔍 Debugging Information:');
  console.log('   Backend URL: http://localhost:3004/api');
  console.log('   Frontend URL: http://localhost:3000');
  console.log('   Expected API endpoint: http://localhost:3004/api/auth/login');
  
  console.log('\n💡 If frontend is still failing:');
  console.log('   1. Check browser console for detailed error messages');
  console.log('   2. Verify both servers are running in separate terminals');
  console.log('   3. Try refreshing the frontend page');
  console.log('   4. Check if there are any firewall/antivirus blocking connections');
}

testFrontendToBackend().catch(console.error);