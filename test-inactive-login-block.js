const axios = require('axios');

const API_URL = 'http://localhost:4000';

// Test credentials
const adminCredentials = {
  email: 'admin@example.com',
  password: 'Admin123!@#'
};

let adminToken = '';
let realtorId = '';
let realtorEmail = '';
let realtorPassword = 'TestPassword123!'; // Assuming this is the password

async function loginAsAdmin() {
  try {
    console.log('🔐 Logging in as admin...');
    const response = await axios.post(`${API_URL}/auth/login`, adminCredentials);
    adminToken = response.data.access_token;
    console.log('✅ Admin login successful\n');
    return true;
  } catch (error) {
    console.error('❌ Admin login failed:', error.response?.data || error.message);
    return false;
  }
}

async function getFirstRealtor() {
  try {
    const response = await axios.get(`${API_URL}/admin/realtors`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.data.length > 0) {
      const realtor = response.data[0];
      realtorId = realtor.id;
      realtorEmail = realtor.user.email;
      
      console.log(`📋 Found realtor: ${realtor.user.firstName} ${realtor.user.lastName}`);
      console.log(`   Email: ${realtorEmail}`);
      console.log(`   Status: ${realtor.user.isActive ? 'Active' : 'Inactive'}\n`);
      return realtor;
    }
    return null;
  } catch (error) {
    console.error('❌ Failed to fetch realtors:', error.response?.data || error.message);
    return null;
  }
}

async function tryRealtorLogin(shouldSucceed = true) {
  try {
    console.log(`🔑 Attempting to log in as realtor (${realtorEmail})...`);
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: realtorEmail,
      password: realtorPassword
    });
    
    if (shouldSucceed) {
      console.log('✅ Login successful (as expected)\n');
      return true;
    } else {
      console.log('❌ Login succeeded but should have failed!\n');
      return false;
    }
  } catch (error) {
    if (!shouldSucceed) {
      console.log('✅ Login blocked (as expected)');
      console.log(`   Message: ${error.response?.data?.message || error.message}\n`);
      return true;
    } else {
      console.log('❌ Login failed but should have succeeded!');
      console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
      return false;
    }
  }
}

async function deactivateRealtor() {
  try {
    console.log('🔄 Deactivating realtor...');
    await axios.put(
      `${API_URL}/admin/realtors/${realtorId}/status`,
      { isActive: false },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('✅ Realtor deactivated\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to deactivate:', error.response?.data || error.message);
    return false;
  }
}

async function activateRealtor() {
  try {
    console.log('🔄 Activating realtor...');
    await axios.put(
      `${API_URL}/admin/realtors/${realtorId}/status`,
      { isActive: true },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('✅ Realtor activated\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to activate:', error.response?.data || error.message);
    return false;
  }
}

async function runTest() {
  console.log('🧪 Testing Inactive User Login Block\n');
  console.log('='.repeat(60));
  console.log('');
  
  // Step 1: Login as admin
  if (!await loginAsAdmin()) {
    console.log('❌ Test failed: Could not login as admin');
    return;
  }
  
  // Step 2: Get first realtor
  const realtor = await getFirstRealtor();
  if (!realtor) {
    console.log('❌ Test failed: No realtors found');
    return;
  }
  
  // Store initial status
  const initialStatus = realtor.user.isActive;
  
  // Step 3: Ensure realtor is active first
  if (!initialStatus) {
    console.log('ℹ️  Realtor is currently inactive, activating first...\n');
    await activateRealtor();
  }
  
  // Step 4: Try login while active (should succeed)
  console.log('📝 Test 1: Login while ACTIVE');
  console.log('-'.repeat(60));
  const test1 = await tryRealtorLogin(true);
  
  // Step 5: Deactivate realtor
  await deactivateRealtor();
  
  // Step 6: Try login while inactive (should fail)
  console.log('📝 Test 2: Login while INACTIVE');
  console.log('-'.repeat(60));
  const test2 = await tryRealtorLogin(false);
  
  // Step 7: Reactivate realtor
  await activateRealtor();
  
  // Step 8: Try login after reactivation (should succeed)
  console.log('📝 Test 3: Login after REACTIVATION');
  console.log('-'.repeat(60));
  const test3 = await tryRealtorLogin(true);
  
  // Restore original status
  if (!initialStatus) {
    console.log('ℹ️  Restoring original inactive status...\n');
    await deactivateRealtor();
  }
  
  // Results
  console.log('='.repeat(60));
  if (test1 && test2 && test3) {
    console.log('✅ All tests passed!');
    console.log('\n📝 Summary:');
    console.log('   ✅ Active realtors can log in');
    console.log('   ✅ Inactive realtors are blocked from logging in');
    console.log('   ✅ Reactivated realtors can log in again');
    console.log('\n🔒 Security Feature Working:');
    console.log('   The system properly blocks inactive users from accessing the platform.');
  } else {
    console.log('❌ Some tests failed!');
    console.log(`   Test 1 (Active Login): ${test1 ? '✅' : '❌'}`);
    console.log(`   Test 2 (Inactive Block): ${test2 ? '✅' : '❌'}`);
    console.log(`   Test 3 (Reactivation): ${test3 ? '✅' : '❌'}`);
  }
  
  console.log('\n⚠️  Note: If Test 1 failed, the realtor password might be different.');
  console.log('   Update the realtorPassword variable in this script.');
}

runTest().catch(console.error);
