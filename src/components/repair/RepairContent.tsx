'use client';

import { motion } from 'motion/react';
import {
    Wrench,
    Settings,
    Search,
    ShieldCheck,
    Zap,
    Thermometer,
    PenTool,
    ClipboardList,
    Send,
    Loader2,
    CheckCircle2,
    Clock,
} from 'lucide-react';
import { useState } from 'react';

const mainServices = [
    {
        title: 'Collision Repair',
        desc: 'Utilizing advanced frame alignment systems to restore your vehicle to factory safety standards after an accident.',
        icon: <ShieldCheck className="text-[#ed1c24]" />,
    },
    {
        title: 'Expert Paint Service',
        desc: 'Computerized color matching ensures a perfect finish, matching your original factory paint perfectly every time.',
        icon: <PenTool className="text-[#ed1c24]" />,
    },
    {
        title: 'Computer Diagnostics',
        desc: 'Complete electronic check-up of your engine and vehicle systems using the latest manufacturer diagnostic tools.',
        icon: <Search className="text-[#ed1c24]" />,
    },
    {
        title: 'Routine Maintenance',
        desc: 'Keep your warranty valid and your car running smooth with regular oil changes, brake service, and factory tune-ups.',
        icon: <Wrench className="text-[#ed1c24]" />,
    },
];

const technicalDetails = [
    {
        category: 'Chassis & Suspension',
        items: [
            '3D Laser Frame Measuring',
            'Adaptive Suspension Calibration',
            'Dynamic Wheel Alignment',
            'Brake System Hydraulics',
        ],
    },
    {
        category: 'Powertrain & Logic',
        items: [
            'ECU/TCU Software Updates',
            'Hybrid/EV Battery Health Check',
            'Transmission Fluid Analysis',
            'Ignition System Optimization',
        ],
    },
    {
        category: 'Refinement & Finish',
        items: [
            'Aluminum Panel Repair',
            'Carbon Fiber Component Care',
            'Ceramic Clearcoat Application',
            'High-Speed Buffing & Polishing',
        ],
    },
];

