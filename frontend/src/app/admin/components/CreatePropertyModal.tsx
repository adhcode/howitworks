'use client'

import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import AddressInput from '@/components/AddressInput';


interface CreatePropertyModalProps {
    onClose: () => void;
    onSubmit: (data: any, files?: File[]) => void;
    isLoading: boolean;
    isSuccess?: boolean;
}

export default function CreatePropertyModal({ onClose, onSubmit, isLoading, isSuccess }: CreatePropertyModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: {
            street: '',
            lga: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Nigeria',
            fullAddress: ''
        },
        bedrooms: '',
        bathrooms: '',
        area: '',
        propertyType: 'Apartment',
        listingType: 'sale',
        featured: false,
        commissionRate: '3',
        commissionType: 'percentage',
        images: [] as string[]
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleImagesChange = (images: string[]) => {
        setFormData(prev => ({
            ...prev,
            images
        }));
    };

    const handleAddressChange = (address: any) => {
        setFormData(prev => ({
            ...prev,
            location: address
        }));
    };

    const handleFilesChange = (files: File[]) => {
        setImageFiles(files);
    };

    const handleNext = () => {
        if (currentStep === 1) {
            // Validate required fields for step 1
            if (!formData.title || !formData.price || !formData.location.fullAddress) {
                alert('Please fill in all required fields.');
                return;
            }
            if (formData.images.length === 0) {
                alert('Please upload at least one property image.');
                return;
            }
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            location: formData.location.fullAddress, // Send the full address string
            price: parseFloat(formData.price),
            bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
            bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
            area: formData.area ? parseFloat(formData.area) : undefined,
            commissionRate: parseFloat(formData.commissionRate),
            commissionType: formData.commissionType,
        }, imageFiles);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
                        <div className="text-center">
                            <div className="h-8 w-8 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-lg font-medium text-gray-900">Creating Property...</p>
                            <p className="text-sm text-gray-600 mt-2">
                                {imageFiles.length > 0 ? 'Uploading images and creating property...' : 'Processing property details...'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Success Overlay */}
                {isSuccess && (
                    <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-10 rounded-lg">
                        <div className="text-center">
                            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-xl font-semibold text-gray-900 mb-2">Property Created Successfully!</p>
                            <p className="text-sm text-gray-600 mb-4">Your property has been added to the platform.</p>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5a2fd4]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {/* Step Indicator */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Add New Property</h3>
                        <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentStep >= 1 ? 'bg-[#703BF7] text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                1
                            </div>
                            <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-[#703BF7]' : 'bg-gray-200'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentStep >= 2 ? 'bg-[#703BF7] text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                2
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Property Details</span>
                        <span>Review & Confirm</span>
                    </div>
                </div>

                {currentStep === 1 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                            />
                        </div>

                        <div>
                            <AddressInput
                                label="Property Location"
                                value={formData.location}
                                onChange={handleAddressChange}
                                placeholder="Enter property location"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bedrooms
                                </label>
                                <input
                                    type="number"
                                    value={formData.bedrooms}
                                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bathrooms
                                </label>
                                <input
                                    type="number"
                                    value={formData.bathrooms}
                                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Area (sqm)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type *
                                </label>
                                <select
                                    required
                                    value={formData.propertyType}
                                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                >
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Duplex">Duplex</option>
                                    <option value="Flat">Flat</option>
                                </select>
                            </div>
                        </div>

                        {/* Listing Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Listing Type *
                            </label>
                            <select
                                required
                                value={formData.listingType}
                                onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                            >
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                                <option value="investment">For Investment</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Select whether this property is for sale, rent, or investment
                            </p>
                        </div>

                        {/* Commission Settings */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Commission Settings</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Commission Type
                                    </label>
                                    <select
                                        value={formData.commissionType}
                                        onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                    >
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {formData.commissionType === 'percentage' ? 'Commission Rate (%)' : 'Commission Amount (₦)'}
                                    </label>
                                    <input
                                        type="number"
                                        step={formData.commissionType === 'percentage' ? '0.1' : '1'}
                                        value={formData.commissionRate}
                                        onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            {formData.price && formData.commissionRate && formData.commissionType === 'percentage' && (
                                <p className="text-xs text-gray-600 mt-2">
                                    Estimated commission: {formatCurrency(parseFloat(formData.price) * parseFloat(formData.commissionRate) / 100)}
                                </p>
                            )}
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="h-4 w-4 text-[#703BF7] focus:ring-[#703BF7] border-gray-300 rounded"
                            />
                            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                                <span className="font-medium">Featured Property</span>
                                <span className="block text-xs text-gray-500">
                                    Featured properties will be displayed prominently on the home page
                                </span>
                            </label>
                        </div>

                        {/* Image Upload */}
                        <ImageUpload
                            images={formData.images}
                            onImagesChange={handleImagesChange}
                            onFilesChange={handleFilesChange}
                            maxImages={10}
                        />

                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={isLoading}
                                className="px-4 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5a2fd4] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next: Review
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Property Details</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Title:</span>
                                        <p className="text-gray-900">{formData.title}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Price:</span>
                                        <p className="text-gray-900 font-semibold">
                                            {formData.price ? formatCurrency(parseFloat(formData.price)) : 'Not specified'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Location:</span>
                                        <p className="text-gray-900">{formData.location.fullAddress || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Property Type:</span>
                                        <p className="text-gray-900">{formData.propertyType}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Featured:</span>
                                        <p className="text-gray-900">
                                            {formData.featured ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    ⭐ Featured
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">No</span>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Commission:</span>
                                        <p className="text-gray-900">
                                            {formData.commissionType === 'percentage' 
                                                ? `${formData.commissionRate}%` 
                                                : formatCurrency(parseFloat(formData.commissionRate))}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Bedrooms:</span>
                                        <p className="text-gray-900">{formData.bedrooms || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Bathrooms:</span>
                                        <p className="text-gray-900">{formData.bathrooms || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Area:</span>
                                        <p className="text-gray-900">{formData.area ? `${formData.area} sqm` : 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Images:</span>
                                        <p className="text-gray-900">{formData.images.length} uploaded</p>
                                    </div>
                                </div>
                            </div>

                            {formData.description && (
                                <div className="mt-4">
                                    <span className="text-sm font-medium text-gray-600">Description:</span>
                                    <p className="text-gray-900 mt-1">{formData.description}</p>
                                </div>
                            )}

                            {/* Image Preview Grid */}
                            {formData.images.length > 0 && (
                                <div className="mt-4">
                                    <span className="text-sm font-medium text-gray-600">Property Images:</span>
                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
                                        {formData.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Property ${index + 1}`}
                                                className="w-full h-16 object-cover rounded border"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        Confirm Property Creation
                                    </h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>Please review all details carefully. Once created, this property will be visible to investors and realtors on the platform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={isLoading}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5a2fd4] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isLoading && (
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                    {isLoading ? 'Creating Property...' : 'Confirm & Create Property'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}