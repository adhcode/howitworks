'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FiHome, FiPercent, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MortgageSection = () => {
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
                        Mortgage Solutions
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2A52] mb-6 leading-tight">
                        Flexible Financing for Your Dream Home
                    </h2>
                    <p className="text-lg text-[#3A3A3C] max-w-3xl mx-auto leading-relaxed">
                        Access affordable mortgage options through our cooperative partnerships. 
                        We make homeownership achievable for all income levels.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiPercent className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A2A52] mb-2">Competitive Rates</h3>
                                    <p className="text-[#3A3A3C]">Get access to some of the best mortgage rates through our cooperative network</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiFileText className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A2A52] mb-2">Simple Process</h3>
                                    <p className="text-[#3A3A3C]">Streamlined application with minimal paperwork and fast approval</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiHome className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A2A52] mb-2">Flexible Terms</h3>
                                    <p className="text-[#3A3A3C]">Choose payment plans that fit your budget and financial goals</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className="inline-block bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all"
                            >
                                Apply for Mortgage
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
                        <div className="relative h-[400px] rounded-2xl overflow-hidden">
                            {/* Image placeholder - Replace with actual image */}
                            <div className="w-full h-full bg-gradient-to-br from-[#F4F5F7] to-[#E5E7EB] flex items-center justify-center">
                                <p className="text-[#1A2A52] text-center px-4">
                                    Image: Happy family receiving house keys<br/>
                                    (New homeowners, real estate agent, modern home)
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F4F5F7] p-8 rounded-2xl"
                >
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#1FD2AF] mb-2">5.5%</p>
                        <p className="text-[#3A3A3C]">Starting Interest Rate</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#1FD2AF] mb-2">30 Years</p>
                        <p className="text-[#3A3A3C]">Maximum Loan Term</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-[#1FD2AF] mb-2">10%</p>
                        <p className="text-[#3A3A3C]">Minimum Down Payment</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MortgageSection;
