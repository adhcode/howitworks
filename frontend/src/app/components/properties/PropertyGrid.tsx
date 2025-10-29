"use client";

import Link from 'next/link';
import PropertyCard from '@/app/components/PropertyCard';
import { useProperties } from '@/hooks/use-properties';
import { useState } from 'react';

interface Property {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    type: 'Villa' | 'Apartment';
    readMoreLink: string;
}

const PROPERTIES: Property[] = [
    {
        id: '1',
        title: 'Luxury 4-Bedroom Apartment in Lekki',
        description: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.',
        imageUrl: '/img3.png',
        price: 95000000,
        bedrooms: 4,
        bathrooms: 3,
        type: 'Villa',
        readMoreLink: '/properties/luxury-villa-1'
    },
    {
        id: '2',
        title: 'Luxury 2-Bedroom Apartment in Lekki',
        description: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views.',
        imageUrl: '/img2.png',
        price: 95000000,
        bedrooms: 2,
        bathrooms: 2,
        type: 'Villa',
        readMoreLink: '/properties/apartment-1'
    },
    {
        id: '3',
        title: 'Luxury 3-Bedroom Apartment in Lekki',
        description: 'An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community.',
        imageUrl: '/img1.png',
        price: 95000000,
        bedrooms: 3,
        bathrooms: 3,
        type: 'Villa',
        readMoreLink: '/properties/luxury-apartment-1'
    },
    {
        id: '4',
        title: 'Luxury 4-Bedroom Apartment in Lekki',
        description: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.',
        imageUrl: '/img3.png',
        price: 95000000,
        bedrooms: 4,
        bathrooms: 3,
        type: 'Villa',
        readMoreLink: '/properties/luxury-villa-2'
    },
    {
        id: '5',
        title: 'Luxury 2-Bedroom Apartment in Lekki',
        description: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views.',
        imageUrl: '/img2.png',
        price: 95000000,
        bedrooms: 2,
        bathrooms: 2,
        type: 'Villa',
        readMoreLink: '/properties/apartment-2'
    },
    {
        id: '6',
        title: 'Luxury 3-Bedroom Apartment in Lekki',
        description: 'An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community.',
        imageUrl: '/img1.png',
        price: 95000000,
        bedrooms: 3,
        bathrooms: 3,
        type: 'Villa',
        readMoreLink: '/properties/luxury-apartment-2'
    }
];

interface PropertyGridProps {
    searchQuery?: string;
    filters?: any;
}

const PropertyGrid = ({ searchQuery, filters }: PropertyGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Build search filters
    const searchFilters = {
        page: currentPage,
        limit: 6,
        status: 'active',
        ...(searchQuery && { location: searchQuery }), // Use location for general search
        ...filters
    };
    
    const { properties, pagination, loading, error, refetch } = useProperties(searchFilters);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        refetch({ 
            page, 
            limit: 6, 
            status: 'active',
            ...(searchQuery && { location: searchQuery }),
            ...filters
        });
    };

    const handlePrevious = () => {
        if (pagination && currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (pagination && currentPage < pagination.totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                    onClick={() => refetch()}
                    className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5a2fd4]"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No properties available at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Check back later for new listings!</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property: any) => (
                    <PropertyCard
                        key={property.id}
                        image={property.images?.[0] || '/img1.png'}
                        title={property.title}
                        description={property.description || ''}
                        price={property.price}
                        bedrooms={property.bedrooms || 0}
                        bathrooms={property.bathrooms || 0}
                        hasVilla={property.propertyType === 'Villa'}
                        href={`/properties/${property.id}`}
                    />
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-8">
                    <div className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * 6) + 1} to {Math.min(currentPage * 6, pagination.total)} of {pagination.total} properties
                    </div>

                    <div className="flex gap-2 items-center">
                        <button 
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm text-[#3A3A3C]">
                                {String(currentPage).padStart(2, '0')} of {String(pagination.totalPages).padStart(2, '0')}
                            </p>
                        </div>
                        <button 
                            onClick={handleNext}
                            disabled={currentPage === pagination.totalPages}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyGrid; 