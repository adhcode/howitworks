'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FiTrendingUp, FiRefreshCw, FiAward, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PropertyUpgradeSection = () => {
    return (
        <section className="py-20 bg-[#F4F5F7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block bg-[#1FD2AF]/10 text-[#1FD2AF] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Property Upgrade & Value Unlocking
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2A52] mb-6 leading-tight">
                            Turn Your Property into a Profitable Asset
                        </h2>
                        <p className="text-lg text-[#3A3A3C] mb-6 leading-relaxed">
                            <strong>Don't let your land or building sit idle — let it start paying you!</strong>
                        </p>
                        <p className="text-lg text-[#3A3A3C] mb-8 leading-relaxed">
                            We help you unlock your property's hidden value through upgrades, remodeling, or shared ownership 
                            models that generate steady cash flow and appreciation. With our smart valuation tools and expert 
                            property consultants, your real estate can start working for you, not the other way around.
                        </p>

                        <div className="bg-white p-6 rounded-xl mb-8">
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-4">How We Make Your Property Profitable</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FiTrendingUp className="text-[#1FD2AF] mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Smart valuation tools to identify profit potential</p>
                                </div>
                                <div className="flex items-center">
                                    <FiRefreshCw className="text-[#1FD2AF] mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Strategic upgrades and remodeling for maximum ROI</p>
                                </div>
                                <div className="flex items-center">
                                    <FiZap className="text-[#1FD2AF] mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Shared ownership models for steady cash flow</p>
                                </div>
                                <div className="flex items-center">
                                    <FiAward className="text-[#1FD2AF] mr-3 flex-shrink-0" />
                                    <p className="text-[#3A3A3C]">Expert property consultants guiding every step</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/services/unlock-value"
                            className="inline-block bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all"
                        >
                            Start Earning From Your Property
                        </Link>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8">
                            <Image
                                src="/value.png"
                                alt="Property transformation showing increased value and profitability"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white p-4 rounded-xl text-center"
                            >
                                <FiTrendingUp className="text-[#1FD2AF] text-2xl mx-auto mb-2" />
                                <p className="text-2xl font-bold text-[#1A2A52]">25%</p>
                                <p className="text-xs text-[#3A3A3C]">Annual Returns</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="bg-white p-4 rounded-xl text-center"
                            >
                                <FiRefreshCw className="text-[#1FD2AF] text-2xl mx-auto mb-2" />
                                <p className="text-2xl font-bold text-[#1A2A52]">200+</p>
                                <p className="text-xs text-[#3A3A3C]">Properties Activated</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="bg-white p-4 rounded-xl text-center"
                            >
                                <FiAward className="text-[#1FD2AF] text-2xl mx-auto mb-2" />
                                <p className="text-2xl font-bold text-[#1A2A52]">98%</p>
                                <p className="text-xs text-[#3A3A3C]">Satisfaction</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PropertyUpgradeSection;
