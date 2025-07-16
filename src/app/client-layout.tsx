'use client'

import { usePathname } from 'next/navigation';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const isRealtorPage = pathname?.startsWith('/realtor');
    const isAdminPage = pathname?.startsWith('/admin');
    const isInvestorPage = pathname?.startsWith('/investor');
    const isLoginPage = pathname === '/login';

    if (isRealtorPage || isAdminPage || isInvestorPage || isLoginPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
} 