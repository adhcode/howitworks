'use client'

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import RealtorSidebar from './components/RealtorSidebar';
import toast from 'react-hot-toast';

interface RealtorLayoutProps {
  children: React.ReactNode;
}

interface UserContextType {
  user: any;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, loading: true });

export const useUser = () => useContext(UserContext);

export default function RealtorLayout({ children }: RealtorLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        toast.error('Please login to access this page');
        router.push('/auth/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      
      if (parsedUser.role !== 'REALTOR') {
        toast.error('Access denied. Realtor access required.');
        router.push('/auth/login');
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Auth check error:', error);
      toast.error('Authentication error. Please login again.');
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#703BF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <RealtorSidebar />
        <div className="flex-1 overflow-auto lg:ml-0">
          <div className="lg:hidden h-16"></div> {/* Spacer for mobile menu button */}
          {children}
        </div>
      </div>
    </UserContext.Provider>
  );
}