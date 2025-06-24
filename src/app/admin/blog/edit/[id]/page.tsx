'use client'

import React, { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiUpload, FiX } from 'react-icons/fi';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

// Sample blog data
const blogData = {
    1: {
        id: 1,
        title: "5 Essential Tips for First-Time Home Buyers",
        excerpt: "Navigate the real estate market with confidence using these expert tips that will help you make informed decisions.",
        content: `<p>Buying your first home is one of the most significant financial decisions you'll ever make. The process can feel overwhelming, but with the right knowledge and preparation, you can navigate the real estate market with confidence.</p>

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

<p>Remember, buying a home is a marathon, not a sprint. With patience, preparation, and the right team of professionals, you'll find the perfect place to call home.</p>`,
        category: "Buying Guide",
        status: "Published",
        author: "Sarah Johnson",
        tags: ["first-time buyers", "home buying", "real estate"],
        image: "/house/house1.png"
    }
};

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const existingPost = blogData[parseInt(resolvedParams.id) as keyof typeof blogData];

    const [formData, setFormData] = useState({
        title: existingPost?.title || '',
        excerpt: existingPost?.excerpt || '',
        content: existingPost?.content || '',
        category: existingPost?.category || '',
        status: existingPost?.status.toLowerCase() || 'draft',
        author: existingPost?.author || 'Admin User',
        tags: existingPost?.tags || [],
        featuredImage: null as File | null
    });

    const [currentTag, setCurrentTag] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(existingPost?.image || null);

    const categories = ['Buying Guide', 'Selling Tips', 'Market Analysis', 'Investment', 'Financing', 'Technology'];

    if (!existingPost) {
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
                            <div className="text-center py-12">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                                <Link href="/admin/blog" className="text-purple-600 hover:text-purple-700">
                                    ← Back to Blog Management
                                </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, featuredImage: file }));
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updating blog post:', formData);
        // Handle form submission here
    };

    const saveDraft = () => {
        setFormData(prev => ({ ...prev, status: 'draft' }));
        handleSubmit(new Event('submit') as any);
    };

    const publishPost = () => {
        setFormData(prev => ({ ...prev, status: 'published' }));
        handleSubmit(new Event('submit') as any);
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
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Link href="/admin/blog" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FiArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                    Edit Blog Post
                                </h1>
                                <p className="text-gray-600 mt-1">Make changes to your blog post</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <button
                                    onClick={saveDraft}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Save Draft
                                </button>
                                <button
                                    onClick={publishPost}
                                    className="px-6 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5f2fd6] transition-colors"
                                >
                                    Update & Publish
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Title */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Post Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Enter your blog post title..."
                                            required
                                        />
                                    </div>

                                    {/* Excerpt */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Excerpt *
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Write a brief excerpt for your blog post..."
                                            required
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Content *
                                        </label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            rows={15}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Write your blog post content here... You can use HTML tags for formatting."
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-2">
                                            You can use HTML tags like &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, etc. for formatting.
                                        </p>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Featured Image */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            Featured Image
                                        </label>

                                        {imagePreview ? (
                                            <div className="relative">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview(null);
                                                        setFormData(prev => ({ ...prev, featuredImage: null }));
                                                    }}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                >
                                                    <FiX className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 mb-2">
                                                    Upload featured image
                                                </p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Tags */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tags
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={currentTag}
                                                onChange={(e) => setCurrentTag(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                                placeholder="Add a tag..."
                                            />
                                            <button
                                                type="button"
                                                onClick={addTag}
                                                className="px-4 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5f2fd6] transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                                                    >
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(tag)}
                                                            className="text-purple-500 hover:text-purple-700"
                                                        >
                                                            <FiX className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Author */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Author name"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
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