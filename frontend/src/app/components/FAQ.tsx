'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

const FAQ_DATA = [
    {
        question: "How do I search for properties?",
        preview: "Learn how to use our user-friendly search tools to find properties that match your criteria."
    },
    {
        question: "What documents do I need to sell my property through us?",
        preview: "Find out about the necessary documentation for listing your property with us."
    },
    {
        question: "How can I contact an agent?",
        preview: "Discover the different ways you can get in touch with our experienced agents."
    }
];

const FAQ = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? FAQ_DATA.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === FAQ_DATA.length - 1 ? 0 : prev + 1));
    };

    // Show only current FAQ on mobile, all on desktop
    const displayedFAQs = isMobile ? [FAQ_DATA[currentIndex]] : FAQ_DATA;

    return (
        <section className="py-16 sm:py-20 px-4 lg:px-16 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E2E2E] mb-3 sm:mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#666666] text-base sm:text-lg max-w-[690px] leading-relaxed">
                            Find answers to common questions about our services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.
                        </p>
                    </div>
                    <Link
                        href="/faqs"
                        className="text-[#2E2E2E] hidden lg:block font-semibold transition-all text-lg border-2 border-[#2E2E2E] bg-transparent rounded-lg px-6 py-3 hover:bg-[#2E2E2E] hover:text-white self-start"
                    >
                        View All FAQs
                    </Link>
                </div>

                {/* FAQ Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayedFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-[10px] p-6 border bg-white border-[#E5E7EB] flex flex-col min-h-[250px] hover:shadow-lg transition-all"
                        >
                            <h3 className="text-[#2E2E2E] text-xl font-bold mb-4 line-clamp-2">
                                {faq.question}
                            </h3>
                            <p className="text-[#666666] text-base mb-6 line-clamp-3 leading-relaxed flex-grow">
                                {faq.preview}
                            </p>
                            <div className="mt-auto">
                                <Link
                                    href="/faqs"
                                    className="text-white font-semibold bg-[#1FD2AF] rounded-lg px-6 py-3 transition-all inline-flex items-center hover:bg-[#1AB89A]"
                                >
                                    View All FAQs
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-12 gap-4">
                    <Link
                        href="/faqs"
                        className="text-[#2E2E2E] lg:hidden font-semibold transition-all text-lg border-2 border-[#2E2E2E] bg-transparent rounded-lg px-6 py-3 hover:bg-[#2E2E2E] hover:text-white w-full sm:w-auto text-center"
                    >
                        View All FAQs
                    </Link>

                    <div className="flex gap-2 items-center md:hidden">
                        <button
                            onClick={handlePrevious}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#2E2E2E] flex items-center justify-center hover:bg-[#2E2E2E] hover:text-white transition-all text-[#2E2E2E]"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm sm:text-lg text-[#2E2E2E] font-semibold">
                                {String(currentIndex + 1).padStart(2, '0')} of {String(FAQ_DATA.length).padStart(2, '0')}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#2E2E2E] flex items-center justify-center hover:bg-[#2E2E2E] hover:text-white transition-all text-[#2E2E2E]"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ; 