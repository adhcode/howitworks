'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import {
  FaChartBar,
  FaArrowUp,
  FaArrowDown,
  FaMoneyBillWave
} from 'react-icons/fa';

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
  };
}

interface PortfolioData {
  investments: Investment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function InvestorPortfolio() {
  const { token } = useAuth();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/investor/investments', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPortfolioData(data);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPortfolio();
    }
  }, [token]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePortfolioStats = () => {
    if (!portfolioData?.investments) return null;

    const totalInvested = portfolioData.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalExpectedReturns = portfolioData.investments.reduce((sum, inv) => sum + (inv.expectedReturn || 0), 0);
    const activeInvestments = portfolioData.investments.filter(inv => inv.status === 'approved' || inv.status === 'completed').length;
    const pendingInvestments = portfolioData.investments.filter(inv => inv.status === 'pending').length;

    return {
      totalInvested,
      totalExpectedReturns,
      activeInvestments,
      pendingInvestments,
      totalInvestments: portfolioData.investments.length,
      averageInvestment: totalInvested / portfolioData.investments.length || 0,
    };
  };

  const getInvestmentsByType = () => {
    if (!portfolioData?.investments) return [];

    const typeMap = portfolioData.investments.reduce((acc, inv) => {
      const type = inv.investmentType.replace('_', ' ');
      acc[type] = (acc[type] || 0) + inv.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeMap).map(([type, amount]) => ({ type, amount }));
  };

  const stats = calculatePortfolioStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FD2AF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Portfolio Analysis
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your investment performance and portfolio distribution
          </p>
        </div>
      </div>

      {stats ? (
        <>
          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaMoneyBillWave className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Invested
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {formatCurrency(stats.totalInvested)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaArrowUp className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Expected Returns
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {formatCurrency(stats.totalExpectedReturns)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaChartBar className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Investments
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.activeInvestments}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaArrowDown className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Investments
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.pendingInvestments}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment by Type */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Investment Distribution by Type
              </h3>
              <div className="space-y-4">
                {getInvestmentsByType().map(({ type, amount }) => {
                  const percentage = (amount / stats.totalInvested) * 100;
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900 capitalize">{type}</span>
                        <span className="text-gray-500">{formatCurrency(amount)}</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1FD2AF] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {percentage.toFixed(1)}% of portfolio
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Portfolio Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Investments</span>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.totalInvestments}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Average Investment</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(stats.averageInvestment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Expected ROI</span>
                  <span className="text-sm font-medium text-green-600">
                    {stats.totalInvested > 0
                      ? `${((stats.totalExpectedReturns / stats.totalInvested) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Portfolio Status</span>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.activeInvestments > 0 ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Investments Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Investment Details
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Investment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expected Return
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {portfolioData?.investments?.map((investment) => (
                      <tr key={investment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {investment.property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {investment.property.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(investment.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {investment.investmentType.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(investment.expectedReturn || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${investment.status === 'approved' || investment.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : investment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                              }`}
                          >
                            {investment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FaChartBar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio data</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start investing in properties to see your portfolio analysis.
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
  );
}