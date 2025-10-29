'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiTool, FiShield, FiClock, FiUsers, FiSmartphone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MaintenanceSection = () => {
    return (
        <section className="py-20 bg-white">
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
                            Property Maintenance & Management
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2A52] mb-6 leading-tight">
                            Keep Your Property in Perfect Condition
                        </h2>
                        <p className="text-lg text-[#3A3A3C] mb-6 leading-relaxed">
                            Our proactive maintenance managers ensure your property stays in excellent condition,
                            preventing costly repairs and maintaining its value over time.
                        </p>

                        {/* Emphasized App-Based Solution */}
                        <div className="bg-gradient-to-r from-[#1FD2AF]/5 to-[#703BF7]/5 border-l-4 border-[#1FD2AF] p-4 mb-8 rounded-r-lg">
                            <p className="text-[#1A2A52] font-semibold mb-2 flex items-center">
                                <FiSmartphone className="mr-2 text-[#1FD2AF]" />
                                Rent Collection & Issue Resolution
                            </p>
                            <p className="text-[#3A3A3C] text-sm leading-relaxed">
                                Our dedicated app helps landlords collect rent seamlessly while resolving maintenance 
                                and tenant issues efficiently. We bridge communication gaps for smooth property operations.
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiTool className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1A2A52] mb-1">Regular Inspections</h3>
                                    <p className="text-[#3A3A3C]">Scheduled property checks to catch issues before they become problems</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiClock className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1A2A52] mb-1">24/7 Emergency Response</h3>
                                    <p className="text-[#3A3A3C]">Round-the-clock support for urgent maintenance needs</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiSmartphone className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1A2A52] mb-1">Mobile App Management</h3>
                                    <p className="text-[#3A3A3C]">Streamlined maintenance requests and communication through our dedicated app</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-[#1FD2AF]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                    <FiShield className="text-[#1FD2AF] text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1A2A52] mb-1">Certified Professionals</h3>
                                    <p className="text-[#3A3A3C]">Trusted experts handling all your property maintenance needs</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/services/property-management"
                                className="inline-block bg-[#1FD2AF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all text-center"
                            >
                                Learn More
                            </Link>
                            <Link
                                href="/app-download"
                                className="inline-block border-2 border-[#1FD2AF] text-[#1FD2AF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1FD2AF] hover:text-white transition-all text-center"
                            >
                                Download Our App
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
                                src="/home-maintance.jpg"
                                alt="Professional mediation service between landlord and tenant with mobile app interface"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                    <FiCheckCircle className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Properties Maintained</p>
                                    <p className="text-2xl font-bold text-[#1A2A52]">500+</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MaintenanceSection;
