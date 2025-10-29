const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:3004/api';

async function checkFrontend() {
  console.log('🔍 Frontend Connection Verification\n');
  console.log('='.repeat(60));
  
  // Check if frontend is running
  console.log('\n1️⃣ Checking if frontend is running...');
  try {
    await axios.get(FRONTEND_URL, { timeout: 3000 });
    console.log('✅ Frontend is running on', FRONTEND_URL);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Frontend is NOT running!');
      console.log('   Start it with: cd frontend && npm run dev\n');
      return false;
    }
    console.log('✅ Frontend is running (got response)');
  }
  
  // Check if backend is accessible
  console.log('\n2️⃣ Checking if backend API is accessible...');
  try {
    const response = await axios.get(`${API_URL}/properties/featured`);
    console.log(`✅ Backend API is accessible`);
    console.log(`   Found ${response.data.length} featured properties`);
  } catch (error) {
    console.log('❌ Backend API is NOT accessible!');
    console.log('   Error:', error.message);
    return false;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Both frontend and backend are running!');
  console.log('\n📋 Next Steps:');
  console.log('   1. Open browser: http://localhost:3000');
  console.log('   2. Open DevTools (F12)');
  console.log('   3. Check Console tab for errors');
  console.log('   4. Check Network tab for API calls');
  console.log('\n🔍 What to look for:');
  console.log('   - Red errors in Console');
  console.log('   - Failed network requests (red in Network tab)');
  console.log('   - CORS errors');
  console.log('   - 401/403 authentication errors');
  console.log('\n📄 Test Pages:');
  console.log('   - Homepage: http://localhost:3000');
  console.log('   - Properties: http://localhost:3000/properties');
  console.log('   - Admin Login: http://localhost:3000/auth/login');
  console.log('   - Admin Properties: http://localhost:3000/admin/properties');
  console.log('\n🧪 Browser Test:');
  console.log('   - Open: test-frontend-api.html');
  console.log('   - This tests API calls directly from browser');
  
  return true;
}

checkFrontend().catch(console.error);
