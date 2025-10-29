'use client'

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave } from 'react-icons/fi';
import { profileApi } from '../../../lib/api-endpoints';
import { useUser } from '../layout';
import AddressInput from '../../../components/AddressInput';
import toast, { Toaster } from 'react-hot-toast';

interface AddressData {
  street: string;
  lga: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  fullAddress: string;
}

export default function RealtorProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    residentialAddress: {
      street: '',
      lga: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria',
      fullAddress: ''
    } as AddressData,
    bankName: '',
    accountNumber: '',
    accountName: '',
    profileImage: '/dashboard/avatar.svg'
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileApi.getRealtorProfile();
      setProfile(data.realtor);
      
      // Parse address if it exists
      let addressData = {
        street: '',
        lga: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Nigeria',
        fullAddress: data.realtor.residentialAddress || ''
      };

      setFormData({
        phoneNumber: data.realtor.phoneNumber || '',
        residentialAddress: addressData,
        bankName: data.realtor.bankName || '',
        accountNumber: data.realtor.accountNumber || '',
        accountName: data.realtor.accountName || '',
        profileImage: data.realtor.profileImage || '/dashboard/avatar.svg'
      });
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (address: AddressData) => {
    setFormData(prev => ({
      ...prev,
      residentialAddress: address
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    const loadingToast = toast.loading('Updating profile...');
    
    try {
      const updateData = {
        phoneNumber: formData.phoneNumber,
        residentialAddress: formData.residentialAddress.fullAddress,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        profileImage: formData.profileImage
      };
      
      await profileApi.updateRealtorProfile(updateData);
      
      toast.dismiss(loadingToast);
      toast.success('Profile updated successfully!');
      
      // Reload profile to get updated data
      await loadProfile();
      
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error('Error updating profile:', error);
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
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
            This is your profile, {user?.firstName}!
          </h1>
        </div>
        <p className="text-gray-600 ml-5">
          Update your personal information, contact details, and account preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Photo</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                type="button"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#703BF7] text-white rounded-full flex items-center justify-center hover:bg-[#5f2fd6] transition-colors"
              >
                <FiCamera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Update your photo</h3>
              <p className="text-sm text-gray-500 mb-3">This will be displayed on your profile</p>
              <button 
                type="button"
                className="text-[#703BF7] hover:text-[#5f2fd6] text-sm font-medium"
              >
                Choose file
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiUser className="inline w-4 h-4 mr-2" />
                First Name
              </label>
              <input
                type="text"
                value={profile?.user?.firstName || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">Contact admin to change your name</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiUser className="inline w-4 h-4 mr-2" />
                Last Name
              </label>
              <input
                type="text"
                value={profile?.user?.lastName || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={profile?.user?.email || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">Contact admin to change your email</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                placeholder="+234-800-123-4567"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiMapPin className="w-5 h-5" />
            Residential Address
          </h2>
          
          <AddressInput
            value={formData.residentialAddress}
            onChange={handleAddressChange}
            placeholder="Enter your residential address"
            className="w-full"
          />
        </div>

        {/* Bank Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Bank Account Details</h2>
          <p className="text-sm text-gray-600 mb-6">
            This information is required for commission payments. All withdrawals are processed every Friday.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                placeholder="e.g., First Bank Nigeria"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                placeholder="1234567890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                placeholder="Account holder name"
                required
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#703BF7] text-white px-6 py-3 rounded-lg hover:bg-[#5f2fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}