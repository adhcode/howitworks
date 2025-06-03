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
                    <h1 className="text-[32px] sm:text-[46px] font-semibold text-[#2E2E2E] leading-tight text-left mb-4">
                        Find Your Dream Home<br />
                        with Trusted Realtors
                    </h1>
                    <p className="text-[#666666] text-[14px] max-w-[342px] mb-8 text-left">
                        Browse premium properties and connect with expert realtors who care about helping you settle in the perfect place
                    </p>
                    <Link
                        href="/properties"
                        className="inline-block w-full bg-[#703BF7] text-white px-8 py-3 rounded-[8px] font-medium hover:bg-[#5f32d3] transition-all"
                    >
                        Browse Properties
                    </Link>

                    {/* Stats - Mobile */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-12 lg:hidden">
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

                    {/* Feature Cards - Mobile */}
                    <div className="grid grid-cols-2 gap-4 mt-12">
                        <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                            </div>


                            <div className='flex flex-col space-y-4 items-center justify-center'>
                                <Image
                                    src="/icons/iconcontainer1.svg"
                                    alt="Find Home"
                                    width={60}
                                    height={60}
                                    quality={90}
                                />


                                <h3 className="text-[#2E2E2E] font-medium text-base">Find Your Dream Home</h3>
                            </div>

                        </div>

                        <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                            </div>


                            <div className='flex flex-col space-y-4 items-center justify-center'>
                                <Image
                                    src="/icons/iconcontainer2.svg"
                                    alt="Find Home"
                                    width={60}
                                    height={60}
                                    quality={90}
                                />


                                <h3 className="text-[#2E2E2E] font-medium text-base">Unlock Property Value</h3>
                            </div>

                        </div>

                        <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                            </div>


                            <div className='flex flex-col space-y-4 items-center justify-center'>
                                <Image
                                    src="/icons/iconcontainer3.svg"
                                    alt="Find Home"
                                    width={60}
                                    height={60}
                                    quality={90}
                                />


                                <h3 className="text-[#2E2E2E] font-medium text-base">Effortless Property Management</h3>
                            </div>

                        </div>

                        <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                            </div>


                            <div className='flex flex-col space-y-4 items-center justify-center'>
                                <Image
                                    src="/icons/iconcontainer4.svg"
                                    alt="Find Home"
                                    width={60}
                                    height={60}
                                    quality={90}
                                />


                                <h3 className="text-[#2E2E2E] font-medium text-base">Smart Investments, Informed Decisions</h3>
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
                        <h1 className="text-[48px] font-semibold text-[#2E2E2E] leading-tight mb-4">
                            Find Your Dream Home<br />
                            with Trusted Realtors
                        </h1>
                        <p className="text-[#666666] text-lg mb-8 max-w-[520px]">
                            Browse premium properties and connect with expert realtors who care about helping you settle in the perfect place
                        </p>
                        <Link
                            href="/properties"
                            className="inline-block bg-[#703BF7] text-white px-8 py-3 rounded-[8px] font-medium hover:bg-[#5f32d3] transition-all"
                        >
                            Browse Properties
                        </Link>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
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
            <div className="hidden lg:block w-screen bg-[#FAFAFA] py-2 border-b border-t border-[#EBEBEB]">
                <div className="grid grid-cols-4 gap-[30px] max-w-[1500px] mx-auto px-4">
                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>

                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer1.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#2E2E2E] font-medium text-base">Find Your Dream Home</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>

                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer2.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#2E2E2E] font-medium text-base">Unlock Property Value</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>

                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer3.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#2E2E2E] font-medium text-base">Effortless Property Management</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>

                        <div className='flex flex-col space-y-4 items-center justify-center'>
                            <Image
                                src="/icons/iconcontainer4.svg"
                                alt="Find Home"
                                width={60}
                                height={60}
                                quality={90}
                            />

                            <h3 className="text-[#2E2E2E] font-medium text-base">Smart Investments, Informed Decisions</h3>
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
                    background: linear-gradient(40.65deg, #A685FA 0.85%, rgba(166, 133, 250, 0) 34.8%),
                        linear-gradient(219.04deg, #A685FA -6.93%, rgba(166, 133, 250, 0) 52.6%);
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
