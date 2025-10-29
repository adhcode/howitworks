import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard - How It Works",
    description: "Admin dashboard for managing users, properties, and system analytics",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 