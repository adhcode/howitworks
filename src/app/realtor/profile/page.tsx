'use client'

import React, { useState } from 'react';
import { FiMenu, FiEdit2 } from 'react-icons/fi';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

export default function ProfilePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="profile"
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    {/* Top bar with avatar */}
                    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-500 hover:text-gray-700"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>

                            {/* Avatar - always on the right */}
                            <div className="flex items-center gap-3 ml-auto">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">Rokeeb Abdul</p>
                                    <p className="text-xs text-gray-500">email@gmail.com</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-sm font-medium">RA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Profile</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                    <button className="flex items-center gap-2 px-4 py-2 text-[#8157FF] border border-[#8157FF] rounded-md hover:bg-[#8157FF] hover:text-white transition-colors w-full sm:w-auto justify-center">
                                        <FiEdit2 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Rokeeb Abdul</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">email@gmail.com</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">+234 801 234 5678</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Lagos, Nigeria</p>
                                    </div>
                                </div>
                            </div>

                            {/* System Information */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">System Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">REF001234</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">January 15, 2024</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                                        <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md font-medium">Active</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">ROKEEB2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Withdrawal Account Details */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Withdrawal Account Details</h3>
                                    <button className="flex items-center gap-2 px-4 py-2 text-[#8157FF] border border-[#8157FF] rounded-md hover:bg-[#8157FF] hover:text-white transition-colors w-full sm:w-auto justify-center">
                                        <FiEdit2 className="w-4 h-4" />
                                        Edit Details
                                    </button>
                                </div>

                                {/* Warning banner */}
                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Important:</strong> Ensure your account details are correct. Incorrect details may delay or prevent commission payouts.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">First Bank of Nigeria</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">1234567890</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Rokeeb Abdul</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Savings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}