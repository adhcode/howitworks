"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export default function AdminSignUpPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [awaitingCode, setAwaitingCode] = useState(false);
    const [code, setCode] = useState('');

    const [data, setData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!data.agreeToTerms) {
            setError('You must agree to the terms');
            return;
        }
        if (data.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Starting signup process...');

            // Create account with minimal required fields
            // This part would typically involve an API call to your backend
            // For demonstration, we'll just simulate success
            console.log('Simulating signup complete...');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

            // In a real application, you would send data.email and data.password to your backend
            // and handle the response (success, verification required, error)
            // For now, we'll just redirect to a success page or dashboard
            router.push('/admin/dashboard');
            return;

        } catch (err: any) {
            console.error('Full signup error:', err);
            console.error('Error object keys:', Object.keys(err));
            console.error('Error message:', err.message);
            console.error('Error errors array:', err.errors);

            let errorMessage = 'Sign up failed';

            if (err.errors && err.errors.length > 0) {
                const firstError = err.errors[0];
                errorMessage = firstError.longMessage || firstError.message || 'Sign up failed';
                console.error('First error code:', firstError.code);
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            // This part would typically involve an API call to your backend
            // For demonstration, we'll just simulate success
            console.log('Simulating verification complete...');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

            // In a real application, you would send the code to your backend
            // and handle the response (success, error)
            // For now, we'll just redirect to a success page or dashboard
            router.push('/admin/dashboard');
            return;

        } catch (err: any) {
            console.error('Verification error:', err);
            setError(err?.errors?.[0]?.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (awaitingCode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F5F7] to-white p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
                    <h2 className="text-xl font-semibold mb-4 text-center">Verify your email</h2>
                    <p className="text-sm text-gray-600 mb-6 text-center">Enter the 6-digit code sent to {data.email}</p>
                    <form onSubmit={handleCodeSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            maxLength={6}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="123456"
                            required
                        />
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1FD2AF] text-white py-2 rounded-md disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying…' : 'Verify'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F5F7] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block mb-6">
                        <Image src="/logo.svg" alt="Howitworks Logo" width={48} height={48} />
                    </Link>
                    <h2 className="text-3xl font-bold text-[#1A2A52]">Create admin account</h2>
                    <p className="mt-2 text-[#3A3A3C]">Only admins can create accounts.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                        value={data.firstName}
                                        onChange={handleChange}
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
                                        value={data.lastName}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                        </div>

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
                                    value={data.email}
                                    onChange={handleChange}
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
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
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
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-[#EBEBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent placeholder-[#3A3A3C]"
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3A3A3C] hover:text-[#1A2A52]"
                                >
                                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center">
                            <input
                                id="agreeToTerms"
                                name="agreeToTerms"
                                type="checkbox"
                                checked={data.agreeToTerms}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#1FD2AF] border-[#EBEBEB] rounded focus:ring-[#1FD2AF]"
                            />
                            <label htmlFor="agreeToTerms" className="ml-2 text-sm text-[#3A3A3C]">
                                I agree to the terms and conditions
                            </label>
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1FD2AF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 