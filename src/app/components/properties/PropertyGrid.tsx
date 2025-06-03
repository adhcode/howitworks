"use client";

import Link from 'next/link';
import PropertyCard from '@/app/components/PropertyCard';

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

const PropertyGrid = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROPERTIES.map((property) => (
                    <PropertyCard
                        key={property.id}
                        image={property.imageUrl}
                        title={property.title}
                        description={property.description}
                        price={property.price}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        hasVilla={property.type === 'Villa'}
                        href={property.readMoreLink}
                    />
                ))}
            </div>

            {/* Pagination and View All Button */}
            <div className="flex items-center justify-between mt-8">
                <Link
                    href="/properties"
                    className="text-[#2E2E2E] md:hidden font-medium hover:text-[#5f32d3] transition-all text-[14px] border border-[#EBEBEB] bg-[#FAFAFA] rounded-[8px] px-4 py-2"
                >
                    View All Properties
                </Link>


                <div className="flex gap-2 items-center">
                    <button className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F5F3FF] transition-all">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div>
                        <p className="text-sm text-[#666666]">01 of 60</p></div>
                    <button className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F5F3FF] transition-all">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyGrid; 