import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingProvider from "./providers/loading-provider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
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
      <body className={`${urbanist.variable}`}>
        <LoadingProvider>
          <Header />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
