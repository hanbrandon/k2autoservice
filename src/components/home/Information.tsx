'use client';

import { motion } from 'motion/react';
import { Clock, ArrowRight, MapPin } from 'lucide-react';

const items = [
    {
        title: 'SERVICE HOURS',
        desc: 'Maintenance & Repairs',
        details: [
            'Mon ~ Fri: 08:00 AM - 06:00 PM',
            'Sat: 08:00 AM - 02:00 PM',
            'Sun: Closed',
        ],
        icon: (
            <Clock
                size={32}
                className="text-black/20 group-hover:text-[#ed1c24] transition-colors"
            />
        ),
    },
    {
        title: 'SALES CENTER',
        desc: 'Showroom Hours',
        details: [
            'Mon ~ Fri: 08:00 AM - 06:00 PM',
            'Sat: 08:00 AM - 02:00 PM',
            'Sun: Closed',
        ],
        icon: (
            <ArrowRight
                size={32}
                className="text-black/20 group-hover:text-[#ed1c24] transition-colors"
            />
        ),
    },
    {
        title: 'DMV SERVICES',
        desc: 'Express Processing',
        details: [
            'Mon ~ Fri: 08:00 AM - 06:00 PM',
            'Sat: 08:00 AM - 02:00 PM',
            'Sun: Closed',
        ],
        icon: (
            <MapPin
                size={32}
                className="text-black/20 group-hover:text-[#ed1c24] transition-colors"
            />
        ),
    },
];

const Information = () => {
    return (
        <section id="information" className="py-32 px-10 bg-[#fefefe]">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="section-title">Operational Excellence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group border-t border-black/10 pt-10"
                        >
                            <h3 className="text-condensed text-2xl md:text-3xl mb-6 font-black uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <div className="space-y-4 mb-10 min-h-[140px]">
                                <p className="font-black text-[10px] text-[#ed1c24] tracking-[0.3em] uppercase">
                                    {item.desc}
                                </p>
                                {item.details.map((d, i) => (
                                    <p
                                        key={i}
                                        className="text-xs md:text-sm text-black/50 leading-relaxed font-medium tracking-tight"
                                    >
                                        {d}
                                    </p>
                                ))}
                            </div>
                            <div className="flex justify-end pr-4 transition-all duration-500 group-hover:translate-x-2">
                                {item.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Information;
