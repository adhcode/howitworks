import { Suspense } from 'react';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import VideoShowcase from './components/VideoShowcase';
import ReferralTracker from './components/ReferralTracker';
import PropertySalesSection from './components/home/PropertySalesSection';
import MaintenanceSection from './components/home/MaintenanceSection';
import FractionalInvestmentSection from './components/home/FractionalInvestmentSection';
import PropertyUpgradeSection from './components/home/PropertyUpgradeSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <ReferralTracker />
      </Suspense>
      <Hero />
      <PropertySalesSection />
      <MaintenanceSection />
      <FractionalInvestmentSection />
      <PropertyUpgradeSection />
      <Testimonials />
      <Blog />
      <FAQ />
      <VideoShowcase />
    </main>
  );
}
