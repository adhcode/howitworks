const axios = require('axios');

const API_URL = 'http://localhost:3004/api';

// Test credentials - try multiple possible admin accounts
const adminCredentials = [
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'admin@example.com', password: 'Admin123!@#' },
  { email: 'admin@howitwork.com', password: 'admin123' },
  { email: 'admin@gmail.com', password: 'admin123' },
];

let authToken = '';

async function checkBackend() {
  try {
    console.log('🔍 Checking if backend is running...');
    await axios.get(`${API_URL}/properties/featured`);
    console.log('✅ Backend is running\n');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Backend is NOT running!');
      console.error('   Please start the backend server:');
      console.error('   cd backend && npm run start:dev\n');
      return false;
    }
    // If we get any other error, backend is running
    console.log('✅ Backend is running\n');
    return true;
  }
}

async function login() {
  console.log('🔐 Attempting to login as admin...\n');

  for (const creds of adminCredentials) {
    try {
      console.log(`   Trying: ${creds.email}`);
      const response = await axios.post(`${API_URL}/auth/login`, creds);
      authToken = response.data.access_token;
      console.log(`   ✅ Login successful with ${creds.email}\n`);
      return true;
    } catch (error) {
      console.log(`   ❌ Failed: ${error.response?.data?.message || error.message}`);
    }
  }

  console.error('\n❌ Could not login with any admin credentials');
  console.error('   Please check your admin account in the database');
  console.error('   Or create one using the seed script\n');
  return false;
}

async function checkProperties() {
  try {
    console.log('📋 Checking properties in database...\n');

    // Try admin endpoint
    console.log('1️⃣ Trying admin properties endpoint...');
    const adminResponse = await axios.get(`${API_URL}/properties`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    console.log(`✅ Found ${adminResponse.data.properties?.length || adminResponse.data.length || 0} properties`);

    if (adminResponse.data.properties) {
      console.log('\nProperties:', JSON.stringify(adminResponse.data.properties, null, 2));
    } else if (Array.isArray(adminResponse.data)) {
      console.log('\nProperties:', JSON.stringify(adminResponse.data, null, 2));
    }

    // Try featured endpoint
    console.log('\n2️⃣ Trying featured properties endpoint...');
    const featuredResponse = await axios.get(`${API_URL}/properties/featured`);
    console.log(`✅ Found ${featuredResponse.data.length || 0} featured properties`);

    if (featuredResponse.data.length > 0) {
      console.log('\nFeatured Properties:', JSON.stringify(featuredResponse.data, null, 2));
    }

    return true;
  } catch (error) {
    console.error('❌ Error checking properties:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
    return false;
  }
}

async function createTestProperty() {
  try {
    console.log('\n3️⃣ Creating a test property...');

    const testProperty = {
      title: 'Test Property - 3 Bedroom Apartment',
      description: 'A beautiful test property in Lagos',
      price: 50000000,
      location: 'Lekki, Lagos',
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      propertyType: 'Apartment',
      listingType: 'sale',
      status: 'active',
      featured: true,
      images: ['/img1.png'],
      realtorId: null
    };

    const response = await axios.post(`${API_URL}/properties`, testProperty, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    console.log('✅ Test property created successfully!');
    console.log('Property ID:', response.data.id);

    return response.data;
  } catch (error) {
    console.error('❌ Error creating property:', error.response?.data || error.message);
    return null;
  }
}

async function runDebug() {
  console.log('🔍 Property System Debug\n');
  console.log('='.repeat(60));
  console.log('');

  // Step 0: Check if backend is running
  if (!await checkBackend()) {
    return;
  }

  // Step 1: Login
  if (!await login()) {
    console.log('\n💡 TIP: You can still check properties without login:');
    console.log('   - Visit: http://localhost:3000/properties');
    console.log('   - Visit: http://localhost:3000');
    console.log('   - Check browser console for errors\n');

    // Try to check public endpoints without auth
    console.log('📋 Checking public properties endpoint...\n');
    try {
      const response = await axios.get(`${API_URL}/properties/featured`);
      console.log(`✅ Found ${response.data.length} featured properties (public)`);
      if (response.data.length > 0) {
        console.log('\nFeatured Properties:');
        response.data.forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.title} - ₦${p.price.toLocaleString()}`);
        });
      }
    } catch (error) {
      console.error('❌ Could not fetch public properties:', error.message);
    }
    return;
  }

  // Step 2: Check existing properties
  await checkProperties();

  // Step 3: Create test property if none exist
  console.log('\n' + '='.repeat(60));
  console.log('\n💡 If no properties were found, creating a test property...\n');
  const newProperty = await createTestProperty();

  if (newProperty) {
    console.log('\n4️⃣ Verifying new property...');
    await checkProperties();
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📝 Summary:');
  console.log('   - Check if properties appear in admin panel: http://localhost:3000/admin/properties');
  console.log('   - Check if featured properties appear on homepage: http://localhost:3000');
  console.log('   - Check browser console for any errors');
  console.log('   - Check network tab for failed API calls');
}

runDebug().catch(console.error);
