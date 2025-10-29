'use client'

import React, { useState, useEffect } from 'react';
import { FiUser, FiDollarSign, FiUsers, FiTrendingUp, FiSettings, FiShare2, FiArrowUpRight, FiCopy } from 'react-icons/fi';
import { dashboardApi } from '../../../lib/api-endpoints';
import { useUser } from '../layout';
import toast, { Toaster } from 'react-hot-toast';

import type { RealtorDashboard } from '../../../lib/types';

export default function RealtorDashboard() {
  const { user } = useUser();
  const [dashboardData, setDashboardData] = useState<RealtorDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardApi.getRealtorDashboard();
      setDashboardData(data);
    } catch (error: any) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (dashboardData?.referralLink) {
      navigator.clipboard.writeText(dashboardData.referralLink);
      toast.success('Referral link copied!');
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load dashboard</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch your dashboard data. Please try again.</p>
          <button 
            onClick={loadDashboardData}
            className="bg-[#703BF7] text-white px-6 py-3 rounded-xl hover:bg-[#5f2fd6] transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { realtor, stats, recentLeads, referralLink } = dashboardData;

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Personalized Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-gradient-to-b from-[#703BF7] to-[#5f2fd6] rounded-full"></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            This is your dashboard, {user?.firstName}!
          </h1>
        </div>
        <p className="text-gray-600 ml-5">
          Track your performance, manage leads, and grow your real estate business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +12%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Leads Generated</p>
            <p className="text-3xl font-bold text-gray-900">{stats.leadsGenerated}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +8%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Referral Clicks</p>
            <p className="text-3xl font-bold text-gray-900">{stats.referralClicks}</p>
            <p className="text-sm text-gray-500 mt-1">Total clicks</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +15%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Commissions Earned</p>
            <p className="text-3xl font-bold text-gray-900">₦{stats.commissionsEarned.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Referral Link Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#703BF7] to-[#5f2fd6] rounded-xl flex items-center justify-center">
              <FiShare2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Your Referral Link</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Share this link to earn commissions from property investments and referrals.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
            />
            <button
              onClick={copyReferralLink}
              className="bg-[#703BF7] text-white px-6 py-3 rounded-xl hover:bg-[#5f2fd6] transition-colors font-medium flex items-center gap-2"
            >
              <FiCopy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Leads</h2>
          {recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{lead.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      lead.status === 'Converted' 
                        ? 'bg-green-100 text-green-700'
                        : lead.status === 'Connected'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {lead.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No leads yet</h3>
              <p className="text-gray-500 text-sm">Start sharing your referral link to generate leads!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/realtor/profile', icon: FiUser, title: 'View Profile', desc: 'Update your information', color: 'blue' },
            { href: '/realtor/leads', icon: FiUsers, title: 'Manage Leads', desc: 'Track and follow up', color: 'green' },
            { href: '/realtor/commissions', icon: FiDollarSign, title: 'View Commissions', desc: 'Track your earnings', color: 'purple' },
            { href: '/realtor/settings', icon: FiSettings, title: 'Settings', desc: 'Account preferences', color: 'gray' }
          ].map((action, index) => (
            <a 
              key={index}
              href={action.href}
              className="group p-4 border border-gray-200 rounded-xl hover:border-[#703BF7] hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}