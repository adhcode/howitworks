'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { authApi } from '../../../lib/api-endpoints';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function Header({
    sidebarOpen,
    setSidebarOpen,
}: HeaderProps) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authApi.getProfile();
                setUser(response);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUser();
    }, []);

    const userName = user ? `${user.firstName} ${user.lastName}` : 'Admin';
    const userEmail = user?.email || 'admin@example.com';

    return (
        <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                    <FiMenu className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-3 ml-auto">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <Image src="/dashboard/Avatars.png" alt="avatar" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 