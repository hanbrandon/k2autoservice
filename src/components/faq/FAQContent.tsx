'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        category: 'General',
        questions: [
            {
                q: 'What makes K2 Auto Group different from other service centers?',
                a: "K2 Auto Group operates on a 'Manufacturer Standard' protocol. Unlike generic shops, we use factory-direct diagnostic tools, original OEM parts, and follow specific manufacturer service bulletins for every procedure, ensuring your warranty and vehicle integrity remain intact.",
            },
            {
                q: 'Do you provide pick-up and delivery services?',
                a: 'Yes, we offer complimentary concierge pick-up and delivery within a 25-mile radius for major service operations and long-term rental engagements. For distances beyond that, specialized transport can be arranged.',
            },
        ],
    },
    {
        category: 'Maintenance & Service',
        questions: [
            {
                q: 'What types of maintenance do you perform?',
                a: 'K2 Auto Group covers all aspects of mechanical maintenance, including advanced electronic diagnostics, performance tuning, suspension calibration, brake system optimization, and routine factory-scheduled services.',
            },
            {
                q: 'Do you offer a warranty on your services?',
                a: "All mechanical services performed at K2 Auto Group come with a 12-month/12,000-mile limited warranty on workmanship, in addition to any manufacturer's warranty on the genuine OEM parts used.",
            },
        ],
    },
    {
        category: 'Acquisition & Leasing',
        questions: [
            {
                q: 'Can I trade in my current vehicle?',
                a: 'Yes, we accept trade-ins for all makes and models. Our team will provide a professional market valuation, and the equity can be applied directly toward your new lease or purchase.',
            },
        ],
    },
];

const FAQItem = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-black/5 last:border-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <span className="text-condensed text-xl md:text-2xl font-black uppercase  group-hover:text-[#ed1c24] transition-colors">
                    {question}
                </span>
                <div
                    className={`w-8 h-8 flex items-center justify-center border border-black/10 transition-all duration-500 ${isOpen ? 'bg-[#ed1c24] border-[#ed1c24] text-white rotate-180' : 'group-hover:border-black'}`}
                >
                    <ChevronDown size={16} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 pr-12">
                            <p className="text-black/40 text-sm md:text-base font-medium leading-relaxed tracking-tight max-w-3xl">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQContent = () => {
    return (
        <div className="bg-white pt-40 pb-32 px-10 min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-[#ed1c24] mb-8"
                    >
                        <HelpCircle size={14} />
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase">
                            Knowledge Base
                        </span>
                    </motion.div>
                    <h1 className="text-condensed text-5xl md:text-8xl font-black  leading-[0.9] uppercase">
                        Frequently Asked
                        <br />
                        Questions
                    </h1>
                </header>

                <div className="space-y-24">
                    {faqs.map((category, idx) => (
                        <div key={category.category}>
                            <h2 className="text-[#ed1c24] text-[10px] font-black uppercase tracking-[0.4em] mb-12 border-l-2 border-[#ed1c24] pl-6">
                                {category.category}
                            </h2>
                            <div className="border-t border-black/5">
                                {category.questions.map((item) => (
                                    <FAQItem
                                        key={item.q}
                                        question={item.q}
                                        answer={item.a}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQContent;
