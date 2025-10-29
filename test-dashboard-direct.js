/**
 * Test script to directly test the realtor dashboard endpoint
 */

const API_BASE_URL = 'http://localhost:3004/api';

async function testDashboardDirect() {
  console.log('🧪 Testing Realtor Dashboard Endpoint Directly\n');

  try {
    // First login to get token
    console.log('1. 🔐 Logging in as realtor...');
    
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'adh.devv@gmail.com',
        password: 'GoodGod11@@'
      }),
    });

    if (!loginResponse.ok) {
      console.log('❌ Login failed');
      return;
    }

    const loginResult = await loginResponse.json();
    console.log('✅ Login successful');
    console.log('User ID:', loginResult.user.id);
    console.log('User Role:', loginResult.user.role);

    // Test dashboard endpoint
    console.log('\n2. 📊 Testing dashboard endpoint...');
    
    const dashboardResponse = await fetch(`${API_BASE_URL}/realtor/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.access_token}`,
      },
    });

    console.log('Dashboard response status:', dashboardResponse.status);
    console.log('Dashboard response headers:', Object.fromEntries(dashboardResponse.headers.entries()));

    if (!dashboardResponse.ok) {
      const errorText = await dashboardResponse.text();
      console.log('❌ Dashboard failed');
      console.log('Error response:', errorText);
      return;
    }

    const dashboardData = await dashboardResponse.json();
    console.log('✅ Dashboard successful');
    console.log('Dashboard data structure:');
    console.log(JSON.stringify(dashboardData, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testDashboardDirect().catch(console.error);