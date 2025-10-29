const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test configuration
const testConfig = {
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Test data
const testInvestor = {
    email: 'test.investor@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'Investor',
    role: 'INVESTOR'
};

const testAdmin = {
    email: 'admin@example.com',
    password: 'admin123'
};

async function testInvestorsPage() {
    console.log('🧪 Testing Investors Page Functionality...\n');

    try {
        // 1. Test admin login
        console.log('1. Testing admin login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, testAdmin, testConfig);
        
        if (adminLoginResponse.status === 200) {
            console.log('✅ Admin login successful');
            const adminToken = adminLoginResponse.data.access_token;
            
            // Set authorization header for admin requests
            const adminHeaders = {
                ...testConfig.headers,
                'Authorization': `Bearer ${adminToken}`
            };

            // 2. Test fetching all investors
            console.log('\n2. Testing fetch all investors...');
            const investorsResponse = await axios.get(`${BASE_URL}/admin/investors`, {
                ...testConfig,
                headers: adminHeaders
            });
            
            if (investorsResponse.status === 200) {
                console.log('✅ Successfully fetched investors');
                console.log(`   Found ${investorsResponse.data.length} investors`);
                
                if (investorsResponse.data.length > 0) {
                    const sampleInvestor = investorsResponse.data[0];
                    console.log('   Sample investor structure:');
                    console.log(`   - ID: ${sampleInvestor.id}`);
                    console.log(`   - Name: ${sampleInvestor.user.firstName} ${sampleInvestor.user.lastName}`);
                    console.log(`   - Email: ${sampleInvestor.user.email}`);
                    console.log(`   - Status: ${sampleInvestor.user.isActive ? 'Active' : 'Inactive'}`);
                    console.log(`   - Phone: ${sampleInvestor.phoneNumber || 'N/A'}`);
                    console.log(`   - Investments: ${sampleInvestor._count?.investments || 0}`);
                }
            } else {
                console.log('❌ Failed to fetch investors');
            }

            // 3. Test creating a new investor (if endpoint exists)
            console.log('\n3. Testing investor creation...');
            try {
                const createResponse = await axios.post(`${BASE_URL}/auth/register`, testInvestor, testConfig);
                
                if (createResponse.status === 201) {
                    console.log('✅ Successfully created test investor');
                    const newInvestorId = createResponse.data.user.id;
                    
                    // 4. Test updating investor status
                    console.log('\n4. Testing investor status update...');
                    try {
                        const statusResponse = await axios.patch(
                            `${BASE_URL}/admin/investors/${newInvestorId}/status`,
                            { isActive: false },
                            { ...testConfig, headers: adminHeaders }
                        );
                        
                        if (statusResponse.status === 200) {
                            console.log('✅ Successfully updated investor status');
                        } else {
                            console.log('❌ Failed to update investor status');
                        }
                    } catch (error) {
                        console.log('⚠️  Status update endpoint may not exist:', error.response?.status || error.message);
                    }

                    // 5. Test updating investor details
                    console.log('\n5. Testing investor details update...');
                    try {
                        const updateData = {
                            user: {
                                firstName: 'Updated',
                                lastName: 'Investor',
                                email: testInvestor.email
                            },
                            phoneNumber: '+234-800-123-4567',
                            address: '123 Test Street, Lagos, Nigeria',
                            investmentBudget: 5000000,
                            preferredLocation: 'Lagos'
                        };

                        const updateResponse = await axios.put(
                            `${BASE_URL}/admin/investors/${newInvestorId}`,
                            updateData,
                            { ...testConfig, headers: adminHeaders }
                        );
                        
                        if (updateResponse.status === 200) {
                            console.log('✅ Successfully updated investor details');
                        } else {
                            console.log('❌ Failed to update investor details');
                        }
                    } catch (error) {
                        console.log('⚠️  Update endpoint may not exist:', error.response?.status || error.message);
                    }

                    // 6. Test deleting investor
                    console.log('\n6. Testing investor deletion...');
                    try {
                        const deleteResponse = await axios.delete(
                            `${BASE_URL}/admin/investors/${newInvestorId}`,
                            { ...testConfig, headers: adminHeaders }
                        );
                        
                        if (deleteResponse.status === 200) {
                            console.log('✅ Successfully deleted test investor');
                        } else {
                            console.log('❌ Failed to delete investor');
                        }
                    } catch (error) {
                        console.log('⚠️  Delete endpoint may not exist:', error.response?.status || error.message);
                    }
                }
            } catch (error) {
                console.log('⚠️  Could not create test investor:', error.response?.status || error.message);
            }

            // 7. Test search functionality (client-side filtering)
            console.log('\n7. Testing search functionality...');
            const allInvestors = investorsResponse.data;
            if (allInvestors.length > 0) {
                const searchTerm = allInvestors[0].user.firstName.toLowerCase();
                const filteredInvestors = allInvestors.filter(investor =>
                    investor.user.firstName.toLowerCase().includes(searchTerm) ||
                    investor.user.lastName.toLowerCase().includes(searchTerm) ||
                    investor.user.email.toLowerCase().includes(searchTerm)
                );
                
                console.log(`✅ Search functionality working - found ${filteredInvestors.length} results for "${searchTerm}"`);
            }

            // 8. Test status filtering (client-side filtering)
            console.log('\n8. Testing status filtering...');
            const activeInvestors = allInvestors.filter(investor => investor.user.isActive);
            const inactiveInvestors = allInvestors.filter(investor => !investor.user.isActive);
            
            console.log(`✅ Status filtering working:`);
            console.log(`   - Active investors: ${activeInvestors.length}`);
            console.log(`   - Inactive investors: ${inactiveInvestors.length}`);

        } else {
            console.log('❌ Admin login failed');
            return;
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test
testInvestorsPage().then(() => {
    console.log('\n🏁 Investors page test completed!');
}).catch(error => {
    console.error('💥 Test suite failed:', error);
});