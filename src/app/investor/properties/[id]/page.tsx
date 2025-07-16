'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../../providers/auth-provider';
import { useParams, useRouter } from 'next/navigation';
import {
  FiHome,
  FiMapPin,
  FiHome as FiBuilding,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiCheckCircle
} from 'react-icons/fi';

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

export default function PropertyDetail() {
  const { token } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentForm, setInvestmentForm] = useState({
    amount: '',
    investmentType: 'partial_investment',
    expectedReturn: '',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/properties/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleInvestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvestmentLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/investor/investments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: params.id,
          amount: parseFloat(investmentForm.amount),
          investmentType: investmentForm.investmentType,
          expectedReturn: investmentForm.expectedReturn ? parseFloat(investmentForm.expectedReturn) : undefined,
        }),
      });

      if (response.ok) {
        setShowInvestmentModal(false);
        router.push('/investor/investments');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create investment');
      }
    } catch (error) {
      console.error('Error creating investment:', error);
      alert('Failed to create investment');
    } finally {
      setInvestmentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FD2AF]"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <FiBuilding className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Property not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The property you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to Properties
      </button>

      {/* Property Images */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          {property.images && property.images.length > 0 ? (
            <img
              className="w-full h-96 object-cover"
              src={property.images[0]}
              alt={property.title}
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <FiBuilding className="h-24 w-24 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-[#1FD2AF] text-white">
                {property.propertyType}
              </span>
            </div>

            <div className="flex items-center text-gray-500 mb-4">
              <FiMapPin className="flex-shrink-0 mr-2 h-5 w-5" />
              <span>{property.location}</span>
            </div>

            <div className="text-3xl font-bold text-[#1FD2AF] mb-6">
              {formatCurrency(property.price)}
            </div>

            {property.bedrooms && property.bathrooms && (
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <FiHome className="flex-shrink-0 mr-2 h-5 w-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                {property.area && (
                  <div className="flex items-center">
                    <span>{property.area} sqm</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>
          </div>
        </div>

        {/* Investment Panel */}
        <div className="space-y-6">
          {/* Investment Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Opportunity</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Property Value</span>
                <span className="text-sm font-medium">{formatCurrency(property.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-medium text-green-600">Available</span>
              </div>
            </div>

            <button
              onClick={() => setShowInvestmentModal(true)}
              className="w-full bg-[#1FD2AF] text-white px-4 py-3 rounded-md hover:bg-[#1AB89A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] font-medium"
            >
              <FiDollarSign className="inline-block w-5 h-5 mr-2" />
              Invest in this Property
            </button>
          </div>

          {/* Realtor Contact */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Listed by</h3>

            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#1FD2AF] flex items-center justify-center">
                    <span className="text-white font-medium">
                      {property.realtor.firstName[0]}{property.realtor.lastName[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {property.realtor.firstName} {property.realtor.lastName}
                  </p>
                  <p className="text-sm text-gray-500">Real Estate Agent</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <FiMail className="flex-shrink-0 mr-2 h-4 w-4" />
                  <span>{property.realtor.email}</span>
                </div>
                {property.realtor.phoneNumber && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiPhone className="flex-shrink-0 mr-2 h-4 w-4" />
                    <span>{property.realtor.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Invest in {property.title}
              </h3>

              <form onSubmit={handleInvestmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Investment Amount (NGN)
                  </label>
                  <input
                    type="number"
                    required
                    min="1000000"
                    max={property.price}
                    value={investmentForm.amount}
                    onChange={(e) => setInvestmentForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm"
                    placeholder="Enter investment amount"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum: ₦1,000,000 | Maximum: {formatCurrency(property.price)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Investment Type
                  </label>
                  <select
                    value={investmentForm.investmentType}
                    onChange={(e) => setInvestmentForm(prev => ({ ...prev, investmentType: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm"
                  >
                    <option value="partial_investment">Partial Investment</option>
                    <option value="full_purchase">Full Purchase</option>
                    <option value="rental_income">Rental Income Share</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Return (NGN) - Optional
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={investmentForm.expectedReturn}
                    onChange={(e) => setInvestmentForm(prev => ({ ...prev, expectedReturn: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#1FD2AF] focus:border-[#1FD2AF] sm:text-sm"
                    placeholder="Expected annual return"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInvestmentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={investmentLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#1FD2AF] hover:bg-[#1AB89A] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FD2AF] disabled:opacity-50"
                  >
                    {investmentLoading ? 'Creating...' : 'Create Investment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}