import { useState, useEffect } from 'react';
import { propertyApi } from '../lib/api-endpoints';
import { Property } from '../lib/types';


export const usePropertyDetail = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await propertyApi.getById(id);
      setProperty(response);
    } catch (err: any) {
      console.error('Error fetching property:', err);
      setError(err?.message || 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return {
    property,
    loading,
    error,
    refetch: fetchProperty
  };
};