#!/usr/bin/env node

const http = require('http');
const https = require('https');

// Test configuration
const BACKEND_URL = 'http://localhost:3004';
const FRONTEND_URL = 'http://localhost:3000';

const testUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
  { email: 'realtor@example.com', password: 'realtor123', role: 'REALTOR' },
  { email: 'investor@example.com', password: 'investor123', role: 'INVESTOR' }
];

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = res.headers['content-type']?.includes('application/json') 
            ? JSON.parse(data) 
            : data;
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

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function testBackendEndpoints() {
  console.log('🔧 Testing Backend API Endpoints...\n');
  
  const tests = [
    {
      name: 'Health Check',
      url: `${BACKEND_URL}/api`,
      expected: [200, 404] // 404 is fine, means server is responding
    },
    {
      name: 'Login Endpoint',
      url: `${BACKEND_URL}/api/auth/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' }),
      expected: [200, 201]
    }
  ];

  for (const test of tests) {
    try {
      const result = await makeRequest(test.url, {
        method: test.method,
        headers: test.headers,
        body: test.body
      });
      
      if (test.expected.includes(result.status)) {
        console.log(`   ✅ ${test.name}: ${result.status}`);
      } else {
        console.log(`   ❌ ${test.name}: Expected ${test.expected}, got ${result.status}`);
      }
    } catch (e) {
      console.log(`   ❌ ${test.name}: ${e.message}`);
    }
  }
}

async function testUserAuthentication() {
  console.log('\n🔐 Testing User Authentication...\n');
  
  const tokens = {};
  
  for (const user of testUsers) {
    try {
      const result = await makeRequest(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: user.password })
      });
      
      if ([200, 201].includes(result.status) && result.data.access_token) {
        console.log(`   ✅ ${user.role} login successful`);
        tokens[user.role] = result.data.access_token;
        
        // Test profile endpoint
        const profileResult = await makeRequest(`${BACKEND_URL}/api/auth/profile`, {
          headers: { 'Authorization': `Bearer ${result.data.access_token}` }
        });
        
        if (profileResult.status === 200) {
          console.log(`   ✅ ${user.role} profile accessible`);
        } else {
          console.log(`   ❌ ${user.role} profile failed: ${profileResult.status}`);
        }
      } else {
        console.log(`   ❌ ${user.role} login failed: ${result.status}`);
      }
    } catch (e) {
      console.log(`   ❌ ${user.role} login error: ${e.message}`);
    }
  }
  
  return tokens;
}

async function testRoleSpecificEndpoints(tokens) {
  console.log('\n🎭 Testing Role-Specific Endpoints...\n');
  
  const roleTests = [
    {
      role: 'INVESTOR',
      endpoints: [
        '/api/investor/dashboard',
        '/api/investor/profile',
        '/api/investor/investments'
      ]
    },
    {
      role: 'REALTOR',
      endpoints: [
        '/api/realtor/dashboard',
        '/api/realtor/profile',
        '/api/realtor/leads'
      ]
    },
    {
      role: 'ADMIN',
      endpoints: [
        '/api/admin/dashboard',
        '/api/admin/realtors',
        '/api/users'
      ]
    }
  ];
  
  for (const roleTest of roleTests) {
    if (tokens[roleTest.role]) {
      console.log(`   Testing ${roleTest.role} endpoints:`);
      
      for (const endpoint of roleTest.endpoints) {
        try {
          const result = await makeRequest(`${BACKEND_URL}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${tokens[roleTest.role]}` }
          });
          
          if ([200, 201].includes(result.status)) {
            console.log(`     ✅ ${endpoint}`);
          } else {
            console.log(`     ❌ ${endpoint}: ${result.status}`);
          }
        } catch (e) {
          console.log(`     ❌ ${endpoint}: ${e.message}`);
        }
      }
    }
  }
}

async function testFrontendPages() {
  console.log('\n🌐 Testing Frontend Pages...\n');
  
  const pages = [
    { name: 'Homepage', path: '/' },
    { name: 'Login Page', path: '/login' },
    { name: 'About Page', path: '/about' },
  ];
  
  for (const page of pages) {
    try {
      const result = await makeRequest(`${FRONTEND_URL}${page.path}`);
      
      if (result.status === 200) {
        console.log(`   ✅ ${page.name}: Accessible`);
      } else {
        console.log(`   ❌ ${page.name}: ${result.status}`);
      }
    } catch (e) {
      console.log(`   ❌ ${page.name}: ${e.message}`);
    }
  }
}

async function testCORSConfiguration() {
  console.log('\n🔗 Testing CORS Configuration...\n');
  
  try {
    const result = await makeRequest(`${BACKEND_URL}/api/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': FRONTEND_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    const corsHeaders = result.headers['access-control-allow-origin'];
    if (corsHeaders) {
      console.log(`   ✅ CORS configured: ${corsHeaders}`);
    } else {
      console.log(`   ❌ CORS not properly configured`);
    }
  } catch (e) {
    console.log(`   ❌ CORS test failed: ${e.message}`);
  }
}

async function runFullIntegrationTest() {
  console.log('🚀 Full Integration Test Suite\n');
  console.log('=' .repeat(50));
  
  // Test backend endpoints
  await testBackendEndpoints();
  
  // Test user authentication
  const tokens = await testUserAuthentication();
  
  // Test role-specific endpoints
  await testRoleSpecificEndpoints(tokens);
  
  // Test frontend pages
  await testFrontendPages();
  
  // Test CORS configuration
  await testCORSConfiguration();
  
  console.log('\n' + '=' .repeat(50));
  console.log('🎉 Integration Test Suite Completed!\n');
  
  console.log('📋 Test Credentials:');
  testUsers.forEach(user => {
    console.log(`   ${user.role}: ${user.email} / ${user.password}`);
  });
  
  console.log('\n🌐 Application URLs:');
  console.log(`   Frontend: ${FRONTEND_URL}`);
  console.log(`   Backend API: ${BACKEND_URL}/api`);
  console.log(`   Login Page: ${FRONTEND_URL}/login`);
  
  console.log('\n📝 Next Steps:');
  console.log('   1. Open the frontend in your browser');
  console.log('   2. Test the login functionality with the provided credentials');
  console.log('   3. Navigate through different user dashboards');
  console.log('   4. Verify data is loading from the backend API');
}

// Run the test suite
runFullIntegrationTest().catch(console.error);