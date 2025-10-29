# Referral System Implementation

## Overview
The referral system allows realtors to track leads that come through their unique referral links. When a potential client visits the website through a realtor's referral link, any leads they create are automatically assigned to that realtor.

## How It Works

### 1. Referral Link Generation
- Each realtor gets a unique slug when created
- Referral links follow the format: `https://yoursite.com?ref=realtor-slug`
- Links are generated and displayed in the admin realtors management page

### 2. Referral Tracking
- When a user visits the site with a referral parameter (`?ref=realtor-slug`)
- The `ReferralTracker` component stores the referral code in localStorage
- The referral code expires after 30 days
- The tracking works across all pages on the site

### 3. Lead Assignment
- When a lead is created, the system checks for a stored referral code
- If found, it looks up the realtor by slug and assigns the lead to them
- The referral code is cleared after successful lead creation
- If no referral code exists, the lead follows normal assignment rules

## Technical Implementation

### Frontend Components

#### ReferralTracker Component
```typescript
// Location: frontend/src/app/components/ReferralTracker.tsx
- Monitors URL parameters for referral codes
- Stores referral codes in localStorage with expiration
- Provides utility functions for getting/clearing referral codes
```

#### Updated Homepage
```typescript
// Location: frontend/src/app/page.tsx
- Includes ReferralTracker component wrapped in Suspense
- Tracks referral codes on initial page load
```

#### Property Detail Page
```typescript
// Location: frontend/src/app/properties/[id]/page.tsx
- Includes referral code in lead creation
- Clears referral code after successful lead submission
- Sets source as 'referral_link' when referral code exists
```

#### Realtors Management Page
```typescript
// Location: frontend/src/app/admin/realtors/page.tsx
- Displays referral links for each realtor
- Copy-to-clipboard functionality for referral links
- Fixed referral link format to use query parameters
```

### Backend Integration

#### Lead Service
```typescript
// Location: backend/src/lead/lead.service.ts
- Accepts realtorSlug parameter in CreateLeadDto
- Looks up realtor by slug when realtorSlug is provided
- Assigns lead to the correct realtor based on referral
```

#### Realtor Creation
```typescript
// Location: frontend/src/hooks/use-realtors.ts
- useCreateRealtor hook for creating new realtors
- Displays referral link after successful creation
- Handles form validation and error states
```

## Data Flow

### 1. Referral Link Creation
```
Admin creates realtor → Realtor gets unique slug → Referral link generated → Admin copies link
```

### 2. Client Journey
```
Client clicks referral link → ReferralTracker stores code → Client browses site → Client submits inquiry → Lead assigned to realtor
```

### 3. Lead Assignment Logic
```
Lead created → Check for referral code → Look up realtor by slug → Assign lead → Clear referral code
```

## Features

### Referral Link Management
- **Automatic Generation**: Each realtor gets a unique referral link
- **Easy Copying**: One-click copy to clipboard in admin panel
- **Persistent Tracking**: Referral codes persist across browser sessions
- **Expiration**: Referral codes expire after 30 days

### Lead Tracking
- **Automatic Assignment**: Leads automatically assigned to referring realtor
- **Source Tracking**: Leads marked with 'referral_link' source
- **Fallback Logic**: If referral realtor not found, normal assignment rules apply
- **Clean State**: Referral code cleared after successful lead creation

### Admin Features
- **Referral Link Display**: All realtor referral links shown in admin panel
- **Performance Tracking**: Track leads generated through referrals
- **Easy Management**: Copy referral links with one click

## API Endpoints

### Realtor Management
- `POST /admin/realtors` - Create new realtor (returns slug for referral link)
- `GET /admin/realtors` - List all realtors with referral information
- `GET /realtors/slug/:slug` - Look up realtor by slug (for referral validation)

### Lead Management
- `POST /leads` - Create lead (accepts realtorSlug parameter)
- Enhanced CreateLeadDto includes realtorSlug field

## Testing

### Automated Tests
Run the comprehensive test suite:
```bash
node test-referral-system.js
```

Tests include:
- Realtor creation with slug generation
- Referral link functionality
- Lead creation with referral tracking
- Lead assignment verification
- Direct lead creation (without referral)

### Manual Testing Steps

1. **Create Realtor**
   - Go to admin panel → Realtors → Add New Realtor
   - Fill in realtor details and save
   - Note the referral link displayed

2. **Test Referral Tracking**
   - Copy the referral link
   - Open in new browser/incognito window
   - Check browser console for "Referral code stored" message
   - Verify localStorage contains referral code

3. **Test Lead Assignment**
   - Navigate to a property detail page
   - Submit an inquiry form
   - Verify lead is assigned to the referring realtor
   - Check that referral code is cleared from localStorage

4. **Test Expiration**
   - Set referral code with past expiration date
   - Verify it's automatically cleared when accessed

## Configuration

### Referral Code Expiration
```typescript
// Default: 30 days
const expirationTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
```

### Referral Link Format
```typescript
// Format: https://yoursite.com?ref=realtor-slug
const referralLink = `${window.location.origin}?ref=${realtorSlug}`;
```

## Error Handling

### Frontend Error Handling
- Invalid referral codes are ignored silently
- Expired referral codes are automatically cleared
- Network errors during lead creation show user-friendly messages
- Clipboard copy failures show appropriate error messages

### Backend Error Handling
- Invalid realtor slugs don't prevent lead creation
- Leads without valid referrals follow normal assignment rules
- Database errors are properly logged and handled

## Performance Considerations

### Client-Side Storage
- Uses localStorage for referral code persistence
- Minimal data stored (just slug and expiration)
- Automatic cleanup of expired codes

### Database Queries
- Efficient slug-based realtor lookup
- Indexed slug field for fast queries
- Minimal additional database load

## Security Considerations

### Data Protection
- Referral codes are non-sensitive (just realtor slugs)
- No personal information stored in referral tracking
- Referral codes can't be used to access sensitive data

### Validation
- Referral codes validated against existing realtors
- Invalid codes are ignored without errors
- No injection vulnerabilities in slug handling

## Future Enhancements

### Potential Improvements
1. **Analytics Dashboard**: Track referral performance metrics
2. **Commission Tracking**: Automatic commission calculation for referral leads
3. **Multi-Level Referrals**: Support for referral hierarchies
4. **Custom Referral Codes**: Allow realtors to customize their referral codes
5. **Referral Rewards**: Implement reward system for successful referrals

### Advanced Features
- **UTM Parameter Support**: Enhanced tracking with UTM parameters
- **Social Media Integration**: Easy sharing of referral links
- **QR Code Generation**: Generate QR codes for referral links
- **Mobile App Support**: Extend referral tracking to mobile apps

## Troubleshooting

### Common Issues

1. **Referral Code Not Stored**
   - Check if JavaScript is enabled
   - Verify localStorage is available
   - Check browser console for errors

2. **Lead Not Assigned to Realtor**
   - Verify referral code exists in localStorage
   - Check if realtor slug is valid
   - Confirm realtor exists in database

3. **Referral Link Not Working**
   - Verify URL format is correct
   - Check if ReferralTracker component is loaded
   - Confirm Suspense wrapper is present

### Debug Commands
```javascript
// Check stored referral code
localStorage.getItem('referralCode');

// Check expiration
localStorage.getItem('referralExpiration');

// Clear referral code manually
localStorage.removeItem('referralCode');
localStorage.removeItem('referralExpiration');
```

This referral system provides a complete solution for tracking and managing realtor referrals, with robust error handling, comprehensive testing, and room for future enhancements.