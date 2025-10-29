'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiSearch, FiFilter, FiEye, FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Dummy data for properties
const properties = [
    {
        id: 1,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house1.png']
    },
    {
        id: 2,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Unassigned',
        dateListed: 'Sept 1, 2025',
        status: 'Pending',
        images: ['/house/house2.png']
    },
    {
        id: 3,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house4.png']
    },
    {
        id: 4,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house5.png']
    },
    {
        id: 5,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house7.png']
    },
    {
        id: 6,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house8.png']
    },
    {
        id: 7,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house9.png']
    },
    {
        id: 8,
        title: '3 Bed Apartment, Lekki',
        location: 'Lekki Phase 1, Lagos',
        price: '₦85,000,000',
        listedBy: 'Tolu Akinbo',
        dateListed: 'Sept 1, 2025',
        status: 'Active',
        images: ['/house/house10.png']
    },
];

export default function ManageProperties() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                Manage Properties
                            </h2>
                            <Link
                                href="/admin/properties/add"
                                className="w-full sm:w-auto bg-[#703BF7] text-white px-4 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors flex items-center justify-center gap-2"
                            >
                                <FiPlus className="w-4 h-4" />
                                Add Property
                            </Link>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search Properties..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                />
                            </div>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm lg:text-base">
                                <FiFilter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>

                        {/* Properties Table - Desktop */}
                        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-900">
                                    <div>Property</div>
                                    <div>Location</div>
                                    <div>Price</div>
                                    <div>Listed By</div>
                                    <div>Date Listed</div>
                                    <div>Action</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {properties.map((property) => (
                                    <div key={property.id} className="px-6 py-4 hover:bg-gray-50">
                                        <div className="grid grid-cols-6 gap-4 items-center">
                                            {/* Property */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={property.images[0]}
                                                        alt={property.title}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{property.title}</p>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div>
                                                <p className="text-sm text-gray-600">{property.location}</p>
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{property.price}</p>
                                            </div>

                                            {/* Listed By */}
                                            <div>
                                                <p className="text-sm text-gray-600">{property.listedBy}</p>
                                            </div>

                                            {/* Date Listed */}
                                            <div>
                                                <p className="text-sm text-gray-600">{property.dateListed}</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/properties/${property.id}`} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <FiEye className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/properties/edit/${property.id}`} className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                                                    <FiEdit className="w-4 h-4" />
                                                </Link>
                                                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                    <FiTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Properties Grid - Mobile/Tablet */}
                        <div className="lg:hidden space-y-4">
                            {properties.map((property) => (
                                <div key={property.id} className="bg-white rounded-lg border border-gray-200 p-4">
                                    <div className="flex gap-4">
                                        {/* Property Image */}
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={property.images[0]}
                                                alt={property.title}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Property Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{property.title}</h3>
                                            <p className="text-xs text-gray-500 mb-1">{property.location}</p>
                                            <p className="text-sm font-medium text-gray-900 mb-2">{property.price}</p>

                                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                                                <span>By: {property.listedBy}</span>
                                                <span>•</span>
                                                <span>{property.dateListed}</span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                <Link href={`/admin/properties/${property.id}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs">
                                                    <FiEye className="w-3 h-3" />
                                                    View
                                                </Link>
                                                <Link href={`/admin/properties/edit/${property.id}`} className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-xs">
                                                    <FiEdit className="w-3 h-3" />
                                                    Edit
                                                </Link>
                                                <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs">
                                                    <FiTrash className="w-3 h-3" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                            <p className="text-sm text-gray-600">
                                Showing 1 to {properties.length} of 100
                            </p>
                            <div className="flex items-center gap-1 overflow-x-auto">
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    Previous
                                </button>
                                <button className="px-3 py-2 text-sm bg-[#703BF7] text-white rounded-md whitespace-nowrap">
                                    1
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    2
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    3
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    4
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    5
                                </button>
                                <span className="px-2 text-sm text-gray-500">...</span>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    Next
                                </button>
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
                        <p className="text-gray-600 mb-6">Are you sure you want to log out of your admin account?</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle logout logic here
                                    setShowLogoutModal(false);
                                }}
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