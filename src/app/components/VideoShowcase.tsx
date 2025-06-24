'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const VideoShowcase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const dismissComponent = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening when dismissing
        setIsDismissed(true);
        setIsVisible(false);
    };

    // Auto-show after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isDismissed) {
                setIsVisible(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isDismissed]);

    // Close modal when clicking outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // Video details
    const videoData = {
        title: "Virtual Property Tour",
        description: "Take a virtual tour of our premium properties",
        thumbnail: "/house/house1.png",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };

    // Don't render if dismissed
    if (isDismissed) return null;

    return (
        <>
            {/* Floating Video Card - Bottom Right */}
            <div className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                }`}>
                <div className="group relative">
                    {/* Dismiss Button - Always Visible */}
                    <button
                        onClick={dismissComponent}
                        className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-[#3A3A3C] hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:scale-110"
                        title="Close video showcase"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M9 3L3 9M3 3L9 9"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Main Card */}
                    <div
                        onClick={openModal}
                        className="bg-white rounded-xl shadow-lg border border-[#EBEBEB] overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl max-w-[280px] group-hover:bg-[#F4F5F7]"
                    >
                        {/* Video Thumbnail */}
                        <div className="relative h-32 overflow-hidden">
                            <Image
                                src={videoData.thumbnail}
                                alt="Video thumbnail"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-[#1FD2AF] hover:bg-[#1AB89A] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="ml-0.5"
                                    >
                                        <path
                                            d="M5 3L13 8L5 13V3Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Live Badge */}
                            <div className="absolute top-2 left-2">
                                <span className="bg-[#FFB300] text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    Live
                                </span>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2">
                                <span className="bg-black/70 text-white px-2 py-0.5 rounded text-xs font-medium">
                                    2:30
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-3">
                            <h3 className="text-[#1A2A52] font-semibold text-sm mb-1 line-clamp-1">
                                {videoData.title}
                            </h3>
                            <p className="text-[#3A3A3C] text-xs line-clamp-2 mb-2">
                                Experience luxury properties with guided tours
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-[#1FD2AF] text-xs font-medium">Watch Tour</span>
                                <div className="w-5 h-5 rounded-full bg-[#F4F5F7] flex items-center justify-center group-hover:bg-[#1FD2AF] transition-colors">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M1 9L9 1M9 1H1M9 1V9"
                                            stroke="#3A3A3C"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="group-hover:stroke-white transition-colors"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Animation */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1FD2AF]/10 to-[#FFB300]/10 -z-10 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>
            </div>

            {/* Simplified Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={handleBackdropClick}
                >
                    {/* Modal Content */}
                    <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl modal-enter">
                        {/* Simple Header */}
                        <div className="flex items-center justify-between p-4 bg-[#F4F5F7] border-b border-[#EBEBEB]">
                            <h2 className="text-lg font-bold text-[#1A2A52]">{videoData.title}</h2>
                            <button
                                onClick={closeModal}
                                className="w-8 h-8 bg-[#3A3A3C] hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                                title="Close video"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M12 4L4 12M4 4L12 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Video Container */}
                        <div className="relative aspect-video bg-black">
                            <iframe
                                src={videoData.videoUrl}
                                title={videoData.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Simple Footer */}
                        <div className="p-4 bg-white border-t border-[#EBEBEB]">
                            <p className="text-[#3A3A3C] text-sm mb-4 text-center">
                                {videoData.description}
                            </p>

                            {/* Simple Action Buttons */}
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => {
                                        closeModal();
                                        window.location.href = '/properties';
                                    }}
                                    className="bg-[#1FD2AF] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1AB89A] transition-colors"
                                >
                                    View Properties
                                </button>
                                <button
                                    onClick={() => {
                                        closeModal();
                                        window.location.href = '/contact';
                                    }}
                                    className="text-[#3A3A3C] px-6 py-2 rounded-lg font-medium border border-[#EBEBEB] hover:bg-[#F4F5F7] transition-colors"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoShowcase; 