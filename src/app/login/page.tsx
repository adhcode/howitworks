'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [loginData, setLoginData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false
    });

    const [signupData, setSignupData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login data:', loginData);
            setIsLoading(false);
        }, 2000);
    };

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Signup data:', signupData);
            setIsLoading(false);
        }, 2000);
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSignupData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F5F7] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block mb-6">
                        <Image src="/logo.svg" alt="Howitworks Logo" width={48} height={48} />
                    </Link>
                    <h2 className="text-3xl font-bold text-[#1A2A52]">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </h2>
                    <p className="mt-2 text-[#3A3A3C]">
                        {isLogin
                            ? 'Sign in to access your real estate dashboard'
                            : 'Join thousands of users finding their dream homes'
                        }
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Toggle Buttons */}
                    <div className="flex bg-[#F4F5F7] rounded-lg p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${isLogin
                                    ? 'bg-white text-[#1A2A52] shadow-sm'
                                    : 'text-[#3A3A3C] hover:text-[#1A2A52]'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${!isLogin
                                    ? 'bg-white text-[#1A2A52] shadow-sm'
                                    : 'text-[#3A3A3C] hover:text-[#1A2A52]'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                        className="w-full pl-10 pr-4 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        className="w-full pl-10 pr-12 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] hover:text-[#1A2A52]"
                                    >
                                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={loginData.rememberMe}
                                        onChange={handleLoginChange}
                                        className="w-4 h-4 text-[#1FD2AF] border-[#EBEBEB] rounded focus:ring-[#1FD2AF]"
                                    />
                                    <span className="ml-2 text-sm text-[#3A3A3C]">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm text-[#1FD2AF] hover:text-[#1AB89A]">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#1FD2AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    ) : (
                        /* Signup Form */
                        <form onSubmit={handleSignupSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            value={signupData.firstName}
                                            onChange={handleSignupChange}
                                            className="w-full pl-10 pr-4 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                            placeholder="First name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            value={signupData.lastName}
                                            onChange={handleSignupChange}
                                            className="w-full pl-10 pr-4 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                            placeholder="Last name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="signupEmail" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                    <input
                                        id="signupEmail"
                                        name="email"
                                        type="email"
                                        required
                                        value={signupData.email}
                                        onChange={handleSignupChange}
                                        className="w-full pl-10 pr-4 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="signupPassword" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                    <input
                                        id="signupPassword"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={signupData.password}
                                        onChange={handleSignupChange}
                                        className="w-full pl-10 pr-12 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] hover:text-[#1A2A52]"
                                    >
                                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1A2A52] mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] w-5 h-5" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={signupData.confirmPassword}
                                        onChange={handleSignupChange}
                                        className="w-full pl-10 pr-12 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] hover:text-[#1A2A52]"
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-start">
                                <input
                                    name="agreeToTerms"
                                    type="checkbox"
                                    checked={signupData.agreeToTerms}
                                    onChange={handleSignupChange}
                                    className="w-4 h-4 text-[#1FD2AF] border-[#EBEBEB] rounded focus:ring-[#1FD2AF] mt-0.5"
                                />
                                <label className="ml-2 text-sm text-[#3A3A3C]">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-[#1FD2AF] hover:text-[#1AB89A]">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="text-[#1FD2AF] hover:text-[#1AB89A]">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !signupData.agreeToTerms}
                                className="w-full bg-[#1FD2AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </button>
                        </form>
                    )}

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#EBEBEB]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-[#3A3A3C]">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="w-full inline-flex justify-center py-2 px-4 border border-[#EBEBEB] rounded-lg shadow-sm bg-white text-sm font-medium text-[#3A3A3C] hover:bg-[#F4F5F7] transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>

                            <button className="w-full inline-flex justify-center py-2 px-4 border border-[#EBEBEB] rounded-lg shadow-sm bg-white text-sm font-medium text-[#3A3A3C] hover:bg-[#F4F5F7] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span className="ml-2">Twitter</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link href="/" className="text-sm text-[#3A3A3C] hover:text-[#1FD2AF] transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
} 