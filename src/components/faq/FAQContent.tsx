"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const categories = ["ALL", "VEHICLE SALES", "REPAIR & SERVICE", "DMV SERVICES", "WARRANTY"];

const faqData = [
  {
    cat: "REPAIR & SERVICE",
    q: "How do I schedule a repair service?",
    a: "You can schedule a service through our online booking system on the 'Repair Services' page or call us directly at (555) 123-4567. We offer same-day appointments for urgent repairs."
  },
  {
    cat: "DMV SERVICES",
    q: "What types of DMV services do you handle?",
    a: "We provide comprehensive assistance for registration renewals, title transfers, out-of-state vehicle registration, and personalized plate orders. We handle the paperwork so you don't have to wait in line."
  },
  {
    cat: "VEHICLE SALES",
    q: "Do you offer financing for used car purchases?",
    a: "Yes, we work with a network of trusted lenders to provide competitive financing options for our inventory. You can get pre-approved through our website in minutes."
  },
  {
    cat: "WARRANTY",
    q: "What is your certified pre-owned warranty?",
    a: "All K2 Certified vehicles undergo a 150-point inspection and come with a 12-month/12,000-mile limited powertrain warranty for your peace of mind."
  },
  {
     cat: "REPAIR & SERVICE",
     q: "Is there a diagnostic fee for vehicle repairs?",
     a: "We offer a complimentary basic inspection. For complex electrical or mechanical diagnostics, a standard fee applies which is credited toward the repair if you choose to proceed with us."
  },
  {
     cat: "DMV SERVICES",
     q: "What documents do I need for a DMV title transfer?",
     a: "Generally, you need the original title, a signed bill of sale, and proof of active insurance. Our DMV specialists can review your documents beforehand to ensure a smooth process."
  }
];

const FAQContent = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = activeCategory === "ALL" 
    ? faqData 
    : faqData.filter(f => f.cat === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-40 pb-32 bg-white min-h-screen font-sans"
    >
      <div className="max-w-5xl mx-auto px-10">
        <h1 className="section-title">FREQUENTLY ASKED QUESTIONS</h1>
        
        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 border border-black/10 text-center text-[10px] font-bold tracking-widest mt-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedIndex(null);
              }}
              className={`py-6 border-r border-b md:border-b-0 border-black/10 transition-all uppercase italic ${activeCategory === cat ? "bg-black text-white" : "hover:bg-gray-50 text-black/50"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="border-t-2 border-black mt-20">
          {filteredFaqs.map((item, idx) => (
            <div key={idx} className="border-b border-black/10">
              <button 
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className="w-full py-8 flex items-center justify-between group text-left px-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-10">
                  <span className="text-xl font-bold italic w-6">Q.</span>
                  <span className="text-lg font-medium text-black/90 tracking-tight">{item.q}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                  className="text-black/40"
                >
                  <ChevronDown size={24} strokeWidth={1.5} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-20 pb-10 flex gap-10">
                      <span className="text-xl font-bold italic w-6 text-[#ed1c24]">A.</span>
                      <p className="text-black/60 leading-relaxed font-medium text-lg max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQContent;
