'use client';

import { motion } from 'motion/react';
import {
    Car,
    ShoppingBag,
    ArrowRight,
    DollarSign,
    Globe,
    Verified,
    TrendingUp,
    Handshake,
    Send,
    Loader2,
    CheckCircle2,
    Clock,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';

const mainCapabilities = [
    {
        title: 'New Car Leasing',
        desc: 'We offer competitive leasing rates and exclusive fleet programs for the latest models, specializing in European and high-performance vehicles.',
        icon: <Car className="text-[#ed1c24]" />,
    },
    {
        title: 'Certified Pre-Owned',
        desc: 'Our hand-picked pre-owned inventory features low-mileage vehicles with clean service histories, all passing our rigorous multi-point inspection.',
        icon: <Verified className="text-[#ed1c24]" />,
    },
    {
        title: 'Auto Financing',
        desc: 'Work with our network of lenders to secure great interest rates and flexible terms that fit your budget and credit needs.',
        icon: <TrendingUp className="text-[#ed1c24]" />,
    },
    {
        title: 'International Buyer Program',
        desc: 'Expert assistance for international professionals and expats, including credit-building advice and vehicle registration support.',
        icon: <Globe className="text-[#ed1c24]" />,
    },
];

const processSteps = [
    {
        step: '01',
        title: 'Consultation',
        desc: 'Analysis of driving patterns, budget, and preference.',
    },
    {
        step: '02',
        title: 'Acquisition',
        desc: 'Global inventory search and physical inspection.',
    },
    {
        step: '03',
        title: 'Negotiation',
        desc: 'Professional representation to secure absolute value.',
    },
    {
        step: '04',
        title: 'Deployment',
        desc: 'Final detailing and direct-to-door delivery.',
    },
];

const SalesContent = () => {
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
        'text-[9px] font-black uppercase tracking-[0.3em] text-white/60 group-focus-within:text-[#ed1c24] transition-colors mb-2 block';
    const inputStyles =
        'w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-white/5 text-white transition-all';

    return (
        <div className="bg-white pt-40 pb-32 px-10">
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-32">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[#ed1c24] text-[10px] font-black tracking-[0.5em] uppercase mb-8 block"
                    >
                        Advisory & Acquisition
                    </motion.span>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black  leading-[0.9] uppercase mb-16">
                        Expert
                        <br />
                        Car Sales
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <p className="text-black/60 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
                            K2 Auto Group functions as a private automotive
                            advisory, moving beyond traditional dealership
                            models. We act exclusively as your representative,
                            ensuring that every vehicle acquisition or lease is
                            a strategic decision aligned with your long-term
                            financial and mobility objectives.
                        </p>
                        <div className="flex flex-col justify-end">
                            <div className="p-8 border border-black/5 bg-black/5 flex gap-8 items-center">
                                <Handshake
                                    size={32}
                                    className="text-[#ed1c24] shrink-0"
                                />
                                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed text-black/40">
                                    Our fiduciary responsibility is to the
                                    client, not the manufacturer. We guarantee
                                    complete transparency in all negotiations.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 border-t border-black/10 pt-24 mb-40">
                    {mainCapabilities.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-12 h-12 bg-black flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-condensed text-3xl font-black uppercase ">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-black/40 text-base font-medium leading-relaxed tracking-tight max-w-xl">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Process Section */}
                <section className="bg-black text-white p-12 md:p-24 overflow-hidden mb-40">
                    <h2 className="text-condensed text-4xl font-black uppercase  mb-20 text-center">
                        Acquisition Lifecycle
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {processSteps.map((step) => (
                            <motion.div
                                key={step.step}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-7xl font-black text-white/5 absolute -top-10 -left-4">
                                    {step.step}
                                </span>
                                <div className="relative z-10 pt-4">
                                    <h3 className="text-[#ed1c24] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section with Form */}
                <section className="bg-black text-white p-8 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <h2 className="text-condensed text-4xl md:text-5xl font-black uppercase  mb-8 leading-none">
                            Find Your
                            <br />
                            Next Car
                        </h2>
                        <p className="text-white/40 mb-12 text-sm font-medium leading-relaxed">
                            Interested in a specific model or strategic leasing?
                            Provide your details to begin the private
                            consultation process.
                        </p>
                        <div className="space-y-6 opacity-30">
                            <div className="flex items-center gap-4">
                                <Clock size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Priority Consultation
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Fiduciary Transparency
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
                                <h3 className="text-xl font-bold uppercase mb-2">
                                    Request Filed
                                </h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                    An advisor will contact you shortly.
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
                                                <span className="ml-2 font-bold tracking-normal">
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
                                            Inquiry Type
                                        </label>
                                        <select
                                            required
                                            className="w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight text-white appearance-none cursor-pointer"
                                        >
                                            <option value="new_lease">
                                                NEW CAR LEASE
                                            </option>
                                            <option value="used_purchase">
                                                CPO PURCHASE
                                            </option>
                                            <option value="expat">
                                                EXPAT PROGRAM
                                            </option>
                                            <option value="financing">
                                                STRATEGIC FINANCING
                                            </option>
                                        </select>
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                    </div>
                                    <div className="group relative">
                                        <label className={labelStyles}>
                                            Target Model / Budget
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className={inputStyles}
                                            placeholder="E.G. 2024 PORSCHE / $100K"
                                        />
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
                                        'Initiate Consultation'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                <footer className="mt-32 pt-16 border-t border-black/5">
                    <p className="text-black/30 text-[9px] font-black uppercase tracking-[0.4em] leading-loose max-w-4xl">
                        K2 Auto Group is a licensed automotive brokerage. All
                        vehicle sales are subject to strict compliance with
                        California DMV regulations and consumer protection laws.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default SalesContent;
