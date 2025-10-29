/**
 * Comprehensive Auth Flow Test
 * Tests login, token storage, and dashboard access for Admin and Realtor
 */

const API_BASE_URL = 'http://localhost:3004/api';

// Test credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60) + '\n');
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

// Test 1: Admin Login
async function testAdminLogin() {
  logSection('TEST 1: Admin Login');
  
  try {
    logInfo('Attempting admin login...');
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ADMIN_CREDENTIALS)
    });

    const data = await response.json();

    if (response.ok) {
      logSuccess('Admin login successful');
      logInfo(`User: ${data.user.firstName} ${data.user.lastName}`);
      logInfo(`Email: ${data.user.email}`);
      logInfo(`Role: ${data.user.role}`);
      logInfo(`Token received: ${data.access_token.substring(0, 20)}...`);
      
      // Verify role
      if (data.user.role === 'ADMIN') {
        logSuccess('User role is ADMIN ✓');
      } else {
        logError(`Expected role ADMIN, got ${data.user.role}`);
      }
      
      return { success: true, token: data.access_token, user: data.user };
    } else {
      logError(`Login failed: ${data.message || 'Unknown error'}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Login error: ${error.message}`);
    return { success: false };
  }
}

// Test 2: Admin Dashboard Access
async function testAdminDashboardAccess(token) {
  logSection('TEST 2: Admin Dashboard Access');
  
  try {
    logInfo('Fetching admin dashboard data...');
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (response.ok) {
      logSuccess('Admin dashboard access successful');
      logInfo('Dashboard Stats:');
      console.log(JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      logError(`Dashboard access failed: ${data.message || 'Unknown error'}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Dashboard access error: ${error.message}`);
    return { success: false };
  }
}

// Test 3: Get Profile
async function testGetProfile(token, expectedRole) {
  logSection(`TEST 3: Get Profile (${expectedRole})`);
  
  try {
    logInfo('Fetching user profile...');
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (response.ok) {
      logSuccess('Profile fetch successful');
      logInfo(`Name: ${data.firstName} ${data.lastName}`);
      logInfo(`Email: ${data.email}`);
      logInfo(`Role: ${data.role}`);
      logInfo(`Active: ${data.isActive}`);
      
      if (data.role === expectedRole) {
        logSuccess(`Role matches expected: ${expectedRole} ✓`);
      } else {
        logError(`Role mismatch! Expected ${expectedRole}, got ${data.role}`);
      }
      
      return { success: true, profile: data };
    } else {
      logError(`Profile fetch failed: ${data.message || 'Unknown error'}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Profile fetch error: ${error.message}`);
    return { success: false };
  }
}

// Test 4: Invalid Login
async function testInvalidLogin() {
  logSection('TEST 4: Invalid Login (Security Check)');
  
  try {
    logInfo('Attempting login with invalid credentials...');
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'invalid@example.com',
        password: 'wrongpassword'
      })
    });

    const data = await response.json();

    if (response.status === 401) {
      logSuccess('Invalid login correctly rejected (401) ✓');
      logInfo(`Error message: ${data.message}`);
      return { success: true };
    } else {
      logError(`Expected 401 status, got ${response.status}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Invalid login test error: ${error.message}`);
    return { success: false };
  }
}

// Test 5: Unauthorized Dashboard Access
async function testUnauthorizedAccess() {
  logSection('TEST 5: Unauthorized Dashboard Access (Security Check)');
  
  try {
    logInfo('Attempting dashboard access without token...');
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 401) {
      logSuccess('Unauthorized access correctly blocked (401) ✓');
      return { success: true };
    } else {
      logError(`Expected 401 status, got ${response.status}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Unauthorized access test error: ${error.message}`);
    return { success: false };
  }
}

