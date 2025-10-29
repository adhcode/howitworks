'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCopy, FiCheck } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface DashboardData {
    realtor: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImage?: string;
        slug: string;
    };
    stats: {
        leadsGenerated: number;
        referralClicks: number;
        commissionsEarned: number;
    };
    recentLeads: Array<{
        id: string;
        name: string;
        email: string;
        phone?: string;
        propertyEnquired: string;
        location: string;
        enquiryDate: string;
        status: 'Connected' | 'Not Connected' | 'Converted';
    }>;
    referralLink: string;
}

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const baseUrl = typeof window !== 'undefined'
                    ? window.location.origin
                    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

                const response = await fetch(`${baseUrl}/api/realtor/dashboard`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setDashboardData(data);
            } catch (error) {
                console.error('Error in fetchDashboardData:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const copyReferralLink = async () => {
        if (dashboardData?.referralLink) {
            try {
                await navigator.clipboard.writeText(dashboardData.referralLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Failed to copy link:', error);
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Connected':
                return 'text-blue-600';
            case 'Converted':
                return 'text-green-600';
            case 'Not Connected':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
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

    if (!dashboardData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-600">No dashboard data available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="dashboard"
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Welcome Message */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Welcome back, {dashboardData.realtor.firstName} {dashboardData.realtor.lastName}
                            </h1>
                            <p className="text-gray-600">Here's your performance summary for this month.</p>
                        </div>

                        {/* Referral Link Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Unique Referral Link</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-50 rounded-md px-4 py-3 text-sm text-gray-700 font-mono">
                                    {dashboardData.referralLink}
                                </div>
                                <button
                                    onClick={copyReferralLink}
                                    className="flex items-center gap-2 px-4 py-3 bg-[#8157FF] text-white rounded-md hover:bg-[#7146E6] transition-colors"
                                >
                                    {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.leadsGenerated}</p>
                                        <p className="text-sm text-gray-500 mt-1">Leads Generated</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.referralClicks}</p>
                                        <p className="text-sm text-gray-500 mt-1">Referral Clicks</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">₦{dashboardData.stats.commissionsEarned.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">Commissions Earned</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Leads Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Enquired</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enquiry Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {dashboardData.recentLeads.length > 0 ? (
                                            dashboardData.recentLeads.map((lead) => (
                                                <tr key={lead.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                        <div className="text-sm text-gray-500">{lead.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{lead.propertyEnquired}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{lead.location}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(lead.enquiryDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`text-sm font-medium ${getStatusColor(lead.status)}`}>
                                                            {lead.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                    No recent leads found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {dashboardData.recentLeads.length > 0 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Showing 1-{Math.min(dashboardData.recentLeads.length, 10)} from {dashboardData.recentLeads.length}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">‹</button>
                                            <button className="px-3 py-1 text-sm bg-[#8157FF] text-white rounded">1</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">4</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">...</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">›</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}