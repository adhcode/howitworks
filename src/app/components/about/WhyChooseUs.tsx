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
            <h2 className="text-[32px] font-semibold text-[#2E2E2E] mb-12">
                Why Choose Us
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-6">
                {FEATURES.map((feature, index) => (
                    <div key={index} className="relative pt-8">
                        {/* Card */}
                        <div className="relative h-[180px] md:h-[204px]">
                            {/* Left Border with Number */}
                            <div className="absolute left-0 -top-12 w-[1px] h-[calc(100%+48px)]">
                                {/* Border */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(180deg, #703BF7 0%, #703BF7 20%, rgba(235, 235, 235, 0.5) 90%, transparent 100%)'
                                    }}
                                />
                                {/* Number */}
                                <span className="absolute top-[12px] left-4 text-[16px] text-[#2E2E2E] font-medium">
                                    {feature.number}
                                </span>
                            </div>

                            {/* Top Border */}
                            <div
                                className="absolute top-0 left-0 w-full h-[1px]"
                                style={{
                                    background: 'linear-gradient(90deg, #703BF7 0%, #703BF7 20%, rgba(235, 235, 235, 0.5) 90%, transparent 100%)'
                                }}
                            />

                            {/* Content */}
                            <div
                                className="flex flex-col h-full p-4 md:p-6 border-r border-b border-[#EBEBEB] rounded-tr-lg rounded-br-lg rounded-bl-lg"
                                style={{
                                    background: `
                                        linear-gradient(120.79deg, #703BF7 -49.01%, rgba(112, 59, 247, 0) 13.65%),
                                        linear-gradient(to right, white, white)
                                    `
                                }}
                            >
                                <h3 className="text-[16px] md:text-[20px] font-semibold text-[#2E2E2E] min-h-[40px] md:min-h-[56px] line-clamp-2 mb-2 md:mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-[14px] md:text-[16px] text-[#666666] min-h-[40px] md:min-h-[48px] line-clamp-2">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs; 