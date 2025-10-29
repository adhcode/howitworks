'use client'

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiSquare } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample property data
    const property = {
        id: resolvedParams.id,
        title: 'Luxurious 4-Bedroom Duplex with BQ in Lekki Phase I',
        price: '₦85,000,000',
        location: 'Lekki Phase I',
        verified: true,
        bedrooms: 4,
        bathrooms: 3,
        area: '2,500 Sq Feet',
        images: [
            '/house/house1.png',
            '/house/house2.png',
            '/house/house4.png',
            '/house/house5.png',
            '/house/house7.png',
            '/house/house8.png',
            '/house/house9.png',
            '/house/house10.png',
            '/house/house11.png'
        ],
        mainImages: [
            '/house/house1.png',
            '/house/house2.png'
        ],
        description: 'Discover your own piece of excellence with this 4-bedroom apartment. I. With an open floor plan, breathtaking ocean views from every room, and direct access to pristine sandy beach. This property is the epitome of coastal living.',
        keyFeatures: [
            'Smart Lighting & AC',
            'Private Balcony',
            'Panoramic sea-front',
            '24/7 Security',
            'Power Backup',
            'Swimming Pool/Gym',
            'School Inage',
            'Walk-in Closet',
            'Ample Garden'
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-properties"
                    onLogout={() => setShowLogoutModal(true)}
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    {/* Header */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Link href="/admin/properties" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FiArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                        Manage Properties
                                    </h1>
                                    <span className="text-gray-400 hidden sm:inline">&gt;</span>
                                    <span className="text-[#703BF7] font-medium">Property Details</span>
                                </div>
                            </div>
                            <Link
                                href={`/admin/properties/edit/${property.id}`}
                                className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors text-center"
                            >
                                Edit Property
                            </Link>
                        </div>

                        {/* Property Details Card */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Property Header */}
                            <div className="p-4 lg:p-6 border-b border-gray-200">
                                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                                            {property.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-2">
                                            <FiMapPin className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm lg:text-base">{property.location}</span>
                                            {property.verified && (
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-left lg:text-right">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900">{property.price}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Images */}
                            <div className="p-4 lg:p-6">
                                {/* Thumbnail Images */}
                                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                    {property.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#703BF7]' : 'border-gray-200'
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Property ${index + 1}`}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Main Images */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                                        <Image
                                            src={property.mainImages[0]}
                                            alt="Main property image"
                                            width={400}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                                        <Image
                                            src={property.mainImages[1]}
                                            alt="Secondary property image"
                                            width={400}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Property Info and Features */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6 text-sm lg:text-base">
                                            {property.description}
                                        </p>

                                        {/* Property Stats */}
                                        <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <span>🛏️</span>
                                                <span>{property.bedrooms}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>🚿</span>
                                                <span>{property.bathrooms}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FiSquare className="w-4 h-4" />
                                                <span>{property.area}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features and Amenities</h3>
                                        <div className="space-y-2">
                                            {property.keyFeatures.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm lg:text-base text-gray-600">
                                                    <div className="w-1.5 h-1.5 bg-[#703BF7] rounded-full flex-shrink-0"></div>
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 lg:p-6 border-t border-gray-200 bg-gray-50">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button className="flex-1 bg-[#703BF7] text-white py-3 rounded-md hover:bg-[#5f2fd6] transition-colors font-medium">
                                        Get Directory
                                    </button>
                                    <button className="flex-1 border border-red-300 text-red-600 py-3 rounded-md hover:bg-red-50 transition-colors font-medium">
                                        Submit Listing
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
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