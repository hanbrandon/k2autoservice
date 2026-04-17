"use client";

import { motion } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-24 px-10 bg-white border-t border-black/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-left border-l-4 border-[#ed1c24] pl-6">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">CUSTOMER INQUIRY</h2>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-black/40 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <p>WE WILL RESPOND TO YOUR REQUEST WITHIN 24 BUSINESS HOURS.</p>
          </motion.div>
        </div>

        <motion.form 
          variants={formVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-12" 
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Inquiry Type */}
            <motion.div variants={itemVariants} className="space-y-3 group md:col-span-2">
              <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                Inquiry Category <span className="text-[#ed1c24]">*</span>
              </label>
              <div className="relative">
                <select className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight bg-transparent appearance-none cursor-pointer group-focus-within:border-[#ed1c24] transition-all relative z-10">
                  <option>Select Option</option>
                  <option>Vehicle Sales / Inventory</option>
                  <option>Certified Repair Service</option>
                  <option>DMV & Registration Assistance</option>
                  <option>General Support</option>
                </select>
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                <ChevronDown className="absolute right-0 bottom-3 text-black/20 group-hover:text-[#ed1c24] transition-colors" size={16} />
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="space-y-3 group">
              <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                Your Name <span className="text-[#ed1c24]">*</span>
              </label>
              <div className="relative overflow-hidden">
                <input 
                  type="text" 
                  placeholder="ENTER NAME" 
                  className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="space-y-3 group">
              <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                Contact Number <span className="text-[#ed1c24]">*</span>
              </label>
              <div className="relative overflow-hidden">
                <input 
                  type="tel" 
                  placeholder="555.000.0000" 
                  className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
              </div>
            </motion.div>

            {/* Email Address */}
            <motion.div variants={itemVariants} className="space-y-3 group md:col-span-2">
              <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                Email Address <span className="text-[#ed1c24]">*</span>
              </label>
              <div className="relative overflow-hidden">
                <input 
                  type="email" 
                  placeholder="EMAIL@K2GROUP.US" 
                  className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
              </div>
            </motion.div>

            {/* Message Content */}
            <motion.div variants={itemVariants} className="space-y-3 group md:col-span-2">
              <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                Message Content <span className="text-[#ed1c24]">*</span>
              </label>
              <div className="relative overflow-hidden">
                <textarea 
                  rows={2} 
                  placeholder="HOW CAN WE HELP YOU TODAY?" 
                  className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent resize-none" 
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-start">
            <motion.button 
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-6 bg-black text-white pr-10 pl-8 h-16 transition-all hover:bg-[#ed1c24]"
            >
              <span className="font-bold text-lg uppercase tracking-widest">SEND INQUIRY</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
