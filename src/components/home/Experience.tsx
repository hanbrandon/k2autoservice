"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "motion/react";

const floors = [
  { id: "SERVICE", name: "Certified Repair Center" },
  { id: "SALES", name: "Luxury Vehicle Inventory" },
  { id: "USED", name: "Certified Pre-Owned" },
  { id: "DMV", name: "Registration & Title Service" },
  { id: "DETAILING", name: "Professional Detailing" },
  { id: "FLEET", name: "Corporate Fleet Solutions" }
];

const floorData: Record<string, { title: string, subtitle: string, desc: string }> = {
  "SERVICE": {
    title: "PRECISION REPAIR",
    subtitle: "State-of-the-art diagnostic and repair facilities",
    desc: "Our master technicians use manufacturer-specialized tools to ensure your vehicle performs at its peak. From routine oil changes to complex transmission repairs."
  },
  "SALES": {
    title: "NEW ARRIVALS",
    subtitle: "Experience the latest in automotive technology",
    desc: "Browse our premium selection of the newest models. We offer tailored test drive experiences and personalized expert consultations."
  },
  "USED": {
    title: "CERTIFIED PRE-OWNED",
    subtitle: "Quality you can trust, value you can't ignore",
    desc: "Every pre-owned vehicle undergoes a rigorous 150-point inspection. Drive home with confidence knowing your car meets the K2 standard."
  },
  "DMV": {
    title: "DMV EXPRESS",
    subtitle: "Skip the line, save your time",
    desc: "We are authorized to handle registration, title transfers, and plate replacements directly. Experience hassle-free government services."
  },
  "DETAILING": {
    title: "ELITE DETAILING",
    subtitle: "Showroom finish, every single time",
    desc: "Specialized ceramic coating, interior deep cleaning, and paint correction services that restore your vehicle's original luster."
  },
  "FLEET": {
    title: "FLEET MANAGEMENT",
    subtitle: "Scalable solutions for your business",
    desc: "Comprehensive maintenance and acquisition programs for corporate fleets, ensuring your business stays on the move."
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
    <section ref={containerRef} id="experience" className="relative h-[450vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="section-title">THE K2 EXPERIENCE</h2>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Floor List Sidebar */}
            <div className="w-full lg:w-1/4 border-y border-black/10 divide-y divide-black/10">
              {floors.map((f, idx) => (
                <div
                  key={f.id}
                  className={`relative w-full flex justify-between items-center py-6 px-6 transition-all duration-500 overflow-hidden ${activeIndex === idx ? "text-white" : "text-black/40 hover:text-black"}`}
                >
                  {/* Background Fill for Active State */}
                  {activeIndex === idx && (
                    <motion.div 
                      layoutId="floorBg"
                      className="absolute inset-0 bg-black z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 text-condensed text-3xl tracking-tighter">{f.id}</span>
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-tight text-right flex-1 ml-4">{f.name}</span>
                </div>
              ))}
            </div>

            {/* Experience Content */}
            <div className="w-full lg:w-3/4">
              <div className="relative h-[600px]">
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
                          className="text-condensed text-6xl mb-8 italic font-black uppercase tracking-tighter"
                        >
                          {floorData[f.id].title}
                        </motion.h3>
                        <button className="bg-[#ed1c24] px-14 py-4 text-xs font-black uppercase text-white hover:bg-black transition-all tracking-[0.3em]">
                          Learn More
                        </button>
                      </div>
                      <div className="md:w-1/2">
                        <motion.h4 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: activeIndex === idx ? 1 : 0, y: activeIndex === idx ? 0 : 10 }}
                          className="font-black text-xl mb-6 italic uppercase text-[#ed1c24] tracking-wider"
                        >
                          {floorData[f.id].subtitle}
                        </motion.h4>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: activeIndex === idx ? 1 : 0 }}
                          className="text-black/60 leading-relaxed font-medium text-lg"
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
