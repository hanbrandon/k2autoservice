"use client";

import { motion } from "motion/react";
import { ShieldCheck, Cpu, Gauge, Award } from "lucide-react";

const standards = [
  {
    title: "Precision Diagnostics",
    desc: "We utilize manufacturer-specific diagnostic systems to ensure 100% accuracy in identifying vehicle anomalies.",
    icon: <Cpu size={24} className="text-[#ed1c24]" />
  },
  {
    title: "OEM Integrity",
    desc: "Every repair is executed using Genuine Original Equipment Manufacturer parts to maintain vehicle safety and value.",
    icon: <ShieldCheck size={24} className="text-[#ed1c24]" />
  },
  {
    title: "Rapid Turnaround",
    desc: "Our workflow is optimized for speed without compromising quality, ensuring you return to the road faster.",
    icon: <Gauge size={24} className="text-[#ed1c24]" />
  },
  {
    title: "Certified Mastery",
    desc: "Our technicians hold direct certifications from major luxury and performance vehicle manufacturers.",
    icon: <Award size={24} className="text-[#ed1c24]" />
  }
];

const K2Standard = () => {
  return (
    <section id="standard" className="py-32 px-10 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#ed1c24] text-[9px] font-black tracking-[0.5em] uppercase mb-6 italic block"
            >
              Excellence Defined
            </motion.span>
            <h2 className="text-condensed text-4xl md:text-5xl font-black italic tracking-tighter leading-[0.9] uppercase">
              The K2<br />Standard
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-black/30 text-[9px] font-black uppercase tracking-[0.3em] leading-relaxed">
              Redefining automotive care through technical precision and absolute transparency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-black/5">
          {standards.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 border-r border-b border-black/5 last:border-r-0 group hover:bg-black hover:text-white transition-all duration-500"
            >
              <div className="mb-10 w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#ed1c24]/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-condensed text-2xl font-black italic uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-black/40 group-hover:text-white/40 text-xs md:text-sm font-medium leading-relaxed tracking-tight">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default K2Standard;
