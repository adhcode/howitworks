'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCopy, FiCheck, FiTrendingUp, FiDollarSign, FiHome, FiBarChart, FiRefreshCw } from 'react-icons/fi';
import InvestorHeader from '../components/InvestorHeader';
import InvestorSidebar from '../components/InvestorSidebar';
import { useInvestorDashboard } from '../../../hooks/use-dashboard';

interface DashboardData {
  investor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    investmentBudget?: number;
    preferredLocation?: string;
  };
  stats: {
    totalInvestments: number;
    activeInvestments: number;
    pendingInvestments: number;
    totalExpectedReturns: number;
  };
  recentInvestments: Array<{
    id: string;
    amount: number;
    investmentType: string;
    status: string;
    expectedReturn: number;
    investmentDate: string;
    property: {
      title: string;
      location: string;
      price: number;
      images: string[];
    };
  }>;
}

export default function InvestorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  
  // Use the optimized React Query hook
  const { data: dashboardData, isLoading: loading, error, refetch, isFetching } = useInvestorDashboard();

  const handleRefresh = () => {
    refetch();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error?.message || 'Failed to load dashboard'}</p>
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

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">No dashboard data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <InvestorSidebar />

        <div className="flex-1 flex flex-col lg:ml-0">
          <InvestorHeader />

          <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
            {/* Welcome Message */}
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {dashboardData.investor.user?.firstName} {dashboardData.investor.user?.lastName}
                </h1>
                <p className="text-gray-600">Here's your investment portfolio overview.</p>
                {dashboardData.investor.investmentBudget && (
                  <p className="text-sm text-gray-500 mt-1">
                    Investment Budget: {formatCurrency(dashboardData.investor.investmentBudget)}
                  </p>
                )}
              </div>
              <button
                onClick={handleRefresh}
                disabled={isFetching}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8157FF] disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardData.stats.totalInvestments)}</p>
                    <p className="text-sm text-gray-500 mt-1">Total Investments</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiDollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.activeInvestments}</p>
                    <p className="text-sm text-gray-500 mt-1">Active Investments</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.pendingInvestments}</p>
                    <p className="text-sm text-gray-500 mt-1">Pending Investments</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FiHome className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardData.stats.totalExpectedReturns)}</p>
                    <p className="text-sm text-gray-500 mt-1">Expected Returns</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiBarChart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Investments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Investments</h3>
              </div>
              <div className="p-6">
                {dashboardData.recentInvestments && dashboardData.recentInvestments.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.recentInvestments.map((investment) => (
                      <div
                        key={investment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {investment.property.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {investment.property.location}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                              <span>Investment: {formatCurrency(investment.amount)}</span>
                              <span>Type: {investment.investmentType.replace('_', ' ')}</span>
                              <span>Expected Return: {formatCurrency(investment.expectedReturn || 0)}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${investment.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : investment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                              {investment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiHome className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No investments yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start investing in properties to see them here.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/investor/properties"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8157FF] hover:bg-[#7146E6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8157FF]"
                      >
                        Browse Properties
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}