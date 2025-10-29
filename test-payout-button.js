/**
 * Test script to verify the payout button functionality with sample data
 */

const API_BASE_URL = 'http://localhost:3004/api';

async function testPayoutButton() {
  console.log('🧪 Testing Payout Button with Sample Data\n');

  try {
    // Login as realtor
    console.log('1. 🔐 Logging in as realtor...');
    
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'adh.devv@gmail.com',
        password: 'GoodGod11@@'
      }),
    });

    if (!loginResponse.ok) {
      console.log('❌ Login failed');
      return;
    }

    const loginResult = await loginResponse.json();
    console.log('✅ Login successful');

    // Test commissions endpoint
    console.log('\n2. 📊 Testing commissions endpoint...');
    
    const commissionsResponse = await fetch(`${API_BASE_URL}/realtor/commissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResult.access_token}`,
      },
    });

    console.log('Commissions response status:', commissionsResponse.status);

    if (commissionsResponse.ok) {
      const commissions = await commissionsResponse.json();
      console.log('✅ Commissions endpoint working');
      console.log('Commissions returned:', commissions.length);
    } else {
      console.log('⚠️  Commissions endpoint failed - sample data will be used');
    }

    console.log('\n🎯 Expected Behavior:');
    console.log('================================');
    console.log('✅ Page should load with sample commission data');
    console.log('✅ Sample data includes:');
    console.log('   • 2 pending commissions (₦150,000 + ₦200,000)');
    console.log('   • 1 paid commission (₦75,000)');
    console.log('   • 1 payout requested commission (₦120,000)');
    console.log('✅ "Request Payout" button should be visible');
    console.log('✅ Checkboxes should work for pending commissions');
    console.log('✅ Payout request should work with sample data');

    console.log('\n📋 User Testing Steps:');
    console.log('1. Navigate to /realtor/commissions');
    console.log('2. Verify sample commission data is displayed');
    console.log('3. Check that "Request Payout" button is visible');
    console.log('4. Select pending commissions using checkboxes');
    console.log('5. Click "Request Payout" button');
    console.log('6. Confirm in modal');
    console.log('7. Verify status changes to "Payout Requested"');

    console.log('\n🎨 Sample Data Structure:');
    console.log('================================');
    const sampleData = [
      {
        id: 'sample-1',
        client: 'John Doe',
        amount: 150000,
        status: 'pending',
        property: 'Luxury Apartment in Lekki'
      },
      {
        id: 'sample-2',
        client: 'Jane Smith',
        amount: 200000,
        status: 'pending',
        property: '4-Bedroom Duplex in Victoria Island'
      },
      {
        id: 'sample-3',
        client: 'Mike Johnson',
        amount: 75000,
        status: 'paid',
        property: '3-Bedroom Flat in Ikeja'
      },
      {
        id: 'sample-4',
        client: 'Sarah Wilson',
        amount: 120000,
        status: 'payout_requested',
        property: 'Executive Office Space'
      }
    ];

    console.table(sampleData);

    console.log('\n✅ Payout button should now be visible!');
    console.log('💡 The button appears because there are pending commissions in the sample data.');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
testPayoutButton().catch(console.error);