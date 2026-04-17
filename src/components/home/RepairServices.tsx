"use client";

const RepairServices = () => {
  return (
    <section id="repair" className="py-32 px-10 bg-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
           <span className="text-[#ed1c24] text-xs font-black tracking-[0.5em] mb-8 block uppercase">Technological Superiority</span>
           <h2 className="text-condensed text-7xl font-black italic tracking-tighter mb-10 leading-none">CERTIFIED<br />REPAIR CENTER</h2>
           <p className="text-black/60 text-lg mb-12 font-medium leading-relaxed max-w-xl">
             Our facility is equipped with factory-specific diagnostic tools and staffed by technicians 
             trained directly by major manufacturers. We maintain the integrity of your high-performance vehicle 
             using only genuine parts and precision procedures.
           </p>
           <ul className="space-y-6 mb-12">
             {["ADVANCED ELECTRONIC DIAGNOSTICS", "PERFORMANCE TUNING & SUSPENSION", "CERTIFIED COLLISION REPAIR"].map(item => (
               <li key={item} className="flex items-center gap-4 text-xs font-black tracking-widest">
                 <div className="w-2 h-2 bg-[#ed1c24]" /> {item}
               </li>
             ))}
           </ul>
           <button className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#ed1c24] transition-all">
             Book Service Session
           </button>
        </div>
        <div className="relative aspect-square">
           <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover shadow-2xl" 
            alt="Service Center"
            referrerPolicy="no-referrer"
           />
           <div className="absolute -bottom-10 -left-10 bg-black p-12 text-white hidden md:block">
              <p className="text-condensed text-5xl font-black italic">10,000+</p>
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-2">Vehicles Serviced Since 2024</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default RepairServices;
