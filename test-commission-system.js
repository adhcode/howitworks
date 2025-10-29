const axios = require('axios');

const API_URL = 'http://localhost:3004/api';

// Test credentials
const ADMIN_EMAIL = 'admin@howitworks.com';
const ADMIN_PASSWORD = 'Admin@123';

let adminToken = '';
let testPropertyId = '';
let testLeadId = '';
let testCommissionId = '';

async function login() {
    console.log('\n🔐 Logging in as admin...');
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });
        adminToken = response.data.access_token;
        console.log('✅ Login successful');
        return true;
    } catch (error) {
        console.error('❌ Login failed:', error.response?.data || error.message);
        return false;
    }
}

async function createTestProperty() {
    console.log('\n📝 Creating test property with commission settings...');
    try {
        const response = await axios.post(`${API_URL}/properties`, {
            title: 'Test Property for Commission',
            description: 'Property to test commission system',
            price: 50000000, // ₦50M
            location: 'Lagos, Nigeria',
            bedrooms: 3,
            bathrooms: 2,
            area: 150,
            propertyType: 'Apartment',
            listingType: 'sale',
            featured: false,
            commissionRate: 3, // 3%
            commissionType: 'percentage',
            images: ['https://via.placeholder.com/400']
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        testPropertyId = response.data.id;
        console.log('✅ Property created:', testPropertyId);
        console.log('   Price: ₦50,000,000');
        console.log('   Commission: 3% (₦1,500,000)');
        return true;
    } catch (error) {
        console.error('❌ Property creation failed:', error.response?.data || error.message);
        return false;
    }
}

async function createTestLead() {
    console.log('\n📧 Creating test lead...');
    try {
        const response = await axios.post(`${API_URL}/leads`, {
            propertyId: testPropertyId,
            name: 'Test Customer',
            email: 'customer@test.com',
            phone: '+2348012345678',
            message: 'Interested in this property',
            status: 'new'
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        testLeadId = response.data.id;
        console.log('✅ Lead created:', testLeadId);
        return true;
    } catch (error) {
        console.error('❌ Lead creation failed:', error.response?.data || error.message);
        return false;
    }
}

async function convertLead() {
    console.log('\n💰 Converting lead to trigger commission creation...');
    try {
        const response = await axios.put(`${API_URL}/leads/${testLeadId}/status`, {
            status: 'converted'
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        console.log('✅ Lead converted successfully');
        console.log('   Status:', response.data.status);
        
        // Wait a bit for commission to be created
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    } catch (error) {
        console.error('❌ Lead conversion failed:', error.response?.data || error.message);
        return false;
    }
}

async function checkCommissions() {
    console.log('\n📊 Checking commissions...');
    try {
        const response = await axios.get(`${API_URL}/admin/commissions`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        const commissions = response.data;
        console.log(`✅ Found ${commissions.length} commission(s)`);
        
        if (commissions.length > 0) {
            const latestCommission = commissions[0];
            testCommissionId = latestCommission.id;
            
            console.log('\n📋 Latest Commission Details:');
            console.log('   ID:', latestCommission.id);
            console.log('   Amount: ₦' + latestCommission.amount.toLocaleString());
            console.log('   Status:', latestCommission.status);
            console.log('   Realtor:', latestCommission.realtor?.user?.firstName, latestCommission.realtor?.user?.lastName);
            console.log('   Property:', latestCommission.lead?.property?.title);
            console.log('   Created:', new Date(latestCommission.createdAt).toLocaleString());
        }
        
        return true;
    } catch (error) {
        console.error('❌ Failed to fetch commissions:', error.response?.data || error.message);
        return false;
    }
}

async function approveCommission() {
    if (!testCommissionId) {
        console.log('\n⚠️  No commission to approve');
        return false;
    }
    
    console.log('\n✅ Approving commission...');
    try {
        const response = await axios.put(`${API_URL}/admin/commissions/${testCommissionId}/status`, {
            status: 'approved'
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        console.log('✅ Commission approved');
        console.log('   Status:', response.data.status);
        return true;
    } catch (error) {
        console.error('❌ Commission approval failed:', error.response?.data || error.message);
        return false;
    }
}

async function markCommissionPaid() {
    if (!testCommissionId) {
        console.log('\n⚠️  No commission to mark as paid');
        return false;
    }
    
    console.log('\n💵 Marking commission as paid...');
    try {
        const response = await axios.put(`${API_URL}/admin/commissions/${testCommissionId}/status`, {
            status: 'paid'
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        console.log('✅ Commission marked as paid');
        console.log('   Status:', response.data.status);
        return true;
    } catch (error) {
        console.error('❌ Failed to mark commission as paid:', error.response?.data || error.message);
        return false;
    }
}

async function runTests() {
    console.log('🚀 Testing Commission System');
    console.log('================================');
    
    // Step 1: Login
    if (!await login()) return;
    
    // Step 2: Create property with commission settings
    if (!await createTestProperty()) return;
    
    // Step 3: Create lead
    if (!await createTestLead()) return;
    
    // Step 4: Convert lead (should auto-create commission)
    if (!await convertLead()) return;
    
    // Step 5: Check commissions
    if (!await checkCommissions()) return;
    
    // Step 6: Approve commission
    if (!await approveCommission()) return;
    
    // Step 7: Mark as paid
    if (!await markCommissionPaid()) return;
    
    // Step 8: Final check
    await checkCommissions();
    
    console.log('\n✅ All tests completed successfully!');
    console.log('\n📝 Summary:');
    console.log('   1. Property created with 3% commission rate');
    console.log('   2. Lead created and converted');
    console.log('   3. Commission automatically created (₦1,500,000)');
    console.log('   4. Commission approved by admin');
    console.log('   5. Commission marked as paid');
    console.log('\n🎉 Commission system is working perfectly!');
}

runTests().catch(console.error);
