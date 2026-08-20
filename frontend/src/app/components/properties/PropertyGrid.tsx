"use client";

import PropertyCard from '@/app/components/PropertyCard';
import { useProperties } from '@/hooks/use-properties';
import { useState, useEffect } from 'react';
import type { PropertyFilters } from './PropertySearch';

interface PropertyGridProps {
    searchQuery?: string;
    filters?: PropertyFilters;
}

const PropertyGrid = ({ searchQuery, filters }: PropertyGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Reset to page 1 when filters or search change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, JSON.stringify(filters)]);
    
    // Build comprehensive search filters
    const searchFilters = {
        page: currentPage,
        limit: 6,
        status: 'active',
        ...(searchQuery && { location: searchQuery }), // Use location for general search
        ...filters // Spread all filters from PropertySearch
    };
    
    const { properties, pagination, loading, error, refetch } = useProperties(searchFilters);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of property grid
        window.scrollTo({ top: 400, behavior: 'smooth' });
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
                    className="bg-[#1FD2AF] text-white px-6 py-2 rounded-lg hover:bg-[#1AB89A] transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <p className="text-[#2E2E2E] text-lg font-medium mb-2">No properties found</p>
                <p className="text-[#666666] text-sm">Try adjusting your filters or search criteria</p>
            </div>
        );
    }

    return (
        <div>
            {/* Results Count */}
            <div className="mb-6">
                <p className="text-[#666666] text-sm">
                    Showing {((currentPage - 1) * 6) + 1}-{Math.min(currentPage * 6, pagination?.total || 0)} of {pagination?.total || 0} properties
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property: any) => {
                    // Property type to image mapping
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
                    
                    const image = property.images && property.images.length > 0 
                        ? property.images[0] 
                        : propertyImages[property.propertyType] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop';
                    
                    return (
                        <PropertyCard
                            key={property.id}
                            image={image}
                            title={property.title}
                            description={property.description || ''}
                            price={property.price}
                            bedrooms={property.bedrooms || 0}
                            bathrooms={property.bathrooms || 0}
                            hasVilla={property.propertyType === 'Villa'}
                            href={`/properties/${property.id}`}
                        />
                    );
                })}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-12">
                    <div className="text-sm text-[#666666]">
                        Page {currentPage} of {pagination.totalPages}
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