'use client'

import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import InvestorSidebar from './components/InvestorSidebar';
import InvestorHeader from './components/InvestorHeader';

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'INVESTOR')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1FD2AF]"></div>
      </div>
    );
  }

  if (!user || user.role !== 'INVESTOR') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InvestorSidebar />
      <div className="lg:pl-64">
        <InvestorHeader />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}