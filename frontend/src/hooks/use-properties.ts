import { useState, useEffect } from 'react';
import { propertyApi } from '../lib/api-endpoints';
import { PaginatedResponse, Property } from '../lib/types';


export interface PropertyFilters {
  page?: number;
  limit?: number;
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

export interface PaginatedPropertiesResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const useProperties = (filters: PropertyFilters = {}) => {
  const [data, setData] = useState<PaginatedResponse<Property> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (newFilters: PropertyFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...newFilters };
      console.log('🔍 Fetching properties with filters:', mergedFilters);
      
      const response = await propertyApi.getAll(mergedFilters);
      console.log('✅ Properties response:', response);
      
      setData(response);
    } catch (err: any) {
      console.error('❌ Error fetching properties:', err);
      setError(err?.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 useProperties effect triggered with filters:', filters);
    fetchProperties();
  }, [JSON.stringify(filters)]); // Refetch when filters change

  const refetch = (newFilters?: PropertyFilters) => {
    fetchProperties(newFilters);
  };

  return {
    properties: data?.data || [],
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

// Hook for fetching a single property
export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await propertyApi.getById(id);
        setProperty(response);
      } catch (err: any) {
        console.error('❌ Error fetching property:', err);
        setError(err?.message || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return {
    property,
    loading,
    error
  };
};