"use client";

import { Navigation, ArrowRight, MapPin, ArrowUpRight } from "lucide-react";

const Location = () => {
  return (
    <section id="location" className="py-32 px-10">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="section-title">VISIT K2 GROUP</h2>
        
        <div className="relative border border-black/5 overflow-hidden">
          {/* Find Fast Path Sidebar overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-black text-white z-20 p-10 flex flex-col hidden lg:flex">
             <h3 className="text-condensed text-4xl mb-10">LOCATE<br />US</h3>
             <div className="space-y-6 flex-1">
                <div className="border-b border-white/20 pb-2 flex justify-between items-center">
                  <span className="text-xs uppercase opacity-50">Enter Your Location</span>
                  <Navigation size={16} />
                </div>
                <div className="border-b border-white/20 pb-2 flex justify-between items-center text-[#ed1c24]">
                  <span className="text-xs uppercase font-bold">K2 Auto Center</span>
                  <ArrowRight size={16} />
                </div>
             </div>
             <div className="flex justify-between items-center opacity-40">
                <MapPin size={20} />
                <ArrowUpRight size={20} />
             </div>
          </div>

          {/* Map Content */}
          <div className="bg-[#f0f0f0] h-[600px] relative overflow-hidden">
            <img 
               src="https://picsum.photos/seed/map-location/1600/600" 
               className="w-full h-full object-cover opacity-30 grayscale"
               referrerPolicy="no-referrer"
               alt="Map"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative">
                  <div className="w-12 h-12 bg-[#ed1c24] rounded-full animate-ping absolute -inset-0" />
                  <div className="w-12 h-12 bg-[#ed1c24] rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
                      <MapPin size={24} className="text-white" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
