"use client";

import { useState } from 'react';
import Image from 'next/image';
import { GoArrowUpRight } from 'react-icons/go';

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    inquiryType: string;
    hearAboutUs: string;
    message: string;
    agreeToTerms: boolean;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        hearAboutUs: '',
        message: '',
        agreeToTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="w-full bg-[#FAFAFA]">
            {/* Header Section - Centered with max width */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
                <div className="mb-12 md:mb-16">
                    <h1 className="text-[24px] md:text-[38px] font-semibold mb-4">Get in Touch with Us</h1>
                    <p className="text-[#666666] text-sm md:text-base max-w-3xl">
                        Welcome to Howitwork Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation.
                    </p>
                </div>
            </div>

            {/* Desktop Contact Cards - Full Width Section */}
            <div className="hidden lg:block w-screen bg-[#FAFAFA] py-2 border-b border-t border-[#EBEBEB]">
                <div className="grid grid-cols-4 gap-[30px] max-w-[1500px] mx-auto px-4">
                    {/* Email Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-[#F5F1FF] flex items-center justify-center">
                                <Image
                                    src="/contacts/message.svg"
                                    alt="Email"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px]">info@example.com</h3>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-[#F5F1FF] flex items-center justify-center">
                                <Image
                                    src="/contacts/number.svg"
                                    alt="Phone"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px]">+234 8456-7890</h3>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-[#F5F1FF] flex items-center justify-center">
                                <Image
                                    src="/contacts/headqtr.svg"
                                    alt="Location"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px]">Main Headquarters</h3>
                        </div>
                    </div>

                    {/* Social Media Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center">
                            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                                <Image
                                    src="/contacts/socials.svg"
                                    alt="Social Media"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px]">Instagram LinkedIn Facebook</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Contact Cards */}
            <div className="lg:hidden max-w-7xl mx-auto px-4 mb-16">
                <div className="grid grid-cols-2 gap-4">
                    {/* Email Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center min-h-[160px]">
                            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                                <Image
                                    src="/contacts/message.svg"
                                    alt="Email"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px] text-center">info@example.com</h3>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center min-h-[160px]">
                            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                                <Image
                                    src="/contacts/number.svg"
                                    alt="Phone"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px] text-center">+234 8456-7890</h3>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center min-h-[160px]">
                            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                                <Image
                                    src="/contacts/headqtr.svg"
                                    alt="Location"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px] text-center">Main Headquarters</h3>
                        </div>
                    </div>

                    {/* Social Media Card */}
                    <div className="bg-[#FAFAFA] p-6 rounded-[10px] border border-[#EBEBEB] transition-all relative">
                        <div className="absolute top-4 right-4">
                            <GoArrowUpRight className="w-5 h-5 text-[#666666]" />
                        </div>
                        <div className="flex flex-col space-y-4 items-center justify-center min-h-[160px]">
                            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center">
                                <Image
                                    src="/contacts/socials.svg"
                                    alt="Social Media"
                                    width={60}
                                    height={60}
                                />
                            </div>
                            <h3 className="text-[#2E2E2E] font-medium text-[14px] text-center">Instagram LinkedIn Facebook</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the content - Centered with max width */}
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Let's Connect Section */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Let's Connect</h2>
                        <p className="text-[#666666] text-sm md:text-base">
                            We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with us. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.
                        </p>
                    </div>

                    {/* Form - Left aligned */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter First Name"
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter Last Name"
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your Email"
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter Phone Number"
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7]"
                                required
                            />
                        </div>

                        <div>
                            <select
                                name="inquiryType"
                                value={formData.inquiryType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7] appearance-none"
                                required
                            >
                                <option value="">Select Inquiry Type</option>
                                <option value="buy">Looking to Buy</option>
                                <option value="sell">Looking to Sell</option>
                                <option value="rent">Looking to Rent</option>
                                <option value="other">Other Inquiry</option>
                            </select>
                        </div>

                        <div>
                            <select
                                name="hearAboutUs"
                                value={formData.hearAboutUs}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7] appearance-none"
                                required
                            >
                                <option value="">How Did You Hear About Us?</option>
                                <option value="social">Social Media</option>
                                <option value="search">Search Engine</option>
                                <option value="referral">Referral</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Enter your Message here"
                                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] border-none focus:outline-none focus:ring-2 focus:ring-[#703BF7] min-h-[120px]"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 md:justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleCheckboxChange}
                                    className="w-5 h-5 rounded border-none bg-[#F9F9F9] text-[#703BF7] focus:ring-[#703BF7]"
                                    required
                                />
                                <span className="text-sm text-[#666666]">I agree with Terms of Use and Privacy Policy</span>
                            </label>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#703BF7] text-white rounded-lg hover:bg-[#5f32d1] transition-colors"
                            >
                                Send Your Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Office Locations Section - Left aligned */}
                <div>
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Discover Our Office Locations</h2>
                        <p className="text-[#666666] text-sm md:text-base">
                            Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you.
                        </p>
                    </div>

                    {/* Office Location Card - Left aligned */}
                    <div className="bg-white rounded-lg p-6 md:p-8">
                        <h3 className="text-base md:text-lg font-medium text-[#666666] mb-2">Main Headquarters</h3>
                        <h4 className="text-lg md:text-xl font-semibold mb-3">123 Howitwork Plaza, City Center, Metropolis</h4>
                        <p className="text-[#666666] text-sm md:text-base mb-6">
                            Our main headquarters serve as the heart of Howitwork. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                            <div className="flex items-center gap-2 text-[#666666] text-sm md:text-base">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M14.1667 17.0833H5.83333C3.33333 17.0833 1.66667 15.8333 1.66667 12.9167V7.08333C1.66667 4.16667 3.33333 2.91667 5.83333 2.91667H14.1667C16.6667 2.91667 18.3333 4.16667 18.3333 7.08333V12.9167C18.3333 15.8333 16.6667 17.0833 14.1667 17.0833Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29167 10.2667 8.43333 9.58333L5.83333 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                info@example.com
                            </div>
                            <div className="flex items-center gap-2 text-[#666666] text-sm md:text-base">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M18.3334 14.1V16.6C18.3334 17.0203 18.1578 17.4235 17.8452 17.7235C17.5327 18.0236 17.1144 18.1792 16.6834 18.1667C14.0001 17.9333 11.4167 17.0167 9.15008 15.5167C7.02508 14.1333 5.21675 12.325 3.83341 10.2C2.33341 7.925 1.41675 5.33333 1.18341 2.66667C1.17103 2.23696 1.32621 1.82039 1.62541 1.50911C1.92461 1.19784 2.32643 1.02223 2.75008 1H5.25008C6.01675 1 6.68341 1.54167 6.83341 2.29167C6.96675 3.025 7.15008 3.73333 7.38341 4.41667C7.55008 4.88333 7.43341 5.4 7.08341 5.75L6.00008 6.83333C7.29175 9 9.00008 10.7083 11.1667 12C11.5167 11.65 11.8667 11.3 12.2167 10.95C12.5667 10.6 13.0834 10.4833 13.5501 10.65C14.2334 10.8833 14.9417 11.0667 15.6751 11.2C16.4417 11.35 17.0001 12.0333 17.0001 12.8167L18.3334 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                +1 (123) 456-7890
                            </div>
                            <div className="flex items-center gap-2 text-[#666666] text-sm md:text-base">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71396 12.5 8.33329C12.5 6.95262 11.3807 5.83329 10 5.83329C8.61929 5.83329 7.5 6.95262 7.5 8.33329C7.5 9.71396 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 18.3333C12.0833 16.6666 15 13.0833 15 8.33329C15 4.65139 12.7614 1.66663 10 1.66663C7.23858 1.66663 5 4.65139 5 8.33329C5 13.0833 7.91667 16.6666 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Lagos
                            </div>
                        </div>

                        <button className="w-full bg-[#703BF7] text-white py-3 rounded-lg hover:bg-[#5f32d1] transition-colors">
                            Get Direction
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 