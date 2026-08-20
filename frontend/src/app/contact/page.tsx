"use client";

import { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { leadApi } from '@/lib/api-endpoints';

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    inquiryType: string;
    hearAboutUs: string;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        hearAboutUs: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            setSubmitStatus({
                type: 'error',
                message: 'Please fill in all required fields'
            });
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitStatus({ type: null, message: '' });

            // Prepare lead data for backend (realtorId is optional)
            const leadData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                message: `
Inquiry Type: ${formData.inquiryType || 'Not specified'}
How they heard about us: ${formData.hearAboutUs || 'Not specified'}

Message: ${formData.message || 'No additional message'}
                `.trim(),
                source: 'Contact Page Form'
            };

            console.log('📤 Submitting contact form:', leadData);

            // Submit to backend
            const response = await leadApi.create(leadData);
            
            console.log('✅ Contact form submitted:', response);

            // Success - show modal
            setSubmitStatus({
                type: 'success',
                message: 'Thank you for reaching out! We will get back to you soon.'
            });

        } catch (error: any) {
            console.error('❌ Error submitting contact form:', error);
            setSubmitStatus({
                type: 'error',
                message: error?.message || 'Failed to submit your inquiry. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-white">
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
                                        inquiryType: '',
                                        hearAboutUs: '',
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

            {/* Header Section - Gray background */}
            <div className="bg-[#F4F5F7] pb-16">
                <div className="container mx-auto px-4 md:px-0 pt-12">
                    <section className="mb-12">
                        <h1 className="text-[32px] md:text-[38px] font-semibold text-[#1A2A52] mb-4">Get in Touch with Us</h1>
                        <p className="text-[#3A3A3C] text-base md:text-lg max-w-3xl">
                            Welcome to Howitwork Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation.
                        </p>
                    </section>
                </div>
            </div>

            {/* Contact Cards - White background section with overlap */}
            <div className="bg-white pt-12">
                <div className="container mx-auto px-4 md:px-0 -mt-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {/* Email Card */}
                        <a 
                            href="mailto:info@howitworks.com.ng"
                            className="bg-white p-6 rounded-[12px] border border-[#EBEBEB] hover:border-[#1FD2AF] transition-all relative shadow-sm hover:shadow-md group cursor-pointer"
                        >
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#1FD2AF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <div className="flex flex-col space-y-4 items-center justify-center min-h-[140px]">
                                <div className="w-[60px] h-[60px] rounded-full bg-[#E8F9F5] flex items-center justify-center group-hover:bg-[#1FD2AF] transition-colors">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="group-hover:scale-110 transition-transform">
                                        <path d="M20 23.3334H8C4.66667 23.3334 2.33334 21.3334 2.33334 17.6667V10.3334C2.33334 6.66671 4.66667 4.66671 8 4.66671H20C23.3333 4.66671 25.6667 6.66671 25.6667 10.3334V17.6667C25.6667 21.3334 23.3333 23.3334 20 23.3334Z" stroke="#1FD2AF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                        <path d="M20 10.6667L16.18 13.6167C14.98 14.56 13.01 14.56 11.81 13.6167L8 10.6667" stroke="#1FD2AF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#666666] text-[12px] mb-1">Email</p>
                                    <h3 className="text-[#1A2A52] font-semibold text-[14px]">info@howitworks.com.ng</h3>
                                </div>
                            </div>
                        </a>

                        {/* Phone Card */}
                        <a 
                            href="tel:+2348061230727"
                            className="bg-white p-6 rounded-[12px] border border-[#EBEBEB] hover:border-[#1FD2AF] transition-all relative shadow-sm hover:shadow-md group cursor-pointer"
                        >
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#1FD2AF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <div className="flex flex-col space-y-4 items-center justify-center min-h-[140px]">
                                <div className="w-[60px] h-[60px] rounded-full bg-[#E8F9F5] flex items-center justify-center group-hover:bg-[#1FD2AF] transition-colors">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="group-hover:scale-110 transition-transform">
                                        <path d="M25.6667 19.74V22.12C25.6681 22.3649 25.6216 22.6078 25.5303 22.8343C25.439 23.0607 25.305 23.2662 25.1358 23.4389C24.9665 23.6115 24.7653 23.7478 24.5437 23.84C24.3221 23.9322 24.0847 23.9786 23.8453 23.9767C21.3532 23.7187 18.9634 22.8965 16.8567 21.5783C14.9008 20.3804 13.2114 18.691 12.0133 16.7351C10.6867 14.6166 9.86437 12.2124 9.61334 9.70671C9.61148 9.46805 9.65736 9.23135 9.74893 9.01033C9.8405 8.78931 9.97596 8.58852 10.1478 8.41964C10.3196 8.25076 10.5244 8.11702 10.7501 8.02594C10.9758 7.93486 11.218 7.88829 11.4627 7.88871H13.8427C14.2573 7.88463 14.6597 8.03225 14.9754 8.30138C15.2912 8.57051 15.4998 8.94136 15.5627 9.34938C15.6807 10.1654 15.8893 10.9666 16.1847 11.7384C16.3027 12.0295 16.3347 12.348 16.277 12.6567C16.2193 12.9654 16.0742 13.2514 15.8587 13.4817L14.8213 14.5191C15.9313 16.5446 17.506 18.1193 19.5313 19.2294L20.5687 18.192C20.799 17.9765 21.085 17.8314 21.3937 17.7737C21.7024 17.716 22.0209 17.748 22.312 17.866C23.0838 18.1614 23.885 18.37 24.701 18.488C25.1136 18.5517 25.4882 18.7644 25.7576 19.0851C26.027 19.4058 26.1719 19.8142 26.1667 20.2334L25.6667 19.74Z" stroke="#1FD2AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#666666] text-[12px] mb-1">Phone</p>
                                    <h3 className="text-[#1A2A52] font-semibold text-[14px]">+234 806 123 0727</h3>
                                </div>
                            </div>
                        </a>

                        {/* Location Card */}
                        <a 
                            href="https://maps.google.com/?q=Lekki+Lagos+Nigeria"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-6 rounded-[12px] border border-[#EBEBEB] hover:border-[#1FD2AF] transition-all relative shadow-sm hover:shadow-md group cursor-pointer"
                        >
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#1FD2AF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <div className="flex flex-col space-y-4 items-center justify-center min-h-[140px]">
                                <div className="w-[60px] h-[60px] rounded-full bg-[#E8F9F5] flex items-center justify-center group-hover:bg-[#1FD2AF] transition-colors">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="group-hover:scale-110 transition-transform">
                                        <path d="M14 15.1667C15.933 15.1667 17.5 13.5996 17.5 11.6667C17.5 9.73367 15.933 8.16671 14 8.16671C12.067 8.16671 10.5 9.73367 10.5 11.6667C10.5 13.5996 12.067 15.1667 14 15.1667Z" stroke="#1FD2AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                        <path d="M14 25.6667C17.5 22.1667 23.3333 16.0167 23.3333 11.6667C23.3333 6.51204 19.1546 2.33337 14 2.33337C8.84535 2.33337 4.66669 6.51204 4.66669 11.6667C4.66669 16.0167 10.5 22.1667 14 25.6667Z" stroke="#1FD2AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#666666] text-[12px] mb-1">Location</p>
                                    <h3 className="text-[#1A2A52] font-semibold text-[14px]">Lekki, Lagos</h3>
                                </div>
                            </div>
                        </a>

                        {/* Social Media Card */}
                        <div className="bg-white p-6 rounded-[12px] border border-[#EBEBEB] hover:border-[#1FD2AF] transition-all relative shadow-sm hover:shadow-md group">
                            <div className="absolute top-4 right-4">
                                <GoArrowUpRight className="w-5 h-5 text-[#1FD2AF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <div className="flex flex-col space-y-4 items-center justify-center min-h-[140px]">
                                <div className="w-[60px] h-[60px] rounded-full bg-[#E8F9F5] flex items-center justify-center group-hover:bg-[#1FD2AF] transition-colors">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="group-hover:scale-110 transition-transform">
                                        <path d="M14 25.6667C20.4434 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55672 20.4434 2.33337 14 2.33337C7.55672 2.33337 2.33337 7.55672 2.33337 14C2.33337 20.4434 7.55672 25.6667 14 25.6667Z" stroke="#1FD2AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                        <path d="M9.33337 14C9.33337 14 11.6667 16.3334 14 16.3334C16.3334 16.3334 18.6667 14 18.6667 14C18.6667 14 16.3334 11.6667 14 11.6667C11.6667 11.6667 9.33337 14 9.33337 14Z" stroke="#1FD2AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#666666] text-[12px] mb-1">Follow Us</p>
                                    <h3 className="text-[#1A2A52] font-semibold text-[14px]">Social Media</h3>
                                </div>
                                {/* Animated Social Media Handles - Shows on hover */}
                                <div className="absolute inset-0 bg-[#1FD2AF] rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3 p-4">
                                    <a href="https://facebook.com/howitworks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:scale-110 transition-transform">
                                        <FaFacebookF className="w-4 h-4" />
                                        <span className="text-sm font-medium">@howitworks</span>
                                    </a>
                                    <a href="https://twitter.com/howitworks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:scale-110 transition-transform">
                                        <FaTwitter className="w-4 h-4" />
                                        <span className="text-sm font-medium">@howitworks</span>
                                    </a>
                                    <a href="https://instagram.com/howitworks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:scale-110 transition-transform">
                                        <FaInstagram className="w-4 h-4" />
                                        <span className="text-sm font-medium">@howitworks</span>
                                    </a>
                                    <a href="https://linkedin.com/company/howitworks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:scale-110 transition-transform">
                                        <FaLinkedinIn className="w-4 h-4" />
                                        <span className="text-sm font-medium">@howitworks</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the content - Centered with max width */}
            <div className="bg-white">
                <div className="container mx-auto px-4 md:px-0">
                    {/* Let's Connect Section */}
                    <div className="max-w-3xl mb-16 md:mb-24">
                        <div className="mb-8">
                            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A2A52] mb-3">Let's Connect</h2>
                            <p className="text-[#3A3A3C] text-base md:text-lg">
                                We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with us. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.
                            </p>
                        </div>

                        {/* Error Message Banner */}
                        {submitStatus.type === 'error' && (
                            <div className="mb-6">
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

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm text-[#1A2A52] mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter First Name"
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#1A2A52] mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Last Name"
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#1A2A52] mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your Email"
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#1A2A52] mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter Phone Number"
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#1A2A52] mb-2">Inquiry Type</label>
                                <select
                                    name="inquiryType"
                                    value={formData.inquiryType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors appearance-none bg-white"
                                >
                                    <option value="">Select Inquiry Type</option>
                                    <option value="buy">Looking to Buy</option>
                                    <option value="sell">Looking to Sell</option>
                                    <option value="rent">Looking to Rent</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-[#1A2A52] mb-2">How Did You Hear About Us?</label>
                                <select
                                    name="hearAboutUs"
                                    value={formData.hearAboutUs}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] text-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors appearance-none bg-white"
                                >
                                    <option value="">How Did You Hear About Us?</option>
                                    <option value="social">Social Media</option>
                                    <option value="search">Search Engine</option>
                                    <option value="referral">Referral</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#1A2A52] mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Enter your Message here..."
                                    className="w-full px-4 py-3 rounded-[10px] border border-[#EBEBEB] placeholder-[#3A3A3C] focus:outline-none focus:border-[#1FD2AF] transition-colors min-h-[120px] resize-none"
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#1FD2AF] text-white px-8 py-3 rounded-[10px] hover:bg-[#1AB89A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
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

                    {/* Office Locations Section */}
                    <div className="pb-16">
                        <div className="mb-8 md:mb-12">
                            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A2A52] mb-3">Discover Our Office Locations</h2>
                            <p className="text-[#3A3A3C] text-base md:text-lg">
                                Howitworks is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs.
                            </p>
                        </div>

                        {/* Office Location Card */}
                        <div className="bg-[#F4F5F7] rounded-[12px] p-6 md:p-8 border border-[#EBEBEB] hover:border-[#1FD2AF] transition-all">
                            <h3 className="text-base md:text-lg font-medium text-[#666666] mb-2">Main Headquarters</h3>
                            <h4 className="text-lg md:text-xl font-semibold text-[#2E2E2E] mb-3">Lekki Phase 1, Lagos, Nigeria</h4>
                            <p className="text-[#666666] text-base mb-6">
                                Our main headquarters serve as the heart of Howitworks. Located in the vibrant Lekki district of Lagos, this is where our core team of experts operates, driving the excellence and innovation that define us.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                                <a href="mailto:info@howitworks.com.ng" className="flex items-center gap-2 text-[#2E2E2E] text-sm md:text-base hover:text-[#1FD2AF] transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.1667 17.0833H5.83333C3.33333 17.0833 1.66667 15.8333 1.66667 12.9167V7.08333C1.66667 4.16667 3.33333 2.91667 5.83333 2.91667H14.1667C16.6667 2.91667 18.3333 4.16667 18.3333 7.08333V12.9167C18.3333 15.8333 16.6667 17.0833 14.1667 17.0833Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29167 10.2667 8.43333 9.58333L5.83333 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    info@howitworks.com.ng
                                </a>
                                <a href="tel:+2348061230727" className="flex items-center gap-2 text-[#2E2E2E] text-sm md:text-base hover:text-[#1FD2AF] transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M18.3334 14.1V16.6C18.3334 17.0203 18.1578 17.4235 17.8452 17.7235C17.5327 18.0236 17.1144 18.1792 16.6834 18.1667C14.0001 17.9333 11.4167 17.0167 9.15008 15.5167C7.02508 14.1333 5.21675 12.325 3.83341 10.2C2.33341 7.925 1.41675 5.33333 1.18341 2.66667C1.17103 2.23696 1.32621 1.82039 1.62541 1.50911C1.92461 1.19784 2.32643 1.02223 2.75008 1H5.25008C6.01675 1 6.68341 1.54167 6.83341 2.29167C6.96675 3.025 7.15008 3.73333 7.38341 4.41667C7.55008 4.88333 7.43341 5.4 7.08341 5.75L6.00008 6.83333C7.29175 9 9.00008 10.7083 11.1667 12C11.5167 11.65 11.8667 11.3 12.2167 10.95C12.5667 10.6 13.0834 10.4833 13.5501 10.65C14.2334 10.8833 14.9417 11.0667 15.6751 11.2C16.4417 11.35 17.0001 12.0333 17.0001 12.8167L18.3334 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    +234 806 123 0727
                                </a>
                                <div className="flex items-center gap-2 text-[#2E2E2E] text-sm md:text-base">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 10.8333C11.3807 10.8333 12.5 9.71396 12.5 8.33329C12.5 6.95262 11.3807 5.83329 10 5.83329C8.61929 5.83329 7.5 6.95262 7.5 8.33329C7.5 9.71396 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 18.3333C12.0833 16.6666 15 13.0833 15 8.33329C15 4.65139 12.7614 1.66663 10 1.66663C7.23858 1.66663 5 4.65139 5 8.33329C5 13.0833 7.91667 16.6666 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Lagos, Nigeria
                                </div>
                            </div>

                            <a 
                                href="https://maps.google.com/?q=Lekki+Phase+1+Lagos+Nigeria"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 w-full md:w-auto bg-[#1FD2AF] text-white py-3 px-8 rounded-[10px] hover:bg-[#1AB89A] transition-colors font-medium text-center justify-center"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71396 12.5 8.33329C12.5 6.95262 11.3807 5.83329 10 5.83329C8.61929 5.83329 7.5 6.95262 7.5 8.33329C7.5 9.71396 8.61929 10.8333 10 10.8333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 18.3333C12.0833 16.6666 15 13.0833 15 8.33329C15 4.65139 12.7614 1.66663 10 1.66663C7.23858 1.66663 5 4.65139 5 8.33329C5 13.0833 7.91667 16.6666 10 18.3333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Get Direction
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 