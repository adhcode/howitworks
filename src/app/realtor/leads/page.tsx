'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Dummy data for leads
const leads = [
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Not Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Converted',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Not Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Converted',
    },
    {
        name: 'Tolu Akinbo',
        property: '4-Bed Duplex, Lekki',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Not Connected',
    },
    {
        name: 'Tolu Akinbo',
        property: 'Land, Sangotedo',
        location: 'Lekki Phase 1, Lagos',
        date: 'Aug 3, 2025',
        status: 'Converted',
    }
];

// Helper to get color for status
const statusColor = {
    Connected: 'text-blue-600',
    'Not Connected': 'text-red-600',
    Converted: 'text-green-600',
};

export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilterDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter leads based on search term and status filter
    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="leads"
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
                        <div className="mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">My Leads</h2>
                            <p className="text-sm text-gray-600 mt-1">List of all clients you've brought in via your referral link</p>
                        </div>

                        {/* Search and filters */}
                        <div className="mb-6 flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8157FF] focus:border-[#8157FF]"
                                />
                            </div>
                            <div className="relative" ref={filterRef}>
                                <button
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-[#8157FF] focus:border-[#8157FF] w-full sm:w-auto justify-center"
                                >
                                    <Image
                                        src="/dashboard/filter.svg"
                                        alt="Filter"
                                        width={16}
                                        height={16}
                                    />
                                    Filter {statusFilter !== 'All' && `(${statusFilter})`}
                                </button>

                                {/* Filter dropdown */}
                                {showFilterDropdown && (
                                    <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-full">
                                        {['All', 'Connected', 'Not Connected', 'Converted'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setStatusFilter(status);
                                                    setShowFilterDropdown(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${statusFilter === status ? 'bg-[#8157FF] bg-opacity-10 text-[#8157FF]' : 'text-gray-700'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Leads table */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Property Enquired</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Enquiry Date</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredLeads.map((lead, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div>
                                                        <div className="font-medium">{lead.name}</div>
                                                        <div className="text-xs text-gray-500 sm:hidden">{lead.property}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{lead.property}</td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{lead.location}</td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">{lead.date}</td>
                                                <td className={`px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor[lead.status as keyof typeof statusColor]}`}>
                                                    {lead.status}
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredLeads.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-4 lg:px-6 py-8 text-center text-gray-500">
                                                    No leads found matching your criteria.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-4 lg:px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-500">Showing {filteredLeads.length} from {leads.length}</p>
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