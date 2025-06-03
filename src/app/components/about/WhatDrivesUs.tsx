const WhatDrivesUs = () => {
    return (
        <section className="mb-20">
            <h2 className="text-[32px] font-semibold text-[#2E2E2E] mb-12">
                What Drives Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission */}
                <div className="flex flex-col h-[170px] md:h-[188px] border border-[#EBEBEB] rounded-[20px] p-6 shadow-[0px_0px_0px_6px_#191919]">
                    <h3 className="text-[#2E2E2E] text-[16px] md:text-[24px] font-semibold mb-4">
                        Our Mission
                    </h3>
                    <p className="text-[#666666] text-[14px] md:text-[16px]">
                        To provide the most reliable and seamless real estate experience by connecting clients with verified realtors, ensuring transparency and trust at every step of the journey.
                    </p>
                </div>

                {/* Vision */}
                <div className="flex flex-col h-[170px] md:h-[188px] border border-[#EBEBEB] rounded-[20px] p-6 shadow-[0px_0px_0px_6px_#191919]">
                    <h3 className="text-[#2E2E2E] text-[16px] md:text-[24px] font-semibold mb-4">
                        Our Vision
                    </h3>
                    <p className="text-[#666666] text-[14px] md:text-[16px]">
                        To become Nigeria's most trusted real estate platform, where every property search begins and ends with complete satisfaction and confidence.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhatDrivesUs; 