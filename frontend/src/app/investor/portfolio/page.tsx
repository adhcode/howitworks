'use client'

import React, { useState } from 'react';
import { FiTrendingUp, FiDollarSign, FiHome, FiBarChart, FiCalendar, FiMapPin } from 'react-icons/fi';
import InvestorHeader from '../components/InvestorHeader';
import InvestorSidebar from '../components/InvestorSidebar';
import { useInvestments } from '../../../hooks/use-investments';
import { useInvestorDashboard } from '../../../hooks/use-dashboard';

interface PortfolioData {
  investor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    investmentBudget?: number;
    preferredLocation?: string;
  };
  portfolio: {
    totalInvested: number;
    totalValue: number;
    totalReturns: number;
    returnRate: number;
    activeInvestments: number;
  };
  investments: Array<{
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

export default function PortfolioPage() {
  // Use React Query hooks instead of manual fetch and mock data
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useInvestorDashboard();
  const { data: investmentsData, isLoading: investmentsLoading, error: investmentsError } = useInvestments();

  const loading = dashboardLoading || investmentsLoading;
  const error = dashboardError || investmentsError;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8157FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error?.message || 'Failed to load portfolio'}</p>
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

  // Calculate portfolio stats from React Query data
  const investments = investmentsData?.data || [];
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpectedReturns = investments.reduce((sum, inv) => sum + (inv.expectedReturn || 0), 0);
  const activeInvestments = investments.filter(inv => inv.status === 'approved').length;
  const returnRate = totalInvested > 0 ? ((totalExpectedReturns - totalInvested) / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <InvestorSidebar />

        <div className="flex-1 flex flex-col lg:ml-0">
          <InvestorHeader />

          <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
            {/* Portfolio Overview */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Portfolio</h1>
              <p className="text-gray-600">Track your investments and returns</p>
            </div>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
                    <p className="text-sm text-gray-500 mt-1">Total Invested</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiDollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalExpectedReturns)}</p>
                    <p className="text-sm text-gray-500 mt-1">Expected Returns</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{activeInvestments}</p>
                    <p className="text-sm text-gray-500 mt-1">Active Investments</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiHome className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{returnRate.toFixed(1)}%</p>
                    <p className="text-sm text-gray-500 mt-1">Return Rate</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FiBarChart className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Investments List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Investments</h3>
              </div>
              <div className="p-6">
                {investments && investments.length > 0 ? (
                  <div className="space-y-4">
                    {investments.map((investment) => (
                      <div
                        key={investment.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">
                                {investment.property.title}
                              </h4>
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

                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <FiMapPin className="w-4 h-4 mr-1" />
                                {investment.property.location}
                              </div>
                              <div className="flex items-center">
                                <FiCalendar className="w-4 h-4 mr-1" />
                                {formatDate(investment.investmentDate)}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Investment Amount</p>
                                <p className="font-medium text-gray-900">{formatCurrency(investment.amount)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Investment Type</p>
                                <p className="font-medium text-gray-900">{investment.investmentType.replace('_', ' ')}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Expected Return</p>
                                <p className="font-medium text-gray-900">{formatCurrency(investment.expectedReturn || 0)}</p>
                              </div>
                            </div>
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
                      Start investing in properties to build your portfolio.
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