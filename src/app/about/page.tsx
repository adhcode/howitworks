import Image from 'next/image';
import OurJourney from '../components/about/OurJourney';
import OurValues from '../components/about/OurValues';
import WhatDrivesUs from '../components/about/WhatDrivesUs';
import WhyChooseUs from '../components/about/WhyChooseUs';
import MeetTheTeam from '../components/about/MeetTheTeam';
import Testimonials from '../components/Testimonials';
export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <OurJourney />
                <OurValues />
                <WhatDrivesUs />
                <WhyChooseUs />
                <MeetTheTeam />
                <Testimonials />
            </div>
        </main>
    );
} 