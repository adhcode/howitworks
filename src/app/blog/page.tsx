import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Sample blog data
const blogPosts = [
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
    },
    {
        id: 4,
        title: "Investment Properties: What You Need to Know",
        excerpt: "A comprehensive guide to real estate investment, covering everything from financing to property management.",
        author: "David Rodriguez",
        date: "Nov 8, 2024",
        readTime: "12 min read",
        image: "/house/house5.png",
        category: "Investment"
    },
    {
        id: 5,
        title: "Understanding Mortgage Options in Today's Market",
        excerpt: "Compare different mortgage types and find the best financing option for your real estate purchase.",
        author: "Lisa Thompson",
        date: "Nov 5, 2024",
        readTime: "7 min read",
        image: "/house/house7.png",
        category: "Financing"
    },
    {
        id: 6,
        title: "The Future of Smart Homes and Real Estate",
        excerpt: "Explore how smart home technology is changing the real estate landscape and property values.",
        author: "James Park",
        date: "Nov 2, 2024",
        readTime: "9 min read",
        image: "/house/house8.png",
        category: "Technology"
    }
];

const categories = ["All", "Buying Guide", "Selling Tips", "Market Analysis", "Investment", "Financing", "Technology"];

export default function Blog() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#1A2A52] to-[#1FD2AF] py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 lg:px-16 text-center">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                        Real Estate Insights & Tips
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                        Stay informed with the latest trends, expert advice, and valuable insights
                        from the world of real estate.
                    </p>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 lg:px-16">
                    {/* Categories Filter */}
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === "All"
                                    ? "bg-[#1FD2AF] text-white"
                                    : "bg-[#F4F5F7] text-[#3A3A3C] hover:bg-[#1FD2AF] hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    <div className="mb-16">
                        <div className="bg-[#F4F5F7] rounded-2xl shadow-lg overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="relative h-64 lg:h-full">
                                    <Image
                                        src={blogPosts[0].image}
                                        alt={blogPosts[0].title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#FFB300] text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Featured
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 lg:p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-4 text-sm text-[#3A3A3C]">
                                        <span className="bg-white text-[#3A3A3C] px-3 py-1 rounded-full text-xs font-medium">
                                            {blogPosts[0].category}
                                        </span>
                                        <span>{blogPosts[0].date}</span>
                                        <span>{blogPosts[0].readTime}</span>
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-[#1A2A52] mb-4">
                                        {blogPosts[0].title}
                                    </h2>
                                    <p className="text-[#3A3A3C] mb-6 line-clamp-3">
                                        {blogPosts[0].excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">
                                                    {blogPosts[0].author.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <span className="text-[#1A2A52] font-medium">{blogPosts[0].author}</span>
                                        </div>
                                        <Link
                                            href={`/blog/${blogPosts[0].id}`}
                                            className="bg-[#1FD2AF] text-white px-6 py-2 rounded-full hover:bg-[#1AB89A] transition-colors"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.slice(1).map((post) => (
                            <article key={post.id} className="bg-[#F4F5F7] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative h-48">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white bg-opacity-90 text-[#3A3A3C] px-3 py-1 rounded-full text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-3 text-sm text-[#3A3A3C]">
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1A2A52] mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#3A3A3C] mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-[#1FD2AF] rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-xs">
                                                    {post.author.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <span className="text-[#1A2A52] text-sm">{post.author}</span>
                                        </div>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="text-[#1FD2AF] hover:text-[#1AB89A] font-medium text-sm"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="bg-[#1FD2AF] text-white px-8 py-3 rounded-full hover:bg-[#1AB89A] transition-colors">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
}