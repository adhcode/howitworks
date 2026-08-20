import { Suspense } from 'react';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import VideoShowcase from './components/VideoShowcase';
import ReferralTracker from './components/ReferralTracker';
import FeaturedProperties from './components/FeaturedProperties';
import PropertySalesSection from './components/home/PropertySalesSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <ReferralTracker />
      </Suspense>
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <FAQ />
      <Blog />
      <VideoShowcase />
    </main>
  );
}
