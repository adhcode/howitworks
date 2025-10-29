/**
 * Custom hooks for user profile management
 * Handles profile data fetching and updates for all user roles
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../lib/api-endpoints';
import { queryKeys } from '../lib/query-client';
import { useAuth } from '../app/providers/auth-provider';
import type { UpdateProfileDto } from '../lib/types';

// Get investor profile
export function useInvestorProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.profile.investor,
    queryFn: profileApi.getInvestorProfile,
    enabled: user?.role === 'INVESTOR',
    // Profile data doesn't change often
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Update investor profile
export function useUpdateInvestorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => profileApi.updateInvestorProfile(data),
    onSuccess: (updatedProfile) => {
      // Update profile in cache
      queryClient.setQueryData(queryKeys.profile.investor, updatedProfile);
      // Also invalidate dashboard as it includes profile info
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.investor });
    },
  });
}

// Get realtor profile
export function useRealtorProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.profile.realtor,
    queryFn: profileApi.getRealtorProfile,
    enabled: user?.role === 'REALTOR',
    staleTime: 10 * 60 * 1000,
  });
}

// Update realtor profile
export function useUpdateRealtorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => profileApi.updateRealtorProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeys.profile.realtor, updatedProfile);
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.realtor });
    },
  });
}

// Get realtor performance metrics
export function useRealtorPerformance() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.profile.realtorPerformance,
    queryFn: profileApi.getRealtorPerformance,
    enabled: user?.role === 'REALTOR',
    // Performance data can be cached longer
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}