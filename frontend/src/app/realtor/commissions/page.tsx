'use client'

import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCalendar, FiTrendingUp, FiDownload, FiSend, FiClock, FiArrowUpRight } from 'react-icons/fi';
import { commissionApi } from '../../../lib/api-endpoints';
import { useUser } from '../layout';
import toast, { Toaster } from 'react-hot-toast';

export default function RealtorCommissions() {
  const { user } = useUser();
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingPayout, setRequestingPayout] = useState(false);
  const [selectedCommissions, setSelectedCommissions] = useState<string[]>([]);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [stats, setStats] = useState({
    totalEarned: 0,
    thisMonth: 0,
    pending: 0,
    paid: 0,
    payoutRequested: 0
  });

  useEffect(() => {
    loadCommissions();
  }, []);

  const loadCommissions = async () => {
    try {
      setLoading(true);
      const data = await commissionApi.getRealtorCommissions();
      setCommissions(data.data || []);
      
      // Calculate stats
      const total = data.data?.reduce((sum: number, c: any) => sum + c.amount, 0) || 0;
      const thisMonth = data.data?.filter((c: any) => {
        const date = new Date(c.transactionDate);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).reduce((sum: number, c: any) => sum + c.amount, 0) || 0;
      
      const pending = data.data?.filter((c: any) => c.status === 'pending').reduce((sum: number, c: any) => sum + c.amount, 0) || 0;
      const paid = data.data?.filter((c: any) => c.status === 'paid').reduce((sum: number, c: any) => sum + c.amount, 0) || 0;
      const payoutRequested = data.data?.filter((c: any) => c.status === 'payout_requested').reduce((sum: number, c: any) => sum + c.amount, 0) || 0;
      
      setStats({ totalEarned: total, thisMonth, pending, paid, payoutRequested });
    } catch (error: any) {
      console.error('Error loading commissions:', error);
      toast.error('Failed to load commissions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'payout_requested':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCommissionSelect = (commissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedCommissions(prev => [...prev, commissionId]);
    } else {
      setSelectedCommissions(prev => prev.filter(id => id !== commissionId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pendingCommissions = commissions
        .filter((c: any) => c.status === 'pending')
        .map((c: any) => c.id);
      setSelectedCommissions(pendingCommissions);
    } else {
      setSelectedCommissions([]);
    }
  };

  const handleRequestPayout = async () => {
    if (selectedCommissions.length === 0) {
      toast.error('Please select commissions to request payout');
      return;
    }

    setRequestingPayout(true);
    const loadingToast = toast.loading('Requesting payout...');

    try {
      // Request payout for each selected commission
      const promises = selectedCommissions.map(id => 
        commissionApi.requestPayout(id)
      );
      
      await Promise.all(promises);
      
      toast.dismiss(loadingToast);
      toast.success(`Payout requested for ${selectedCommissions.length} commission(s)`);
      
      // Reload commissions to reflect updated status
      await loadCommissions();
      setSelectedCommissions([]);
      setShowPayoutModal(false);
      
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error('Error requesting payout:', error);
      toast.error(error?.message || 'Failed to request payout');
    } finally {
      setRequestingPayout(false);
    }
  };

  const getSelectedAmount = () => {
    return commissions
      .filter((c: any) => selectedCommissions.includes(c.id))
      .reduce((sum: number, c: any) => sum + c.amount, 0);
  };

  const pendingCommissions = commissions.filter((c: any) => c.status === 'pending');
  const canRequestPayout = pendingCommissions.length > 0;

  if (loading) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your commissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Personalized Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-gradient-to-b from-[#703BF7] to-[#5f2fd6] rounded-full"></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            These are your commissions, {user?.firstName}!
          </h1>
        </div>
        <p className="text-gray-600 ml-5">
          Track your earnings, request payouts, and monitor your commission history.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +12%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Earned</p>
            <p className="text-3xl font-bold text-gray-900">₦{stats.totalEarned.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +8%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">This Month</p>
            <p className="text-3xl font-bold text-gray-900">₦{stats.thisMonth.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Current month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-white" />
            </div>
            {stats.payoutRequested > 0 && (
              <div className="flex items-center gap-1 text-purple-600 text-sm font-medium">
                <FiClock className="w-4 h-4" />
                Processing
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-gray-900">₦{stats.pending.toLocaleString()}</p>
            {stats.payoutRequested > 0 && (
              <p className="text-sm text-purple-600 mt-1">₦{stats.payoutRequested.toLocaleString()} requested</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FiDownload className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +5%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Paid Out</p>
            <p className="text-3xl font-bold text-gray-900">₦{stats.paid.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Commission History</h2>
              <p className="text-sm text-gray-600 mt-1">Track and manage your commission payments</p>
            </div>
            <div className="flex items-center gap-3">
              {canRequestPayout && (
                <button
                  onClick={() => setShowPayoutModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-sm"
                >
                  <FiSend className="w-4 h-4" />
                  Request Payout
                </button>
              )}
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#703BF7] to-[#5f2fd6] text-white px-4 py-2.5 rounded-xl hover:from-[#5f2fd6] hover:to-[#4c1d95] transition-all duration-200 font-medium shadow-sm">
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          
          {selectedCommissions.length > 0 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-900">
                  {selectedCommissions.length} commission(s) selected
                </p>
                <p className="text-lg font-bold text-blue-900">
                  ₦{getSelectedAmount().toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {commissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCommissions.length === pendingCommissions.length && pendingCommissions.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-[#703BF7] border-gray-300 rounded focus:ring-[#703BF7]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Transaction Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {commissions.map((commission: any) => (
                  <tr key={commission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCommissions.includes(commission.id)}
                        onChange={(e) => handleCommissionSelect(commission.id, e.target.checked)}
                        disabled={commission.status !== 'pending'}
                        className="w-4 h-4 text-[#703BF7] border-gray-300 rounded focus:ring-[#703BF7] disabled:opacity-50"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{commission.client}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{commission.property?.title || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{commission.property?.location || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">₦{commission.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(commission.status)}`}>
                        {commission.status === 'payout_requested' ? 'Payout Requested' : commission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(commission.transactionDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[#703BF7] hover:text-[#5f2fd6] text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiDollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No commissions yet</h3>
            <p className="text-gray-500 mb-6">Start generating leads to earn commissions!</p>
          </div>
        )}
      </div>

      {/* Payment Info */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Payment Information</h3>
        <p className="text-blue-700 text-sm">
          Commissions are processed every Friday. Pending commissions will be paid to your registered bank account within 3-5 business days.
        </p>
      </div>

      {/* Payout Request Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Payout</h3>
            
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Selected Commissions:</span>
                  <span className="text-sm font-bold text-gray-900">{selectedCommissions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                  <span className="text-lg font-bold text-green-600">₦{getSelectedAmount().toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FiClock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Processing Time</p>
                    <p className="text-sm text-yellow-700">
                      Payout requests are processed within 3-5 business days. You'll receive an email confirmation once processed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPayoutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestPayout}
                disabled={requestingPayout}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {requestingPayout ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Request Payout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}