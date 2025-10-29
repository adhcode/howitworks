'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiFilter, FiEye, FiMail, FiPhone, FiUser, FiMapPin, FiCalendar } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useLeads } from '../../../hooks/use-leads';
import { useAuth } from '../../providers/auth-provider';
import toast, { Toaster } from 'react-hot-toast';
import { leadApi } from '../../../lib/api-endpoints';

export default function ManageEnquiries() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    const { logout } = useAuth();
    const { leads, loading, error, pagination, refetch } = useLeads({
        page: currentPage,
        limit: 12,
        status: statusFilter,
        source: sourceFilter,
        search: searchTerm
    });

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const handleSourceFilter = (source: string) => {
        setSourceFilter(source);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new':
                return 'bg-blue-500 text-white';
            case 'contacted':
                return 'bg-yellow-500 text-white';
            case 'qualified':
                return 'bg-purple-500 text-white';
            case 'viewing_scheduled':
                return 'bg-indigo-500 text-white';
            case 'converted':
                return 'bg-green-500 text-white';
            case 'lost':
            case 'rejected':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getSourceBadge = (source?: string) => {
        if (!source) return null;
        
        const badges: Record<string, { color: string; label: string }> = {
            referral_link: { color: 'bg-purple-100 text-purple-800', label: '🔗 Referral' },
            property_listing: { color: 'bg-blue-100 text-blue-800', label: '🏠 Property' },
            direct_inquiry: { color: 'bg-gray-100 text-gray-800', label: '📝 Direct' },
            website_form: { color: 'bg-green-100 text-green-800', label: '🌐 Website' },
        };
        
        return badges[source] || { color: 'bg-gray-100 text-gray-800', label: source };
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleViewDetails = (lead: any) => {
        setSelectedLead(lead);
        setShowDetailModal(true);
    };

    const handleUpdateStatus = async (leadId: string, newStatus: string) => {
        try {
            await leadApi.updateStatus(leadId, newStatus);
            toast.success('Status updated successfully!');
            refetch();
            if (selectedLead?.id === leadId) {
                setSelectedLead({ ...selectedLead, status: newStatus });
            }
        } catch (error: any) {
            toast.error(error?.message || 'Failed to update status');
        }
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Toaster />
                <div className="flex">
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentPage="manage-enquiries" onLogout={logout} />
                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                <div>
                                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            <div className="flex">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentPage="manage-enquiries" onLogout={logout} />
                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Enquiry Management</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">Track and manage all property enquiries</p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <FiFilter className="w-5 h-5 text-[#703BF7]" />
                                <span className="text-sm font-semibold text-gray-900">Search & Filter</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Search</label>
                                    <div className="relative">
                                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                                    <select value={statusFilter} onChange={(e) => handleStatusFilter(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors bg-white">
                                        <option value="">All Status</option>
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="viewing_scheduled">Viewing Scheduled</option>
                                        <option value="converted">Converted</option>
                                        <option value="lost">Lost</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Source</label>
                                    <select value={sourceFilter} onChange={(e) => handleSourceFilter(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors bg-white">
                                        <option value="">All Sources</option>
                                        <option value="referral_link">Referral Link</option>
                                        <option value="property_listing">Property Listing</option>
                                        <option value="direct_inquiry">Direct Inquiry</option>
                                    </select>
                                </div>
                            </div>
                            {(searchTerm || statusFilter || sourceFilter) && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-medium text-gray-600">Active filters:</span>
                                        {searchTerm && (<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                            Search: {searchTerm}<button onClick={() => handleSearch('')} className="hover:bg-[#703BF7]/20 rounded-full p-0.5">×</button></span>)}
                                        {statusFilter && (<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                            Status: {statusFilter}<button onClick={() => handleStatusFilter('')} className="hover:bg-[#703BF7]/20 rounded-full p-0.5">×</button></span>)}
                                        {sourceFilter && (<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                            Source: {sourceFilter}<button onClick={() => handleSourceFilter('')} className="hover:bg-[#703BF7]/20 rounded-full p-0.5">×</button></span>)}
                                        <button onClick={() => { handleSearch(''); handleStatusFilter(''); handleSourceFilter(''); }} className="text-xs text-gray-600 hover:text-gray-900 font-medium underline">Clear all</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Leads Grid */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Enquiries</h3>
                                    <p className="text-sm text-gray-500 mt-1">{leads.length} enquir{leads.length !== 1 ? 'ies' : 'y'} found</p>
                                </div>
                            </div>

                            {leads.length === 0 ? (
                                <div className="text-center py-16 px-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                        <FiMail className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No enquiries found</h3>
                                    <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                                        {searchTerm || statusFilter || sourceFilter ? 'Try adjusting your search or filters' : 'No enquiries have been submitted yet'}
                                    </p>
                                </div>
                            ) : (
                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {leads.map((lead: any) => (
                                            <div key={lead.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#703BF7]/30 transition-all duration-300">
                                                <div className="bg-gradient-to-br from-[#703BF7]/5 to-[#703BF7]/10 p-4 border-b border-gray-100">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <div className="w-12 h-12 bg-[#703BF7] rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                                                                {lead.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-base font-semibold text-gray-900 truncate">{lead.name}</h4>
                                                                <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getStatusColor(lead.status)}`}>
                                                            {lead.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-4 space-y-3">
                                                    {lead.phone && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <FiPhone className="w-4 h-4 mr-2 flex-shrink-0" />
                                                            <span className="truncate">{lead.phone}</span>
                                                        </div>
                                                    )}
                                                    {lead.property && (
                                                        <div className="flex items-start text-sm text-gray-600">
                                                            <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                                            <span className="line-clamp-2">{lead.property.title}</span>
                                                        </div>
                                                    )}
                                                    {lead.realtor && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <FiUser className="w-4 h-4 mr-2 flex-shrink-0" />
                                                            <span className="truncate">{lead.realtor.user.firstName} {lead.realtor.user.lastName}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
                                                        <FiCalendar className="w-3 h-3 mr-1" />
                                                        <span>{formatDate(lead.createdAt)}</span>
                                                        {lead.source && (
                                                            <>
                                                                <span className="mx-2">•</span>
                                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSourceBadge(lead.source)?.color}`}>
                                                                    {getSourceBadge(lead.source)?.label}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <button onClick={() => handleViewDetails(lead)}
                                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2fd4] transition-colors text-sm font-medium">
                                                        <FiEye className="w-4 h-4" />View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-600 order-2 sm:order-1">
                                        Showing <span className="font-medium">{((currentPage - 1) * 12) + 1}</span> to{' '}
                                        <span className="font-medium">{Math.min(currentPage * 12, pagination.total)}</span> of{' '}
                                        <span className="font-medium">{pagination.total}</span> enquiries
                                    </div>
                                    <div className="flex items-center gap-1 order-1 sm:order-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            Previous
                                        </button>
                                        <div className="sm:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg">
                                            Page {currentPage} of {pagination.totalPages}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.totalPages}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedLead && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Enquiry Details</h3>
                            <button onClick={() => setShowDetailModal(false)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#703BF7] rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                                    {selectedLead.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold text-gray-900">{selectedLead.name}</h4>
                                    <p className="text-gray-600">{selectedLead.email}</p>
                                </div>
                                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(selectedLead.status)}`}>
                                    {selectedLead.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedLead.phone && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <FiPhone className="w-5 h-5 text-[#703BF7]" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="text-sm font-medium text-gray-900">{selectedLead.phone}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FiCalendar className="w-5 h-5 text-[#703BF7]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Submitted</p>
                                        <p className="text-sm font-medium text-gray-900">{formatDate(selectedLead.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            {selectedLead.property && (
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-xs font-medium text-blue-800 mb-2">PROPERTY ENQUIRED</p>
                                    <p className="text-sm font-semibold text-gray-900">{selectedLead.property.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{selectedLead.property.location}</p>
                                </div>
                            )}
                            {selectedLead.realtor && (
                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <p className="text-xs font-medium text-purple-800 mb-2">ASSIGNED REALTOR</p>
                                    <p className="text-sm font-semibold text-gray-900">{selectedLead.realtor.user.firstName} {selectedLead.realtor.user.lastName}</p>
                                    <p className="text-xs text-gray-600 mt-1">{selectedLead.realtor.user.email}</p>
                                </div>
                            )}
                            {selectedLead.message && (
                                <div>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Message</p>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{selectedLead.message}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-3">Update Status</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['new', 'contacted', 'qualified', 'viewing_scheduled', 'converted', 'lost'].map((status) => (
                                        <button key={status} onClick={() => handleUpdateStatus(selectedLead.id, status)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                selectedLead.status === status ? getStatusColor(status) : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}>
                                            {status.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
                            <button onClick={() => setShowDetailModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                                Close
                            </button>
                            {selectedLead.phone && (
                                <a href={`tel:${selectedLead.phone}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2fd4] transition-colors">
                                    <FiPhone className="w-4 h-4" />Call Client
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
