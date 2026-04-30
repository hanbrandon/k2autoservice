'use client';

import { motion } from 'motion/react';

const RepairServices = () => {
    return (
        <section
            id="repair"
            className="py-20 md:py-32 px-10 bg-[#0a0a0a] text-white overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-[#ed1c24] text-[9px] font-black tracking-[0.5em] mb-8 block uppercase italic"
                    >
                        Expert Auto Service
                    </motion.span>
                    <h2 className="text-condensed text-4xl md:text-5xl font-black italic  mb-10 leading-[0.9] uppercase">
                        Full Service
                        <br />
                        Repair Center
                    </h2>
                    <p className="text-white/70 text-sm md:text-base mb-12 font-medium leading-relaxed max-w-xl tracking-tight">
                        Our facility is equipped with factory-specific
                        diagnostic tools and staffed by technicians trained
                        directly by major manufacturers. We maintain the
                        integrity of your high-performance vehicle using only
                        genuine parts and precision procedures.
                    </p>
                    <ul className="space-y-6 mb-14">
                        {[
                            'ADVANCED ELECTRONIC DIAGNOSTICS',
                            'PERFORMANCE TUNING & SUSPENSION',
                            'CERTIFIED COLLISION REPAIR',
                        ].map((item, idx) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-5 text-[10px] font-black tracking-[0.3em] uppercase text-white/80"
                            >
                                <div className="w-1.5 h-1.5 bg-[#ed1c24] rounded-full" />{' '}
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                    <button
                        onClick={() => (window.location.href = '/repair')}
                        className="bg-white text-black px-12 py-5 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#ed1c24] hover:text-white transition-all shadow-xl cursor-pointer"
                    >
                        Schedule Repair
                    </button>
                </div>
                <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 opacity-80"
                        alt="Service Center"
                        referrerPolicy="no-referrer"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-10 -left-10 bg-white p-10 text-black hidden md:block border border-white/5"
                    >
                        <p className="text-condensed text-4xl font-black italic  uppercase">
                            10,000+
                        </p>
                        <p className="text-[8px] font-black opacity-60 uppercase tracking-[0.4em] mt-3">
                            Vehicles Serviced Since 2024
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RepairServices;
