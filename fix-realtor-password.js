/**
 * Script to fix the realtor password by properly hashing it
 */

const bcrypt = require('bcrypt');

async function fixRealtorPassword() {
  console.log('🔧 Fixing Realtor Password Hash\n');

  try {
    // The password that was used during registration
    const plainPassword = 'GoodGod11@@';
    const realtorEmail = 'adh.devv@gmail.com';

    // Hash the password properly
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('✅ Password hashed successfully');

    // Now we need to update the database
    // Since we can't directly access Prisma from here, let's create an API endpoint to fix this
    console.log('📝 Hashed password:', hashedPassword);
    console.log('📧 Email:', realtorEmail);

    console.log('\n🔧 To fix this, we need to update the database directly.');
    console.log('The hashed password above should be used to update the user record.');

    // Let's try to create a temporary fix endpoint
    const API_BASE_URL = 'http://localhost:3004/api';

    // First login as admin
    console.log('\n1. 🔐 Logging in as admin...');
    const adminLoginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      }),
    });

    if (!adminLoginResponse.ok) {
      console.log('   ❌ Admin login failed');
      return;
    }

    const adminLogin = await adminLoginResponse.json();
    console.log('   ✅ Admin login successful');

    // We'll need to create a special endpoint to fix this
    console.log('\n💡 Solution: We need to create a new realtor account or fix the existing one.');
    console.log('   The current account has an unhashed password, which is why login fails.');
    console.log('   The auth service expects bcrypt-hashed passwords.');

    console.log('\n🎯 Recommended action:');
    console.log('   1. Delete the current realtor account');
    console.log('   2. Create a new invitation');
    console.log('   3. Complete the signup process again');
    console.log('   4. This will create a properly hashed password');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixRealtorPassword().catch(console.error);