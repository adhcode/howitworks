import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog data
const blogPosts = [
    {
        id: 1,
        title: "5 Essential Tips for First-Time Home Buyers",
        excerpt: "Navigate the real estate market with confidence using these expert tips that will help you make informed decisions about your first home purchase.",
        author: "Sarah Johnson",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        image: "/house/house1.png",
        category: "Buying Guide"
    },
    {
        id: 2,
        title: "Real Estate Market Trends in 2024",
        excerpt: "Discover the latest trends shaping the real estate market and what they mean for buyers and sellers in the current economic climate.",
        author: "Michael Chen",
        date: "Nov 12, 2024",
        readTime: "8 min read",
        image: "/house/house2.png",
        category: "Market Analysis"
    },
    {
        id: 3,
        title: "How to Stage Your Home for a Quick Sale",
        excerpt: "Professional staging tips that can help you sell your home faster and for a better price in today's competitive market.",
        author: "Emma Wilson",
        date: "Nov 10, 2024",
        readTime: "6 min read",
        image: "/house/house4.png",
        category: "Selling Tips"
    },
    {
        id: 4,
        title: "Investment Properties: What You Need to Know",
        excerpt: "A comprehensive guide to real estate investment, covering everything from financing to property management and ROI calculations.",
        author: "David Rodriguez",
        date: "Nov 8, 2024",
        readTime: "12 min read",
        image: "/house/house5.png",
        category: "Investment"
    },
    {
        id: 5,
        title: "Understanding Mortgage Options in Today's Market",
        excerpt: "Compare different mortgage types and find the best financing option for your real estate purchase with our detailed guide.",
        author: "Lisa Thompson",
        date: "Nov 5, 2024",
        readTime: "7 min read",
        image: "/house/house7.png",
        category: "Financing"
    },
    {
        id: 6,
        title: "The Future of Smart Homes and Real Estate",
        excerpt: "Explore how smart home technology is changing the real estate landscape and property values across the market.",
        author: "James Park",
        date: "Nov 2, 2024",
        readTime: "9 min read",
        image: "/house/house8.png",
        category: "Technology"
    }
];

export default function Blog() {
    // Featured post is the first one
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    return (
        <main>
                {/* Hero Section with heading - matching properties page */}
                <div className="bg-[#F4F5F7] pb-24">
                    <div className="container mx-auto px-4 md:px-0 pt-12">
                        <section className="mb-12">
                            <h1 className="text-[32px] font-semibold text-[#1A2A52] mb-4">
                                Real Estate Insights & Tips
                            </h1>
                            <p className="text-[#3A3A3C]">
                                Stay informed with the latest trends, expert advice, and valuable insights from the world of real estate. Browse our curated collection of articles to help you make better property decisions.
                            </p>
                        </section>
                    </div>
                </div>

                {/* White background content */}
                <div className="bg-white">
                    <div className="container mx-auto px-4 md:px-0">
                        
                        {/* Featured Article - positioned to overlap like PropertySearch */}
                        <div className="-mt-14 mb-16">
                            <div className="bg-white overflow-hidden">
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2">
                                    {/* Image */}
                                    <div className="relative h-64 lg:h-auto min-h-[400px]">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute rounded-8 top-6 left-6">
                                            <span className="bg-[#703BF7] text-white px-4 py-2 rounded-md text-sm font-medium">
                                                Featured Article
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 lg:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[#1A2A52] text-sm font-medium px-3 py-1 rounded-md bg-[#F4F5F7]">
                                                {featuredPost.category}
                                            </span>
                                            <span className="text-[#3A3A3C] text-sm">{featuredPost.date}</span>
                                        </div>
                                        
                                        <h2 className="text-[24px] lg:text-[28px] font-semibold text-[#1A2A52] mb-4 leading-tight">
                                            {featuredPost.title}
                                        </h2>
                                        
                                        <p className="text-[#3A3A3C] text-base mb-6 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-[#EBEBEB]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#703BF7] rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-[#1A2A52] font-medium text-sm">{featuredPost.author}</div>
                                                    <div className="text-[#3A3A3C] text-xs">{featuredPost.readTime}</div>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/blog/${featuredPost.id}`}
                                                className="bg-[#703BF7] text-white px-5 py-2.5 rounded-md hover:bg-[#5F32D6] transition-colors font-medium text-sm"
                                            >
                                                Read Article
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* More Articles Section */}
                        <section className="mt-16">
                            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A2A52] mb-4">
                                Discover More Insights
                            </h2>
                            <p className="text-[#3A3A3C] text-[14px] md:text-[16px] mb-8">
                                Explore our collection of articles covering various aspects of real estate, from buying and selling to market trends and investment strategies.
                            </p>
                            
                            {/* Blog Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherPosts.map((post) => (
                                    <article 
                                        key={post.id} 
                                        className="bg-[#F4F5F7] rounded-[12px] overflow-hidden border border-[#EBEBEB] hover:border-[#703BF7] transition-all group"
                                    >
                                        {/* Image */}
                                        <div className="relative h-52 overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#1A2A52] px-3 py-1 rounded-md text-xs font-medium">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3 text-sm text-[#3A3A3C]">
                                                <span>{post.date}</span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                            
                                            <h3 className="text-[18px] font-semibold text-[#1A2A52] mb-3 line-clamp-2 leading-snug">
                                                {post.title}
                                            </h3>
                                            
                                            <p className="text-[#3A3A3C] text-[14px] mb-4 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-[#EBEBEB]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-[#703BF7] rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold text-xs">
                                                            {post.author.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <span className="text-[#1A2A52] text-sm font-medium">{post.author}</span>
                                                </div>
                                                <Link
                                                    href={`/blog/${post.id}`}
                                                    className="text-[#703BF7] hover:text-[#5F32D6] font-medium text-sm transition-colors flex items-center gap-1"
                                                >
                                                    Read
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </main>
    );
}