import Image from 'next/image';

const STATS = [
    {
        number: "200+",
        label: "Happy Customers"
    },
    {
        number: "1,500+",
        label: "Properties Listed"
    },
    {
        number: "2K+",
        label: "Trusted Realtors"
    }
];

const OurJourney = () => {
    return (
        <section className="mb-20">
            {/* Mobile Layout */}
            <div className="lg:hidden">
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] mb-12">
                    <Image
                        src="/about.svg"
                        alt="House model on hand"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Content Section */}
                <div>
                    <h2 className="text-[32px] font-semibold text-[#1A2A52] mb-4">
                        About Us
                    </h2>
                    <p className="text-[#3A3A3C] text-base mb-12 max-w-[520px]">
                        How It Works Global Limited is a dynamic and forward-thinking company specializing in real estate development, construction, and property maintenance and management. With a strong commitment to quality, integrity, and client satisfaction, we deliver comprehensive solutions that meet the evolving needs of property owners, investors, and communities.
                    </p>
                    <p className="text-[#3A3A3C] text-base mb-12 max-w-[520px]">
                        With a team of experienced engineers, architects, project managers, and skilled craftsmen, we ensure every project is completed with the highest standards of quality, safety, and efficiency.
                    </p>

                    {/* Mobile Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="w-full h-[96px] bg-[#F4F5F7] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A2A52]">200+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-[#3A3A3C]">Happy Customers</div>
                        </div>
                        <div className="w-full h-[96px] bg-[#F4F5F7] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A2A52]">1,500+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-[#3A3A3C]">Properties For Clients</div>
                        </div>
                        <div className="w-full h-[96px] bg-[#F4F5F7] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A2A52]">2K+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-[#3A3A3C]">Trusted Realtors</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex gap-8 mt-12">
                {/* Content Section */}
                <div className="flex-1">
                    <h2 className="text-[32px] mt-6 font-semibold text-[#1A2A52] mb-4">
                        About Us
                    </h2>
                    <p className="text-[#3A3A3C] text-base mb-6 max-w-[520px]">
                        How It Works Global Limited is a dynamic and forward-thinking company specializing in real estate development, construction, and property maintenance and management. With a strong commitment to quality, integrity, and client satisfaction, we deliver comprehensive solutions that meet the evolving needs of property owners, investors, and communities.
                    </p>
                    <p className="text-[#3A3A3C] text-base mb-12 max-w-[520px]">
                        With a team of experienced engineers, architects, project managers, and skilled craftsmen, we ensure every project is completed with the highest standards of quality, safety, and efficiency.
                    </p>

                    {/* Desktop Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#F4F5F7] border border-[#EBEBEB] max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                            <div className="text-2xl font-bold text-[#1A2A52]">200+</div>
                            <div className="text-sm text-[#3A3A3C]">Happy Customers</div>
                        </div>
                        <div className="bg-[#F4F5F7] border border-[#EBEBEB] max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                            <div className="text-2xl font-bold text-[#1A2A52]">1,500+</div>
                            <div className="text-sm text-[#3A3A3C]">Properties For Clients</div>
                        </div>
                        <div className="bg-[#F4F5F7] border border-[#EBEBEB] max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                            <div className="text-2xl font-bold text-[#1A2A52]">2K+</div>
                            <div className="text-sm text-[#3A3A3C]">Trusted Realtors</div>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative w-1/2 aspect-[16/9]">
                    <Image
                        src="/about.svg"
                        alt="House model on hand"
                        fill
                        className=""
                    />
                </div>
            </div>
        </section>
    );
};

export default OurJourney; 