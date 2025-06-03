'use client'

import { useEffect, useState } from 'react'
import Loading from './loading'

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading time
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return <>{children}</>
} 