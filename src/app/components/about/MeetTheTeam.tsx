import Image from 'next/image';

const TEAM_MEMBERS = [
    {
        name: "Princewill",
        role: "Founder",
        image: "/about/team/max.jpg",

    },
    {
        name: "Sarah Johnson",
        role: "Chief Real Estate Officer",
        image: "/about/team/sarah.jpg",

    },
    {
        name: "David Brown",
        role: "Head of Property Management",
        image: "/about/team/david.jpg",

    }
];

const MeetTheTeam = () => {
    return (
        <section className="mb-20">
            <h2 className="text-[32px] font-semibold text-[#2E2E2E] mb-12">
                Meet The Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEAM_MEMBERS.map((member, index) => (
                    <div key={index} className="bg-white rounded-[32px] overflow-hidden">
                        <div className="relative">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={400}
                                height={400}
                                className="w-full object-cover"
                            />

                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                <div className="relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white"
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="pt-14 p-6">
                            <h3 className="text-xl font-semibold text-[#2E2E2E] mb-1">
                                {member.name}
                            </h3>
                            <p className="text-base text-[#666666] mb-6">
                                {member.role}
                            </p>
                            <div className="flex items-center justify-between bg-[#F5F3FF] rounded-full p-2">
                                <button className="flex items-center gap-2 text-[#2E2E2E] hover:text-[#703BF7] transition-colors px-4">
                                    <span>Say Hello</span>
                                    <span role="img" aria-label="wave">👋</span>
                                </button>
                                <button className="w-10 h-10 bg-[#703BF7] rounded-full flex items-center justify-center hover:bg-[#703BF7] transition-colors group">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.8563 1.14793C16.4396 0.722098 15.8229 0.564598 15.2479 0.731264L1.8396 4.60543C1.23293 4.77376 0.802932 5.2546 0.687098 5.8646C0.568765 6.48626 0.982098 7.27626 1.5221 7.60626L5.7146 10.1663C6.1446 10.4296 6.6996 10.3638 7.05543 10.0071L11.8563 5.20626C12.0979 4.95543 12.4979 4.95543 12.7396 5.20626C12.9813 5.4471 12.9813 5.8396 12.7396 6.0896L7.93043 10.8904C7.57377 11.2471 7.5071 11.8004 7.7696 12.2313L10.3313 16.4396C10.6313 16.9388 11.1479 17.2229 11.7146 17.2229C11.7813 17.2229 11.8563 17.2229 11.9229 17.2138C12.5729 17.1313 13.0896 16.6888 13.2813 16.0638L17.2563 2.75626C17.4313 2.1896 17.2729 1.57293 16.8563 1.14793Z" fill="white" />
                                        <path opacity="0.4" d="M6.87624 14.952C7.11957 15.1961 7.11957 15.592 6.87624 15.8361L5.73791 16.9736C5.61624 17.0961 5.45624 17.157 5.29624 17.157C5.13624 17.157 4.97624 17.0961 4.85457 16.9736C4.61041 16.7295 4.61041 16.3345 4.85457 16.0903L5.99207 14.952C6.23624 14.7086 6.63207 14.7086 6.87624 14.952ZM6.22316 11.7953C6.46649 12.0395 6.46649 12.4353 6.22316 12.6795L5.08482 13.817C4.96316 13.9395 4.80316 14.0003 4.64316 14.0003C4.48316 14.0003 4.32316 13.9395 4.20149 13.817C3.95732 13.5728 3.95732 13.1778 4.20149 12.9336L5.33899 11.7953C5.58316 11.552 5.97899 11.552 6.22316 11.7953ZM3.08882 10.8016C3.33216 11.0458 3.33216 11.4416 3.08882 11.6858L1.95049 12.8233C1.82882 12.9458 1.66882 13.0066 1.50882 13.0066C1.34882 13.0066 1.18882 12.9458 1.06716 12.8233C0.822992 12.5791 0.822992 12.1841 1.06716 11.94L2.20466 10.8016C2.44882 10.5583 2.84466 10.5583 3.08882 10.8016Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MeetTheTeam; 