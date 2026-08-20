import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Testimonials data
const testimonials = [
    {
        id: 1,
        rating: 5,
        title: 'Exceptional Service!',
        content: 'Our experience with Howitwork was outstanding. Their team\'s dedication and professionalism made finding our dream home a breeze. Highly recommended!',
        author: {
            name: 'Tade Sholayemi',
            location: 'Nigeria, Lagos',
            image: 'https://ui-avatars.com/api/?name=Tade+Sholayemi&background=703BF7&color=fff'
        }
    },
    {
        id: 2,
        rating: 5,
        title: 'Efficient and Reliable',
        content: 'Howitwork provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn\'t be happier with the results.',
        author: {
            name: 'Emelie Thomson',
            location: 'USA, Florida',
            image: 'https://ui-avatars.com/api/?name=Emelie+Thomson&background=703BF7&color=fff'
        }
    },
    {
        id: 3,
        rating: 5,
        title: 'Trusted Advisors',
        content: 'The Howitwork team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!',
        author: {
            name: 'John Mans',
            location: 'USA, Nevada',
            image: 'https://ui-avatars.com/api/?name=John+Mans&background=703BF7&color=fff'
        }
    },
    {
        id: 4,
        rating: 5,
        title: 'Amazing Experience',
        content: 'From start to finish, the Howitwork team was professional and attentive. They made the home buying process smooth and stress-free.',
        author: {
            name: 'Sarah Williams',
            location: 'UK, London',
            image: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=703BF7&color=fff'
        }
    },
    {
        id: 5,
        rating: 5,
        title: 'Highly Professional',
        content: 'The realtor we worked with was incredibly knowledgeable about the market. They helped us find the perfect investment property.',
        author: {
            name: 'David Chen',
            location: 'Canada, Toronto',
            image: 'https://ui-avatars.com/api/?name=David+Chen&background=703BF7&color=fff'
        }
    },
    {
        id: 6,
        rating: 5,
        title: 'Outstanding Support',
        content: 'I appreciated the constant communication and updates throughout the process. Howitwork really cares about their clients.',
        author: {
            name: 'Maria Garcia',
            location: 'Spain, Madrid',
            image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=703BF7&color=fff'
        }
    },
    {
        id: 7,
        rating: 5,
        title: 'Best Decision Ever',
        content: 'Working with Howitwork was the best decision we made. They found us our dream home within our budget and timeline.',
        author: {
            name: 'Ahmed Ibrahim',
            location: 'UAE, Dubai',
            image: 'https://ui-avatars.com/api/?name=Ahmed+Ibrahim&background=703BF7&color=fff'
        }
    },
    {
        id: 8,
        rating: 5,
        title: 'Seamless Process',
        content: 'The entire process was seamless from viewing to closing. I highly recommend Howitwork to anyone looking to buy or sell.',
        author: {
            name: 'Jennifer Brown',
            location: 'Australia, Sydney',
            image: 'https://ui-avatars.com/api/?name=Jennifer+Brown&background=703BF7&color=fff'
        }
    },
    {
        id: 9,
        rating: 5,
        title: 'Expert Guidance',
        content: 'The expertise and market knowledge of our realtor was invaluable. They negotiated a great deal for us.',
        author: {
            name: 'Robert Taylor',
            location: 'USA, New York',
            image: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=703BF7&color=fff'
        }
    }
];

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#1A2A52] to-[#1FD2AF] py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 lg:px-16 text-center">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                        What Our Clients Say
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
                        Read the success stories and heartfelt testimonials from our valued clients.
                        Discover why they chose How It Works for their real estate needs.
                    </p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-16 lg:py-24 bg-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-4 lg:px-16">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-6 text-center shadow-md">
                            <div className="text-4xl font-bold text-[#2E2E2E] mb-2">200+</div>
                            <div className="text-[#666666]">Happy Clients</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-md">
                            <div className="text-4xl font-bold text-[#2E2E2E] mb-2">4.9/5</div>
                            <div className="text-[#666666]">Average Rating</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-md">
                            <div className="text-4xl font-bold text-[#2E2E2E] mb-2">98%</div>
                            <div className="text-[#666666]">Would Recommend</div>
                        </div>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white rounded-[10px] p-6 border border-[#E5E7EB] hover:shadow-lg transition-all">
                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center">
                                            <svg
                                                className={`w-5 h-5 ${index < testimonial.rating ? 'text-[#FFB300]' : 'text-[#E5E7EB]'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>

                                {/* Content */}
                                <h3 className="text-[#2E2E2E] text-lg font-semibold mb-2">{testimonial.title}</h3>
                                <p className="text-[#666666] text-[16px] mb-6 leading-relaxed">{testimonial.content}</p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonial.author.image}
                                            alt={testimonial.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-[#2E2E2E] font-medium">{testimonial.author.name}</h4>
                                        <p className="text-[#666666] text-sm">{testimonial.author.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
