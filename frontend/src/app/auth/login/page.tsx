'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { authApi } from '../../../lib/api-endpoints';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show success message if redirected from registration
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      toast.success(message);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Signing you in...');
    
    try {
      const response = await authApi.login(formData.email, formData.password);
      
      // Store authentication data
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      toast.dismiss(loadingToast);
      toast.success(`Welcome back, ${response.user.firstName}!`);
      
      // Redirect based on user role (removed INVESTOR)
      switch (response.user.role) {
        case 'ADMIN':
          router.push('/admin/dashboard');
          break;
        case 'REALTOR':
          router.push('/realtor/dashboard');
          break;
        default:
          router.push('/');
      }
      
    } catch (error: any) {
      toast.dismiss(loadingToast);
      
      if (error?.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5F7] via-white to-[#1FD2AF]/5 flex">
      <Toaster position="top-center" />
      
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full">
          {/* Back to Home Link */}
          <Link 
            href="/" 
            className="inline-flex items-center text-[#1A2A52] hover:text-[#1FD2AF] transition-colors mb-8 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#1A2A52] mb-3">
              Welcome Back
            </h1>
            <p className="text-lg text-[#3A3A3C]">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#1A2A52] mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FD2AF] focus:border-[#1FD2AF] transition-all text-[#1A2A52] placeholder-gray-400"
                  placeholder="you@example.com"
                  required
                />
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#1A2A52] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FD2AF] focus:border-[#1FD2AF] transition-all text-[#1A2A52] placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#1A2A52] transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1FD2AF] text-white py-4 px-6 rounded-lg hover:bg-[#1AB89A] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#1FD2AF]/20"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#3A3A3C]">
              Don't have an account?{' '}
              <Link href="/contact" className="text-[#1FD2AF] hover:text-[#1AB89A] font-semibold transition-colors">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1A2A52] to-[#2A3A62] items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1FD2AF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1FD2AF]/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/20">
              <svg className="w-12 h-12 text-[#1FD2AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Your trusted partner in real estate management
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#1FD2AF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#1FD2AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Property Management</h3>
                <p className="text-gray-300">Comprehensive property maintenance and management solutions</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#1FD2AF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#1FD2AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Smart Investments</h3>
                <p className="text-gray-300">Fractional property ownership and investment opportunities</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#1FD2AF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#1FD2AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Expert Realtors</h3>
                <p className="text-gray-300">Professional realtors to help you find your dream property</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}