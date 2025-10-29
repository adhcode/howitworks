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
    fullName: 'John Smith Realtor',
    email: 'john.smith.realtor@example.com',
    phoneNumber: '+234-800-555-1234',
    residentialAddress: '456 Realtor Avenue, Lagos, Nigeria',
    temporaryPassword: 'temp123456',
    bankName: 'First Bank Nigeria',
    accountNumber: '0123456789',
    accountName: 'John Smith Realtor'
};

async function testAddRealtorAndReferral() {
    console.log('🏢 Testing Add Realtor and Referral System...\n');

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

            // 2. Test creating a realtor using the same format as the frontend
            console.log('\n2. Testing realtor creation (frontend format)...');
            
            // Split fullName into firstName and lastName (same as frontend hook)
            const nameParts = testRealtor.fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            const realtorData = {
                user: {
                    firstName,
                    lastName,
                    email: testRealtor.email,
                    password: testRealtor.temporaryPassword,
                    role: 'REALTOR'
                },
                phoneNumber: testRealtor.phoneNumber,
                residentialAddress: testRealtor.residentialAddress,
                bankName: testRealtor.bankName,
                accountNumber: testRealtor.accountNumber,
                accountName: testRealtor.accountName,
                profileImage: testRealtor.profileImage || '/dashboard/avatar.svg'
            };

            const createRealtorResponse = await axios.post(
                `${BASE_URL}/admin/realtors`,
                realtorData,
                { ...testConfig, headers: adminHeaders }
            );

            if (createRealtorResponse.status === 201) {
                console.log('✅ Realtor created successfully');
                const realtor = createRealtorResponse.data;
                
                console.log(`   Realtor ID: ${realtor.id}`);
                console.log(`   Realtor Slug: ${realtor.slug}`);
                console.log(`   User ID: ${realtor.userId}`);
                console.log(`   Full Name: ${realtor.user.firstName} ${realtor.user.lastName}`);
                console.log(`   Email: ${realtor.user.email}`);
                console.log(`   Phone: ${realtor.phoneNumber}`);
                console.log(`   Bank: ${realtor.bankName} - ${realtor.accountNumber}`);

                // 3. Generate and test referral link
                console.log('\n3. Testing referral link generation...');
                const referralLink = `${FRONTEND_URL}?ref=${realtor.slug}`;
                console.log(`   Generated Referral Link: ${referralLink}`);

                // 4. Test fetching realtor by slug (for referral validation)
                console.log('\n4. Testing realtor lookup by slug...');
                try {
                    const realtorBySlugResponse = await axios.get(
                        `${BASE_URL}/realtors/slug/${realtor.slug}`,
                        testConfig
                    );
                    
                    if (realtorBySlugResponse.status === 200) {
                        console.log('✅ Successfully fetched realtor by slug');
                        const fetchedRealtor = realtorBySlugResponse.data;
                        console.log(`   Found: ${fetchedRealtor.user.firstName} ${fetchedRealtor.user.lastName}`);
                        console.log(`   Slug matches: ${fetchedRealtor.slug === realtor.slug}`);
                    }
                } catch (error) {
                    console.log('⚠️  Realtor by slug endpoint may not exist:', error.response?.status || error.message);
                    console.log('   This endpoint is needed for referral link validation');
                }

                // 5. Test lead creation with referral
                console.log('\n5. Testing lead creation with referral...');
                const testLead = {
                    name: 'Jane Doe Client',
                    email: 'jane.doe.client@example.com',
                    phone: '+234-800-999-8888',
                    message: 'I am interested in properties and came through a referral link.',
                    realtorSlug: realtor.slug,
                    source: 'referral_link'
                };

                try {
                    const leadResponse = await axios.post(`${BASE_URL}/leads`, testLead, testConfig);
                    
                    if (leadResponse.status === 201) {
                        console.log('✅ Successfully created lead with referral');
                        const lead = leadResponse.data;
                        console.log(`   Lead ID: ${lead.id}`);
                        console.log(`   Lead Name: ${lead.name}`);
                        console.log(`   Lead Email: ${lead.email}`);
                        console.log(`   Assigned Realtor ID: ${lead.realtorId || 'None'}`);
                        console.log(`   Source: ${lead.source}`);
                        
                        // Verify the lead was assigned to the correct realtor
                        if (lead.realtorId === realtor.id) {
                            console.log('✅ Lead correctly assigned to referral realtor');
                        } else {
                            console.log('⚠️  Lead not assigned to referral realtor');
                            console.log(`   Expected: ${realtor.id}, Got: ${lead.realtorId}`);
                        }
                    }
                } catch (error) {
                    console.log('❌ Failed to create lead with referral:', error.response?.data || error.message);
                }

                // 6. Test fetching all realtors (admin view)
                console.log('\n6. Testing realtors list (admin view)...');
                try {
                    const realtorsListResponse = await axios.get(
                        `${BASE_URL}/admin/realtors`,
                        { ...testConfig, headers: adminHeaders }
                    );
                    
                    if (realtorsListResponse.status === 200) {
                        console.log('✅ Successfully fetched realtors list');
                        const realtors = realtorsListResponse.data;
                        console.log(`   Total realtors: ${realtors.length}`);
                        
                        // Find our created realtor
                        const ourRealtor = realtors.find(r => r.id === realtor.id);
                        if (ourRealtor) {
                            console.log('✅ Created realtor found in list');
                            console.log(`   Leads count: ${ourRealtor._count?.leads || 0}`);
                            console.log(`   Properties count: ${ourRealtor._count?.properties || 0}`);
                            console.log(`   Commissions count: ${ourRealtor._count?.commissions || 0}`);
                        }
                    }
                } catch (error) {
                    console.log('❌ Failed to fetch realtors list:', error.response?.data || error.message);
                }

                // 7. Test updating realtor status
                console.log('\n7. Testing realtor status update...');
                try {
                    const statusUpdateResponse = await axios.put(
                        `${BASE_URL}/admin/realtors/${realtor.id}`,
                        { 
                            ...realtorData,
                            user: {
                                ...realtorData.user,
                                isActive: false
                            }
                        },
                        { ...testConfig, headers: adminHeaders }
                    );
                    
                    if (statusUpdateResponse.status === 200) {
                        console.log('✅ Successfully updated realtor status');
                    }
                } catch (error) {
                    console.log('⚠️  Could not update realtor status:', error.response?.status || error.message);
                }

                // 8. Frontend integration test instructions
                console.log('\n8. Frontend Integration Test Instructions:');
                console.log('   📱 Manual Testing Steps:');
                console.log(`   1. Go to: ${FRONTEND_URL}/admin/realtors/add`);
                console.log('   2. Fill in the form with realtor details');
                console.log('   3. Click "Save Realtor"');
                console.log('   4. Check for success toast with referral link');
                console.log(`   5. Go to: ${FRONTEND_URL}/admin/realtors`);
                console.log('   6. Find the created realtor and click "Copy Referral Link"');
                console.log('   7. Open the referral link in a new browser/incognito window');
                console.log('   8. Navigate to a property and submit an inquiry');
                console.log('   9. Verify the lead is assigned to the correct realtor');

                // 9. Clean up - delete test realtor
                console.log('\n9. Cleaning up test data...');
                try {
                    // Note: Delete endpoint might not exist, so we'll try but not fail if it doesn't work
                    await axios.delete(
                        `${BASE_URL}/admin/realtors/${realtor.id}`,
                        { ...testConfig, headers: adminHeaders }
                    );
                    console.log('✅ Test realtor deleted successfully');
                } catch (error) {
                    console.log('⚠️  Could not delete test realtor (endpoint may not exist)');
                    console.log('   You may need to manually clean up the test data');
                }

            } else {
                console.log('❌ Failed to create realtor');
                console.log('Response:', createRealtorResponse.data);
                return;
            }

        } else {
            console.log('❌ Admin login failed');
            return;
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 400) {
            console.log('\n🔍 Debugging Info:');
            console.log('This might be a validation error. Check:');
            console.log('- Email format is correct');
            console.log('- Password meets requirements');
            console.log('- Required fields are provided');
            console.log('- User with this email doesn\'t already exist');
        }
    }
}

// Additional validation tests
function validateRealtorData() {
    console.log('\n🔍 Validating Test Data:');
    console.log(`Full Name: "${testRealtor.fullName}"`);
    console.log(`Email: "${testRealtor.email}"`);
    console.log(`Phone: "${testRealtor.phoneNumber}"`);
    console.log(`Password: "${testRealtor.temporaryPassword}"`);
    console.log(`Bank: "${testRealtor.bankName}"`);
    console.log(`Account: "${testRealtor.accountNumber}"`);
    
    // Split name validation
    const nameParts = testRealtor.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    console.log(`Parsed - First Name: "${firstName}", Last Name: "${lastName}"`);
}

// Run the tests
console.log('🚀 Starting Add Realtor and Referral System Tests...\n');
validateRealtorData();

testAddRealtorAndReferral().then(() => {
    console.log('\n🏁 Add Realtor and Referral System test completed!');
    console.log('\n💡 Next Steps:');
    console.log('1. Test the frontend form at /admin/realtors/add');
    console.log('2. Verify referral links work end-to-end');
    console.log('3. Check lead assignment in the admin panel');
    console.log('4. Test referral link expiration (30 days)');
}).catch(error => {
    console.error('💥 Test suite failed:', error);
});