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
    console.log('\n🔐 Logging in as admin...');
    const response = await axios.post(`${API_URL}/auth/login`, adminCredentials);
    authToken = response.data.access_token;
    console.log('✅ Login successful');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

async function getAllRealtors() {
  try {
    console.log('\n📋 Fetching all realtors...');
    const response = await axios.get(`${API_URL}/admin/realtors`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log(`✅ Found ${response.data.length} realtors`);
    
    if (response.data.length > 0) {
      realtorId = response.data[0].id;
      console.log(`   First realtor: ${response.data[0].user.firstName} ${response.data[0].user.lastName} (ID: ${realtorId})`);
      return true;
    } else {
      console.log('⚠️  No realtors found in database');
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to fetch realtors:', error.response?.data || error.message);
    return false;
  }
}

async function getRealtorById() {
  try {
    console.log(`\n👤 Fetching realtor details for ID: ${realtorId}...`);
    const response = await axios.get(`${API_URL}/admin/realtors/${realtorId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const realtor = response.data;
    console.log('✅ Realtor details retrieved:');
    console.log(`   Name: ${realtor.user.firstName} ${realtor.user.lastName}`);
    console.log(`   Email: ${realtor.user.email}`);
    console.log(`   Phone: ${realtor.phoneNumber || 'Not set'}`);
    console.log(`   Address: ${realtor.residentialAddress || 'Not set'}`);
    console.log(`   Bank: ${realtor.bankName || 'Not set'}`);
    console.log(`   Account: ${realtor.accountNumber || 'Not set'}`);
    console.log(`   Slug: ${realtor.slug}`);
    console.log(`   Active: ${realtor.user.isActive}`);
    console.log(`   Properties: ${realtor._count?.properties || 0}`);
    console.log(`   Leads: ${realtor._count?.leads || 0}`);
    console.log(`   Commissions: ${realtor._count?.commissions || 0}`);
    
    return realtor;
  } catch (error) {
    console.error('❌ Failed to fetch realtor details:', error.response?.data || error.message);
    return null;
  }
}

async function updateRealtor(realtor) {
  try {
    console.log(`\n✏️  Updating realtor ${realtorId}...`);
    
    const updateData = {
      phoneNumber: realtor.phoneNumber || '+234 800 000 0000',
      residentialAddress: realtor.residentialAddress || 'Test Address, Lagos',
      bankName: realtor.bankName || 'Test Bank',
      accountNumber: realtor.accountNumber || '1234567890',
      accountName: `${realtor.user.firstName} ${realtor.user.lastName}`,
      user: {
        firstName: realtor.user.firstName,
        lastName: realtor.user.lastName,
        email: realtor.user.email,
      }
    };
    
    const response = await axios.put(
      `${API_URL}/admin/realtors/${realtorId}`,
      updateData,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    
    console.log('✅ Realtor updated successfully');
    console.log(`   Phone: ${response.data.phoneNumber}`);
    console.log(`   Address: ${response.data.residentialAddress}`);
    console.log(`   Bank: ${response.data.bankName}`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to update realtor:', error.response?.data || error.message);
    return false;
  }
}

async function testRealtorStatus() {
  try {
    console.log(`\n🔄 Testing realtor status toggle...`);
    
    // Toggle to inactive
    await axios.put(
      `${API_URL}/admin/realtors/${realtorId}/status`,
      { isActive: false },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('✅ Set realtor to inactive');
    
    // Toggle back to active
    await axios.put(
      `${API_URL}/admin/realtors/${realtorId}/status`,
      { isActive: true },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('✅ Set realtor back to active');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to toggle status:', error.response?.data || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing Realtor Detail Pages Implementation\n');
  console.log('='.repeat(60));
  
  // Step 1: Login
  if (!await login()) {
    console.log('\n❌ Tests failed: Could not login');
    return;
  }
  
  // Step 2: Get all realtors
  if (!await getAllRealtors()) {
    console.log('\n❌ Tests failed: Could not fetch realtors');
    return;
  }
  
  // Step 3: Get realtor by ID
  const realtor = await getRealtorById();
  if (!realtor) {
    console.log('\n❌ Tests failed: Could not fetch realtor details');
    return;
  }
  
  // Step 4: Update realtor
  if (!await updateRealtor(realtor)) {
    console.log('\n❌ Tests failed: Could not update realtor');
    return;
  }
  
  // Step 5: Test status toggle
  if (!await testRealtorStatus()) {
    console.log('\n❌ Tests failed: Could not toggle status');
    return;
  }
  
  // Step 6: Verify update
  console.log('\n🔍 Verifying updates...');
  await getRealtorById();
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ All tests passed!');
  console.log('\n📝 Summary:');
  console.log('   ✅ Admin can fetch all realtors');
  console.log('   ✅ Admin can fetch individual realtor details');
  console.log('   ✅ Admin can update realtor information');
  console.log('   ✅ Admin can toggle realtor status');
  console.log('\n🌐 Frontend pages should now work:');
  console.log(`   View: http://localhost:3000/admin/realtors/${realtorId}`);
  console.log(`   Edit: http://localhost:3000/admin/realtors/edit/${realtorId}`);
}

runTests().catch(console.error);
