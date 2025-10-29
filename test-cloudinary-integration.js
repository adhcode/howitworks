/**
 * Test script for Cloudinary integration
 * Run this to test property creation with image uploads
 */

const API_BASE = 'http://localhost:3004/api';

async function testCloudinaryIntegration() {
    console.log('🧪 Testing Cloudinary Integration...\n');

    try {
        // 1. Login as admin
        console.log('1. Logging in as admin...');
        const loginResponse = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: 'admin123'
            })
        });

        if (!loginResponse.ok) {
            throw new Error('Login failed');
        }

        const { token } = await loginResponse.json();
        console.log('✅ Login successful\n');

        // 2. Test property creation endpoint (without files first)
        console.log('2. Testing property creation endpoint...');
        const propertyData = {
            title: 'Test Property with Cloudinary',
            description: 'A test property to verify Cloudinary integration',
            price: 500000,
            location: 'Lagos, Nigeria',
            bedrooms: 3,
            bathrooms: 2,
            area: 120.5,
            propertyType: 'Apartment'
        };

        const createResponse = await fetch(`${API_BASE}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(propertyData)
        });

        if (!createResponse.ok) {
            const error = await createResponse.text();
            console.log('❌ Property creation failed:', error);
        } else {
            const property = await createResponse.json();
            console.log('✅ Property created successfully:', property.property.id);
            console.log('📝 Property title:', property.property.title);
            console.log('💰 Property price:', property.property.price);
        }

        // 3. Test file upload endpoint structure
        console.log('\n3. Testing file upload endpoint structure...');
        
        // Create a simple FormData to test the endpoint
        const formData = new FormData();
        formData.append('title', 'Test Property with Files');
        formData.append('price', '750000');
        formData.append('location', 'Abuja, Nigeria');
        formData.append('propertyType', 'House');
        
        // Note: In a real test, you'd append actual image files here
        // formData.append('images', imageFile1);
        // formData.append('images', imageFile2);

        console.log('📋 FormData structure ready for file uploads');
        console.log('ℹ️  To test with actual files, upload images through the frontend');

        // 4. Check if Cloudinary service is properly configured
        console.log('\n4. Checking Cloudinary configuration...');
        const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME && 
                                   process.env.CLOUDINARY_API_KEY && 
                                   process.env.CLOUDINARY_API_SECRET;
        
        if (hasCloudinaryConfig) {
            console.log('✅ Cloudinary environment variables are set');
        } else {
            console.log('⚠️  Cloudinary environment variables missing');
            console.log('   Please check your .env file for:');
            console.log('   - CLOUDINARY_CLOUD_NAME');
            console.log('   - CLOUDINARY_API_KEY');
            console.log('   - CLOUDINARY_API_SECRET');
        }

        console.log('\n🎉 Cloudinary integration test completed!');
        console.log('\n📋 Next steps:');
        console.log('1. Set up your Cloudinary credentials in .env');
        console.log('2. Test image uploads through the admin panel');
        console.log('3. Verify images are stored in Cloudinary dashboard');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testCloudinaryIntegration();