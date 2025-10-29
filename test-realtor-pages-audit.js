/**
 * Comprehensive audit of realtor pages to verify:
 * 1. All pages are fetching real data from backend
 * 2. No dummy/hardcoded data is present
 * 3. Data is unique to the logged-in realtor
 * 4. Referral link functionality works correctly
 */

const API_BASE = 'http://localhost:3001';

async function testRealtorPagesAudit() {
  console.log('🔍 Starting Realtor Pages Audit...\n');

  try {
    // Step 1: Login as a realtor
    console.log('1. Logging in as realtor...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'realtor@test.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.access_token;
    const realtorId = loginData.user.id;
    
    console.log(`✅ Logged in as: ${loginData.user.firstName} ${loginData.user.lastName}`);
    console.log(`   Realtor ID: ${realtorId}`);
    console.log(`   Role: ${loginData.user.role}\n`);

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Step 2: Test Dashboard API
    console.log('2. Testing Dashboard API...');
    const dashboardResponse = await fetch(`${API_BASE}/realtor/dashboard`, {
      headers
    });

    if (dashboardResponse.ok) {
      const dashboardData = await dashboardResponse.json();
      console.log('✅ Dashboard API working');
      console.log(`   Realtor: ${dashboardData.realtor?.firstName} ${dashboardData.realtor?.lastName}`);
      console.log(`   Stats: ${JSON.stringify(dashboardData.stats)}`);
      console.log(`   Referral Link: ${dashboardData.referralLink}`);
      console.log(`   Recent Leads: ${dashboardData.recentLeads?.length || 0} leads\n`);
    } else {
      console.log(`❌ Dashboard API failed: ${dashboardResponse.status}\n`);
    }

    // Step 3: Test Commissions API
    console.log('3. Testing Commissions API...');
    const commissionsResponse = await fetch(`${API_BASE}/realtor/commissions`, {
      headers
    });

    if (commissionsResponse.ok) {
      const commissionsData = await commissionsResponse.json();
      console.log('✅ Commissions API working');
      console.log(`   Total Commissions: ${commissionsData.data?.length || 0}`);
      console.log(`   Sample Commission: ${JSON.stringify(commissionsData.data?.[0] || 'None')}\n`);
    } else {
      console.log(`❌ Commissions API failed: ${commissionsResponse.status}\n`);
    }

    // Step 4: Test Leads API
    console.log('4. Testing Leads API...');
    const leadsResponse = await fetch(`${API_BASE}/realtor/leads`, {
      headers
    });

    if (leadsResponse.ok) {
      const leadsData = await leadsResponse.json();
      console.log('✅ Leads API working');
      console.log(`   Total Leads: ${leadsData.data?.length || 0}`);
      console.log(`   Sample Lead: ${JSON.stringify(leadsData.data?.[0] || 'None')}\n`);
    } else {
      console.log(`❌ Leads API failed: ${leadsResponse.status}\n`);
    }

    // Step 5: Test Profile API
    console.log('5. Testing Profile API...');
    const profileResponse = await fetch(`${API_BASE}/realtor/profile`, {
      headers
    });

    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      console.log('✅ Profile API working');
      console.log(`   Realtor Profile: ${JSON.stringify(profileData.realtor)}\n`);
    } else {
      console.log(`❌ Profile API failed: ${profileResponse.status}\n`);
    }

    // Step 6: Test Performance API
    console.log('6. Testing Performance API...');
    const performanceResponse = await fetch(`${API_BASE}/realtor/performance`, {
      headers
    });

    if (performanceResponse.ok) {
      const performanceData = await performanceResponse.json();
      console.log('✅ Performance API working');
      console.log(`   Performance Data: ${JSON.stringify(performanceData)}\n`);
    } else {
      console.log(`❌ Performance API failed: ${performanceResponse.status}\n`);
    }

    // Step 7: Test Referral Link Functionality
    console.log('7. Testing Referral Link Functionality...');
    
    // Get the referral link from dashboard
    if (dashboardResponse.ok) {
      const dashboardData = await dashboardResponse.json();
      const referralLink = dashboardData.referralLink;
      
      if (referralLink) {
        console.log(`✅ Referral link exists: ${referralLink}`);
        
        // Extract slug from referral link
        const urlParts = referralLink.split('/');
        const slug = urlParts[urlParts.length - 1];
        
        // Test if referral link resolves to correct realtor
        const referralTestResponse = await fetch(`${API_BASE}/realtors/slug/${slug}`);
        
        if (referralTestResponse.ok) {
          const referralData = await referralTestResponse.json();
          console.log(`✅ Referral link resolves correctly`);
          console.log(`   Links to: ${referralData.firstName} ${referralData.lastName}`);
          console.log(`   Realtor ID: ${referralData.id}`);
          
          if (referralData.id === realtorId) {
            console.log(`✅ Referral link points to correct realtor\n`);
          } else {
            console.log(`❌ Referral link points to wrong realtor!\n`);
          }
        } else {
          console.log(`❌ Referral link does not resolve: ${referralTestResponse.status}\n`);
        }
      } else {
        console.log(`❌ No referral link found in dashboard data\n`);
      }
    }

    // Step 8: Check for Data Uniqueness
    console.log('8. Checking Data Uniqueness...');
    
    // Login as a different realtor to compare data
    const secondLoginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'realtor2@test.com',
        password: 'password123'
      })
    });

    if (secondLoginResponse.ok) {
      const secondLoginData = await secondLoginResponse.json();
      const secondToken = secondLoginData.access_token;
      const secondRealtorId = secondLoginData.user.id;
      
      console.log(`✅ Logged in as second realtor: ${secondLoginData.user.firstName} ${secondLoginData.user.lastName}`);
      
      const secondHeaders = {
        'Authorization': `Bearer ${secondToken}`,
        'Content-Type': 'application/json'
      };

      // Compare dashboard data
      const secondDashboardResponse = await fetch(`${API_BASE}/realtor/dashboard`, {
        headers: secondHeaders
      });

      if (secondDashboardResponse.ok) {
        const secondDashboardData = await secondDashboardResponse.json();
        
        if (dashboardResponse.ok) {
          const firstDashboardData = await dashboardResponse.json();
          
          // Compare referral links
          if (firstDashboardData.referralLink !== secondDashboardData.referralLink) {
            console.log(`✅ Referral links are unique per realtor`);
          } else {
            console.log(`❌ Referral links are the same for different realtors!`);
          }
          
          // Compare realtor IDs
          if (firstDashboardData.realtor.id !== secondDashboardData.realtor.id) {
            console.log(`✅ Dashboard data is unique per realtor`);
          } else {
            console.log(`❌ Dashboard data is the same for different realtors!`);
          }
        }
      }
    } else {
      console.log(`⚠️  Could not login as second realtor for comparison`);
    }

    console.log('\n🎉 Realtor Pages Audit Complete!');

  } catch (error) {
    console.error('❌ Audit failed:', error.message);
  }
}

// Run the audit
testRealtorPagesAudit();