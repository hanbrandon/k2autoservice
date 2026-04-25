'use client';

import { useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useMotionValueEvent,
    useSpring,
} from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
    {
        name: 'MICHAEL CHEN',
        role: 'CLASSIC COLLECTOR',
        quote: 'The attention to detail in their certification process is unmatched. I recently acquired a rare vintage piece through K2, and the experience was seamless from acquisition to DMV handling.',
        rating: 5,
    },
    {
        name: 'SARA J. WILLIAMS',
        role: 'BUSINESS EXECUTIVE',
        quote: "K2's repair center is the only place I trust with my family's fleet. Their diagnostic speed and technical honesty are refreshing in the automotive world.",
        rating: 5,
    },
    {
        name: 'DAVID RODRIGUEZ',
        role: 'ENTREPRENEUR',
        quote: 'Fast, professional, and efficient. Their DMV services saved me hours of paperwork. They truly are a one-stop-shop for everything automotive in LA.',
        rating: 5,
    },
    {
        name: 'EMMA SULLIVAN',
        role: 'TECH FOUNDER',
        quote: 'The concierge service at K2 is world-class. They managed my entire vehicle upgrade cycle without me ever having to visit a dealership. Truly white-glove.',
        rating: 5,
    },
    {
        name: 'JAMESON PARK',
        role: 'AUTO ENTHUSIAST',
        quote: "The detailing team worked magic on my ceramic coating. It's been six months and the water still beads like day one. Highly recommend their maintenance program.",
        rating: 5,
    },
];

const Testimonials = () => {
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
        const segment = 1 / reviews.length;
        const index = Math.min(
            Math.floor(latest / segment),
            reviews.length - 1,
        );
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const goToIndex = (index: number) => {
        if (!containerRef.current) return;
        const totalHeight = containerRef.current.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = totalHeight - viewportHeight;
        const scrollPos = (index / (reviews.length - 1)) * scrollableHeight;

        window.scrollTo({
            top: containerRef.current.offsetTop + scrollPos,
            behavior: 'smooth',
        });
    };

    return (
        <section
            ref={containerRef}
            id="testimonials"
            className="relative h-[400vh] bg-white"
        >
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-10 w-full">
                    {/* Header Section */}
                    <div className="mb-20">
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[#ed1c24] text-[9px] font-black tracking-[0.5em] uppercase mb-5 block"
                        >
                            Trust Certified
                        </motion.span>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h2 className="text-condensed text-4xl md:text-5xl font-black tracking-tighter leading-none text-black uppercase">
                                    Voices of
                                    <br />
                                    Experience
                                </h2>
                                <p className="text-black/20 text-[9px] font-black uppercase tracking-[0.3em] max-w-[150px] leading-relaxed mt-4">
                                    Explore our client success stories
                                </p>
                            </div>

                            {/* Desktop Navigation Arrows */}
                            <div className="hidden md:flex gap-4">
                                <button
                                    onClick={() =>
                                        goToIndex(Math.max(0, activeIndex - 1))
                                    }
                                    className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center hover:bg-[#ed1c24] hover:border-[#ed1c24] transition-all group"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft
                                        size={24}
                                        className="text-black group-hover:text-white group-hover:scale-110 transition-all"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        goToIndex(
                                            Math.min(
                                                reviews.length - 1,
                                                activeIndex + 1,
                                            ),
                                        )
                                    }
                                    className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center hover:bg-[#ed1c24] hover:border-[#ed1c24] transition-all group"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight
                                        size={24}
                                        className="text-black group-hover:text-white group-hover:scale-110 transition-all"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[450px] md:h-[500px] flex items-center justify-center">
                        {reviews.map((rev, idx) => {
                            const diff = idx - activeIndex;

                            // Only render the active, previous, and next cards for performance
                            const isVisible = Math.abs(diff) <= 1;

                            return (
                                <motion.div
                                    key={rev.name}
                                    initial={false}
                                    animate={{
                                        opacity: isVisible
                                            ? diff === 0
                                                ? 1
                                                : 0.3
                                            : 0,
                                        scale: isVisible
                                            ? diff === 0
                                                ? 1
                                                : 0.85
                                            : 0.7,
                                        x: isVisible
                                            ? `${diff * 110}%`
                                            : diff > 0
                                              ? '200%'
                                              : '-200%',
                                        rotateY: isVisible ? diff * -20 : 0,
                                        z: isVisible
                                            ? diff === 0
                                                ? 0
                                                : -100
                                            : -200,
                                        pointerEvents:
                                            diff === 0 ? 'auto' : 'none',
                                        zIndex: isVisible
                                            ? diff === 0
                                                ? 30
                                                : 20
                                            : 0,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for smooth motion
                                    }}
                                    className="absolute inset-0 max-w-2xl mx-auto bg-[#0a0a0a] p-8 md:p-16 flex flex-col justify-between group border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform-gpu"
                                    style={{
                                        perspective: '1000px',
                                    }}
                                >
                                    <div className="relative">
                                        <Quote
                                            className="absolute -top-10 -left-6 text-white/5"
                                            size={60}
                                        />
                                        <div className="h-0.5 w-8 bg-[#ed1c24] mb-8" />
                                        <p className="text-lg md:text-2xl font-light italic leading-relaxed tracking-tight text-white/80 group-hover:text-white transition-colors relative z-10">
                                            "{rev.quote}"
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                        <div>
                                            <div className="flex gap-2 mb-4">
                                                {[...Array(rev.rating)].map(
                                                    (_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-1.5 h-1.5 bg-[#ed1c24] rounded-full"
                                                        />
                                                    ),
                                                )}
                                            </div>
                                            <h4 className="text-condensed text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
                                                {rev.name}
                                            </h4>
                                            <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em] mt-2">
                                                {rev.role}
                                            </p>
                                        </div>
                                        <div className="text-white/5 font-black text-5xl select-none">
                                            0{idx + 1}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Indicators Container */}
                    <div className="flex justify-center items-center gap-3 mt-16">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToIndex(i)}
                                className="group p-2"
                            >
                                <motion.div
                                    className="h-1 rounded-full"
                                    animate={{
                                        width: activeIndex === i ? 40 : 8,
                                        backgroundColor:
                                            activeIndex === i
                                                ? '#ed1c24'
                                                : 'rgba(0,0,0,0.1)',
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
