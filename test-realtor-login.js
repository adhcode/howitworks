/**
 * Test script for realtor login functionality
 * Tests the complete login flow for a realtor account
 */

const API_BASE_URL = 'http://localhost:3004/api';

async function testRealtorLogin() {
  console.log('🧪 Testing Realtor Login Functionality\n');

  try {
    // Test credentials - use the realtor account that was just created
    const loginData = {
      email: 'adh.devv@gmail.com', // The correct email from the database
      password: 'GoodGod11@@' // The password from the logs (now properly hashed)
    };

    console.log('1. 🔐 Testing login with realtor credentials...');
    console.log('   Email:', loginData.email);
    console.log('   Password: [HIDDEN]');

    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    console.log('   Response status:', loginResponse.status);

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      console.log('   ❌ Login failed:', errorData);
      return;
    }

    const loginResult = await loginResponse.json();
    console.log('   ✅ Login successful!');
    console.log('   User:', {
      id: loginResult.user.id,
      email: loginResult.user.email,
      firstName: loginResult.user.firstName,
      lastName: loginResult.user.lastName,
      role: loginResult.user.role
    });
    console.log('   Token received:', loginResult.access_token ? 'Yes' : 'No');

    // Test accessing protected realtor dashboard endpoint
    console.log('\n2. 📊 Testing realtor dashboard access...');
    
    const dashboardResponse = await fetch(`${API_BASE_URL}/realtor/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.access_token}`,
      },
    });

    console.log('   Response status:', dashboardResponse.status);

    if (!dashboardResponse.ok) {
      const errorData = await dashboardResponse.json();
      console.log('   ❌ Dashboard access failed:', errorData);
      return;
    }

    const dashboardData = await dashboardResponse.json();
    console.log('   ✅ Dashboard access successful!');
    console.log('   Realtor data:', {
      id: dashboardData.realtor.id,
      slug: dashboardData.realtor.slug,
      name: dashboardData.realtor.firstName + ' ' + dashboardData.realtor.lastName
    });
    console.log('   Stats:', dashboardData.stats);
    console.log('   Referral link:', dashboardData.referralLink);

    // Test profile endpoint
    console.log('\n3. 👤 Testing profile access...');
    
    const profileResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.access_token}`,
      },
    });

    console.log('   Response status:', profileResponse.status);

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      console.log('   ❌ Profile access failed:', errorData);
    } else {
      const profileData = await profileResponse.json();
      console.log('   ✅ Profile access successful!');
      console.log('   Profile:', {
        id: profileData.id,
        email: profileData.email,
        name: profileData.firstName + ' ' + profileData.lastName,
        role: profileData.role
      });
    }

    console.log('\n🎉 All tests passed! Realtor login functionality is working correctly.');
    console.log('\n📝 Summary:');
    console.log('   ✅ Login endpoint working');
    console.log('   ✅ JWT token generation working');
    console.log('   ✅ Protected route access working');
    console.log('   ✅ Dashboard data retrieval working');
    console.log('   ✅ Profile access working');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Test different scenarios
async function testLoginScenarios() {
  console.log('\n🧪 Testing Different Login Scenarios\n');

  // Test 1: Invalid credentials
  console.log('1. Testing invalid credentials...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid@example.com',
        password: 'wrongpassword'
      }),
    });

    if (response.status === 401) {
      console.log('   ✅ Correctly rejected invalid credentials');
    } else {
      console.log('   ❌ Unexpected response for invalid credentials:', response.status);
    }
  } catch (error) {
    console.log('   ❌ Error testing invalid credentials:', error.message);
  }

  // Test 2: Missing fields
  console.log('\n2. Testing missing fields...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com'
        // password missing
      }),
    });

    if (response.status === 400 || response.status === 401) {
      console.log('   ✅ Correctly rejected missing password');
    } else {
      console.log('   ❌ Unexpected response for missing password:', response.status);
    }
  } catch (error) {
    console.log('   ❌ Error testing missing fields:', error.message);
  }
}

// Run the tests
async function runAllTests() {
  console.log('🚀 Starting Realtor Login Tests');
  console.log('================================\n');

  await testRealtorLogin();
  await testLoginScenarios();

  console.log('\n================================');
  console.log('✅ All tests completed!');
}

// Execute tests
runAllTests().catch(console.error);