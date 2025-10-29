'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface LeadsData {
    stats: {
        totalLeads: number;
        newLeads: number;
        contactedLeads: number;
        qualifiedLeads: number;
        convertedLeads: number;
        lostLeads: number;
    };
    leads: Array<{
        id: string;
        name: string;
        email: string;
        phone?: string;
        message?: string;
        status: string;
        source?: string;
        createdAt: string;
        property?: {
            title: string;
            location: string;
        };
    }>;
}

export default function LeadsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [leadsData, setLeadsData] = useState<LeadsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchLeadsData = async () => {
            try {
                setLoading(true);
                const baseUrl = typeof window !== 'undefined'
                    ? window.location.origin
                    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

                const response = await fetch(`${baseUrl}/api/realtor/leads`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setLeadsData(data);
            } catch (error) {
                console.error('Error in fetchLeadsData:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch leads data');
            } finally {
                setLoading(false);
            }
        };

        fetchLeadsData();
    }, []);

    const handleStatusChange = async (leadId: string, newStatus: string) => {
        try {
            const baseUrl = typeof window !== 'undefined'
                ? window.location.origin
                : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/realtor/leads`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ leadId, status: newStatus }),
            });

            if (response.ok) {
                // Refresh the leads data
                window.location.reload();
            } else {
                alert('Failed to update lead status');
            }
        } catch (error) {
            console.error('Error updating lead status:', error);
            alert('Error updating lead status');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'converted':
                return 'text-green-600';
            case 'contacted':
            case 'qualified':
                return 'text-blue-600';
            case 'new':
                return 'text-orange-600';
            default:
                return 'text-red-600';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'converted':
                return 'Converted';
            case 'contacted':
            case 'qualified':
                return 'Connected';
            case 'new':
                return 'Not Connected';
            default:
                return 'Not Connected';
        }
    };

    const filteredLeads = leadsData?.leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.property?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.property?.location || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading leads...</p>
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

    if (!leadsData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-600">No leads data available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="leads"
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Leads</h1>
                            <p className="text-gray-600">List of all clients you've brought in via your referral link</p>
                        </div>

                        {/* Recent Leads Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
                            </div>

                            {/* Search and Filters */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                    <div className="relative flex-1 max-w-md">
                                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="search by property name, address, client..."
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Enquired</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enquiry Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredLeads.length > 0 ? (
                                            filteredLeads.map((lead) => (
                                                <tr key={lead.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                        <div className="text-sm text-gray-500">{lead.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {lead.property?.title || 'General Enquiry'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {lead.property?.location || 'Lekki Phase 1, Lagos'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`text-sm font-medium ${getStatusColor(lead.status)}`}>
                                                            {getStatusLabel(lead.status)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                    {searchTerm ? 'No leads found matching your search' : 'No leads found'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {filteredLeads.length > 0 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Showing 1-{Math.min(filteredLeads.length, 10)} from {filteredLeads.length}
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
        </div>
    );
}