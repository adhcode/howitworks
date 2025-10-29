'use client'

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiEye, FiUsers, FiTrendingUp, FiStar, FiDollarSign } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useRealtorDetail } from '../../../../hooks/use-realtor-detail';
import { useAuth } from '../../../providers/auth-provider';
import { Toaster } from 'react-hot-toast';

// Dummy chart data points for Views Overview
const chartData = [
    { month: 'JAN', value: 400 },
    { month: 'FEB', value: 450 },
    { month: 'MAR', value: 480 },
    { month: 'APR', value: 420 },
    { month: 'MAY', value: 500 },
    { month: 'JUN', value: 650 },
    { month: 'JUL', value: 580 },
    { month: 'AUG', value: 720 },
    { month: 'SEP', value: 650 },
    { month: 'OCT', value: 180 },
    { month: 'NOV', value: 250 },
    { month: 'DEC', value: 650 }
];

// Chart dimensions
const chartWidth = 600;
const chartHeight = 300;
const padding = 40;

export default function RealtorDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const realtorId = resolvedParams.id;
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    
    const { logout } = useAuth();
    const { realtor, loading, error, toggleStatus, refetch } = useRealtorDetail(realtorId);
    const [togglingStatus, setTogglingStatus] = useState(false);

    // Calculate chart points
    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));
    const valueRange = maxValue - minValue;

    const chartPoints = chartData.map((point, index) => ({
        x: padding + (index * ((chartWidth - 2 * padding) / (chartData.length - 1))),
        y: chartHeight - padding - ((point.value - minValue) / valueRange) * (chartHeight - 2 * padding),
        value: point.value,
        month: point.month
    }));

    if (loading) {
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
                                    <div className="w-8 h-8 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading realtor details...</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !realtor) {
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
                                    <p className="text-red-600 mb-4">{error || 'Realtor not found'}</p>
                                    <Link 
                                        href="/admin/realtors"
                                        className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5a2fd4] inline-block"
                                    >
                                        Back to Realtors
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate stats from real data
    const totalViews = (realtor.leads?.length || 0) * 10; // Estimate
    const totalEnquiries = realtor.leads?.length || 0;
    const totalClosings = realtor.leads?.filter((l: any) => l.status === 'converted').length || 0;
    const conversionRate = totalEnquiries > 0 ? ((totalClosings / totalEnquiries) * 100).toFixed(1) : '0';
    
    // Calculate commissions
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthStart = new Date(currentYear, currentMonth, 1);
    
    const thisMonthCommission = realtor.commissions
        ?.filter((c: any) => new Date(c.transactionDate) >= monthStart)
        .reduce((sum: number, c: any) => sum + c.amount, 0) || 0;
    
    const yearToDateCommission = realtor.commissions
        ?.reduce((sum: number, c: any) => sum + c.amount, 0) || 0;

    const referralLink = `${window.location.origin}?ref=${realtor.slug}`;
    const walletDetails = realtor.bankName && realtor.accountNumber 
        ? `${realtor.bankName} - ${realtor.accountNumber}`
        : 'Not set';

    const handleToggleStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Full realtor object:', realtor);
        console.log('Realtor user:', realtor?.user);
        console.log('Toggle status clicked, current status:', realtor?.user?.isActive);
        
        if (!realtor || !realtor.user) {
            console.error('Realtor or realtor.user is undefined!');
            return;
        }
        
        try {
            setTogglingStatus(true);
            const newStatus = !realtor.user.isActive;
            console.log('Calling toggleStatus with:', newStatus);
            await toggleStatus(newStatus);
            console.log('Toggle successful, refetching...');
            refetch();
        } catch (err) {
            console.error('Error toggling status:', err);
        } finally {
            setTogglingStatus(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Toaster position="top-right" />
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-realtors"
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
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Link href="/admin/realtors" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FiArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                        Manage Realtors
                                    </h1>
                                    <span className="text-gray-400 hidden sm:inline">&gt;</span>
                                    <span className="text-[#703BF7] font-medium">Realtors Details</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <button 
                                    type="button"
                                    onClick={handleToggleStatus}
                                    disabled={togglingStatus}
                                    className={`px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                        realtor.user.isActive 
                                            ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    {togglingStatus ? 'Updating...' : (realtor.user.isActive ? 'Deactivate' : 'Activate')}
                                </button>
                                <Link
                                    href={`/admin/realtors/edit/${realtorId}`}
                                    className="bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors text-center"
                                >
                                    Edit Realtor Details
                                </Link>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Overview</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                                            <p className="font-medium text-gray-900">{realtor.user.firstName} {realtor.user.lastName}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Email</label>
                                            <p className="font-medium text-gray-900">{realtor.user.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
                                            <p className="font-medium text-gray-900">{realtor.phoneNumber || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Residential Address</label>
                                            <p className="font-medium text-gray-900">{realtor.residentialAddress || 'Not set'}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Wallet Details</label>
                                            <p className="font-medium text-gray-900">{walletDetails}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Referral Link</label>
                                            <p className="font-medium text-[#703BF7] break-all">{referralLink}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Account Status</label>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${realtor.user.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className="font-medium text-gray-900">{realtor.user.isActive ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Active Since</label>
                                            <p className="font-medium text-gray-900">{new Date(realtor.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Profile Image */}
                                <div className="flex justify-center lg:justify-end">
                                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-gray-200">
                                        <Image
                                            src={realtor.profileImage || '/dashboard/avatar.svg'}
                                            alt={`${realtor.user.firstName} ${realtor.user.lastName}`}
                                            width={160}
                                            height={160}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance Report Section */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Report</h2>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                            <FiStar className="w-4 h-4 text-yellow-600" />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{totalViews.toLocaleString()}</div>
                                    <div className="text-sm text-gray-500">Total Views (YTD)</div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FiUsers className="w-4 h-4 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{totalEnquiries}</div>
                                    <div className="text-sm text-gray-500">Total Enquiries</div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FiTrendingUp className="w-4 h-4 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{totalClosings}</div>
                                    <div className="text-sm text-gray-500">Total Closings</div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FiDollarSign className="w-4 h-4 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{realtor._count?.properties || 0}</div>
                                    <div className="text-sm text-gray-500">Properties</div>
                                </div>
                            </div>

                            {/* Conversion Rate and Commissions */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Conversion Rate</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Conversion rate</span>
                                            <span className="text-sm font-medium">{conversionRate}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Total Leads</span>
                                            <span className="text-sm font-medium">{totalEnquiries}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Commissions Earned</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">This Month</span>
                                            <span className="text-sm font-medium">₦{thisMonthCommission.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Year to Date (YTD)</span>
                                            <span className="text-sm font-medium">₦{yearToDateCommission.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Views Overview Chart */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Views Overview</h3>
                                <div className="overflow-x-auto">
                                    <div className="relative min-w-[600px]">
                                        <svg width={chartWidth} height={chartHeight} className="w-full">
                                            {/* Grid lines */}
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <line
                                                    key={i}
                                                    x1={padding}
                                                    y1={padding + (i * (chartHeight - 2 * padding) / 4)}
                                                    x2={chartWidth - padding}
                                                    y2={padding + (i * (chartHeight - 2 * padding) / 4)}
                                                    stroke="#e5e7eb"
                                                    strokeWidth="1"
                                                />
                                            ))}

                                            {/* Chart line */}
                                            <polyline
                                                points={chartPoints.map(p => `${p.x},${p.y}`).join(' ')}
                                                fill="none"
                                                stroke="#703BF7"
                                                strokeWidth="3"
                                            />

                                            {/* Data points */}
                                            {chartPoints.map((point, index) => (
                                                <circle
                                                    key={index}
                                                    cx={point.x}
                                                    cy={point.y}
                                                    r="4"
                                                    fill="#703BF7"
                                                    className="cursor-pointer"
                                                    onMouseEnter={() => setHoveredPoint(index)}
                                                    onMouseLeave={() => setHoveredPoint(null)}
                                                />
                                            ))}

                                            {/* X-axis labels */}
                                            {chartPoints.map((point, index) => (
                                                <text
                                                    key={index}
                                                    x={point.x}
                                                    y={chartHeight - 10}
                                                    textAnchor="middle"
                                                    className="text-xs fill-gray-500"
                                                >
                                                    {point.month}
                                                </text>
                                            ))}

                                            {/* Y-axis labels */}
                                            {[0, 200, 400, 600, 800].map((value, index) => (
                                                <text
                                                    key={index}
                                                    x={padding - 10}
                                                    y={chartHeight - padding - (index * (chartHeight - 2 * padding) / 4) + 5}
                                                    textAnchor="end"
                                                    className="text-xs fill-gray-500"
                                                >
                                                    {value}
                                                </text>
                                            ))}
                                        </svg>

                                        {/* Tooltip */}
                                        {hoveredPoint !== null && (
                                            <div
                                                className="absolute bg-gray-900 text-white px-2 py-1 rounded text-xs pointer-events-none"
                                                style={{
                                                    left: chartPoints[hoveredPoint].x - 20,
                                                    top: chartPoints[hoveredPoint].y - 30,
                                                }}
                                            >
                                                {chartPoints[hoveredPoint].value}
                                            </div>
                                        )}
                                    </div>
                                </div>
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