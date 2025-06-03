'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 w-full bg-[#FAFAFA] z-50 transition-all duration-300 ${scrolled ? 'shadow-sm' : 'border-b border-[#EBEBEB]'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-[80px]">
                    {/* Brand */}
                    <div className="w-[180px]">
                        <Link href="/" className="relative z-20">
                            <span className="text-2xl font-extrabold text-purple-600">Howitworks</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex flex-1 items-center justify-center gap-8">
                        <Link
                            href="/"
                            className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/properties"
                            className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                        >
                            Properties
                        </Link>
                    </nav>

                    {/* Contact Us Button - Desktop */}
                    <div className="hidden lg:block w-[180px] text-right">
                        <Link
                            href="/contact"
                            className="px-6 py-2 rounded-full bg-purple-600 text-white text-[14px] font-medium hover:bg-purple-700 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-20 p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Image
                            src="/icons/hamburger.svg"
                            alt="Menu"
                            width={24}
                            height={24}
                            className={`transition-all duration-300 ${isMenuOpen ? 'opacity-50' : ''}`}
                        />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#EBEBEB] py-4 px-6 shadow-lg">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/properties"
                                className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Properties
                            </Link>
                            <Link
                                href="/contact"
                                className="px-4 py-2 text-[14px] font-medium text-[#2E2E2E] hover:text-purple-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
            {/* Spacer for fixed header */}
            <div className="h-[80px] w-full"></div>
        </>
    );
};

export default Header;
