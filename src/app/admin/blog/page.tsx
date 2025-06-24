'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "5 Essential Tips for First-Time Home Buyers",
        excerpt: "Navigate the real estate market with confidence using these expert tips...",
        author: "Sarah Johnson",
        category: "Buying Guide",
        status: "Published",
        publishDate: "Nov 15, 2024",
        views: 1250,
        image: "/house/house1.png"
    },
    {
        id: 2,
        title: "Real Estate Market Trends in 2024",
        excerpt: "Discover the latest trends shaping the real estate market...",
        author: "Michael Chen",
        category: "Market Analysis",
        status: "Published",
        publishDate: "Nov 12, 2024",
        views: 980,
        image: "/house/house2.png"
    },
    {
        id: 3,
        title: "How to Stage Your Home for a Quick Sale",
        excerpt: "Professional staging tips that can help you sell your home faster...",
        author: "Emma Wilson",
        category: "Selling Tips",
        status: "Draft",
        publishDate: "Nov 10, 2024",
        views: 0,
        image: "/house/house4.png"
    },
    {
        id: 4,
        title: "Investment Properties: What You Need to Know",
        excerpt: "A comprehensive guide to real estate investment...",
        author: "David Rodriguez",
        category: "Investment",
        status: "Published",
        publishDate: "Nov 8, 2024",
        views: 1450,
        image: "/house/house5.png"
    },
    {
        id: 5,
        title: "Understanding Mortgage Options in Today's Market",
        excerpt: "Compare different mortgage types and find the best financing option...",
        author: "Lisa Thompson",
        category: "Financing",
        status: "Published",
        publishDate: "Nov 5, 2024",
        views: 820,
        image: "/house/house7.png"
    }
];

export default function BlogManagement() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const categories = ['all', 'Buying Guide', 'Selling Tips', 'Market Analysis', 'Investment', 'Financing', 'Technology'];
    const statuses = ['all', 'Published', 'Draft'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published':
                return 'bg-green-100 text-green-800';
            case 'Draft':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-blog"
                    onLogout={() => setShowLogoutModal(true)}
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                    Manage Blog
                                </h2>
                                <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
                            </div>
                            <Link
                                href="/admin/blog/add"
                                className="flex items-center gap-2 bg-[#703BF7] text-white px-4 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors"
                            >
                                <FiPlus className="w-4 h-4" />
                                Add New Post
                            </Link>
                        </div>

                        {/* Filters */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search posts..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Category Filter */}
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>

                                {/* Status Filter */}
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>
                                            {status === 'all' ? 'All Status' : status}
                                        </option>
                                    ))}
                                </select>

                                {/* Results count */}
                                <div className="flex items-center text-sm text-gray-600">
                                    Showing {filteredPosts.length} of {blogPosts.length} posts
                                </div>
                            </div>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Post
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Author
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Views
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            width={48}
                                                            height={48}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 line-clamp-1">
                                                            {post.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500 line-clamp-1">
                                                            {post.excerpt}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {post.author}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {post.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {post.views.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {post.publishDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/blog/${post.id}`}
                                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                        title="View Post"
                                                        target="_blank"
                                                    >
                                                        <FiEye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/blog/edit/${post.id}`}
                                                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                                        title="Edit Post"
                                                    >
                                                        <FiEdit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                        title="Delete Post"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-4">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                        <div>
                                            <span className="text-gray-500">Author:</span>
                                            <span className="ml-1 text-gray-900">{post.author}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Category:</span>
                                            <span className="ml-1 text-gray-900">{post.category}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Views:</span>
                                            <span className="ml-1 text-gray-900">{post.views.toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Date:</span>
                                            <span className="ml-1 text-gray-900">{post.publishDate}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                                            {post.status}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                target="_blank"
                                            >
                                                <FiEye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/blog/edit/${post.id}`}
                                                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-lg mb-2">No blog posts found</div>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to log out of your admin account?</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}