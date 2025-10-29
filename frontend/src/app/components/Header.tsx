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
            <header className={`fixed top-0 left-0 right-0 w-full bg-[#f4f5f7] z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'border-b border-[#0F1A3A]'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-0 h-[80px]">
                    {/* Brand */}
                    <div className="w-[180px]">
                        <Link href="/" className="relative z-20">
                            <Image src="/logo.svg" alt="logo" width={40} height={40} />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex flex-1 items-center justify-center gap-8">
                        <Link
                            href="/"
                            className="px-4 py-2 text-base font-semibold text-[#1A2A52] hover:text-[#1FD2AF] transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="px-4 py-2 text-base font-semibold text-[#1A2A52] hover:text-[#1FD2AF] transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/properties"
                            className="px-4 py-2 text-base font-semibold text-[#1A2A52] hover:text-[#1FD2AF] transition-colors"
                        >
                            Properties
                        </Link>
                        <Link
                            href="/blog"
                            className="px-4 py-2 text-base font-semibold text-[#1A2A52] hover:text-[#1FD2AF] transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>

                    {/* Right Side Buttons - Desktop */}
                    <div className="hidden lg:flex items-center gap-4 w-[220px] justify-end">
                        <Link
                            href="/auth/login"
                            className="px-4 py-2 text-base font-semibold text-[#1A2A52] hover:text-[#1FD2AF] transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/contact"
                            className="px-6 py-3 rounded-lg bg-[#1FD2AF] text-white text-base font-semibold hover:bg-[#1AB89A] transition-all"
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
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1A2A52] border-b border-[#0F1A3A] py-4 px-6 shadow-lg">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="px-4 py-2 text-base font-semibold text-white hover:text-[#1FD2AF] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-2 text-base font-semibold text-white hover:text-[#1FD2AF] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/properties"
                                className="px-4 py-2 text-base font-semibold text-white hover:text-[#1FD2AF] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Properties
                            </Link>
                            <Link
                                href="/blog"
                                className="px-4 py-2 text-base font-semibold text-white hover:text-[#1FD2AF] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <div className="border-t border-[#0F1A3A] pt-4 mt-2">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-base font-semibold text-white hover:text-[#1FD2AF] transition-colors block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-4 py-2 text-base font-semibold text-white hover:text-[#1FD2AF] transition-colors block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact Us
                                </Link>
                            </div>
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
