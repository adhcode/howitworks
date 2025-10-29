const WhatDrivesUs = () => {
    return (
        <section className="mb-20">
            {/* Our Services Section */}
            <div className="mb-16">
                <h2 className="text-[32px] font-semibold text-[#1A2A52] mb-8">
                    Our Services
                </h2>
                <div className="bg-[#F4F5F7] border border-[#EBEBEB] rounded-[20px] p-6 mb-8">
                    <p className="text-[#3A3A3C] text-[16px] mb-6">
                        <strong>Real Estate:</strong> We engage in the acquisition, development, and sale of residential, commercial, and mixed-use properties, offering strategic investment opportunities and housing solutions, ensuring every project add value and meets modern standards be it.
                    </p>
                    <ul className="text-[#3A3A3C] text-[16px] space-y-2 ml-4">
                        <li>• Residential Construction (Houses, Villas, Apartments)</li>
                        <li>• Commercial Buildings (Offices, Retail Spaces, Hotels)</li>
                        <li>• Renovations and Remodeling</li>
                        <li>• Interior Fit-Out Works</li>
                        <li>• Property Maintenance and Services</li>
                        <li>• Project Management and Consulting</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-[32px] font-semibold text-[#1A2A52] mb-12">
                What Drives Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission */}
                <div className="flex flex-col min-h-[170px] md:min-h-[188px] bg-[#F4F5F7] border border-[#EBEBEB] rounded-[20px] p-6 shadow-[0px_0px_0px_6px_#191919]">
                    <h3 className="text-[#1A2A52] text-[16px] md:text-[24px] font-semibold mb-4">
                        Mission Statement
                    </h3>
                    <p className="text-[#3A3A3C] text-[14px] md:text-[16px]">
                        Our mission is to go beyond building by delivering holistic property solutions that include ongoing maintenance and operational excellence, fostering a culture of care, durability, and community impact.
                    </p>
                </div>

                {/* Vision */}
                <div className="flex flex-col min-h-[170px] md:min-h-[188px] bg-[#F4F5F7] border border-[#EBEBEB] rounded-[20px] p-6 shadow-[0px_0px_0px_6px_#191919]">
                    <h3 className="text-[#1A2A52] text-[16px] md:text-[24px] font-semibold mb-4">
                        Vision Statement Building-Focused
                    </h3>
                    <p className="text-[#3A3A3C] text-[14px] md:text-[16px]">
                        To redefine the building industry by creating lasting structures and communities through a culture of quality construction, proactive maintenance, and long-term stewardship.
                    </p>
                </div>
            </div>

            {/* Property Maintenance Goal */}
            <div className="mt-8 bg-[#1FD2AF]/10 border border-[#1FD2AF]/20 rounded-[20px] p-6">
                <p className="text-[#1A2A52] text-[16px] font-medium">
                    Our goal toward property maintenance is to preserve the value of the property and ensure a comfortable and enjoyable environment for occupants.
                </p>
            </div>
        </section>
    );
};

export default WhatDrivesUs; 