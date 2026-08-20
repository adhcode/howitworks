import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
    image: string;
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    hasVilla?: boolean;
    href: string;
}

const PropertyCard = ({
    image,
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    hasVilla = false,
    href
}: PropertyCardProps) => {
    return (
        <div className="bg-[#F4F5F7] rounded-[12px] overflow-hidden border border-[#EBEBEB] transition-all p-[12px] md:p-[30px]">
            {/* Image Container */}
            <div className="relative h-[240px] w-full rounded-[12px] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="mt-4">
                <h3 className="text-[#2E2E2E] text-lg font-medium mb-2">{title}</h3>
                <p className="text-[#666666] text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Features */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 text-[12px] border border-[#EBEBEB] rounded-[28px] px-[14px] py-[6px]">
                        <Image
                            src="/icons/bedroom.svg"
                            alt="Bedrooms"
                            width={14}
                            height={16}
                        />
                        <span className="text-[12px] text-[#666666]">{bedrooms} Bedroom</span>
                    </div>
                    <div className="flex items-center gap-2 border border-[#EBEBEB] rounded-[28px] px-[14px] py-[6px]">
                        <Image
                            src="/icons/bathroom.svg"
                            alt="Bathrooms"
                            width={14}
                            height={16}
                        />
                        <span className="text-[12px] text-[#666666]">{bathrooms} Bathroom</span>
                    </div>
                    {hasVilla && (
                        <div className="flex items-center gap-2 border border-[#EBEBEB] rounded-[28px] px-[14px] py-[6px]">
                            <Image
                                src="/icons/villa.svg"
                                alt="Villa"
                                width={14}
                                height={16}
                            />
                            <span className="text-[12px] text-[#666666]">Villa</span>
                        </div>
                    )}
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                    <div>
                        <span className="text-xs text-[#666666]">Price</span>
                        <div className="text-lg font-semibold text-[#2E2E2E]">
                            ₦{price.toLocaleString()}
                        </div>
                    </div>
                    <Link
                        href={href}
                        className="inline-block bg-[#1FD2AF] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1AB89A] transition-all sm:ml-auto"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard; 