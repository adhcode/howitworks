const FEATURES = [
    {
        number: "01",
        title: "Verified Listings Only",
        description: "We vet every property on the platform."
    },
    {
        number: "02",
        title: "Trusted Realtor Network",
        description: "Work only with professionals you can count on"
    },
    {
        number: "03",
        title: "Transparent Commission System",
        description: "Realtors track performance and earnings clearly"
    },
    {
        number: "04",
        title: "Quick Enquiry Support",
        description: "We respond fast and follow through"
    }
];

const WhyChooseUs = () => {
    return (
        <section className="mb-20">
            <h2 className="text-[32px] font-semibold text-[#1A2A52] mb-12">
                Why Choose Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {FEATURES.map((feature, index) => (
                    <div key={index} className="relative">
                        {/* Card */}
                        <div className="bg-[#F4F5F7] border border-[#EBEBEB] rounded-[20px] p-8 h-full transition-all duration-300 hover:shadow-lg">
                            {/* Number */}
                            <div className="flex items-start gap-6 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">{feature.number}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[#1A2A52] text-xl font-semibold mb-3">
                                        {feature.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="pl-[72px]">
                                <p className="text-[#3A3A3C] text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Subtle accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#1FD2AF] to-transparent opacity-30"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs; 