'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiCamera, FiEye, FiEyeOff } from 'react-icons/fi';
import { realtorApi } from '../../../../lib/api-endpoints';
import toast, { Toaster } from 'react-hot-toast';
import AddressInput from '../../../../components/AddressInput';

interface InvitationData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  expiresAt: string;
}

interface AddressData {
  street: string;
  lga: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  fullAddress: string;
}

interface RealtorSignupForm {
  phoneNumber: string;
  residentialAddress: AddressData;
  password: string;
  confirmPassword: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  profileImage: string;
  agreeToTerms: boolean;
}

const initialFormData: RealtorSignupForm = {
  phoneNumber: '',
  residentialAddress: {
    street: '',
    lga: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    fullAddress: ''
  },
  password: '',
  confirmPassword: '',
  bankName: '',
  accountNumber: '',
  accountName: '',
  profileImage: '/dashboard/avatar.svg',
  agreeToTerms: false
};

export default function RealtorSignup() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  
  // Debug logging
  console.log('RealtorSignup page loaded');
  console.log('Token from params:', token);
  console.log('Full params:', params);
  
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RealtorSignupForm>(initialFormData);

  useEffect(() => {
    validateInvitation();
  }, [token]);

  const validateInvitation = async () => {
    try {
      setLoading(true);
      const response = await realtorApi.validateInvitation(token);
      
      if (response.status === 'PENDING' && new Date(response.expiresAt) > new Date()) {
        setInvitation(response);
        // Pre-fill account name with the invited person's name
        setFormData(prev => ({
          ...prev,
          accountName: `${response.firstName} ${response.lastName}`
        }));
      } else {
        toast.error('This invitation has expired or is no longer valid');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Error validating invitation:', error);
      toast.error('Invalid or expired invitation link');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddressChange = (address: AddressData) => {
    setFormData(prev => ({
      ...prev,
      residentialAddress: address
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.phoneNumber.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    
    if (!formData.residentialAddress.fullAddress.trim()) {
      toast.error('Residential address is required');
      return false;
    }
    
    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    if (!formData.bankName.trim()) {
      toast.error('Bank name is required');
      return false;
    }
    
    if (!formData.accountNumber.trim()) {
      toast.error('Account number is required');
      return false;
    }
    
    if (!formData.accountName.trim()) {
      toast.error('Account name is required');
      return false;
    }
    
    if (!formData.agreeToTerms) {
      toast.error('You must agree to the terms and conditions');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    const loadingToast = toast.loading('Creating your realtor account...');
    
    try {
      const realtorData = {
        phoneNumber: formData.phoneNumber,
        residentialAddress: formData.residentialAddress.fullAddress,
        password: formData.password,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        profileImage: formData.profileImage
      };
      
      await realtorApi.acceptInvitation(token, realtorData);
      
      toast.dismiss(loadingToast);
      toast.success('Account created successfully! You can now log in.');
      
      // Redirect to login page
      router.push('/auth/login?message=Account created successfully. Please log in.');
      
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error('Error creating realtor account:', error);
      toast.error(error?.message || 'Failed to create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Invalid or expired invitation</p>
          <Link href="/" className="text-[#703BF7] hover:underline">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="text-xl font-bold text-[#703BF7]">HowItWorks</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#703BF7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Realtor Registration</h1>
            <p className="text-gray-600">
              Welcome <span className="font-medium">{invitation.firstName} {invitation.lastName}</span>! 
              Complete your profile to start using HowItWorks as a realtor.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Email: {invitation.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
                  <Image
                    src={formData.profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
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
              <p className="text-sm text-gray-500">Click to upload profile photo</p>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                  placeholder="+234-800-123-4567"
                  required
                />
              </div>

              <div>
                <AddressInput
                  label="Residential Address"
                  value={formData.residentialAddress}
                  onChange={handleAddressChange}
                  placeholder="Enter your residential address"
                  required
                  className="w-full"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
              <p className="text-sm text-gray-500 mb-4">
                This information is required for commission payments. All withdrawals are processed every Friday.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                    placeholder="Account holder name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t pt-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-[#703BF7] focus:ring-[#703BF7] border-gray-300 rounded"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#703BF7] hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#703BF7] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#703BF7] text-white py-3 px-4 rounded-md hover:bg-[#5f2fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {submitting ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}