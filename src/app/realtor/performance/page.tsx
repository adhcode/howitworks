'use client'

import React, { useState } from 'react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

// Chart data points matching the reference image
const chartData = [
    { month: 'JAN', value: 350 },
    { month: 'FEB', value: 520 },
    { month: 'MAR', value: 400 },
    { month: 'APR', value: 750 },
    { month: 'MAY', value: 650 },
    { month: 'JUN', value: 750 },
    { month: 'JUL', value: 300 },
    { month: 'AUG', value: 200 },
    { month: 'SEP', value: 100 },
    { month: 'OCT', value: 375 },
    { month: 'NOV', value: 600 },
    { month: 'DEC', value: 700 },
];

// Simple LineChart Component with straight lines and transparent circles
function SimpleLineChart({ data }: { data: typeof chartData }) {
    const maxValue = 800;

    return (
        <div className="relative h-64 lg:h-80 w-full">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4 z-10">
                <span>800</span>
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0">
                    {/* Horizontal grid lines */}
                    {[0, 25, 50, 75, 100].map((i) => (
                        <div
                            key={`h-${i}`}
                            className="absolute w-full border-t border-gray-100"
                            style={{ top: `${i}%` }}
                        />
                    ))}
                    {/* Vertical grid lines */}
                    {data.map((_, index) => (
                        <div
                            key={`v-${index}`}
                            className="absolute h-full border-l border-gray-100"
                            style={{ left: `${(index / (data.length - 1)) * 100}%` }}
                        />
                    ))}
                </div>

                {/* Chart container with proper aspect ratio */}
                <div className="absolute inset-0">
                    <svg
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                    >
                        {/* Straight line segments between points */}
                        {data.map((point, index) => {
                            if (index === data.length - 1) return null;
                            const nextPoint = data[index + 1];
                            const x1 = (index / (data.length - 1)) * 100;
                            const y1 = 100 - (point.value / maxValue) * 100;
                            const x2 = ((index + 1) / (data.length - 1)) * 100;
                            const y2 = 100 - (nextPoint.value / maxValue) * 100;

                            return (
                                <line
                                    key={index}
                                    x1={`${x1}%`}
                                    y1={`${y1}%`}
                                    x2={`${x2}%`}
                                    y2={`${y2}%`}
                                    stroke="#8157FF"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                />
                            );
                        })}

                        {/* Data point circles */}
                        {data.map((point, index) => {
                            const x = (index / (data.length - 1)) * 100;
                            const y = 100 - (point.value / maxValue) * 100;

                            return (
                                <circle
                                    key={index}
                                    cx={`${x}%`}
                                    cy={`${y}%`}
                                    r="13.1"
                                    fill="white"
                                    stroke="#8157FF"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                    style={{
                                        transformOrigin: `${x}% ${y}%`,
                                        transform: 'scale(0.3)'
                                    }}
                                />
                            );
                        })}
                    </svg>
                </div>

                {/* Tooltip for October (375) */}
                <div
                    className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none z-20"
                    style={{
                        left: `${(9 / (data.length - 1)) * 100}%`,
                        top: `${100 - (375 / maxValue) * 100}%`,
                        transform: 'translate(-50%, -120%)'
                    }}
                >
                    375
                </div>

                {/* Month labels */}
                <div className="absolute -bottom-8 w-full flex justify-between text-xs text-gray-500">
                    {data.map((point) => (
                        <span key={point.month} className="text-center flex-1">{point.month}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function PerformancePage() {
    const [selectedPeriod, setSelectedPeriod] = useState('This year');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="performance"
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    {/* Top bar with avatar */}
                    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-500 hover:text-gray-700"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>

                            {/* Avatar - always on the right */}
                            <div className="flex items-center gap-3 ml-auto">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">Rokeeb Abdul</p>
                                    <p className="text-xs text-gray-500">email@gmail.com</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-sm font-medium">RA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">My performance</h2>
                            </div>
                            <div className="relative">
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:ring-[#8157FF] focus:border-[#8157FF] w-full sm:w-auto"
                                >
                                    <option>This year</option>
                                    <option>Last year</option>
                                    <option>This month</option>
                                </select>
                                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Stats cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg lg:text-2xl font-bold text-gray-900">1,230</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Total Views (YTD)</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-yellow-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg lg:text-2xl font-bold text-gray-900">150</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Total Enquiries</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-purple-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg lg:text-2xl font-bold text-gray-900">25</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Total Closings</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-purple-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:grid-cols-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg lg:text-2xl font-bold text-gray-900">April</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Top Month</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-green-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom row with conversion rate and commissions */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Conversion Rate */}
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    This shows the percentage of enquiries relative to total views.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Conversion rate</span>
                                        <span className="text-sm font-medium">12.8%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Benchmark</span>
                                        <span className="text-sm font-medium">Top 20% of all realtors</span>
                                    </div>
                                </div>
                            </div>

                            {/* Commissions Earned */}
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Commissions Earned</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Cumulative earnings from all successful referrals
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">This Month</span>
                                        <span className="text-sm font-medium">$2,300</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Year-to-Date (YTD)</span>
                                        <span className="text-sm font-medium">$38,750</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Views Overview Chart */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Views Overview</h3>
                            <SimpleLineChart data={chartData} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}