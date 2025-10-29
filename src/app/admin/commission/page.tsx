'use client'

import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEye, FiX } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Dummy data for commissions
const commissions = [
    {
        id: 1,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '₦350,000',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 2,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 3,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Pending',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 4,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 5,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 6,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 7,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
    {
        id: 8,
        realtor: 'Fatima Bello',
        propertiesSold: 4,
        period: 'Sept 2025',
        totalPay: '0812 345 6789',
        lastPayout: 'Sept 28, 2025',
        status: 'Paid',
        details: {
            period: 'Sept 1-30, 2025',
            properties: [
                { name: '4 Bed Duplex', location: 'Ikeja', amount: '₦90,000' },
                { name: '3 Bed Apartment', location: 'Lekki', amount: '₦90,000' }
            ],
            totalCommission: '₦180,000',
            walletBank: 'GTBank - 0456547821'
        }
    },
];

type Commission = typeof commissions[0];

export default function Commission() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
    const [showCommissionModal, setShowCommissionModal] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewCommission = (commission: Commission) => {
        setSelectedCommission(commission);
        setShowCommissionModal(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="commission"
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
                                Manage Commission & Payout
                            </h2>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="text-2xl font-bold text-gray-900 mb-1">₦1,240,000</div>
                                <div className="text-sm text-gray-500">Monthly Commissions</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="text-2xl font-bold text-gray-900 mb-1">₦320,000</div>
                                <div className="text-sm text-gray-500">Pending Payouts</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                                <div className="text-sm text-gray-500">Commissions Paid</div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
                                <div className="text-sm text-gray-500">Payments Pending</div>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, property, or realtor"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                />
                            </div>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm lg:text-base">
                                <FiFilter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>

                        {/* Commission Table - Desktop */}
                        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-900">
                                    <div>Realtor</div>
                                    <div>Properties Sold</div>
                                    <div>Period</div>
                                    <div>Total Pay</div>
                                    <div>Last Payout</div>
                                    <div>Status</div>
                                    <div>Action</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {commissions.map((commission) => (
                                    <div key={commission.id} className="px-6 py-4 hover:bg-gray-50">
                                        <div className="grid grid-cols-7 gap-4 items-center">
                                            {/* Realtor */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{commission.realtor}</p>
                                            </div>

                                            {/* Properties Sold */}
                                            <div>
                                                <p className="text-sm text-gray-600">{commission.propertiesSold}</p>
                                            </div>

                                            {/* Period */}
                                            <div>
                                                <p className="text-sm text-gray-600">{commission.period}</p>
                                            </div>

                                            {/* Total Pay */}
                                            <div>
                                                <p className="text-sm text-gray-600">{commission.totalPay}</p>
                                            </div>

                                            {/* Last Payout */}
                                            <div>
                                                <p className="text-sm text-gray-600">{commission.lastPayout}</p>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                                                    {commission.status}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewCommission(commission)}
                                                    className="bg-[#703BF7] text-white px-3 py-1 rounded text-xs hover:bg-[#5f2fd6] transition-colors"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Commission Grid - Mobile/Tablet */}
                        <div className="lg:hidden space-y-4">
                            {commissions.map((commission) => (
                                <div key={commission.id} className="bg-white rounded-lg border border-gray-200 p-4">
                                    <div className="space-y-3">
                                        {/* Realtor and Status */}
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-gray-900">{commission.realtor}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                                                {commission.status}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-500">Properties Sold: {commission.propertiesSold}</p>
                                            <p className="text-xs text-gray-500">Period: {commission.period}</p>
                                            <p className="text-xs text-gray-500">Total Pay: {commission.totalPay}</p>
                                            <p className="text-xs text-gray-500">Last Payout: {commission.lastPayout}</p>
                                        </div>

                                        {/* Action */}
                                        <div className="pt-2">
                                            <button
                                                onClick={() => handleViewCommission(commission)}
                                                className="bg-[#703BF7] text-white px-3 py-1 rounded text-xs hover:bg-[#5f2fd6] transition-colors"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                            <p className="text-sm text-gray-600">
                                Showing 1 to {commissions.length} of 100
                            </p>
                            <div className="flex items-center gap-1 overflow-x-auto">
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    Previous
                                </button>
                                <button className="px-3 py-2 text-sm bg-[#703BF7] text-white rounded-md whitespace-nowrap">
                                    1
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    2
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    3
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    4
                                </button>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    5
                                </button>
                                <span className="px-2 text-sm text-gray-500">...</span>
                                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
                                    Next
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Commission Detail Modal */}
            {showCommissionModal && selectedCommission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Detailed Commission</h3>
                            <button
                                onClick={() => setShowCommissionModal(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 space-y-4">
                            {/* Overview Section */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Overview</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500">Realtor</label>
                                        <p className="text-sm font-medium text-gray-900">Daniel Okoro</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Period</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedCommission.details.period}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Properties Sold</label>
                                        <div className="space-y-1">
                                            {selectedCommission.details.properties.map((property, index) => (
                                                <p key={index} className="text-sm text-gray-600">
                                                    {property.name} - {property.location} = {property.amount}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Total Commission</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedCommission.details.totalCommission}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Wallet/Bank</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedCommission.details.walletBank}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-200">
                            <button className="w-full bg-[#703BF7] text-white px-4 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors">
                                Mark as Paid
                            </button>
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