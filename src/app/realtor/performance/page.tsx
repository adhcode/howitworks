'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrendingUp, FiUsers, FiEye, FiCalendar, FiChevronDown } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface PerformanceData {
    stats: {
        totalViews: number;
        totalEnquiries: number;
        totalClosings: number;
        topMonth: string;
        conversionRate: number;
        thisMonthCommission: number;
        yearToDateCommission: number;
    };
    monthlyData: Array<{
        month: string;
        views: number;
        enquiries: number;
        closings: number;
        commission: number;
    }>;
}

export default function PerformancePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('This year');
    const router = useRouter();

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                setLoading(true);
                const baseUrl = typeof window !== 'undefined'
                    ? window.location.origin
                    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

                const response = await fetch(`${baseUrl}/api/realtor/performance`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setPerformanceData(data);
            } catch (error) {
                console.error('Error in fetchPerformanceData:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch performance data');
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();
    }, []);

    const handleLogout = async () => {
        try {
            // Clerk signOut removed
            router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading performance data...</p>
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

    if (!performanceData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-600">No performance data available</p>
            </div>
        );
    }

    // Chart data for views overview
    const chartData = performanceData?.monthlyData?.map(item => ({
        month: item.month.substring(0, 3).toUpperCase(),
        views: item.views || 0
    })) || [];

    const maxViews = Math.max(...chartData.map(item => item.views), 1);
    const chartHeight = 200;

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="performance"
                    onLogout={handleLogout}
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header with Period Selector */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My performance</h1>
                            </div>
                            <div className="relative">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                                    {selectedPeriod}
                                    <FiChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{(performanceData.stats?.totalViews || 0).toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">Total Views (YTD)</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{performanceData.stats?.totalEnquiries || 0}</p>
                                        <p className="text-sm text-gray-500 mt-1">Total Enquiries</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{performanceData.stats?.totalClosings || 0}</p>
                                        <p className="text-sm text-gray-500 mt-1">Total Closings</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{performanceData.stats?.topMonth || 'N/A'}</p>
                                        <p className="text-sm text-gray-500 mt-1">Top Month</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Conversion Rate */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
                                <p className="text-sm text-gray-500 mb-6">This shows the percentage of enquiries relative to total views.</p>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Conversion rate</span>
                                        <span className="text-2xl font-bold text-gray-900">{performanceData.stats?.conversionRate || 0}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Benchmark</span>
                                        <span className="text-sm text-gray-900">Top 20% of all realtors</span>
                                    </div>
                                </div>
                            </div>

                            {/* Commissions Earned */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Commissions Earned</h3>
                                <p className="text-sm text-gray-500 mb-6">Cumulative earnings from successful referrals.</p>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">This Month</span>
                                        <span className="text-2xl font-bold text-gray-900">₦{(performanceData.stats?.thisMonthCommission || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Year-to-Date (YTD)</span>
                                        <span className="text-sm text-gray-900">₦{(performanceData.stats?.yearToDateCommission || 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Views Overview Chart */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Views Overview</h3>

                            <div className="relative" style={{ height: chartHeight + 40 }}>
                                <svg width="100%" height={chartHeight + 40} className="overflow-visible">
                                    {/* Grid lines */}
                                    {[0, 200, 400, 600, 800].map((value, index) => (
                                        <g key={value}>
                                            <line
                                                x1="50"
                                                y1={chartHeight - (value / maxViews) * chartHeight + 20}
                                                x2="100%"
                                                y2={chartHeight - (value / maxViews) * chartHeight + 20}
                                                stroke="#f3f4f6"
                                                strokeWidth="1"
                                            />
                                            <text
                                                x="20"
                                                y={chartHeight - (value / maxViews) * chartHeight + 25}
                                                fontSize="12"
                                                fill="#6b7280"
                                                textAnchor="end"
                                            >
                                                {value}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Chart line */}
                                    <polyline
                                        points={chartData.map((item, index) =>
                                            `${50 + (index * (100 / chartData.length)) * 8},${chartHeight - (item.views / maxViews) * chartHeight + 20}`
                                        ).join(' ')}
                                        fill="none"
                                        stroke="#8157FF"
                                        strokeWidth="2"
                                    />

                                    {/* Data points */}
                                    {chartData.map((item, index) => (
                                        <g key={index}>
                                            <circle
                                                cx={50 + (index * (100 / chartData.length)) * 8}
                                                cy={chartHeight - (item.views / maxViews) * chartHeight + 20}
                                                r="4"
                                                fill="#8157FF"
                                            />
                                            {/* Tooltip on hover */}
                                            {index === chartData.length - 1 && (
                                                <g>
                                                    <rect
                                                        x={50 + (index * (100 / chartData.length)) * 8 - 15}
                                                        y={chartHeight - (item.views / maxViews) * chartHeight + 20 - 25}
                                                        width="30"
                                                        height="20"
                                                        fill="#333"
                                                        rx="4"
                                                    />
                                                    <text
                                                        x={50 + (index * (100 / chartData.length)) * 8}
                                                        y={chartHeight - (item.views / maxViews) * chartHeight + 20 - 10}
                                                        fontSize="10"
                                                        fill="white"
                                                        textAnchor="middle"
                                                    >
                                                        {item.views}
                                                    </text>
                                                </g>
                                            )}
                                        </g>
                                    ))}

                                    {/* X-axis labels */}
                                    {chartData.map((item, index) => (
                                        <text
                                            key={index}
                                            x={50 + (index * (100 / chartData.length)) * 8}
                                            y={chartHeight + 35}
                                            fontSize="12"
                                            fill="#6b7280"
                                            textAnchor="middle"
                                        >
                                            {item.month}
                                        </text>
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}