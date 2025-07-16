import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export default async function RealtorPage({ params }: Props) {
    // Await params before using them (Next.js 15 requirement)
    const { slug } = await params

    // Find the realtor by slug
    const realtor = await prisma.realtor.findUnique({
        where: { slug }
    })

    if (!realtor) {
        notFound()
    }

    // TODO: Track the visit (you can add visitor tracking logic here)
    // For now, we'll just display the realtor info and redirect to main site

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to HowItWorks
                </h1>
                <p className="text-gray-600 mb-6">
                    You've been referred by <strong>{realtor.firstName} {realtor.lastName}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Your referral has been tracked. Browse our properties and get personalized assistance.
                </p>
                <a
                    href="/"
                    className="inline-block bg-[#703BF7] text-white px-6 py-3 rounded-md hover:bg-[#5f2fd6] transition-colors"
                >
                    Browse Properties
                </a>
            </div>
        </div>
    )
} 