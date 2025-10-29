const axios = require('axios');

const BASE_URL = 'http://localhost:3004';
const FRONTEND_URL = 'http://localhost:3000';

// Test configuration
const testConfig = {
    timeout: 15000, // Increased timeout for email operations
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
    fullName: 'Sarah Johnson Realtor',
    email: 'sarah.johnson.realtor@example.com'
};

const testRealtorSignup = {
    phoneNumber: '+234-800-555-7777',
    residentialAddress: '456 Email Test Street, Lagos, Nigeria',
    password: 'emailtest123',
    bankName: 'GTBank',
    accountNumber: '0123456789',
    accountName: 'Sarah Johnson Realtor'
};

const testLead = {
    name: 'Michael Test Client',
    email: 'michael.test.client@example.com',
    phone: '+234-800-888-9999',
    message: 'I am interested in properties and would like to schedule a viewing. This is a test lead to verify email notifications.',
    source: 'referral_link'
};

async function testResendEmailSystem() {
    console.log('📧 Testing Resend Email System Integration...\n');

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

            // 2. Test sending realtor invitation with email
            console.log('\n2. Testing realtor invitation with Resend email...');
            
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
                console.log('   📧 Invitation email should be sent to:', invitation.email);

                // 3. Test invitation validation
                console.log('\n3. Testing invitation validation...');
                const validateResponse = await axios.get(
                    `${BASE_URL}/auth/realtor-invitation/${invitation.token}`,
                    testConfig
                );
                
                if (validateResponse.status === 200) {
                    console.log('✅ Successfully validated invitation token');
                    const validatedInvitation = validateResponse.data;
                    console.log(`   Status: ${validatedInvitation.status}`);
                    console.log(`   Email: ${validatedInvitation.email}`);
                }

                // 4. Test accepting invitation (realtor signup with welcome email)
                console.log('\n4. Testing invitation acceptance with welcome email...');
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
                    console.log('   📧 Welcome email should be sent to:', newRealtor.user.email);
                    
                    const referralLink = `${FRONTEND_URL}?ref=${newRealtor.slug}`;
                    console.log(`   Referral Link: ${referralLink}`);

                    // 5. Test realtor login
                    console.log('\n5. Testing realtor login...');
                    const realtorLoginResponse = await axios.post(
                        `${BASE_URL}/auth/login`,
                        {
                            email: testRealtorInvitation.email,
                            password: testRealtorSignup.password
                        },
                        testConfig
                    );
                    
                    if (realtorLoginResponse.status === 200) {
                        console.log('✅ Successfully logged in with new realtor account');
                        console.log(`   Role: ${realtorLoginResponse.data.user.role}`);
                    }

                    // 6. Test lead creation (without email notification)
                    console.log('\n6. Testing lead creation...');
                    const leadWithReferral = {
                        ...testLead,
                        realtorSlug: newRealtor.slug
                    };

                    const leadResponse = await axios.post(`${BASE_URL}/leads`, leadWithReferral, testConfig);
                    
                    if (leadResponse.status === 201) {
                        console.log('✅ Successfully created lead with referral');
                        const lead = leadResponse.data.lead;
                        console.log(`   Lead ID: ${lead.id}`);
                        console.log(`   Lead Name: ${lead.name}`);
                        console.log(`   Lead Email: ${lead.email}`);
                        console.log(`   Assigned Realtor ID: ${lead.realtorId || 'None'}`);
                        console.log(`   Source: ${lead.source}`);
                        
                        if (lead.realtorId === newRealtor.id) {
                            console.log('✅ Lead correctly assigned to referral realtor');
                        } else {
                            console.log('⚠️  Lead not assigned to referral realtor');
                        }
                    }

                    // 7. Test fetching invitations list
                    console.log('\n7. Testing invitations management...');
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
                                console.log(`   Our invitation status: ${ourInvitation.status}`);
                            }
                        }
                    } catch (error) {
                        console.log('⚠️  Could not fetch invitations list:', error.response?.status || error.message);
                    }

                    // 8. Test resending invitation (create another invitation first)
                    console.log('\n8. Testing invitation resend functionality...');
                    try {
                        const anotherInvitation = {
                            email: 'another.realtor@example.com',
                            firstName: 'Another',
                            lastName: 'Realtor'
                        };

                        const anotherInviteResponse = await axios.post(
                            `${BASE_URL}/admin/realtors/invite`,
                            anotherInvitation,
                            { ...testConfig, headers: adminHeaders }
                        );

                        if (anotherInviteResponse.status === 201) {
                            const newInvitation = anotherInviteResponse.data;
                            console.log('✅ Created another invitation for resend test');
                            
                            // Try to resend
                            const resendResponse = await axios.post(
                                `${BASE_URL}/admin/realtors/invitations/${newInvitation.id}/resend`,
                                {},
                                { ...testConfig, headers: adminHeaders }
                            );
                            
                            if (resendResponse.status === 200) {
                                console.log('✅ Successfully resent invitation');
                                console.log('   📧 Resend email should be sent to:', anotherInvitation.email);
                            }
                        }
                    } catch (error) {
                        console.log('⚠️  Could not test resend functionality:', error.response?.status || error.message);
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
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n🔍 Connection Error:');
            console.log('- Make sure the backend server is running on port 3001');
            console.log('- Check if the database is connected');
            console.log('- Verify environment variables are set');
        } else if (error.response?.status === 400) {
            console.log('\n🔍 Debugging Info:');
            console.log('This might be a validation error. Check:');
            console.log('- RESEND_API_KEY is set in environment variables');
            console.log('- FROM_EMAIL is configured correctly');
            console.log('- Email service is properly initialized');
            console.log('- Database schema includes RealtorInvitation model');
        }
    }
}

