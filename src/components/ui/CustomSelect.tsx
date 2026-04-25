'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    required?: boolean;
    className?: string;
    dark?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'SELECT OPTION',
    label,
    name,
    required,
    className = '',
    dark = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const labelStyles = `text-[9px] font-black uppercase tracking-[0.3em] ${
        dark ? 'text-white/30' : 'text-black/30'
    } transition-colors mb-2 block`;

    return (
        <div ref={containerRef} className={`group relative ${className}`}>
            {label && <label className={labelStyles}>{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-transparent pb-3 focus:outline-none font-bold text-lg md:text-xl uppercase tracking-tight transition-all border-b ${
                    dark
                        ? 'border-white/10 text-white focus:border-[#ed1c24]'
                        : 'border-black/10 text-black focus:border-[#ed1c24]'
                }`}
            >
                <span
                    className={
                        !selectedOption
                            ? dark
                                ? 'text-white/10'
                                : 'text-black/10'
                            : ''
                    }
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ChevronDown
                        size={14}
                        className={dark ? 'text-white/20' : 'text-black/20'}
                    />
                </motion.div>
            </button>

            <div
                className={`absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] transition-all duration-500 z-20 ${isOpen ? 'w-full' : 'w-0'}`}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute left-0 right-0 z-50 mt-2 py-2 shadow-2xl border ${
                            dark
                                ? 'bg-[#0a0a0a] border-white/5 shadow-black/80'
                                : 'bg-white border-black/5 shadow-black/10'
                        }`}
                    >
                        <div className="max-h-60 overflow-y-auto scrollbar-hide">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-6 py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all ${
                                        dark
                                            ? option.value === value
                                                ? 'bg-[#ed1c24] text-white'
                                                : 'text-white/40 hover:bg-white/5 hover:text-white'
                                            : option.value === value
                                              ? 'bg-[#ed1c24] text-white'
                                              : 'text-black/40 hover:bg-black/5 hover:text-black'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden native select for form accessibility/submission */}
            <select
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
                aria-hidden="true"
                tabIndex={-1}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
