import { useState, useEffect } from 'react';
import { leadApi } from '../lib/api-endpoints';
import { PaginatedResponse } from '../lib/types';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  source?: string;
  propertyId?: string;
  realtorId?: string;
  createdAt: string;
  updatedAt: string;
  property?: {
    title: string;
    location: string;
    price?: number;
    images?: string[];
  };
  realtor?: {
    id: string;
    slug: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface LeadFilters {
  page?: number;
  limit?: number;
  status?: string;
  propertyId?: string;
  realtorId?: string;
  source?: string;
  search?: string;
}

export interface PaginatedLeadsResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const useLeads = (filters: LeadFilters = {}) => {
  const [data, setData] = useState<PaginatedResponse<Lead> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async (newFilters: LeadFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...newFilters };
      console.log('🔍 Fetching leads with filters:', mergedFilters);
      
      const response = await leadApi.getAll(mergedFilters);
      console.log('✅ Leads response:', response);
      
      setData(response);
    } catch (err: any) {
      console.error('❌ Error fetching leads:', err);
      setError(err?.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 useLeads effect triggered with filters:', filters);
    fetchLeads();
  }, [JSON.stringify(filters)]);

  const refetch = (newFilters?: LeadFilters) => {
    fetchLeads(newFilters);
  };

  return {
    leads: data?.data || [],
    pagination: {
      page: data?.page || 1,
      limit: data?.limit || 10,
      total: data?.total || 0,
      totalPages: data?.totalPages || 1
    },
    loading,
    error,
    refetch
  };
};
