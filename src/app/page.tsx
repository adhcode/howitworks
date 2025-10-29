import FeaturedProperties from './components/FeaturedProperties';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import VideoShowcase from './components/VideoShowcase';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <Blog />
      <FAQ />
      <VideoShowcase />
    </main>
  );
}
