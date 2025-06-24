'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { GoCopy } from 'react-icons/go';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

// Dummy data for recent leads
const leads = [
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Not Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Converted',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Not Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Converted',
    },
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Not Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Converted',
    }
];

// Helper to get color for status
const statusColor = {
    Connected: 'text-blue-600',
    'Not Connected': 'text-red-600',
    Converted: 'text-green-600',
};

export default function RealtorDashboard() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="dashboard"
                    onLogout={() => setShowLogoutModal(true)}
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

                            <div className="flex items-center gap-3 ml-auto">

                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Image src="/dashboard/Avatars.png" alt="avatar" width={40} height={40} />
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">Rokeeb Abdul</p>
                                    <p className="text-xs text-gray-500">email@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                Welcome back, Rokeeb Abdul
                            </h2>
                            <p className="text-[20px] text-gray-500">
                                Here's your performance summary for this month.
                            </p>
                        </div>

                        {/* Referral link */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Your Unique Referral Link</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    readOnly
                                    value="https://howitworks.ng/ref/emeka-obi"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                                />
                                <button className="px-4 py-2 bg-[#8157FF] text-white rounded-md text-sm font-medium border border-[#8157FF] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap hover:bg-white hover:text-[#8157FF]">
                                    <GoCopy className="w-4 h-4" />
                                    Copy Link
                                </button>
                            </div>
                        </div>

                        {/* Stats cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-8">
                            <div className="bg-white p-6 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex flex-col gap-12">
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-gray-900">42</p>
                                        <div className="w-10 h-10  bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Image src="/dashboard/box1.svg" alt="leads icon" width={24} height={24} />
                                        </div>
                                    </div>
                                    <p className="text-base text-gray-500 ">Leads Generated</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:p-4 rounded-lg border border-gray-200">
                                <div className="flex flex-col gap-12">
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-gray-900">187</p>
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Image src="/dashboard/box2.svg" alt="clicks icon" width={24} height={24} />
                                        </div>
                                    </div>
                                    <p className="text-base text-gray-500">Referral Clicks</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex flex-col gap-12">
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-gray-900">₦250,000</p>
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <Image src="/dashboard/box3.svg" alt="commission icon" width={24} height={24} />
                                        </div>
                                    </div>
                                    <p className="text-base text-gray-500">Commissions Earned</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent leads table */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Property Enquired</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Enquiry Date</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {leads.map((lead, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div>
                                                        <div className="font-medium">{lead.name}</div>
                                                        <div className="text-xs text-gray-500 sm:hidden">{lead.property}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{lead.property}</td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{lead.location}</td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">{lead.date}</td>
                                                <td className={`px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor[lead.status as keyof typeof statusColor]}`}>
                                                    {lead.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-4 lg:px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-500">Showing 1-10 from 100</p>
                                    <div className="flex items-center space-x-1">
                                        <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&lt;</button>
                                        <button className="px-3 py-1 text-sm bg-[#8157FF] text-white rounded">1</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hidden sm:inline-block">4</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hidden sm:inline-block">5</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hidden sm:inline-block">6</button>
                                        <span className="px-2 py-1 text-sm text-gray-500 hidden sm:inline">...</span>
                                        <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&gt;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Change Password Modal */}
                {showChangePassword && (
                    <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
                )}

                {/* Logout Modal */}
                {showLogoutModal && (
                    <LogoutModal onClose={() => setShowLogoutModal(false)} />
                )}
            </div>
        </div>
    );
}

// Change Password Modal Component
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold text-center mb-2">Change Password</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Use at least 8 characters, including symbols and a capital letter.
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8157FF] focus:border-[#8157FF]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                placeholder="Enter Password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8157FF] focus:border-[#8157FF] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                placeholder="Enter Password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8157FF] focus:border-[#8157FF] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                placeholder="Enter Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8157FF] focus:border-[#8157FF] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#8157FF] text-white py-2 rounded-md font-medium hover:bg-[#6d49e0] mt-6"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

// Logout Modal Component
function LogoutModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
                <h2 className="text-lg font-semibold text-center mb-4">
                    Are you sure you want to logout your account?
                </h2>

                <div className="space-y-3">
                    <button className="w-full bg-[#8157FF] text-white py-2 rounded-md font-medium hover:bg-[#6d49e0]">
                        Yes, Logout
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full text-[#8157FF] py-2 font-medium hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}