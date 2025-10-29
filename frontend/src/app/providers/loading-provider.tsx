'use client'

import { useEffect, useState } from 'react'
import Loading from '../loading'
import { usePathname } from 'next/navigation'

export default function LoadingProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    useEffect(() => {
        if (!isHomePage) {
            setIsLoading(false)
            return
        }

        // Show loading for a shorter duration
        setTimeout(() => {
            setIsTransitioning(true)
            // After transition starts, wait before removing the loading screen
            setTimeout(() => {
                setIsLoading(false)
            }, 500) // Transition duration
        }, 1000) // Loading duration
    }, [isHomePage])

    if (!isHomePage) return <>{children}</>

    return (
        <>
            {isLoading && (
                <div className={`fixed inset-0 bg-white z-50 transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center justify-center h-screen">
                        <div className={`relative w-[129px] h-[129px] transition-all duration-500 ease-in-out ${isTransitioning ? 'transform -translate-y-[40vh] scale-75' : ''
                            }`}>
                            <Loading />
                        </div>
                    </div>
                </div>
            )}
            <div className={`transition-opacity duration-500 ${!isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    )
} 