'use client'

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiUsers, FiDollarSign, FiFileText, FiCalendar } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../../providers/auth-provider';
import { apiClient } from '../../../lib/api-client';
import toast, { Toaster } from 'react-hot-toast';

interface MonthlyData {
    month: string;
    realtors: number;
    leads: number;
    commissions: number;
}

interface AnalyticsData {
    monthlyData: MonthlyData[];
}

export default function AdminAnalyticsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('12months');
    
    const { logout } = useAuth();

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get<AnalyticsData>('/admin/analytics');
            setAnalyticsData(response);
        } catch (error: any) {
            console.error('Error fetching analytics:', error);
            toast.error('Failed to load analytics data');
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const calculateTotals = () => {
        if (!analyticsData?.monthlyData) return { totalRealtors: 0, totalLeads: 0, totalCommissions: 0 };
        
        return analyticsData.monthlyData.reduce((acc, month) => ({
            totalRealtors: acc.totalRealtors + month.realtors,
            totalLeads: acc.totalLeads + month.leads,
            totalCommissions: acc.totalCommissions + month.commissions,
        }), { totalRealtors: 0, totalLeads: 0, totalCommissions: 0 });
    };

    const calculateGrowth = () => {
        if (!analyticsData?.monthlyData || analyticsData.monthlyData.length < 2) {
            return { realtorsGrowth: 0, leadsGrowth: 0, commissionsGrowth: 0 };
        }

        const lastMonth = analyticsData.monthlyData[analyticsData.monthlyData.length - 1];
        const previousMonth = analyticsData.monthlyData[analyticsData.monthlyData.length - 2];

        const calculatePercentage = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return ((current - previous) / previous) * 100;
        };

        return {
            realtorsGrowth: calculatePercentage(lastMonth.realtors, previousMonth.realtors),
            leadsGrowth: calculatePercentage(lastMonth.leads, previousMonth.leads),
            commissionsGrowth: calculatePercentage(lastMonth.commissions, previousMonth.commissions),
        };
    };

    const totals = calculateTotals();
    const growth = calculateGrowth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Toaster />
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="reports-analytics"
                        onLogout={logout}
                    />
                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-32 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                                <div className="h-96 bg-gray-200 rounded"></div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="reports-analytics"
                    onLogout={logout}
                />
                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                                    <p className="text-gray-600 mt-1">Track your platform performance and growth</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-gray-400" />
                                    <select
                                        value={selectedPeriod}
                                        onChange={(e) => setSelectedPeriod(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                    >
                                        <option value="12months">Last 12 Months</option>
                                        <option value="6months">Last 6 Months</option>
                                        <option value="3months">Last 3 Months</option>
                                    </select>
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Total Realtors */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FiUsers className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-medium ${
                                            growth.realtorsGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            <FiTrendingUp className={growth.realtorsGrowth < 0 ? 'rotate-180' : ''} />
                                            {Math.abs(growth.realtorsGrowth).toFixed(1)}%
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600">New Realtors</h3>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{totals.totalRealtors}</p>
                                    <p className="text-xs text-gray-500 mt-2">Total realtors joined in period</p>
                                </div>

                                {/* Total Leads */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FiFileText className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-medium ${
                                            growth.leadsGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            <FiTrendingUp className={growth.leadsGrowth < 0 ? 'rotate-180' : ''} />
                                            {Math.abs(growth.leadsGrowth).toFixed(1)}%
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600">Total Leads</h3>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{totals.totalLeads}</p>
                                    <p className="text-xs text-gray-500 mt-2">Leads generated in period</p>
                                </div>

                                {/* Total Commissions */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FiDollarSign className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-medium ${
                                            growth.commissionsGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            <FiTrendingUp className={growth.commissionsGrowth < 0 ? 'rotate-180' : ''} />
                                            {Math.abs(growth.commissionsGrowth).toFixed(1)}%
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600">Total Commissions</h3>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totals.totalCommissions)}</p>
                                    <p className="text-xs text-gray-500 mt-2">Commission value in period</p>
                                </div>
                            </div>

                            {/* Monthly Trends */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h2>
                                
                                {/* Simple Bar Chart */}
                                <div className="space-y-6">
                                    {analyticsData?.monthlyData.map((month, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                                                <span className="font-medium text-gray-700">{month.month}</span>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-3 h-3 bg-blue-500 rounded"></span>
                                                        {month.realtors} Realtors
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-3 h-3 bg-purple-500 rounded"></span>
                                                        {month.leads} Leads
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-3 h-3 bg-green-500 rounded"></span>
                                                        {formatCurrency(month.commissions)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 h-8">
                                                <div 
                                                    className="bg-blue-500 rounded transition-all"
                                                    style={{ width: `${(month.realtors / Math.max(...analyticsData.monthlyData.map(m => m.realtors))) * 100}%` }}
                                                    title={`${month.realtors} Realtors`}
                                                ></div>
                                            </div>
                                            <div className="flex gap-1 h-8">
                                                <div 
                                                    className="bg-purple-500 rounded transition-all"
                                                    style={{ width: `${(month.leads / Math.max(...analyticsData.monthlyData.map(m => m.leads))) * 100}%` }}
                                                    title={`${month.leads} Leads`}
                                                ></div>
                                            </div>
                                            <div className="flex gap-1 h-8">
                                                <div 
                                                    className="bg-green-500 rounded transition-all"
                                                    style={{ width: `${(month.commissions / Math.max(...analyticsData.monthlyData.map(m => m.commissions))) * 100}%` }}
                                                    title={formatCurrency(month.commissions)}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Data Table - Desktop */}
                            <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Detailed Monthly Data</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Month
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    New Realtors
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Leads Generated
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Commission Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {analyticsData?.monthlyData.map((month, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {month.month}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <span className="inline-flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                            {month.realtors}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <span className="inline-flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                                            {month.leads}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        <span className="inline-flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                            {formatCurrency(month.commissions)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Data Cards - Mobile */}
                            <div className="md:hidden space-y-3">
                                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Detailed Monthly Data</h2>
                                </div>
                                {analyticsData?.monthlyData.map((month, index) => (
                                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                                            <h3 className="font-semibold text-gray-900">{month.month}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                                    <span className="text-sm text-gray-600">New Realtors</span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{month.realtors}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                                                    <span className="text-sm text-gray-600">Leads Generated</span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{month.leads}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                                    <span className="text-sm text-gray-600">Commission Value</span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{formatCurrency(month.commissions)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
