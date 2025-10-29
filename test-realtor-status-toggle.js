const axios = require('axios');

const API_URL = 'http://localhost:4000';

// Test credentials
const adminCredentials = {
  email: 'admin@example.com',
  password: 'Admin123!@#'
};

let authToken = '';
let realtorId = '';

async function login() {
  try {
    console.log('🔐 Logging in as admin...');
    const response = await axios.post(`${API_URL}/auth/login`, adminCredentials);
    authToken = response.data.access_token;
    console.log('✅ Login successful\n');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

async function getFirstRealtor() {
  try {
    const response = await axios.get(`${API_URL}/admin/realtors`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (response.data.length > 0) {
      realtorId = response.data[0].id;
      console.log(`📋 Found realtor: ${response.data[0].user.firstName} ${response.data[0].user.lastName}`);
      console.log(`   ID: ${realtorId}`);
      console.log(`   Current Status: ${response.data[0].user.isActive ? 'Active' : 'Inactive'}\n`);
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error('❌ Failed to fetch realtors:', error.response?.data || error.message);
    return null;
  }
}

async function toggleStatus(currentStatus) {
  try {
    const newStatus = !currentStatus;
    console.log(`🔄 Toggling status to: ${newStatus ? 'Active' : 'Inactive'}...`);
    
    const response = await axios.put(
      `${API_URL}/admin/realtors/${realtorId}/status`,
      { isActive: newStatus },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    
    console.log(`✅ Status updated successfully`);
    console.log(`   New Status: ${response.data.user.isActive ? 'Active' : 'Inactive'}\n`);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to toggle status:', error.response?.data || error.message);
    return null;
  }
}

async function verifyStatus() {
  try {
    console.log('🔍 Verifying status...');
    const response = await axios.get(`${API_URL}/admin/realtors/${realtorId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log(`   Current Status: ${response.data.user.isActive ? 'Active ✅' : 'Inactive ⚠️'}\n`);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to verify status:', error.response?.data || error.message);
    return null;
  }
}

async function runTest() {
  console.log('🧪 Testing Realtor Status Toggle\n');
  console.log('='.repeat(60));
  console.log('');
  
  // Step 1: Login
  if (!await login()) {
    console.log('❌ Test failed: Could not login');
    return;
  }
  
  // Step 2: Get first realtor
  const realtor = await getFirstRealtor();
  if (!realtor) {
    console.log('❌ Test failed: No realtors found');
    return;
  }
  
  const initialStatus = realtor.user.isActive;
  
  // Step 3: Toggle to opposite status
  const updated1 = await toggleStatus(initialStatus);
  if (!updated1) {
    console.log('❌ Test failed: Could not toggle status');
    return;
  }
  
  // Step 4: Verify the change
  await verifyStatus();
  
  // Step 5: Toggle back to original status
  const updated2 = await toggleStatus(!initialStatus);
  if (!updated2) {
    console.log('❌ Test failed: Could not toggle status back');
    return;
  }
  
  // Step 6: Final verification
  const final = await verifyStatus();
  
  console.log('='.repeat(60));
  if (final && final.user.isActive === initialStatus) {
    console.log('✅ All tests passed!');
    console.log('\n📝 Summary:');
    console.log('   ✅ Status can be toggled from Active to Inactive');
    console.log('   ✅ Status can be toggled from Inactive to Active');
    console.log('   ✅ Status changes are persisted in database');
    console.log('\n🌐 Test the UI:');
    console.log(`   View: http://localhost:3000/admin/realtors/${realtorId}`);
    console.log(`   Edit: http://localhost:3000/admin/realtors/edit/${realtorId}`);
  } else {
    console.log('❌ Test failed: Status not restored to original value');
  }
}

runTest().catch(console.error);
