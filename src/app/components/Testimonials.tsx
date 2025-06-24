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
            image: 'https://ui-avatars.com/api/?name=Tade+Sholayemi&background=1FD2AF&color=fff'
        }
    },
    {
        rating: 5,
        title: 'Efficient and Reliable',
        content: 'Howitwork provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn\'t be happier with the results.',
        author: {
            name: 'Emelie Thomson',
            location: 'USA, Florida',
            image: 'https://ui-avatars.com/api/?name=Emelie+Thomson&background=1FD2AF&color=fff'
        }
    },
    {
        rating: 5,
        title: 'Trusted Advisors',
        content: 'The Howitwork team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!',
        author: {
            name: 'John Mans',
            location: 'USA, Nevada',
            image: 'https://ui-avatars.com/api/?name=John+Mans&background=1FD2AF&color=fff'
        }
    }
];

const Testimonials = () => {
    const [displayedTestimonials, setDisplayedTestimonials] = useState(TESTIMONIALS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
            const mobile = windowWidth < 768;
            setIsMobile(mobile);

            if (mobile) {
                setDisplayedTestimonials([TESTIMONIALS[currentIndex]]);
            } else {
                setDisplayedTestimonials(TESTIMONIALS);
            }
        };

        handleResize();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 px-4 lg:px-16" id="testimonials">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[24px] md:text-[38px] font-semibold text-[#1A2A52] mb-2">What Our Clients Say</h2>
                        <p className="text-[#3A3A3C] text-base max-w-[520px]">
                            Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Howitworks for their real estate needs.
                        </p>
                    </div>
                    <Link
                        href="/testimonials"
                        className="text-[#1FD2AF] md:block hidden font-medium hover:text-[#1AB89A] transition-all"
                    >
                        View All Testimonials
                    </Link>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedTestimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            {...testimonial}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8">
                    <Link
                        href="/testimonials"
                        className="text-[#3A3A3C] md:hidden font-medium hover:text-[#1FD2AF] transition-all text-[14px] border border-[#EBEBEB] bg-[#F4F5F7] rounded-[8px] px-4 py-2"
                    >
                        View All Testimonials
                    </Link>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrevious}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all disabled:opacity-50"
                            disabled={false}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm text-[#3A3A3C]">
                                {String(currentIndex + 1).padStart(2, '0')} of {String(TESTIMONIALS.length).padStart(2, '0')}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all disabled:opacity-50"
                            disabled={false}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 