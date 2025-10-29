"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import FAQ from '@/app/components/FAQ';

interface Property {
    id: string;
    title: string;
    location: string;
    description: string;
    price: number;
    details: {
        bedrooms: number;
        bathrooms: number;
        area: string;
    };
    features: string[];
    images: string[];
    agent: {
        name: string;
        phone: string;
        email: string;
        image: string;
    };
}

interface InquiryForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredDate: string;
    realtorId: string;
    selectedProperty: string;
    message: string;
    agreeToTerms: boolean;
}

const PROPERTY_DATA: Property = {
    id: '1',
    title: 'Luxurious 4-Bedroom Duplex with BQ in Lekki Phase 1',
    location: 'Lekki Phase 1, Lagos',
    description: 'Discover your own piece of paradise with this 4-bedroom apartment. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.',
    price: 95000000,
    details: {
        bedrooms: 0o4,
        bathrooms: 0o3,
        area: '2,500 Square Feet',
    },
    features: [
        'Smart Lighting & AC',
        'En-suite Bedrooms',
        'Fitted Kitchen with Island',
        '24/7 Security',
        'Private Balcony',
        'Inverter/Backup Power',
        'Gated Estate',
        'Walk-in Closet',
        'Water Heater'
    ],
    images: [
        '/house/house1.png',
        '/house/house2.png',
        '/house/house4.png',
        '/house/house5.png',
        '/house/house7.png',
        '/house/house8.png',
        '/house/house9.png',
        '/house/house10.png',
        '/house/house11.png'
    ],
    agent: {
        name: 'John Doe',
        phone: '+234 123 456 7890',
        email: 'john@example.com',
        image: '/team/agent1.jpg'
    }
};

const PropertyDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [property, setProperty] = useState<Property>(PROPERTY_DATA);
    const [formData, setFormData] = useState<InquiryForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        realtorId: '',
        selectedProperty: PROPERTY_DATA.title,
        message: '',
        agreeToTerms: false
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString()}`;
    };

    if (!property || !property.images) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-4 py-4 md:py-8 mt-6 md:mt-12">
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
            {property.images && property.images.length > 0 && (
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
                                <span className="font-semibold text-16 md:text-[20px] text-[#191919] mt-2">{property.details.bedrooms}</span>
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
                                <span className="font-semibold text-16 md:text-[20px] text-[#191919] mt-2">{property.details.bathrooms}</span>
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
                                <span className="font-semibold text-16 md:text-[20px] text-[#191919] mt-2">{property.details.area}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="border border-[#EBEBEB] rounded-[12px] p-4 md:p-6 md:h-fit w-full">
                    <h2 className="text-[18px] md:text-xl font-semibold text-[#191919] mb-4">Key Features and Amenities</h2>
                    {property.features && (
                        <div className="grid gap-3">
                            {property.features.map((feature: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-3 border-l border-l-[#703BF7]"
                                    style={{ background: 'linear-gradient(90deg, #E1E1E1 0%, rgba(225, 225, 225, 0) 100%)' }}
                                >
                                    <Image src="/icons/amenities.svg" alt="Check" width={20} height={20} />
                                    <span className="text-[14px] md:text-base text-[#191919]">{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Inquiry Form Section */}
            <div className="w-full -mx-4 bg-white px-4 py-8 md:py-16">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-4">
                            <h2 className="text-[20px] md:text-[38px] font-semibold mb-2">Inquire About Luxury 4-Bedroom Apartment</h2>
                            <p className="text-[14px] md:text-[16px] text-[#666666]">
                                Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.
                            </p>
                        </div>

                        {/* Right Column - Form */}
                        <div className="lg:col-span-8">
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

                                <div>
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

                                <div>
                                    <label className="block text-sm mb-2">Realtor Referral ID</label>
                                    <input
                                        type="text"
                                        name="realtorId"
                                        value={formData.realtorId}
                                        onChange={handleInputChange}
                                        placeholder="111111222"
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
                                        className="px-6 py-3 bg-[#703BF7] text-white rounded-lg hover:bg-[#5f32d1] transition-colors"
                                    >
                                        Send Your Message
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