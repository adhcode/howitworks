'use client'

import React, { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiMail, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../../providers/auth-provider';
import { dashboardApi } from '../../../lib/api-endpoints';
import toast, { Toaster } from 'react-hot-toast';

interface DashboardStats {
    totalRealtors?: number;
    activeRealtors?: number;
    totalInvestors?: number;
    totalProperties?: number;
    totalLeads?: number;
    totalInvestments?: number;
    totalInvestmentAmount?: number;
    totalCommissions?: number;
    recentRealtors?: any[];
    recentLeads?: any[];
    recentInvestments?: any[];
    // Handle alternative response structure
    totalUsers?: number;
}

interface TopRealtor {
    id: string;
    name: string;
    sales: number;
    leads: number;
    profileImage?: string;
}

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await dashboardApi.getAdminDashboard();
            // Handle the actual response structure
            setStats(response.stats || response);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Calculate top performing realtors from recent data
    const getTopRealtors = (): TopRealtor[] => {
        if (!stats?.recentRealtors) return [];

        return stats.recentRealtors.slice(0, 4).map((realtor: any) => ({
            id: realtor.id,
            name: `${realtor.user.firstName} ${realtor.user.lastName}`,
            sales: realtor._count?.properties || 0,
            leads: realtor._count?.leads || 0,
            profileImage: realtor.profileImage,
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="dashboard"
                        onLogout={() => setShowLogoutModal(true)}
                    />
                    <div className="flex-1 flex flex-col">
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <main className="flex-1 px-4 lg:px-8 py-6">
                            {/* Skeleton Loading */}
                            <div className="mb-6">
                                <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
                            </div>

                            {/* Stats Cards Skeleton */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                                        <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Skeleton */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
                                    <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-6 border border-gray-200">
                                    <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="flex justify-between">
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row Skeleton */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {[1, 2].map((i) => (
                                    <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
                                        <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4].map((j) => (
                                                <div key={j} className="flex gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="dashboard"
                    onLogout={logout}
                />

                <div className="flex-1 flex flex-col">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main className="flex-1 px-4 lg:px-8 py-6">
                        {/* Page Title */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                            <p className="text-gray-600 text-sm mt-1">Welcome back! Here's what's happening today.</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                            {/* Properties Listed */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FiHome className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Properties Listed</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalProperties || 0}</p>
                            </div>

                            {/* Active Realtors */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <FiUsers className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Active Realtors</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.activeRealtors || stats?.totalRealtors || 0}</p>
                            </div>

                            {/* Leads Received */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FiMail className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Leads Received</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalLeads || 0}</p>
                            </div>

                            {/* Total Commission */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <FiDollarSign className="w-6 h-6 text-yellow-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Commission</h3>
                                <p className="text-3xl font-bold text-gray-900">₦{(stats?.totalCommissions || 0).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Charts and Tables Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Leads Over Time Chart */}
                            <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Leads Over Time</h2>
                                    <FiTrendingUp className="w-5 h-5 text-gray-400" />
                                </div>
                                <LeadsChart leads={stats?.recentLeads || []} />
                            </div>

                            {/* System Summary */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">System Summary</h2>
                                    <FiActivity className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Properties</span>
                                        <span className="text-sm font-semibold text-gray-900">{stats?.totalProperties || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Active Realtors</span>
                                        <span className="text-sm font-semibold text-gray-900">{stats?.activeRealtors || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Leads</span>
                                        <span className="text-sm font-semibold text-gray-900">{stats?.totalLeads || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Pending Leads</span>
                                        <span className="text-sm font-semibold text-yellow-600">
                                            {stats?.recentLeads?.filter((l: any) => l.status === 'new').length || 0}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Converted Leads</span>
                                        <span className="text-sm font-semibold text-green-600">
                                            {stats?.recentLeads?.filter((l: any) => l.status === 'converted').length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Activities */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h2>
                                <div className="space-y-4">
                                    {stats?.recentLeads?.slice(0, 5).map((lead: any, index: number) => (
                                        <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <FiMail className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                                                <p className="text-xs text-gray-600 truncate">
                                                    New lead for {lead.property?.title || 'property'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(lead.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                                                    lead.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </div>
                                    ))}
                                    {(!stats?.recentLeads || stats.recentLeads.length === 0) && (
                                        <p className="text-sm text-gray-500 text-center py-8">No recent activities</p>
                                    )}
                                </div>
                            </div>

                            {/* Top Performing Realtors */}
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Realtors</h2>
                                <div className="space-y-4">
                                    {getTopRealtors().map((realtor, index) => (
                                        <div key={realtor.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{realtor.name}</p>
                                                <div className="flex gap-4 mt-1">
                                                    <span className="text-xs text-gray-600">
                                                        {realtor.sales} {realtor.sales === 1 ? 'Sale' : 'Sales'}
                                                    </span>
                                                    <span className="text-xs text-gray-600">
                                                        {realtor.leads} {realtor.leads === 1 ? 'Lead' : 'Leads'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {getTopRealtors().length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-8">No realtors yet</p>
                                    )}
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
                        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={logout}
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

// Simple Leads Chart Component
function LeadsChart({ leads }: { leads: any[] }) {
    // Group leads by month
    const monthlyData = leads.reduce((acc: any, lead: any) => {
        const month = new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map(month => monthlyData[month] || 0);
    const maxValue = Math.max(...data, 1);

    return (
        <div className="space-y-3">
            {months.map((month, index) => {
                const value = data[index];
                const percentage = (value / maxValue) * 100;

                return (
                    <div key={month} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-8">{month}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                                style={{ width: `${percentage}%` }}
                            >
                                {value > 0 && (
                                    <span className="text-xs font-medium text-white">{value}</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
