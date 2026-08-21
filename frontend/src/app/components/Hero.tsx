'use client'

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Mobile Hero */}
            <div className="lg:hidden">
                <div className="relative w-full h-[400px] mb-12">
                    <Image
                        src="/hero-mobile.png"
                        alt="Modern dream home"
                        fill
                        sizes="100vw"
                        quality={95}
                        priority
                        className="object-cover"
                    />
                    {/* Mobile Circular Badge */}
                    <div className="absolute left-4 bottom-[-64px]">
                        <div className="relative w-[129px] h-[129px]">
                            <Image
                                src="/icons/hero-icon.svg"
                                alt="Badge"
                                fill
                                quality={100}
                                priority
                                className="circular-badge"
                            />
                        </div>
                    </div>
                </div>
                <div className="px-4 mt-16 sm:mt-20">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2E2E2E] font-bold leading-tight mb-6">
                        Find Your Dream Home with Trusted Realtors
                    </h1>
                    <p className="text-[#666666] text-lg mb-8 max-w-[520px] leading-relaxed">
                        Browse premium properties and connect with expert realtors who care about helping you settle in the perfect place.
                    </p>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <Link
                            href="/properties"
                            className="inline-block w-full text-center bg-[#1A2A52] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#2A3A62] transition-all text-base sm:text-lg"
                        >
                            Explore Properties
                        </Link>
                    </div>

                    {/* Stats - Mobile */}
                    <div className="grid grid-cols-3 gap-4 mt-12">
                        <div className="bg-[#f8f9fa] rounded-xl flex flex-col items-center py-6 px-4">
                            <div className="text-3xl font-bold text-[#2E2E2E] mb-1">200+</div>
                            <div className="text-sm text-[#6B7280] text-center">Happy Customers</div>
                        </div>
                        <div className="bg-[#f8f9fa] rounded-xl flex flex-col items-center py-6 px-4">
                            <div className="text-3xl font-bold text-[#2E2E2E] mb-1">1,500+</div>
                            <div className="text-sm text-[#6B7280] text-center">Properties For Clients</div>
                        </div>
                        <div className="bg-[#f8f9fa] rounded-xl flex flex-col items-center py-6 px-4">
                            <div className="text-3xl font-bold text-[#2E2E2E] mb-1">2K+</div>
                            <div className="text-sm text-[#6B7280] text-center">Trusted Realtors</div>
                        </div>
                    </div>

                    {/* Feature Cards - Mobile */}
                    <div className="grid grid-cols-2 gap-4 mt-8 sm:mt-12 mb-8 sm:mb-12">
                        <div className="bg-[#ffffff] p-6 rounded-lg border border-[#E5E7EB] transition-all h-[160px] sm:h-[180px] flex flex-col relative group hover:shadow-md">
                            <svg className="absolute top-4 right-4 w-5 h-5 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                            <div className='flex flex-col items-center justify-center flex-1 text-center'>
                                <Image
                                    src="/icons/iconcontainer1.svg"
                                    alt="Find Home"
                                    width={48}
                                    height={48}
                                    quality={90}
                                    className="mb-4"
                                />
                                <h3 className="text-[#2E2E2E] font-normal text-sm leading-tight">Find Your Dream Home</h3>
                            </div>
                        </div>

                        <div className="bg-[#ffffff] p-6 rounded-lg border border-[#E5E7EB] transition-all h-[160px] sm:h-[180px] flex flex-col relative group hover:shadow-md">
                            <svg className="absolute top-4 right-4 w-5 h-5 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                            <div className='flex flex-col items-center justify-center flex-1 text-center'>
                                <Image
                                    src="/icons/iconcontainer2.svg"
                                    alt="Unlock Value"
                                    width={48}
                                    height={48}
                                    quality={90}
                                    className="mb-4"
                                />
                                <h3 className="text-[#2E2E2E] font-normal text-sm leading-tight">Unlock Property Value</h3>
                            </div>
                        </div>

                        <div className="bg-[#ffffff] p-6 rounded-lg border border-[#E5E7EB] transition-all h-[160px] sm:h-[180px] flex flex-col relative group hover:shadow-md">
                            <svg className="absolute top-4 right-4 w-5 h-5 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                            <div className='flex flex-col items-center justify-center flex-1 text-center'>
                                <Image
                                    src="/icons/iconcontainer3.svg"
                                    alt="Property Management"
                                    width={48}
                                    height={48}
                                    quality={90}
                                    className="mb-4"
                                />
                                <h3 className="text-[#2E2E2E] font-normal text-sm leading-tight">Effortless Property Management</h3>
                            </div>
                        </div>

                        <div className="bg-[#ffffff] p-6 rounded-lg border border-[#E5E7EB] transition-all h-[160px] sm:h-[180px] flex flex-col relative group hover:shadow-md">
                            <svg className="absolute top-4 right-4 w-5 h-5 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                            <div className='flex flex-col items-center justify-center flex-1 text-center'>
                                <Image
                                    src="/icons/iconcontainer4.svg"
                                    alt="Smart Investments"
                                    width={48}
                                    height={48}
                                    quality={90}
                                    className="mb-4"
                                />
                                <h3 className="text-[#2E2E2E] font-normal text-sm leading-tight">Smart Investments, Informed Decisions</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Hero */}
            <div className=" hidden lg:block w-full mx-auto">
                <div className="grid lg:grid-cols-2 items-center relative">
                    {/* Left Content */}
                    <div className="relative z-10 px-20">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2E2E2E] font-bold leading-tight mb-6">
                            Find Your Dream Home with Trusted Realtors
                        </h1>
                        <p className="text-[#666666] text-lg mb-8 max-w-[520px] leading-relaxed">
                            Browse premium properties and connect with expert realtors who care about helping you settle in the perfect place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/properties"
                                className="inline-block bg-[#1A2A52] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2A3A62] transition-all text-lg text-center"
                            >
                                Explore Properties
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            <div className="bg-[#f8f9fa] rounded-xl flex flex-col items-center py-6 px-4">
                                <div className="text-3xl font-bold text-[#2E2E2E] mb-1">200+</div>
                                <div className="text-sm text-[#6B7280]">Happy Customers</div>
                            </div>
                            <div className="bg-[#f8f9fa] rounded-xl flex flex-col items-center py-6 px-4">
                                <div className="text-3xl font-bold text-[#2E2E2E] mb-1">1,500+</div>
                                <div className="text-sm text-[#6B7280]">Properties For Clients</div>
                            </div>
                            <div className="bg-[#f8f9fa] rounded-xl flex flex-col items-center py-6 px-4">
                                <div className="text-3xl font-bold text-[#2E2E2E] mb-1">2K+</div>
                                <div className="text-sm text-[#6B7280]">Trusted Realtors</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[600px]">
                        <Image
                            src="/hero.png"
                            alt="Modern dream home"
                            fill
                            sizes="100vw"
                            quality={95}
                            priority
                            className=""
                        />
                    </div>

                    {/* Desktop Circular Badge */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="relative w-[129px] h-[129px]">
                            <Image
                                src="/icons/hero-icon.svg"
                                alt="Badge"
                                fill
                                quality={100}
                                priority
                                className="circular-badge"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards - Full Width Section */}
            <div className="hidden lg:block w-screen bg-[#F4F5F7] py-8 border-b border-t border-[#EBEBEB]">
                <div className="grid grid-cols-4 gap-6 max-w-[1500px] mx-auto px-4">
                    <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] transition-all relative group hover:shadow-md">
                        <svg className="absolute top-4 right-4 w-6 h-6 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                        <div className='flex flex-col space-y-5 items-center justify-center pt-4'>
                            <Image
                                src="/icons/iconcontainer1.svg"
                                alt="Find Home"
                                width={56}
                                height={56}
                                quality={90}
                            />
                            <h3 className="text-[#2E2E2E] font-normal text-base text-center">Find Your Dream Home</h3>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] transition-all relative group hover:shadow-md">
                        <svg className="absolute top-4 right-4 w-6 h-6 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                        <div className='flex flex-col space-y-5 items-center justify-center pt-4'>
                            <Image
                                src="/icons/iconcontainer2.svg"
                                alt="Unlock Value"
                                width={56}
                                height={56}
                                quality={90}
                            />
                            <h3 className="text-[#2E2E2E] font-normal text-base text-center">Unlock Property Value</h3>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] transition-all relative group hover:shadow-md">
                        <svg className="absolute top-4 right-4 w-6 h-6 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                        <div className='flex flex-col space-y-5 items-center justify-center pt-4'>
                            <Image
                                src="/icons/iconcontainer3.svg"
                                alt="Property Management"
                                width={56}
                                height={56}
                                quality={90}
                            />
                            <h3 className="text-[#2E2E2E] font-normal text-base text-center">Effortless Property Management</h3>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] transition-all relative group hover:shadow-md">
                        <svg className="absolute top-4 right-4 w-6 h-6 text-[#1A2A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                        <div className='flex flex-col space-y-5 items-center justify-center pt-4'>
                            <Image
                                src="/icons/iconcontainer4.svg"
                                alt="Smart Investments"
                                width={56}
                                height={56}
                                quality={90}
                            />
                            <h3 className="text-[#2E2E2E] font-normal text-base text-center">Smarter Investment Decisions</h3>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .circular-badge {
                    border: 1px solid transparent;
                    border-radius: 50%;
                    background-clip: padding-box;
                    position: relative;
                }
                
                .circular-badge::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    right: -1px;
                    bottom: -1px;
                    left: -1px;
                    border-radius: inherit;
                    border: 1px solid transparent;
                    background: linear-gradient(40.65deg, #1A2A52 0.85%, rgba(26, 42, 82, 0) 34.8%),
                        linear-gradient(219.04deg, #1A2A52 -6.93%, rgba(26, 42, 82, 0) 52.6%);
                    -webkit-mask: 
                        linear-gradient(#fff 0 0) content-box, 
                        linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                }
            `}</style>
        </section>
    );
};

export default Hero;
