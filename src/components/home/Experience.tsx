"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "motion/react";

const floors = [
  { id: "NEW", name: "New Car Purchase & Lease" },
  { id: "USED", name: "Certified Pre-Owned" },
  { id: "RENTAL", name: "Short & Long-term Rental" },
  { id: "DMV", name: "DMV & Registration" },
  { id: "REPAIR", name: "Professional Repair" }
];

const floorData: Record<string, { title: string, subtitle: string, desc: string }> = {
  "NEW": {
    title: "NEW CAR ACQUISITION",
    subtitle: "Purchase & Leasing Solutions",
    desc: "Experience a seamless process for acquiring the latest models. K2 Auto Group provides competitive leasing and purchase options tailored to your professional and personal needs."
  },
  "USED": {
    title: "PREMIUM PRE-OWNED",
    subtitle: "Certified Quality Inventory",
    desc: "Every vehicle in our pre-owned collection is meticulously inspected and certified. Drive with confidence knowing your car meets our rigorous standards of excellence."
  },
  "RENTAL": {
    title: "FLEXIBLE RENTAL",
    subtitle: "Short & Long-term Solutions",
    desc: "From premium sedans to luxury SUVs, our diverse fleet offers flexible rental options. Whether for a weekend or a month, we provide mobility with zero compromise."
  },
  "DMV": {
    title: "EXPRESS REGISTRATION",
    subtitle: "DMV & Title Services",
    desc: "Save your most valuable asset: time. We handle all DMV-related administrative tasks, including title transfers, renewals, and plate replacements with professional speed."
  },
  "REPAIR": {
    title: "CERTIFIED SERVICE",
    subtitle: "Expert Vehicle Maintenance",
    desc: "Our state-of-the-art facility is equipped with specialized diagnostics and managed by master technicians. We restore your vehicle to factory-fresh standards."
  }
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const segment = 1 / floors.length;
    const index = Math.min(
      Math.floor(latest / segment),
      floors.length - 1
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} id="experience" className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="section-title">THE K2 EXPERIENCE</h2>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Floor List Sidebar - Horizontal Scroll on Mobile */}
            <div className="w-full lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide border-y border-black/5 divide-x lg:divide-x-0 lg:divide-y divide-black/5 snap-x snap-mandatory">
              {floors.map((f, idx) => (
                <div
                  key={f.id}
                  className={`relative min-w-[200px] lg:min-w-0 w-full flex justify-between items-center py-5 px-6 transition-all duration-500 overflow-hidden snap-center ${activeIndex === idx ? "text-white" : "text-black/30 hover:text-black"}`}
                >
                  {/* Background Fill for Active State */}
                  {activeIndex === idx && (
                    <motion.div 
                      layoutId="floorBg"
                      className="absolute inset-0 bg-black z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 text-condensed text-2xl tracking-tighter">{f.id}</span>
                  <span className="relative z-10 text-[9px] font-black uppercase tracking-tight text-right flex-1 ml-4">{f.name}</span>
                </div>
              ))}
            </div>

            {/* Experience Content */}
            <div className="w-full lg:w-3/4">
              <div className="relative h-[550px] md:h-[600px]">
                {floors.map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: activeIndex === idx ? 1 : 0,
                      x: activeIndex === idx ? 0 : 50,
                      pointerEvents: activeIndex === idx ? "auto" : "none"
                    }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute inset-0 flex flex-col h-full"
                  >
                    <div className="aspect-video overflow-hidden rounded-none mb-10 bg-gray-100 shadow-xl">
                      <motion.img 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: activeIndex === idx ? 1 : 1.1 }}
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
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: activeIndex === idx ? 1 : 0, y: activeIndex === idx ? 0 : 20 }}
                          className="text-condensed text-3xl md:text-4xl mb-8 italic font-black uppercase tracking-tighter"
                        >
                          {floorData[f.id].title}
                        </motion.h3>
                        <button className="bg-[#ed1c24] px-12 py-3.5 text-[9px] font-black uppercase text-white hover:bg-black transition-all tracking-[0.4em]">
                          Explore Details
                        </button>
                      </div>
                      <div className="md:w-1/2 pt-1">
                        <motion.h4 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: activeIndex === idx ? 1 : 0, y: activeIndex === idx ? 0 : 10 }}
                          className="font-black text-xs mb-4 italic uppercase text-[#ed1c24] tracking-[0.3em]"
                        >
                          {floorData[f.id].subtitle}
                        </motion.h4>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: activeIndex === idx ? 1 : 0 }}
                          className="text-black/50 leading-relaxed font-medium text-sm md:text-base max-w-lg"
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
