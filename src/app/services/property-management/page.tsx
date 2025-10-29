'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiSettings, FiHome, FiShield, FiUsers, FiCheckCircle, FiMail, FiMessageCircle, FiFileText, FiSmartphone, FiDownload } from 'react-icons/fi';
import { FaWrench, FaBuilding, FaGooglePlay, FaApple } from 'react-icons/fa';

export default function PropertyManagementPage() {
    return (
        <div className="min-h-screen bg-white" suppressHydrationWarning>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#F4F5F7] to-white py-12 sm:py-16 lg:py-20 xl:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Back to Home Link - Mobile Only */}
                        <div className="lg:hidden order-1">
                            <Link
                                href="/"
                                className="inline-flex items-center text-[#1FD2AF] hover:text-[#1AB89A] mb-4 transition-colors text-sm"
                            >
                                <FiArrowLeft className="mr-2" />
                                Back to Home
                            </Link>
                        </div>

                        <div className="order-2 lg:order-1">
                            {/* Back to Home Link - Desktop Only */}
                            <Link
                                href="/"
                                className="hidden lg:inline-flex items-center text-[#1FD2AF] hover:text-[#1AB89A] mb-6 transition-colors text-base"
                            >
                                <FiArrowLeft className="mr-2" />
                                Back to Home
                            </Link>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A2A52] mb-4 sm:mb-6 leading-tight">
                                Property Maintenance & Management
                            </h1>

                            <p className="text-lg sm:text-xl text-[#3A3A3C] mb-6 sm:mb-8 leading-relaxed">
                                How It Works Global Limited offers a comprehensive suite of property maintenance and management services designed to resolve
                                long-standing issues between landlords and tenants using a smart, user-friendly mobile application.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <a
                                    href="#download"
                                    className="bg-[#1FD2AF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors text-center inline-flex items-center justify-center text-sm sm:text-base"
                                >
                                    <FiDownload className="mr-2" />
                                    Download App
                                </a>
                                <Link
                                    href="/contact"
                                    className="border-2 border-[#1FD2AF] text-[#1FD2AF] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-colors text-center text-sm sm:text-base"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <Image
                                src="/house/house3.png"
                                alt="How It Works App"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-2xl w-full h-auto"
                                priority
                            />
                            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                        <FiSmartphone className="text-white text-lg sm:text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">App Downloads</p>
                                        <p className="text-lg sm:text-2xl font-bold text-[#1A2A52]">10K+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Features Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-4 sm:mb-6">
                            App Features
                        </h2>
                        <p className="text-lg sm:text-xl text-[#3A3A3C] max-w-3xl mx-auto px-4">
                            Everything you need for seamless property management in one mobile app
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Smart Home Management */}
                        <div className="bg-[#F4F5F7] p-6 sm:p-8 rounded-xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <FiMail className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Smart Home Management</h3>
                            <ul className="text-[#3A3A3C] space-y-2 text-sm">
                                <li>• Automated rent collection and reminders</li>
                                <li>• Real-time rent tracking for landlords</li>
                                <li>• Secure digital payment processing</li>
                                <li>• Rent receipts and payment history for tenants</li>
                            </ul>
                        </div>

                        {/* Property Maintenance & Repairs */}
                        <div className="bg-[#F4F5F7] p-6 sm:p-8 rounded-xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <FaWrench className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Property Maintenance & Repairs</h3>
                            <ul className="text-[#3A3A3C] space-y-2 text-sm">
                                <li>• On-demand maintenance system via the app</li>
                                <li>• Verified service providers and technicians for repairs</li>
                                <li>• Scheduled inspection and routine upkeep</li>
                                <li>• Real-time status updates for both tenants and landlords</li>
                            </ul>
                        </div>

                        {/* Tenant-Landlord Communication Hub */}
                        <div className="bg-[#F4F5F7] p-6 sm:p-8 rounded-xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <FiMessageCircle className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Communication Hub</h3>
                            <ul className="text-[#3A3A3C] space-y-2 text-sm">
                                <li>• In-app messaging and notifications</li>
                                <li>• Dispute resolution tools and documentation logs</li>
                                <li>• Lease agreements and renewal management</li>
                                <li>• Move-in/move-out checklists and digital records</li>
                            </ul>
                        </div>

                        {/* Facility & Estate Management */}
                        <div className="bg-[#F4F5F7] p-6 sm:p-8 rounded-xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <FaBuilding className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Facility & Estate Management</h3>
                            <ul className="text-[#3A3A3C] space-y-2 text-sm">
                                <li>• Management of shared facilities and estate services</li>
                                <li>• Centralized complaint and issue reporting</li>
                                <li>• Budget tracking for facility expenses and service charges</li>
                                <li>• Security, water, and power management</li>
                            </ul>
                        </div>

                        {/* Digital Documentation & Reporting */}
                        <div className="bg-[#F4F5F7] p-6 sm:p-8 rounded-xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <FiFileText className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Digital Documentation</h3>
                            <ul className="text-[#3A3A3C] space-y-2 text-sm">
                                <li>• Secure storage of tenancy agreements and invoices</li>
                                <li>• Dashboard access to real-time property data and analytics</li>
                                <li>• Landlord performance and property ROI tracking</li>
                                <li>• Service reports and maintenance history</li>
                            </ul>
                        </div>

                        {/* Mobile App Benefits */}
                        <div className="bg-[#F4F5F7] p-6 sm:p-8 rounded-xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <FiSmartphone className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Mobile-First Experience</h3>
                            <ul className="text-[#3A3A3C] space-y-2 text-sm">
                                <li>• User-friendly interface designed for mobile</li>
                                <li>• Push notifications for important updates</li>
                                <li>• Offline capability for basic functions</li>
                                <li>• Cross-platform compatibility (iOS & Android)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-4 sm:mb-6">
                            How the App Works
                        </h2>
                        <p className="text-lg sm:text-xl text-[#3A3A3C] max-w-3xl mx-auto px-4">
                            Simple steps to get started with our property management app
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <span className="text-white text-xl sm:text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Download</h3>
                            <p className="text-[#3A3A3C] text-sm sm:text-base">
                                Download the app from App Store or Google Play Store
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <span className="text-white text-xl sm:text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Register</h3>
                            <p className="text-[#3A3A3C] text-sm sm:text-base">
                                Create your account as a landlord or tenant
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <span className="text-white text-xl sm:text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Connect</h3>
                            <p className="text-[#3A3A3C] text-sm sm:text-base">
                                Link your properties or join existing property networks
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1FD2AF] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <span className="text-white text-xl sm:text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#1A2A52] mb-3 sm:mb-4">Manage</h3>
                            <p className="text-[#3A3A3C] text-sm sm:text-base">
                                Start managing your property maintenance and communications
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-4 sm:mb-6">
                        Download the App Today
                    </h2>
                    <p className="text-lg sm:text-xl text-[#3A3A3C] mb-6 sm:mb-8 px-4">
                        Join thousands of landlords and tenants who have already streamlined their property management experience
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
                        <a href="#" className="inline-flex items-center justify-center bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-800 transition-colors">
                            <FaApple className="text-2xl sm:text-3xl mr-3 sm:mr-4" />
                            <div className="text-left">
                                <div className="text-xs sm:text-sm">Download on the</div>
                                <div className="text-sm sm:text-lg font-semibold">App Store</div>
                            </div>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-800 transition-colors">
                            <FaGooglePlay className="text-2xl sm:text-3xl mr-3 sm:mr-4" />
                            <div className="text-left">
                                <div className="text-xs sm:text-sm">Get it on</div>
                                <div className="text-sm sm:text-lg font-semibold">Google Play</div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#1A2A52]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Transform Your Property Management?
                    </h2>
                    <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 px-4">
                        Download our app and experience the future of property maintenance and management
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <a
                            href="#download"
                            className="bg-[#1FD2AF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                        >
                            <FiDownload className="mr-2" />
                            Download Now
                        </a>
                        <Link
                            href="/contact"
                            className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A2A52] transition-colors text-sm sm:text-base"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
} 