import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import LoadingProvider from "./providers/loading-provider";
import ClientLayout from "./client-layout";
import AuthProvider from "./providers/auth-provider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "How It Works",
  description: "Find your dream home with trusted realtors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${poppins.variable}`}>
        <AuthProvider>
          <LoadingProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
