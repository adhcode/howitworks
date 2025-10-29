# Realtor Status Feature - Explanation & Usage

## 🎯 Purpose

The `isActive` status field for realtors serves important business and security functions in the platform.

## ✅ Why We Need It

### 1. **Account Suspension**
- Temporarily suspend realtors who violate policies
- Pause accounts during investigations or disputes
- Handle complaints without deleting historical data

### 2. **Access Control**
- **Prevents Login**: Inactive realtors cannot log into their dashboard
- **Blocks New Leads**: Inactive realtors don't receive new lead assignments
- **Stops Payouts**: Commission payouts can be held for inactive accounts

### 3. **Offboarding**
- Gracefully remove realtors who leave the company
- Maintain all historical data (leads, commissions, properties)
- Preserve audit trail for compliance

### 4. **Reactivation**
- Easily reactivate returning realtors
- No need to recreate accounts or restore data
- Seamless return to work

### 5. **Data Integrity**
- Keep complete transaction history
- Maintain referral tracking
- Preserve commission records for accounting

## 🔒 Security Implementation

### Login Protection
When a user tries to log in, the system now checks:
1. Does the user exist?
2. **Is the account active?** ← New check
3. Is the password correct?

If the account is inactive, login is blocked with message:
> "Your account has been deactivated. Please contact support."

### Code Location
`backend/src/auth/auth.service.ts` - `validateUser()` method

```typescript
// Check if user account is active
if (!user.isActive) {
  throw new UnauthorizedException('Your account has been deactivated. Please contact support.');
}
```

## 📊 Default Behavior

### New Realtors
- **Default Status**: Active (`isActive: true`)
- Set automatically during invitation acceptance
- Ready to work immediately after signup

### Database Schema
```prisma
model User {
  isActive  Boolean   @default(true)
}
```

## 🎛️ Admin Controls

### Where Admins Can Toggle Status

#### 1. Realtors List Page (`/admin/realtors`)
- Shows status badge (Active/Inactive) for each realtor
- Quick visual overview of all realtor statuses

#### 2. View Realtor Page (`/admin/realtors/[id]`)
- Activate/Deactivate button in header
- Button color changes based on action:
  - **Yellow**: Deactivate (warning action)
  - **Green**: Activate (positive action)

#### 3. Edit Realtor Page (`/admin/realtors/edit/[id]`)
- Dedicated "Account Status" section
- Visual indicator with colored dot
- Toggle button with clear labeling

## 🔄 What Happens When Status Changes

### When Deactivated (Active → Inactive):
1. ❌ Realtor cannot log in
2. ❌ No new leads assigned
3. ❌ Commission payouts may be held
4. ✅ Historical data preserved
5. ✅ Existing leads remain visible to admin
6. ✅ Past commissions remain in records

### When Activated (Inactive → Active):
1. ✅ Realtor can log in again
2. ✅ Can receive new leads
3. ✅ Commission payouts resume
4. ✅ Full access to dashboard restored

## 📋 Common Use Cases

### Scenario 1: Policy Violation
```
Realtor violates terms of service
  ↓
Admin deactivates account
  ↓
Investigation conducted
  ↓
If resolved: Reactivate
If not: Keep inactive
```

### Scenario 2: Realtor Leaves Company
```
Realtor resigns
  ↓
Admin deactivates account
  ↓
Historical data preserved
  ↓
If they return: Reactivate
```

### Scenario 3: Seasonal Worker
```
Realtor works part-time
  ↓
Deactivate during off-season
  ↓
Reactivate when they return
  ↓
No data loss, seamless transition
```

### Scenario 4: Dispute Resolution
```
Client complaint received
  ↓
Temporarily deactivate during review
  ↓
Resolve issue
  ↓
Reactivate account
```

## 🧪 Testing

### Test Status Toggle
```bash
node test-realtor-status-toggle.js
```

This will:
- Toggle a realtor from active to inactive
- Verify they cannot log in
- Toggle back to active
- Verify they can log in again

### Manual Testing
1. Go to `/admin/realtors`
2. Click on a realtor
3. Click "Deactivate"
4. Try to log in as that realtor → Should fail
5. Go back to admin, click "Activate"
6. Try to log in as that realtor → Should succeed

## 🎨 UI Indicators

### Status Colors
- 🟢 **Green**: Active (good to go)
- 🔴 **Red**: Inactive (blocked)

### Button Colors
- 🟡 **Yellow**: Deactivate action (warning)
- 🟢 **Green**: Activate action (positive)

## 💡 Best Practices

### When to Deactivate
- ✅ Realtor leaves the company
- ✅ Policy violations under investigation
- ✅ Temporary suspension needed
- ✅ Account security concerns

### When NOT to Delete
- ❌ Don't delete realtors who have historical data
- ❌ Don't delete for temporary issues
- ❌ Don't delete if there are commission records
- ❌ Don't delete if there are active leads

### Use Deactivate Instead
Deactivation preserves:
- All leads and their history
- Commission records for accounting
- Property listings
- Referral tracking
- Audit trail

## 🔮 Future Enhancements (Optional)

1. **Audit Log**: Track who activated/deactivated and when
2. **Reason Field**: Require reason for deactivation
3. **Auto-Reactivation**: Schedule reactivation dates
4. **Notification**: Email realtor when status changes
5. **Bulk Actions**: Activate/deactivate multiple realtors
6. **Status History**: View timeline of status changes

## ✅ Summary

The status feature is **essential** for:
- 🔒 Security (prevent unauthorized access)
- 📊 Data integrity (preserve historical records)
- 🎯 Business operations (manage realtor lifecycle)
- ⚖️ Compliance (maintain audit trails)

**Recommendation**: Keep the status feature as it provides critical business functionality without the destructive nature of deletion.
