'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiBarChart,
  FiDollarSign,
  FiUser,
  FiHome as FiBuilding,
  FiFileText,
  FiSettings
} from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/investor/dashboard', icon: FiHome },
  { name: 'My Investments', href: '/investor/investments', icon: FiDollarSign },
  { name: 'Portfolio', href: '/investor/portfolio', icon: FiBarChart },
  { name: 'Properties', href: '/investor/properties', icon: FiBuilding },
  { name: 'Reports', href: '/investor/reports', icon: FiFileText },
  { name: 'Profile', href: '/investor/profile', icon: FiUser },
  { name: 'Settings', href: '/investor/settings', icon: FiSettings },
];

export default function InvestorSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Investor Portal</h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive
                      ? 'bg-[#1FD2AF] text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}