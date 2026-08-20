import { useState, useEffect } from 'react';
import { propertyApi } from '../lib/api-endpoints';
import { PaginatedResponse, Property } from '../lib/types';


export interface PropertyFilters {
  page?: number;
  limit?: number;
  location?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  status?: string;
  search?: string;
  sortBy?: string;
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
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
      
      // API returns { properties: [...], pagination: { page, limit, total, pages } }
      // Handle the actual response structure
      if (response && typeof response === 'object') {
        const propertiesData = (response as any).properties || [];
        const paginationData = (response as any).pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 1
        };
        
        setProperties(propertiesData);
        setPagination({
          page: paginationData.page || 1,
          limit: paginationData.limit || 10,
          total: paginationData.total || 0,
          totalPages: paginationData.pages || 1
        });
      }
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
    properties,
    pagination,
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