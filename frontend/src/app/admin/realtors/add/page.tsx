'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useCreateRealtor } from '../../../../hooks/use-realtors';

// Initial empty form data
const initialFormData = {
    fullName: '',
    email: '',
};

export default function AddNewRealtor() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [invitationDetails, setInvitationDetails] = useState<{
        email: string;
        name: string;
        token: string;
        expiresAt: string;
    } | null>(null);

    // Use React Query mutation
    const createRealtorMutation = useCreateRealtor();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveRealtor = async () => {
        // Validate required fields
        if (!formData.fullName || !formData.email) {
            alert('Please fill in all required fields (Full Name and Email)');
            return;
        }

        createRealtorMutation.mutate(formData, {
            onSuccess: (result) => {
                setInvitationDetails({
                    email: formData.email,
                    name: formData.fullName,
                    token: result.token,
                    expiresAt: result.expiresAt
                });
                setShowSuccessModal(true);
                // Reset form
                setFormData(initialFormData);
            },
            onError: (error: any) => {
                alert(`Error: ${error?.message || 'An error occurred while sending the invitation'}`);
            },
        });
    };

    const handleCancel = () => {
        // Reset form data
        setFormData(initialFormData);
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
                                    <span className="text-[#703BF7] font-medium">Invite New Realtor</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Send an invitation email to a new realtor. They will receive instructions to complete their registration.
                                </p>
                            </div>
                            <button
                                onClick={handleSaveRealtor}
                                disabled={createRealtorMutation.isPending}
                                className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createRealtorMutation.isPending ? 'Sending Invitation...' : 'Send Invitation'}
                            </button>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                            <div className="max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-[#703BF7] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Invite New Realtor</h3>
                                    <p className="text-gray-600 text-sm">
                                        Enter the realtor's details below. They will receive an invitation email with instructions to complete their registration and set up their profile.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Enter realtor's full name"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                            placeholder="Enter realtor's email address"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            The realtor will use this email to complete their registration
                                        </p>
                                    </div>

                                    {/* Information Box */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                                        <div className="flex">
                                            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h4 className="text-sm font-medium text-blue-800 mb-1">What happens next?</h4>
                                                <ul className="text-xs text-blue-700 space-y-1">
                                                    <li>• An invitation email will be sent to the realtor</li>
                                                    <li>• They can use the invitation link to complete registration</li>
                                                    <li>• Only invited emails can register as realtors</li>
                                                    <li>• They will set up their profile, bank details, and password</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8">
                                    <button
                                        onClick={handleCancel}
                                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveRealtor}
                                        disabled={createRealtorMutation.isPending}
                                        className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {createRealtorMutation.isPending ? 'Sending Invitation...' : 'Send Invitation'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && invitationDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Invitation Sent Successfully!</h3>
                            <p className="text-gray-600">The realtor invitation has been sent via email.</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Invitation Details:</h4>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">Name:</span> {invitationDetails.name}
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span> {invitationDetails.email}
                                </div>
                                <div>
                                    <span className="font-medium">Expires:</span> {new Date(invitationDetails.expiresAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-medium text-blue-800 mb-1">Next Steps:</h4>
                                    <ul className="text-xs text-blue-700 space-y-1">
                                        <li>• The realtor will receive an email with registration instructions</li>
                                        <li>• They have 7 days to complete their registration</li>
                                        <li>• You can resend the invitation if needed</li>
                                        <li>• Check the realtors list to see when they register</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <Link
                                href="/admin/realtors"
                                className="px-4 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5a2fd4] text-center"
                            >
                                View Realtors
                            </Link>
                        </div>
                    </div>
                </div>
            )}

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