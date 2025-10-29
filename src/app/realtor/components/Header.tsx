'use client'

import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    title?: string;
    subtitle?: string;
}

interface RealtorData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
}

export default function Header({ sidebarOpen, setSidebarOpen, title, subtitle }: HeaderProps) {
    const [realtorData, setRealtorData] = useState<RealtorData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRealtorProfile = async () => {
            try {
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

                setRealtorData(data.realtor);
            } catch (error) {
                console.error('Error in fetchRealtorProfile:', error);
                // Set fallback data
                setRealtorData({
                    id: 'fallback',
                    firstName: 'User',
                    lastName: '',
                    email: 'user@example.com'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRealtorProfile();
    }, []);

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    if (loading) {
        return (
            <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <FiMenu className="w-6 h-6" />
                        </button>

                        {title && (
                            <div className="hidden lg:block">
                                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
                                {subtitle && (
                                    <p className="text-sm text-gray-500">{subtitle}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <div className="text-right hidden sm:block">
                            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!realtorData) {
        return (
            <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <FiMenu className="w-6 h-6" />
                        </button>

                        {title && (
                            <div className="hidden lg:block">
                                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
                                {subtitle && (
                                    <p className="text-sm text-gray-500">{subtitle}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium">U</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const displayName = `${realtorData.firstName} ${realtorData.lastName}`;
    const displayEmail = realtorData.email;

    return (
        <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Left side - Mobile menu button and optional title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>

                    {title && (
                        <div className="hidden lg:block">
                            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
                            {subtitle && (
                                <p className="text-sm text-gray-500">{subtitle}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Right side - User info and avatar */}
                <div className="flex items-center gap-3 ml-auto">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                        <p className="text-xs text-gray-500">{displayEmail}</p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {realtorData.profileImage ? (
                            <img
                                src={realtorData.profileImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-sm font-medium">
                                {getInitials(realtorData.firstName, realtorData.lastName)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile title display */}
            {title && (
                <div className="lg:hidden mt-3 pt-3 border-t border-gray-100">
                    <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    )}
                </div>
            )}
        </div>
    );
} 