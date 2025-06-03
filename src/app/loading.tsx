'use client'

import Image from 'next/image';

export default function Loading() {
    return (
        <Image
            src="/icons/hero-icon.svg"
            alt="Loading"
            fill
            priority
            className="animate-spin-slow"
        />
    );
} 