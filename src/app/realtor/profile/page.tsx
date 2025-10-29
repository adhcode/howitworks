'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface RealtorProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    residentialAddress?: string;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    profileImage?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export default function ProfilePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileData, setProfileData] = useState<RealtorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingSection, setEditingSection] = useState<'personal' | 'bank' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchRealtorProfile = async () => {
            try {
                setLoading(true);
                const baseUrl = typeof window !== 'undefined'
                    ? window.location.origin
                    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

                const response = await fetch(`${baseUrl}/api/realtor/profile`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.error || 'Failed to fetch realtor profile');
                }

                setProfileData(data.realtor);
            } catch (error) {
                console.error('Error in fetchRealtorProfile:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchRealtorProfile();
    }, []);

    const startEditing = (section: 'personal' | 'bank') => {
        setEditingSection(section);
        setIsEditing(true);

        if (section === 'personal') {
            setFormData({
                firstName: profileData?.firstName || '',
                lastName: profileData?.lastName || '',
                phoneNumber: profileData?.phoneNumber || '',
                residentialAddress: profileData?.residentialAddress || ''
            });
        } else if (section === 'bank') {
            setFormData({
                bankName: profileData?.bankName || '',
                accountNumber: profileData?.accountNumber || '',
                accountName: profileData?.accountName || ''
            });
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditingSection(null);
        setFormData({});
    };

    const saveChanges = async () => {
        try {
            setSaving(true);
            const baseUrl = typeof window !== 'undefined'
                ? window.location.origin
                : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/realtor/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                window.location.reload();
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-[#8157FF] text-white rounded-md hover:bg-[#7146E6]"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-600">No profile data available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="profile"
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        title="Profile"
                        subtitle="Manage your personal information and account settings"
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                    {isEditing && editingSection === 'personal' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={saveChanges}
                                                disabled={saving}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#8157FF] text-white rounded-md hover:bg-[#7146E6] transition-colors disabled:opacity-50"
                                            >
                                                <FiSave className="w-4 h-4" />
                                                {saving ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <FiX className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => startEditing('personal')}
                                            className="flex items-center gap-2 px-4 py-2 text-[#8157FF] border border-[#8157FF] rounded-md hover:bg-[#8157FF] hover:text-white transition-colors"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        {isEditing && editingSection === 'personal' ? (
                                            <input
                                                type="text"
                                                value={formData.firstName || ''}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF]"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        {isEditing && editingSection === 'personal' ? (
                                            <input
                                                type="text"
                                                value={formData.lastName || ''}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF]"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.lastName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        {isEditing && editingSection === 'personal' ? (
                                            <input
                                                type="text"
                                                value={formData.phoneNumber || ''}
                                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF]"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.phoneNumber || 'Not provided'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
                                    {isEditing && editingSection === 'bank' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={saveChanges}
                                                disabled={saving}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#8157FF] text-white rounded-md hover:bg-[#7146E6] transition-colors disabled:opacity-50"
                                            >
                                                <FiSave className="w-4 h-4" />
                                                {saving ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <FiX className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => startEditing('bank')}
                                            className="flex items-center gap-2 px-4 py-2 text-[#8157FF] border border-[#8157FF] rounded-md hover:bg-[#8157FF] hover:text-white transition-colors"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                            Edit Details
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                        {isEditing && editingSection === 'bank' ? (
                                            <input
                                                type="text"
                                                value={formData.bankName || ''}
                                                onChange={(e) => handleInputChange('bankName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF]"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.bankName || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                        {isEditing && editingSection === 'bank' ? (
                                            <input
                                                type="text"
                                                value={formData.accountNumber || ''}
                                                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF]"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.accountNumber || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                                        {isEditing && editingSection === 'bank' ? (
                                            <input
                                                type="text"
                                                value={formData.accountName || ''}
                                                onChange={(e) => handleInputChange('accountName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF]"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.accountName || 'Not provided'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {new Date(profileData.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {new Date(profileData.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Slug</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{profileData.slug}</p>
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