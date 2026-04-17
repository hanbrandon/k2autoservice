"use client";

import { motion } from "motion/react";

const cars = [
  { name: "2024 MODEL X", price: "FROM $89,000", img: "https://images.unsplash.com/photo-1617469767053-d3b508a0d822?auto=format&fit=crop&q=80&w=800" },
  { name: "CERTIFIED G-WAGON", price: "INQUIRE FOR PRICE", img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800" },
  { name: "2023 GT-R NISMO", price: "$210,000", img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800" }
];

const VehicleSales = () => {
  return (
    <section id="sales" className="py-32 px-10 bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div>
            <h2 className="text-condensed text-7xl font-black italic tracking-tighter mb-4">VEHICLE SALES</h2>
            <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-xs">Curated Selection / Luxury & Performance</p>
          </div>
          <button className="border border-white/20 px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Full Inventory
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
          {cars.map((car, idx) => (
            <motion.div 
              key={car.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[600px] border-r border-white/10 overflow-hidden"
            >
              <img src={car.img} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt={car.name} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-[#ed1c24] font-black text-xs tracking-widest mb-2 italic uppercase">Available Now</span>
                <h3 className="text-condensed text-4xl font-black mb-1">{car.name}</h3>
                <p className="text-white/60 font-medium text-sm">{car.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleSales;
