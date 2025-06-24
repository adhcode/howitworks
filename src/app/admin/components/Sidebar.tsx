'use client'

import React from 'react';
import { FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    currentPage: 'dashboard' | 'manage-properties' | 'manage-realtors' | 'manage-enquiries' | 'commission' | 'reports-analytics' | 'manage-blog' | 'users' | 'profile';
    onLogout?: () => void;
}

interface SidebarLinkProps {
    href: string;
    iconSrc: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

function SidebarLink({ href, iconSrc, label, active, onClick }: SidebarLinkProps) {
    const iconStyle = active
        ? { filter: 'brightness(0) saturate(100%) invert(35%) sepia(98%) saturate(1969%) hue-rotate(254deg) brightness(90%) contrast(94%)' }
        : { filter: 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(189deg) brightness(94%) contrast(87%)' };

    const content = (
        <>
            <Image
                src={iconSrc}
                alt={label}
                width={16}
                height={16}
                style={iconStyle}
                className="transition-all duration-200"
            />
            {label}
        </>
    );

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-1 w-full text-left group ${active
                    ? 'bg-[#703BF7] bg-opacity-10 text-[#703BF7] font-medium'
                    : 'text-[#666666] hover:text-[#703BF7]'
                    }`}
                style={{
                    '--hover-icon-filter': 'brightness(0) saturate(100%) invert(35%) sepia(98%) saturate(1969%) hue-rotate(254deg) brightness(90%) contrast(94%)'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                    if (!active) {
                        const img = e.currentTarget.querySelector('img');
                        if (img) {
                            img.style.filter = 'brightness(0) saturate(100%) invert(35%) sepia(98%) saturate(1969%) hue-rotate(254deg) brightness(90%) contrast(94%)';
                        }
                    }
                }}
                onMouseLeave={(e) => {
                    if (!active) {
                        const img = e.currentTarget.querySelector('img');
                        if (img) {
                            img.style.filter = 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(189deg) brightness(94%) contrast(87%)';
                        }
                    }
                }}
            >
                {content}
            </button>
        );
    }

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-1 group ${active
                ? ' text-[#703BF7] font-medium'
                : 'text-[#666666] hover:bg-gray-50 hover:bg-opacity-10 hover:text-[#703BF7]'
                }`}
            onMouseEnter={(e) => {
                if (!active) {
                    const img = e.currentTarget.querySelector('img');
                    if (img) {
                        img.style.filter = 'brightness(0) saturate(100%) invert(35%) sepia(98%) saturate(1969%) hue-rotate(254deg) brightness(90%) contrast(94%)';
                    }
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    const img = e.currentTarget.querySelector('img');
                    if (img) {
                        img.style.filter = 'brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(189deg) brightness(94%) contrast(87%)';
                    }
                }
            }}
        >
            {content}
        </Link>
    );
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, currentPage, onLogout }: SidebarProps) {
    return (
        <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={` 
                fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white border-r  border-[#E1E1E1] transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex h-16 items-center justify-between px-6">
                    <h1 className="text-xl font-bold text-[#8157FF]">Howitwork</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-6 flex flex-col border-b border-[#E1E1E1]  px-4 text-sm font-medium">

                    <div>
                        <SidebarLink
                            href="/admin/dashboard"
                            iconSrc="/dashboard/dashboard.svg"
                            label="Dashboard"
                            active={currentPage === 'dashboard'}
                        />
                        <SidebarLink
                            href="/admin/properties"
                            iconSrc="/dashboard/commision.svg"
                            label="Manage Properties"
                            active={currentPage === 'manage-properties'}
                        />
                        <SidebarLink
                            href="/admin/realtors"
                            iconSrc="/dashboard/leads.svg"
                            label="Manage Realtors"
                            active={currentPage === 'manage-realtors'}
                        />
                        <SidebarLink
                            href="/admin/enquiries"
                            iconSrc="/dashboard/filter.svg"
                            label="Manage Enquiries"
                            active={currentPage === 'manage-enquiries'}
                        />
                        <SidebarLink
                            href="/admin/commission"
                            iconSrc="/dashboard/commision.svg"
                            label="Commission"
                            active={currentPage === 'commission'}
                        />
                        <SidebarLink
                            href="/admin/analytics"
                            iconSrc="/dashboard/performance.svg"
                            label="Reports & Analytics"
                            active={currentPage === 'reports-analytics'}
                        />
                        <SidebarLink
                            href="/admin/blog"
                            iconSrc="/icons/client.svg"
                            label="Manage Blog"
                            active={currentPage === 'manage-blog'}
                        />
                        <SidebarLink
                            href="/admin/users"
                            iconSrc="/dashboard/avatar.svg"
                            label="Manage Users"
                            active={currentPage === 'users'}
                        />
                    </div>
                    <div className='mt-32'>
                        <SidebarLink
                            href="/admin/profile"
                            iconSrc="/dashboard/profile.svg"
                            label="Profile"
                            active={currentPage === 'profile'}
                        />
                        <SidebarLink
                            href="#"
                            iconSrc="/dashboard/logout.svg"
                            label="Logout"
                            onClick={onLogout}
                        />
                    </div>
                </nav>
            </aside>
        </>
    );
} 