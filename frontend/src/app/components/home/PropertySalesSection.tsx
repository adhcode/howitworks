'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FiHome, FiKey, FiSearch, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import FeaturedProperties from '../FeaturedProperties';

const PropertySalesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block bg-[#1FD2AF]/10 text-[#1FD2AF] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Property Sales, Rentals & Purchases
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2A52] mb-6 leading-tight">
                        Find Your Perfect Property
                    </h2>
                    <p className="text-lg text-[#3A3A3C] max-w-3xl mx-auto leading-relaxed">
                        Whether you're buying your first home, selling your property, or looking for the perfect rental, 
                        our expert realtors guide you through every step of your real estate journey.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold text-[#1A2A52] mb-8">
                            Complete Real Estate Services
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiHome className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#1A2A52] mb-2">Property Sales</h4>
                                    <p className="text-[#3A3A3C]">Sell your property quickly and at the best price with our expert marketing and negotiation</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiKey className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#1A2A52] mb-2">Property Rentals</h4>
                                    <p className="text-[#3A3A3C]">Find quality rental properties or rent out your property with professional management</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiSearch className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#1A2A52] mb-2">Property Purchase</h4>
                                    <p className="text-[#3A3A3C]">Discover your dream home with personalized search and expert buying guidance</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiMapPin className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#1A2A52] mb-2">Market Analysis</h4>
                                    <p className="text-[#3A3A3C]">Get detailed market insights and property valuations from local experts</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/properties"
                                className="inline-block bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all text-center"
                            >
                                Browse Properties
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-block border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-all text-center"
                            >
                                Get Free Consultation
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[500px] rounded-2xl overflow-hidden">
                            <Image
                                src="/agents.jpg"
                                alt="Real estate agents showing property to clients"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Floating Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                    <FiHome className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Properties Sold</p>
                                    <p className="text-2xl font-bold text-[#1A2A52]">1,500+</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                    <FiKey className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Happy Clients</p>
                                    <p className="text-2xl font-bold text-[#1A2A52]">2,000+</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Featured Properties Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-4">
                        </h3>
                        <p className="text-lg text-[#3A3A3C] max-w-2xl mx-auto">
                        </p>
                    </div>
                    
                    {/* Integrate FeaturedProperties component here */}
                    <FeaturedProperties />
                </motion.div>
            </div>
        </section>
    );
};

export default PropertySalesSection;