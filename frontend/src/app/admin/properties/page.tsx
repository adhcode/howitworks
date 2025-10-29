'use client'

import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiFilter, FiHome, FiMapPin } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CreatePropertyModal from '../components/CreatePropertyModal';
import { propertyApi } from '../../../lib/api-endpoints';
import { useAuth } from '../../providers/auth-provider';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminProperties() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [filters, setFilters] = useState({
        status: '',
        propertyType: '',
        location: '',
        page: 1,
        limit: 10
    });

    const queryClient = useQueryClient();
    const { data: propertiesData, isLoading, error } = useQuery({
        queryKey: ['admin', 'properties', filters],
        queryFn: () => propertyApi.getAll(filters),
    });
    const { logout } = useAuth();

    const createMutation = useMutation({
        mutationFn: (data: { formData: any; files?: File[] }) => {
            if (data.files && data.files.length > 0) {
                return propertyApi.createWithFiles(data.formData, data.files);
            }
            return propertyApi.create(data.formData);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] });
            toast.success('Property created successfully!', {
                duration: 4000,
                position: 'top-right',
            });
            setTimeout(() => {
                setShowCreateModal(false);
            }, 1500);
        },
        onError: (error: any) => {
            console.error('Property creation error:', error);
            toast.error(error?.message || 'Failed to create property. Please try again.', {
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (params: { id: string; data: any }) => propertyApi.update(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] });
            toast.success('Property updated successfully!');
            setShowEditModal(false);
            setSelectedProperty(null);
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to update property. Please try again.');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: propertyApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] });
            toast.success('Property deleted successfully!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to delete property. Please try again.');
        },
    });

    const toggleFeaturedMutation = useMutation({
        mutationFn: propertyApi.toggleFeatured,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] });
            toast.success('Featured status updated successfully!');
        },
        onError: (error: any) => {
            toast.error(String(error?.message) || 'Failed to update featured status. Please try again.');
        },
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleCreateProperty = (formData: any, files?: File[]) => {
        const loadingToast = toast.loading(
            files && files.length > 0
                ? 'Uploading images and creating property...'
                : 'Creating property...',
            { position: 'top-right' }
        );

        const mutationData = files && files.length > 0
            ? { formData, files }
            : { formData };

        createMutation.mutate(mutationData, {
            onSettled: () => {
                toast.dismiss(loadingToast);
            }
        });
    };

    const handleUpdateProperty = (formData: any) => {
        if (!selectedProperty) return;

        updateMutation.mutate({
            id: selectedProperty.id,
            data: formData
        });
    };

    const handleDeleteProperty = (id: string) => {
        if (confirm('Are you sure you want to delete this property?')) {
            const loadingToast = toast.loading('Deleting property...', { position: 'top-right' });
            deleteMutation.mutate(id, {
                onSettled: () => {
                    toast.dismiss(loadingToast);
                }
            });
        }
    };

    const handleToggleFeatured = (id: string) => {
        const loadingToast = toast.loading('Updating featured status...', { position: 'top-right' });
        toggleFeaturedMutation.mutate(id, {
            onSettled: () => {
                toast.dismiss(loadingToast);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Toaster />
                <div className="flex">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentPage="manage-properties"
                        onLogout={logout}
                    />

                    <div className="flex-1 flex flex-col lg:ml-0">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />

                        <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="flex-1 max-w-md h-10 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                                            <div className="p-4 space-y-3">
                                                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                                <div className="flex justify-between">
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Toaster />
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    currentPage="manage-properties"
                    onLogout={logout}
                />

                <div className="flex-1 flex flex-col lg:ml-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50">
                        {/* Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Property Management</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all platform properties</p>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center justify-center px-5 py-2.5 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2fd4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#703BF7] transition-colors shadow-sm font-medium text-sm sm:text-base"
                            >
                                <FiPlus className="w-5 h-5 mr-2" />
                                Add Property
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <FiFilter className="w-5 h-5 text-[#703BF7]" />
                                <span className="text-sm font-semibold text-gray-900">Filter Properties</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                        Search Location
                                    </label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter location..."
                                            value={filters.location}
                                            onChange={(e) => setFilters({ ...filters, location: e.target.value, page: 1 })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                        Status
                                    </label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors bg-white"
                                    >
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="sold">Sold</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                        Property Type
                                    </label>
                                    <select
                                        value={filters.propertyType}
                                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value, page: 1 })}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors bg-white"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="House">House</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Duplex">Duplex</option>
                                        <option value="Flat">Flat</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(filters.location || filters.status || filters.propertyType) && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-medium text-gray-600">Active filters:</span>
                                        {filters.location && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                                Location: {filters.location}
                                                <button
                                                    onClick={() => setFilters({ ...filters, location: '', page: 1 })}
                                                    className="hover:bg-[#703BF7]/20 rounded-full p-0.5"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {filters.status && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                                Status: {filters.status}
                                                <button
                                                    onClick={() => setFilters({ ...filters, status: '', page: 1 })}
                                                    className="hover:bg-[#703BF7]/20 rounded-full p-0.5"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {filters.propertyType && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#703BF7]/10 text-[#703BF7] rounded-full text-xs font-medium">
                                                Type: {filters.propertyType}
                                                <button
                                                    onClick={() => setFilters({ ...filters, propertyType: '', page: 1 })}
                                                    className="hover:bg-[#703BF7]/20 rounded-full p-0.5"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        <button
                                            onClick={() => setFilters({ status: '', propertyType: '', location: '', page: 1, limit: 10 })}
                                            className="text-xs text-gray-600 hover:text-gray-900 font-medium underline"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Properties Grid */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Properties
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {propertiesData?.total || 0} total properties
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="hidden sm:inline">Showing</span>
                                    <span className="font-medium">{propertiesData?.data?.length || 0}</span>
                                    <span className="hidden sm:inline">of {propertiesData?.total || 0}</span>
                                </div>
                            </div>

                            {propertiesData?.data && propertiesData.data.length > 0 ? (
                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {propertiesData.data.map((property: any) => (
                                            <div key={property.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#703BF7]/30 transition-all duration-300">
                                                {/* Property Image */}
                                                <div className="relative h-48 sm:h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                                    {property.images && property.images.length > 0 ? (
                                                        <img
                                                            src={property.images[0]}
                                                            alt={property.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.setAttribute('style', 'display: flex');
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className="fallback-icon absolute inset-0 flex items-center justify-center" style={{ display: property.images?.length > 0 ? 'none' : 'flex' }}>
                                                        <FiHome className="w-16 h-16 text-gray-300" />
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className="absolute top-3 right-3">
                                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${property.status === 'active' ? 'bg-green-500/90 text-white' :
                                                            property.status === 'sold' ? 'bg-red-500/90 text-white' :
                                                                'bg-yellow-500/90 text-white'
                                                            }`}>
                                                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                                        </span>
                                                    </div>

                                                    {/* Featured Badge */}
                                                    {property.featured && (
                                                        <div className="absolute top-3 left-3">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/90 text-yellow-900 backdrop-blur-sm">
                                                                ⭐ Featured
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Quick Actions Overlay */}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleToggleFeatured(property.id)}
                                                            className="p-2 bg-white rounded-full hover:bg-yellow-50 transition-colors"
                                                            title={property.featured ? 'Remove from Featured' : 'Add to Featured'}
                                                        >
                                                            <span className="text-lg">{property.featured ? '⭐' : '☆'}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedProperty(property);
                                                                setShowEditModal(true);
                                                            }}
                                                            className="p-2 bg-white rounded-full hover:bg-blue-50 transition-colors"
                                                            title="Edit property"
                                                        >
                                                            <FiEdit className="w-5 h-5 text-blue-600" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProperty(property.id)}
                                                            className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                                                            title="Delete property"
                                                        >
                                                            <FiTrash2 className="w-5 h-5 text-red-600" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Property Details */}
                                                <div className="p-4">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                                                        {property.title}
                                                    </h4>

                                                    <div className="flex items-start text-gray-500 mb-3">
                                                        <FiMapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm line-clamp-1">{property.location}</span>
                                                    </div>

                                                    <div className="text-xl sm:text-2xl font-bold text-[#703BF7] mb-3">
                                                        {formatCurrency(property.price)}
                                                    </div>

                                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3 pb-3 border-b border-gray-100">
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">{property.bedrooms || 0}</span>
                                                            <span className="text-xs">beds</span>
                                                        </div>
                                                        <div className="w-px h-4 bg-gray-300"></div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">{property.bathrooms || 0}</span>
                                                            <span className="text-xs">baths</span>
                                                        </div>
                                                        <div className="w-px h-4 bg-gray-300"></div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">{property.area || 0}</span>
                                                            <span className="text-xs">sqm</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span className="px-2 py-1 bg-gray-100 rounded-md font-medium">
                                                            {property.propertyType}
                                                        </span>
                                                        {property.realtor && (
                                                            <span className="text-right">
                                                                By {property.realtor.firstName} {property.realtor.lastName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {propertiesData && propertiesData.totalPages > 1 && (
                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="text-sm text-gray-500">
                                                Page {propertiesData.page} of {propertiesData.totalPages}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                                                    disabled={filters.page <= 1}
                                                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                                                    disabled={filters.page >= (propertiesData?.totalPages || 1)}
                                                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                                    <p className="text-gray-500 mb-4">
                                        {filters.location || filters.status || filters.propertyType
                                            ? 'Try adjusting your filters to see more properties.'
                                            : 'Get started by adding your first property.'
                                        }
                                    </p>
                                    {!(filters.location || filters.status || filters.propertyType) && (
                                        <button
                                            onClick={() => setShowCreateModal(true)}
                                            className="inline-flex items-center px-4 py-2 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2fd4] transition-colors"
                                        >
                                            <FiPlus className="w-4 h-4 mr-2" />
                                            Add Property
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {/* Create Property Modal */}
            {showCreateModal && (
                <CreatePropertyModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateProperty}
                    isLoading={createMutation.isPending}
                />
            )}

            {/* Edit Property Modal */}
            {showEditModal && selectedProperty && (
                <EditPropertyModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedProperty(null);
                    }}
                    onSubmit={handleUpdateProperty}
                    property={selectedProperty}
                    isLoading={updateMutation.isPending}
                />
            )}
        </div>
    );
}

// Edit Property Modal Component
function EditPropertyModal({ isOpen, onClose, onSubmit, property, isLoading }: any) {
    const [formData, setFormData] = useState({
        title: property?.title || '',
        description: property?.description || '',
        price: property?.price || '',
        location: property?.location || '',
        bedrooms: property?.bedrooms || '',
        bathrooms: property?.bathrooms || '',
        area: property?.area || '',
        propertyType: property?.propertyType || 'Apartment',
        status: property?.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                Description *
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
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
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <select
                                    required
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#703BF7] focus:border-transparent"
                                >
                                    <option value="active">Active</option>
                                    <option value="sold">Sold</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-[#703BF7] text-white rounded-md hover:bg-[#5a2fd4] disabled:opacity-50"
                            >
                                {isLoading ? 'Updating...' : 'Update Property'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}