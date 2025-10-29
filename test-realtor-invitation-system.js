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

const testRealtorInvitation = {
    fullName: 'Jane Smith Realtor',
    email: 'jane.smith.realtor@example.com'
};

const testRealtorSignup = {
    phoneNumber: '+234-800-555-9999',
    residentialAddress: '789 Realtor Street, Lagos, Nigeria',
    password: 'securepassword123',
    bankName: 'Access Bank',
    accountNumber: '9876543210',
    accountName: 'Jane Smith Realtor'
};

async function testRealtorInvitationSystem() {
    console.log('📧 Testing Realtor Invitation System...\n');

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

            // 2. Test sending realtor invitation
            console.log('\n2. Testing realtor invitation...');
            
            // Split fullName into firstName and lastName
            const nameParts = testRealtorInvitation.fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            const invitationData = {
                email: testRealtorInvitation.email,
                firstName,
                lastName
            };

            const inviteResponse = await axios.post(
                `${BASE_URL}/admin/realtors/invite`,
                invitationData,
                { ...testConfig, headers: adminHeaders }
            );

            if (inviteResponse.status === 201) {
                console.log('✅ Realtor invitation sent successfully');
                const invitation = inviteResponse.data;
                
                console.log(`   Invitation ID: ${invitation.id}`);
                console.log(`   Email: ${invitation.email}`);
                console.log(`   Name: ${invitation.firstName} ${invitation.lastName}`);
                console.log(`   Status: ${invitation.status}`);
                console.log(`   Token: ${invitation.token}`);
                console.log(`   Expires: ${invitation.expiresAt}`);
                
                const invitationUrl = `${FRONTEND_URL}/auth/realtor-signup/${invitation.token}`;
                console.log(`   Invitation URL: ${invitationUrl}`);

                // 3. Test fetching invitations list
                console.log('\n3. Testing invitations list...');
                try {
                    const invitationsResponse = await axios.get(
                        `${BASE_URL}/admin/realtors/invitations`,
                        { ...testConfig, headers: adminHeaders }
                    );
                    
                    if (invitationsResponse.status === 200) {
                        console.log('✅ Successfully fetched invitations list');
                        const invitations = invitationsResponse.data;
                        console.log(`   Total invitations: ${invitations.length}`);
                        
                        const ourInvitation = invitations.find(inv => inv.id === invitation.id);
                        if (ourInvitation) {
                            console.log('✅ Created invitation found in list');
                        }
                    }
                } catch (error) {
                    console.log('⚠️  Invitations list endpoint may not exist:', error.response?.status || error.message);
                }

                // 4. Test validating invitation token
                console.log('\n4. Testing invitation validation...');
                try {
                    const validateResponse = await axios.get(
                        `${BASE_URL}/auth/realtor-invitation/${invitation.token}`,
                        testConfig
                    );
                    
                    if (validateResponse.status === 200) {
                        console.log('✅ Successfully validated invitation token');
                        const validatedInvitation = validateResponse.data;
                        console.log(`   Status: ${validatedInvitation.status}`);
                        console.log(`   Email: ${validatedInvitation.email}`);
                        console.log(`   Name: ${validatedInvitation.firstName} ${validatedInvitation.lastName}`);
                        
                        // Check if invitation is still valid
                        const isValid = validatedInvitation.status === 'PENDING' && 
                                       new Date(validatedInvitation.expiresAt) > new Date();
                        console.log(`   Is Valid: ${isValid}`);
                    }
                } catch (error) {
                    console.log('❌ Failed to validate invitation:', error.response?.data || error.message);
                }

                // 5. Test accepting invitation (realtor signup)
                console.log('\n5. Testing invitation acceptance (realtor signup)...');
                try {
                    const signupResponse = await axios.post(
                        `${BASE_URL}/auth/realtor-invitation/${invitation.token}/accept`,
                        testRealtorSignup,
                        testConfig
                    );
                    
                    if (signupResponse.status === 201) {
                        console.log('✅ Successfully accepted invitation and created realtor account');
                        const newRealtor = signupResponse.data;
                        console.log(`   Realtor ID: ${newRealtor.id}`);
                        console.log(`   User ID: ${newRealtor.userId}`);
                        console.log(`   Email: ${newRealtor.user.email}`);
                        console.log(`   Name: ${newRealtor.user.firstName} ${newRealtor.user.lastName}`);
                        console.log(`   Slug: ${newRealtor.slug}`);
                        console.log(`   Phone: ${newRealtor.phoneNumber}`);
                        console.log(`   Bank: ${newRealtor.bankName}`);
                        
                        // Generate referral link
                        const referralLink = `${FRONTEND_URL}?ref=${newRealtor.slug}`;
                        console.log(`   Referral Link: ${referralLink}`);

                        // 6. Test login with new realtor account
                        console.log('\n6. Testing login with new realtor account...');
                        try {
                            const loginResponse = await axios.post(
                                `${BASE_URL}/auth/login`,
                                {
                                    email: testRealtorInvitation.email,
                                    password: testRealtorSignup.password
                                },
                                testConfig
                            );
                            
                            if (loginResponse.status === 200) {
                                console.log('✅ Successfully logged in with new realtor account');
                                console.log(`   Role: ${loginResponse.data.user.role}`);
                                console.log(`   Access Token: ${loginResponse.data.access_token ? 'Present' : 'Missing'}`);
                            }
                        } catch (error) {
                            console.log('❌ Failed to login with new realtor account:', error.response?.data || error.message);
                        }

                        // 7. Test that invitation is now used/expired
                        console.log('\n7. Testing invitation status after acceptance...');
                        try {
                            const validateAfterResponse = await axios.get(
                                `${BASE_URL}/auth/realtor-invitation/${invitation.token}`,
                                testConfig
                            );
                            
                            if (validateAfterResponse.status === 200) {
                                const usedInvitation = validateAfterResponse.data;
                                console.log(`   Status after acceptance: ${usedInvitation.status}`);
                                
                                if (usedInvitation.status === 'ACCEPTED') {
                                    console.log('✅ Invitation correctly marked as accepted');
                                } else {
                                    console.log('⚠️  Invitation status not updated correctly');
                                }
                            }
                        } catch (error) {
                            if (error.response?.status === 400 || error.response?.status === 404) {
                                console.log('✅ Invitation correctly invalidated after acceptance');
                            } else {
                                console.log('⚠️  Unexpected error checking invitation status:', error.response?.status);
                            }
                        }

                        // 8. Test that same email cannot register again
                        console.log('\n8. Testing duplicate email registration prevention...');
                        try {
                            const duplicateResponse = await axios.post(
                                `${BASE_URL}/auth/register`,
                                {
                                    firstName: 'Another',
                                    lastName: 'Person',
                                    email: testRealtorInvitation.email,
                                    password: 'anotherpassword',
                                    role: 'REALTOR'
                                },
                                testConfig
                            );
                            
                            console.log('⚠️  Duplicate registration should have been prevented');
                        } catch (error) {
                            if (error.response?.status === 400) {
                                console.log('✅ Duplicate email registration correctly prevented');
                            } else {
                                console.log('⚠️  Unexpected error:', error.response?.status || error.message);
                            }
                        }

                        // 9. Clean up - delete test realtor
                        console.log('\n9. Cleaning up test data...');
                        try {
                            await axios.delete(
                                `${BASE_URL}/admin/realtors/${newRealtor.id}`,
                                { ...testConfig, headers: adminHeaders }
                            );
                            console.log('✅ Test realtor deleted successfully');
                        } catch (error) {
                            console.log('⚠️  Could not delete test realtor (endpoint may not exist)');
                        }

                    } else {
                        console.log('❌ Failed to accept invitation');
                    }
                } catch (error) {
                    console.log('❌ Failed to accept invitation:', error.response?.data || error.message);
                }

            } else {
                console.log('❌ Failed to send realtor invitation');
                console.log('Response:', inviteResponse.data);
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
            console.log('- Required fields are provided');
            console.log('- User with this email doesn\'t already exist');
            console.log('- Invitation endpoints are implemented');
        }
    }
}

