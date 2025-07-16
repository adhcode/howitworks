'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiSettings, FiHome, FiShield, FiUsers, FiCheckCircle } from 'react-icons/fi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PropertyManagementPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

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
                                Property Maintenance & Management
                            </h1>

                            <p className="text-xl text-[#3A3A3C] mb-8 leading-relaxed">
                                Comprehensive property management services that keep your investment in top condition
                                while maximizing returns and minimizing stress.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors text-center"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/services/smart-investments"
                                    className="border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-colors text-center"
                                >
                                    Investment Services
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/house/house3.png"
                                alt="Property Management"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                        <FiSettings className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Properties Managed</p>
                                        <p className="text-2xl font-bold text-[#1A2A52]">500+</p>
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
                            Complete Property Management Solutions
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            From routine maintenance to tenant management, we handle everything so you don't have to
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiHome className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Maintenance & Repairs</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Regular maintenance schedules, emergency repairs, and preventive care to keep your property in excellent condition.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiUsers className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Tenant Management</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Professional tenant screening, lease management, rent collection, and conflict resolution services.
                            </p>
                        </div>

                        <div className="bg-[#F4F5F7] p-8 rounded-xl">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-6">
                                <FiShield className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Property Protection</h3>
                            <p className="text-[#3A3A3C] leading-relaxed">
                                Insurance coordination, security systems, and risk management to protect your investment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-6">
                            What We Handle For You
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            Comprehensive management services that cover every aspect of property ownership
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-[#1A2A52] mb-6">Property Care</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Regular maintenance inspections</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Emergency repair coordination</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Landscaping and exterior care</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">HVAC and system maintenance</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Cleaning and janitorial services</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-[#1A2A52] mb-6">Business Operations</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Tenant screening and placement</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Rent collection and accounting</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Lease agreement management</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Financial reporting and analysis</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheckCircle className="text-[#1FD2AF] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#3A3A3C]">Legal compliance and documentation</span>
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
                            Our Management Process
                        </h2>
                        <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
                            A systematic approach to professional property management
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Assessment</h3>
                            <p className="text-[#3A3A3C]">
                                Comprehensive property evaluation and management plan development.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Setup</h3>
                            <p className="text-[#3A3A3C]">
                                Establish management systems, contracts, and operational procedures.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Management</h3>
                            <p className="text-[#3A3A3C]">
                                Ongoing property care, tenant management, and financial oversight.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">Optimization</h3>
                            <p className="text-[#3A3A3C]">
                                Continuous improvement and performance optimization for maximum returns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1A2A52]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready for Stress-Free Property Management?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Let our professional team handle all aspects of your property while you enjoy the benefits of ownership.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors"
                        >
                            Start Managing
                        </Link>
                        <Link
                            href="/services/smart-investments"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A2A52] transition-colors"
                        >
                            Investment Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 