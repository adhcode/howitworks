'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiTrendingUp, FiShield, FiCheckCircle, FiHome, FiUsers } from 'react-icons/fi';

export default function SmartInvestmentsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#F4F5F7] to-white py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Mobile Back Link */}
                    <div className="lg:hidden mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-[#1FD2AF] hover:text-[#1AB89A] transition-colors"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Home
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image Section - First on mobile, second on desktop */}
                        <div className="relative order-1 lg:order-2">
                            <Image
                                src="/investment.png"
                                alt="Building Maintenance Investment"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-2xl w-full"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                        <FiTrendingUp className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Guaranteed Returns</p>
                                        <p className="text-2xl font-bold text-[#1A2A52]">15-25%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Section - Second on mobile, first on desktop */}
                        <div className="order-2 lg:order-1">
                            {/* Desktop Back Link */}
                            <div className="hidden lg:block">
                                <Link
                                    href="/"
                                    className="inline-flex items-center text-[#1FD2AF] hover:text-[#1AB89A] mb-6 transition-colors"
                                >
                                    <FiArrowLeft className="mr-2" />
                                    Back to Home
                                </Link>
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-bold text-[#1A2A52] mb-6 leading-tight">
                                Why Let Your Building or Land Just Sit Idle?
                            </h1>

                            <p className="text-xl text-[#3A3A3C] mb-8 leading-relaxed">
                                Your property has hidden potential and wealth — let's unlock it together and make it work for you.
                                Through our Real-Time Share Ownership Model, you can now own, earn, and invest in real estate 
                                without carrying the full financial or management burden alone.
                            </p>

                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl mb-8 space-y-3">
                                <p className="text-[#3A3A3C] flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    Generate steady income through shared property ownership
                                </p>
                                <p className="text-[#3A3A3C] flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    Co-invest with trusted members and access verified real estate projects
                                </p>
                                <p className="text-[#3A3A3C] flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    Resell your shares anytime and benefit from property appreciation
                                </p>
                                <p className="text-[#3A3A3C] flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    Enjoy professional maintenance and management services
                                </p>
                                <p className="text-[#3A3A3C] flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    Stay protected with insurance coverage and liability management
                                </p>
                                <p className="text-[#3A3A3C] flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    Support community development while building long-term wealth
                                </p>
                            </div>

                            <p className="text-lg text-[#1A2A52] font-semibold mb-8">
                                Start today and discover how we turn property potential into profit — becoming part of the new digital real estate movement.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/investment-form"
                                    className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors text-center"
                                >
                                    Start Investing
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-colors text-center"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Introduction to Our Fractional Property Ownership Model
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-4xl mx-auto leading-relaxed">
                            Our Fractional Property Ownership model makes real estate ownership simpler, safer, and more inclusive 
                            for everyone — whether you are a diaspora investor, landlord, tenant, or cooperative member.
                        </p>
                        <p className="text-lg text-[#3A3A3C] max-w-4xl mx-auto mt-4 leading-relaxed">
                            Through shared investment and cooperative structures, you can now own, earn, and invest in real estate 
                            without carrying the full financial burden alone. With the aid of mortgage and cooperative housing support, 
                            property ownership becomes achievable for all income levels.
                        </p>
                    </div>

                    {/* Smart Living Banner */}
                    <div className="bg-gradient-to-r from-[#1FD2AF] to-[#1AB89A] p-8 rounded-2xl text-white text-center mb-16">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                            Smart Living for Landlords & Tenants — Everyone Wins
                        </h3>
                        <p className="text-lg mb-6">
                            Why should property ownership be a struggle when both landlords and tenants can benefit together?
                        </p>
                        <p className="text-lg font-semibold mb-6">
                            Together, We Build a Stronger Housing Future
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
                            <span>✓ Transparent cooperative system</span>
                            <span>✓ Verified landlords and trusted tenants</span>
                            <span>✓ Shared ownership, shared success</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* For Tenants Section */}
            <section className="py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiUsers className="text-white text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#1A2A52] mb-6">
                                For Tenants
                            </h2>
                            <p className="text-lg text-[#3A3A3C] mb-6 leading-relaxed">
                                Your rent can now do more than just pay for space — it can build your path to ownership.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Pay rent with purpose — every payment builds credit toward ownership</p>
                                </div>
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Join your cooperative's welfare or rent-to-own program</p>
                                </div>
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Access flexible mortgage and housing support through cooperative partnerships</p>
                                </div>
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Transition from tenant to co-owner through structured fractional shares</p>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-[#F4F5F7] rounded-lg border-l-4 border-[#1FD2AF]">
                                <p className="text-[#1A2A52] font-semibold italic">
                                    "Stop renting forever — start owning one piece at a time."
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiHome className="text-white text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#1A2A52] mb-6">
                                For Landlords
                            </h2>
                            <p className="text-lg text-[#3A3A3C] mb-6 leading-relaxed">
                                As a landlord, your property can now generate consistent value and sustainable income through 
                                shared investment and cooperative management.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Access renovation and maintenance loans through cooperative or mortgage programs</p>
                                </div>
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">List your property for fractional investment to attract verified co-owners or tenants</p>
                                </div>
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Earn steady rental income while your property appreciates</p>
                                </div>
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Partner with cooperatives for guaranteed rent and efficient management</p>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-[#F4F5F7] rounded-lg border-l-4 border-[#1FD2AF]">
                                <p className="text-[#1A2A52] font-semibold italic">
                                    "Your property can work harder — even when you don't."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* For Diaspora Investors Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            For Diaspora Investors — Own from Anywhere
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto mb-4">
                            Tired of sending money home with no results?
                        </p>
                        <p className="text-lg text-[#3A3A3C] max-w-4xl mx-auto leading-relaxed">
                            Now you can legally co-own verified real property back home — safely, transparently, and profitably.
                            With our Fractional Ownership Platform, you maintain full visibility and control over your investment, 
                            supported by secure mortgage-backed structures and trusted cooperative groups.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#1A2A52] to-[#2A3A62] p-10 rounded-2xl text-white">
                        <h3 className="text-2xl font-bold mb-8 text-center">Why Diaspora Investors Love It</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start">
                                <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                <div>
                                    <p className="font-semibold mb-1">100% Transparent</p>
                                    <p className="text-gray-300 text-sm">Verified projects, audited funds, and secure payment channels</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                <div>
                                    <p className="font-semibold mb-1">No middlemen drama</p>
                                    <p className="text-gray-300 text-sm">Ownership is legally documented and traceable</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                <div>
                                    <p className="font-semibold mb-1">Diversify your income</p>
                                    <p className="text-gray-300 text-sm">With trusted local partnerships</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                <div>
                                    <p className="font-semibold mb-1">Build lasting wealth</p>
                                    <p className="text-gray-300 text-sm">Where your heart belongs</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-lg mb-4">
                                Whether you live in the UK, USA, Canada, Australia, or the Middle East, 
                                your money can now work smartly and securely at home.
                            </p>
                            <p className="text-xl font-bold text-[#1FD2AF]">
                                Invest Smart. Own from Abroad. Earn for Life.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            Simple steps to start your fractional property ownership journey
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiUsers className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Join the Network</h3>
                            <p className="text-[#3A3A3C]">
                                Sign up and become part of our cooperative property network with verified members.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiHome className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Choose Property</h3>
                            <p className="text-[#3A3A3C]">
                                Browse verified real estate projects and select fractional shares that match your budget.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiShield className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Secure Investment</h3>
                            <p className="text-[#3A3A3C]">
                                Complete legal documentation with insurance coverage and liability protection included.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiTrendingUp className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Earn & Grow</h3>
                            <p className="text-[#3A3A3C]">
                                Receive steady income, benefit from appreciation, and resell shares anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Cooperative Network CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-[#1A2A52] to-[#2A3A62] p-12 rounded-3xl text-white text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Join the Cooperative Property Network Today
                        </h2>
                        <p className="text-xl mb-4 leading-relaxed">
                            Take part in a housing model built for inclusivity, transparency, and long-term wealth.
                        </p>
                        <p className="text-lg mb-8 text-gray-300">
                            Through Fractional Ownership and Mortgage Support, we are building a future where everyone 
                            can own a piece of real estate — one share at a time.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold mb-10">
                            <span className="bg-white/10 px-6 py-2 rounded-full">Invest Together</span>
                            <span className="bg-white/10 px-6 py-2 rounded-full">Live Better</span>
                            <span className="bg-white/10 px-6 py-2 rounded-full">Own Smarter</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/investment-form"
                                className="bg-[#1FD2AF] text-white px-10 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors text-lg"
                            >
                                Join Us Now
                            </Link>
                            <Link
                                href="/contact"
                                className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A2A52] transition-colors text-lg"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-[#1A2A52]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Unlock Your Property Value?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Start today and discover how we turn property potential into profit — 
                        becoming part of the new digital real estate movement.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/investment-form"
                            className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors"
                        >
                            Get Started Today
                        </Link>
                        <Link
                            href="/investor/dashboard"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A2A52] transition-colors"
                        >
                            Investor Dashboard
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-300 text-lg font-semibold mb-2">How It Works Global Limited</p>
                        <p className="text-[#1FD2AF] text-lg">Building Wealth Through Shared Property Ownership</p>
                    </div>
                </div>
            </section>
        </div>
    );
} 