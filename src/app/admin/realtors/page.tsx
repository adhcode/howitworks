'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiFilter, FiEye, FiEdit, FiTrash, FiPlus, FiCopy } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Dummy data for realtors
const realtors = [
    {
        id: 1,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Inactive',
    },
    {
        id: 4,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Active',
    },
    {
        id: 5,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Inactive',
    },
    {
        id: 6,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Active',
    },
    {
        id: 7,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Active',
    },
    {
        id: 8,
        name: 'Fatima Bello',
        email: 'example@email.com',
        phone: '0812 345 6789',
        referralLink: '[Copy Link]',
        status: 'Active',
    },
];

export default function ManageRealtors() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status: string) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-realtors"
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
                                Manage Realtors
                            </h2>
                            <Link
                                href="/admin/realtors/add"
                                className="w-full sm:w-auto bg-[#703BF7] text-white px-4 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors flex items-center justify-center gap-2"
                            >
                                <FiPlus className="w-4 h-4" />
                                Add New Realtor
                            </Link>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name/email..."
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

                        {/* Realtors Table - Desktop */}
                        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-900">
                                    <div>Name</div>
                                    <div>Email</div>
                                    <div>Phone</div>
                                    <div>Referral Link</div>
                                    <div>Status</div>
                                    <div>Action</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {realtors.map((realtor) => (
                                    <div key={realtor.id} className="px-6 py-4 hover:bg-gray-50">
                                        <div className="grid grid-cols-6 gap-4 items-center">
                                            {/* Name */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{realtor.name}</p>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <p className="text-sm text-gray-600">{realtor.email}</p>
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <p className="text-sm text-gray-600">{realtor.phone}</p>
                                            </div>

                                            {/* Referral Link */}
                                            <div>
                                                <button className="flex items-center gap-2 text-sm text-[#703BF7] hover:text-[#5f2fd6]">
                                                    <FiCopy className="w-3 h-3" />
                                                    [Copy Link]
                                                </button>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(realtor.status)}`}>
                                                    {realtor.status}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/realtors/${realtor.id}`} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <FiEye className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/realtors/edit/${realtor.id}`} className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
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

                        {/* Realtors Grid - Mobile/Tablet */}
                        <div className="lg:hidden space-y-4">
                            {realtors.map((realtor) => (
                                <div key={realtor.id} className="bg-white rounded-lg border border-gray-200 p-4">
                                    <div className="space-y-3">
                                        {/* Name and Status */}
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-gray-900">{realtor.name}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(realtor.status)}`}>
                                                {realtor.status}
                                            </span>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-500">Email: {realtor.email}</p>
                                            <p className="text-xs text-gray-500">Phone: {realtor.phone}</p>
                                        </div>

                                        {/* Referral Link */}
                                        <button className="flex items-center gap-2 text-sm text-[#703BF7] hover:text-[#5f2fd6]">
                                            <FiCopy className="w-3 h-3" />
                                            Copy Referral Link
                                        </button>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 pt-2">
                                            <Link href={`/admin/realtors/${realtor.id}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs">
                                                <FiEye className="w-3 h-3" />
                                                View
                                            </Link>
                                            <Link href={`/admin/realtors/edit/${realtor.id}`} className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-xs">
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
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                            <p className="text-sm text-gray-600">
                                Showing 1 to {realtors.length} of 100
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