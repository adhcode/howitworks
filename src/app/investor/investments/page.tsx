'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import {
  FaMoneyBillWave,
  FaBuilding,
  FaCalendar,
  FaEye
} from 'react-icons/fa';
import Link from 'next/link';

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
    realtor: {
      user: {
        firstName: string;
        lastName: string;
      };
    };
  };
}

interface InvestmentsData {
  investments: Investment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function InvestorInvestments() {
  const { token } = useAuth();
  const [investmentsData, setInvestmentsData] = useState<InvestmentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/investor/investments?page=${currentPage}&limit=10`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInvestmentsData(data);
        }
      } catch (error) {
        console.error('Error fetching investments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInvestments();
    }
  }, [token, currentPage]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            My Investments
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your property investments
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href="/investor/properties"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
          >
            <FaMoneyBillWave className="-ml-1 mr-2 h-5 w-5" />
            New Investment
          </Link>
        </div>
      </div>

      {/* Investments List */}
      {investmentsData?.investments && investmentsData.investments.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {investmentsData.investments.map((investment) => (
              <li key={investment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {investment.property.images && investment.property.images.length > 0 ? (
                          <img
                            className="h-16 w-16 rounded-lg object-cover"
                            src={investment.property.images[0]}
                            alt={investment.property.title}
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <FaBuilding className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {investment.property.title}
                          </p>
                          <span
                            className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              investment.status
                            )}`}
                          >
                            {investment.status}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FaBuilding className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{investment.property.location}</p>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <FaCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>Invested on {formatDate(investment.investmentDate)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-gray-900">
                        <p className="font-medium">{formatCurrency(investment.amount)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Expected: {formatCurrency(investment.expectedReturn || 0)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {investment.investmentType.replace('_', ' ')}
                        </span>
                        <Link
                          href={`/investor/investments/${investment.id}`}
                          className="text-[#1FD2AF] hover:text-[#1AB89A]"
                        >
                          <FaEye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FaMoneyBillWave className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No investments yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start investing in properties to build your portfolio.
          </p>
          <div className="mt-6">
            <Link
              href="/investor/properties"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
            >
              <FaMoneyBillWave className="-ml-1 mr-2 h-5 w-5" />
              Browse Properties
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {investmentsData?.pagination && investmentsData.pagination.pages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(investmentsData.pagination.pages, currentPage + 1))}
              disabled={currentPage === investmentsData.pagination.pages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {(currentPage - 1) * investmentsData.pagination.limit + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * investmentsData.pagination.limit, investmentsData.pagination.total)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{investmentsData.pagination.total}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(investmentsData.pagination.pages, currentPage + 1))}
                  disabled={currentPage === investmentsData.pagination.pages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}