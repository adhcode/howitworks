'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiFilter, FiEye, FiEdit, FiTrash, FiPlus, FiCopy } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useRealtors } from '../../../hooks/use-realtors';
import { useAuth } from '../../providers/auth-provider';
import toast, { Toaster } from 'react-hot-toast';

export default function ManageRealtors() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const { logout } = useAuth();
    const { realtors, loading, error, pagination, refetch } = useRealtors({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter
    });

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
        refetch({ page: 1, limit: 10, search: term, status: statusFilter });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        setCurrentPage(1);
        refetch({ page: 1, limit: 10, search: searchTerm, status });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        refetch({ page, limit: 10, search: searchTerm, status: statusFilter });
    };

    const copyReferralLink = (realtorSlug: string) => {
        const referralLink = `${window.location.origin}?ref=${realtorSlug}`;
        navigator.clipboard.writeText(referralLink).then(() => {
            toast.success('Referral link copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy referral link');
        });
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Toaster />
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="manage-realtors"
                        onLogout={logout}
                    />
                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                            {/* Header Skeleton */}
                            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                <div>
                                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            {/* Search Skeleton */}
                            <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Cards Skeleton */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse"></div>
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

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="manage-realtors"
                        onLogout={() => setShowLogoutModal(true)}
                    />
                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <p className="text-red-600 mb-4">{error}</p>
                                    <button 
                                        onClick={() => refetch()}
                                        className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5a2fd4]"
                                    >
                                        Try Again
                                    </button>
                                </div>
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
                    currentPage="manage-realtors"
                    onLogout={logout}
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Realtor Management</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and monitor all realtors</p>
                            </div>
                            <Link
                                href="/admin/realtors/add"
                                className="flex items-center justify-center px-5 py-2.5 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2fd4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#703BF7] transition-colors shadow-sm font-medium text-sm sm:text-base"
                            >
                                <FiPlus className="w-5 h-5 mr-2" />
                                Add New Realtor
                            </Link>
                        </div>

                        {/* Search and Filter */}
                        <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <FiSearch className="w-5 h-5 text-[#703BF7]" />
                                <span className="text-sm font-semibold text-gray-900">Search & Filter</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                        Search Realtors
                                    </label>
                                    <div className="relative">
                                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or email..."
                                            value={searchTerm}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                        Filter by Status
                                    </label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => handleStatusFilter(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors bg-white"
                                    >
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Filters */}
                            {(searchTerm || statusFilter) && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-medium text-gray-600">Active filters:</span>
                                        {searchTerm && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                                Search: {searchTerm}
                                                <button
                                                    onClick={() => handleSearch('')}
                                                    className="hover:bg-[#703BF7]/20 rounded-full p-0.5"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {statusFilter && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                                Status: {statusFilter}
                                                <button
                                                    onClick={() => handleStatusFilter('')}
                                                    className="hover:bg-[#703BF7]/20 rounded-full p-0.5"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        <button
                                            onClick={() => {
                                                handleSearch('');
                                                handleStatusFilter('');
                                            }}
                                            className="text-xs text-gray-600 hover:text-gray-900 font-medium underline"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Realtors Grid */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Realtors
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {realtors.length} realtor{realtors.length !== 1 ? 's' : ''} found
                                    </p>
                                </div>
                            </div>

                            {realtors.length === 0 ? (
                                <div className="text-center py-16 px-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No realtors found</h3>
                                    <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                                        {searchTerm || statusFilter ? 'Try adjusting your search or filters' : 'Get started by adding your first realtor'}
                                    </p>
                                    {!searchTerm && !statusFilter && (
                                        <Link
                                            href="/admin/realtors/add"
                                            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-[#703BF7] hover:bg-[#5a2fd4] transition-colors"
                                        >
                                            <FiPlus className="w-5 h-5 mr-2" />
                                            Add Your First Realtor
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {realtors.map((realtor) => (
                                            <div key={realtor.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#703BF7]/30 transition-all duration-300">
                                                {/* Card Header */}
                                                <div className="bg-gradient-to-br from-[#703BF7]/5 to-[#703BF7]/10 p-4 border-b border-gray-100">
                                                    <div className="flex items-start justify-between mb-3">
                                                        {/* Avatar & Name */}
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <div className="w-12 h-12 bg-[#703BF7] rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                                                                {realtor.user.firstName.charAt(0)}{realtor.user.lastName.charAt(0)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-base font-semibold text-gray-900 truncate">
                                                                    {realtor.user.firstName} {realtor.user.lastName}
                                                                </h4>
                                                                <p className="text-xs text-gray-500 truncate">
                                                                    {realtor.user.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* Status Badge */}
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                                                            realtor.user.isActive 
                                                                ? 'bg-green-500 text-white' 
                                                                : 'bg-red-500 text-white'
                                                        }`}>
                                                            {realtor.user.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="p-4 space-y-3">
                                                    {/* Contact Info */}
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-center text-gray-600">
                                                            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <span className="truncate">{realtor.phoneNumber || 'No phone'}</span>
                                                        </div>
                                                    </div>

                                                    {/* Stats */}
                                                    {realtor._count && (
                                                        <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                                                            <div className="flex items-center gap-1 text-gray-600">
                                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                                <span>{realtor._count.properties || 0} properties</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-gray-600">
                                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                                <span>{realtor._count.leads || 0} leads</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Referral Link */}
                                                    <button 
                                                        onClick={() => copyReferralLink(realtor.slug)}
                                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#703BF7]/10 text-[#703BF7] rounded-lg hover:bg-[#703BF7]/20 transition-colors text-sm font-medium"
                                                    >
                                                        <FiCopy className="w-4 h-4" />
                                                        Copy Referral Link
                                                    </button>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <Link 
                                                            href={`/admin/realtors/${realtor.id}`}
                                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                                        >
                                                            <FiEye className="w-4 h-4" />
                                                            View
                                                        </Link>
                                                        <Link 
                                                            href={`/admin/realtors/edit/${realtor.id}`}
                                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium"
                                                        >
                                                            <FiEdit className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.pages > 1 && (
                            <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    {/* Page Info */}
                                    <div className="text-sm text-gray-600 order-2 sm:order-1">
                                        Showing <span className="font-medium">{((currentPage - 1) * 10) + 1}</span> to{' '}
                                        <span className="font-medium">{Math.min(currentPage * 10, pagination.total)}</span> of{' '}
                                        <span className="font-medium">{pagination.total}</span> realtors
                                    </div>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1 order-1 sm:order-2">
                                        {/* Previous Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Previous
                                        </button>

                                        {/* Page Numbers - Show limited on mobile */}
                                        <div className="hidden sm:flex items-center gap-1">
                                            {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                                                let pageNum;
                                                if (pagination.pages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= pagination.pages - 2) {
                                                    pageNum = pagination.pages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                                            pageNum === currentPage
                                                                ? 'bg-[#703BF7] text-white'
                                                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Mobile: Current Page Indicator */}
                                        <div className="sm:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg">
                                            Page {currentPage} of {pagination.pages}
                                        </div>

                                        {/* Next Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === pagination.pages}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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