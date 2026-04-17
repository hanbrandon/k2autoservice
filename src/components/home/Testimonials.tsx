"use client";

import { motion } from "motion/react";

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
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 px-10 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-[#ed1c24] text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic">Trust Certified</span>
          <h2 className="text-condensed text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-4">VOICES OF<br />EXPERIENCE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-12 flex flex-col justify-between group hover:bg-[#111] transition-colors h-[500px]"
            >
              <div>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  className="h-1 bg-[#ed1c24] mb-10" 
                />
                <p className="text-2xl font-light italic leading-relaxed tracking-tight text-white/80 group-hover:text-white transition-colors">
                  "{rev.quote}"
                </p>
              </div>
              
              <div className="mt-12">
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#ed1c24] rounded-full" />
                  ))}
                </div>
                <h4 className="text-condensed text-3xl font-black italic tracking-tighter">{rev.name}</h4>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
