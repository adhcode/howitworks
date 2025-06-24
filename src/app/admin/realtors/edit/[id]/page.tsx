'use client'

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

// Dummy data for realtor
const realtorData = {
    id: 1,
    fullName: 'Emeka Obi',
    email: 'example@gmail.com',
    phoneNumber: '+234 801 234 5678',
    residentialAddress: '124 Admiralty Road, Lekki Phase 1',
    temporaryPassword: 'password123',
    bankName: 'GTBank',
    accountNumber: '0456789987',
    accountName: 'Emeka Obi',
    profileImage: '/dashboard/avatar.svg',
};

export default function EditRealtorDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const realtorId = resolvedParams.id;
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState(realtorData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Handle save logic
        console.log('Saving realtor data:', formData);
    };

    const handleCancel = () => {
        // Reset form data or navigate back
        setFormData(realtorData);
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
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Link href="/admin/realtors" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FiArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                        Manage Realtors
                                    </h1>
                                    <span className="text-gray-400 hidden sm:inline">&gt;</span>
                                    <span className="text-[#703BF7] font-medium">Edit Realtor Details</span>
                                </div>
                            </div>
                            <button className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors">
                                Save
                            </button>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                                <div className="flex flex-col items-center lg:items-start">
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                                            <Image
                                                src={formData.profileImage}
                                                alt={formData.fullName}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#703BF7] text-white rounded-full flex items-center justify-center hover:bg-[#5f2fd6] transition-colors">
                                            <FiCamera className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 w-full">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                                placeholder="Full Name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                                placeholder="email"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                        placeholder="Phone Number"
                                    />
                                </div>

                                {/* Residential Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Residential Address
                                    </label>
                                    <input
                                        type="text"
                                        name="residentialAddress"
                                        value={formData.residentialAddress}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                        placeholder="Residential Address"
                                    />
                                </div>

                                {/* Set Temporary Password */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Set Temporary Password
                                    </label>
                                    <input
                                        type="password"
                                        name="temporaryPassword"
                                        value={formData.temporaryPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                        placeholder="Set Temporary Password"
                                    />
                                </div>
                            </div>

                            {/* Withdrawal Account Details */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Account Details</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Note: Ensure account name matches realtor's name. All withdrawals are processed every Friday.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Bank Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Bank Name"
                                        />
                                    </div>

                                    {/* Account Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Account Number"
                                        />
                                    </div>

                                    {/* Account Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Account Name
                                        </label>
                                        <input
                                            type="text"
                                            name="accountName"
                                            value={formData.accountName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Account Name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors"
                                >
                                    Save
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