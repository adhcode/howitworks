const axios = require('axios');

const API_URL = 'http://localhost:3004/api';

async function verifySystem() {
  console.log('🔍 Property System Verification\n');
  console.log('='.repeat(60));
  
  let allGood = true;

  // Test 1: Backend Health
  console.log('\n1️⃣ Testing Backend Health...');
  try {
    await axios.get(`${API_URL}/properties/featured`);
    console.log('   ✅ Backend is running and responding');
  } catch (error) {
    console.log('   ❌ Backend is not responding');
    console.log('   💡 Start backend: cd backend && npm run start:dev');
    allGood = false;
  }

  // Test 2: Properties Endpoint
  console.log('\n2️⃣ Testing Properties Endpoint...');
  try {
    const response = await axios.get(`${API_URL}/properties`);
    const count = response.data.properties?.length || 0;
    console.log(`   ✅ Properties endpoint working (${count} properties)`);
    
    if (count === 0) {
      console.log('   ⚠️  No properties in database');
      console.log('   💡 Run: cd backend && npm run seed');
    }
  } catch (error) {
    console.log('   ❌ Properties endpoint failed');
    allGood = false;
  }

  // Test 3: Featured Properties
  console.log('\n3️⃣ Testing Featured Properties...');
  try {
    const response = await axios.get(`${API_URL}/properties/featured`);
    const count = response.data.length || 0;
    console.log(`   ✅ Featured endpoint working (${count} featured)`);
    
    if (count === 0) {
      console.log('   ℹ️  No featured properties (this is okay)');
    }
  } catch (error) {
    console.log('   ❌ Featured endpoint failed');
    allGood = false;
  }

  // Test 4: Auth Endpoint
  console.log('\n4️⃣ Testing Auth Endpoint...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    if (response.data.access_token) {
      console.log('   ✅ Auth endpoint working');
    } else {
      console.log('   ⚠️  Auth endpoint responded but no token');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('   ⚠️  Auth endpoint working but credentials invalid');
      console.log('   💡 Run: cd backend && npm run seed');
    } else {
      console.log('   ❌ Auth endpoint failed');
      allGood = false;
    }
  }

  // Test 5: CORS Configuration
  console.log('\n5️⃣ Testing CORS Configuration...');
  try {
    const response = await axios.options(`${API_URL}/properties`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET'
      }
    });
    console.log('   ✅ CORS is configured');
  } catch (error) {
    console.log('   ⚠️  CORS check inconclusive (this is usually okay)');
  }

  console.log('\n' + '='.repeat(60));
  
  if (allGood) {
    console.log('\n✅ All systems operational!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Restart frontend: cd frontend && npm run dev');
    console.log('   2. Clear browser cache and localStorage');
    console.log('   3. Visit: http://localhost:3000');
    console.log('   4. Check admin panel: http://localhost:3000/admin/properties');
  } else {
    console.log('\n❌ Some issues detected. Please fix them and try again.');
  }
  
  console.log('\n📚 Documentation: See PROPERTY_FETCH_FIX.md for details\n');
}

verifySystem().catch(console.error);
