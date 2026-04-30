'use client';

import { motion } from 'motion/react';
import {
    FileText,
    ClipboardCheck,
    ArrowRight,
    ShieldCheck,
    AlertTriangle,
    Scale,
    Clock,
    Globe,
    Send,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

const mainAreas = [
    {
        title: 'Registration & Renewal',
        desc: 'Direct-to-DMV interface for new vehicle registrations, tags, and annual renewals. We bypass standard public queuing for immediate document issuance.',
        icon: <FileText className="text-[#ed1c24]" />,
    },
    {
        title: 'Complex Transfers',
        desc: 'Expert handling of private party transfers, family title changes, and inheritance-based ownership transitions with full legal auditing.',
        icon: <ClipboardCheck className="text-[#ed1c24]" />,
    },
    {
        title: 'Out-of-State Transfers',
        desc: 'Moving to California? We handle everything from VIN verification to smog coordination and your new CA plates.',
        icon: <Globe className="text-[#ed1c24]" />,
    },
    {
        title: 'Title & Lien Services',
        desc: 'Managing paperwork with lenders for lien removals, title releases, and lease-end documentation processing.',
        icon: <ShieldCheck className="text-[#ed1c24]" />,
    },
];

const collisionProcess = [
    {
        title: 'On-Site Triage',
        desc: 'Immediate assessment of safety and driveability post-accident.',
    },
    {
        title: 'Evidence Capture',
        desc: 'Detailed photo documentation and reporting for insurance adjusters.',
    },
    {
        title: 'Direct Billing',
        desc: 'Direct communication with providers like State Farm, Geico, and AIG.',
    },
    {
        title: 'OEM Advocacy',
        desc: 'We insist on genuine parts over aftermarket alternatives for all repairs.',
    },
];

const DMVContent = () => {
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
                        className="text-[#ed1c24] text-[10px] font-black tracking-[0.5em] uppercase mb-8 block"
                    >
                        Administrative & Claims Support
                    </motion.span>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black  leading-[0.9] uppercase mb-16">
                        DMV &<br />
                        Registration
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <p className="text-black/60 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
                            K2 Auto Group functions as your professional liaison
                            with the Bureau of Automotive Repair and the DMV.
                            Our objective is to eliminate the friction of
                            vehicle ownership through expert documentation
                            management and aggressive insurance coordination.
                        </p>
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-4 items-center border-b border-black/5 pb-4">
                                <Clock size={18} className="text-[#ed1c24]" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Expedited 24-Hour Document Processing
                                </span>
                            </div>
                            <div className="flex gap-4 items-center border-b border-black/5 pb-4">
                                <Scale size={18} className="text-[#ed1c24]" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Insurance Policy Compliance Auditing
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* DMV Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 border-t border-black/10 pt-24 mb-40">
                    {mainAreas.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            className="flex gap-8 group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="w-12 h-12 shrink-0 bg-black/5 flex items-center justify-center group-hover:bg-[#ed1c24] group-hover:text-white transition-all duration-500">
                                {section.icon}
                            </div>
                            <div>
                                <h3 className="text-condensed text-3xl font-black uppercase  mb-4">
                                    {section.title}
                                </h3>
                                <p className="text-black/40 text-base font-medium leading-relaxed tracking-tight">
                                    {section.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Collision & Claims Detail */}
                <section className="bg-black text-white p-12 md:p-24 relative overflow-hidden mb-40">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <AlertTriangle size={200} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-condensed text-4xl md:text-5xl font-black uppercase  mb-16">
                            Collision Claim
                            <br />
                            Management
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {collisionProcess.map((step, idx) => (
                                <motion.div
                                    key={step.title}
                                    className="border-l border-[#ed1c24]/30 pl-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <h3 className="text-[#ed1c24] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section with Form */}
                <section className="bg-black text-white p-8 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <h2 className="text-condensed text-4xl md:text-5xl font-black uppercase  mb-8 leading-none">
                            DMV Service
                            <br />
                            Request
                        </h2>
                        <p className="text-white/40 mb-12 text-sm font-medium leading-relaxed">
                            Need expedited DMV processing or insurance
                            coordination? Submit your request below for a
                            priority review.
                        </p>
                        <div className="space-y-6 opacity-30">
                            <div className="flex items-center gap-4">
                                <Clock size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Expedited Filing
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Legal Compliance Audited
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
                                    Request Processed
                                </h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                    An agent will contact you shortly.
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
                                            Service Category
                                        </label>
                                        <select
                                            required
                                            className="w-full bg-transparent pb-3 focus:outline-none font-bold text-lg uppercase tracking-tight text-white appearance-none cursor-pointer"
                                        >
                                            <option value="dmv">
                                                DMV PROCESSING
                                            </option>
                                            <option value="claims">
                                                INSURANCE CLAIMS
                                            </option>
                                            <option value="title">
                                                TITLE / LIEN SERVICES
                                            </option>
                                        </select>
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                                    </div>
                                    <div className="group relative">
                                        <label className={labelStyles}>
                                            Brief Details
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className={inputStyles}
                                            placeholder="E.G. TITLE TRANSFER / OUT OF STATE"
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
                                        'Submit Request'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                <footer className="mt-32 pt-16 border-t border-black/5">
                    <p className="text-black/30 text-[9px] font-black uppercase tracking-[0.4em] leading-loose max-w-4xl">
                        K2 Auto Group is not an insurance provider. Our claims
                        assistance is a concierge service to support the repair
                        process. DMV services are subject to state fees and
                        documentation availability.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default DMVContent;
