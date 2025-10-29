/**
 * Test script to check what users exist in the database
 */

const API_BASE_URL = 'http://localhost:3004/api';

async function checkUsers() {
  console.log('🔍 Checking Users in Database\n');

  try {
    // First, let's try to login as admin to get access
    console.log('1. 🔐 Logging in as admin...');
    
    const adminLoginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      }),
    });

    if (!adminLoginResponse.ok) {
      console.log('   ❌ Admin login failed');
      const errorData = await adminLoginResponse.json();
      console.log('   Error:', errorData);
      return;
    }

    const adminLogin = await adminLoginResponse.json();
    console.log('   ✅ Admin login successful');

    // Now get all users
    console.log('\n2. 📋 Fetching all users...');
    
    const usersResponse = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminLogin.access_token}`,
      },
    });

    if (!usersResponse.ok) {
      console.log('   ❌ Failed to fetch users');
      const errorData = await usersResponse.json();
      console.log('   Error:', errorData);
      return;
    }

    const users = await usersResponse.json();
    console.log('   ✅ Users fetched successfully');
    console.log('   Total users:', users.length);

    console.log('\n📊 User Details:');
    users.forEach((user, index) => {
      console.log(`\n   ${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`      Email: ${user.email}`);
      console.log(`      Role: ${user.role}`);
      console.log(`      Active: ${user.isActive}`);
      console.log(`      Created: ${new Date(user.createdAt).toLocaleString()}`);
      
      if (user.realtor) {
        console.log(`      Realtor ID: ${user.realtor.id}`);
        console.log(`      Realtor Slug: ${user.realtor.slug}`);
        console.log(`      Phone: ${user.realtor.phoneNumber || 'Not set'}`);
        console.log(`      Bank: ${user.realtor.bankName || 'Not set'}`);
      }
    });

    // Check specifically for the realtor we're trying to login with
    console.log('\n🔍 Looking for realtor with email: adekunledh@gmail.com');
    const targetRealtor = users.find(user => user.email === 'adekunledh@gmail.com');
    
    if (targetRealtor) {
      console.log('   ✅ Found realtor account!');
      console.log('   Details:', {
        id: targetRealtor.id,
        email: targetRealtor.email,
        firstName: targetRealtor.firstName,
        lastName: targetRealtor.lastName,
        role: targetRealtor.role,
        isActive: targetRealtor.isActive,
        hasRealtor: !!targetRealtor.realtor
      });
    } else {
      console.log('   ❌ Realtor account not found!');
      console.log('   This might be why login is failing.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkUsers().catch(console.error);