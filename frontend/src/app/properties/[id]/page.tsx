"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FAQ from '@/app/components/FAQ';
import { usePropertyDetail } from '@/hooks/use-property-detail';
import { leadApi } from '@/lib/api-endpoints';
import toast, { Toaster } from 'react-hot-toast';
import { getReferralCode, clearReferralCode } from '@/app/components/ReferralTracker';



interface InquiryForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredDate: string;
    selectedProperty: string;
    message: string;
    agreeToTerms: boolean;
}



const PropertyDetails = () => {
    const params = useParams();
    const propertyId = params.id as string;

    const { property, loading, error, refetch } = usePropertyDetail(propertyId);
    const [selectedImage, setSelectedImage] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<InquiryForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        selectedProperty: '',
        message: '',
        agreeToTerms: false
    });

    // Update form data when property loads
    useEffect(() => {
        if (property) {
            setFormData(prev => ({
                ...prev,
                selectedProperty: property.title
            }));
        }
    }, [property]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!property) return;

        setSubmitting(true);
        const loadingToast = toast.loading('Sending your inquiry...', { position: 'top-right' });

        try {
            // Get referral code if available
            const referralCode = getReferralCode();

            const leadData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                message: `${formData.message}${formData.preferredDate ? `\n\nPreferred viewing date: ${formData.preferredDate}` : ''}`,
                propertyId: property.id,
                realtorId: property.realtorId || '', // Use property's realtor ID
                source: referralCode ? 'referral_link' : (property.realtor ? 'property_listing' : 'direct_inquiry')
            };

            await leadApi.create(leadData);

            // Clear referral code after successful lead creation
            if (referralCode) {
                clearReferralCode();
            }

            toast.dismiss(loadingToast);
            toast.success('Your inquiry has been sent successfully! We\'ll get back to you soon.', {
                duration: 5000,
                position: 'top-right'
            });

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                preferredDate: '',
                selectedProperty: property.title,
                message: '',
                agreeToTerms: false
            });

        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error?.message || 'Failed to send inquiry. Please try again.', {
                duration: 5000,
                position: 'top-right'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5a2fd4]"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">Property not found</p>
                    <p className="text-gray-500 text-sm mt-2">The property you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-4 py-4 md:py-8 mt-6 md:mt-12">
            <Toaster />
            {/* Property Title and Price */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6">
                <div className="w-full md:w-auto mb-4 md:mb-0">
                    <h1 className="text-[20px] md:text-[24px] font-semibold text-[#191919] mb-2">{property.title}</h1>
                    <div className="flex flex-row items-center justify-between w-full md:w-auto">
                        <div className="flex items-center gap-2 text-[14px] border border-[#EBEBEB] rounded-[6px] px-[8px] py-[8px] md:text-[16px] font-semibold text-[#2E2E2E]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 14.6667C9.66667 13.3333 12 10.4667 12 6.66667C12 3.72115 10.2091 1.33333 8 1.33333C5.79086 1.33333 4 3.72115 4 6.66667C4 10.4667 6.33333 13.3333 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {property.location}
                        </div>
                        <div className="md:hidden flex flex-row items-center gap-2 text-[#666666]">
                            <p className="text-sm text-[#666666]">Price</p>
                            <p className="text-[16px] md:text-[20px] font-semibold text-[#2E2E2E]">{formatPrice(property.price)}</p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <p className="text-sm text-[#666666]">Price</p>
                    <p className="text-[24px] font-semibold text-[#191919]">{formatPrice(property.price)}</p>
                </div>
            </div>

            {/* Image Gallery */}
            {property.images && property.images.length > 0 ? (
                <div className="mb-8 md:mb-12 bg-[#FAFAFA] rounded-[12px] p-[16px] md:p-[40px]">
                    {/* Desktop Thumbnails */}
                    <div className="hidden md:flex gap-2 mb-4 overflow-x-auto">
                        {property.images.map((image: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative w-24 h-16 flex-shrink-0 rounded-[10px] overflow-hidden ${selectedImage === index ? 'ring-2 ring-[#703BF7]' : ''}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${property.title} - Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                {selectedImage !== index && (
                                    <div className="absolute inset-0 bg-black/50" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Main Images */}
                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative h-[280px] md:h-[400px] rounded-[12px] overflow-hidden">
                                <Image
                                    src={property.images[selectedImage]}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {selectedImage + 1 < property.images.length && (
                                <div className="relative h-[400px] rounded-[12px] overflow-hidden hidden md:block">
                                    <Image
                                        src={property.images[selectedImage + 1]}
                                        alt={`${property.title} - Next Image`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Thumbnails */}
                    <div className="md:hidden mt-4">
                        <div className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-[12px] p-[10px]">
                            <div className="grid grid-cols-4 gap-2 w-full">
                                {property.images.slice(0, 4).map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-[4/3] rounded-[10px] overflow-hidden ${selectedImage === index ? 'ring-2 ring-[#703BF7]' : ''}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${property.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        {selectedImage !== index && (
                                            <div className="absolute inset-0 bg-black/50" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="mt-4 md:mt-6">
                        <div className="flex items-center justify-center gap-4 md:gap-8">
                            <button
                                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : property.images.length - 1)}
                                className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-[#FAFAFA] rounded-full flex items-center justify-center border border-[#EBEBEB]"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12.5 15.8334L6.66667 10L12.5 4.16669" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(6)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-[8px] md:w-[11.17px] h-[3px] rounded-[60px] ${selectedImage === index ? 'bg-[#703BF7]' : 'bg-[#E1E1E1]'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setSelectedImage(prev => prev < property.images.length - 1 ? prev + 1 : 0)}
                                className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-[#FAFAFA] rounded-full flex items-center justify-center border border-[#EBEBEB]"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 4.16669L13.3333 10L7.5 15.8334" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-8 md:mb-12 bg-[#FAFAFA] rounded-[12px] p-[16px] md:p-[40px]">
                    <div className="relative h-[280px] md:h-[400px] rounded-[12px] overflow-hidden bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>No images available for this property</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Description and Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
                {/* Description */}
                <div className="border border-[#EBEBEB] rounded-[12px] p-4 md:p-6 md:h-fit w-full">
                    <h2 className="text-[18px] md:text-xl font-semibold text-[#191919] mb-4">Description</h2>
                    <p className="text-[14px] md:text-base text-[#666666] leading-relaxed mb-6">{property.description}</p>
                    {/* Property Details */}
                    <div className="relative pt-6">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#EBEBEB]"></div>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/icons/bedroom.svg"
                                        alt="Bedroom"
                                        width={20}
                                        height={20}
                                        className="text-[#666666]"
                                    />
                                    <span className="text-[#666666] text-sm">Bedrooms</span>
                                </div>
                                <span className="font-semibold text-16 md:text-[20px] text-[#191919] mt-2">{property.bedrooms || 0}</span>
                            </div>
                            <div className="flex flex-col items-start border-t md:border-t-0 md:border-l border-[#EBEBEB] pt-4 md:pt-0 md:pl-4">
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <Image
                                        src="/icons/bathroom.svg"
                                        alt="Bathroom"
                                        width={20}
                                        height={20}
                                        className="text-[#666666]"
                                    />
                                    <span className="text-[#666666] text-sm">Bathrooms</span>
                                </div>
                                <span className="font-semibold text-16 md:text-[20px] text-[#191919] mt-2">{property.bathrooms || 0}</span>
                            </div>
                            <div className="flex flex-col items-start border-t md:border-t-0 md:border-l border-[#EBEBEB] pt-4 md:pt-0 md:pl-4">
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <Image
                                        src="/icons/area.svg"
                                        alt="Area"
                                        width={20}
                                        height={20}
                                        className="text-[#666666]"
                                    />
                                    <span className="text-[#666666] text-sm">Area</span>
                                </div>
                                <span className="font-semibold text-16 md:text-[20px] text-[#191919] mt-2">{property.area ? `${property.area} sqm` : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="border border-[#EBEBEB] rounded-[12px] p-4 md:p-6 md:h-fit w-full">
                    <h2 className="text-[18px] md:text-xl font-semibold text-[#191919] mb-4">Property Information</h2>
                    <div className="grid gap-3">
                        <div
                            className="flex items-center gap-2 px-4 py-3 border-l border-l-[#703BF7]"
                            style={{ background: 'linear-gradient(90deg, #E1E1E1 0%, rgba(225, 225, 225, 0) 100%)' }}
                        >
                            <Image src="/icons/amenities.svg" alt="Check" width={20} height={20} />
                            <span className="text-[14px] md:text-base text-[#191919]">Property Type: {property.propertyType}</span>
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-3 border-l border-l-[#703BF7]"
                            style={{ background: 'linear-gradient(90deg, #E1E1E1 0%, rgba(225, 225, 225, 0) 100%)' }}
                        >
                            <Image src="/icons/amenities.svg" alt="Check" width={20} height={20} />
                            <span className="text-[14px] md:text-base text-[#191919]">Status: {property.status}</span>
                        </div>
                        {(property as any).featured && (
                            <div
                                className="flex items-center gap-2 px-4 py-3 border-l border-l-[#703BF7]"
                                style={{ background: 'linear-gradient(90deg, #E1E1E1 0%, rgba(225, 225, 225, 0) 100%)' }}
                            >
                                <Image src="/icons/amenities.svg" alt="Check" width={20} height={20} />
                                <span className="text-[14px] md:text-base text-[#191919]">⭐ Featured Property</span>
                            </div>
                        )}
                        {property.realtor && (
                            <div
                                className="flex items-center gap-2 px-4 py-3 border-l border-l-[#703BF7]"
                                style={{ background: 'linear-gradient(90deg, #E1E1E1 0%, rgba(225, 225, 225, 0) 100%)' }}
                            >
                                <Image src="/icons/amenities.svg" alt="Check" width={20} height={20} />
                                <span className="text-[14px] md:text-base text-[#191919]">
                                    Listed by: {property.realtor.user.firstName} {property.realtor.user.lastName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Inquiry Form Section */}
            <div className="w-full -mx-4 bg-white px-4 py-8 md:py-16">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-4">
                            <h2 className="text-[20px] md:text-[38px] font-semibold mb-2">Inquire About {property.title}</h2>
                            <p className="text-[14px] md:text-[16px] text-[#666666]">
                                Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.
                            </p>
                        </div>

                        {/* Right Column - Form */}
                        <div className="lg:col-span-8">
                            {/* Referral Indicator */}
                            {getReferralCode() && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-blue-800">
                                        You're being assisted by one of our verified realtors
                                    </p>
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label className="block text-sm mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter First Name"
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Last Name"
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Email"
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter Phone Number"
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7]"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm mb-2">Preferred Viewing Date</label>
                                    <input
                                        type="text"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Preferred Viewing Date"
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7]"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm mb-2">Selected Property</label>
                                    <input
                                        type="text"
                                        name="selectedProperty"
                                        value={formData.selectedProperty}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7] bg-[#F5F5F5]"
                                        readOnly
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Message here"
                                        className="w-full px-4 py-3 rounded-lg border border-[#E1E1E1] focus:outline-none focus:border-[#703BF7] min-h-[120px]"
                                    />
                                </div>

                                <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-[#E1E1E1] text-[#703BF7] focus:ring-[#703BF7]"
                                            required
                                        />
                                        <span className="text-sm text-[#666666]">I agree with Terms of Use and Privacy Policy</span>
                                    </label>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-3 bg-[#703BF7] text-white rounded-lg hover:bg-[#5f32d1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {submitting && (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                        {submitting ? 'Sending...' : 'Send Your Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <FAQ />
        </div>
    );
};

export default PropertyDetails; 