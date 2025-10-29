import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface Commission {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    transactionDate: string;
    client: string;
    notes?: string;
    realtor: {
        id: string;
        user: {
            firstName: string;
            lastName: string;
            email: string;
        };
    };
    lead: {
        id: string;
        property: {
            title: string;
            location: string;
            price: number;
        };
    };
    property?: {
        title: string;
        location: string;
        price: number;
    };
}

export function useCommissions() {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCommissions = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/admin/commissions') as any;
            setCommissions(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch commissions');
            console.error('Error fetching commissions:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCommissionStatus = async (commissionId: string, status: string) => {
        try {
            await apiClient.put(`/admin/commissions/${commissionId}/status`, { status });
            await fetchCommissions(); // Refresh the list
        } catch (err: any) {
            console.error('Error updating commission status:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchCommissions();
    }, []);

    return {
        commissions,
        isLoading,
        error,
        updateCommissionStatus,
        refetch: fetchCommissions
    };
}

// Hook for realtor commissions
export function useRealtorCommissions() {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCommissions = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/realtor/commissions') as any;
            setCommissions(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch commissions');
            console.error('Error fetching realtor commissions:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCommissions();
    }, []);

    return {
        commissions,
        isLoading,
        error,
        refetch: fetchCommissions
    };
}

// Hook for requesting commission payout
export function useRequestCommissionPayout() {
    const [isLoading, setIsLoading] = useState(false);

    const requestPayout = async (commissionId: string) => {
        try {
            setIsLoading(true);
            await apiClient.post(`/commissions/${commissionId}/request-payout`);
            return { success: true };
        } catch (err: any) {
            console.error('Error requesting payout:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        requestPayout,
        isLoading
    };
}
