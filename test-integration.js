#!/usr/bin/env node

const http = require('http');

// Test data
const testUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
  { email: 'realtor@example.com', password: 'realtor123', role: 'REALTOR' },
  { email: 'investor@example.com', password: 'investor123', role: 'INVESTOR' }
];

async function testLogin(user) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      email: user.email,
      password: user.password
    });

    const options = {
      hostname: 'localhost',
      port: 3004,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
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

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

async function testProtectedEndpoint(token, endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3004,
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const req = http.request(options, (res) => {
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

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Backend-Frontend Integration...\n');

  // Test 1: Backend Health Check
  console.log('1. Testing Backend Health...');
  try {
    const healthCheck = await testProtectedEndpoint('', '/api/auth/login');
    console.log('   ✅ Backend is responding\n');
  } catch (e) {
    console.log('   ❌ Backend is not responding:', e.message);
    return;
  }

  // Test 2: User Authentication
  console.log('2. Testing User Authentication...');
  for (const user of testUsers) {
    try {
      const result = await testLogin(user);
      if ((result.status === 200 || result.status === 201) && result.data.access_token) {
        console.log(`   ✅ ${user.role} login successful`);
        
        // Test protected endpoints based on role
        if (user.role === 'INVESTOR') {
          const dashboardTest = await testProtectedEndpoint(result.data.access_token, '/api/investor/dashboard');
          if (dashboardTest.status === 200) {
            console.log(`   ✅ ${user.role} dashboard accessible`);
          } else {
            console.log(`   ❌ ${user.role} dashboard failed:`, dashboardTest.status);
          }
        }
      } else {
        console.log(`   ❌ ${user.role} login failed:`, result.status, result.data.message);
      }
    } catch (e) {
      console.log(`   ❌ ${user.role} login error:`, e.message);
    }
  }

  console.log('\n3. Testing Frontend Accessibility...');
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
      req.end();
    });
    
    if (frontendCheck.status === 200) {
      console.log('   ✅ Frontend is accessible at http://localhost:3000');
    } else {
      console.log('   ❌ Frontend returned status:', frontendCheck.status);
    }
  } catch (e) {
    console.log('   ❌ Frontend is not accessible:', e.message);
  }

  console.log('\n🎉 Integration test completed!');
  console.log('\n📋 Test Credentials:');
  testUsers.forEach(user => {
    console.log(`   ${user.role}: ${user.email} / ${user.password}`);
  });
  
  console.log('\n🌐 Access URLs:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend API: http://localhost:3004/api');
  console.log('   Login Page: http://localhost:3000/login');
}

runTests().catch(console.error);