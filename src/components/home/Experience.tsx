"use client";

import { useState } from "react";
import { motion } from "motion/react";

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
  const [activeFloor, setActiveFloor] = useState("SERVICE");

  return (
    <section id="experience" className="py-32 px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="section-title">THE K2 EXPERIENCE</h2>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Floor List Sidebar */}
          <div className="w-full lg:w-1/4 border-y border-black/10 divide-y divide-black/10">
            {floors.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFloor(f.id)}
                className={`w-full flex justify-between items-center py-4 px-6 transition-all ${activeFloor === f.id ? "bg-black text-white" : "hover:bg-gray-50"}`}
              >
                <span className="text-condensed text-2xl tracking-tighter">{f.id}</span>
                <span className="text-[11px] font-black uppercase tracking-tight text-right flex-1 ml-4">{f.name}</span>
              </button>
            ))}
          </div>

          {/* Experience Content */}
          <div className="w-full lg:w-3/4">
            <motion.div 
              key={activeFloor}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="aspect-video overflow-hidden rounded-none mb-10">
                <img 
                   src={`https://picsum.photos/seed/k2-${activeFloor.toLowerCase()}/1200/675`} 
                   alt={activeFloor} 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="max-w-md">
                   <h3 className="text-condensed text-6xl mb-6 italic">{floorData[activeFloor].title}</h3>
                   <button className="bg-[#ed1c24] px-10 py-3 text-sm font-bold uppercase text-white hover:bg-black transition-all tracking-widest">
                     Learn More
                   </button>
                </div>
                <div className="md:w-1/2">
                   <h4 className="font-black text-xl mb-4 italic uppercase text-[#ed1c24]">{floorData[activeFloor].subtitle}</h4>
                   <p className="text-black/60 leading-relaxed font-medium">
                     {floorData[activeFloor].desc}
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
