# Rate Limiting Fixes

## Problem
The application was experiencing "too many requests" errors due to aggressive React Query refetch configurations that were causing excessive API calls.

## Root Causes
1. **Aggressive refetch intervals**: Dashboard hooks were auto-refetching every 3-5 minutes
2. **Window focus refetching**: Every time the browser window gained focus, all queries would refetch
3. **Multiple simultaneous hooks**: Dashboard pages were running multiple hooks with refetch intervals simultaneously
4. **No backend rate limiting**: The backend had no protection against excessive requests

## Solutions Implemented

### 1. Frontend Optimizations

#### React Query Configuration (`frontend/src/lib/query-client.ts`)
- **Disabled window focus refetching**: Changed `refetchOnWindowFocus: false`
- **Kept reconnect refetching**: Maintained `refetchOnReconnect: 'always'` for critical data

#### Dashboard Hooks (`frontend/src/hooks/use-dashboard.ts`)
- **Removed auto-refetch intervals**: Changed `refetchInterval: false` for all dashboard hooks
- **Increased stale time**: Extended cache time to 5 minutes for better performance
- **Added manual refresh**: Users can now manually refresh data when needed

#### Other Hooks
- **Leads hook**: Removed 3-minute auto-refresh interval
- **Commissions hook**: Removed 10-minute auto-refresh interval
- **Increased stale times**: Extended cache durations to reduce API calls

### 2. Backend Rate Limiting

#### Added NestJS Throttler (`backend/src/app.module.ts`)
- **Installed**: `@nestjs/throttler` package
- **Configuration**: 100 requests per minute per IP address
- **Global protection**: Applied to all API endpoints

### 3. User Experience Improvements

#### Manual Refresh Controls
- **Dashboard refresh button**: Added manual refresh functionality to investor dashboard
- **Loading states**: Shows spinner during refresh operations
- **Disabled state**: Prevents multiple simultaneous refresh requests

## Benefits

1. **Reduced API calls**: Eliminated unnecessary automatic refetching
2. **Better performance**: Longer cache times reduce server load
3. **Rate limiting protection**: Backend now protects against excessive requests
4. **User control**: Manual refresh gives users control over data updates
5. **Improved reliability**: Less likely to hit rate limits during normal usage

## Usage

### For Users
- Data is cached for 5 minutes by default
- Use the "Refresh" button to manually update dashboard data
- Data will automatically refresh on network reconnection

### For Developers
- React Query hooks now use conservative refetch settings
- Backend automatically throttles requests (100/minute per IP)
- Add manual refresh buttons to pages that need real-time data

## Testing

Run the integration tests to verify everything works:
```bash
node test-integration.js
node test-full-integration.js
```

Both frontend and backend should work without rate limiting errors.