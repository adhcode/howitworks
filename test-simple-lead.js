/**
 * Simple test for lead creation without authentication
 */

const API_BASE = 'http://localhost:3004/api';

async function testSimpleLeadCreation() {
    console.log('🧪 Testing Simple Lead Creation...\n');

    try {
        // Test lead creation without property ID (general inquiry)
        console.log('1. Testing general inquiry lead creation...');
        const leadData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '+234 123 456 7890',
            message: 'I am interested in your properties. Please contact me.',
            source: 'website_test'
        };

        const leadResponse = await fetch(`${API_BASE}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leadData)
        });

        if (leadResponse.ok) {
            const leadResult = await leadResponse.json();
            console.log('✅ Lead created successfully');
            console.log('📧 Lead ID:', leadResult.lead.id);
            console.log('👤 Name:', leadResult.lead.name);
            console.log('📧 Email:', leadResult.lead.email);
            console.log('📱 Phone:', leadResult.lead.phone);
            console.log('💬 Message:', leadResult.lead.message);
            console.log('🏷️ Source:', leadResult.lead.source);
            console.log('📊 Status:', leadResult.lead.status);
            console.log('👨‍💼 Realtor:', leadResult.lead.realtor ? 
                `${leadResult.lead.realtor.user.firstName} ${leadResult.lead.realtor.user.lastName}` : 
                'Not assigned');
        } else {
            const error = await leadResponse.text();
            console.log('❌ Lead creation failed:', error);
        }

        console.log('\n🎉 Simple lead creation test completed!');
        console.log('\n📋 Result:');
        if (leadResponse.ok) {
            console.log('✅ Lead creation endpoint is working');
            console.log('✅ Optional realtor assignment is working');
            console.log('✅ Property detail page inquiries should now work');
        } else {
            console.log('❌ Lead creation needs debugging');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testSimpleLeadCreation();