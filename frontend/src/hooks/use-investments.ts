/**
 * Custom hooks for investment-related data fetching
 * Handles investor portfolio management and investment operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { investmentApi } from '../lib/api-endpoints';
import { queryKeys } from '../lib/query-client';
import type { CreateInvestmentDto } from '../lib/types';

// Get all investments for current investor
export function useInvestments(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return useQuery({
    queryKey: queryKeys.investments.list(params),
    queryFn: () => investmentApi.getAll(params),
    placeholderData: (previousData) => previousData,
  });
}

// Get single investment by ID
export function useInvestment(id: string) {
  return useQuery({
    queryKey: queryKeys.investments.detail(id),
    queryFn: () => investmentApi.getById(id),
    enabled: !!id,
  });
}

// Create new investment
export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvestmentDto) => investmentApi.create(data),
    onSuccess: () => {
      // Invalidate investments list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.investments.all });
      // Also invalidate dashboard data as it includes investment stats
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.investor });
    },
  });
}

// Update investment
export function useUpdateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateInvestmentDto> }) =>
      investmentApi.update(id, data),
    onSuccess: (updatedInvestment, { id }) => {
      // Update specific investment in cache
      queryClient.setQueryData(
        queryKeys.investments.detail(id),
        updatedInvestment
      );
      // Invalidate investments list
      queryClient.invalidateQueries({ queryKey: queryKeys.investments.all });
      // Invalidate dashboard
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.investor });
    },
  });
}

// Delete investment
export function useDeleteInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: investmentApi.delete,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.investments.detail(deletedId) });
      // Invalidate investments list
      queryClient.invalidateQueries({ queryKey: queryKeys.investments.all });
      // Invalidate dashboard
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.investor });
    },
  });
}