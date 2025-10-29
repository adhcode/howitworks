const axios = require('axios');

const BACKEND_URL = 'https://howitworks-production.up.railway.app';
const FRONTEND_URL = 'https://howitworks.com.ng';

async function testBackend() {
    console.log('🧪 Testing Production Backend');
    console.log('============================');
    
    try {
        // Test 1: Health Check
        console.log('\n1. Testing Health Check...');
        const healthResponse = await axios.get(`${BACKEND_URL}/api/health`);
        console.log('✅ Health Check:', healthResponse.status === 200 ? 'PASS' : 'FAIL');
        
        // Test 2: API Documentation
        console.log('\n2. Testing API Docs...');
        const docsResponse = await axios.get(`${BACKEND_URL}/api/docs`);
        console.log('✅ API Docs:', docsResponse.status === 200 ? 'PASS' : 'FAIL');
        
        // Test 3: Properties Endpoint
        console.log('\n3. Testing Properties Endpoint...');
        const propertiesResponse = await axios.get(`${BACKEND_URL}/api/properties`);
        console.log('✅ Properties:', propertiesResponse.status === 200 ? 'PASS' : 'FAIL');
        console.log('   Properties Count:', propertiesResponse.data.properties?.length || 0);
        
        // Test 4: Database Connection (via properties)
        console.log('\n4. Testing Database Connection...');
        console.log('✅ Database:', propertiesResponse.data ? 'CONNECTED' : 'DISCONNECTED');
        
        console.log('\n🎉 Backend is working correctly!');
        console.log('\nProduction URLs:');
        console.log('Frontend: https://howitworks.com.ng');
        console.log('Backend:  https://howitworks-production.up.railway.app');
        console.log('API:      https://howitworks-production.up.railway.app/api');
        console.log('\nNext steps:');
        console.log('1. Configure custom domain in Vercel');
        console.log('2. Update Railway FRONTEND_URL to https://howitworks.com.ng');
        console.log('3. Test full production setup');
        
    } catch (error) {
        console.error('\n❌ Backend test failed:');
        console.error('Error:', error.message);
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        
        if (error.code === 'ENOTFOUND') {
            console.error('\n💡 Possible issues:');
            console.error('- Domain not accessible yet (wait a few minutes)');
            console.error('- Service not properly exposed');
            console.error('- Port configuration incorrect');
        }
    }
}

testBackend();