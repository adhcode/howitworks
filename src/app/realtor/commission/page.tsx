'use client'

import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

// Dummy data for commissions
const commissions = [
    {
        client: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        amount: '₦50,000',
        date: 'Aug 3, 2025',
        status: 'Paid',
    },
    {
        client: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        amount: '₦30,000',
        date: 'Aug 3, 2025',
        status: 'Pending',
    },
    {
        client: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        amount: '₦50,000',
        date: 'Aug 3, 2025',
        status: 'Paid',
        highlighted: true,
    },
    {
        client: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        amount: '₦30,000',
        date: 'Aug 3, 2025',
        status: 'Pending',
    },
    {
        client: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        amount: '₦50,000',
        date: 'Aug 3, 2025',
        status: 'Paid',
    },
    {
        client: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        amount: '₦30,000',
        date: 'Aug 3, 2025',
        status: 'Pending',
    },
    {
        client: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        amount: '₦50,000',
        date: 'Aug 3, 2025',
        status: 'Paid',
    },
    {
        client: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        amount: '₦30,000',
        date: 'Aug 3, 2025',
        status: 'Pending',
    }
];

// Helper to get color for status
const statusColor = {
    Paid: 'text-green-600',
    Pending: 'text-orange-600',
};

export default function CommissionPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="commission"
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
                        {/* Header with Request Payout button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Commission</h2>
                            <button className="px-6 py-3 bg-[#8157FF] text-white rounded-md font-medium hover:bg-[#6d49e0] w-full sm:w-auto">
                                Request Payout
                            </button>
                        </div>

                        {/* Stats cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xl lg:text-2xl font-bold text-gray-900">₦850,000</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Total Commissions</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-blue-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xl lg:text-2xl font-bold text-gray-900">₦150,000</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Pending Commissions</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-orange-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xl lg:text-2xl font-bold text-gray-900">₦700,000</p>
                                        <p className="text-xs lg:text-sm text-gray-500">Paid Commissions</p>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 lg:w-6 lg:h-6 bg-green-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Commission breakdown table */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Commission Breakdown</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Property</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {commissions.map((commission, idx) => (
                                            <tr
                                                key={idx}
                                                className={`hover:bg-gray-50 ${commission.highlighted ? 'border-2 border-dashed border-blue-300 bg-blue-50' : ''
                                                    }`}
                                            >
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div>
                                                        <div className="font-medium">{commission.client}</div>
                                                        <div className="text-xs text-gray-500 sm:hidden">{commission.property}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{commission.property}</td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{commission.amount}</td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">{commission.date}</td>
                                                <td className={`px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor[commission.status as keyof typeof statusColor]}`}>
                                                    {commission.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-4 lg:px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-500">Showing 1-10 from 100</p>
                                    <div className="flex items-center space-x-1">
                                        <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&lt;</button>
                                        <button className="px-3 py-1 text-sm bg-[#8157FF] text-white rounded">1</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hidden sm:inline-block">4</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hidden sm:inline-block">5</button>
                                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hidden sm:inline-block">6</button>
                                        <span className="px-2 py-1 text-sm text-gray-500 hidden sm:inline">...</span>
                                        <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">&gt;</button>
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