"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
  
  // Track vertical scroll to drive horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate horizontal translation
  // We want to move from 0% to -X% where X is the width of the carousel minus screen width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={containerRef} id="testimonials" className="relative h-[400vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="px-10 mb-20">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#ed1c24] text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic block"
              >
                Trust Certified
              </motion.span>
              <h2 className="text-condensed text-5xl md:text-[5vw] font-black italic tracking-tighter leading-none text-white uppercase">
                Voices of<br />Experience
              </h2>
            </div>
            <div className="hidden md:block">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest max-w-[180px] leading-relaxed">
                Scroll to explore our client testimonials and success stories
              </p>
            </div>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-10 mb-20">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={rev.name}
              className="min-w-[400px] md:min-w-[500px] bg-[#111] p-10 flex flex-col justify-between group hover:bg-[#161616] transition-colors h-[420px] border border-white/5 shadow-2xl"
            >
              <div>
                <div className="h-0.5 w-8 bg-[#ed1c24] mb-10" />
                <p className="text-lg md:text-xl font-light italic leading-relaxed tracking-tight text-white/80 group-hover:text-white transition-colors">
                  "{rev.quote}"
                </p>
              </div>
              
              <div className="mt-8">
                <div className="flex gap-1.5 mb-5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-[#ed1c24] rounded-full" />
                  ))}
                </div>
                <h4 className="text-condensed text-2xl font-black italic tracking-tighter text-white uppercase">{rev.name}</h4>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mt-2 italic">{rev.role}</p>
              </div>
            </motion.div>
          ))}
          
          {/* Ending spacing card */}
          <div className="min-w-[10vw]" />
        </motion.div>
        
        {/* Scroll Progress Indicator Bar */}
        <div className="absolute bottom-6 left-10 right-10 flex items-center gap-4">
          <span className="text-[10px] text-white/20 font-black">01</span>
          <div className="h-px flex-1 bg-white/10 relative overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-[#ed1c24]" 
            />
          </div>
          <span className="text-[10px] text-white/20 font-black">0{reviews.length}</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
