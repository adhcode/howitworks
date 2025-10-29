const axios = require('axios');

const BASE_URL = 'http://localhost:3004';
const FRONTEND_URL = 'http://localhost:3000';

// Test configuration
const testConfig = {
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Test data
const testAdmin = {
    email: 'admin@example.com',
    password: 'admin123'
};

const testRealtorInvitation = {
    email: 'test.realtor.url@example.com',
    firstName: 'Test',
    lastName: 'Realtor'
};

async function testInvitationURL() {
    console.log('🔗 Testing Invitation URL Generation...\n');

    try {
        // 1. Test admin login
        console.log('1. Testing admin login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, testAdmin, testConfig);
        
        if (adminLoginResponse.status === 200) {
            console.log('✅ Admin login successful');
            const adminToken = adminLoginResponse.data.access_token;
            
            const adminHeaders = {
                ...testConfig.headers,
                'Authorization': `Bearer ${adminToken}`
            };

            // 2. Send invitation and check URL
            console.log('\n2. Sending invitation and checking URL...');
            
            const inviteResponse = await axios.post(
                `${BASE_URL}/admin/realtors/invite`,
                testRealtorInvitation,
                { ...testConfig, headers: adminHeaders }
            );

            if (inviteResponse.status === 201) {
                const invitation = inviteResponse.data;
                
                console.log('✅ Invitation created successfully');
                console.log(`   Token: ${invitation.token}`);
                
                // Generate the expected URL
                const expectedUrl = `${FRONTEND_URL}/auth/realtor-signup/${invitation.token}`;
                console.log(`   Expected URL: ${expectedUrl}`);
                
                // Test if the URL is accessible
                console.log('\n3. Testing URL accessibility...');
                try {
                    const urlResponse = await axios.get(expectedUrl, { 
                        timeout: 5000,
                        validateStatus: function (status) {
                            return status < 500; // Accept any status less than 500
                        }
                    });
                    
                    console.log(`   URL Status: ${urlResponse.status}`);
                    
                    if (urlResponse.status === 200) {
                        console.log('✅ URL is accessible');
                        console.log('   Response contains HTML content');
                    } else if (urlResponse.status === 404) {
                        console.log('❌ URL returns 404 - Page not found');
                        console.log('   This means the Next.js route is not working');
                    } else {
                        console.log(`⚠️  URL returns status ${urlResponse.status}`);
                    }
                } catch (urlError) {
                    if (urlError.code === 'ECONNREFUSED') {
                        console.log('❌ Frontend server is not running');
                        console.log('   Please start the frontend server with: npm run dev');
                    } else {
                        console.log('❌ Error accessing URL:', urlError.message);
                    }
                }
                
                // 4. Test token validation endpoint
                console.log('\n4. Testing token validation...');
                try {
                    const validateResponse = await axios.get(
                        `${BASE_URL}/auth/realtor-invitation/${invitation.token}`,
                        testConfig
                    );
                    
                    if (validateResponse.status === 200) {
                        console.log('✅ Token validation successful');
                        console.log(`   Email: ${validateResponse.data.email}`);
                        console.log(`   Name: ${validateResponse.data.firstName} ${validateResponse.data.lastName}`);
                        console.log(`   Status: ${validateResponse.data.status}`);
                    }
                } catch (error) {
                    console.log('❌ Token validation failed:', error.response?.data || error.message);
                }

            } else {
                console.log('❌ Failed to create invitation');
            }

        } else {
            console.log('❌ Admin login failed');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Instructions for manual testing
function printManualTestingInstructions() {
    console.log('\n📋 Manual Testing Instructions:');
    console.log('1. Make sure both servers are running:');
    console.log('   - Backend: npm run start:dev (port 3001)');
    console.log('   - Frontend: npm run dev (port 3000)');
    console.log('');
    console.log('2. Create a realtor invitation through admin panel');
    console.log('3. Check your email for the invitation');
    console.log('4. Click the "Complete Registration" button');
    console.log('5. You should be taken to the realtor signup page');
    console.log('');
    console.log('🔍 Troubleshooting:');
    console.log('- If link goes to homepage: Check Next.js routing');
    console.log('- If 404 error: Verify file structure in frontend/src/app/auth/');
    console.log('- If server error: Check backend logs');
    console.log('- If email not received: Check spam folder');
}

// Run the test
testInvitationURL().then(() => {
    printManualTestingInstructions();
    console.log('\n🏁 Invitation URL test completed!');
}).catch(error => {
    console.error('💥 Test failed:', error);
});