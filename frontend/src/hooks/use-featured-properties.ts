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
      
      // Property type to Unsplash image mapping
      const propertyImages: Record<string, string> = {
        'Villa': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop',
        'Apartment': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
        'Duplex': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop',
        'Mansion': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
        'Penthouse': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
        'Townhouse': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
        'Flat': 'https://images.unsplash.com/photo-1502672260066-6bc32826c5e9?w=800&auto=format&fit=crop',
        'Studio': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop',
      };
      
      // Transform API data to match component expectations
      const transformedProperties: FeaturedProperty[] = response.map((property: any, index: number) => ({
        id: property.id,
        image: property.images && property.images.length > 0 
          ? property.images[0] 
          : propertyImages[property.propertyType] || `https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop`,
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