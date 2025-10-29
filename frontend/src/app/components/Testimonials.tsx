"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TestimonialCard from './TestimonialCard';

const TESTIMONIALS = [
    {
        rating: 5,
        title: 'Exceptional Service!',
        content: 'Our experience with Howitwork was outstanding. Their team\'s dedication and professionalism made finding our dream home a breeze. Highly recommended!',
        author: {
            name: 'Tade Sholayemi',
            location: 'Nigeria, Lagos',
            image: 'https://ui-avatars.com/api/?name=Tade+Sholayemi&background=703BF7&color=fff'
        }
    },
    {
        rating: 5,
        title: 'Efficient and Reliable',
        content: 'Howitwork provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn\'t be happier with the results.',
        author: {
            name: 'Emelie Thomson',
            location: 'USA, Florida',
            image: 'https://ui-avatars.com/api/?name=Emelie+Thomson&background=703BF7&color=fff'
        }
    },
    {
        rating: 5,
        title: 'Trusted Advisors',
        content: 'The Howitwork team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!',
        author: {
            name: 'John Mans',
            location: 'USA, Nevada',
            image: 'https://ui-avatars.com/api/?name=John+Mans&background=703BF7&color=fff'
        }
    }
];

const Testimonials = () => {
    const [displayedTestimonials, setDisplayedTestimonials] = useState(TESTIMONIALS);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDisplayedTestimonials([TESTIMONIALS[currentIndex]]);
            } else {
                setDisplayedTestimonials(TESTIMONIALS);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 sm:py-20 px-4 lg:px-16 bg-[#F4F5F7]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A2A52] mb-3 sm:mb-4">What Our Clients Say</h2>
                        <p className="text-[#3A3A3C] text-base sm:text-lg max-w-[520px] leading-relaxed">
                            Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose How It Works for their real estate needs.
                        </p>
                    </div>
                    <Link
                        href="/testimonials"
                        className="text-[#1A2A52] hidden lg:block font-semibold hover:text-[#1FD2AF] transition-all text-lg border-2 border-[#1A2A52] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white self-start"
                    >
                        View All Testimonials
                    </Link>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayedTestimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            {...testimonial}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 sm:mt-12 gap-4">
                    <Link
                        href="/testimonials"
                        className="text-[#1A2A52] lg:hidden font-semibold hover:text-[#1FD2AF] transition-all text-lg border-2 border-[#1A2A52] bg-transparent rounded-lg px-6 py-3 hover:bg-[#1A2A52] hover:text-white w-full sm:w-auto text-center"
                    >
                        View All Testimonials
                    </Link>

                    <div className="flex gap-2 items-center">
                        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#1A2A52] flex items-center justify-center hover:bg-[#1A2A52] hover:text-white transition-all text-[#1A2A52]">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm sm:text-lg text-[#1A2A52] font-semibold">01 of 60</p></div>
                        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#1A2A52] flex items-center justify-center hover:bg-[#1A2A52] hover:text-white transition-all text-[#1A2A52]">
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

export default Testimonials; 