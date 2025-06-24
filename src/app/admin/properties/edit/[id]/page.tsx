'use client'

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

export default function EditProperty({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        propertyName: 'Luxurious 4-Bedroom Duplex with BQ in Lekki Phase I',
        propertyPrice: '₦85,000,000',
        fullAddress: 'Lekki Phase I',
        stateAndCity: 'Lagos State',
        propertyType: 'Select',
        bedrooms: '25',
        bathrooms: '25',
        areaInSqFeet: '25',
        keyFeatures: [
            'Smart Lighting & AC',
            'En-suite Bathrooms',
            'Fitted kitchen with Island',
            '24/7 Security',
            'Private Balcony'
        ],
        description: 'Discover your own piece of excellence with this 4-bedroom apartment. I. With an open floor plan, breathtaking ocean views from every room, and direct access to pristine sandy beach. This property is the epitome of coastal living.',
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
        ]
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            keyFeatures: [...prev.keyFeatures, '']
        }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
        }));
    };

    const updateFeature = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            keyFeatures: prev.keyFeatures.map((feature, i) => i === index ? value : feature)
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-properties"
                    onLogout={() => setShowLogoutModal(true)}
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    {/* Header */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    {/* Content */}
                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Link href="/admin/properties" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <FiArrowLeft className="w-4 h-4" />
                                Back
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                        Manage Properties
                                    </h1>
                                    <span className="text-gray-400 hidden sm:inline">&gt;</span>
                                    <span className="text-[#703BF7] font-medium">Edit Property</span>
                                </div>
                            </div>
                            <button className="w-full sm:w-auto bg-[#703BF7] text-white px-6 py-2 rounded-md hover:bg-[#5f2fd6] transition-colors">
                                Save
                            </button>
                        </div>

                        {/* Edit Form */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="p-4 lg:p-6">
                                <form className="space-y-6">
                                    {/* Property Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.propertyName}
                                            onChange={(e) => handleInputChange('propertyName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                        />
                                    </div>

                                    {/* Property Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Price
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.propertyPrice}
                                            onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                        />
                                    </div>

                                    {/* Address and Location */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Address
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.fullAddress}
                                                onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State & City Description
                                            </label>
                                            <select
                                                value={formData.stateAndCity}
                                                onChange={(e) => handleInputChange('stateAndCity', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            >
                                                <option value="Lagos State">Lagos State</option>
                                                <option value="Abuja">Abuja</option>
                                                <option value="Port Harcourt">Port Harcourt</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Property Type
                                            </label>
                                            <select
                                                value={formData.propertyType}
                                                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            >
                                                <option value="Select">Select</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="House">House</option>
                                                <option value="Villa">Villa</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Bedrooms
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.bedrooms}
                                                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Bathrooms
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.bathrooms}
                                                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Area by Square Feet
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.areaInSqFeet}
                                                onChange={(e) => handleInputChange('areaInSqFeet', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            />
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Key Features and Amenities
                                        </label>
                                        <div className="space-y-2">
                                            {formData.keyFeatures.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) => updateFeature(index, e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                                        placeholder="Type"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFeature(index)}
                                                        className="p-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addFeature}
                                                className="flex items-center gap-2 text-[#703BF7] hover:text-[#5f2fd6] text-sm font-medium"
                                            >
                                                <FiPlus className="w-4 h-4" />
                                                Add new feature
                                            </button>
                                        </div>
                                    </div>

                                    {/* Property Images */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Images (Add multiple)
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Upload File Only PNG</p>
                                        </div>

                                        {/* Existing Images */}
                                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                    <Image
                                                        src={image}
                                                        alt={`Property ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent text-sm lg:text-base"
                                            placeholder="Nothing"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 lg:p-6 border-t border-gray-200 bg-gray-50">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button className="flex-1 bg-[#703BF7] text-white py-3 rounded-md hover:bg-[#5f2fd6] transition-colors font-medium">
                                        Save
                                    </button>
                                    <Link
                                        href="/admin/properties"
                                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium text-center"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 