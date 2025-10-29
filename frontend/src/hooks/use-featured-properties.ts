import { useState, useEffect } from 'react';
import { propertyApi } from '../lib/api-endpoints';

export interface FeaturedProperty {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  hasVilla: boolean;
  href: string;
  location: string;
  propertyType: string;
  area?: number;
  featured: boolean;
  realtor?: any;
}

export const useFeaturedProperties = () => {
  const [properties, setProperties] = useState<FeaturedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching featured properties...');
      const response = await propertyApi.getFeatured();
      console.log('✅ Featured properties response:', response);
      
      // Transform API data to match component expectations
      const transformedProperties: FeaturedProperty[] = response.map((property: any) => ({
        id: property.id,
        image: property.images?.[0] || '/img1.png', // Use first image or fallback
        title: property.title,
        description: property.description || '',
        price: property.price,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        hasVilla: property.propertyType === 'Villa',
        href: `/properties/${property.id}`,
        location: property.location,
        propertyType: property.propertyType,
        area: property.area,
        featured: property.featured,
        realtor: property.realtor
      }));
      
      console.log('✅ Transformed properties:', transformedProperties);
      setProperties(transformedProperties);
    } catch (err: any) {
      console.error('❌ Error fetching featured properties:', err);
      setError(err?.message || 'Failed to load featured properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 useFeaturedProperties effect triggered');
    fetchFeaturedProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refetch: fetchFeaturedProperties
  };
};