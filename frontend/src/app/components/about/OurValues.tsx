import Image from 'next/image';

const VALUES = [
    {
        icon: "/icons/star-purple.svg",
        title: "Integrity",
        description: "We are honest and transparent in every aspect of our work."
    },
    {
        icon: "/icons/graduation-purple.svg",
        title: "Quality",
        description: "We strive for excellence in everything we do."
    },
    {
        icon: "/icons/client.svg",
        title: "Innovation",
        description: "We embrace creativity and new technologies."
    },
    {
        icon: "/icons/star-purple.svg",
        title: "Safety",
        description: "We prioritize the health and safety of our team and clients."
    },
    {
        icon: "/icons/graduation-purple.svg",
        title: "Sustainability",
        description: "In How It Works Limited, our commitment goes beyond construction — we integrate maintenance as a core part of our company culture, and committed to environmentally responsible practices."
    }
];

const OurValues = () => {
    return (
        <section className="mb-20">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-[32px] font-semibold text-[#1A2A52] mb-4">
                        Core Values
                    </h2>
                    <p className="text-[#3A3A3C] text-base">
                        Our core values guide every decision we make and every project we undertake. They represent our commitment to excellence and our dedication to building lasting relationships with our clients and communities.
                    </p>
                    <p className="text-[#3A3A3C] text-base mt-6">
                        These values are not just words on a page – they are the foundation of our company culture and the driving force behind our success in real estate development, construction, and property management.
                    </p>
                </div>

                {/* Right Values Grid */}
                <div className="lg:w-[600px] bg-[#F4F5F7] border border-[#EBEBEB] rounded-[32px] p-8 shadow-[0px_0px_0px_8px_#191919]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {VALUES.map((value, index) => (
                            <div
                                key={index}
                                className={`flex flex-col justify-start gap-4 pb-8 ${
                                    // Add border to all except last item on mobile
                                    index < VALUES.length - 1 ? 'border-b border-[#EBEBEB] md:border-none' : ''
                                    } ${
                                    // On desktop, add border to items that aren't in the last row
                                    index < VALUES.length - 1 && index % 2 === 1 ? '' : index < VALUES.length - 2 ? 'md:border-b md:border-[#EBEBEB]' : ''
                                    }`}
                            >
                                {/* Icon and Title Row */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#1FD2AF] bg-[#F4F5F7] flex items-center justify-center">
                                        <Image
                                            src={value.icon}
                                            alt={value.title}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <h3 className="text-[#1A2A52] text-[20px] font-semibold">
                                        {value.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div>
                                    <p className="text-[#3A3A3C] text-[14px]">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurValues; 