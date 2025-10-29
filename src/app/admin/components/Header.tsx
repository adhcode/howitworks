'use client'

import React from 'react';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userName?: string;
    userEmail?: string;
}

export default function Header({
    sidebarOpen,
    setSidebarOpen,
    userName = "Roheeb Abdul",
    userEmail = "admin@gmail.com"
}: HeaderProps) {
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
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Image src="/dashboard/Avatars.png" alt="avatar" width={40} height={40} />
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