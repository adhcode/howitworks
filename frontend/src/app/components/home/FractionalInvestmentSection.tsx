'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FiUsers, FiTrendingUp, FiDollarSign, FiPieChart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FractionalInvestmentSection = () => {
    return (
        <section className="py-20 bg-[#F4F5F7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative h-[500px] rounded-2xl overflow-hidden">
                            <Image
                                src="/investors.png"
                                alt="Diverse group of investors looking at property investment plans"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                    <FiTrendingUp className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Average Returns</p>
                                    <p className="text-2xl font-bold text-[#1A2A52]">15-25%</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-block bg-[#1FD2AF]/10 text-[#1FD2AF] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Fractional Property Investment
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2A52] mb-6 leading-tight">
                            Own Real Estate Without the Full Burden
                        </h2>
                        <p className="text-lg text-[#3A3A3C] mb-8 leading-relaxed">
                            Invest in verified properties through our fractional ownership model. 
                            Share the investment, share the returns, and build wealth together.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-xl">
                                <FiUsers className="text-[#1FD2AF] text-3xl mb-3" />
                                <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">Co-Invest</h3>
                                <p className="text-sm text-[#3A3A3C]">Pool resources with trusted members</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl">
                                <FiDollarSign className="text-[#1FD2AF] text-3xl mb-3" />
                                <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">Earn Income</h3>
                                <p className="text-sm text-[#3A3A3C]">Generate steady rental returns</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl">
                                <FiPieChart className="text-[#1FD2AF] text-3xl mb-3" />
                                <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">Flexible Shares</h3>
                                <p className="text-sm text-[#3A3A3C]">Buy and sell shares anytime</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl">
                                <FiTrendingUp className="text-[#1FD2AF] text-3xl mb-3" />
                                <h3 className="text-lg font-semibold text-[#1A2A52] mb-2">Appreciation</h3>
                                <p className="text-sm text-[#3A3A3C]">Benefit from property value growth</p>
                            </div>
                        </div>

                        <Link
                            href="/services/smart-investments"
                            className="inline-block bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all"
                        >
                            Start Investing
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FractionalInvestmentSection;
