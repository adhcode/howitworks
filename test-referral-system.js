const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
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

const testRealtor = {
    fullName: 'Test Referral Realtor',
    email: 'referral.realtor@example.com',
    phoneNumber: '+234-800-555-0123',
    residentialAddress: '123 Referral Street, Lagos, Nigeria',
    temporaryPassword: 'temp123',
    bankName: 'Test Bank',
    accountNumber: '1234567890',
    accountName: 'Test Referral Realtor'
};

const testLead = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234-800-123-4567',
    message: 'I am interested in this property and came through a referral link.',
    source: 'referral_link'
};

async function testReferralSystem() {
    console.log('🔗 Testing Referral System Functionality...\n');

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

            // 2. Create a test realtor
            console.log('\n2. Creating test realtor...');
            const createRealtorData = {
                user: {
                    firstName: testRealtor.fullName.split(' ')[0],
                    lastName: testRealtor.fullName.split(' ').slice(1).join(' '),
                    email: testRealtor.email,
                    password: testRealtor.temporaryPassword,
                    role: 'REALTOR'
                },
                phoneNumber: testRealtor.phoneNumber,
                residentialAddress: testRealtor.residentialAddress,
                bankName: testRealtor.bankName,
                accountNumber: testRealtor.accountNumber,
                accountName: testRealtor.accountName
            };

            const createRealtorResponse = await axios.post(
                `${BASE_URL}/admin/realtors`,
                createRealtorData,
                { ...testConfig, headers: adminHeaders }
            );

            if (createRealtorResponse.status === 201) {
                console.log('✅ Test realtor created successfully');
                const realtor = createRealtorResponse.data;
                console.log(`   Realtor ID: ${realtor.id}`);
                console.log(`   Realtor Slug: ${realtor.slug}`);
                
                // Generate referral link
                const referralLink = `${FRONTEND_URL}?ref=${realtor.slug}`;
                console.log(`   Referral Link: ${referralLink}`);

                // 3. Test fetching realtor by slug
                console.log('\n3. Testing realtor lookup by slug...');
                try {
                    const realtorBySlugResponse = await axios.get(
                        `${BASE_URL}/realtors/slug/${realtor.slug}`,
                        testConfig
                    );
                    
                    if (realtorBySlugResponse.status === 200) {
                        console.log('✅ Successfully fetched realtor by slug');
                        console.log(`   Found realtor: ${realtorBySlugResponse.data.user.firstName} ${realtorBySlugResponse.data.user.lastName}`);
                    }
                } catch (error) {
                    console.log('⚠️  Realtor by slug endpoint may not exist:', error.response?.status || error.message);
                }

                // 4. Test creating a lead with referral
                console.log('\n4. Testing lead creation with referral...');
                const leadWithReferral = {
                    ...testLead,
                    realtorSlug: realtor.slug
                };

                try {
                    const leadResponse = await axios.post(`${BASE_URL}/leads`, leadWithReferral, testConfig);
                    
                    if (leadResponse.status === 201) {
                        console.log('✅ Successfully created lead with referral');
                        console.log(`   Lead ID: ${leadResponse.data.id}`);
                        console.log(`   Assigned to realtor: ${leadResponse.data.realtorId || 'None'}`);
                        
                        // Verify the lead was assigned to the correct realtor
                        if (leadResponse.data.realtorId === realtor.id) {
                            console.log('✅ Lead correctly assigned to referral realtor');
                        } else {
                            console.log('⚠️  Lead not assigned to referral realtor');
                        }
                    }
                } catch (error) {
                    console.log('❌ Failed to create lead with referral:', error.response?.data || error.message);
                }

                // 5. Test creating a lead without referral (for comparison)
                console.log('\n5. Testing lead creation without referral...');
                try {
                    const leadWithoutReferral = {
                        name: 'Jane Smith',
                        email: 'jane.smith@example.com',
                        phone: '+234-800-987-6543',
                        message: 'I am interested in this property (no referral).',
                        source: 'direct'
                    };

                    const directLeadResponse = await axios.post(`${BASE_URL}/leads`, leadWithoutReferral, testConfig);
                    
                    if (directLeadResponse.status === 201) {
                        console.log('✅ Successfully created direct lead');
                        console.log(`   Lead ID: ${directLeadResponse.data.id}`);
                        console.log(`   Assigned to realtor: ${directLeadResponse.data.realtorId || 'None (admin will handle)'}`);
                    }
                } catch (error) {
                    console.log('❌ Failed to create direct lead:', error.response?.data || error.message);
                }

                // 6. Test fetching realtor's leads
                console.log('\n6. Testing realtor lead tracking...');
                try {
                    const realtorLeadsResponse = await axios.get(
                        `${BASE_URL}/admin/realtors/${realtor.id}`,
                        { ...testConfig, headers: adminHeaders }
                    );
                    
                    if (realtorLeadsResponse.status === 200) {
                        const realtorData = realtorLeadsResponse.data;
                        console.log('✅ Successfully fetched realtor details');
                        console.log(`   Total leads: ${realtorData._count?.leads || 0}`);
                        console.log(`   Total properties: ${realtorData._count?.properties || 0}`);
                        console.log(`   Total commissions: ${realtorData._count?.commissions || 0}`);
                    }
                } catch (error) {
                    console.log('⚠️  Could not fetch realtor details:', error.response?.status || error.message);
                }

                // 7. Clean up - delete test realtor
                console.log('\n7. Cleaning up test data...');
                try {
                    await axios.delete(
                        `${BASE_URL}/admin/realtors/${realtor.id}`,
                        { ...testConfig, headers: adminHeaders }
                    );
                    console.log('✅ Test realtor deleted successfully');
                } catch (error) {
                    console.log('⚠️  Could not delete test realtor:', error.response?.status || error.message);
                }

            } else {
                console.log('❌ Failed to create test realtor');
                return;
            }

        } else {
            console.log('❌ Admin login failed');
            return;
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Additional test for frontend referral tracking
function testFrontendReferralTracking() {
    console.log('\n📱 Frontend Referral Tracking Test Instructions:');
    console.log('1. Open your browser and go to: http://localhost:3000?ref=test-realtor-slug');
    console.log('2. Open browser developer tools (F12) and check the console');
    console.log('3. You should see: "Referral code stored: test-realtor-slug"');
    console.log('4. Check localStorage: localStorage.getItem("referralCode")');
    console.log('5. Navigate to a property detail page and submit an inquiry');
    console.log('6. The lead should be created with the referral code');
    console.log('7. After successful lead creation, the referral code should be cleared');
    console.log('\n🔧 Manual Testing Steps:');
    console.log('- Create a realtor in admin panel');
    console.log('- Copy the referral link from the realtors page');
    console.log('- Open the referral link in a new browser/incognito window');
    console.log('- Submit a property inquiry');
    console.log('- Check if the lead is assigned to the correct realtor');
}

// Run the tests
testReferralSystem().then(() => {
    testFrontendReferralTracking();
    console.log('\n🏁 Referral system test completed!');
}).catch(error => {
    console.error('💥 Test suite failed:', error);
});