'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiFilter, FiEye, FiX } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Dummy data for enquiries
const enquiries = [
    {
        id: 1,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'New',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 2,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Contacted',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 3,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Rejected',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 4,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Converted',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 5,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Rejected',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 6,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Converted',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 7,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Converted',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
    {
        id: 8,
        clientName: 'Fatima Bello',
        property: '3 Bed Apartment, Lekki',
        phone: '0812 345 6789',
        realtor: 'Emeka Obi',
        date: 'Oct 5',
        status: 'Converted',
        email: 'example@gmail.com',
        propertyDetails: '3 Bed Apartment, Lekki',
        dateSubmitted: 'Oct 5, 2025',
        message: "I'm interested in this property and would like to book a tour. Please contact me."
    },
];

type Enquiry = typeof enquiries[0];

export default function ManageEnquiries() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New':
                return 'bg-blue-100 text-blue-800';
            case 'Contacted':
                return 'bg-yellow-100 text-yellow-800';
            case 'Converted':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewEnquiry = (enquiry: Enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowEnquiryModal(true);
    };

    const handleStatusChange = (newStatus: string) => {
        if (selectedEnquiry) {
            // Update the enquiry status in the data
            const updatedEnquiry = { ...selectedEnquiry, status: newStatus };
            setSelectedEnquiry(updatedEnquiry);

            // Here you would typically update the backend
            console.log(`Updating enquiry ${selectedEnquiry.id} status to ${newStatus}`);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-enquiries"
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
                                Manage Enquiries
                            </h2>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, property or realtor"
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

                        {/* Enquiries Table - Desktop */}
                        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-900">
                                    <div>Client Name</div>
                                    <div>Property</div>
                                    <div>Phone</div>
                                    <div>Realtor</div>
                                    <div>Date</div>
                                    <div>Status</div>
                                    <div>Action</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {enquiries.map((enquiry) => (
                                    <div key={enquiry.id} className="px-6 py-4 hover:bg-gray-50">
                                        <div className="grid grid-cols-7 gap-4 items-center">
                                            {/* Client Name */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{enquiry.clientName}</p>
                                            </div>

                                            {/* Property */}
                                            <div>
                                                <p className="text-sm text-gray-600">{enquiry.property}</p>
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <p className="text-sm text-gray-600">{enquiry.phone}</p>
                                            </div>

                                            {/* Realtor */}
                                            <div>
                                                <p className="text-sm text-gray-600">{enquiry.realtor}</p>
                                            </div>

                                            {/* Date */}
                                            <div>
                                                <p className="text-sm text-gray-600">{enquiry.date}</p>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                                                    {enquiry.status}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewEnquiry(enquiry)}
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

                        {/* Enquiries Grid - Mobile/Tablet */}
                        <div className="lg:hidden space-y-4">
                            {enquiries.map((enquiry) => (
                                <div key={enquiry.id} className="bg-white rounded-lg border border-gray-200 p-4">
                                    <div className="space-y-3">
                                        {/* Client Name and Status */}
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-gray-900">{enquiry.clientName}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                                                {enquiry.status}
                                            </span>
                                        </div>

                                        {/* Property and Details */}
                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-500">Property: {enquiry.property}</p>
                                            <p className="text-xs text-gray-500">Phone: {enquiry.phone}</p>
                                            <p className="text-xs text-gray-500">Realtor: {enquiry.realtor}</p>
                                            <p className="text-xs text-gray-500">Date: {enquiry.date}</p>
                                        </div>

                                        {/* Action */}
                                        <div className="pt-2">
                                            <button
                                                onClick={() => handleViewEnquiry(enquiry)}
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
                                Showing 1 to {enquiries.length} of 100
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

            {/* Enquiry Detail Modal */}
            {showEnquiryModal && selectedEnquiry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Enquiry Detail</h3>
                            <button
                                onClick={() => setShowEnquiryModal(false)}
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
                                        <label className="text-xs text-gray-500">Client Name</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedEnquiry.clientName}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Email</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedEnquiry.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Phone Number</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedEnquiry.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Property</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedEnquiry.propertyDetails}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Referred By</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedEnquiry.realtor}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Date Submitted</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedEnquiry.dateSubmitted}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedEnquiry.status)}`}>
                                                {selectedEnquiry.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client Message Section */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Client Message</h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                    {selectedEnquiry.message}
                                </p>
                            </div>

                            {/* Change Status Section */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Change Status Options</h4>
                                <div className="space-y-2">
                                    {['New', 'Contacted', 'Converted', 'Rejected'].map((status) => (
                                        <label key={status} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={selectedEnquiry.status === status}
                                                onChange={() => handleStatusChange(status)}
                                                className="w-4 h-4 text-[#703BF7] border-gray-300 focus:ring-[#703BF7]"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">
                                                {status} {status === 'New' && '(default)'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 p-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowEnquiryModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    // Save changes logic here
                                    setShowEnquiryModal(false);
                                }}
                                className="flex-1 bg-[#703BF7] text-white px-4 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors"
                            >
                                Save Changes
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