const RepairContent = () => {
    const [isSending, setIsSending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const formatPhoneNumber = (value: string) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhoneNumber(e.target.value));
        if (errors.phone) setErrors((prev) => ({ ...prev, phone: false }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const phoneClean = phone.replace(/[^\d]/g, '');
        if (phoneClean.length < 10) {
            setErrors((prev) => ({ ...prev, phone: true }));
            return;
        }
        setIsSending(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSending(false);
        setIsSubmitted(true);
    };

    const labelStyles =
        'text-[9px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-[#ed1c24] transition-colors mb-2 block';
    const inputStyles =
        'w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-white/5 text-white transition-all';

    return (
        <div className="bg-white pt-40 pb-32 px-10">
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-32">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[#ed1c24] text-[10px] font-black tracking-[0.5em] uppercase mb-8 block italic"
                    >
                        Engineering Standard
                    </motion.span>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black italic  leading-[0.9] uppercase mb-16">
                        Expert Auto
                        <br />
                        Repair
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <p className="text-black/60 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
                            K2 Auto Service operates a state-of-the-art facility
                            designed specifically for high-performance and
                            luxury vehicle maintenance. Our technical
                            environment is maintained to surgical standards,
                            ensuring that every repair and diagnostic procedure
                            is executed with absolute precision and zero
                            contamination.
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-center border-b border-black/5 pb-4">
                                <Zap size={18} className="text-[#ed1c24]" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Manufacturer-Certified Technicians
                                </span>
                            </div>
                            <div className="flex gap-4 items-center border-b border-black/5 pb-4">
                                <Thermometer
                                    size={18}
                                    className="text-[#ed1c24]"
                                />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Climate-Controlled Precision Lab
                                </span>
                            </div>
                            <div className="flex gap-4 items-center border-b border-black/5 pb-4">
                                <ClipboardList
                                    size={18}
                                    className="text-[#ed1c24]"
                                />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Comprehensive Warranty Protection
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Core Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 border-t border-black/10 pt-24 mb-40">
                    {mainServices.map((service) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-12 h-12 bg-black flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <h3 className="text-condensed text-3xl font-black italic uppercase ">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-black/40 text-base font-medium leading-relaxed tracking-tight max-w-xl">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Specification Table */}
                <div className="bg-black text-white p-12 md:p-20 mb-40">
                    <h2 className="text-condensed text-4xl font-black italic uppercase  mb-16">
                        Service Protocols
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {technicalDetails.map((tech) => (
                            <div key={tech.category}>
                                <h4 className="text-[#ed1c24] text-[10px] font-black uppercase tracking-[0.3em] mb-8 italic border-b border-[#ed1c24]/30 pb-4">
                                    {tech.category}
                                </h4>
                                <ul className="space-y-4">
                                    {tech.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-4 text-white/40 text-xs font-bold uppercase tracking-widest"
                                        >
                                            <div className="w-1 h-1 bg-[#ed1c24] rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section with Form */}
                <section className="bg-black text-white p-8 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <h2 className="text-condensed text-4xl md:text-5xl font-black italic uppercase  mb-8 leading-none">
                            Schedule Your
                            <br />
                            Repair
                        </h2>
                        <p className="text-white/40 mb-12 text-sm font-medium leading-relaxed">
                            For immediate scheduling or technical consultations,
                            please provide your vehicle details and required
                            service.
                        </p>
                        <div className="space-y-6 opacity-30">
                            <div className="flex items-center gap-4">
                                <Clock size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Mon-Fri: 8AM - 6PM
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Authorized OEM Facility
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white/[0.03] p-8 md:p-12 border border-white/5">
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-10"
                            >
                                <CheckCircle2
                                    size={40}
                                    className="text-[#ed1c24] mb-4"
                                />
                                <h3 className="text-xl font-bold uppercase  italic mb-2">
                                    Request Logged
                                </h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                    A technician will contact you shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-10"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="group relative">
                                        <label className={labelStyles}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className={inputStyles}
                                            placeholder="JOHN DOE"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                    </div>
                                    <div className="group relative">
                                        <label
                                            className={`${labelStyles} ${errors.phone ? 'text-[#ed1c24]' : ''}`}
                                        >
                                            Phone Number{' '}
                                            {errors.phone && (
                                                <span className="ml-2 font-bold tracking-normal italic">
                                                    (10 DIGITS)
                                                </span>
                                            )}
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            className={`${inputStyles} ${errors.phone ? 'text-[#ed1c24]' : ''}`}
                                            placeholder="(000) 000-0000"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="group relative">
                                        <label className={labelStyles}>
                                            Vehicle Model
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className={inputStyles}
                                            placeholder="E.G. 2024 PORSCHE 911"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                    </div>
                                    <div className="group relative">
                                        <label className={labelStyles}>
                                            Service Requirement
                                        </label>
                                        <select
                                            required
                                            className="w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight text-white appearance-none cursor-pointer"
                                        >
                                            <option value="collision">
                                                COLLISION RESTORATION
                                            </option>
                                            <option value="maintenance">
                                                ROUTINE MAINTENANCE
                                            </option>
                                            <option value="diagnostic">
                                                DIAGNOSTIC ANALYSIS
                                            </option>
                                            <option value="tuning">
                                                PERFORMANCE TUNING
                                            </option>
                                        </select>
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                    </div>
                                </div>
                                <div className="group relative">
                                    <label className={labelStyles}>
                                        Additional Details
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-white/5 text-white transition-all resize-none"
                                        placeholder="DESCRIBE YOUR REQUEST..."
                                    ></textarea>
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#ed1c24] hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                                >
                                    {isSending ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        'Request Technical Service'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                <footer className="mt-32 pt-16 border-t border-black/5">
                    <p className="text-black/30 text-[9px] font-black uppercase tracking-[0.4em] leading-loose max-w-4xl">
                        Notice: All service operations are documented and
                        archived for insurance and manufacturer compliance. K2
                        Auto Service strictly adheres to all BAR (Bureau of
                        Automotive Repair) regulations and manufacturer service
                        bulletins.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default RepairContent;
