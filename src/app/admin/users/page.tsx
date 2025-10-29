'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FiMenu, FiSearch, FiFilter } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

// Dummy data for users
const users = [
    {
        id: 1,
        name: 'John Okafor',
        email: 'john.okafor@email.com',
        role: 'Realtor',
        status: 'Active',
        joinDate: 'Dec 1, 2024',
        properties: 12,
    },
    {
        id: 2,
        name: 'Sarah Ahmed',
        email: 'sarah.ahmed@email.com',
        role: 'Client',
        status: 'Active',
        joinDate: 'Nov 28, 2024',
        properties: 0,
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        role: 'Realtor',
        status: 'Inactive',
        joinDate: 'Nov 25, 2024',
        properties: 8,
    },
    {
        id: 4,
        name: 'Mary Adebayo',
        email: 'mary.adebayo@email.com',
        role: 'Client',
        status: 'Active',
        joinDate: 'Nov 20, 2024',
        properties: 0,
    },
    {
        id: 5,
        name: 'David Chen',
        email: 'david.chen@email.com',
        role: 'Realtor',
        status: 'Active',
        joinDate: 'Nov 15, 2024',
        properties: 15,
    },
];

// Helper to get color for status
const statusColor = {
    Active: 'text-green-600 bg-green-100',
    Inactive: 'text-red-600 bg-red-100',
    Pending: 'text-yellow-600 bg-yellow-100',
};

const roleColor = {
    Realtor: 'text-purple-600 bg-purple-100',
    Client: 'text-blue-600 bg-blue-100',
    Admin: 'text-gray-600 bg-gray-100',
};

export default function UsersPage() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        const matchesStatus = filterStatus === 'All' || user.status === filterStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="users"
                    onLogout={() => setShowLogoutModal(true)}
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

                            <div className="flex items-center gap-3 ml-auto">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Image src="/dashboard/Avatars.png" alt="avatar" width={40} height={40} />
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@howitworks.ng</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-white">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                User Management
                            </h2>
                            <p className="text-gray-500">
                                Manage all users on the platform
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <div className="mb-6 flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>

                            {/* Role Filter */}
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                            >
                                <option value="All">All Roles</option>
                                <option value="Realtor">Realtor</option>
                                <option value="Client">Client</option>
                                <option value="Admin">Admin</option>
                            </select>

                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        {/* Users table */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Users ({filteredUsers.length})
                                </h3>
                                <button className="px-4 py-2 bg-[#703BF7] text-white rounded-md text-sm font-medium hover:bg-[#5a2fd9] transition-colors">
                                    Add New User
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Properties</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Join Date</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {user.name.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColor[user.role as keyof typeof roleColor]}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                                                    {user.properties}
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                                    {user.joinDate}
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor[user.status as keyof typeof statusColor]}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex gap-2">
                                                        <button className="text-[#703BF7] hover:text-[#5a2fd9]">Edit</button>
                                                        <button className="text-red-600 hover:text-red-800">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                onClick={() => {
                                    // Handle logout logic here
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