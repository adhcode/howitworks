/**
 * Custom hooks for dashboard data fetching
 * Role-specific dashboard data with optimized caching
 */

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../lib/api-endpoints';
import { queryKeys } from '../lib/query-client';
import { useAuth } from '../app/providers/auth-provider';

// Get investor dashboard data
export function useInvestorDashboard() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.dashboard.investor,
    queryFn: dashboardApi.getInvestorDashboard,
    enabled: user?.role === 'INVESTOR',
    // Reduce aggressive refetching to prevent rate limiting
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Remove automatic refetch interval to prevent too many requests
    refetchInterval: false,
  });
}

// Get realtor dashboard data
export function useRealtorDashboard() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.dashboard.realtor,
    queryFn: dashboardApi.getRealtorDashboard,
    enabled: user?.role === 'REALTOR',
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
  });
}

// Get admin dashboard data
export function useAdminDashboard() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.dashboard.admin,
    queryFn: dashboardApi.getAdminDashboard,
    enabled: user?.role === 'ADMIN',
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
  });
}

// Get admin analytics data
export function useAdminAnalytics() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.dashboard.analytics,
    queryFn: dashboardApi.getAdminAnalytics,
    enabled: user?.role === 'ADMIN',
    // Analytics data can be cached longer
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get admin investments
export function useAdminInvestments(params?: any) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['admin', 'investments', params],
    queryFn: () => dashboardApi.getAdminInvestments(params),
    enabled: user?.role === 'ADMIN',
    staleTime: 5 * 60 * 1000,
  });
}

// Get admin properties
export function useAdminProperties(params?: any) {
  const { user, loading: authLoading } = useAuth();
  
  console.log('🔍 useAdminProperties hook called with params:', params);
  console.log('👤 Current user:', user);
  console.log('⏳ Auth loading:', authLoading);
  
  return useQuery({
    queryKey: ['admin', 'properties', params],
    queryFn: async () => {
      console.log('📡 Fetching admin properties...');
      try {
        const result = await dashboardApi.getAdminProperties(params);
        console.log('✅ Admin properties fetched successfully:', result);
        return result;
      } catch (error) {
        console.error('❌ Error fetching admin properties:', error);
        throw error;
      }
    },
    // Don't wait for auth - the endpoint doesn't require it for GET
    // But we still check user role for UI purposes
    enabled: !authLoading,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
}