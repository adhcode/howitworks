'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

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
    const [displayedProperties, setDisplayedProperties] = useState(FEATURED_PROPERTIES);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
            const mobile = windowWidth < 768;
            setIsMobile(mobile);

            // Show all 3 properties on both mobile and desktop
            setDisplayedProperties(FEATURED_PROPERTIES);
        };

        handleResize();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? FEATURED_PROPERTIES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === FEATURED_PROPERTIES.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 px-4 lg:px-16" id="featured-properties">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[32px] font-semibold text-[#1A2A52] mb-2">Featured Properties</h2>
                        <p className="text-[#3A3A3C] text-base max-w-[690px]">
                            Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through us. Click "View Details" for more information.
                        </p>
                    </div>
                    <Link
                        href="/properties"
                        className="text-[#3A3A3C] hidden md:block font-medium hover:text-[#1FD2AF] transition-all text-[14px] border border-[#EBEBEB] bg-[#F4F5F7] rounded-[8px] px-4 py-2"
                    >
                        View All Properties
                    </Link>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            {...property}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8">
                    <Link
                        href="/properties"
                        className="text-[#3A3A3C] md:hidden font-medium hover:text-[#1FD2AF] transition-all text-[14px] border border-[#EBEBEB] bg-[#F4F5F7] rounded-[8px] px-4 py-2"
                    >
                        View All Properties
                    </Link>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrevious}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all disabled:opacity-50"
                            disabled={false}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm text-[#3A3A3C]">
                                {String(currentIndex + 1).padStart(2, '0')} of {String(FEATURED_PROPERTIES.length).padStart(2, '0')}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all disabled:opacity-50"
                            disabled={false}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedProperties; 