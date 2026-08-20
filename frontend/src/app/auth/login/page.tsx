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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
      <Toaster position="top-center" />
      
      {/* Centered Login Form */}
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
  );
}