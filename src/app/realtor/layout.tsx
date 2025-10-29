import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Realtor Dashboard - How It Works",
    description: "Realtor dashboard for managing leads and commissions",
};

export default function RealtorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 