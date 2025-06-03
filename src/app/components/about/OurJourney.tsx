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
                    <h2 className="text-[32px] font-semibold text-[#2E2E2E] mb-4">
                        Our Journey
                    </h2>
                    <p className="text-[#666666] text-base mb-12 max-w-[520px]">
                        We are a trusted real estate marketing company helping Nigerians discover the perfect place to call home. Through our network of verified realtors, we bring you the best listings and expert support for buying, renting, or investing in properties across Nigeria.
                    </p>

                    {/* Mobile Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="w-full h-[96px] bg-[#F5F3FF] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2E2E2E]">200+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-[#666666]">Happy Customers</div>
                        </div>
                        <div className="w-full h-[96px] bg-[#F5F3FF] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2E2E2E]">1,500+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-[#666666]">Properties For Clients</div>
                        </div>
                        <div className="w-full h-[96px] bg-[#F5F3FF] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2E2E2E]">2K+</div>
                            <div className="text-[10px] sm:text-xs md:text-sm text-[#666666]">Trusted Realtors</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex gap-8 mt-12">
                {/* Content Section */}
                <div className="flex-1">
                    <h2 className="text-[32px] mt-6 font-semibold text-[#2E2E2E] mb-4">
                        Our Journey
                    </h2>
                    <p className="text-[#666666] text-base mb-12 max-w-[520px]">
                        We are a trusted real estate marketing company helping Nigerians discover the perfect place to call home. Through our network of verified realtors, we bring you the best listings and expert support for buying, renting, or investing in properties across Nigeria.
                    </p>

                    {/* Desktop Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#F5F3FF] border border-[#EBEBEB] max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                            <div className="text-2xl font-bold text-[#2E2E2E]">200+</div>
                            <div className="text-sm text-[#666666]">Happy Customers</div>
                        </div>
                        <div className="bg-[#F5F3FF] border border-[#EBEBEB] max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                            <div className="text-2xl font-bold text-[#2E2E2E]">1,500+</div>
                            <div className="text-sm text-[#666666]">Properties For Clients</div>
                        </div>
                        <div className="bg-[#F5F3FF] border border-[#EBEBEB] max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                            <div className="text-2xl font-bold text-[#2E2E2E]">2K+</div>
                            <div className="text-sm text-[#666666]">Trusted Realtors</div>
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