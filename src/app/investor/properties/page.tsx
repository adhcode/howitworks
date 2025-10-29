'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiHome as FiBuilding,
  FiSearch
} from 'react-icons/fi';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  status: string;
  images: string[];
  realtor: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    slug: string;
  };
}

interface PropertiesData {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function InvestorProperties() {
  const { token } = useAuth();
  const [propertiesData, setPropertiesData] = useState<PropertiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
          ...Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '')
          ),
        });

        const response = await fetch(
          `http://localhost:3001/api/properties?${queryParams}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPropertiesData(data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage, filters]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
    });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FD2AF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Investment Properties
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Discover properties available for investment
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="location"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm rounded-md"
              />
              <FiSearch className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              id="propertyType"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm rounded-md"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm rounded-md"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {propertiesData?.properties && propertiesData.properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {propertiesData.properties.map((property) => (
            <div
              key={property.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                {property.images && property.images.length > 0 ? (
                  <img
                    className="w-full h-full object-cover"
                    src={property.images[0]}
                    alt={property.title}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiBuilding className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[#1FD2AF] text-white">
                    {property.propertyType}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {property.title}
                  </h3>
                  <p className="text-lg font-bold text-[#1FD2AF]">
                    {formatCurrency(property.price)}
                  </p>
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                  <p className="truncate">{property.location}</p>
                </div>

                {property.bedrooms && property.bathrooms && (
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiHome className="flex-shrink-0 mr-1 h-4 w-4" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center">
                      <span>{property.bathrooms} baths</span>
                    </div>
                    {property.area && (
                      <div className="flex items-center">
                        <span>{property.area} sqm</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {property.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Listed by {property.realtor.firstName} {property.realtor.lastName}
                  </div>
                  <Link
                    href={`/investor/properties/${property.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
                  >
                    <FiDollarSign className="-ml-0.5 mr-2 h-4 w-4" />
                    Invest
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FiBuilding className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters to find more properties.
          </p>
          <div className="mt-6">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1FD2AF] hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {propertiesData?.pagination && propertiesData.pagination.pages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(propertiesData.pagination.pages, currentPage + 1))}
              disabled={currentPage === propertiesData.pagination.pages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {(currentPage - 1) * propertiesData.pagination.limit + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * propertiesData.pagination.limit, propertiesData.pagination.total)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{propertiesData.pagination.total}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(propertiesData.pagination.pages, currentPage + 1))}
                  disabled={currentPage === propertiesData.pagination.pages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}