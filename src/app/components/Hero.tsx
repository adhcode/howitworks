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
                <div className="text-center px-4 mt-22">
                    <h1 className="text-[32px] sm:text-[46px] text-[#1A2A52] font-semibold leading-tight text-left mb-4">
                        How It Works: Dream it.
                        <br />
                        Find it. Live it.
                    </h1>
                    <p className="text-[#3A3A3C] text-[14px] max-w-[342px] mb-8 text-left">
                        Our Expert Realtors match you with your ideal home while our Proactive Maintenance Managers ensures it stays in excellent condition.                 </p>
                    <Link
                        href="/properties"
                        className="inline-block w-full bg-[#1FD2AF] text-white px-8 py-3 rounded-[8px] font-medium hover:bg-[#1AB89A] transition-all"
                    >
                        Browse Properties
                    </Link>

                    {/* Stats - Mobile */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-12 lg:hidden">
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

                    {/* Feature Cards - Mobile */}
                    <div className="grid grid-cols-2 gap-4 mt-12">
                        <div className="bg-[#F4F5F7] p-4 sm:p-6 rounded-[10px] border border-[#EBEBEB] transition-all h-[140px] sm:h-[160px] flex flex-col items-center justify-center">
                            <div className='flex flex-col space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer1.svg"
                                    alt="Find Home"
                                    width={50}
                                    height={50}
                                    quality={90}
                                    className="sm:w-[60px] sm:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-medium text-sm sm:text-base leading-tight">Find Your Dream Home</h3>
                            </div>
                        </div>

                        <div className="bg-[#F4F5F7] p-4 sm:p-6 rounded-[10px] border border-[#EBEBEB] transition-all h-[140px] sm:h-[160px] flex flex-col items-center justify-center">
                            <div className='flex flex-col space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer2.svg"
                                    alt="Unlock Value"
                                    width={50}
                                    height={50}
                                    quality={90}
                                    className="sm:w-[60px] sm:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-medium text-sm sm:text-base leading-tight">Unlock Property Value</h3>
                            </div>
                        </div>

                        <div className="bg-[#F4F5F7] p-4 sm:p-6 rounded-[10px] border border-[#EBEBEB] transition-all h-[140px] sm:h-[160px] flex flex-col items-center justify-center">
                            <div className='flex flex-col space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer3.svg"
                                    alt="Property Management"
                                    width={50}
                                    height={50}
                                    quality={90}
                                    className="sm:w-[60px] sm:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-medium text-sm sm:text-base leading-tight">Property Maintanance and Management</h3>
                            </div>
                        </div>

                        <div className="bg-[#F4F5F7] p-4 sm:p-6 rounded-[10px] border border-[#EBEBEB] transition-all h-[140px] sm:h-[160px] flex flex-col items-center justify-center">
                            <div className='flex flex-col space-y-3 items-center justify-center text-center'>
                                <Image
                                    src="/icons/iconcontainer4.svg"
                                    alt="Smart Investments"
                                    width={50}
                                    height={50}
                                    quality={90}
                                    className="sm:w-[60px] sm:h-[60px]"
                                />
                                <h3 className="text-[#1A2A52] font-medium text-sm sm:text-base leading-tight">Smart Investments, Informed Decisions</h3>
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
                        <h1 className="text-[32px] sm:text-[46px] text-[#1A2A52] font-semibold leading-tight text-left mb-4">
                            How It Works: Dream it.
                            <br />
                            Find it. Live it.
                        </h1>
                        <p className="text-[#3A3A3C] text-lg mb-8 max-w-[520px]">
                            Our Expert Realtors match you with your ideal home while our Proactive Maintenance Managers ensures it stays in excellent condition.                         </p>
                        <Link
                            href="/properties"
                            className="inline-block bg-[#1FD2AF] text-white px-8 py-3 rounded-[8px] font-medium hover:bg-[#1AB89A] transition-all"
                        >
                            Browse Properties
                        </Link>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
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
            <div className="hidden lg:block w-screen bg-[#F4F5F7] py-2 border-b border-t border-[#EBEBEB]">
                <div className="grid grid-cols-4 gap-[30px] max-w-[1500px] mx-auto px-4">
                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer1.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#1A2A52] font-medium text-base">Find Your Dream Home</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer2.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#1A2A52] font-medium text-base">Unlock Property Value</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className='flex flex-col space-y-4 items-center justify-center text-center'>
                            <Image
                                src="/icons/iconcontainer3.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#1A2A52] font-medium text-base">Property Maintanance and Management</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer4.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#1A2A52] font-medium text-base">Smart Investments, Informed Decisions</h3>
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
