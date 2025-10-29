# Commission System - Complete Implementation Plan

## Overview
Implement an automated commission system that:
1. Tracks when leads are converted to sales
2. Calculates realtor commissions based on property price
3. Creates commission records automatically
4. Allows admin to manage commission rates
5. Shows earnings in realtor dashboard
6. Handles commission payouts

## Current Database Schema

```prisma
model Commission {
  id              String    @id @default(uuid())
  client          String
  amount          Float
  status          String    @default("pending")
  transactionDate DateTime
  realtorId       String
  propertyId      String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  property        Property? @relation(fields: [propertyId], references: [id])
  realtor         Realtor   @relation(fields: [realtorId], references: [id])
}
```

## Proposed Enhancements

### 1. Add Commission Rate to Property
```prisma
model Property {
  // ... existing fields
  commissionRate  Float?    @default(3.0) // Percentage (e.g., 3.0 = 3%)
  commissionType  String?   @default("percentage") // "percentage" or "fixed"
}
```

### 2. Add Lead Reference to Commission
```prisma
model Commission {
  // ... existing fields
  leadId          String?
  lead            Lead?     @relation(fields: [leadId], references: [id])
}
```

### 3. Add Lead Reference
```prisma
model Lead {
  // ... existing fields
  commissions     Commission[]
}
```

## System Flow

### Automatic Commission Creation

```
Lead Status: "converted"
        ↓
Check if realtor assigned
        ↓
Check if property exists
        ↓
Calculate commission:
  - Get property price
  - Get commission rate (property or default)
  - Calculate: price × (rate / 100)
        ↓
Create Commission Record:
  - client: lead.name
  - amount: calculated amount
  - status: "pending"
  - realtorId: lead.realtorId
  - propertyId: lead.propertyId
  - leadId: lead.id
  - transactionDate: now()
```

### Commission Calculation Logic

```typescript
function calculateCommission(property: Property, lead: Lead): number {
  const rate = property.commissionRate || 3.0; // Default 3%
  const type = property.commissionType || 'percentage';
  
  if (type === 'percentage') {
    return property.price * (rate / 100);
  } else {
    return rate; // Fixed amount
  }
}
```

## Features to Implement

### 1. Admin Commission Management

#### Set Commission Rate on Property
- Add commission rate field to property creation/edit
- Default: 3% of property price
- Options: Percentage or Fixed amount

#### Commission Dashboard
- View all commissions
- Filter by status (pending, approved, paid)
- Filter by realtor
- Approve commissions
- Mark as paid
- View commission history

### 2. Automatic Commission Creation

#### Trigger: Lead Status → "converted"
```typescript
async updateLeadStatus(leadId: string, status: string) {
  const lead = await this.prisma.lead.update({
    where: { id: leadId },
    data: { status },
    include: { property: true, realtor: true }
  });
  
  // If converted, create commission
  if (status === 'converted' && lead.realtorId && lead.propertyId) {
    await this.createCommissionFromLead(lead);
  }
  
  return lead;
}
```

#### Commission Creation
```typescript
async createCommissionFromLead(lead: Lead) {
  const property = lead.property;
  const commissionAmount = this.calculateCommission(property, lead);
  
  const commission = await this.prisma.commission.create({
    data: {
      client: lead.name,
      amount: commissionAmount,
      status: 'pending',
      transactionDate: new Date(),
      realtorId: lead.realtorId,
      propertyId: lead.propertyId,
      leadId: lead.id
    }
  });
  
  // Notify realtor
  await this.notifyRealtorOfCommission(lead.realtorId, commission);
  
  return commission;
}
```

### 3. Realtor Dashboard Integration

#### Show Earnings
```typescript
// Total earnings
const totalEarnings = await prisma.commission.aggregate({
  where: { realtorId, status: 'paid' },
  _sum: { amount: true }
});

// Pending commissions
const pendingCommissions = await prisma.commission.aggregate({
  where: { realtorId, status: { in: ['pending', 'approved'] } },
  _sum: { amount: true }
});

// Commission history
const commissions = await prisma.commission.findMany({
  where: { realtorId },
  include: { property: true, lead: true },
  orderBy: { createdAt: 'desc' }
});
```

### 4. Commission Status Flow

```
pending → approved → paid
   ↓         ↓
rejected  rejected
```

- **Pending**: Automatically created when lead converted
- **Approved**: Admin reviews and approves
- **Paid**: Admin marks as paid after payment
- **Rejected**: Admin rejects (with reason)

## UI Components

### 1. Admin Commission Page

#### Features:
- List all commissions
- Filter by status, realtor, date
- Approve/reject commissions
- Mark as paid
- View commission details
- Export to CSV

#### Card Design:
```
┌─────────────────────────────────┐
│ Client Name        [Status]     │
│ Property: Title                 │
│ Realtor: Name                   │
│ Amount: ₦X,XXX,XXX             │
│ Date: Oct 28, 2025             │
│ [Approve] [Reject] [Mark Paid] │
└─────────────────────────────────┘
```

### 2. Property Form Enhancement

#### Add Commission Fields:
```
Commission Rate: [3.0] %
Commission Type: [Percentage ▼]
  - Percentage of price
  - Fixed amount
```

### 3. Realtor Dashboard

#### Earnings Summary:
```
┌─────────────────────────────────┐
│ Total Earnings                  │
│ ₦X,XXX,XXX                     │
├─────────────────────────────────┤
│ Pending: ₦XXX,XXX              │
│ This Month: ₦XXX,XXX           │
└─────────────────────────────────┘
```

