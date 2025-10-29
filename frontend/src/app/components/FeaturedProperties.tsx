'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { useFeaturedProperties } from '../../hooks/use-featured-properties';

const FEATURED_PROPERTIES = [
    {
        id: 1,
        image: '/img1.png',
        title: 'Luxury 4-Bedroom Apartment in Lekki',
        description: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.',
        price: 95000000,
        bedrooms: 4,
        bathrooms: 3,
        hasVilla: true,
        href: '/properties/luxury-4-bedroom'
    },
    {
        id: 2,
        image: '/img2.png',
        title: 'Luxury 2-Bedroom Apartment in Lekki',
        description: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views.',
        price: 75000000,
        bedrooms: 2,
        bathrooms: 2,
        hasVilla: false,
        href: '/properties/luxury-2-bedroom'
    },
    {
        id: 3,
        image: '/img3.png',
        title: 'Luxury 3-Bedroom Apartment in Lekki',
        description: 'An elegant 3-bedroom, 2-bathroom penthouse in a gated community.',
        price: 85000000,
        bedrooms: 3,
        bathrooms: 2,
        hasVilla: false,
        href: '/properties/luxury-3-bedroom'
    }
];

const FeaturedProperties = () => {
    const { properties, loading, error, refetch } = useFeaturedProperties();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
            const mobile = windowWidth < 768;
            setIsMobile(mobile);
        };

        handleResize();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 sm:py-20 px-4 lg:px-16 bg-white" id="featured-properties">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-3 sm:mb-4">Featured Properties</h2>
                        <p className="text-[#3A3A3C] text-base sm:text-lg max-w-[690px] leading-relaxed">
                            Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through us. Click "View Details" for more information.
                        </p>
                    </div>
                    <Link
                        href="/properties"
                        className="text-[#1A2A52] hidden lg:block font-semibold hover:text-[#1FD2AF] transition-all text-lg border-2 border-[#1A2A52] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white self-start"
                    >
                        View All Properties
                    </Link>
                </div>

                {/* Properties Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={refetch}
                            className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5a2fd4]"
                        >
                            Try Again
                        </button>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No featured properties available at the moment.</p>
                        <p className="text-gray-500 text-sm mt-2">Check back later for new listings!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                {...property}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-12 gap-4">
                    <Link
                        href="/properties"
                        className="text-[#1A2A52] lg:hidden font-semibold hover:text-[#1FD2AF] transition-all text-lg border-2 border-[#1A2A52] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white w-full sm:w-auto text-center"
                    >
                        View All Properties
                    </Link>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrevious}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#1A2A52] flex items-center justify-center hover:bg-[#1A2A52] hover:text-white transition-all text-[#1A2A52]"
                            disabled={false}
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm sm:text-lg text-[#1A2A52] font-semibold">
                                {String(currentIndex + 1).padStart(2, '0')} of {String(properties.length).padStart(2, '0')}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#1A2A52] flex items-center justify-center hover:bg-[#1A2A52] hover:text-white transition-all text-[#1A2A52]"
                            disabled={false}
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedProperties; 