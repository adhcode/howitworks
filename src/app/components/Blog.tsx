'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog data - this would typically come from an API or CMS
const BLOG_POSTS = [
    {
        id: 1,
        title: "5 Essential Tips for First-Time Home Buyers",
        excerpt: "Navigate the real estate market with confidence using these expert tips that will help you make informed decisions.",
        author: "Sarah Johnson",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        image: "/house/house1.png",
        category: "Buying Guide"
    },
    {
        id: 2,
        title: "Real Estate Market Trends in 2024",
        excerpt: "Discover the latest trends shaping the real estate market and what they mean for buyers and sellers.",
        author: "Michael Chen",
        date: "Nov 12, 2024",
        readTime: "8 min read",
        image: "/house/house2.png",
        category: "Market Analysis"
    },
    {
        id: 3,
        title: "How to Stage Your Home for a Quick Sale",
        excerpt: "Professional staging tips that can help you sell your home faster and for a better price.",
        author: "Emma Wilson",
        date: "Nov 10, 2024",
        readTime: "6 min read",
        image: "/house/house4.png",
        category: "Selling Tips"
    }
];

const Blog = () => {
    const [displayedPosts, setDisplayedPosts] = useState(BLOG_POSTS);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDisplayedPosts([BLOG_POSTS[currentIndex]]);
            } else {
                setDisplayedPosts(BLOG_POSTS);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? BLOG_POSTS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === BLOG_POSTS.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-16 px-4 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[24px] md:text-[38px] font-semibold text-[#1A2A52] mb-2">Latest Insights & Tips</h2>
                        <p className="text-[#3A3A3C] text-base max-w-[520px]">
                            Stay informed with the latest trends, expert advice, and valuable insights from the world of real estate.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="text-[#1FD2AF] md:block hidden font-medium hover:text-[#1AB89A] transition-all"
                    >
                        View All Articles
                    </Link>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedPosts.map((post, index) => (
                        <article key={post.id} className="bg-[#F4F5F7] rounded-[10px] border border-[#EBEBEB] overflow-hidden hover:shadow-lg transition-all">
                            {/* Blog Image */}
                            <div className="relative h-48">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#FFB300] text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-6">
                                {/* Meta Information */}
                                <div className="flex items-center gap-4 mb-3 text-sm text-[#3A3A3C]">
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-[#1A2A52] text-lg font-semibold mb-3 line-clamp-2 min-h-[56px]">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-[#3A3A3C] text-base mb-4 line-clamp-3 min-h-[72px]">
                                    {post.excerpt}
                                </p>

                                {/* Author and Read More */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold text-xs">
                                                {post.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <span className="text-[#3A3A3C] text-sm font-medium">{post.author}</span>
                                    </div>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="text-[#1FD2AF] hover:text-[#1AB89A] font-medium text-sm transition-all"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center justify-between mt-8">
                    <Link
                        href="/blog"
                        className="text-[#3A3A3C] md:hidden font-medium hover:text-[#1FD2AF] transition-all text-[14px] border border-[#EBEBEB] bg-[#F4F5F7] rounded-[8px] px-4 py-2"
                    >
                        View All Articles
                    </Link>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrevious}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="#3A3A3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-sm text-[#3A3A3C]">
                                {String(currentIndex + 1).padStart(2, '0')} of {String(BLOG_POSTS.length).padStart(2, '0')}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F4F5F7] transition-all"
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

export default Blog; 