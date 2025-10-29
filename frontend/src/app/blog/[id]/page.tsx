'use client'

import React from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Sample blog data - using object structure with proper typing
const blogPosts = {
    1: {
        id: 1,
        title: "5 Essential Tips for First-Time Home Buyers",
        content: `
            <p>Buying your first home is one of the most significant financial decisions you'll ever make. The process can feel overwhelming, but with the right knowledge and preparation, you can navigate the real estate market with confidence.</p>
            
            <h2>1. Get Pre-Approved for a Mortgage</h2>
            <p>Before you start house hunting, get pre-approved for a mortgage. This process involves a lender reviewing your financial information to determine how much they're willing to lend you. Pre-approval gives you a clear budget and shows sellers that you're a serious buyer.</p>
            
            <h2>2. Research the Neighborhood</h2>
            <p>The location of your home is just as important as the property itself. Research crime rates, school districts, commute times, and future development plans. Visit the neighborhood at different times of day and week to get a feel for the area.</p>
            
            <h2>3. Factor in All Costs</h2>
            <p>The purchase price is just the beginning. Consider closing costs, moving expenses, property taxes, homeowner's insurance, HOA fees, and potential repairs or improvements. Budget for at least 2-3% of the home's value in closing costs.</p>
            
            <h2>4. Get a Professional Home Inspection</h2>
            <p>Never skip the home inspection. A qualified inspector can identify potential issues that could cost you thousands down the road. Use the inspection report to negotiate repairs or a lower price.</p>
            
            <h2>5. Don't Rush the Decision</h2>
            <p>Take your time to find the right home. Don't let emotions drive your decision, and be prepared to walk away if something doesn't feel right. The perfect home for you is out there.</p>
            
            <p>Remember, buying a home is a marathon, not a sprint. With patience, preparation, and the right team of professionals, you'll find the perfect place to call home.</p>
        `,
        author: "Sarah Johnson",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        image: "/house/house1.png",
        category: "Buying Guide"
    }
} as const;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function BlogPost({ params }: PageProps) {
    const resolvedParams = use(params);
    const idString: string = resolvedParams.id;
    const postId = parseInt(idString, 10) as keyof typeof blogPosts;
    const post = blogPosts[postId];

    if (!post) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="max-w-4xl mx-auto px-4 lg:px-16 py-16 text-center">
                    <h1 className="text-2xl font-bold text-[#1A2A52] mb-4">Post Not Found</h1>
                    <Link href="/blog" className="text-[#1FD2AF] hover:text-[#1AB89A]">
                        ← Back to Blog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-96 lg:h-[500px]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 lg:px-16 pb-12 w-full">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-6"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                        <div className="mb-4">
                            <span className="bg-[#FFB300] text-white px-3 py-1 rounded-full text-sm font-medium">
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-200">
                            <div className="flex items-center gap-2">
                                <FiUser className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 lg:px-16">
                    <div className="prose prose-lg max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            className="text-[#3A3A3C] leading-relaxed [&>h2]:text-[#1A2A52] [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-6"
                        />
                    </div>

                    {/* Author Info */}
                    <div className="mt-16 p-6 bg-[#F4F5F7] rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {post.author.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#1A2A52]">{post.author}</h3>
                                <p className="text-[#3A3A3C]">Real Estate Expert & Content Writer</p>
                            </div>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="mt-12 text-center">
                        <h3 className="text-lg font-semibold text-[#1A2A52] mb-4">Share this article</h3>
                        <div className="flex items-center justify-center gap-4">
                            <button className="bg-[#1FD2AF] text-white px-4 py-2 rounded-lg hover:bg-[#1AB89A] transition-colors">
                                Share on Facebook
                            </button>
                            <button className="bg-[#1FD2AF] text-white px-4 py-2 rounded-lg hover:bg-[#1AB89A] transition-colors">
                                Share on Twitter
                            </button>
                            <button className="bg-[#1A2A52] text-white px-4 py-2 rounded-lg hover:bg-[#1A2A52]/90 transition-colors">
                                Share on LinkedIn
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            <section className="py-16 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 lg:px-16">
                    <h2 className="text-3xl font-bold text-center text-[#1A2A52] mb-12">
                        Related Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[2, 3, 4].map((id) => (
                            <Link
                                key={id}
                                href={`/blog/${id}`}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={`/house/house${id}.png`}
                                        alt="Related post"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#1A2A52] mb-2">
                                        Related Article Title {id}
                                    </h3>
                                    <p className="text-[#3A3A3C] text-sm">
                                        Brief description of the related article content...
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}