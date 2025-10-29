'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams.get('ref');
    
    if (referralCode) {
      // Store the referral code in localStorage for lead tracking
      localStorage.setItem('referralCode', referralCode);
      
      // Optional: Store with expiration (30 days)
      const expirationTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 days
      localStorage.setItem('referralExpiration', expirationTime.toString());
      
      console.log('Referral code stored:', referralCode);
      
      // Optional: Show a welcome message or toast
      // toast.success(`Welcome! You were referred by one of our realtors.`);
    }
  }, [searchParams]);

  // This component doesn't render anything visible
  return null;
}

// Utility function to get the current referral code
export const getReferralCode = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const referralCode = localStorage.getItem('referralCode');
  const expirationTime = localStorage.getItem('referralExpiration');
  
  if (!referralCode || !expirationTime) return null;
  
  // Check if referral code has expired
  if (new Date().getTime() > parseInt(expirationTime)) {
    localStorage.removeItem('referralCode');
    localStorage.removeItem('referralExpiration');
    return null;
  }
  
  return referralCode;
};

// Utility function to clear referral code (call after successful lead creation)
export const clearReferralCode = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('referralCode');
  localStorage.removeItem('referralExpiration');
};