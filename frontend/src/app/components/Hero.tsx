'use client'

import Image from 'next/image';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";

const Hero = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Mobile Hero */}
            <div className="lg:hidden">
                <div className="relative w-full h-[400px] mb-8">
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
                <div className="text-center px-4 mt-16 sm:mt-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#1A2A52] font-extrabold leading-tight text-left mb-4 sm:mb-6">
                        How Real Estate Works.
                    </h1>
                    <p className="text-[#000000] text-lg md:text-xl max-w-[342px] mb-6 sm:mb-8 text-left leading-relaxed">
                        Your all-in-one platform for buying, renting, investing, selling, and professional property management.
                        <br />
                        We make real estate simple, transparent and rewarding - delivering expert service and simplified property solutions for homeowners, tenants and investors.
                    </p>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <Link
                            href="/properties"
                            className="inline-block w-full bg-[#1FD2AF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all text-base sm:text-lg"
                        >
                            Explore Properties
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-block w-full border-2 border-[#1FD2AF] text-[#1FD2AF] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-all text-base sm:text-lg"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Stats - Mobile */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 lg:hidden">
                        <div className="w-full h-[80px] sm:h-[96px] bg-[#f4f5f7] border border-[#1FD2AF] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold text-[#1A2A52]">500+</div>
                            <div className="text-[10px] sm:text-[10px] md:text-xs text-[#000000] leading-tight">Properties Maintained</div>
                        </div>
                        <div className="w-full h-[80px] sm:h-[96px] bg-[#f4f5f7] border border-[#1FD2AF] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold text-[#1A2A52]">₦2B+</div>
                            <div className="text-[10px] sm:text-[10px] md:text-xs text-[#000000] leading-tight">Investment Value</div>
                        </div>
                        <div className="w-full h-[80px] sm:h-[96px] bg-[#f4f5f7] border border-[#1FD2AF] rounded-[10px] flex flex-col items-start p-2 sm:p-4 md:px-5 py-3.5 gap-0.5">
                            <div className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold text-[#1A2A52]">98%</div>
                            <div className="text-[10px] sm:text-[10px] md:text-xs text-[#000000] leading-tight">Client Satisfaction</div>
                        </div>
                    </div>

                    {/* Feature Cards - Mobile */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12 mb-8 sm:mb-12">
                        <Link href="/services/find-home" className="bg-[#ffffff] p-3 sm:p-4 md:p-6 rounded-[10px] border border-[#1FD2AF] transition-all h-[120px] sm:h-[140px] md:h-[160px] flex flex-col items-center justify-center relative group hover:bg-[#0F1A3A] hover:shadow-lg">
                            <GoArrowUpRight className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity w-4 h-4 sm:w-5 sm:h-5" />
                            <div className='flex flex-col space-y-2 sm:space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer1.svg"
                                    alt="Find Home"
                                    width={40}
                                    height={40}
                                    quality={90}
                                    className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-semibold text-xs sm:text-sm md:text-base leading-tight">Find Your Dream Home</h3>
                            </div>
                        </Link>

                        <Link href="/services/unlock-value" className="bg-[#ffffff] p-3 sm:p-4 md:p-6 rounded-[10px] border border-[#1FD2AF] transition-all h-[120px] sm:h-[140px] md:h-[160px] flex flex-col items-center justify-center relative group hover:bg-[#0F1A3A] hover:shadow-lg">
                            <GoArrowUpRight className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity w-4 h-4 sm:w-5 sm:h-5" />
                            <div className='flex flex-col space-y-2 sm:space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer2.svg"
                                    alt="Unlock Value"
                                    width={40}
                                    height={40}
                                    quality={90}
                                    className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-semibold text-xs sm:text-sm md:text-base leading-tight">Unlock Property Value</h3>
                            </div>
                        </Link>

                        <Link href="/services/property-management" className="bg-[#ffffff] p-3 sm:p-4 md:p-6 rounded-[10px] border border-[#1FD2AF] transition-all h-[120px] sm:h-[140px] md:h-[160px] flex flex-col items-center justify-center relative group hover:bg-[#0F1A3A] hover:shadow-lg">
                            <GoArrowUpRight className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity w-4 h-4 sm:w-5 sm:h-5" />
                            <div className='flex flex-col space-y-2 sm:space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer3.svg"
                                    alt="Property Management"
                                    width={40}
                                    height={40}
                                    quality={90}
                                    className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-semibold text-xs sm:text-sm md:text-base leading-tight">Property Maintanance and Management</h3>
                            </div>
                        </Link>

                        <Link href="/services/smart-investments" className="bg-[#ffffff] p-3 sm:p-4 md:p-6 rounded-[10px] border border-[#1FD2AF] transition-all h-[120px] sm:h-[140px] md:h-[160px] flex flex-col items-center justify-center relative group hover:bg-[#0F1A3A] hover:shadow-lg">
                            <GoArrowUpRight className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity w-4 h-4 sm:w-5 sm:h-5" />
                            <div className='flex flex-col space-y-2 sm:space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer4.svg"
                                    alt="Smart Investments"
                                    width={40}
                                    height={40}
                                    quality={90}
                                    className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-semibold text-xs sm:text-sm md:text-base leading-tight">Smart Investments, Informed Decisions</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop Hero */}
            <div className=" hidden lg:block w-full mx-auto">
                <div className="grid lg:grid-cols-2 items-center relative">
                    {/* Left Content */}
                    <div className="relative z-10 px-20">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#1A2A52] font-bold leading-tight text-left mb-6">
                            How Real Estate Works.
                        </h1>
                        <p className="text-[#000000] text-xl mb-8 max-w-[520px] leading-relaxed">
                            Your all-in-one platform for buying, renting, investing, selling, and professional property management.
                        <br />
                        We make real estate simple, transparent and rewarding - delivering expert service and simplified property solutions for homeowners, tenants and investors.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/properties"
                                className="inline-block bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all text-lg text-center"
                            >
                                Explore Properties
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-block border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-all text-lg text-center"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            <div className="bg-[#f4f5f7] border border-[#1FD2AF]  max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                                <div className="text-2xl font-bold text-[#1A2A52]">500+</div>
                                <div className="text-sm text-[#000000]">Properties Maintained</div>
                            </div>
                            <div className="bg-[#f4f5f7] border border-[#1FD2AF]  max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                                <div className="text-2xl font-bold text-[#1A2A52]">₦2B+</div>
                                <div className="text-sm text-[#000000]">Investment Value</div>
                            </div>
                            <div className="bg-[#f4f5f7] border border-[#1FD2AF]  max-w-[192.68px] rounded-[10px] flex flex-col items-start py-[14px] px-[20px] gap-0.5">
                                <div className="text-2xl font-bold text-[#1A2A52]">98%</div>
                                <div className="text-sm text-[#000000]">Client Satisfaction</div>
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
                <div className="grid grid-cols-4 gap-[30px] max-w-[1500px] mx-auto px-4">
                    <Link href="/services/find-home" className="bg-white p-6 rounded-[10px] border border-[#1FD2AF] transition-all relative group hover:shadow-lg hover:border-[#1FD2AF]">
                        <GoArrowUpRight className="absolute top-4 right-4 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer1.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />
                            <h3 className="text-[#1A2A52] font-semibold text-lg">Find Your Dream Home</h3>
                        </div>
                    </Link>

                    <Link href="/services/unlock-value" className="bg-white p-6 rounded-[10px] border border-[#1FD2AF] transition-all relative group hover:shadow-lg hover:border-[#1FD2AF]">
                        <GoArrowUpRight className="absolute top-4 right-4 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer2.svg"
                                alt="Unlock Value"
                                width={60}
                                height={60}
                                quality={90}
                            />
                            <h3 className="text-[#1A2A52] font-semibold text-lg">Unlock Property Value</h3>
                        </div>
                    </Link>

                    <Link href="/services/property-management" className="bg-white p-6 rounded-[10px] border border-[#1FD2AF] transition-all relative group hover:shadow-lg hover:border-[#1FD2AF]">
                        <GoArrowUpRight className="absolute top-4 right-4 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className='flex flex-col space-y-4 items-center justify-center text-center'>
                            <Image
                                src="/icons/iconcontainer3.svg"
                                alt="Property Management"
                                width={60}
                                height={60}
                                quality={90}
                            />
                            <h3 className="text-[#1A2A52] font-semibold text-lg">Property Maintanance and Management</h3>
                        </div>
                    </Link>

                    <Link href="/services/smart-investments" className="bg-white p-6 rounded-[10px] border border-[#1FD2AF] transition-all relative group hover:shadow-lg hover:border-[#1FD2AF]">
                        <GoArrowUpRight className="absolute top-4 right-4 text-[#1A2A52] opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer4.svg"
                                alt="Smart Investments"
                                width={60}
                                height={60}
                                quality={90}
                            />
                            <h3 className="text-[#1A2A52] font-semibold text-lg">Smart Investments, Informed Decisions</h3>
                        </div>
                    </Link>
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
                    background: linear-gradient(40.65deg, #1FD2AF 0.85%, rgba(31, 210, 175, 0) 34.8%),
                        linear-gradient(219.04deg, #1FD2AF -6.93%, rgba(31, 210, 175, 0) 52.6%);
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
