'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiTrendingUp, FiBarChart, FiDollarSign, FiShield, FiCheckCircle, FiHome, FiSettings, FiUsers } from 'react-icons/fi';

export default function SmartInvestmentsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#F4F5F7] to-white py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Link
                                href="/"
                                className="inline-flex items-center text-[#1FD2AF] hover:text-[#1AB89A] mb-6 transition-colors"
                            >
                                <FiArrowLeft className="mr-2" />
                                Back to Home
                            </Link>

                            <h1 className="text-4xl lg:text-6xl font-bold text-[#1A2A52] mb-6 leading-tight">
                                Invest in Building Maintenance, Earn Steady Returns
                            </h1>

                            <p className="text-xl text-[#3A3A3C] mb-8 leading-relaxed">
                                What if your money could grow by simply keeping properties in good shape?
                                Our smart investment model lets you fund professional building maintenance
                                and earn guaranteed returns from multiple revenue streams.
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

                        <div className="relative">
                            <Image
                                src="/investment.png"
                                alt="Building Maintenance Investment"
                                width={600}
                                height={20}
                                className="rounded-2xl shadow-2xl"
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
                    </div>
                </div>
            </section>

            {/* Investment Model Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Our Smart Investment Model
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            Fund professional building maintenance and earn returns from multiple revenue streams
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#F4F5F7] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FiDollarSign className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Rental Income</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Earn steady returns from rental income generated by well-maintained properties that attract high-paying tenants.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FiSettings className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Service Fees</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Generate additional income from maintenance services provided to property owners and tenants.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FiHome className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Property Value Preservation</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Maintain and increase property values through proactive maintenance and care.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FiTrendingUp className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Capital Appreciation</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Benefit from long-term property value growth in well-maintained real estate markets.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why It Works Section */}
            <section className="py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                                Why This Investment Works
                            </h2>
                            <p className="text-xl text-[#3A3A3C] mb-8 leading-relaxed">
                                Well-maintained properties retain value, attract high-paying tenants, and reduce costly repairs.
                                Our platform lets you invest in this process while we handle all the operations.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">Prevention Over Repair</h3>
                                        <p className="text-[#3A3A3C]">Proactive maintenance prevents expensive repairs and extends property lifespan.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">High-Quality Tenants</h3>
                                        <p className="text-[#3A3A3C]">Well-maintained properties attract reliable, long-term tenants willing to pay premium rents.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0 text-xl" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">Market Growth</h3>
                                        <p className="text-[#3A3A3C]">Be part of a growing market that values quality maintenance and sustainable property management.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-[#1A2A52] mb-6">Investment Benefits</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <FiShield className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Fully secured investments</span>
                                </li>
                                <li className="flex items-start">
                                    <FiShield className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Legally backed contracts</span>
                                </li>
                                <li className="flex items-start">
                                    <FiBarChart className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Transparent financial reports</span>
                                </li>
                                <li className="flex items-start">
                                    <FiTrendingUp className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Steady monthly returns</span>
                                </li>
                                <li className="flex items-start">
                                    <FiUsers className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Professional management team</span>
                                </li>
                                <li className="flex items-start">
                                    <FiHome className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Diversified property portfolio</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Investment Process */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            How to Get Started
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            Simple steps to start earning from building maintenance investments
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Contact Us</h3>
                            <p className="text-[#3A3A3C]">
                                Reach out to learn more about our investment opportunities and get personalized guidance.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Choose Investment</h3>
                            <p className="text-[#3A3A3C]">
                                Select from our curated portfolio of maintenance investment opportunities.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Invest & Monitor</h3>
                            <p className="text-[#3A3A3C]">
                                Make your investment and track returns through our transparent reporting system.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Earn Returns</h3>
                            <p className="text-[#3A3A3C]">
                                Receive steady returns from rental income, service fees, and property appreciation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1A2A52]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Invest in Building Maintenance?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Be part of a growing market that values prevention over repair — and profit over loss.
                        Start earning steady returns from professional property maintenance today.
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
                        <p className="text-[#1FD2AF] text-lg">Building Wealth through Maintenance</p>
                    </div>
                </div>
            </section>
        </div>
    );
} 