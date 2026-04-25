'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    motion,
    useScroll,
    useMotionValueEvent,
    useSpring,
} from 'motion/react';

const floors = [
    { id: 'REPAIR', name: 'Professional Repair', path: '/repair' },
    { id: 'NEW', name: 'New Car Purchase & Lease', path: '/sales' },
    { id: 'USED', name: 'Certified Pre-Owned', path: '/sales' },
    { id: 'RENTAL', name: 'Short & Long-term Rental', path: '/rental' },
    { id: 'DMV', name: 'DMV & Registration', path: '/dmv' },
];

const floorData: Record<
    string,
    { title: string; subtitle: string; desc: string }
> = {
    REPAIR: {
        title: 'EXPERT AUTO REPAIR',
        subtitle: 'Certified Vehicle Maintenance',
        desc: 'Our state-of-the-art facility features advanced diagnostics and is staffed by master technicians. We handle everything from oil changes to complex engine repairs.',
    },
    NEW: {
        title: 'NEW CAR SALES',
        subtitle: 'Purchase & Lease Options',
        desc: 'Drive home in the latest models with our hassle-free leasing and purchase programs. We offer competitive rates and a wide selection of new vehicles.',
    },
    USED: {
        title: 'CERTIFIED PRE-OWNED',
        subtitle: 'Quality Inspected Inventory',
        desc: 'Every used car in our inventory undergoes a rigorous safety and performance inspection. Drive with confidence in a vehicle you can trust.',
    },
    RENTAL: {
        title: 'CAR RENTAL SERVICES',
        subtitle: 'Short & Long-term Rentals',
        desc: 'Need a car for a day or a month? Choose from our diverse fleet of well-maintained vehicles. Perfect for business travel or insurance replacements.',
    },
    DMV: {
        title: 'FAST DMV SERVICES',
        subtitle: 'Registration & Title Help',
        desc: 'Skip the long lines at the DMV. We provide fast registration renewals, title transfers, and out-of-state vehicle registration services.',
    },
};

const Experience = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useMotionValueEvent(smoothProgress, 'change', (latest) => {
        const segment = 1 / floors.length;
        const index = Math.min(Math.floor(latest / segment), floors.length - 1);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const scrollToSegment = (idx: number) => {
        if (containerRef.current) {
            const totalHeight = containerRef.current.offsetHeight;
            const scrollableHeight = totalHeight - window.innerHeight;
            const segment = 1 / floors.length;
            // Scroll to the start of the segment
            const targetScroll =
                containerRef.current.offsetTop +
                idx * segment * scrollableHeight;

            window.scrollTo({
                top: targetScroll + 10, // Small offset to ensure it triggers the index change
                behavior: 'smooth',
            });
        }
    };

    return (
        <section
            ref={containerRef}
            id="experience"
            className="relative h-[400vh] bg-[#0a0a0a] text-white"
        >
            <div className="sticky top-0 h-screen w-full flex items-center pt-24 lg:pt-0 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-8 md:mb-12"
                    >
                        <h2 className="section-title text-white">
                            OUR SERVICES
                        </h2>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
                        {/* Floor List Sidebar - Grid on Mobile, Column on Desktop */}
                        <div className="w-full lg:w-1/4 grid grid-cols-5 lg:flex lg:flex-col pb-4 lg:pb-0 border-y lg:border-none border-white/5 divide-x lg:divide-x-0 lg:divide-y divide-white/5">
                            {floors.map((f, idx) => (
                                <div
                                    key={f.id}
                                    onClick={() => scrollToSegment(idx)}
                                    className={`relative flex flex-col lg:flex-row justify-center lg:justify-between items-center py-4 lg:py-5 px-2 lg:px-6 transition-all duration-500 overflow-hidden cursor-pointer ${activeIndex === idx ? 'text-black' : 'text-white/30 hover:text-white'}`}
                                >
                                    {/* Background Fill for Active State */}
                                    {activeIndex === idx && (
                                        <motion.div
                                            layoutId="floorBg"
                                            className="absolute inset-0 bg-white z-0"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <span className="relative z-10 text-condensed text-base lg:text-2xl ">
                                        {f.id}
                                    </span>
                                    <span className="relative z-10 text-[9px] font-black uppercase tracking-tight text-right flex-1 ml-4 hidden lg:block">
                                        {f.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-3/4">
                            <div className="relative h-[480px] md:h-[600px]">
                                {floors.map((f, idx) => (
                                    <motion.div
                                        key={f.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{
                                            opacity:
                                                activeIndex === idx ? 1 : 0,
                                            x: activeIndex === idx ? 0 : 50,
                                            pointerEvents:
                                                activeIndex === idx
                                                    ? 'auto'
                                                    : 'none',
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'circOut',
                                        }}
                                        className="absolute inset-0 flex flex-col h-full"
                                    >
                                        <div className="aspect-video overflow-hidden rounded-none mb-10 bg-gray-100 shadow-xl">
                                            <motion.img
                                                initial={{ scale: 1.1 }}
                                                animate={{
                                                    scale:
                                                        activeIndex === idx
                                                            ? 1
                                                            : 1.1,
                                                }}
                                                transition={{ duration: 0.8 }}
                                                src={`https://picsum.photos/seed/k2-${f.id.toLowerCase()}/1200/675`}
                                                alt={f.id}
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between gap-10">
                                            <div className="max-w-md">
                                                <motion.h3
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity:
                                                            activeIndex === idx
                                                                ? 1
                                                                : 0,
                                                        y:
                                                            activeIndex === idx
                                                                ? 0
                                                                : 20,
                                                    }}
                                                    className="text-condensed text-3xl md:text-4xl mb-8 font-black uppercase "
                                                >
                                                    {floorData[f.id].title}
                                                </motion.h3>
                                                <button
                                                    onClick={() =>
                                                        router.push(f.path)
                                                    }
                                                    className="bg-[#ed1c24] px-12 py-3.5 text-[9px] font-black uppercase text-white hover:bg-white hover:text-[#ed1c24] transition-all tracking-[0.4em] cursor-pointer"
                                                >
                                                    Explore Details
                                                </button>
                                            </div>
                                            <div className="md:w-1/2 pt-1">
                                                <motion.h4
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity:
                                                            activeIndex === idx
                                                                ? 1
                                                                : 0,
                                                        y:
                                                            activeIndex === idx
                                                                ? 0
                                                                : 10,
                                                    }}
                                                    className="font-black text-xs mb-4 uppercase text-[#ed1c24] tracking-[0.3em]"
                                                >
                                                    {floorData[f.id].subtitle}
                                                </motion.h4>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity:
                                                            activeIndex === idx
                                                                ? 1
                                                                : 0,
                                                    }}
                                                    className="text-white/50 leading-relaxed font-medium text-sm md:text-base max-w-lg"
                                                >
                                                    {floorData[f.id].desc}
                                                </motion.p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
