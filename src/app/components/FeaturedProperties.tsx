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
    return (
        <section className="py-16 px-4 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[32px] font-semibold text-[#2E2E2E] mb-2">Featured Properties</h2>
                        <p className="text-[#666666] text-base max-w-[690px]">
                            Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through us. Click "View Details" for more information.
                        </p>
                    </div>
                    <Link
                        href="/properties"
                        className="text-[#2E2E2E] hidden md:block font-medium hover:text-[#5f32d3] transition-all text-[14px] border border-[#EBEBEB] bg-[#FAFAFA] rounded-[8px] px-4 py-2"
                    >
                        View All Properties
                    </Link>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_PROPERTIES.map((property) => (
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
        </section>
    );
};

export default FeaturedProperties; 