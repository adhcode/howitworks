'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// FAQ data
const faqData = [
    {
        id: 1,
        category: 'Buying',
        question: 'How do I search for properties?',
        answer: 'You can search for properties using our advanced search tool on the Properties page. Filter by location, price range, property type, number of bedrooms, and more. You can also save your favorite properties and set up alerts for new listings that match your criteria.'
    },
    {
        id: 2,
        category: 'Buying',
        question: 'What is the home buying process?',
        answer: 'The home buying process typically involves: 1) Getting pre-approved for a mortgage, 2) Searching for properties with a realtor, 3) Making an offer, 4) Home inspection, 5) Finalizing financing, 6) Closing. Our realtors guide you through each step.'
    },
    {
        id: 3,
        category: 'Buying',
        question: 'How much do I need for a down payment?',
        answer: 'Down payments typically range from 3% to 20% of the home\'s purchase price. First-time buyers may qualify for programs with lower down payment requirements. Our realtors can connect you with mortgage advisors to discuss your options.'
    },
    {
        id: 4,
        category: 'Selling',
        question: 'What documents do I need to sell my property?',
        answer: 'To list your property, you\'ll need: property title/deed, recent mortgage statement, tax records, homeowners insurance information, HOA documents (if applicable), and any warranties or receipts for major improvements. Our team will help you gather and organize all necessary documentation.'
    },
    {
        id: 5,
        category: 'Selling',
        question: 'How is my property\'s value determined?',
        answer: 'Property value is determined through a Comparative Market Analysis (CMA) which considers recent sales of similar properties in your area, current market conditions, your property\'s condition, location, and unique features. Our experienced realtors provide complimentary property valuations.'
    },
    {
        id: 6,
        category: 'Selling',
        question: 'How long does it take to sell a property?',
        answer: 'The time to sell varies based on market conditions, location, pricing, and property condition. On average, properties sell within 30-60 days. Proper pricing and staging can significantly reduce time on market.'
    },
    {
        id: 7,
        category: 'Realtors',
        question: 'How can I contact an agent?',
        answer: 'You can contact our agents through multiple channels: browse our Realtors page and contact them directly, submit an inquiry through any property listing, call our main office, or fill out our contact form. All realtors typically respond within 24 hours.'
    },
    {
        id: 8,
        category: 'Realtors',
        question: 'How do I become a realtor on your platform?',
        answer: 'To join our platform as a realtor, you must have an active real estate license, professional liability insurance, and good standing with your local real estate board. Apply through our Realtor Signup page. After verification, you\'ll get access to our realtor dashboard.'
    },
    {
        id: 9,
        category: 'Realtors',
        question: 'What commission do realtors charge?',
        answer: 'Real estate commission is typically 5-6% of the sale price, split between the buyer\'s and seller\'s agents. The exact rate is negotiable and should be discussed with your realtor. Some realtors on our platform offer competitive rates and flexible commission structures.'
    },
    {
        id: 10,
        category: 'General',
        question: 'Is my information secure?',
        answer: 'Yes, we take data security seriously. All personal information is encrypted and stored securely. We comply with data protection regulations and never share your information with third parties without your explicit consent. Read our Privacy Policy for more details.'
    },
    {
        id: 11,
        category: 'General',
        question: 'Do you offer property management services?',
        answer: 'Yes, many of our partner realtors offer property management services including tenant screening, rent collection, maintenance coordination, and financial reporting. Contact us to be connected with property management specialists in your area.'
    },
    {
        id: 12,
        category: 'General',
        question: 'Can I schedule property viewings online?',
        answer: 'Yes! Most of our property listings have an "Schedule a Viewing" button. Select your preferred date and time, and the listing agent will confirm your appointment. You can also request virtual tours for many properties.'
    }
];

const categories = ['All', 'Buying', 'Selling', 'Realtors', 'General'];

export default function FAQsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const filteredFAQs = selectedCategory === 'All' 
        ? faqData 
        : faqData.filter(faq => faq.category === selectedCategory);

    const toggleFAQ = (id: number) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#1A2A52] to-[#1FD2AF] py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 lg:px-16 text-center">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
                        Find answers to common questions about our services, property listings,
                        and the real estate process. We're here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16 lg:py-24 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 lg:px-16">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                                    selectedCategory === category
                                        ? 'bg-[#1FD2AF] text-white'
                                        : 'bg-white text-[#2E2E2E] border border-[#E5E7EB] hover:bg-[#1FD2AF] hover:text-white'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredFAQs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-all"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                >
                                    <div className="flex-1">
                                        <span className="text-[#1FD2AF] text-xs font-semibold uppercase mb-2 block">
                                            {faq.category}
                                        </span>
                                        <h3 className="text-[#2E2E2E] text-lg font-semibold">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className="ml-4">
                                        <svg
                                            className={`w-6 h-6 text-[#2E2E2E] transition-transform ${
                                                openFAQ === faq.id ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </button>
                                {openFAQ === faq.id && (
                                    <div className="px-6 pb-5">
                                        <p className="text-[#666666] leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-16 bg-white rounded-xl p-8 text-center max-w-4xl mx-auto border border-[#E5E7EB]">
                        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-[#666666] mb-6">
                            Can't find the answer you're looking for? Our team is here to help.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-[#1FD2AF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1AB89A] transition-all"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
