'use client';

import { motion } from 'motion/react';
import {
    Key,
    Clock,
    Calendar,
    ShieldCheck,
    MapPin,
    Zap,
    UserCheck,
    Send,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const fleetFeatures = [
    {
        title: 'Modern Fleet',
        desc: 'Our inventory is updated regularly to ensure you drive the latest models with the newest safety and entertainment technology.',
        icon: <Calendar className="text-[#ed1c24]" />,
    },
    {
        title: 'Deep Cleaning',
        desc: 'Every vehicle undergoes a professional sanitization and detailing process between each rental for your peace of mind.',
        icon: <Zap className="text-[#ed1c24]" />,
    },
    {
        title: 'Insurance Billing',
        desc: 'We coordinate directly with your insurance company to provide a replacement vehicle while your car is in the shop.',
        icon: <ShieldCheck className="text-[#ed1c24]" />,
    },
    {
        title: 'Concierge Delivery',
        desc: 'Door-to-door delivery and airport pickup services available to make your rental experience effortless.',
        icon: <MapPin className="text-[#ed1c24]" />,
    },
];

const tiers = [
    {
        name: 'Executive Sedan',
        models: 'Full-Size Luxury & Mid-Size Premium',
        detail: 'Ultimate comfort and technology for business travel.',
    },
    {
        name: 'Sport / Coupe',
        models: 'High-Performance & Grand Touring',
        detail: 'Exhilarating dynamics for a premium driving experience.',
    },
    {
        name: 'Luxury SUV',
        models: 'Full-Size AWD & Compact Luxury Utilities',
        detail: 'Versatile luxury for families, groups, and all-weather needs.',
    },
];

const RentalContent = () => {
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
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setPhone(formattedPhoneNumber);
        if (errors.phone) setErrors((prev) => ({ ...prev, phone: false }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
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
                        Mobility Solutions
                    </motion.span>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black  leading-[0.9] uppercase mb-16">
                        Car
                        <br />
                        Rental
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <p className="text-black/60 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
                            K2 Auto Group provides seamless mobility solutions
                            that go beyond traditional car rental. Our fleet is
                            curated to meet the standards of executive travel,
                            high-end temporary replacement, and long-term
                            corporate leasing requirements.
                        </p>
                        <div className="flex gap-10 items-start">
                            <div className="flex flex-col gap-4 p-8 bg-black text-white w-full">
                                <div className="flex items-center gap-4 mb-4">
                                    <UserCheck
                                        size={24}
                                        className="text-[#ed1c24]"
                                    />
                                    <h4 className="text-condensed text-2xl font-black uppercase">
                                        Free Delivery & Pickup
                                    </h4>
                                </div>
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                    Complimentary pick-up and drop-off within 25
                                    miles of our Garden Grove HQ. Personalized
                                    vehicle orientation included.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Fleet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
                    {fleetFeatures.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-10 bg-black/5 border border-black/5 flex flex-col justify-between h-full group hover:bg-black transition-all duration-500"
                        >
                            <div>
                                <div className="mb-10 group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-condensed text-2xl font-black uppercase  mb-4 group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-black/40 group-hover:text-white/40 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Fleet Tiers */}
                <div className="border-t border-black/10 pt-24 mb-40">
                    <h2 className="text-condensed text-4xl font-black uppercase  mb-16">
                        Fleet Standard
                    </h2>
                    <div className="space-y-4">
                        {tiers.map((tier) => (
                            <div
                                key={tier.name}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-black/5 hover:bg-black/5 px-8 transition-colors"
                            >
                                <div className="md:col-span-3">
                                    <h4 className="text-[#ed1c24] text-[10px] font-black uppercase tracking-[0.3em]">
                                        {tier.name}
                                    </h4>
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-xl font-bold  uppercase">
                                        {tier.models}
                                    </p>
                                </div>
                                <div className="md:col-span-4 text-right">
                                    <p className="text-black/60 text-[10px] font-black uppercase tracking-widest">
                                        {tier.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section with Form */}
                <section className="bg-black text-white p-8 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <h2 className="text-condensed text-4xl md:text-5xl font-black uppercase  mb-8 leading-none">
                            Reserve Your
                            <br />
                            Rental
                        </h2>
                        <p className="text-white/40 mb-12 text-sm font-medium leading-relaxed">
                            Please provide your details and mobility
                            requirements. A K2 concierge specialist will contact
                            you within 2 business hours.
                        </p>
                        <div className="space-y-6 opacity-30">
                            <div className="flex items-center gap-4">
                                <Clock size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    24/7 Availability
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Full Insurance Coverage
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
                                    Request Received
                                </h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                    We will contact you shortly.
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
                                                    (10 DIGITS REQUIRED)
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
                                <div className="group relative">
                                    <label className={labelStyles}>
                                        Preferred Vehicle Category
                                    </label>
                                    <select
                                        required
                                        className="w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight text-white appearance-none cursor-pointer [&_option]:bg-black [&_option]:text-white"
                                    >
                                        <option value="sedan">
                                            EXECUTIVE SEDAN
                                        </option>
                                        <option value="suv">LUXURY SUV</option>
                                        <option value="sport">
                                            SPORT / PERFORMANCE
                                        </option>
                                    </select>
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
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
                                        'Submit Inquiry'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                <footer className="mt-32 pt-16 border-t border-black/5">
                    <p className="text-black/30 text-[9px] font-black uppercase tracking-[0.4em] leading-loose max-w-4xl">
                        K2 Rental operates under strict commercial insurance
                        protocols. Rental eligibility is subject to driver
                        verification and security deposit requirements.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default RentalContent;
