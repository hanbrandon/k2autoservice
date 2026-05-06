'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Phone,
    MapPin,
    Send,
    Car,
    Search,
    DollarSign,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Loader2,
    FileText,
    Wrench,
    ChevronDown,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { BUSINESS_INFO } from '@/utils/businessInfo';

type FormType = 'NEW_CAR' | 'BUY_USED' | 'SELL_CAR' | 'DMV' | 'REPAIR';

const ContactSection = () => {
    const [activeForm, setActiveForm] = useState<FormType>('NEW_CAR');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState(false);

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
        if (phoneError) setPhoneError(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const phoneClean = phone.replace(/[^\d]/g, '');
        if (phoneClean.length < 10) {
            setPhoneError(true);
            return;
        }

        setIsSending(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/quote', {
                // ... (rest of the API call logic remains the same)
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    phone: phone,
                    type: activeForm,
                    full_name: data.name,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setIsSubmitted(true);
            setPhone('');
            e.currentTarget.reset();
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (err) {
            setError(
                'Something went wrong. Please try again or call us directly.',
            );
        } finally {
            setIsSending(false);
        }
    };

    const forms = [
        { id: 'NEW_CAR', label: 'New Car', icon: Car },
        { id: 'BUY_USED', label: 'Buy Used', icon: ShoppingBag },
        { id: 'SELL_CAR', label: 'Sell Car', icon: DollarSign },
        { id: 'DMV', label: 'DMV Service', icon: FileText },
        { id: 'REPAIR', label: 'Repair', icon: Wrench },
    ] as const;

    const labelStyles =
        'text-[9px] font-black uppercase tracking-[0.3em] text-white/50 group-focus-within:text-[#ed1c24] transition-colors mb-2 block';
    const inputStyles =
        'w-full bg-transparent pb-3 focus:outline-none font-bold text-lg md:text-xl uppercase tracking-tight placeholder:text-white/10 text-white transition-all';
    const selectStyles =
        'w-full bg-transparent pb-3 focus:outline-none font-bold text-lg md:text-xl uppercase tracking-tight text-white appearance-none cursor-pointer transition-all relative z-10 [&_option]:bg-[#0a0a0a] [&_option]:text-white';

    return (
        <section
            id="contact"
            className="py-20 md:py-32 px-10 bg-[#0a0a0a] text-white overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                    {/* Left Side: Info */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-[#ed1c24] text-[9px] font-black tracking-[0.5em] uppercase mb-6 block"
                            >
                                Connect with us
                            </motion.span>
                            <h2 className="text-condensed text-5xl md:text-8xl font-black leading-[0.9] uppercase mb-8">
                                Contact Our
                                <br />
                                Team
                            </h2>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md font-medium tracking-tight">
                                From fast DMV services to expert car sales and
                                certified repairs, our team is here to help you.
                                Get in touch for high-quality automotive
                                solutions that fit your schedule.
                            </p>

                             <div className="space-y-10 mt-16">
                                 <div className="flex gap-6 items-start group">
                                     <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ed1c24]/10 group-hover:border-[#ed1c24]/30 transition-all shrink-0">
                                         <Phone
                                             size={18}
                                             className="text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                         />
                                     </div>
                                     <div className="space-y-4">
                                         <div>
                                             <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">
                                                 General Inquiry
                                             </div>
                                             <a
                                                 href={`tel:${BUSINESS_INFO.phoneRaw}`}
                                                 className="text-xl font-bold hover:text-[#ed1c24] transition-colors"
                                             >
                                                 {BUSINESS_INFO.phone}
                                             </a>
                                         </div>
                                         <div>
                                             <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">
                                                 Repair Dept Direct
                                             </div>
                                             <a
                                                 href={`tel:${BUSINESS_INFO.repairPhoneRaw}`}
                                                 className="text-xl font-bold hover:text-[#ed1c24] transition-colors"
                                             >
                                                 {BUSINESS_INFO.repairPhone}
                                             </a>
                                         </div>
                                     </div>
                                 </div>
 
                                 <div className="flex gap-6 items-start group">
                                     <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ed1c24]/10 group-hover:border-[#ed1c24]/30 transition-all shrink-0">
                                         <MapPin
                                             size={18}
                                             className="text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                         />
                                     </div>
                                     <div>
                                         <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">
                                             Shop Location
                                         </div>
                                         <a 
                                            href={BUSINESS_INFO.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl font-bold hover:text-[#ed1c24] transition-colors block leading-tight"
                                         >
                                             8892 Garden Grove Blvd.
                                             <br />
                                             Garden Grove, CA 92844
                                         </a>
                                     </div>
                                 </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ed1c24]/10 group-hover:border-[#ed1c24]/30 transition-all shrink-0">
                                        <Clock
                                            size={18}
                                            className="text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                                            Business Hours
                                        </div>
                                        <div className="text-sm font-bold leading-tight">
                                            REPAIR: 8AM - 5PM (SAT 8-12)
                                            <br />
                                            GENERAL: 10AM - 6PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 p-8 md:p-12 bg-white/2 border-t border-white/5 backdrop-blur-3xl"
                    >
                        {/* Form Switcher */}
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-0 mb-16 bg-black/5 border border-black/5">
                            {forms.map((form) => (
                                <button
                                    suppressHydrationWarning
                                    key={form.id}
                                    onClick={() =>
                                        setActiveForm(form.id as FormType)
                                    }
                                    className={`flex flex-col items-center justify-center py-5 px-2 transition-all gap-2 border-r border-white/5 last:border-r-0 cursor-pointer ${
                                            activeForm === form.id
                                                ? 'bg-white text-black'
                                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <form.icon size={16} />
                                    <span className="text-[8px] font-black uppercase tracking-widest">
                                        {form.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-2xl">
                                        <CheckCircle2
                                            size={32}
                                            className="text-black"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase  mb-4">
                                        Inquiry Received
                                    </h3>
                                    <p className="text-white/60 max-w-sm text-sm font-medium">
                                        Thank you. A K2 concierge specialist
                                        will contact you shortly to process your
                                        request.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key={activeForm}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="group relative">
                                            <label
                                                htmlFor="name"
                                                className={labelStyles}
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                suppressHydrationWarning
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className={inputStyles}
                                                placeholder="JOHN DOE"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                            <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                        </div>
                                        <div className="group relative">
                                            <label
                                                htmlFor="email"
                                                className={labelStyles}
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                suppressHydrationWarning
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className={inputStyles}
                                                placeholder="HELLO@K2GROUP.US"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                            <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="group relative">
                                            <label
                                                htmlFor="phone"
                                                className={`${labelStyles} ${phoneError ? 'text-[#ed1c24]' : ''}`}
                                            >
                                                Phone Number{' '}
                                                {phoneError && (
                                                    <span className="ml-2 font-bold tracking-normal">
                                                        (10 DIGITS REQUIRED)
                                                    </span>
                                                )}
                                            </label>
                                            <input
                                                suppressHydrationWarning
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                className={cn(
                                                    inputStyles,
                                                    phoneError &&
                                                        'text-[#ed1c24]',
                                                )}
                                                placeholder="(000) 000-0000"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                            <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                        </div>
                                        <div className="group relative">
                                            <label
                                                htmlFor="method"
                                                className={labelStyles}
                                            >
                                                Preferred Contact
                                            </label>
                                            <div className="relative">
                                                <select
                                                    suppressHydrationWarning
                                                    id="method"
                                                    name="method"
                                                    className={selectStyles}
                                                >
                                                    <option value="call">
                                                        PHONE CALL
                                                    </option>
                                                    <option value="text">
                                                        TEXT MESSAGE
                                                    </option>
                                                    <option value="email">
                                                        EMAIL
                                                    </option>
                                                </select>
                                                <ChevronDown
                                                    className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                    size={16}
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dynamic Fields */}
                                    {activeForm === 'DMV' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-12"
                                        >
                                            <div className="p-6 rounded-none bg-white/5 border border-white/10 flex gap-5 items-start">
                                                <div className="w-10 h-10 rounded-full bg-[#ed1c24]/10 flex items-center justify-center shrink-0">
                                                    <FileText
                                                        size={18}
                                                        className="text-[#ed1c24]"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                                                        <span className="text-[#ed1c24] font-black uppercase tracking-[0.2em] text-[9px] block mb-1">
                                                            DMV Expedited
                                                            Processing
                                                        </span>
                                                        We handle registration,
                                                        title transfers, and
                                                        out-of-state
                                                        transitions. Please
                                                        specify your vehicle
                                                        details and service type
                                                        below.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                                <div className="group relative">
                                                    <label
                                                        htmlFor="dmv_type"
                                                        className={labelStyles}
                                                    >
                                                        Service Type
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            suppressHydrationWarning
                                                            id="dmv_type"
                                                            name="dmv_type"
                                                            className={
                                                                selectStyles
                                                            }
                                                        >
                                                            <option value="registration">
                                                                NEW REGISTRATION
                                                            </option>
                                                            <option value="title_transfer">
                                                                TITLE TRANSFER
                                                            </option>
                                                            <option value="out_of_state">
                                                                OUT-OF-STATE
                                                                TRANSFER
                                                            </option>
                                                            <option value="plate_replacement">
                                                                PLATE
                                                                REPLACEMENT
                                                            </option>
                                                        </select>
                                                        <ChevronDown
                                                            className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                            size={16}
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                    </div>
                                                </div>
                                                <div className="group relative">
                                                    <label
                                                        htmlFor="vin_dmv"
                                                        className={labelStyles}
                                                    >
                                                        VIN (17 Digits)
                                                    </label>
                                                    <input
                                                        suppressHydrationWarning
                                                        type="text"
                                                        id="vin_dmv"
                                                        name="vin"
                                                        required
                                                        className={inputStyles}
                                                        placeholder="VEHICLE VIN"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeForm === 'NEW_CAR' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10"
                                        >
                                            <div className="group relative">
                                                <label
                                                    htmlFor="make"
                                                    className={labelStyles}
                                                >
                                                    Make
                                                </label>
                                                <input
                                                    suppressHydrationWarning
                                                    type="text"
                                                    id="make"
                                                    name="make"
                                                    required
                                                    className={inputStyles}
                                                    placeholder="E.G. PORSCHE"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                            </div>
                                            <div className="group relative">
                                                <label
                                                    htmlFor="model"
                                                    className={labelStyles}
                                                >
                                                    Model
                                                </label>
                                                <input
                                                    suppressHydrationWarning
                                                    type="text"
                                                    id="model"
                                                    name="model"
                                                    required
                                                    className={inputStyles}
                                                    placeholder="E.G. 911 GT3"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                            </div>
                                            <div className="group relative">
                                                <label
                                                    htmlFor="purchase_type"
                                                    className={labelStyles}
                                                >
                                                    Inquiry Type
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        suppressHydrationWarning
                                                        id="purchase_type"
                                                        name="purchase_type"
                                                        className={selectStyles}
                                                    >
                                                        <option value="lease">
                                                            LEASE
                                                        </option>
                                                        <option value="finance">
                                                            FINANCE
                                                        </option>
                                                        <option value="cash">
                                                            CASH PURCHASE
                                                        </option>
                                                    </select>
                                                    <ChevronDown
                                                        className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                        size={16}
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeForm === 'REPAIR' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
                                        >
                                            <div className="group relative">
                                                <label
                                                    htmlFor="repair_type"
                                                    className={labelStyles}
                                                >
                                                    Service Needed
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        suppressHydrationWarning
                                                        id="repair_type"
                                                        name="repair_type"
                                                        className={selectStyles}
                                                    >
                                                        <option value="brakes">
                                                            EXPERT BRAKE SERVICE
                                                        </option>
                                                        <option value="maintenance">
                                                            ROUTINE MAINTENANCE
                                                        </option>
                                                        <option value="diagnostic">
                                                            DIAGNOSTIC / REPAIR
                                                        </option>
                                                        <option value="detailing">
                                                            ELITE DETAILING
                                                        </option>
                                                    </select>
                                                    <ChevronDown
                                                        className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                        size={16}
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                </div>
                                            </div>
                                            <div className="group relative">
                                                <label
                                                    htmlFor="vin_repair"
                                                    className={labelStyles}
                                                >
                                                    Vehicle Year/Model
                                                </label>
                                                <input
                                                    suppressHydrationWarning
                                                    type="text"
                                                    id="vin_repair"
                                                    name="vehicle"
                                                    required
                                                    className={inputStyles}
                                                    placeholder="2024 RANGE ROVER"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeForm === 'BUY_USED' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
                                        >
                                            <div className="group relative">
                                                <label
                                                    htmlFor="budget"
                                                    className={labelStyles}
                                                >
                                                    Budget Range
                                                </label>
                                                <input
                                                    type="text"
                                                    id="budget"
                                                    name="budget"
                                                    className={inputStyles}
                                                    placeholder="E.G. $50K - $80K"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                            </div>
                                            <div className="group relative">
                                                <label
                                                    htmlFor="car_type"
                                                    className={labelStyles}
                                                >
                                                    Preferred Style
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="car_type"
                                                        name="car_type"
                                                        className={selectStyles}
                                                    >
                                                        <option value="sedan">
                                                            SEDAN
                                                        </option>
                                                        <option value="suv">
                                                            SUV
                                                        </option>
                                                        <option value="coupe">
                                                            COUPE / SPORT
                                                        </option>
                                                        <option value="ev">
                                                            ELECTRIC / HYBRID
                                                        </option>
                                                    </select>
                                                    <ChevronDown
                                                        className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                        size={16}
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeForm === 'SELL_CAR' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-12"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                                <div className="group relative">
                                                    <label
                                                        htmlFor="vin_sell"
                                                        className={labelStyles}
                                                    >
                                                        VIN (17 Digits)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="vin_sell"
                                                        name="vin"
                                                        required
                                                        className={inputStyles}
                                                        placeholder="VEHICLE VIN"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                </div>
                                                <div className="group relative">
                                                    <label
                                                        htmlFor="mileage"
                                                        className={labelStyles}
                                                    >
                                                        Total Miles
                                                    </label>
                                                    <div className="relative overflow-hidden group">
                                                        <input
                                                            type="number"
                                                            id="mileage"
                                                            name="miles"
                                                            required
                                                            className={
                                                                inputStyles
                                                            }
                                                            placeholder="00,000"
                                                        />
                                                        <span className="absolute right-0 bottom-3 text-[9px] font-black text-white/10 uppercase tracking-widest">
                                                            Miles
                                                        </span>
                                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <label className={labelStyles}>
                                                    Exterior Color
                                                </label>
                                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12 gap-4">
                                                    {[
                                                        {
                                                            name: 'White',
                                                            hex: '#FFFFFF',
                                                        },
                                                        {
                                                            name: 'Black',
                                                            hex: '#000000',
                                                        },
                                                        {
                                                            name: 'Silver',
                                                            hex: '#C0C0C0',
                                                        },
                                                        {
                                                            name: 'Grey',
                                                            hex: '#808080',
                                                        },
                                                        {
                                                            name: 'Blue',
                                                            hex: '#0000FF',
                                                        },
                                                        {
                                                            name: 'Red',
                                                            hex: '#FF0000',
                                                        },
                                                        {
                                                            name: 'Brown',
                                                            hex: '#A52A2A',
                                                        },
                                                        {
                                                            name: 'Gold',
                                                            hex: '#FFD700',
                                                        },
                                                        {
                                                            name: 'Beige',
                                                            hex: '#F5F5DC',
                                                        },
                                                        {
                                                            name: 'Green',
                                                            hex: '#008000',
                                                        },
                                                        {
                                                            name: 'Orange',
                                                            hex: '#FFA500',
                                                        },
                                                        {
                                                            name: 'Other',
                                                            hex: 'transparent',
                                                        },
                                                    ].map((color) => (
                                                        <label
                                                            key={color.name}
                                                            className="group cursor-pointer flex flex-col items-center gap-2"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="exterior_color"
                                                                value={
                                                                    color.name
                                                                }
                                                                className="sr-only peer"
                                                            />
                                                            <div
                                                                className={cn(
                                                                    'w-10 h-10 rounded-full border-2 border-white/5 transition-all peer-checked:border-[#ed1c24] peer-checked:scale-110',
                                                                    color.name ===
                                                                        'Other'
                                                                        ? 'bg-gradient-to-tr from-black/5 via-black/10 to-black/5'
                                                                        : '',
                                                                )}
                                                                style={{
                                                                    backgroundColor:
                                                                        color.hex,
                                                                }}
                                                            />
                                                            <span className="text-[7px] font-black uppercase tracking-widest text-white/60 group-hover:text-black transition-colors">
                                                                {color.name}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                                <div className="group relative">
                                                    <label
                                                        htmlFor="accident_history"
                                                        className={labelStyles}
                                                    >
                                                        Accident History
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            id="accident_history"
                                                            name="accident_history"
                                                            className={
                                                                selectStyles
                                                            }
                                                        >
                                                            <option value="No Accidents">
                                                                NO ACCIDENTS
                                                            </option>
                                                            <option value="1 Incident">
                                                                1 INCIDENT
                                                            </option>
                                                            <option value="2+ Incidents">
                                                                2+ INCIDENTS
                                                            </option>
                                                        </select>
                                                        <ChevronDown
                                                            className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                            size={16}
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                    </div>
                                                </div>

                                                <div className="group relative">
                                                    <label
                                                        htmlFor="financial_status"
                                                        className={labelStyles}
                                                    >
                                                        Financial Status
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            id="financial_status"
                                                            name="financial_status"
                                                            className={
                                                                selectStyles
                                                            }
                                                        >
                                                            <option value="Finance / Loan">
                                                                FINANCE / LOAN
                                                            </option>
                                                            <option value="Active Lease">
                                                                ACTIVE LEASE
                                                            </option>
                                                            <option value="Paid In Full">
                                                                PAID IN FULL
                                                            </option>
                                                        </select>
                                                        <ChevronDown
                                                            className="absolute right-0 bottom-4 text-white/60 group-hover:text-[#ed1c24] transition-colors"
                                                            size={16}
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="group relative">
                                        <label
                                            htmlFor="notes"
                                            className={labelStyles}
                                        >
                                            Additional Details
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            className="w-full bg-transparent pb-3 focus:outline-none font-bold text-lg md:text-xl uppercase tracking-tight placeholder:text-white/10 text-white transition-all resize-none"
                                            placeholder="DESCRIBE YOUR REQUEST..."
                                        ></textarea>
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                                    </div>

                                    <div className="flex flex-col gap-10 pt-4">
                                        <label className="flex gap-4 cursor-pointer group">
                                            <div className="relative flex items-center justify-center mt-0.5">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    className="peer appearance-none w-5 h-5 rounded-md border border-white/10 bg-white/5 checked:bg-[#ed1c24] checked:border-[#ed1c24] transition-all"
                                                />
                                                <CheckCircle2
                                                    size={12}
                                                    className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <span className="text-[10px] text-white/60 leading-relaxed group-hover:text-white/60 transition-colors font-medium uppercase tracking-tight">
                                                I authorize{' '}
                                                <span className="text-[#ed1c24] font-black">
                                                    K2 AUTO GROUP
                                                </span>{' '}
                                                to contact me regarding this
                                                strategic inquiry via encrypted
                                                communication channels.
                                            </span>
                                        </label>

                                        {error && (
                                            <p className="text-[#ed1c24] text-[10px] font-black uppercase tracking-widest pl-1">
                                                {error}
                                            </p>
                                        )}

                                        <button
                                            suppressHydrationWarning
                                            type="submit"
                                            disabled={isSending}
                                            className="w-full bg-white text-black py-6 font-black tracking-[0.4em] uppercase text-[10px] hover:bg-[#ed1c24] hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                                        >
                                            {isSending ? (
                                                <>
                                                    <Loader2
                                                        size={16}
                                                        className="animate-spin"
                                                    />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Submit{' '}
                                                    {
                                                        forms.find(
                                                            (f) =>
                                                                f.id ===
                                                                activeForm,
                                                        )?.label
                                                    }
                                                    <Send size={14} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
