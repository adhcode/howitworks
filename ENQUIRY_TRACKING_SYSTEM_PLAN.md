# Enquiry Tracking System - Implementation Plan

## Current System Analysis

### How It Works Now:
1. **Referral Tracking**: 
   - URL with `?ref=realtor-slug` stores referral code in localStorage
   - Code expires after 30 days
   - Stored when user visits ANY page with ref parameter

2. **Lead Creation**:
   - Form on property details page
   - Captures: name, email, phone, message, preferred date
   - **Has manual "Realtor Referral ID" input field** ❌
   - Automatically includes referral code from localStorage
   - Sends to backend with `realtorSlug` and `source`

3. **Database Schema** (Lead model):
   ```prisma
   model Lead {
     id         String
     name       String
     email      String
     phone      String?
     message    String?
     status     String @default("new")
     source     String?
     propertyId String?
     realtorId  String?
     investorId String?
     property   Property?
     realtor    Realtor?
     investor   Investor?
   }
   ```

## Issues to Fix

### 1. Remove Manual "Realtor Referral ID" Input ❌
**Problem**: Users shouldn't manually enter realtor IDs
**Solution**: Remove the input field, use automatic tracking only

### 2. Improve Realtor Tracking
**Current**: Sends `realtorSlug` but backend needs to resolve it to `realtorId`
**Solution**: Backend should look up realtor by slug and assign properly

### 3. Better Source Tracking
**Current**: Only tracks `referral_link` or `property_detail_page`
**Enhancement**: Add more granular tracking

## Proposed Solution

### Frontend Changes

#### 1. Remove Manual Realtor ID Input
```typescript
// REMOVE this field from the form:
<div>
  <label className="block text-sm mb-2">Realtor Referral ID</label>
  <input
    type="text"
    name="realtorId"
    value={formData.realtorId}
    onChange={handleInputChange}
    placeholder="111111222"
    className="..."
  />
</div>
```

#### 2. Enhanced Lead Submission
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Get referral code from localStorage
  const referralCode = getReferralCode();
  
  const leadData = {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.phone,
    message: `${formData.message}\n\nPreferred viewing date: ${formData.preferredDate}`,
    propertyId: property.id,
    realtorSlug: referralCode || undefined, // Backend will resolve to realtorId
    source: determineSource(referralCode, property)
  };
  
  await leadApi.create(leadData);
  
  // Clear referral code after successful submission
  if (referralCode) {
    clearReferralCode();
  }
};

// Helper function to determine source
function determineSource(referralCode: string | null, property: any): string {
  if (referralCode) {
    return 'referral_link';
  }
  if (property.realtor) {
    return 'property_listing'; // Property has assigned realtor
  }
  return 'direct_inquiry'; // No realtor involved
}
```

#### 3. Show Referral Info (Optional)
Display to user if they came via referral:
```typescript
{getReferralCode() && (
  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <p className="text-sm text-blue-800">
      ✓ You're being assisted by one of our verified realtors
    </p>
  </div>
)}
```

### Backend Changes

#### 1. Update Lead Service
```typescript
// backend/src/lead/lead.service.ts

async create(createLeadDto: CreateLeadDto) {
  let realtorId = createLeadDto.realtorId;
  
  // If realtorSlug is provided, look up the realtor
  if (createLeadDto.realtorSlug && !realtorId) {
    const realtor = await this.prisma.realtor.findUnique({
      where: { slug: createLeadDto.realtorSlug }
    });
    
    if (realtor) {
      realtorId = realtor.id;
    }
  }
  
  // If no realtor assigned yet, check if property has a realtor
  if (!realtorId && createLeadDto.propertyId) {
    const property = await this.prisma.property.findUnique({
      where: { id: createLeadDto.propertyId },
      select: { realtorId: true }
    });
    
    if (property?.realtorId) {
      realtorId = property.realtorId;
    }
  }
  
  const lead = await this.prisma.lead.create({
    data: {
      name: createLeadDto.name,
      email: createLeadDto.email,
      phone: createLeadDto.phone,
      message: createLeadDto.message,
      status: 'new',
      source: createLeadDto.source || 'direct_inquiry',
      propertyId: createLeadDto.propertyId,
      realtorId: realtorId,
    },
    include: {
      property: true,
      realtor: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      }
    }
  });
  
  return lead;
}
```

#### 2. Update DTO
```typescript
// backend/src/lead/dto/create-lead.dto.ts

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  propertyId?: string;

  @IsString()
  @IsOptional()
  realtorId?: string;

  @IsString()
  @IsOptional()
  realtorSlug?: string; // NEW: For referral tracking

  @IsString()
  @IsOptional()
  source?: string;
}
```

### Admin Enquiries Page Enhancement

#### Display Information:
1. **Lead Details**:
   - Client name, email, phone
   - Message and preferred date
   - Date submitted

2. **Property Information**:
   - Property title and thumbnail
   - Link to property details
   - Property price

3. **Realtor Assignment**:
   - Show assigned realtor (if any)
   - Source of lead (referral_link, property_listing, direct_inquiry)
   - Allow manual reassignment

4. **Status Management**:
   - New (default)
   - Contacted
   - Qualified
   - Viewing Scheduled
   - Converted
   - Lost/Rejected

5. **Actions**:
   - View full details
   - Update status
   - Assign/reassign realtor
   - Contact client (email/phone buttons)
   - Add notes

## Source Types

```typescript
enum LeadSource {
  REFERRAL_LINK = 'referral_link',        // Came via ?ref=slug
  PROPERTY_LISTING = 'property_listing',  // Property has assigned realtor
  DIRECT_INQUIRY = 'direct_inquiry',      // No realtor involved
  WEBSITE_FORM = 'website_form',          // General contact form
  PHONE_CALL = 'phone_call',              // Manual entry
  EMAIL = 'email',                        // Manual entry
  WALK_IN = 'walk_in'                     // Manual entry
}
```

## Status Flow

```
New → Contacted → Qualified → Viewing Scheduled → Converted
                                                 ↓
                                              Lost/Rejected
