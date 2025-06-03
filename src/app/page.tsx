import FeaturedProperties from './components/FeaturedProperties';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <FAQ />

    </main>
  );
}
