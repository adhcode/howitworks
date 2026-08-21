'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { useFeaturedProperties } from '../../hooks/use-featured-properties';

const FeaturedProperties = () => {
    const { properties, loading, error, refetch } = useFeaturedProperties();
    const [currentPage, setCurrentPage] = useState(0);

    const PROPERTIES_PER_PAGE = 3;
    const totalPages = Math.ceil(properties.length / PROPERTIES_PER_PAGE);

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    // Get properties for current page
    const startIndex = currentPage * PROPERTIES_PER_PAGE;
    const endIndex = startIndex + PROPERTIES_PER_PAGE;
    const currentProperties = properties.slice(startIndex, endIndex);

    return (
        <section className="py-16 sm:py-20 px-4 lg:px-16 bg-white" id="featured-properties">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E2E2E] mb-3 sm:mb-4">Featured Properties</h2>
                        <p className="text-[#666666] text-base sm:text-lg max-w-[690px] leading-relaxed">
                            Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through us. Click "View Details" for more information.
                        </p>
                    </div>
                    <Link
                        href="/properties"
                        className="text-[#2E2E2E] hidden lg:block font-semibold transition-all text-lg border-2 border-[#2E2E2E] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white self-start"
                    >
                        View All Properties
                    </Link>
                </div>

                {/* Properties Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
                        <div className="text-red-600 mb-4 text-lg font-medium">{error}</div>
                        <p className="text-gray-600 mb-4">Unable to load properties. Please check your connection.</p>
                        <button 
                            onClick={refetch}
                            className="bg-[#1FD2AF] text-white px-6 py-3 rounded-lg hover:bg-[#1AB89A] transition-all font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-gray-600 text-xl font-medium mb-2">No featured properties available</p>
                        <p className="text-gray-500 text-sm">Check back later for new listings!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {currentProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                {...property}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {properties.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-12 gap-4">
                        <Link
                            href="/properties"
                            className="text-[#2E2E2E] lg:hidden font-semibold transition-all text-lg border-2 border-[#2E2E2E] bg-transparent rounded-lg px-6 py-3 hover:bg-[#2E2E2E] hover:text-white w-full sm:w-auto text-center"
                        >
                            View All Properties
                        </Link>

                        <div className="flex gap-2 items-center">
                            <button
                                onClick={handlePrevious}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#2E2E2E] flex items-center justify-center hover:bg-[#2E2E2E] hover:text-white transition-all text-[#2E2E2E]"
                                disabled={false}
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div>
                                <p className="text-sm sm:text-lg text-[#2E2E2E] font-semibold">
                                    {String(currentPage + 1).padStart(2, '0')} of {String(totalPages).padStart(2, '0')}
                                </p>
                            </div>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#2E2E2E] flex items-center justify-center hover:bg-[#2E2E2E] hover:text-white transition-all text-[#2E2E2E]"
                                disabled={false}
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedProperties; 