import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { realtorApi } from '../lib/api-endpoints';
import toast from 'react-hot-toast';

export interface Realtor {
  id: string;
  userId: string;
  phoneNumber?: string;
  residentialAddress?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  profileImage?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
  };
  _count?: {
    properties: number;
    leads: number;
    commissions: number;
  };
}

export interface RealtorFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface CreateRealtorData {
  fullName: string;
  email: string;
}

export interface RealtorInvitation {
  id: string;
  email: string;
  fullName: string;
  token: string;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED';
  createdAt: string;
  expiresAt: string;
}

export const useRealtors = (filters: RealtorFilters = {}) => {
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchRealtors = async (newFilters: RealtorFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...newFilters };
      const response = await realtorApi.getAll();
      
      // Since the API doesn't return pagination info, we'll simulate it
      const allRealtors = response || [];
      const page = mergedFilters.page || 1;
      const limit = mergedFilters.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      // Filter realtors based on search term
      let filteredRealtors = allRealtors;
      if (mergedFilters.search) {
        const searchTerm = mergedFilters.search.toLowerCase();
        filteredRealtors = allRealtors.filter((realtor: Realtor) =>
          realtor.user.firstName.toLowerCase().includes(searchTerm) ||
          realtor.user.lastName.toLowerCase().includes(searchTerm) ||
          realtor.user.email.toLowerCase().includes(searchTerm) ||
          (realtor.phoneNumber && realtor.phoneNumber.includes(searchTerm))
        );
      }
      
      // Filter by status
      if (mergedFilters.status) {
        filteredRealtors = filteredRealtors.filter((realtor: Realtor) =>
          mergedFilters.status === 'active' ? realtor.user.isActive : !realtor.user.isActive
        );
      }
      
      const paginatedRealtors = filteredRealtors.slice(startIndex, endIndex);
      
      setRealtors(paginatedRealtors);
      setPagination({
        page,
        limit,
        total: filteredRealtors.length,
        pages: Math.ceil(filteredRealtors.length / limit)
      });
    } catch (err: any) {
      console.error('Error fetching realtors:', err);
      setError(err?.message || 'Failed to load realtors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealtors();
  }, [JSON.stringify(filters)]);

  const refetch = (newFilters?: RealtorFilters) => {
    fetchRealtors(newFilters);
  };

  return {
    realtors,
    loading,
    error,
    pagination,
    refetch
  };
};

// Hook for creating a realtor invitation
export const useCreateRealtor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRealtorData) => {
      // Split fullName into firstName and lastName
      const nameParts = data.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const invitationData = {
        email: data.email,
        firstName,
        lastName
      };

      const response = await realtorApi.invite(invitationData);
      return response;
    },
    onSuccess: (data) => {
      // Invalidate and refetch realtors list
      queryClient.invalidateQueries({ queryKey: ['realtors'] });
      queryClient.invalidateQueries({ queryKey: ['realtor-invitations'] });
      
      toast.success('Realtor invitation sent successfully!');
      toast.success(`Invitation email sent to: ${data.email}`, { duration: 8000 });
    },
    onError: (error: any) => {
      console.error('Error sending realtor invitation:', error);
      toast.error(error?.message || 'Failed to send realtor invitation');
    }
  });
};