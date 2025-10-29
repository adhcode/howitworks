'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiDollarSign, FiHome, FiCheckCircle } from 'react-icons/fi';

export default function InvestmentFormPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        investmentAmount: '',
        investmentDuration: '12',
        sourceOfFunds: '',
        experience: '',
        goals: '',
        agreeToTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F4F5F7] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#1FD2AF]">
                            <FiCheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-[#1A2A52]">
                            Application Submitted!
                        </h2>
                        <p className="mt-2 text-sm text-[#3A3A3C]">
                            Thank you for your interest in our building maintenance investment opportunity.
                            Our team will review your application and contact you within 24-48 hours.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <Link
                            href="/"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
                        >
                            Return to Home
                        </Link>
                        <Link
                            href="/services/smart-investments"
                            className="w-full flex justify-center py-2 px-4 border border-[#1FD2AF] rounded-md shadow-sm text-sm font-medium text-[#1FD2AF] hover:bg-[#1FD2AF] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
                        >
                            Learn More About Our Investment
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F5F7] to-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#1A2A52] to-[#1FD2AF] py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <Link
                            href="/services/smart-investments"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Investment Details
                        </Link>

                        <h1 className="text-4xl font-bold mb-4">
                            Investment Application
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Complete this form to start your journey with our building maintenance investment opportunity.
                            Earn steady returns from rental income, service fees, and property appreciation.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

                {/* Investment Summary */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-[#1A2A52] mb-4">Investment Summary</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <FiDollarSign className="text-[#1FD2AF] mr-3" />
                                <span className="text-[#3A3A3C]">Expected Returns: <strong>15-25% annually</strong></span>
                            </div>
                            <div className="flex items-center">
                                <FiHome className="text-[#1FD2AF] mr-3" />
                                <span className="text-[#3A3A3C]">Investment Type: <strong>Building Maintenance</strong></span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <FiCheckCircle className="text-[#1FD2AF] mr-3" />
                                <span className="text-[#3A3A3C]">Fully Secured & Legally Backed</span>
                            </div>
                            <div className="flex items-center">
                                <FiCheckCircle className="text-[#1FD2AF] mr-3" />
                                <span className="text-[#3A3A3C]">Transparent Reporting</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                    <div className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-6">Personal Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        First Name *
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Last Name *
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Investment Details */}
                        <div>
                            <h3 className="text-xl font-semibold text-[#1A2A52] mb-6">Investment Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="investmentAmount" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Investment Amount (₦) *
                                    </label>
                                    <div className="relative">
                                        <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            id="investmentAmount"
                                            name="investmentAmount"
                                            required
                                            min="100000"
                                            step="10000"
                                            value={formData.investmentAmount}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                            placeholder="Minimum ₦100,000"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Minimum investment: ₦100,000</p>
                                </div>

                                <div>
                                    <label htmlFor="investmentDuration" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Investment Duration *
                                    </label>
                                    <select
                                        id="investmentDuration"
                                        name="investmentDuration"
                                        required
                                        value={formData.investmentDuration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                    >
                                        <option value="12">12 months</option>
                                        <option value="24">24 months</option>
                                        <option value="36">36 months</option>
                                        <option value="48">48 months</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="sourceOfFunds" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Source of Funds *
                                    </label>
                                    <select
                                        id="sourceOfFunds"
                                        name="sourceOfFunds"
                                        required
                                        value={formData.sourceOfFunds}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                    >
                                        <option value="">Select source of funds</option>
                                        <option value="savings">Personal Savings</option>
                                        <option value="salary">Salary/Employment Income</option>
                                        <option value="business">Business Income</option>
                                        <option value="inheritance">Inheritance</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                        Investment Experience *
                                    </label>
                                    <select
                                        id="experience"
                                        name="experience"
                                        required
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                    >
                                        <option value="">Select experience level</option>
                                        <option value="beginner">Beginner (0-2 years)</option>
                                        <option value="intermediate">Intermediate (2-5 years)</option>
                                        <option value="advanced">Advanced (5+ years)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Investment Goals */}
                        <div>
                            <label htmlFor="goals" className="block text-sm font-medium text-[#3A3A3C] mb-2">
                                Investment Goals
                            </label>
                            <textarea
                                id="goals"
                                name="goals"
                                rows={4}
                                value={formData.goals}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] focus:border-transparent"
                                placeholder="Tell us about your investment goals and what you hope to achieve..."
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                required
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-[#1FD2AF] focus:ring-[#1FD2AF] border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="agreeToTerms" className="ml-3 text-sm text-[#3A3A3C]">
                                I agree to the{' '}
                                <Link href="/terms" className="text-[#1FD2AF] hover:text-[#1AB89A]">
                                    Terms and Conditions
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-[#1FD2AF] hover:text-[#1AB89A]">
                                    Privacy Policy
                                </Link>
                                . I understand that this investment involves risk and past performance does not guarantee future returns.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.agreeToTerms}
                                className="w-full bg-[#1FD2AF] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Submitting Application...' : 'Submit Investment Application'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Contact Information */}
                <div className="mt-8 text-center">
                    <p className="text-[#3A3A3C]">
                        Questions? Contact us at{' '}
                        <a href="mailto:investments@howitworks.com" className="text-[#1FD2AF] hover:text-[#1AB89A]">
                            investments@howitworks.com
                        </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        How It Works Global Limited - Building Wealth through Maintenance
                    </p>
                </div>
            </div>
        </div>
    );
} 