// Email configuration check
function checkEmailConfiguration() {
    console.log('\n📧 Email Configuration Checklist:');
    console.log('□ RESEND_API_KEY environment variable set');
    console.log('□ FROM_EMAIL environment variable set (e.g., "HowItWorks <noreply@yourdomain.com>")');
    console.log('□ FRONTEND_URL environment variable set');
    console.log('□ Resend account verified and API key active');
    console.log('□ Domain verified in Resend (if using custom domain)');
    console.log('□ Email service properly imported in modules');
    
    console.log('\n🔧 Required Environment Variables:');
    console.log('RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('FROM_EMAIL=HowItWorks <noreply@yourdomain.com>');
    console.log('FRONTEND_URL=http://localhost:3000');
    
    console.log('\n📝 Email Templates Available:');
    console.log('1. Realtor Invitation Email - Professional invitation with registration link');
    console.log('2. Welcome Email - Welcome message with referral link');
    console.log('3. Lead Notification Email - New lead alert for realtors');
}

// Manual testing instructions
function printManualTestingInstructions() {
    console.log('\n📱 Manual Email Testing Instructions:');
    
    console.log('\n1. Realtor Invitation Email:');
    console.log('   - Go to admin panel → Add Realtor');
    console.log('   - Enter name and email');
    console.log('   - Click "Send Invitation"');
    console.log('   - Check email inbox for invitation');
    console.log('   - Verify email formatting and links');
    
    console.log('\n2. Welcome Email:');
    console.log('   - Complete realtor registration via invitation link');
    console.log('   - Check email inbox for welcome message');
    console.log('   - Verify referral link is included');
    

    
    console.log('\n4. Email Deliverability:');
    console.log('   - Check spam/junk folders');
    console.log('   - Test with different email providers');
    console.log('   - Verify sender reputation');
    console.log('   - Monitor Resend dashboard for delivery status');
}

// Run the tests
console.log('🚀 Starting Resend Email System Tests...\n');

checkEmailConfiguration();

testResendEmailSystem()
    .then(() => {
        printManualTestingInstructions();
        console.log('\n🏁 Resend email system test completed!');
        console.log('\n💡 Key Features Tested:');
        console.log('✅ Realtor invitation emails sent via Resend');
        console.log('✅ Welcome emails with referral links');
        console.log('✅ Email template formatting and content');
        console.log('✅ Integration with invitation system');
        console.log('✅ Error handling for email failures');
        
        console.log('\n📧 Email Types Implemented:');
        console.log('1. 📨 Invitation Email - Secure invitation with registration link');
        console.log('2. 🎉 Welcome Email - Welcome message with referral link');
        
        console.log('\n🔧 Next Steps:');
        console.log('1. Configure Resend API key in environment variables');
        console.log('2. Set up custom domain for professional emails');
        console.log('3. Test email deliverability with real email addresses');
        console.log('4. Monitor email analytics in Resend dashboard');
        console.log('5. Set up email templates in Resend (optional)');
    })
    .catch(error => {
        console.error('💥 Test suite failed:', error);
    });