"use client";

import { ArrowUpRight, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20 border-b border-white/5 pb-20">
          <div className="flex flex-col gap-8">
            <h2 className="text-condensed text-4xl font-black italic text-[#ed1c24]">K2 AUTO GROUP</h2>
            <div className="flex flex-wrap gap-8 text-[12px] font-bold text-white/60">
              <a href="#" className="hover:text-[#ed1c24] transition-colors">INVENTORY</a>
              <a href="#" className="hover:text-[#ed1c24] transition-colors">SERVICES</a>
              <a href="#" className="hover:text-[#ed1c24] transition-colors">DMV SERVICES</a>
              <a href="#" className="hover:text-[#ed1c24] transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-[#ed1c24] transition-colors">TERMS OF USE</a>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="border border-white/20 px-8 py-3 text-[11px] font-bold flex items-center gap-4 hover:bg-[#ed1c24] hover:border-[#ed1c24] transition-all"
          >
            BACK TO TOP <ArrowUpRight size={14} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
           <div className="text-[11px] text-white/40 leading-relaxed font-medium uppercase tracking-widest space-y-2">
             <p>123 Automotive Way, Los Angeles, CA 90001, United States</p>
             <p>COPYRIGHT K2 AUTO GROUP. ALL RIGHTS RESERVED.</p>
           </div>
           <div className="flex gap-6">
             <Instagram size={24} className="cursor-pointer hover:text-[#ed1c24] transition-colors" />
             <Youtube size={24} className="cursor-pointer hover:text-[#ed1c24] transition-colors" />
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
