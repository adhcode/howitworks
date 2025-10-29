/**
 * React Query configuration and setup
 * Handles caching, background updates, and error handling
 */

import { QueryClient } from '@tanstack/react-query';
import type { ApiError } from './api-client';

// Create a client with optimized defaults for real estate platform
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: (failureCount, error) => {
        const apiError = error as unknown as ApiError;
        // Don't retry on 4xx errors (client errors)
        if (apiError?.statusCode >= 400 && apiError?.statusCode < 500) {
          return false;
        }
        return failureCount < 3;
      },
      // Reduce aggressive refetching to prevent rate limiting
      refetchOnWindowFocus: false,
      // Only refetch on reconnect for critical data
      refetchOnReconnect: 'always',
      // Network mode for better offline handling
      networkMode: 'online',
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      // Network mode for mutations
      networkMode: 'online',
    },
  },
});

// Utility functions for cache management
export const cacheUtils = {
  // Clear all cached data
  clearAll: () => queryClient.clear(),
  
  // Clear specific entity cache
  clearEntity: (entityKey: string) => {
    queryClient.removeQueries({ queryKey: [entityKey] });
  },
  
  // Prefetch critical data on app start
  prefetchCriticalData: async (userRole: string) => {
    const prefetchPromises = [];
    
    if (userRole === 'INVESTOR') {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: queryKeys.dashboard.investor,
          queryFn: () => import('../lib/api-endpoints').then(api => api.dashboardApi.getInvestorDashboard()),
        })
      );
    } else if (userRole === 'REALTOR') {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: queryKeys.dashboard.realtor,
          queryFn: () => import('../lib/api-endpoints').then(api => api.dashboardApi.getRealtorDashboard()),
        })
      );
    }
    
    await Promise.all(prefetchPromises);
  },
  
  // Invalidate stale data
  invalidateStaleData: () => {
    queryClient.invalidateQueries({ stale: true });
  },
};

// Query keys for consistent caching
export const queryKeys = {
  // Authentication
  auth: {
    profile: ['auth', 'profile'] as const,
  },
  
  // Properties
  properties: {
    all: ['properties'] as const,
    list: (params?: any) => ['properties', 'list', params] as const,
    detail: (id: string) => ['properties', 'detail', id] as const,
    featured: ['properties', 'featured'] as const,
  },
  
  // Investments
  investments: {
    all: ['investments'] as const,
    list: (params?: any) => ['investments', 'list', params] as const,
    detail: (id: string) => ['investments', 'detail', id] as const,
  },
  
  // Leads
  leads: {
    all: ['leads'] as const,
    list: (params?: any) => ['leads', 'list', params] as const,
    detail: (id: string) => ['leads', 'detail', id] as const,
    realtor: (params?: any) => ['leads', 'realtor', params] as const,
  },
  
  // Commissions
  commissions: {
    all: ['commissions'] as const,
    list: (params?: any) => ['commissions', 'list', params] as const,
    detail: (id: string) => ['commissions', 'detail', id] as const,
    realtor: (params?: any) => ['commissions', 'realtor', params] as const,
  },
  
  // Blog
  blog: {
    all: ['blog'] as const,
    list: (params?: any) => ['blog', 'list', params] as const,
    detail: (slug: string) => ['blog', 'detail', slug] as const,
    featured: ['blog', 'featured'] as const,
  },
  
  // Dashboards
  dashboard: {
    investor: ['dashboard', 'investor'] as const,
    realtor: ['dashboard', 'realtor'] as const,
    admin: ['dashboard', 'admin'] as const,
    analytics: ['dashboard', 'analytics'] as const,
  },
  
  // Profiles
  profile: {
    investor: ['profile', 'investor'] as const,
    realtor: ['profile', 'realtor'] as const,
    realtorPerformance: ['profile', 'realtor', 'performance'] as const,
  },
  
  // Users
  users: {
    all: ['users'] as const,
    list: (role?: string) => ['users', 'list', role] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
  
  // Realtors
  realtors: {
    all: ['realtors'] as const,
    list: ['realtors', 'list'] as const,
    detail: (id: string) => ['realtors', 'detail', id] as const,
    bySlug: (slug: string) => ['realtors', 'slug', slug] as const,
  },
  
  // Investors
  investors: {
    all: ['investors'] as const,
    list: ['investors', 'list'] as const,
    detail: (id: string) => ['investors', 'detail', id] as const,
  },
} as const;