```

## Benefits

### For Admin:
- ✅ Track which realtors are generating leads
- ✅ See conversion rates per realtor
- ✅ Identify high-performing properties
- ✅ Monitor lead sources
- ✅ Assign leads to realtors

### For Realtors:
- ✅ Get credit for referrals automatically
- ✅ See their leads in realtor dashboard
- ✅ Track their conversion rate
- ✅ Earn commissions on conversions

### For Users:
- ✅ Simpler form (no manual ID entry)
- ✅ Automatic realtor assignment
- ✅ Better experience

## Implementation Steps

### Phase 1: Frontend Form Update
1. ✅ Remove "Realtor Referral ID" input field
2. ✅ Update form state (remove realtorId)
3. ✅ Update submit handler
4. ✅ Add referral indicator (optional)
5. ✅ Test form submission

### Phase 2: Backend Enhancement
1. ✅ Update CreateLeadDto (add realtorSlug)
2. ✅ Update lead service (realtor lookup logic)
3. ✅ Add source tracking
4. ✅ Test API endpoints

### Phase 3: Admin Page Redesign
1. ✅ Create useLeads hook
2. ✅ Fetch real leads from API
3. ✅ Beautiful card layout
4. ✅ Skeleton loading
5. ✅ Filters (status, property, realtor, date)
6. ✅ Enhanced modal
7. ✅ Status management
8. ✅ Realtor assignment

### Phase 4: Testing
1. ✅ Test referral link flow
2. ✅ Test direct inquiry
3. ✅ Test property with realtor
4. ✅ Test lead creation
5. ✅ Test admin page
6. ✅ Test status updates

## API Endpoints Needed

```typescript
// Get all leads (admin)
GET /api/leads?page=1&limit=10&status=new&propertyId=xxx&realtorId=xxx

// Get single lead
GET /api/leads/:id

// Create lead (public)
POST /api/leads

// Update lead status (admin)
PUT /api/leads/:id/status

// Assign realtor (admin)
PUT /api/leads/:id/assign-realtor

// Get realtor's leads
GET /api/realtor/leads
```

## Database Queries

```sql
-- Get leads with property and realtor info
SELECT l.*, p.title as property_title, r.slug as realtor_slug, u.firstName, u.lastName
FROM Lead l
LEFT JOIN Property p ON l.propertyId = p.id
LEFT JOIN Realtor r ON l.realtorId = r.id
LEFT JOIN User u ON r.userId = u.id
WHERE l.status = 'new'
ORDER BY l.createdAt DESC;

-- Get lead stats by realtor
SELECT r.id, u.firstName, u.lastName, 
       COUNT(l.id) as total_leads,
       COUNT(CASE WHEN l.status = 'converted' THEN 1 END) as converted_leads
FROM Realtor r
LEFT JOIN User u ON r.userId = u.id
LEFT JOIN Lead l ON r.id = l.realtorId
GROUP BY r.id, u.firstName, u.lastName;
```

## Next Steps

1. **Remove the manual Realtor ID field** from the form
2. **Update backend** to handle realtorSlug lookup
3. **Redesign admin enquiries page** with real data
4. **Add realtor dashboard** to show their leads
5. **Implement notifications** when new leads arrive

Would you like me to start implementing these changes?
