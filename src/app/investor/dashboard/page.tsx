'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import {
  FaMoneyBillWave,
  FaChartBar,
  FaBuilding,
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

interface DashboardStats {
  totalInvestments: number;
  activeInvestments: number;
  pendingInvestments: number;
  totalExpectedReturns: number;
}

interface Investment {
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
}

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
  stats: DashboardStats;
  recentInvestments: Investment[];
  recentInquiries: any[];
}

export default function InvestorDashboard() {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/investor/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FD2AF]"></div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      name: 'Total Investments',
      value: formatCurrency(dashboardData?.stats.totalInvestments || 0),
      icon: FaMoneyBillWave,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Active Investments',
      value: dashboardData?.stats.activeInvestments || 0,
      icon: FaChartBar,
      change: '+2',
      changeType: 'increase',
    },
    {
      name: 'Pending Investments',
      value: dashboardData?.stats.pendingInvestments || 0,
      icon: FaBuilding,
      change: '0',
      changeType: 'neutral',
    },
    {
      name: 'Expected Returns',
      value: formatCurrency(dashboardData?.stats.totalExpectedReturns || 0),
      icon: FaChartLine,
      change: '+8%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1FD2AF] to-[#1AB89A] rounded-lg shadow p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {dashboardData?.investor.firstName}!
        </h1>
        <p className="mt-2 text-lg opacity-90">
          Here's an overview of your investment portfolio
        </p>
        {dashboardData?.investor.investmentBudget && (
          <p className="mt-1 text-sm opacity-75">
            Investment Budget: {formatCurrency(dashboardData.investor.investmentBudget)}
          </p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-[#1FD2AF] rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'increase'
                  ? 'text-green-600'
                  : item.changeType === 'decrease'
                    ? 'text-red-600'
                    : 'text-gray-500'
                  }`}
              >
                {item.changeType === 'increase' ? (
                  <FaArrowUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                ) : item.changeType === 'decrease' ? (
                  <FaArrowDown className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                ) : null}
                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Investments */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Investments
          </h3>
          {dashboardData?.recentInvestments && dashboardData.recentInvestments.length > 0 ? (
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
              <FaBuilding className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No investments yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start investing in properties to see them here.
              </p>
              <div className="mt-6">
                <a
                  href="/investor/properties"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
                >
                  Browse Properties
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href="/investor/properties"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#1FD2AF] border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-[#1FD2AF] text-white">
                  <FaBuilding className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Browse Properties
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Discover new investment opportunities
                </p>
              </div>
            </a>

            <a
              href="/investor/investments"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#1FD2AF] border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-[#1FD2AF] text-white">
                  <FaMoneyBillWave className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  My Investments
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  View and manage your investments
                </p>
              </div>
            </a>

            <a
              href="/investor/portfolio"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#1FD2AF] border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-[#1FD2AF] text-white">
                  <FaChartBar className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Portfolio Analysis
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Analyze your investment performance
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}