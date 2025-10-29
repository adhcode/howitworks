'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Profile() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="profile"
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
                                My Profile
                            </h2>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                            {/* Personal Info Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Personal Info</h3>
                                <Link
                                    href="/admin/profile/edit"
                                    className="bg-[#703BF7] text-white px-4 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors text-sm"
                                >
                                    Edit Details
                                </Link>
                            </div>

                            {/* Profile Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Profile Image */}
                                <div className="flex justify-center lg:justify-start">
                                    <div className="relative">
                                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-gray-200">
                                            <Image
                                                src="/dashboard/avatar.svg"
                                                alt="Profile"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Online status indicator */}
                                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                </div>

                                {/* Profile Details */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                                            <p className="text-sm lg:text-base font-medium text-gray-900">Emeka Obi</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Email</label>
                                            <p className="text-sm lg:text-base font-medium text-gray-900">example@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                                            <p className="text-sm lg:text-base font-medium text-gray-900">+234 801 234 5678</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Role</label>
                                            <p className="text-sm lg:text-base font-medium text-gray-900">Super Admin</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Last Login</label>
                                            <p className="text-sm lg:text-base font-medium text-gray-900">Oct 20, 2025 - 09:34 AM</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Password</label>
                                            <button className="text-sm lg:text-base font-medium text-[#703BF7] hover:text-[#5f2fd6] transition-colors">
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
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