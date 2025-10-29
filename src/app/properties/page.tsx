import PropertySearch from '../components/properties/PropertySearch';
import PropertyGrid from '../components/properties/PropertyGrid';
import ContactForm from '../components/properties/ContactForm';
import Testimonials from '../components/Testimonials';

export default function PropertiesPage() {
    return (
        <main>
            {/* Hero Section with overlapping search */}
            <div className="bg-[#F4F5F7] pb-24">
                <div className="container mx-auto px-4 md:px-0 pt-12">
                    <section className="mb-12">
                        <h1 className="text-[32px] font-semibold text-[#1A2A52] mb-4">
                            Explore Available Properties
                        </h1>
                        <p className="text-[#3A3A3C]">
                            Browse our curated listings of verified homes and properties across Nigeria. Filter by location, price, type, and more to find your ideal property.
                        </p>
                    </section>
                </div>
            </div>

            {/* White background content */}
            <div className="bg-white">
                <div className="container mx-auto px-4 md:px-0">
                    {/* Search Section - positioned to overlap */}
                    <div className="-mt-14 ">
                        <PropertySearch />
                    </div>

                    {/* Properties Section */}
                    <section className="mt-16">
                        <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A2A52] mb-4">
                            Discover a World of Possibilities
                        </h2>
                        <p className="text-[#3A3A3C] text-[14px] md:text-[16px] mb-8">
                            Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home.
                        </p>
                        <PropertyGrid />
                        <PropertyGrid />
                    </section>
                    <ContactForm />
                </div>
            </div>
        </main>
    );
} 