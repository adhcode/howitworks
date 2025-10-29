/**
 * Script to fix the realtor password using the temporary API endpoint
 */

const API_BASE_URL = 'http://localhost:3004/api';

async function fixPasswordViaAPI() {
  console.log('🔧 Fixing Realtor Password via API\n');

  try {
    const realtorEmail = 'adh.devv@gmail.com';
    const plainPassword = 'GoodGod11@@';

    console.log('📧 Email:', realtorEmail);
    console.log('🔐 Fixing password...');

    const response = await fetch(`${API_BASE_URL}/auth/fix-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: realtorEmail,
        password: plainPassword
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('❌ Failed to fix password:', errorData);
      return;
    }

    const result = await response.json();
    console.log('✅ Password fixed successfully!');
    console.log('Updated user:', result);

    // Now test login
    console.log('\n🧪 Testing login with fixed password...');
    
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: realtorEmail,
        password: plainPassword
      }),
    });

    console.log('Login response status:', loginResponse.status);

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      console.log('❌ Login still failed:', errorData);
      return;
    }

    const loginResult = await loginResponse.json();
    console.log('✅ Login successful!');
    console.log('User:', {
      id: loginResult.user.id,
      email: loginResult.user.email,
      firstName: loginResult.user.firstName,
      lastName: loginResult.user.lastName,
      role: loginResult.user.role
    });
    console.log('Token received:', loginResult.access_token ? 'Yes' : 'No');

    console.log('\n🎉 Password fix successful! Realtor can now login.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixPasswordViaAPI().catch(console.error);