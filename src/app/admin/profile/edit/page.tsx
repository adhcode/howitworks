'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function EditProfile() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Emeka Obi',
        email: 'example@gmail.com',
        phoneNumber: '+234 801 234 5678'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveUpdate = () => {
        console.log('Saving profile updates:', formData);
    };

    const handleCancel = () => {
        setFormData({
            fullName: 'Emeka Obi',
            email: 'example@gmail.com',
            phoneNumber: '+234 801 234 5678'
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="profile"
                    onLogout={() => setShowLogoutModal(true)}
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Link href="/admin/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FiArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                        My profile
                                    </h1>
                                    <span className="text-gray-400 hidden sm:inline">&gt;</span>
                                    <span className="text-[#703BF7] font-medium">Edit Details</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSaveUpdate}
                                className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors"
                            >
                                Save Update
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                            <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                                <div className="flex flex-col items-center lg:items-start">
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-gray-200">
                                            <Image
                                                src="/dashboard/avatar.svg"
                                                alt="Profile"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#703BF7] text-white rounded-full flex items-center justify-center hover:bg-[#5f2fd6] transition-colors">
                                            <FiCamera className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 w-full space-y-4">
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
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveUpdate}
                                    className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors"
                                >
                                    Save Update
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

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