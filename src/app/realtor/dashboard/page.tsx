import React, { useState } from 'react';
import Image from 'next/image';
import { FaTachometerAlt } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { FiBarChart2, FiLogOut, FiUser } from 'react-icons/fi';
import { GoCopy } from 'react-icons/go';
import Link from 'next/link';

// Dummy data for recent leads
const leads = Array.from({ length: 8 }).map((_, i) => ({
    name: 'Tolu Akinbo',
    property: i % 2 ? 'Land, Sangotedo' : '4-Bed Duplex, Lekki',
    location: 'Lekki Phase 1, Lagos',
    date: 'Aug 3, 2025',
    status: ['Connected', 'Not Connected', 'Converted'][i % 3] as
        | 'Connected'
        | 'Not Connected'
        | 'Converted',
}));

// Helper to get color for status
const statusColor = {
    Connected: 'text-blue-600',
    'Not Connected': 'text-red-600',
    Converted: 'text-green-600',
};

export default function RealtorDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-60 transform bg-white shadow-lg transition-transform duration-300 md:static md:translate-x-0 ${{
                    '-translate-x-full': !sidebarOpen,
                }}`.replace('[object Object]', sidebarOpen ? '' : '-translate-x-full')}
            >
                <div className="flex h-16 items-center justify-center border-b">
                    <h1 className="text-2xl font-bold text-[#8157FF]">Howitwork</h1>
                </div>
                <nav className="mt-6 flex flex-col gap-1 px-4 text-sm font-medium text-gray-600">
                    <SidebarLink href="/realtor/dashboard" Icon={FaTachometerAlt} label="Dashboard" active />
                    <SidebarLink href="#" Icon={FiUsers} label="Leads" />
                    <SidebarLink href="#" Icon={HiOutlineCurrencyDollar} label="Commission" />
                    <SidebarLink href="#" Icon={FiBarChart2} label="Performance" />
                    <div className="mt-auto border-t pt-4">
                        <SidebarLink href="#" Icon={FiUser} label="Profile" />
                        <SidebarLink href="#" Icon={FiLogOut} label="Logout" />
                    </div>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex flex-1 flex-col md:ml-60">
                {/* Top bar */}
                <header className="flex h-16 items-center justify-between bg-white px-4 shadow md:shadow-none">
                    <button
                        className="text-2xl text-gray-700 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        {/* hamburger icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                            />
                        </svg>
                    </button>
                    <div className="hidden md:block" />
                    {/* User profile */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                            <Image src="/icons/client.svg" alt="avatar" width={32} height={32} />
                        </div>
                        <div className="hidden text-right text-xs md:block">
                            <p className="font-semibold">Rokeeb Abdul</p>
                            <p className="text-gray-500">email@gmail.com</p>
                        </div>
                    </div>
                </header>

                {/* Spacer for fixed header on small screens */}
                <div className="h-4 md:h-0" />

                {/* Content */}
                <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 md:px-8">
                    <h2 className="mt-6 text-2xl font-semibold md:text-3xl">
                        Welcome back, <span className="capitalize">Test Name</span>
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Here's your performance summary for this month.
                    </p>

                    {/* Referral link */}
                    <section className="mt-8">
                        <h3 className="mb-2 text-sm font-medium">Your Unique Referral Link</h3>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                readOnly
                                value="https://howitworks.ng/ref/emeka-obi"
                                className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#8157FF] focus:outline-none"
                            />
                            <button
                                className="inline-flex items-center justify-center rounded bg-[#8157FF] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#6d49e0]"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        'https://howitworks.ng/ref/emeka-obi'
                                    );
                                }}
                            >
                                <GoCopy className="mr-2" /> Copy Link
                            </button>
                        </div>
                    </section>

                    {/* Stats cards */}
                    <section className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatsCard
                            value="42"
                            label="Leads Generated"
                            iconSrc="/icons/hero-icon.svg"
                        />
                        <StatsCard value="187" label="Referral Clicks" iconSrc="/icons/iconcontainer1.svg" />
                        <StatsCard value="₦250,000" label="Commissions Earned" iconSrc="/icons/iconcontainer2.svg" />
                    </section>

                    {/* Recent leads table */}
                    <section className="mt-10">
                        <h3 className="mb-4 text-lg font-semibold">Recent Leads</h3>
                        <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-sm">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Property Enquired</th>
                                        <th className="px-4 py-3">Location</th>
                                        <th className="px-4 py-3">Enquiry Date</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-gray-700">
                                    {leads.map((lead, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap">{lead.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{lead.property}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{lead.location}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{lead.date}</td>
                                            <td className={`px-4 py-3 font-medium ${statusColor[lead.status]}`}>{lead.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex items-center justify-end gap-1 text-sm">
                            <PageButton label="<" />
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <PageButton key={n} label={n.toString()} active={n === 2} />
                            ))}
                            <PageButton label="..." />
                            <PageButton label=">" />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Showing 1-10 from 100</p>
                    </section>
                </main>
            </div>
        </div>
    );
}

interface SidebarLinkProps {
    href: string;
    Icon: React.ElementType;
    label: string;
    active?: boolean;
}

function SidebarLink({ href, Icon, label, active }: SidebarLinkProps) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded px-3 py-2 transition hover:bg-gray-100 ${active ? 'bg-gray-100 font-semibold text-[#8157FF]' : ''
                }`}
        >
            <Icon className="h-4 w-4" /> {label}
        </Link>
    );
}

interface StatsCardProps {
    value: string;
    label: string;
    iconSrc: string;
}

function StatsCard({ value, label, iconSrc }: StatsCardProps) {
    return (
        <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-4 shadow-sm">
            <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="mt-1 text-xs text-gray-500">{label}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F1FF]">
                <Image src={iconSrc} alt="icon" width={20} height={20} />
            </div>
        </div>
    );
}

interface PageButtonProps {
    label: string;
    active?: boolean;
}

function PageButton({ label, active }: PageButtonProps) {
    return (
        <button
            className={`grid h-6 w-6 place-items-center rounded text-xs font-medium transition ${active ? 'bg-[#8157FF] text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
        >
            {label}
        </button>
    );
} 