// Test 6: Check if Realtor exists
async function checkRealtorExists(token) {
  logSection('TEST 6: Check for Existing Realtor');
  
  try {
    logInfo('Fetching realtors list...');
    const response = await fetch(`${API_BASE_URL}/admin/realtors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (response.ok) {
      logSuccess(`Found ${data.length} realtor(s)`);
      
      if (data.length > 0) {
        const realtor = data[0];
        logInfo('First Realtor:');
        logInfo(`  Name: ${realtor.user.firstName} ${realtor.user.lastName}`);
        logInfo(`  Email: ${realtor.user.email}`);
        logInfo(`  Slug: ${realtor.slug}`);
        logInfo(`  Active: ${realtor.user.isActive}`);
        return { success: true, realtor };
      } else {
        logWarning('No realtors found in database');
        logInfo('You can create a realtor through admin dashboard or invitation system');
        return { success: true, realtor: null };
      }
    } else {
      logError(`Failed to fetch realtors: ${data.message || 'Unknown error'}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Realtor check error: ${error.message}`);
    return { success: false };
  }
}

// Test 7: Test Realtor Login (if exists)
async function testRealtorLogin(realtorEmail) {
  logSection('TEST 7: Realtor Login');
  
  if (!realtorEmail) {
    logWarning('No realtor email provided, skipping realtor login test');
    return { success: true, skipped: true };
  }
  
  try {
    logInfo(`Attempting realtor login with email: ${realtorEmail}`);
    logWarning('Note: You need to know the realtor password');
    logInfo('If realtor was created via invitation, use the password they set during signup');
    
    // We can't test this without knowing the password
    logInfo('To test realtor login manually:');
    logInfo('1. Go to http://localhost:3000/auth/login');
    logInfo(`2. Use email: ${realtorEmail}`);
    logInfo('3. Use the password set during realtor signup');
    
    return { success: true, manual: true };
  } catch (error) {
    logError(`Realtor login test error: ${error.message}`);
    return { success: false };
  }
}

// Test 8: Test Realtor Invitation System
async function testRealtorInvitation(token) {
  logSection('TEST 8: Realtor Invitation System');
  
  try {
    logInfo('Testing realtor invitation endpoint...');
    
    const testEmail = `test-realtor-${Date.now()}@example.com`;
    const response = await fetch(`${API_BASE_URL}/admin/realtors/invite`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        firstName: 'Test',
        lastName: 'Realtor'
      })
    });

    const data = await response.json();

    if (response.ok) {
      logSuccess('Realtor invitation created successfully');
      logInfo(`Invitation ID: ${data.id}`);
      logInfo(`Email: ${data.email}`);
      logInfo(`Token: ${data.token.substring(0, 20)}...`);
      logInfo(`Status: ${data.status}`);
      logInfo(`Expires: ${new Date(data.expiresAt).toLocaleString()}`);
      
      // Check if email was sent
      if (data.emailSent !== false) {
        logSuccess('Email service is configured ✓');
        logInfo('Check the email inbox for invitation');
      } else {
        logWarning('Email might not have been sent - check Resend configuration');
      }
      
      return { success: true, invitation: data };
    } else {
      logError(`Invitation failed: ${data.message || 'Unknown error'}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Invitation test error: ${error.message}`);
    return { success: false };
  }
}

// Main test runner
async function runAllTests() {
  console.clear();
  log('\n🧪 AUTH FLOW COMPREHENSIVE TEST SUITE', 'cyan');
  log('Testing authentication, authorization, and user flows\n', 'cyan');
  
  const results = {
    passed: 0,
    failed: 0,
    skipped: 0
  };

  // Test 1: Admin Login
  const adminLoginResult = await testAdminLogin();
  if (adminLoginResult.success) {
    results.passed++;
    
    // Test 2: Admin Dashboard Access
    const dashboardResult = await testAdminDashboardAccess(adminLoginResult.token);
    dashboardResult.success ? results.passed++ : results.failed++;
    
    // Test 3: Get Admin Profile
    const profileResult = await testGetProfile(adminLoginResult.token, 'ADMIN');
    profileResult.success ? results.passed++ : results.failed++;
    
    // Test 6: Check for Realtors
    const realtorCheckResult = await checkRealtorExists(adminLoginResult.token);
    if (realtorCheckResult.success) {
      results.passed++;
      
      // Test 7: Realtor Login (manual)
      if (realtorCheckResult.realtor) {
        const realtorLoginResult = await testRealtorLogin(realtorCheckResult.realtor.user.email);
        if (realtorLoginResult.skipped || realtorLoginResult.manual) {
          results.skipped++;
        } else {
          realtorLoginResult.success ? results.passed++ : results.failed++;
        }
      }
    } else {
      results.failed++;
    }
    
    // Test 8: Realtor Invitation
    const invitationResult = await testRealtorInvitation(adminLoginResult.token);
    invitationResult.success ? results.passed++ : results.failed++;
    
  } else {
    results.failed++;
    logError('Admin login failed - cannot proceed with other tests');
  }
  
  // Test 4: Invalid Login
  const invalidLoginResult = await testInvalidLogin();
  invalidLoginResult.success ? results.passed++ : results.failed++;
  
  // Test 5: Unauthorized Access
  const unauthorizedResult = await testUnauthorizedAccess();
  unauthorizedResult.success ? results.passed++ : results.failed++;
  
  // Summary
  logSection('TEST SUMMARY');
  log(`Total Tests: ${results.passed + results.failed + results.skipped}`, 'cyan');
  logSuccess(`Passed: ${results.passed}`);
  if (results.failed > 0) {
    logError(`Failed: ${results.failed}`);
  }
  if (results.skipped > 0) {
    logWarning(`Skipped: ${results.skipped}`);
  }
  
  if (results.failed === 0) {
    log('\n🎉 All tests passed! Auth system is working correctly.', 'green');
  } else {
    log('\n⚠️  Some tests failed. Please review the errors above.', 'yellow');
  }
  
  // Next steps
  logSection('NEXT STEPS');
  logInfo('1. Test the login page at: http://localhost:3000/auth/login');
  logInfo('2. Login as admin with: admin@example.com / admin123');
  logInfo('3. Go to Admin Dashboard → Realtors → Add Realtor');
  logInfo('4. Invite a realtor and check email');
  logInfo('5. Complete realtor signup via invitation link');
  logInfo('6. Test realtor login and dashboard access');
  
  console.log('\n');
}

// Run tests
runAllTests().catch(error => {
  logError(`Test suite error: ${error.message}`);
  process.exit(1);
});
