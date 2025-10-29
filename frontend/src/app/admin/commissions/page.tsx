'use client'

import React, { useState } from 'react';
import { FiCheck, FiX, FiCheckCircle } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useCommissions } from '../../../hooks/use-commissions';
import { useAuth } from '../../providers/auth-provider';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminCommissionsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    
    const { logout } = useAuth();
    const { commissions, isLoading, updateCommissionStatus } = useCommissions();

    const filteredCommissions = commissions?.filter(commission => 
        statusFilter === 'all' || commission.status === statusFilter
    ) || [];

    const stats = {
        total: commissions?.length || 0,
        pending: commissions?.filter(c => c.status === 'pending').length || 0,
        approved: commissions?.filter(c => c.status === 'approved').length || 0,
        paid: commissions?.filter(c => c.status === 'paid').length || 0,
        totalAmount: commissions?.reduce((sum, c) => sum + c.amount, 0) || 0,
        pendingAmount: commissions?.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0) || 0,
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-blue-100 text-blue-800';
            case 'paid': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStatusUpdate = async (commissionId: string, newStatus: string) => {
        try {
            await updateCommissionStatus(commissionId, newStatus);
            toast.success(`Commission ${newStatus} successfully!`);
        } catch (error) {
            toast.error('Failed to update commission status');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Toaster />
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="commission"
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
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
                    currentPage="commission"
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
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Commission Management</h1>
                                <p className="text-gray-600 mt-1">Track and manage realtor commissions</p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Commissions</p>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                        </div>
                                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Pending</p>
                                            <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{formatCurrency(stats.pendingAmount)}</p>
                                        </div>
                                        <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Approved</p>
                                            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.approved}</p>
                                        </div>
                                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Paid</p>
                                            <p className="text-2xl font-bold text-green-600 mt-1">{stats.paid}</p>
                                        </div>
                                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'pending', 'approved', 'paid', 'rejected'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setStatusFilter(status)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                statusFilter === status
                                                    ? 'bg-[#703BF7] text-white shadow-sm'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Commissions Table - Desktop */}
                            <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Realtor
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Property
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCommissions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg font-medium">No commissions found</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {statusFilter === 'all' 
                                                    ? 'Commissions will appear here when leads are converted'
                                                    : `No ${statusFilter} commissions at the moment`}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCommissions.map((commission) => (
                                    <tr key={commission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <span className="text-purple-600 font-medium text-sm">
                                                        {commission.realtor?.user?.firstName?.[0]}{commission.realtor?.user?.lastName?.[0]}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {commission.realtor?.user?.firstName} {commission.realtor?.user?.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{commission.realtor?.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900">{commission.lead?.property?.title}</p>
                                            <p className="text-xs text-gray-500">{commission.lead?.property?.location}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-semibold text-gray-900">{formatCurrency(commission.amount)}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                                                {commission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(commission.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                {commission.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(commission.id, 'approved')}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors font-medium text-xs"
                                                        >
                                                            <FiCheck className="w-3.5 h-3.5" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(commission.id, 'rejected')}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors font-medium text-xs"
                                                        >
                                                            <FiX className="w-3.5 h-3.5" />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {commission.status === 'approved' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(commission.id, 'paid')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors font-medium text-xs"
                                                    >
                                                        <FiCheckCircle className="w-3.5 h-3.5" />
                                                        Mark Paid
                                                    </button>
                                                )}
                                                {commission.status === 'paid' && (
                                                    <span className="text-gray-500 text-xs">Completed</span>
                                                )}
                                                {commission.status === 'rejected' && (
                                                    <span className="text-gray-500 text-xs">Rejected</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Commissions Cards - Mobile */}
                            <div className="md:hidden space-y-4">
                                {filteredCommissions.length === 0 ? (
                                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                                        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">No commissions found</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {statusFilter === 'all' 
                                                ? 'Commissions will appear here when leads are converted'
                                                : `No ${statusFilter} commissions at the moment`}
                                        </p>
                                    </div>
                                ) : (
                                    filteredCommissions.map((commission) => (
                                        <div key={commission.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                            {/* Realtor Info */}
                                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-purple-600 font-medium text-sm">
                                                        {commission.realtor?.user?.firstName?.[0]}{commission.realtor?.user?.lastName?.[0]}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {commission.realtor?.user?.firstName} {commission.realtor?.user?.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">{commission.realtor?.user?.email}</p>
                                                </div>
                                            </div>

                                            {/* Property Info */}
                                            <div className="mb-3">
                                                <p className="text-xs text-gray-500 mb-1">Property</p>
                                                <p className="text-sm font-medium text-gray-900">{commission.lead?.property?.title}</p>
                                                <p className="text-xs text-gray-500">{commission.lead?.property?.location}</p>
                                            </div>

                                            {/* Amount & Status */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Amount</p>
                                                    <p className="text-lg font-bold text-gray-900">{formatCurrency(commission.amount)}</p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                                                    {commission.status}
                                                </span>
                                            </div>

                                            {/* Date */}
                                            <p className="text-xs text-gray-500 mb-3">
                                                Created: {formatDate(commission.createdAt)}
                                            </p>

                                            {/* Actions */}
                                            <div className="flex flex-wrap gap-2">
                                                {commission.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(commission.id, 'approved')}
                                                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors font-medium text-xs"
                                                        >
                                                            <FiCheck className="w-3.5 h-3.5" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(commission.id, 'rejected')}
                                                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors font-medium text-xs"
                                                        >
                                                            <FiX className="w-3.5 h-3.5" />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {commission.status === 'approved' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(commission.id, 'paid')}
                                                        className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors font-medium text-xs"
                                                    >
                                                        <FiCheckCircle className="w-3.5 h-3.5" />
                                                        Mark Paid
                                                    </button>
                                                )}
                                                {commission.status === 'paid' && (
                                                    <span className="text-gray-500 text-xs">✓ Completed</span>
                                                )}
                                                {commission.status === 'rejected' && (
                                                    <span className="text-gray-500 text-xs">✗ Rejected</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
