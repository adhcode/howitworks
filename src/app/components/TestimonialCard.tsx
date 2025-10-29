import Image from 'next/image';

interface TestimonialCardProps {
    rating: number;
    title: string;
    content: string;
    author: {
        name: string;
        location: string;
        image: string;
    };
}

const TestimonialCard = ({ rating, title, content, author }: TestimonialCardProps) => {
    return (
        <div className="bg-[#F4F5F7] rounded-[10px] p-6 border border-[#EBEBEB]">
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="w-8 h-8 rounded-full border border-[#EBEBEB] flex items-center justify-center">
                        <svg
                            className={`w-5 h-5 ${index < rating ? 'text-[#FFB300]' : 'text-[#E1E1E1]'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Content */}
            <h3 className="text-[#1A2A52] text-lg font-semibold mb-2">{title}</h3>
            <p className="text-[#3A3A3C] text-[16px] mb-6">{content}</p>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-[#1A2A52] font-medium">{author.name}</h4>
                    <p className="text-[#3A3A3C] text-sm">{author.location}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard; 