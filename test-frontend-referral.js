// Frontend Referral System Test Script
// This script can be run in the browser console to test referral functionality

console.log('🔗 Frontend Referral System Test');

// Test 1: Simulate referral code storage
function testReferralStorage() {
    console.log('\n1. Testing referral code storage...');
    
    // Clear any existing referral data
    localStorage.removeItem('referralCode');
    localStorage.removeItem('referralExpiration');
    
    // Simulate referral code from URL
    const testSlug = 'test-realtor-slug';
    const expirationTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 days
    
    localStorage.setItem('referralCode', testSlug);
    localStorage.setItem('referralExpiration', expirationTime.toString());
    
    console.log('✅ Referral code stored:', localStorage.getItem('referralCode'));
    console.log('✅ Expiration set:', new Date(parseInt(localStorage.getItem('referralExpiration'))));
}

// Test 2: Test getReferralCode function
function testGetReferralCode() {
    console.log('\n2. Testing getReferralCode function...');
    
    // This function should be available if ReferralTracker is loaded
    if (typeof getReferralCode === 'function') {
        const code = getReferralCode();
        console.log('✅ getReferralCode result:', code);
    } else {
        console.log('⚠️  getReferralCode function not available');
        console.log('   Make sure you\'re on a page with ReferralTracker component');
    }
}

// Test 3: Test referral code expiration
function testReferralExpiration() {
    console.log('\n3. Testing referral code expiration...');
    
    // Set expired referral code
    const expiredTime = new Date().getTime() - (24 * 60 * 60 * 1000); // 1 day ago
    localStorage.setItem('referralCode', 'expired-code');
    localStorage.setItem('referralExpiration', expiredTime.toString());
    
    // Try to get it (should return null and clear storage)
    if (typeof getReferralCode === 'function') {
        const code = getReferralCode();
        console.log('✅ Expired code result (should be null):', code);
        console.log('✅ Storage cleared:', !localStorage.getItem('referralCode'));
    } else {
        console.log('⚠️  Cannot test expiration without getReferralCode function');
    }
}

// Test 4: Test URL parameter parsing
function testURLParsing() {
    console.log('\n4. Testing URL parameter parsing...');
    
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    
    console.log('Current URL:', currentURL);
    console.log('Ref parameter:', refParam);
    
    if (refParam) {
        console.log('✅ Referral parameter found:', refParam);
    } else {
        console.log('ℹ️  No referral parameter in current URL');
        console.log('   Try visiting: ' + window.location.origin + '?ref=test-slug');
    }
}

// Test 5: Test localStorage functionality
function testLocalStorage() {
    console.log('\n5. Testing localStorage functionality...');
    
    try {
        // Test if localStorage is available
        localStorage.setItem('test', 'value');
        const testValue = localStorage.getItem('test');
        localStorage.removeItem('test');
        
        if (testValue === 'value') {
            console.log('✅ localStorage is working correctly');
        } else {
            console.log('❌ localStorage test failed');
        }
    } catch (error) {
        console.log('❌ localStorage not available:', error.message);
    }
}

// Test 6: Simulate lead creation with referral
function simulateLeadCreation() {
    console.log('\n6. Simulating lead creation with referral...');
    
    // Set up referral code
    localStorage.setItem('referralCode', 'test-realtor-123');
    localStorage.setItem('referralExpiration', (new Date().getTime() + 86400000).toString());
    
    // Simulate the lead data that would be sent
    const leadData = {
        name: 'Test Client',
        email: 'test.client@example.com',
        phone: '+234-800-123-4567',
        message: 'Test inquiry from referral',
        propertyId: 'some-property-id',
        realtorSlug: localStorage.getItem('referralCode'),
        source: 'referral_link'
    };
    
    console.log('✅ Lead data with referral:', leadData);
    console.log('ℹ️  This data would be sent to the API');
    
    // Simulate clearing referral after successful creation
    localStorage.removeItem('referralCode');
    localStorage.removeItem('referralExpiration');
    console.log('✅ Referral code cleared after lead creation');
}

// Main test runner
function runAllTests() {
    console.log('🚀 Running all frontend referral tests...\n');
    
    testLocalStorage();
    testURLParsing();
    testReferralStorage();
    testGetReferralCode();
    testReferralExpiration();
    simulateLeadCreation();
    
    console.log('\n🏁 Frontend referral tests completed!');
    console.log('\n📋 Manual Testing Checklist:');
    console.log('□ Visit homepage with ?ref=test-slug parameter');
    console.log('□ Check browser console for "Referral code stored" message');
    console.log('□ Navigate to different pages (referral should persist)');
    console.log('□ Go to property detail page and submit inquiry');
    console.log('□ Verify referral code is cleared after submission');
    console.log('□ Check admin panel to see if lead was assigned correctly');
}

// Instructions for manual testing
console.log('📖 How to use this test script:');
console.log('1. Copy and paste this entire script into browser console');
console.log('2. Run: runAllTests()');
console.log('3. Follow the manual testing checklist');
console.log('4. Test on different pages of your site');
console.log('\nOr run individual tests:');
console.log('- testReferralStorage()');
console.log('- testGetReferralCode()');
console.log('- testReferralExpiration()');
console.log('- testURLParsing()');
console.log('- simulateLeadCreation()');

// Auto-run if script is loaded
if (typeof window !== 'undefined') {
    // Give user option to run tests
    console.log('\n🎯 Ready to test! Run: runAllTests()');
}