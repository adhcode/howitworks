'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Dummy data for recent activity
const recentActivity = [
    {
        user: 'David John',
        action: 'submitted an enquiry for "3-Bed Apartment, Lekki"',
        details: 'Property Inquiry',
        time: '2 mins ago',
        status: 'Active',
    },
    {
        user: 'New Realtor account',
        action: 'created by Super Admin',
        details: 'Account Creation',
        time: '2 mins ago',
        status: 'Pending',
    },
    {
        user: 'Chinedu',
        action: 'closed deal on "5-Bed Villa, Ikoyi"',
        details: 'Deal Closed',
        time: '2 mins ago',
        status: 'Completed',
    },
    {
        user: 'Sarah Ahmed',
        action: 'listed new property',
        details: '4-Bed Duplex, Victoria Island',
        time: '5 mins ago',
        status: 'Active',
    }
];

// Helper to get color for status
const statusColor = {
    Active: 'text-blue-600',
    Pending: 'text-yellow-600',
    Completed: 'text-green-600',
    Inactive: 'text-red-600',
};

export default function AdminDashboard() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [timePeriod, setTimePeriod] = useState('This year');

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="dashboard"
                    onLogout={() => setShowLogoutModal(true)}
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        userName="Admin User"
                        userEmail="admin@howitworks.ng"
                    />

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                Welcome back, Test Name
                            </h2>
                        </div>

                        {/* Overview Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Overview</h3>
                                <select
                                    value={timePeriod}
                                    onChange={(e) => setTimePeriod(e.target.value)}
                                    className="text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                >
                                    <option value="This week">This week</option>
                                    <option value="This month">This month</option>
                                    <option value="This year">This year</option>
                                    <option value="Last month">Last month</option>
                                    <option value="Last year">Last year</option>
                                </select>
                            </div>

                            {/* Stats cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                            <Image src="/dashboard/box1.svg" alt="properties icon" width={24} height={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">325</div>
                                        <p className="text-sm text-gray-600">Properties Listed</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                            <Image src="/dashboard/box2.svg" alt="realtors icon" width={24} height={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">47</div>
                                        <p className="text-sm text-gray-600">Active Realtors</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <Image src="/dashboard/leads.svg" alt="leads icon" width={24} height={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">1,208</div>
                                        <p className="text-sm text-gray-600">Leads Received</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <Image src="/dashboard/box3.svg" alt="commissions icon" width={24} height={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">₦18,200,000</div>
                                        <p className="text-sm text-gray-600">Total Commissions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leads Overtime Chart */}
                        <div className="mb-8">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Overtime</h3>
                                <div className="h-64 relative">
                                    {/* Chart container */}
                                    <div className="relative h-full w-full">
                                        {/* Y-axis labels */}
                                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                                            <span>800</span>
                                            <span>600</span>
                                            <span>400</span>
                                            <span>200</span>
                                            <span>0</span>
                                        </div>

                                        {/* Chart area */}
                                        <div className="ml-8 h-full relative">
                                            {/* Grid lines */}
                                            <div className="absolute inset-0 flex flex-col justify-between">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="border-t border-gray-200"></div>
                                                ))}
                                            </div>

                                            {/* Chart line with SVG */}
                                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200">
                                                <polyline
                                                    points="50,150 120,100 190,130 260,60 330,40 400,150 470,100 540,40"
                                                    fill="none"
                                                    stroke="#703BF7"
                                                    strokeWidth="2"
                                                />
                                                {/* Data points */}
                                                {[
                                                    { x: 50, y: 150, value: '350' },
                                                    { x: 120, y: 100, value: '500' },
                                                    { x: 190, y: 130, value: '400' },
                                                    { x: 260, y: 60, value: '700' },
                                                    { x: 330, y: 40, value: '800' },
                                                    { x: 400, y: 150, value: '100' },
                                                    { x: 470, y: 100, value: '375' },
                                                    { x: 540, y: 40, value: '735' }
                                                ].map((point, index) => (
                                                    <g key={index}>
                                                        <circle cx={point.x} cy={point.y} r="4" fill="#703BF7" />
                                                        {index === 6 && (
                                                            <g>
                                                                <rect x={point.x - 15} y={point.y - 25} width="30" height="20" rx="4" fill="#333" />
                                                                <text x={point.x} y={point.y - 10} textAnchor="middle" fill="white" fontSize="12">{point.value}</text>
                                                            </g>
                                                        )}
                                                    </g>
                                                ))}
                                            </svg>
                                        </div>

                                        {/* X-axis labels */}
                                        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2">
                                            <span>JAN</span>
                                            <span>FEB</span>
                                            <span>MAR</span>
                                            <span>APR</span>
                                            <span>MAY</span>
                                            <span>JUN</span>
                                            <span>JUL</span>
                                            <span>AUG</span>
                                            <span>SEP</span>
                                            <span>OCT</span>
                                            <span>NOV</span>
                                            <span>DEC</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Three Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Activity */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-4 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentActivity.slice(0, 4).map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-medium text-gray-600">
                                                    {activity.user.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                                                <p className="text-xs text-gray-500">{activity.action}</p>
                                                <p className="text-xs text-gray-400">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Summary */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-4 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">System Summary</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Page Impressions</span>
                                        <span className="text-sm font-medium text-gray-900">9k</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Leads This Week</span>
                                        <span className="text-sm font-medium text-gray-900">64,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Properties Sold This Week</span>
                                        <span className="text-sm font-medium text-gray-900">489</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Active Listings</span>
                                        <span className="text-sm font-medium text-gray-900">1,200</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Avg Commission Rate</span>
                                        <span className="text-sm font-medium text-gray-900">5.6%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Top 4 Performing Realtors */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Top 4 performing realtors</h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-[#703BF7] rounded-full"></div>
                                            <span className="text-xs text-gray-600">Leads</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-[#703BF780] rounded-full"></div>
                                            <span className="text-xs text-gray-600">Sales</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-4">
                                    {[
                                        { name: 'Emanuel A.', leadsWidth: 85, salesWidth: 65 },
                                        { name: 'Adamson S.', leadsWidth: 60, salesWidth: 45 },
                                        { name: 'Tolu D.', leadsWidth: 75, salesWidth: 50 },
                                        { name: 'Favour A.', leadsWidth: 45, salesWidth: 35 },
                                    ].map((realtor, index) => (
                                        <div key={index} className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-900">{realtor.name}</span>
                                                <div className="flex items-center space-x-6 text-xs text-gray-500">
                                                    <span>7%</span>
                                                    <span>10%</span>
                                                    <span>15%</span>
                                                    <span>65%</span>
                                                </div>
                                            </div>
                                            {/* Separate Progress Bars */}
                                            <div className="space-y-2">
                                                {/* Leads Progress Bar */}
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className="bg-[#703BF7] h-1.5 rounded-full"
                                                        style={{ width: `${realtor.leadsWidth}%` }}
                                                    ></div>
                                                </div>
                                                {/* Sales Progress Bar */}
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className="bg-[#703BF780] h-1.5 rounded-full"
                                                        style={{ width: `${realtor.salesWidth}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                        <p className="text-gray-600 mb-6">Are you sure you want to log out of your admin account?</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle logout logic here
                                    setShowLogoutModal(false);
                                }}
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