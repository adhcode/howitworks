"use client";

import { useState } from 'react';

const FILTERS = [
    {
        id: 'location',
        label: 'Location',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.0003 18.3333C11.6673 16.6667 15.0003 13.0773 15.0003 8.33333C15.0003 4.65143 12.7889 1.66666 10.0003 1.66666C7.21163 1.66666 5.00033 4.65143 5.00033 8.33333C5.00033 13.0773 8.33366 16.6667 10.0003 18.3333Z" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'propertyType',
        label: 'Property Type',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 18.3333V15.8333" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 18.3333H17.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 18.3333V15.8333" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 8.33334L10 1.66667L17.5 8.33334" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.16699 9.99999V15.8333H15.8337V9.99999" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'priceRange',
        label: 'Pricing Range',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66667 11.6667C6.66667 12.5 7.5 13.3333 8.75 13.3333H11.25C12.5 13.3333 13.3333 12.5 13.3333 11.6667C13.3333 10.8333 12.5 10 11.25 10H8.75C7.5 10 6.66667 9.16667 6.66667 8.33333C6.66667 7.5 7.5 6.66667 8.75 6.66667H11.25C12.5 6.66667 13.3333 7.5 13.3333 8.33333" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 5V15" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'bedrooms',
        label: 'No. of bedrooms',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.8333 9.16667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1666 4.16667H5.83329C4.91282 4.16667 4.16663 4.91286 4.16663 5.83333V9.16667" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 15.8333V11.6667C2.5 10.2859 3.61929 9.16666 5 9.16666H15C16.3807 9.16666 17.5 10.2859 17.5 11.6667V15.8333" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 15.8333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V15.8333" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'status',
        label: 'For Sale',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 9.16667H12.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 2.5H5.83333C4.91286 2.5 4.16667 3.24619 4.16667 4.16667V15.8333C4.16667 16.7538 4.91286 17.5 5.83333 17.5H14.1667C15.0871 17.5 15.8333 16.7538 15.8333 15.8333V4.16667C15.8333 3.24619 15.0871 2.5 14.1667 2.5Z" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 12.5H10" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 5.83333H12.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
];

interface PropertySearchProps {
    onSearch?: (query: string) => void;
    onFilterChange?: (filters: any) => void;
}

const PropertySearch = ({ onSearch, onFilterChange }: PropertySearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        propertyType: '',
        priceRange: '',
        bedrooms: '',
        status: 'active'
    });

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
            <div className="max-w-[342px] md:max-w-[1100px] mx-auto md:px-0">
                <div className="flex flex-col bg-[#F4F5F7] border border-[#EBEBEB] rounded-[12px] p-[10px] md:flex-row md:items-center gap-2 md:gap-4 md:-mt-18 -mt-14">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.id}
                            className="flex items-center justify-between w-full md:w-[236px] px-4 py-3 bg-white border border-[#EBEBEB] rounded-lg text-[#3A3A3C] hover:text-[#1A2A52] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                {filter.icon}
                                <span className="text-sm font-medium">{filter.label}</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PropertySearch;