'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

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
    return (
        <section
            id="testimonials"
            className="py-20 md:py-32 px-10 bg-white text-black overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="mb-12 md:mb-20 text-center md:text-left">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#ed1c24] text-[9px] font-black tracking-[0.5em] uppercase mb-4 md:mb-5 block text-center md:text-left"
                    >
                        Trust Certified
                    </motion.span>
                    <h2 className="text-condensed text-4xl md:text-5xl font-black  leading-none text-black uppercase">
                        Voices of
                        <br />
                        Experience
                    </h2>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory">
                    {reviews.map((rev, idx) => (
                        <motion.div
                            key={rev.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="min-w-[300px] md:min-w-[450px] bg-black p-8 md:p-12 flex flex-col justify-between group shadow-xl snap-center"
                        >
                            <div className="relative">
                                <Quote
                                    className="absolute -top-6 -left-4 text-white/5"
                                    size={40}
                                />
                                <div className="h-0.5 w-6 bg-[#ed1c24] mb-6" />
                                <p className="text-base md:text-xl font-light italic leading-relaxed text-white/80 group-hover:text-white transition-colors relative z-10">
                                    "{rev.quote}"
                                </p>
                            </div>

                            <div className="mt-10 flex justify-between items-end">
                                <div>
                                    <div className="flex gap-1.5 mb-3">
                                        {[...Array(rev.rating)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-1 h-1 bg-[#ed1c24] rounded-full"
                                            />
                                        ))}
                                    </div>
                                    <h4 className="text-condensed text-lg md:text-xl font-black  text-white uppercase">
                                        {rev.name}
                                    </h4>
                                    <p className="text-[7px] font-bold text-white/30 uppercase tracking-[0.4em] mt-1">
                                        {rev.role}
                                    </p>
                                </div>
                                <div className="text-white/5 font-black text-4xl select-none">
                                    0{idx + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
