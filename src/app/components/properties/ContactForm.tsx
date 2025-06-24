"use client";

import { useState } from 'react';

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
    agreeToTerms: boolean;
}

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
        message: '',
        agreeToTerms: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full mx-auto px-4 md:px-0 py-12 ">
            <div className=" mb-8 mt-8">
                <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A2A52] mb-3">Let's Make it Happen</h2>
                <p className="text-[#3A3A3C] max-w-[600px] text-[14px] md:text-[16px]">
                    Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait, let's embark on this exciting journey together.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] appearance-none bg-white text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                        >
                            <option value="">Select Location</option>
                            <option value="lekki">Lekki</option>
                            <option value="ikoyi">Ikoyi</option>
                            <option value="vi">Victoria Island</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">Property Type</label>
                    <div className="relative">
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] appearance-none bg-white text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                        >
                            <option value="">Select Property Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="duplex">Duplex</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Fourth Row */}
                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">No. of Bathrooms</label>
                    <div className="relative">
                        <select
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] appearance-none bg-white text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                        >
                            <option value="">Select no. of bathrooms</option>
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">No. of Bedrooms</label>
                    <div className="relative">
                        <select
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] appearance-none bg-white text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                        >
                            <option value="">Select no. of bedrooms</option>
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Fifth Row */}
                <div className="space-y-2">
                    <label className="block text-sm text-[#1A2A52]">Budget</label>
                    <div className="relative">
                        <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] appearance-none bg-white text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF]"
                        >
                            <option value="">Select Budget</option>
                            <option value="50-100">₦50M - ₦100M</option>
                            <option value="100-200">₦100M - ₦200M</option>
                            <option value="200-500">₦200M - ₦500M</option>
                            <option value="500+">₦500M+</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
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

                {/* Terms and Submit Button */}
                <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                            className="w-4 h-4 text-[#1FD2AF] border-[#EBEBEB] rounded focus:ring-[#1FD2AF]"
                        />
                        <span className="text-sm text-[#3A3A3C]">
                            I agree with <a href="/terms" className="text-[#1FD2AF] hover:underline">Terms of Use</a> and <a href="/privacy" className="text-[#1FD2AF] hover:underline">Privacy Policy</a>
                        </span>
                    </label>
                    <button
                        type="submit"
                        className="bg-[#1FD2AF] text-white px-6 py-3 rounded-[10px] hover:bg-[#1AB89A] transition-colors"
                    >
                        Send Your Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm; 