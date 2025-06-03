import Image from 'next/image';

const VALUES = [
    {
        icon: "/icons/star-purple.svg",
        title: "Trust",
        description: "Trust is the cornerstone of every successful real estate transaction."
    },
    {
        icon: "/icons/graduation-purple.svg",
        title: "Excellence",
        description: "We set the bar high for ourselves. From the properties we list to the services we provide."
    },
    {
        icon: "/icons/client.svg",
        title: "Client-Centric",
        description: "Your dreams and needs are at the center of our universe. We listen, understand."
    },
    {
        icon: "/icons/star-purple.svg",
        title: "Our Commitment",
        description: "We are dedicated to providing you with the highest level of service, professionalism."
    }
];

const OurValues = () => {
    return (
        <section className="mb-20">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-[32px] font-semibold text-[#2E2E2E] mb-4">
                        Our Values
                    </h2>
                    <p className="text-[#666666] text-base">
                        Howitworks is a real estate marketing platform designed to connect property seekers with the best listings and with the right realtors.
                    </p>
                    <p className="text-[#666666] text-base mt-6">
                        We believe in relationships. That's why we work with a pool of verified, high-performing realtors who use our platform to refer, support, and close deals.
                    </p>
                    <p className="text-[#666666] text-base mt-6">
                        Our platform empowers home seekers to explore genuine listings and submit property enquiries, while allowing realtors to track their performance and commissions in real time.
                    </p>
                </div>

                {/* Right Values Grid */}
                <div className="lg:w-[600px] bg-[#FAFAFA] border border-[#EBEBEB] rounded-[32px] p-8 shadow-[0px_0px_0px_8px_#191919]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {VALUES.map((value, index) => (
                            <div
                                key={index}
                                className={`flex flex-col justify-start gap-4 pb-8 ${
                                    // Add border to all except last row items
                                    index < VALUES.length - 1 ? 'border-b border-[#EBEBEB]' : ''
                                    } ${
                                    // On mobile, add border to all except last item
                                    index !== VALUES.length - 1 ? 'md:border-none' : ''
                                    } ${
                                    // On desktop, add border to first row items
                                    index < 2 ? 'md:border-b md:border-[#EBEBEB]' : ''
                                    }`}
                            >
                                {/* Icon and Title Row */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#703BF7] bg-[#FAFAFA] flex items-center justify-center">
                                        <Image
                                            src={value.icon}
                                            alt={value.title}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <h3 className="text-[#2E2E2E] text-[20px] font-semibold">
                                        {value.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div>
                                    <p className="text-[#666666] text-[14px]">
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