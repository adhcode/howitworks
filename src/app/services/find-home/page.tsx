'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiHome, FiMapPin, FiDollarSign, FiUsers, FiCheckCircle } from 'react-icons/fi';

export default function FindHomePage() {
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
                                src="/house/house1.png"
                                alt="Dream Home"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-2xl w-full"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                        <FiHome className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Properties Available</p>
                                        <p className="text-2xl font-bold text-[#1A2A52]">1,500+</p>
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
                                Find Your Dream Home
                            </h1>

                            <p className="text-xl text-[#3A3A3C] mb-8 leading-relaxed">
                                Our expert realtors work tirelessly to match you with the perfect property.
                                From initial consultation to closing day, we're with you every step of the way.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/properties"
                                    className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors text-center"
                                >
                                    Browse Properties
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-colors text-center"
                                >
                                    Contact Realtor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Why Choose Our Home Finding Service?
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            We combine local expertise with cutting-edge technology to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiMapPin className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Local Market Expertise</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Our realtors have deep knowledge of local neighborhoods, market trends, and property values to help you make informed decisions.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiDollarSign className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Best Value Guarantee</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                We negotiate the best possible price and terms for your dream home, ensuring you get maximum value for your investment.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiUsers className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Personalized Service</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Every client gets personalized attention with dedicated realtors who understand your unique needs and preferences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            Our Home Finding Process
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            A streamlined approach to finding your perfect home
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Initial Consultation</h3>
                            <p className="text-[#3A3A3C]">
                                We meet to understand your needs, budget, and preferences for your dream home.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Property Search</h3>
                            <p className="text-[#3A3A3C]">
                                Our team searches through thousands of properties to find the perfect matches for you.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Viewing & Selection</h3>
                            <p className="text-[#3A3A3C]">
                                We arrange viewings of the best properties and help you narrow down your choices.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Closing & Move-in</h3>
                            <p className="text-[#3A3A3C]">
                                We handle all the paperwork and ensure a smooth closing process for your new home.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1A2A52]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Find Your Dream Home?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Let our expert realtors help you find the perfect property that matches your lifestyle and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/properties"
                            className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors"
                        >
                            Start Your Search
                        </Link>
                        <Link
                            href="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A2A52] transition-colors"
                        >
                            Contact Us Today
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
} 