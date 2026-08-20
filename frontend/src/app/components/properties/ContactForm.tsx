"use client";

import { useState } from 'react';
import { leadApi } from '@/lib/api-endpoints';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    propertyType: string;
    bathrooms: string;
    bedrooms: string;
    budget: string;
    contactMethod: 'phone' | 'email';
    message: string;
}

interface DropdownOption {
    value: string;
    label: string;
}

const LOCATIONS: DropdownOption[] = [
    { value: 'lekki', label: 'Lekki' },
    { value: 'ikoyi', label: 'Ikoyi' },
    { value: 'vi', label: 'Victoria Island' },
    { value: 'ikeja', label: 'Ikeja' },
    { value: 'lagos-island', label: 'Lagos Island' },
    { value: 'yaba', label: 'Yaba' },
];

const PROPERTY_TYPES: DropdownOption[] = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'mansion', label: 'Mansion' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'townhouse', label: 'Townhouse' },
];

const BATHROOM_OPTIONS: DropdownOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' },
];

const BEDROOM_OPTIONS: DropdownOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' },
];

const BUDGET_OPTIONS: DropdownOption[] = [
    { value: '0-10', label: '₦0 - ₦10M' },
    { value: '10-30', label: '₦10M - ₦30M' },
    { value: '30-50', label: '₦30M - ₦50M' },
    { value: '50-100', label: '₦50M - ₦100M' },
    { value: '100-200', label: '₦100M - ₦200M' },
    { value: '200+', label: '₦200M+' },
];

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        propertyType: '',
        bathrooms: '',
        bedrooms: '',
        budget: '',
        contactMethod: 'phone',
        message: ''
    });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check required fields based on contact method
        if (formData.contactMethod === 'phone' && !formData.phone) {
            setSubmitStatus({
                type: 'error',
                message: 'Please enter your phone number'
            });
            return;
        }

        if (formData.contactMethod === 'email' && !formData.email) {
            setSubmitStatus({
                type: 'error',
                message: 'Please enter your email address'
            });
            return;
        }

        if (!formData.firstName || !formData.lastName) {
            setSubmitStatus({
                type: 'error',
                message: 'Please enter your full name'
            });
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitStatus({ type: null, message: '' });

            // Prepare lead data for backend
            const leadData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.contactMethod === 'email' ? formData.email : '',
                phone: formData.contactMethod === 'phone' ? formData.phone : '',
                message: `
Location: ${getDropdownLabel('location', LOCATIONS, 'Not specified')}
Property Type: ${getDropdownLabel('propertyType', PROPERTY_TYPES, 'Not specified')}
Bedrooms: ${getDropdownLabel('bedrooms', BEDROOM_OPTIONS, 'Not specified')}
Bathrooms: ${getDropdownLabel('bathrooms', BATHROOM_OPTIONS, 'Not specified')}
Budget: ${getDropdownLabel('budget', BUDGET_OPTIONS, 'Not specified')}
Preferred Contact: ${formData.contactMethod}

Message: ${formData.message || 'No additional message'}
                `.trim(),
                source: 'Property Contact Form'
            };

            console.log('📤 Submitting lead:', leadData);

            // Submit to backend
            const response = await leadApi.create(leadData);
            
            console.log('✅ Lead created:', response);

            // Success - reset form and show success message
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your inquiry has been submitted successfully. We\'ll get back to you soon!'
            });

            // Scroll to top of form to show message
            const formElement = document.getElementById('contact-form');
            window.scrollTo({
                top: formElement?.offsetTop ? formElement.offsetTop - 100 : 0,
                behavior: 'smooth'
            });

            // Reset form after 5 seconds
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    location: '',
                    propertyType: '',
                    bathrooms: '',
                    bedrooms: '',
                    budget: '',
                    contactMethod: 'phone',
                    message: ''
                });
                setSubmitStatus({ type: null, message: '' });
            }, 5000);

        } catch (error: any) {
            console.error('❌ Error submitting lead:', error);
            setSubmitStatus({
                type: 'error',
                message: error?.message || 'Failed to submit your inquiry. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDropdownSelect = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (dropdownId: string) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const getDropdownLabel = (field: keyof FormData, options: DropdownOption[], placeholder: string) => {
        const value = formData[field] as string;
        if (!value) return placeholder;
        const option = options.find(opt => opt.value === value);
        return option?.label || placeholder;
    };

    return (
        <div className="w-full mx-auto px-4 md:px-0 py-12 " id="contact-form">
            {/* Success Modal Overlay */}
            {submitStatus.type === 'success' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-[20px] p-8 max-w-md w-full shadow-2xl animate-slideUp">
                        <div className="text-center">
                            {/* Success Icon */}
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            {/* Success Message */}
                            <h3 className="text-[24px] font-semibold text-[#1A2A52] mb-3">
                                Message Sent Successfully!
                            </h3>
                            <p className="text-[#3A3A3C] mb-6">
                                Thank you for reaching out! We've received your inquiry and our team will get back to you within 24 hours.
                            </p>
                            
                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setSubmitStatus({ type: null, message: '' });
                                    setFormData({
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        phone: '',
                                        location: '',
                                        propertyType: '',
                                        bathrooms: '',
                                        bedrooms: '',
                                        budget: '',
                                        contactMethod: 'phone',
                                        message: ''
                                    });
                                }}
                                className="bg-[#1FD2AF] text-white px-8 py-3 rounded-[10px] hover:bg-[#1AB89A] transition-colors font-medium"
                            >
                                Got it, thanks!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className=" mb-8 mt-8">
                <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A2A52] mb-3">Let's Make it Happen</h2>
                <p className="text-[#3A3A3C] max-w-[600px] text-[14px] md:text-[16px]">
                    Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait, let's embark on this exciting journey together.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Error Message Only (Success shows in modal) */}
                {submitStatus.type === 'error' && (
                    <div className="md:col-span-2">
                        <div className="p-4 rounded-[10px] bg-red-50 border border-red-200 text-red-800">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm font-medium">{submitStatus.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* First Row */}
                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                    />
                </div>


                {/* Third Row */}
                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">Preferred Location</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => toggleDropdown('location')}
                            className={`w-full px-4 py-3 rounded-[10px] border transition-colors text-left flex items-center justify-between ${
                                formData.location 
                                    ? 'border-[#1FD2AF] text-[#1A2A52]' 
                                    : 'border-[#EBEBEB] text-[#3A3A3C]'
                            } hover:border-[#1FD2AF] focus:outline-none focus:border-[#1FD2AF]`}
                        >
                            <span>{getDropdownLabel('location', LOCATIONS, 'Select Location')}</span>
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className={`transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`}
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'location' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {LOCATIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleDropdownSelect('location', option.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            formData.location === option.value 
                                                ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' 
                                                : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">Property Type</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => toggleDropdown('propertyType')}
                            className={`w-full px-4 py-3 rounded-[10px] border transition-colors text-left flex items-center justify-between ${
                                formData.propertyType 
                                    ? 'border-[#1FD2AF] text-[#1A2A52]' 
                                    : 'border-[#EBEBEB] text-[#3A3A3C]'
                            } hover:border-[#1FD2AF] focus:outline-none focus:border-[#1FD2AF]`}
                        >
                            <span>{getDropdownLabel('propertyType', PROPERTY_TYPES, 'Select Property Type')}</span>
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className={`transition-transform ${openDropdown === 'propertyType' ? 'rotate-180' : ''}`}
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'propertyType' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {PROPERTY_TYPES.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleDropdownSelect('propertyType', option.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            formData.propertyType === option.value 
                                                ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' 
                                                : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Fourth Row */}
                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">No. of Bathrooms</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => toggleDropdown('bathrooms')}
                            className={`w-full px-4 py-3 rounded-[10px] border transition-colors text-left flex items-center justify-between ${
                                formData.bathrooms 
                                    ? 'border-[#1FD2AF] text-[#1A2A52]' 
                                    : 'border-[#EBEBEB] text-[#3A3A3C]'
                            } hover:border-[#1FD2AF] focus:outline-none focus:border-[#1FD2AF]`}
                        >
                            <span>{getDropdownLabel('bathrooms', BATHROOM_OPTIONS, 'Select no. of bathrooms')}</span>
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className={`transition-transform ${openDropdown === 'bathrooms' ? 'rotate-180' : ''}`}
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'bathrooms' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg">
                                {BATHROOM_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleDropdownSelect('bathrooms', option.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            formData.bathrooms === option.value 
                                                ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' 
                                                : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">No. of Bedrooms</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => toggleDropdown('bedrooms')}
                            className={`w-full px-4 py-3 rounded-[10px] border transition-colors text-left flex items-center justify-between ${
                                formData.bedrooms 
                                    ? 'border-[#1FD2AF] text-[#1A2A52]' 
                                    : 'border-[#EBEBEB] text-[#3A3A3C]'
                            } hover:border-[#1FD2AF] focus:outline-none focus:border-[#1FD2AF]`}
                        >
                            <span>{getDropdownLabel('bedrooms', BEDROOM_OPTIONS, 'Select no. of bedrooms')}</span>
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className={`transition-transform ${openDropdown === 'bedrooms' ? 'rotate-180' : ''}`}
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'bedrooms' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg">
                                {BEDROOM_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleDropdownSelect('bedrooms', option.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            formData.bedrooms === option.value 
                                                ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' 
                                                : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Fifth Row */}
                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">Budget</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => toggleDropdown('budget')}
                            className={`w-full px-4 py-3 rounded-[10px] border transition-colors text-left flex items-center justify-between ${
                                formData.budget 
                                    ? 'border-[#1FD2AF] text-[#1A2A52]' 
                                    : 'border-[#EBEBEB] text-[#3A3A3C]'
                            } hover:border-[#1FD2AF] focus:outline-none focus:border-[#1FD2AF]`}
                        >
                            <span>{getDropdownLabel('budget', BUDGET_OPTIONS, 'Select Budget')}</span>
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className={`transition-transform ${openDropdown === 'budget' ? 'rotate-180' : ''}`}
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'budget' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {BUDGET_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleDropdownSelect('budget', option.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            formData.budget === option.value 
                                                ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' 
                                                : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Contact Method */}
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm text-[#1A2A52]">Preferred Contact Method</label>
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="flex items-center gap-2 px-4 py-3 rounded-[10px] border border-[#EBEBEB] bg-[#F4F5F7]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M18.3334 14.1V16.6C18.3344 16.8321 18.2868 17.0618 18.1938 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1112 17.2006 18.1856C16.9808 18.26 16.7478 18.2876 16.5167 18.2667C13.9523 17.988 11.4892 17.1118 9.32504 15.7083C7.31164 14.4289 5.60494 12.7222 4.32504 10.7083C2.91669 8.53432 2.04019 6.05914 1.76671 3.48333C1.74586 3.25288 1.77321 3.02063 1.84707 2.80138C1.92092 2.58213 2.03963 2.38079 2.19578 2.21011C2.35193 2.03943 2.54211 1.90323 2.75401 1.81021C2.96592 1.71719 3.19492 1.66936 3.42671 1.66666H5.92671C6.32925 1.66268 6.72015 1.80589 7.02814 2.0696C7.33614 2.33332 7.53909 2.69953 7.60004 3.09999C7.71669 3.90005 7.92334 4.67875 8.21671 5.42499C8.33914 5.73532 8.36763 6.07403 8.29935 6.40048C8.23106 6.72694 8.06905 7.02867 7.83337 7.26666L6.80004 8.29999C7.99235 10.3889 9.61115 12.2077 11.7 13.4L12.7334 12.3667C12.9714 12.131 13.2731 11.969 13.5995 11.9007C13.926 11.8324 14.2647 11.8609 14.575 11.9833C15.3213 12.2767 16.1 12.4833 16.9 12.6C17.3049 12.6616 17.6746 12.8688 17.9389 13.1826C18.2032 13.4964 18.3435 13.8938 18.3334 14.3V14.1Z" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="tel"
                                    placeholder="Enter Your Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    name="phone"
                                    className="flex-1 bg-transparent text-[#1A2A52] placeholder:text-[#3A3A3C] focus:outline-none"
                                    disabled={formData.contactMethod !== 'phone'}
                                />
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="phone"
                                    checked={formData.contactMethod === 'phone'}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#1FD2AF] border-[#EBEBEB] focus:ring-[#1FD2AF]"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-2 px-4 py-3 rounded-[10px] border border-[#EBEBEB] bg-[#F4F5F7]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M14.1667 17.0833H5.83333C3.33333 17.0833 1.66666 15.8333 1.66666 12.9167V7.08333C1.66666 4.16666 3.33333 2.91666 5.83333 2.91666H14.1667C16.6667 2.91666 18.3333 4.16666 18.3333 7.08333V12.9167C18.3333 15.8333 16.6667 17.0833 14.1667 17.0833Z" stroke="#3A3A3C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29166 10.2667 8.43333 9.58333L5.83333 7.5" stroke="#3A3A3C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    className="flex-1 bg-transparent text-[#1A2A52] placeholder:text-[#3A3A3C] focus:outline-none"
                                    disabled={formData.contactMethod !== 'email'}
                                />
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value="email"
                                    checked={formData.contactMethod === 'email'}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#1FD2AF] border-[#EBEBEB] focus:ring-[#1FD2AF]"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Message Field - Full Width */}
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm text-[#1A2A52]">Message</label>
                    <textarea
                        name="message"
                        placeholder="Enter your Message here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] resize-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#1FD2AF] text-white px-8 py-3 rounded-[10px] hover:bg-[#1AB89A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Your Message'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm; 