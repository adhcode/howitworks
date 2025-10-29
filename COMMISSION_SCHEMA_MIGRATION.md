# Commission System - Database Migration

## Changes Made to Schema

### 1. Property Model - Added Commission Fields
```prisma
model Property {
  // NEW FIELDS:
  commissionRate Float?  @default(3.0)        // Default 3%
  commissionType String? @default("percentage") // "percentage" or "fixed"
}
```

**Purpose**: Allow admin to set custom commission rates per property

### 2. Lead Model - Added Commission Relation
```prisma
model Lead {
  // NEW FIELD:
  commissions Commission[]
}
```

**Purpose**: Track which commissions were generated from which leads

### 3. Commission Model - Enhanced
```prisma
model Commission {
  // NEW FIELDS:
  leadId  String?  // Link to the lead that generated this commission
  notes   String?  // Admin notes about the commission
  
  // NEW RELATION:
  lead    Lead?    @relation(fields: [leadId], references: [id])
}
```

**Purpose**: Better tracking and admin notes

## Migration Command

Run this command to apply the changes:

```bash
cd backend
npx prisma migrate dev --name add_commission_system
npx prisma generate
```

## What This Enables

### 1. Flexible Commission Rates
- Each property can have its own commission rate
- Default: 3% of property price
- Can be changed to fixed amount

### 2. Automatic Commission Creation
- When lead status → "converted"
- System calculates commission based on property settings
- Creates commission record automatically

### 3. Better Tracking
- Link commission to specific lead
- Track conversion source
- Admin can add notes

## Example Data

### Property with Percentage Commission
```json
{
  "title": "Luxury Villa",
  "price": 50000000,
  "commissionRate": 3.0,
  "commissionType": "percentage"
}
// Commission = ₦1,500,000 (3% of ₦50M)
```

### Property with Fixed Commission
```json
{
  "title": "Budget Apartment",
  "price": 10000000,
  "commissionRate": 500000,
  "commissionType": "fixed"
}
// Commission = ₦500,000 (fixed amount)
```

## Backward Compatibility

- Existing properties will get default values:
  - `commissionRate`: 3.0
  - `commissionType`: "percentage"
- Existing commissions remain unchanged
- No data loss

## Next Steps

After migration:
1. ✅ Update backend services
2. ✅ Add commission creation logic
3. ✅ Update property forms
4. ✅ Create commission management UI
