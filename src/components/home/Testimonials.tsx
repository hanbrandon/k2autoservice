"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

const reviews = [
  {
    name: "MICHAEL CHEN",
    role: "CLASSIC COLLECTOR",
    quote: "The attention to detail in their certification process is unmatched. I recently acquired a rare vintage piece through K2, and the experience was seamless from acquisition to DMV handling.",
    rating: 5
  },
  {
    name: "SARA J. WILLIAMS",
    role: "BUSINESS EXECUTIVE",
    quote: "K2's repair center is the only place I trust with my family's fleet. Their diagnostic speed and technical honesty are refreshing in the automotive world.",
    rating: 5
  },
  {
    name: "DAVID RODRIGUEZ",
    role: "ENTREPRENEUR",
    quote: "Fast, professional, and efficient. Their DMV services saved me hours of paperwork. They truly are a one-stop-shop for everything automotive in LA.",
    rating: 5
  },
  {
    name: "EMMA SULLIVAN",
    role: "TECH FOUNDER",
    quote: "The concierge service at K2 is world-class. They managed my entire vehicle upgrade cycle without me ever having to visit a dealership. Truly white-glove.",
    rating: 5
  },
  {
    name: "JAMESON PARK",
    role: "AUTO ENTHUSIAST",
    quote: "The detailing team worked magic on my ceramic coating. It's been six months and the water still beads like day one. Highly recommend their maintenance program.",
    rating: 5
  }
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Driven by vertical scroll on desktop
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segment = 1 / reviews.length;
    const index = Math.min(Math.floor(latest / segment), reviews.length - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} id="testimonials" className="relative h-[400vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        {/* Header Section */}
        <div className="px-10 mb-16 md:mb-20">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#ed1c24] text-[9px] font-black tracking-[0.5em] uppercase mb-5 italic block"
              >
                Trust Certified
              </motion.span>
              <h2 className="text-condensed text-4xl md:text-5xl font-black italic tracking-tighter leading-none text-white uppercase">
                Voices of<br />Experience
              </h2>
            </div>
            <div className="hidden md:block">
              <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] max-w-[150px] leading-relaxed">
                Scroll horizontally to explore our client success stories
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Container - Horizontal Scroll on Mobile (Peek-ahead) */}
        <div className="overflow-x-auto md:overflow-hidden scrollbar-hide snap-x snap-mandatory">
          <motion.div 
            style={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? x : 0 }} 
            className="flex gap-6 md:gap-8 px-10 mb-16 md:mb-20"
          >
            {reviews.map((rev, idx) => (
              <motion.div 
                key={rev.name}
                className="min-w-[85vw] md:min-w-[500px] bg-white/[0.03] backdrop-blur-xl p-10 md:p-12 flex flex-col justify-between group transition-all duration-500 h-[380px] md:h-[420px] border border-white/5 shadow-2xl snap-center"
              >
                <div>
                  <div className="h-0.5 w-6 bg-[#ed1c24] mb-8" />
                  <p className="text-base md:text-lg font-light italic leading-relaxed tracking-tight text-white/70 group-hover:text-white transition-colors">
                    "{rev.quote}"
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="flex gap-1.5 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-[#ed1c24] rounded-full" />
                    ))}
                  </div>
                  <h4 className="text-condensed text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase">{rev.name}</h4>
                  <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2 italic">{rev.role}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Ending spacing for horizontal scroll */}
            <div className="min-w-[10vw] md:hidden" />
          </motion.div>
        </div>
        
        {/* Custom Animated Indicators (Airbnb style) */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-3">
          {reviews.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-white/10"
              initial={false}
              animate={{ 
                width: activeIndex === i ? 24 : 6,
                backgroundColor: activeIndex === i ? "#ed1c24" : "rgba(255,255,255,0.1)" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
