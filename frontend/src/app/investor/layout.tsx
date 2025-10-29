'use client'

import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8157FF]"></div>
      </div>
    );
  }

  if (!user || user.role !== 'INVESTOR') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}