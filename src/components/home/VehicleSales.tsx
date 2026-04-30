'use client';

import { motion } from 'motion/react';

const cars = [
    {
        name: '2024 MODEL X',
        price: 'FROM $89,000',
        img: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d822?auto=format&fit=crop&q=80&w=800',
    },
    {
        name: 'CERTIFIED G-WAGON',
        price: 'INQUIRE FOR PRICE',
        img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800',
    },
    {
        name: '2023 GT-R NISMO',
        price: '$210,000',
        img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    },
];

const VehicleSales = () => {
    return (
        <section
            id="sales"
            className="py-20 md:py-32 px-10 bg-black text-white"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <div>
                        <h2 className="text-condensed text-4xl md:text-5xl font-black italic  mb-4 uppercase">
                            Vehicle Sales
                        </h2>
                        <p className="text-white/60 uppercase tracking-[0.4em] font-black text-[9px]">
                            Quality Selection / New & Used Vehicles
                        </p>
                    </div>
                    <button
                        onClick={() => (window.location.href = '/sales')}
                        className="border border-white/10 px-12 py-4 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all cursor-pointer"
                    >
                        View Selection
                    </button>
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-0 border-t border-white/10 scrollbar-hide snap-x snap-mandatory">
                    {cars.map((car, idx) => (
                        <motion.div
                            key={car.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative min-w-[85vw] md:min-w-0 h-[500px] md:h-[600px] border-r border-white/5 overflow-hidden snap-center"
                        >
                            <img
                                src={car.img}
                                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                alt={car.name}
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                                <span className="text-[#ed1c24] font-black text-[9px] tracking-[0.4em] mb-4 italic uppercase">
                                    Available Now
                                </span>
                                <h3 className="text-condensed text-2xl md:text-4xl font-black mb-2 uppercase italic tracking-tight">
                                    {car.name}
                                </h3>
                                <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest">
                                    {car.price}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    <div className="min-w-[10vw] md:hidden" />
                </div>
            </div>
        </section>
    );
};

export default VehicleSales;
