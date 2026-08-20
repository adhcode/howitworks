"use client";

import { useState } from 'react';

interface FilterOption {
    value: string;
    label: string;
}

interface PropertySearchProps {
    onSearch?: (query: string) => void;
    onFilterChange?: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
    location?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    listingType?: string;
    sortBy?: string;
}

const PROPERTY_TYPES: FilterOption[] = [
    { value: '', label: 'All Types' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Mansion', label: 'Mansion' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Flat', label: 'Flat' },
    { value: 'Studio', label: 'Studio' },
];

const PRICE_RANGES: FilterOption[] = [
    { value: '', label: 'Any Price' },
    { value: '0-10000000', label: '₦0 - ₦10M' },
    { value: '10000000-30000000', label: '₦10M - ₦30M' },
    { value: '30000000-50000000', label: '₦30M - ₦50M' },
    { value: '50000000-100000000', label: '₦50M - ₦100M' },
    { value: '100000000-', label: '₦100M+' },
];

const BEDROOM_OPTIONS: FilterOption[] = [
    { value: '', label: 'Any' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' },
];

const LISTING_TYPES: FilterOption[] = [
    { value: '', label: 'All' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
    { value: 'investment', label: 'Investment' },
];

const SORT_OPTIONS: FilterOption[] = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'bedrooms_desc', label: 'Most Bedrooms' },
    { value: 'area_desc', label: 'Largest Area' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
];

const PropertySearch = ({ onSearch, onFilterChange }: PropertySearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<PropertyFilters>({});
    
    // Dropdown states
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleDropdown = (dropdownId: string) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const updateFilter = (key: keyof PropertyFilters, value: any) => {
        const newFilters = { ...filters, [key]: value };
        
        // Remove empty values
        if (value === '' || value === undefined || value === null) {
            delete newFilters[key];
        }
        
        setFilters(newFilters);
        
        if (onFilterChange) {
            onFilterChange(newFilters);
        }
        
        setOpenDropdown(null);
    };

    const handlePriceRangeChange = (rangeValue: string) => {
        if (!rangeValue) {
            const newFilters = { ...filters };
            delete newFilters.minPrice;
            delete newFilters.maxPrice;
            setFilters(newFilters);
            if (onFilterChange) {
                onFilterChange(newFilters);
            }
        } else {
            const [min, max] = rangeValue.split('-');
            const newFilters = {
                ...filters,
                minPrice: min ? parseInt(min) : undefined,
                maxPrice: max ? parseInt(max) : undefined,
            };
            setFilters(newFilters);
            if (onFilterChange) {
                onFilterChange(newFilters);
            }
        }
        setOpenDropdown(null);
    };

    const getActiveFilterLabel = (filterId: string): string => {
        switch (filterId) {
            case 'location':
                return filters.location || 'Location';
            case 'propertyType':
                return PROPERTY_TYPES.find(t => t.value === filters.propertyType)?.label || 'Property Type';
            case 'priceRange':
                if (filters.minPrice || filters.maxPrice) {
                    const range = PRICE_RANGES.find(r => {
                        const [min, max] = r.value.split('-');
                        return (min ? parseInt(min) : 0) === (filters.minPrice || 0) &&
                               (max ? parseInt(max) : Infinity) === (filters.maxPrice || Infinity);
                    });
                    return range?.label || 'Custom Range';
                }
                return 'Pricing Range';
            case 'bedrooms':
                return filters.bedrooms ? `${filters.bedrooms} Bed${filters.bedrooms > 1 ? 's' : ''}` : 'No. of bedrooms';
            case 'listingType':
                return LISTING_TYPES.find(t => t.value === filters.listingType)?.label || 'For Sale';
            case 'sortBy':
                return SORT_OPTIONS.find(s => s.value === filters.sortBy)?.label || 'Sort By';
            default:
                return '';
        }
    };

    const clearFilters = () => {
        setFilters({});
        setSearchQuery('');
        if (onFilterChange) {
            onFilterChange({});
        }
        if (onSearch) {
            onSearch('');
        }
    };

    const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery.length > 0;

    return (
        <>
            <div className="relative h-32">
                <div className="absolute -top-8 left-0 right-0">
                    <div className="flex gap-2 p-4 bg-white max-w-[342px] md:max-w-[1100px] mx-auto rounded-t-[12px] shadow-[0px_-3px_0px_6px_#1A2A52]">
                        <div className="flex-1 flex items-center gap-2 px-4">
                            <input
                                type="text"
                                placeholder="Search For A Property"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 bg-transparent text-[#1A2A52] placeholder:text-[#3A3A3C] focus:outline-none"
                            />
                        </div>
                        <button 
                            onClick={handleSearch}
                            className="bg-[#1FD2AF] text-white py-[14px] px-[20px] rounded-[8px] hover:bg-[#1AB89A] transition-colors flex items-center gap-2"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-[20px]">
                                <path d="M9.58366 17.5C13.9559 17.5 17.5003 13.9555 17.5003 9.58333C17.5003 5.21108 13.9559 1.66666 9.58366 1.66666C5.21141 1.66666 1.66699 5.21108 1.66699 9.58333C1.66699 13.9555 5.21141 17.5 9.58366 17.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.3337 18.3333L16.667 16.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="hidden md:inline">Find Property</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[342px] md:max-w-[1100px] mx-auto md:px-0 px-4">
                <div className="flex flex-col bg-[#F4F5F7] border border-[#EBEBEB] rounded-[12px] p-[10px] md:flex-row md:items-center gap-2 md:gap-4 md:-mt-18 -mt-14">
                    {/* Location Filter */}
                    <div className="relative w-full md:w-[236px]">
                        <button
                            onClick={() => toggleDropdown('location')}
                            className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg transition-colors ${
                                filters.location ? 'border-[#1FD2AF] text-[#1A2A52]' : 'border-[#EBEBEB] text-[#3A3A3C] hover:text-[#1A2A52]'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.0003 18.3333C11.6673 16.6667 15.0003 13.0773 15.0003 8.33333C15.0003 4.65143 12.7889 1.66666 10.0003 1.66666C7.21163 1.66666 5.00033 4.65143 5.00033 8.33333C5.00033 13.0773 8.33366 16.6667 10.0003 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-medium">{getActiveFilterLabel('location')}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`}>
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'location' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg p-3">
                                <input
                                    type="text"
                                    placeholder="Enter location..."
                                    value={filters.location || ''}
                                    onChange={(e) => updateFilter('location', e.target.value)}
                                    className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md focus:outline-none focus:border-[#1FD2AF]"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>

                    {/* Property Type Filter */}
                    <div className="relative w-full md:w-[236px]">
                        <button
                            onClick={() => toggleDropdown('propertyType')}
                            className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg transition-colors ${
                                filters.propertyType ? 'border-[#1FD2AF] text-[#1A2A52]' : 'border-[#EBEBEB] text-[#3A3A3C] hover:text-[#1A2A52]'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 18.3333V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.5 18.3333H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5 18.3333V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.5 8.33334L10 1.66667L17.5 8.33334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16699 9.99999V15.8333H15.8337V9.99999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-medium">{getActiveFilterLabel('propertyType')}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${openDropdown === 'propertyType' ? 'rotate-180' : ''}`}>
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'propertyType' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {PROPERTY_TYPES.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => updateFilter('propertyType', type.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            filters.propertyType === type.value ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Range Filter */}
                    <div className="relative w-full md:w-[236px]">
                        <button
                            onClick={() => toggleDropdown('priceRange')}
                            className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg transition-colors ${
                                (filters.minPrice || filters.maxPrice) ? 'border-[#1FD2AF] text-[#1A2A52]' : 'border-[#EBEBEB] text-[#3A3A3C] hover:text-[#1A2A52]'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.66667 11.6667C6.66667 12.5 7.5 13.3333 8.75 13.3333H11.25C12.5 13.3333 13.3333 12.5 13.3333 11.6667C13.3333 10.8333 12.5 10 11.25 10H8.75C7.5 10 6.66667 9.16667 6.66667 8.33333C6.66667 7.5 7.5 6.66667 8.75 6.66667H11.25C12.5 6.66667 13.3333 7.5 13.3333 8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-medium">{getActiveFilterLabel('priceRange')}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${openDropdown === 'priceRange' ? 'rotate-180' : ''}`}>
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'priceRange' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {PRICE_RANGES.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => handlePriceRangeChange(range.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            (() => {
                                                const [min, max] = range.value.split('-');
                                                const matchesMin = (min ? parseInt(min) : 0) === (filters.minPrice || 0);
                                                const matchesMax = max ? (parseInt(max) === filters.maxPrice) : !filters.maxPrice;
                                                return (matchesMin && matchesMax) ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' : 'text-[#3A3A3C]';
                                            })()
                                        }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bedrooms Filter */}
                    <div className="relative w-full md:w-[236px]">
                        <button
                            onClick={() => toggleDropdown('bedrooms')}
                            className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg transition-colors ${
                                filters.bedrooms ? 'border-[#1FD2AF] text-[#1A2A52]' : 'border-[#EBEBEB] text-[#3A3A3C] hover:text-[#1A2A52]'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15.8333 9.16667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1666 4.16667H5.83329C4.91282 4.16667 4.16663 4.91286 4.16663 5.83333V9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.5 15.8333V11.6667C2.5 10.2859 3.61929 9.16666 5 9.16666H15C16.3807 9.16666 17.5 10.2859 17.5 11.6667V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.5 15.8333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-medium">{getActiveFilterLabel('bedrooms')}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${openDropdown === 'bedrooms' ? 'rotate-180' : ''}`}>
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'bedrooms' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg">
                                {BEDROOM_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => updateFilter('bedrooms', option.value ? parseInt(option.value) : undefined)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            filters.bedrooms?.toString() === option.value ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Listing Type Filter */}
                    <div className="relative w-full md:w-[236px]">
                        <button
                            onClick={() => toggleDropdown('listingType')}
                            className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg transition-colors ${
                                filters.listingType ? 'border-[#1FD2AF] text-[#1A2A52]' : 'border-[#EBEBEB] text-[#3A3A3C] hover:text-[#1A2A52]'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 9.16667H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.1667 2.5H5.83333C4.91286 2.5 4.16667 3.24619 4.16667 4.16667V15.8333C4.16667 16.7538 4.91286 17.5 5.83333 17.5H14.1667C15.0871 17.5 15.8333 16.7538 15.8333 15.8333V4.16667C15.8333 3.24619 15.0871 2.5 14.1667 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.5 12.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.5 5.83333H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-medium">{getActiveFilterLabel('listingType')}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${openDropdown === 'listingType' ? 'rotate-180' : ''}`}>
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'listingType' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg">
                                {LISTING_TYPES.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => updateFilter('listingType', type.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            filters.listingType === type.value ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sort By Filter */}
                    <div className="relative w-full md:w-[236px]">
                        <button
                            onClick={() => toggleDropdown('sortBy')}
                            className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-lg transition-colors ${
                                filters.sortBy ? 'border-[#1FD2AF] text-[#1A2A52]' : 'border-[#EBEBEB] text-[#3A3A3C] hover:text-[#1A2A52]'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3.33337 5.83333H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83337 10H14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.33337 14.1667H11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-medium">{getActiveFilterLabel('sortBy')}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${openDropdown === 'sortBy' ? 'rotate-180' : ''}`}>
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openDropdown === 'sortBy' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => updateFilter('sortBy', option.value)}
                                        className={`w-full text-left px-4 py-2 hover:bg-[#F4F5F7] transition-colors ${
                                            filters.sortBy === option.value ? 'bg-[#F4F5F7] text-[#1FD2AF] font-medium' : 'text-[#3A3A3C]'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <div className="mt-4 flex justify-end px-4 md:px-0">
                        <button
                            onClick={clearFilters}
                            className="text-sm text-[#3A3A3C] hover:text-[#1FD2AF] transition-colors flex items-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Clear all filters ({Object.keys(filters).length})
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default PropertySearch;