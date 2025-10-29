'use client'

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Chart data for Leads & Conversion Trends
const chartData = [
    { month: 'JAN', leads: 400, conversions: 150 },
    { month: 'FEB', leads: 450, conversions: 180 },
    { month: 'MAR', leads: 480, conversions: 220 },
    { month: 'APR', leads: 420, conversions: 280 },
    { month: 'MAY', leads: 500, conversions: 320 },
    { month: 'JUN', leads: 650, conversions: 380 },
    { month: 'JUL', leads: 580, conversions: 300 },
    { month: 'AUG', leads: 720, conversions: 420 },
    { month: 'SEP', leads: 650, conversions: 380 },
    { month: 'OCT', leads: 480, conversions: 280 },
    { month: 'NOV', leads: 520, conversions: 320 },
    { month: 'DEC', leads: 650, conversions: 400 }
];

// Chart dimensions
const chartWidth = 800;
const chartHeight = 300;
const padding = 60;

export default function Analytics() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('This year');

    // Calculate chart points for leads
    const maxLeads = Math.max(...chartData.map(d => d.leads));
    const minLeads = Math.min(...chartData.map(d => d.leads));
    const leadsRange = maxLeads - minLeads;

    const leadsPoints = chartData.map((point, index) => ({
        x: padding + (index * ((chartWidth - 2 * padding) / (chartData.length - 1))),
        y: chartHeight - padding - ((point.leads - minLeads) / leadsRange) * (chartHeight - 2 * padding),
        value: point.leads,
        month: point.month
    }));

    // Calculate chart points for conversions
    const maxConversions = Math.max(...chartData.map(d => d.conversions));
    const minConversions = Math.min(...chartData.map(d => d.conversions));
    const conversionsRange = maxConversions - minConversions;

    const conversionsPoints = chartData.map((point, index) => ({
        x: padding + (index * ((chartWidth - 2 * padding) / (chartData.length - 1))),
        y: chartHeight - padding - ((point.conversions - minConversions) / conversionsRange) * (chartHeight - 2 * padding),
        value: point.conversions,
        month: point.month
    }));

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="reports-analytics"
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
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                My performance
                            </h2>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                            >
                                <option>This year</option>
                                <option>Last year</option>
                                <option>2023</option>
                            </select>
                        </div>

                        {/* Performance Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">125</div>
                                <div className="text-sm text-gray-500">Total Properties Listed</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">912</div>
                                <div className="text-sm text-gray-500">Enquiries Received</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">12.5%</div>
                                <div className="text-sm text-gray-500">Overall Conversion Rate</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">₦12,400,000</div>
                                <div className="text-sm text-gray-500">Commissions Paid</div>
                            </div>
                        </div>

                        {/* Performance Tables */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Top Performing Properties */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Top Performing Properties</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    {/* Desktop Table */}
                                    <div className="hidden sm:block">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Property Title</th>
                                                    <th className="px-4 py-3 text-center font-medium text-gray-700">View</th>
                                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Enquiries</th>
                                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Conversions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">4 Bed Duplex</p>
                                                            <p className="text-gray-500">Lekki</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">128</td>
                                                    <td className="px-4 py-3 text-center">45</td>
                                                    <td className="px-4 py-3 text-center">12</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">3 Bed Apartment</p>
                                                            <p className="text-gray-500">Victoria Island</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">116</td>
                                                    <td className="px-4 py-3 text-center">28</td>
                                                    <td className="px-4 py-3 text-center">9</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">5 Bed Duplex</p>
                                                            <p className="text-gray-500">Ikoyi</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">454</td>
                                                    <td className="px-4 py-3 text-center">104</td>
                                                    <td className="px-4 py-3 text-center">18</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">Land</p>
                                                            <p className="text-gray-500">Sangotedo</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">235</td>
                                                    <td className="px-4 py-3 text-center">128</td>
                                                    <td className="px-4 py-3 text-center">5</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">3 Bed Duplex</p>
                                                            <p className="text-gray-500">Lekki</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">407</td>
                                                    <td className="px-4 py-3 text-center">108</td>
                                                    <td className="px-4 py-3 text-center">6</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Cards */}
                                    <div className="sm:hidden space-y-3 p-4">
                                        {[
                                            { title: '4 Bed Duplex', location: 'Lekki', views: 128, enquiries: 45, conversions: 12 },
                                            { title: '3 Bed Apartment', location: 'Victoria Island', views: 116, enquiries: 28, conversions: 9 },
                                            { title: '5 Bed Duplex', location: 'Ikoyi', views: 454, enquiries: 104, conversions: 18 },
                                            { title: 'Land', location: 'Sangotedo', views: 235, enquiries: 128, conversions: 5 },
                                            { title: '3 Bed Duplex', location: 'Lekki', views: 407, enquiries: 108, conversions: 6 }
                                        ].map((property, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-3">
                                                <div className="font-medium text-gray-900">{property.title}</div>
                                                <div className="text-sm text-gray-500 mb-2">{property.location}</div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div>Views: {property.views}</div>
                                                    <div>Enquiries: {property.enquiries}</div>
                                                    <div>Conversions: {property.conversions}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Top Performing Realtors */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Top Performing Realtors</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    {/* Desktop Table */}
                                    <div className="hidden sm:block">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Realtor Name</th>
                                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Leads</th>
                                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Sales</th>
                                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Commission</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-gray-900">Emeka Obi</td>
                                                    <td className="px-4 py-3 text-center">122</td>
                                                    <td className="px-4 py-3 text-center">28</td>
                                                    <td className="px-4 py-3 text-center">₦5,500,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-gray-900">Emeka Obi</td>
                                                    <td className="px-4 py-3 text-center">215</td>
                                                    <td className="px-4 py-3 text-center">28</td>
                                                    <td className="px-4 py-3 text-center">₦5,500,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-gray-900">Emeka Obi</td>
                                                    <td className="px-4 py-3 text-center">454</td>
                                                    <td className="px-4 py-3 text-center">104</td>
                                                    <td className="px-4 py-3 text-center">₦5,500,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-gray-900">Emeka Obi</td>
                                                    <td className="px-4 py-3 text-center">294</td>
                                                    <td className="px-4 py-3 text-center">104</td>
                                                    <td className="px-4 py-3 text-center">₦5,500,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-medium text-gray-900">Emeka Obi</td>
                                                    <td className="px-4 py-3 text-center">447</td>
                                                    <td className="px-4 py-3 text-center">104</td>
                                                    <td className="px-4 py-3 text-center">₦5,500,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Cards */}
                                    <div className="sm:hidden space-y-3 p-4">
                                        {[
                                            { name: 'Emeka Obi', leads: 122, sales: 28, commission: '₦5,500,000' },
                                            { name: 'Emeka Obi', leads: 215, sales: 28, commission: '₦5,500,000' },
                                            { name: 'Emeka Obi', leads: 454, sales: 104, commission: '₦5,500,000' },
                                            { name: 'Emeka Obi', leads: 294, sales: 104, commission: '₦5,500,000' },
                                            { name: 'Emeka Obi', leads: 447, sales: 104, commission: '₦5,500,000' }
                                        ].map((realtor, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-3">
                                                <div className="font-medium text-gray-900 mb-2">{realtor.name}</div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div>Leads: {realtor.leads}</div>
                                                    <div>Sales: {realtor.sales}</div>
                                                    <div>Commission: {realtor.commission}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leads & Conversion Trends Chart */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Leads & Conversion Trends</h3>
                                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-[#703BF7] rounded-full"></div>
                                        <span className="text-sm text-gray-600">Leads</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Conversions</span>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="relative min-w-[600px] lg:min-w-0">
                                    <svg width={chartWidth} height={chartHeight} className="w-full">
                                        {/* Grid lines */}
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <line
                                                key={i}
                                                x1={padding}
                                                y1={padding + (i * (chartHeight - 2 * padding) / 4)}
                                                x2={chartWidth - padding}
                                                y2={padding + (i * (chartHeight - 2 * padding) / 4)}
                                                stroke="#e5e7eb"
                                                strokeWidth="1"
                                            />
                                        ))}

                                        {/* Leads line */}
                                        <polyline
                                            points={leadsPoints.map(p => `${p.x},${p.y}`).join(' ')}
                                            fill="none"
                                            stroke="#703BF7"
                                            strokeWidth="3"
                                            strokeDasharray="5,5"
                                        />

                                        {/* Conversions line */}
                                        <polyline
                                            points={conversionsPoints.map(p => `${p.x},${p.y}`).join(' ')}
                                            fill="none"
                                            stroke="#ec4899"
                                            strokeWidth="3"
                                        />

                                        {/* Data points for leads */}
                                        {leadsPoints.map((point, index) => (
                                            <circle
                                                key={`leads-${index}`}
                                                cx={point.x}
                                                cy={point.y}
                                                r="4"
                                                fill="#703BF7"
                                            />
                                        ))}

                                        {/* Data points for conversions */}
                                        {conversionsPoints.map((point, index) => (
                                            <circle
                                                key={`conversions-${index}`}
                                                cx={point.x}
                                                cy={point.y}
                                                r="4"
                                                fill="#ec4899"
                                            />
                                        ))}

                                        {/* X-axis labels */}
                                        {leadsPoints.map((point, index) => (
                                            <text
                                                key={index}
                                                x={point.x}
                                                y={chartHeight - 10}
                                                textAnchor="middle"
                                                className="text-xs fill-gray-500"
                                            >
                                                {point.month}
                                            </text>
                                        ))}

                                        {/* Y-axis labels */}
                                        {[0, 200, 400, 600, 800].map((value, index) => (
                                            <text
                                                key={index}
                                                x={padding - 10}
                                                y={chartHeight - padding - (index * (chartHeight - 2 * padding) / 4) + 5}
                                                textAnchor="end"
                                                className="text-xs fill-gray-500"
                                            >
                                                {value}
                                            </text>
                                        ))}
                                    </svg>
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