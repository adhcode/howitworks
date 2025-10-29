import { useState, useEffect } from 'react';
import { realtorApi } from '../lib/api-endpoints';
import toast from 'react-hot-toast';

export interface RealtorDetail {
  id: string;
  userId: string;
  phoneNumber?: string;
  residentialAddress?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  profileImage?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
  };
  properties?: any[];
  leads?: any[];
  commissions?: any[];
  _count?: {
    properties: number;
    leads: number;
    commissions: number;
  };
}

export const useRealtorDetail = (id: string) => {
  const [realtor, setRealtor] = useState<RealtorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRealtor = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await realtorApi.getById(id);
      console.log('Fetched realtor data:', response);
      console.log('User data:', response?.user);
      console.log('isActive:', response?.user?.isActive);
      setRealtor(response);
    } catch (err: any) {
      console.error('Error fetching realtor:', err);
      setError(err?.message || 'Failed to load realtor details');
      toast.error('Failed to load realtor details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRealtor();
    }
  }, [id]);

  const refetch = () => {
    fetchRealtor();
  };

  const updateRealtor = async (data: any) => {
    try {
      const response = await realtorApi.update(id, data);
      setRealtor(response);
      toast.success('Realtor updated successfully');
      return response;
    } catch (err: any) {
      console.error('Error updating realtor:', err);
      toast.error(err?.message || 'Failed to update realtor');
      throw err;
    }
  };

  const toggleStatus = async (isActive: boolean) => {
    try {
      console.log('toggleStatus called with:', isActive);
      const response = await realtorApi.updateStatus(id, isActive);
      console.log('API response:', response);
      console.log('Response structure:', JSON.stringify(response, null, 2));
      setRealtor(response);
      toast.success(`Realtor ${isActive ? 'activated' : 'deactivated'} successfully`);
      return response;
    } catch (err: any) {
      console.error('Error toggling status:', err);
      toast.error(err?.message || 'Failed to update status');
      throw err;
    }
  };

  return {
    realtor,
    loading,
    error,
    refetch,
    updateRealtor,
    toggleStatus,
  };
};
