'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiTrendingUp, FiHome, FiDollarSign, FiBarChart, FiCheckCircle } from 'react-icons/fi';

export default function UnlockValuePage() {
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
                                Unlock Your Property's True Value
                            </h1>

                            <p className="text-xl text-[#3A3A3C] mb-8 leading-relaxed">
                                Transform your property investment with our comprehensive value enhancement services.
                                From strategic renovations to market positioning, we maximize your returns.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors text-center"
                                >
                                    Get Free Consultation
                                </Link>
                                <Link
                                    href="/services/property-management"
                                    className="border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-colors text-center"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/house/house2.png"
                                alt="Property Value Enhancement"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                        <FiTrendingUp className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Average Value Increase</p>
                                        <p className="text-2xl font-bold text-[#1A2A52]">25%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Value Enhancement Services
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            Comprehensive solutions to maximize your property's market value and rental potential
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiHome className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Strategic Renovations</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Expert guidance on renovations that provide the highest return on investment, from kitchen upgrades to curb appeal improvements.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiBarChart className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Market Analysis</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Comprehensive market research to identify opportunities and position your property for maximum value appreciation.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiDollarSign className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Rental Optimization</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Maximize rental income through strategic pricing, tenant screening, and property management optimization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Benefits of Value Enhancement
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            Transform your property investment with proven strategies
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-[#1A2A52] mb-6">For Property Owners</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Increased property value and equity</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Higher rental income potential</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Reduced time on market when selling</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Better tenant quality and retention</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-[#1A2A52] mb-6">For Investors</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Improved cash flow and ROI</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Enhanced portfolio diversification</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Tax optimization strategies</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Professional property management</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Our Value Enhancement Process
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            A systematic approach to unlocking your property's full potential
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Assessment</h3>
                            <p className="text-[#3A3A3C]">
                                Comprehensive property evaluation and market analysis to identify value opportunities.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Strategy</h3>
                            <p className="text-[#3A3A3C]">
                                Develop customized value enhancement strategies based on your goals and budget.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Implementation</h3>
                            <p className="text-[#3A3A3C]">
                                Execute improvements with trusted contractors and professional oversight.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Optimization</h3>
                            <p className="text-[#3A3A3C]">
                                Monitor performance and continuously optimize for maximum returns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1A2A52]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Unlock Your Property's Value?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Get a free consultation and discover how much value we can add to your property investment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors"
                        >
                            Free Consultation
                        </Link>
                        <Link
                            href="/services/property-management"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A2A52] transition-colors"
                        >
                            Learn About Management
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
} 