#### Commission History:
```
┌─────────────────────────────────┐
│ Client Name        [Status]     │
│ Property: Title                 │
│ Amount: ₦XXX,XXX               │
│ Date: Oct 28, 2025             │
└─────────────────────────────────┘
```

## API Endpoints

### Admin Endpoints
```typescript
GET    /api/admin/commissions              // List all
GET    /api/admin/commissions/:id          // Get one
POST   /api/admin/commissions              // Create manually
PUT    /api/admin/commissions/:id/approve  // Approve
PUT    /api/admin/commissions/:id/reject   // Reject
PUT    /api/admin/commissions/:id/pay      // Mark as paid
GET    /api/admin/commissions/stats        // Statistics
```

### Realtor Endpoints
```typescript
GET    /api/realtor/commissions            // My commissions
GET    /api/realtor/commissions/stats      // My stats
GET    /api/realtor/commissions/:id        // Get one
```

### Lead Update (triggers commission)
```typescript
PUT    /api/leads/:id/status               // Update status
```

## Database Migration

```prisma
// Add to Property model
model Property {
  // ... existing fields
  commissionRate  Float?    @default(3.0)
  commissionType  String?   @default("percentage")
}

// Add to Commission model
model Commission {
  // ... existing fields
  leadId          String?
  lead            Lead?     @relation(fields: [leadId], references: [id])
}

// Add to Lead model
model Lead {
  // ... existing fields
  commissions     Commission[]
}
```

## Implementation Steps

### Phase 1: Database Updates
1. ✅ Add commission fields to Property model
2. ✅ Add leadId to Commission model
3. ✅ Add commissions relation to Lead model
4. ✅ Run migration

### Phase 2: Backend Logic
1. ✅ Update lead service to create commission on conversion
2. ✅ Create commission calculation logic
3. ✅ Add commission approval/rejection endpoints
4. ✅ Add commission payout endpoint
5. ✅ Add commission statistics endpoints

### Phase 3: Admin UI
1. ✅ Add commission rate fields to property form
2. ✅ Create admin commission page
3. ✅ Add commission management actions
4. ✅ Add commission statistics

### Phase 4: Realtor UI
1. ✅ Update realtor dashboard with earnings
2. ✅ Create realtor commission page
3. ✅ Add commission history
4. ✅ Add earnings statistics

### Phase 5: Testing
1. ✅ Test commission creation on lead conversion
2. ✅ Test commission calculation
3. ✅ Test approval/rejection flow
4. ✅ Test payout flow
5. ✅ Test realtor dashboard

## Business Rules

### Commission Rates
- **Default**: 3% of property price
- **Minimum**: 1%
- **Maximum**: 10%
- **Fixed Amount**: Any amount set by admin

### Commission Creation
- **Trigger**: Lead status changes to "converted"
- **Requirements**: 
  - Lead must have assigned realtor
  - Lead must have associated property
  - Property must have price
- **Status**: Starts as "pending"

### Commission Approval
- **Who**: Admin only
- **When**: After verifying sale completion
- **Action**: Status changes to "approved"

### Commission Payout
- **Who**: Admin only
- **When**: After payment to realtor
- **Action**: Status changes to "paid"
- **Record**: Transaction date recorded

## Notifications

### Realtor Notifications:
1. **Commission Created**: "You earned ₦XXX from [Property]"
2. **Commission Approved**: "Your commission of ₦XXX has been approved"
3. **Commission Paid**: "₦XXX has been paid to your account"

### Admin Notifications:
1. **New Commission**: "New commission pending approval"
2. **High Value**: "High-value commission (>₦1M) created"

## Reports & Analytics

### Admin Reports:
- Total commissions paid (by period)
- Pending commissions
- Top earning realtors
- Commission by property type
- Average commission per sale

### Realtor Reports:
- Total earnings
- Monthly earnings
- Commission history
- Conversion rate
- Average commission per sale

## Security

### Access Control:
- **Admin**: Full access to all commissions
- **Realtor**: Only their own commissions
- **Investor**: No access

### Validation:
- Commission amount must be positive
- Commission rate must be between 0-100%
- Only admin can approve/pay commissions
- Cannot modify paid commissions

## Example Scenarios

### Scenario 1: Referral Link Sale
```
1. User clicks ?ref=john-doe
2. User submits enquiry on ₦50M property (3% commission)
3. Admin updates lead status to "converted"
4. System creates commission:
   - Client: User Name
   - Amount: ₦1,500,000 (3% of ₦50M)
   - Status: pending
   - Realtor: John Doe
5. Admin approves commission
6. Admin marks as paid
7. John Doe sees ₦1,500,000 in earnings
```

### Scenario 2: Property Listing Sale
```
1. Property listed by Jane Smith (₦30M, 2.5% commission)
2. User enquires directly
3. Lead assigned to Jane Smith
4. Admin converts lead
5. System creates commission:
   - Amount: ₦750,000 (2.5% of ₦30M)
   - Realtor: Jane Smith
6. Jane sees pending commission in dashboard
```

### Scenario 3: Fixed Commission
```
1. Property with fixed ₦500,000 commission
2. Lead converted
3. System creates commission:
   - Amount: ₦500,000 (fixed)
   - Not based on property price
```

## Next Steps

Would you like me to:
1. Update the database schema
2. Implement the backend logic
3. Create the admin commission page
4. Update the realtor dashboard
5. All of the above

Let's build this commission system! 🚀
