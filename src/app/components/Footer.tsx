import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-[#EBEBEB] mt-12">
            {/* Top CTA Section */}
            <div className="relative border-b border-[#EBEBEB] py-12 overflow-hidden">
                {/* Left Abstract Image */}
                <div className="absolute left-0 top-0 h-full w-[30%] sm:w-[35%] md:w-[40%] max-w-[569px] pointer-events-none select-none z-0">
                    <Image
                        src="/footer1.png"
                        alt="abstract left"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-40 sm:opacity-60 md:opacity-100"
                    />
                </div>
                {/* Right Abstract Image */}
                <div className="absolute right-0 top-0 h-full w-[30%] sm:w-[35%] md:w-[40%] max-w-[569px] pointer-events-none select-none z-0">
                    <Image
                        src="/footer2.png"
                        alt="abstract right"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-40 sm:opacity-60 md:opacity-100"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-0 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10">
                    <div className="flex-1">
                        <h2 className="text-[28px] sm:text-[32px] md:text-[38px] font-semibold text-[#1A2A52] mb-3">Start Your Real Estate Journey Today</h2>
                        <p className="text-[#3A3A3C] text-sm sm:text-base font-medium max-w-[520px]">How it works is a modern real estate platform that connects clients with verified realtors to help them find their dream properties across Nigeria.
                            We offer legitimate leasing opportunities backed by verified documentation, ensuring that investors are well-informed and fully protected.</p>
                    </div>
                    <Link
                        href="/properties"
                        className="bg-[#1FD2AF] w-full sm:w-auto text-white px-[20px] py-[14px] rounded-[8px] font-[500] hover:bg-[#1AB89A] transition-all whitespace-nowrap text-center"
                    >
                        Explore Properties
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-0 py-12 sm:py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand & Email */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.svg"
                                alt="Howitworks Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <div className="text-2xl font-extrabold text-[#1A2A52]">Howitworks</div>
                        </div>

                        <form className="relative mb-4 max-w-[320px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Image src="/icons/mail.png" alt="Mail" width={18} height={18} />
                            </span>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1FD2AF] text-[15px] bg-[#F4F5F7]"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent hover:scale-110 transition-transform"
                                tabIndex={-1}
                            >
                                <Image src="/icons/plane.png" alt="Send" width={20} height={20} />
                            </button>
                        </form>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <div className="font-medium text-lg mb-4 text-[#3A3A3C]">Home</div>
                        <ul className="space-y-2.5 text-[#3A3A3C] text-sm sm:text-base">
                            <li><Link href="#hero" className="hover:text-[#1FD2AF] transition-colors">Hero Section</Link></li>
                            <li><Link href="#features" className="hover:text-[#1FD2AF] transition-colors">Features</Link></li>
                            <li><Link href="#testimonials" className="hover:text-[#1FD2AF] transition-colors">Testimonials</Link></li>
                            <li><Link href="#faq" className="hover:text-[#1FD2AF] transition-colors">FAQ's</Link></li>
                        </ul>
                    </div>

                    <div>
                        <div className="font-medium text-lg mb-4 text-[#3A3A3C]">About Us</div>
                        <ul className="space-y-2.5 text-[#3A3A3C] text-sm sm:text-base">
                            <li><Link href="/about#journey" className="hover:text-[#1FD2AF] transition-colors">Our Journey</Link></li>
                            <li><Link href="/about#values" className="hover:text-[#1FD2AF] transition-colors">Our Values</Link></li>
                            <li><Link href="/about#why-choose-us" className="hover:text-[#1FD2AF] transition-colors">Why Choose Us</Link></li>
                            <li><Link href="/about#team" className="hover:text-[#1FD2AF] transition-colors">Our Team</Link></li>
                        </ul>
                    </div>

                    <div>
                        <div className="font-medium text-lg mb-4 text-[#3A3A3C]">Properties</div>
                        <ul className="space-y-2.5 text-[#3A3A3C] text-sm sm:text-base">
                            <li><Link href="/properties" className="hover:text-[#1FD2AF] transition-colors">Portfolio</Link></li>
                            <li><Link href="/properties#request" className="hover:text-[#1FD2AF] transition-colors">Request</Link></li>
                            <li><Link href="/blog" className="hover:text-[#1FD2AF] transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <div className="font-medium text-lg mb-4 text-[#3A3A3C]">Contact Us</div>
                        <ul className="space-y-2.5 text-[#3A3A3C] text-sm sm:text-base">
                            <li><Link href="/contact" className="hover:text-[#1FD2AF] transition-colors">Contact Form</Link></li>
                            <li><Link href="/contact#offices" className="hover:text-[#1FD2AF] transition-colors">Our Offices</Link></li>
                            <li><Link href="/contact#support" className="hover:text-[#1FD2AF] transition-colors">Support</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#EBEBEB] bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#3A3A3C]">
                    <div className="flex flex-col sm:flex-row sm:gap-6 items-center order-2 sm:order-1">
                        <span className="mb-2 sm:mb-0 text-center">©2025 Howitwork. All Rights Reserved.</span>
                        <Link href="/terms" className="hover:text-[#1FD2AF] text-[#3A3A3C] transition-colors">Terms & Conditions</Link>
                        <Link href="/privacy" className="hover:text-[#1FD2AF] text-[#3A3A3C] transition-colors">Privacy Policy</Link>
                    </div>
                    <div className="flex gap-6 order-1 sm:order-2 mb-4 sm:mb-0">
                        <Link href="#" aria-label="Facebook" className="hover:text-[#1FD2AF] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                            </svg>
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="hover:text-[#1FD2AF] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                            </svg>
                        </Link>
                        <Link href="#" aria-label="Twitter" className="hover:text-[#1FD2AF] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
                            </svg>
                        </Link>
                        <Link href="#" aria-label="YouTube" className="hover:text-[#1FD2AF] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0 9.386.574a2.994 2.994 0 0 0 2.112 2.112C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
