'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiShare2,
  FiTrendingUp,
  FiMenu,
  FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function RealtorSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/realtor/dashboard',
      icon: FiHome,
    },
    {
      name: 'Leads',
      href: '/realtor/leads',
      icon: FiUsers,
    },
    {
      name: 'Commissions',
      href: '/realtor/commissions',
      icon: FiDollarSign,
    },
    {
      name: 'Performance',
      href: '/realtor/performance',
      icon: FiTrendingUp,
    },
    {
      name: 'Referrals',
      href: '/realtor/referrals',
      icon: FiShare2,
    },
    {
      name: 'Profile',
      href: '/realtor/profile',
      icon: FiUser,
    },
    {
      name: 'Settings',
      href: '/realtor/settings',
      icon: FiSettings,
    }
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#703BF7] to-[#5f2fd6] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">HowItWorks</div>
            <div className="text-xs text-gray-500">Realtor Portal</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-[#703BF7] to-[#5f2fd6] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#703BF7]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#703BF7]'}`} />
              <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-[#703BF7] transition-colors"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 bg-white shadow-xl h-screen flex-col border-r border-gray-100">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative w-72 bg-white shadow-xl h-screen flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-4 h-4" />
            </button>
            
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}