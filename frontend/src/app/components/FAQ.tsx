'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

const FAQ_DATA = [
    {
        question: "How do I search for properties?",
        preview: "Learn how to use our user-friendly search tools to find properties that match your criteria.",
        link: "/faq/property-search"
    },
    {
        question: "What documents do I need to sell my property through us?",
        preview: "Find out about the necessary documentation for listing your property with us.",
        link: "/faq/selling-documents"
    },
    {
        question: "How can I contact an agent?",
        preview: "Discover the different ways you can get in touch with our experienced agents.",
        link: "/faq/contact-agent"
    }
];

const FAQ = () => {
    const [displayedFAQs, setDisplayedFAQs] = useState(FAQ_DATA);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDisplayedFAQs([FAQ_DATA[currentIndex]]);
            } else {
                setDisplayedFAQs(FAQ_DATA);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? FAQ_DATA.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === FAQ_DATA.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-20 px-4 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#3A3A3C] text-lg max-w-[520px] leading-relaxed">
                            Find answers to common questions about our services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.
                        </p>
                    </div>
                    <a
                        href="/faqs"
                        className="text-[#1A2A52] md:block hidden font-semibold hover:text-[#1FD2AF] transition-all text-lg border-2 border-[#1A2A52] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white"
                    >
                        View All FAQs
                    </a>
                </div>

                {/* FAQ Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-[10px] p-6 border bg-[#F4F5F7] border-[#1A2A52] flex flex-col h-[250px] hover:shadow-lg transition-all"
                        >
                            <h3 className="text-[#1A2A52] text-xl font-bold min-h-[56px] mb-8 line-clamp-2">
                                {faq.question}
                            </h3>
                            <p className="text-[#3A3A3C] text-base min-h-[72px] line-clamp-3 leading-relaxed">
                                {faq.preview}
                            </p>
                            <div className="mt-auto">
                                <a
                                    href={faq.link}
                                    className="text-[#1A2A52] font-semibold hover:text-[#1FD2AF] border-2 border-[#1A2A52] bg-transparent rounded-lg px-4 py-2 transition-all inline-flex items-center hover:bg-[#1A2A52] hover:text-white"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center justify-between mt-12 md:hidden">
                    <a
                        href="/faqs"
                        className="text-[#1A2A52] font-semibold hover:text-[#1FD2AF] transition-all text-lg border-2 border-[#1A2A52] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white"
                    >
                        View All FAQs
                    </a>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrevious}
                            className="w-12 h-12 rounded-full border-2 border-[#1A2A52] flex items-center justify-center hover:bg-[#1A2A52] hover:text-white transition-all text-[#1A2A52]"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-lg text-[#1A2A52] font-semibold">
                                {String(currentIndex + 1).padStart(2, '0')} of {String(FAQ_DATA.length).padStart(2, '0')}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border-2 border-[#1A2A52] flex items-center justify-center hover:bg-[#1A2A52] hover:text-white transition-all text-[#1A2A52]"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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