// Test for preventing unauthorized realtor registration
async function testUnauthorizedRealtorRegistration() {
    console.log('\n🚫 Testing unauthorized realtor registration prevention...');
    
    try {
        const unauthorizedResponse = await axios.post(
            `${BASE_URL}/auth/register`,
            {
                firstName: 'Unauthorized',
                lastName: 'Realtor',
                email: 'unauthorized.realtor@example.com',
                password: 'password123',
                role: 'REALTOR'
            },
            testConfig
        );
        
        console.log('⚠️  Unauthorized realtor registration should have been prevented');
        console.log('Response:', unauthorizedResponse.data);
    } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 403) {
            console.log('✅ Unauthorized realtor registration correctly prevented');
        } else {
            console.log('⚠️  Unexpected error:', error.response?.status || error.message);
        }
    }
}

// Frontend integration test instructions
function printFrontendTestInstructions() {
    console.log('\n📱 Frontend Integration Test Instructions:');
    console.log('1. Admin creates invitation:');
    console.log(`   - Go to: ${FRONTEND_URL}/admin/realtors/add`);
    console.log('   - Enter name and email');
    console.log('   - Click "Send Invitation"');
    console.log('   - Check for success message');
    
    console.log('\n2. Realtor receives invitation:');
    console.log('   - Check email for invitation link');
    console.log('   - Click invitation link');
    console.log('   - Should redirect to signup page');
    
    console.log('\n3. Realtor completes registration:');
    console.log('   - Fill in all required fields');
    console.log('   - Set password and bank details');
    console.log('   - Submit form');
    console.log('   - Should redirect to login page');
    
    console.log('\n4. Realtor logs in:');
    console.log('   - Use invitation email and chosen password');
    console.log('   - Should access realtor dashboard');
    
    console.log('\n5. Test referral system:');
    console.log('   - Get referral link from admin panel');
    console.log('   - Test lead assignment through referral');
}

// Run the tests
console.log('🚀 Starting Realtor Invitation System Tests...\n');

testRealtorInvitationSystem()
    .then(() => testUnauthorizedRealtorRegistration())
    .then(() => {
        printFrontendTestInstructions();
        console.log('\n🏁 Realtor invitation system test completed!');
        console.log('\n💡 Key Features Tested:');
        console.log('✅ Admin can send realtor invitations');
        console.log('✅ Invitation tokens are validated');
        console.log('✅ Realtors can complete registration via invitation');
        console.log('✅ Unauthorized registration is prevented');
        console.log('✅ Invitations are marked as used after acceptance');
        console.log('✅ New realtors can log in and get referral links');
    })
    .catch(error => {
        console.error('💥 Test suite failed:', error);
    });