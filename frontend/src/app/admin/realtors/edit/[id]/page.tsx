'use client'

import React, { useState, use, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { useRealtorDetail } from '../../../../../hooks/use-realtor-detail';
import { useAuth } from '../../../../providers/auth-provider';
import toast from 'react-hot-toast';

export default function EditRealtorDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const realtorId = resolvedParams.id;
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    
    const { logout } = useAuth();
    const { realtor, loading, error, updateRealtor, toggleStatus } = useRealtorDetail(realtorId);
    const [togglingStatus, setTogglingStatus] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        residentialAddress: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
        profileImage: '',
    });

    useEffect(() => {
        if (realtor) {
            setFormData({
                firstName: realtor.user.firstName || '',
                lastName: realtor.user.lastName || '',
                email: realtor.user.email || '',
                phoneNumber: realtor.phoneNumber || '',
                residentialAddress: realtor.residentialAddress || '',
                bankName: realtor.bankName || '',
                accountNumber: realtor.accountNumber || '',
                accountName: realtor.accountName || '',
                profileImage: realtor.profileImage || '',
            });
        }
    }, [realtor]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            
            // Prepare update data
            const updateData = {
                phoneNumber: formData.phoneNumber,
                residentialAddress: formData.residentialAddress,
                bankName: formData.bankName,
                accountNumber: formData.accountNumber,
                accountName: formData.accountName,
                profileImage: formData.profileImage,
                user: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                },
            };

            await updateRealtor(updateData);
            router.push(`/admin/realtors/${realtorId}`);
        } catch (err) {
            console.error('Error saving realtor:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push(`/admin/realtors/${realtorId}`);
    };

    const handleToggleStatus = async () => {
        if (!realtor) return;
        
        try {
            setTogglingStatus(true);
            await toggleStatus(!realtor.user.isActive);
        } catch (err) {
            console.error('Error toggling status:', err);
        } finally {
            setTogglingStatus(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="manage-realtors"
                        onLogout={() => setShowLogoutModal(true)}
                    />
                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <div className="w-8 h-8 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading realtor details...</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !realtor) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="manage-realtors"
                        onLogout={() => setShowLogoutModal(true)}
                    />
                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <p className="text-red-600 mb-4">{error || 'Realtor not found'}</p>
                                    <Link 
                                        href="/admin/realtors"
                                        className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5a2fd4] inline-block"
                                    >
                                        Back to Realtors
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-realtors"
                    onLogout={logout}
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
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Saving...' : 'Save'}
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
                                                src={formData.profileImage || '/dashboard/avatar.svg'}
                                                alt={`${formData.firstName} ${formData.lastName}`}
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
                                        {/* First Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                                placeholder="First Name"
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                                placeholder="Last Name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                                placeholder="email@example.com"
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


                            </div>

                            {/* Account Status */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${realtor.user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {realtor.user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleToggleStatus}
                                        disabled={togglingStatus}
                                        className={`px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                            realtor.user.isActive 
                                                ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                        }`}
                                    >
                                        {togglingStatus ? 'Updating...' : (realtor.user.isActive ? 'Deactivate Account' : 'Activate Account')}
                                    </button>
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
                                    disabled={saving}
                                    className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? 'Saving...' : 'Save'}
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