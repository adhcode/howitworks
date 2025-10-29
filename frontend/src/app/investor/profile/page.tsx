'use client'

import { useEffect, useState } from 'react';
import { FaUserCircle, FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { useInvestorProfile, useUpdateInvestorProfile } from '../../../hooks/use-profile';
import AddressInput from '../../../components/AddressInput';

interface InvestorProfile {
  id: string;
  phoneNumber?: string;
  address?: string;
  investmentBudget?: number;
  preferredLocation?: string;
  profileImage?: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
  };
}

export default function InvestorProfile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    investmentBudget: '',
    preferredLocation: '',
  });

  // Use React Query hooks instead of manual fetch and mock data
  const { data: profile, isLoading: loading, error } = useInvestorProfile();
  const updateProfileMutation = useUpdateInvestorProfile();

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        phoneNumber: profile.phoneNumber || '',
        address: profile.address || '',
        investmentBudget: profile.investmentBudget?.toString() || '',
        preferredLocation: profile.preferredLocation || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        phoneNumber: formData.phoneNumber || undefined,
        address: formData.address || undefined,
        investmentBudget: formData.investmentBudget ? parseFloat(formData.investmentBudget) : undefined,
        preferredLocation: formData.preferredLocation || undefined,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      phoneNumber: profile?.phoneNumber || '',
      address: profile?.address || '',
      investmentBudget: profile?.investmentBudget?.toString() || '',
      preferredLocation: profile?.preferredLocation || '',
    });
    setEditing(false);
  };

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
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FD2AF]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <FaUserCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Profile not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Unable to load your profile information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and investment preferences
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
            >
              <FaPencilAlt className="-ml-1 mr-2 h-5 w-5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
              >
                <FaTimes className="-ml-1 mr-2 h-5 w-5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={updateProfileMutation.isPending}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] disabled:opacity-50"
              >
                <FaCheck className="-ml-1 mr-2 h-5 w-5" />
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-[#1FD2AF] flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {profile.user.firstName[0]}{profile.user.lastName[0]}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {profile.user.firstName} {profile.user.lastName}
              </h3>
              <p className="text-sm text-gray-500">{profile.user.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Member since {formatDate(profile.user.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={profile.user.firstName}
                    disabled
                    className="block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={profile.user.lastName}
                    disabled
                    className="block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    value={profile.user.email}
                    disabled
                    className="block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    value={editing ? formData.phoneNumber : (profile.phoneNumber || 'Not provided')}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    disabled={!editing}
                    className={`block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${editing ? 'focus:ring-[#1FD2AF] focus:border-[#1FD2AF]' : 'bg-gray-50'
                      }`}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                {editing ? (
                  <AddressInput
                    label="Address"
                    value={typeof formData.address === 'string' ? {
                      street: formData.address,
                      city: '',
                      state: '',
                      lga: '',
                      zipCode: '',
                      country: 'Nigeria',
                      fullAddress: formData.address
                    } : formData.address}
                    onChange={(address) => setFormData(prev => ({ ...prev, address: address.fullAddress }))}
                    placeholder="Enter your address"
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <p className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-50 px-3 py-2">
                        {profile.address || 'Not provided'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Investment Preferences */}
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Investment Preferences
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Investment Budget (NGN)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    min="0"
                    value={editing ? formData.investmentBudget : (profile.investmentBudget || '')}
                    onChange={(e) => setFormData(prev => ({ ...prev, investmentBudget: e.target.value }))}
                    disabled={!editing}
                    className={`block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${editing ? 'focus:ring-[#1FD2AF] focus:border-[#1FD2AF]' : 'bg-gray-50'
                      }`}
                    placeholder="Enter your investment budget"
                  />
                </div>
                {!editing && profile.investmentBudget && (
                  <p className="mt-1 text-sm text-gray-500">
                    {formatCurrency(profile.investmentBudget)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={editing ? formData.preferredLocation : (profile.preferredLocation || 'Not specified')}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredLocation: e.target.value }))}
                    disabled={!editing}
                    className={`block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${editing ? 'focus:ring-[#1FD2AF] focus:border-[#1FD2AF]' : 'bg-gray-50'
                      }`}
                    placeholder="Enter preferred investment location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}