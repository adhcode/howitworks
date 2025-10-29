'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiFilter, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useRealtorCommissions, useRequestCommissionPayout } from '../../../hooks/use-commissions';
import { error } from 'console';
import loading from '@/app/loading';

interface CommissionData {
    stats: {
        totalCommissions: number;
        paidCommissions: number;
        pendingCommissions: number;
        totalTransactions: number;
    };
    commissions: Array<{
        id: string;
        client: string;
        amount: number;
        status: string;
        transactionDate: string;
        createdAt: string;
        property?: {
            title: string;
            location: string;
        };
    }>;
}

export default function CommissionPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [payoutStatus, setPayoutStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [payoutMessage, setPayoutMessage] = useState('');
    const router = useRouter();

    // Use React Query hooks
    const { commissions: commissionData, isLoading: loading, error } = useRealtorCommissions();
    const requestPayoutMutation = useRequestCommissionPayout();

    const handleLogout = async () => {
        try {
            // Clerk signOut removed
            router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleRequestPayout = async () => {
        setPayoutStatus('idle');
        setPayoutMessage('');

        try {
            await requestPayoutMutation.requestPayout('payout-request');
            setPayoutStatus('success');
            setPayoutMessage('Payout request submitted successfully! You will receive your payment within 3-5 business days.');
        } catch (error: any) {
            setPayoutStatus('error');
            setPayoutMessage(error?.message || 'Failed to request payout. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowPayoutModal(false);
        setPayoutStatus('idle');
        setPayoutMessage('');
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'text-green-600';
            case 'pending':
                return 'text-orange-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const filteredCommissions = commissionData?.filter((commission: any) =>
        commission.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (commission.property?.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Calculate stats from commission data
    const commissions = commissionData || [];
    const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);
    const paidCommissions = commissions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0);
    const pendingBalance = commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0);
    const canRequestPayout = pendingBalance > 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading commission data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {error || 'Failed to load commission data'}</p>
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

    if (!commissionData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-600">No commission data available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="commission"
                    onLogout={handleLogout}
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header with Request Payout Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Commission</h1>
                            </div>
                            <button
                                onClick={() => setShowPayoutModal(true)}
                                disabled={!canRequestPayout}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${canRequestPayout
                                    ? 'bg-[#8157FF] text-white hover:bg-[#7146E6]'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                title={!canRequestPayout ? 'No pending balance available for withdrawal' : ''}
                            >
                                Request Payout
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">₦{totalCommissions.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">Total Commission Earned</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">₦{pendingBalance.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">Pending Payment</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">₦{paidCommissions.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">Paid Out</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Commission Breakdown Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Commission Breakdown</h3>
                            </div>

                            {/* Search and Filters */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                    <div className="relative flex-1 max-w-md">
                                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search by Client or Property"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8157FF] focus:border-transparent text-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        <FiFilter className="w-4 h-4" />
                                        Filters
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Enquired</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCommissions.length > 0 ? (
                                            filteredCommissions.map((commission) => (
                                                <tr key={commission.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{commission.client}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {commission.property?.title || 'General Property'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            ₦{commission.amount.toLocaleString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`text-sm font-medium ${getStatusColor(commission.status)}`}>
                                                            {getStatusLabel(commission.status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(commission.transactionDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                    {searchTerm ? 'No commissions found matching your search' : 'No commission records found'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {filteredCommissions.length > 0 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Showing 1-{Math.min(filteredCommissions.length, 10)} from {filteredCommissions.length}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">‹</button>
                                            <button className="px-3 py-1 text-sm bg-[#8157FF] text-white rounded">1</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">4</button>
                                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">5</button>
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

            {/* Enhanced Payout Confirmation Modal */}
            {showPayoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Request Payout</h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        {payoutStatus === 'idle' && (
                            <>
                                <div className="mb-6">
                                    {!canRequestPayout ? (
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FiAlertCircle className="w-8 h-8 text-gray-500" />
                                            </div>
                                            <p className="text-gray-600 mb-4">
                                                No pending balance available for withdrawal.
                                            </p>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Available Balance:</span>
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        ₦0
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-gray-600 mb-4">
                                                You are about to request a payout for your pending commissions.
                                            </p>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Pending Amount:</span>
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        ₦{pendingBalance.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        {canRequestPayout ? 'Cancel' : 'Close'}
                                    </button>
                                    {canRequestPayout && (
                                        <button
                                            onClick={handleRequestPayout}
                                            disabled={requestPayoutMutation.isLoading}
                                            className="flex-1 px-4 py-2 bg-[#8157FF] text-white rounded-md hover:bg-[#7146E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {requestPayoutMutation.isLoading ? 'Processing...' : 'Confirm Request'}
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        {payoutStatus === 'success' && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiCheck className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Request Successful!</h4>
                                <p className="text-gray-600 mb-6">{payoutMessage}</p>
                                <button
                                    onClick={handleCloseModal}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {payoutStatus === 'error' && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiAlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Request Failed</h4>
                                <p className="text-gray-600 mb-6">{payoutMessage}</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPayoutStatus('idle');
                                            setPayoutMessage('');
                                        }}
                                        className="flex-1 px-4 py-2 bg-[#8157FF] text-white rounded-md hover:bg-[#7146E6] transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 