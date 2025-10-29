'use client'

import React, { useState, useEffect } from 'react';
import { FiShare2, FiCopy, FiExternalLink, FiUsers, FiTrendingUp, FiArrowUpRight } from 'react-icons/fi';
import { dashboardApi } from '../../../lib/api-endpoints';
import { useUser } from '../layout';
import toast, { Toaster } from 'react-hot-toast';

export default function RealtorReferrals() {
  const { user } = useUser();
  const [referralData, setReferralData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setLoading(true);
      const data = await dashboardApi.getRealtorDashboard();
      setReferralData(data);
    } catch (error: any) {
      console.error('Error loading referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      toast.success('Referral link copied to clipboard!');
    }
  };

  const shareOnSocial = (platform: string) => {
    const link = referralData?.referralLink;
    const text = "Check out these amazing property investment opportunities!";
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your referral data...</p>
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
            These are your referrals, {user?.firstName}!
          </h1>
        </div>
        <p className="text-gray-600 ml-5">
          Share your referral link, track clicks, and earn commissions from successful referrals.
        </p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +15%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-900">{referralData?.stats?.referralClicks || 0}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +8%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Leads Generated</p>
            <p className="text-3xl font-bold text-gray-900">{referralData?.stats?.leadsGenerated || 0}</p>
            <p className="text-sm text-gray-500 mt-1">From referrals</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FiShare2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiArrowUpRight className="w-4 h-4" />
              +12%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Commissions Earned</p>
            <p className="text-3xl font-bold text-gray-900">₦{referralData?.stats?.commissionsEarned?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">From referrals</p>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#703BF7] to-[#5f2fd6] rounded-xl flex items-center justify-center">
            <FiShare2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Your Referral Link</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Share this unique link with potential investors. You'll earn a commission for every successful investment made through your link.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={referralData?.referralLink || ''}
            readOnly
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
          />
          <button
            onClick={copyReferralLink}
            className="bg-gradient-to-r from-[#703BF7] to-[#5f2fd6] text-white px-6 py-3 rounded-xl hover:from-[#5f2fd6] hover:to-[#4c1d95] transition-all duration-200 font-medium flex items-center gap-2 justify-center"
          >
            <FiCopy className="w-4 h-4" />
            Copy Link
          </button>
        </div>

        {/* Social Sharing */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share on Social Media</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => shareOnSocial('whatsapp')}
              className="flex items-center justify-center gap-2 p-4 border border-green-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-green-600 font-medium"
            >
              <span>WhatsApp</span>
              <FiExternalLink className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => shareOnSocial('twitter')}
              className="flex items-center justify-center gap-2 p-4 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-blue-600 font-medium"
            >
              <span>Twitter</span>
              <FiExternalLink className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => shareOnSocial('facebook')}
              className="flex items-center justify-center gap-2 p-4 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-blue-800 font-medium"
            >
              <span>Facebook</span>
              <FiExternalLink className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => shareOnSocial('linkedin')}
              className="flex items-center justify-center gap-2 p-4 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-blue-700 font-medium"
            >
              <span>LinkedIn</span>
              <FiExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">How Referrals Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Share Your Link</h3>
            <p className="text-sm text-gray-600">Share your unique referral link with potential investors through social media, email, or direct messaging.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">They Invest</h3>
            <p className="text-sm text-gray-600">When someone clicks your link and makes a property investment, they become your referral.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Earn Commission</h3>
            <p className="text-sm text-gray-600">You earn a commission on every successful investment made through your referral link.</p>
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-gradient-to-r from-[#703BF7]/5 to-[#703BF7]/10 rounded-xl p-6 border border-[#703BF7]/20">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Commission Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Property Investments</h3>
            <p className="text-sm text-gray-600 mb-1">• 2% commission on investment amount</p>
            <p className="text-sm text-gray-600 mb-1">• Minimum ₦10,000 per referral</p>
            <p className="text-sm text-gray-600">• Paid within 7 days of investment</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Lead Generation</h3>
            <p className="text-sm text-gray-600 mb-1">• ₦5,000 for qualified leads</p>
            <p className="text-sm text-gray-600 mb-1">• ₦15,000 for converted leads</p>
            <p className="text-sm text-gray-600">• Bonus for high-value conversions</p>
          </div>
        </div>
      </div>
    </div>
  );
}