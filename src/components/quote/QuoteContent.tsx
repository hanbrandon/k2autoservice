"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

const QuoteContent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="pt-40 pb-24 px-10 bg-white min-h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-[#ed1c24]/10 rounded-full flex items-center justify-center text-[#ed1c24]">
              <CheckCircle2 size={40} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight">SUCCESSFULLY SUBMITTED</h2>
            <p className="text-black/60 font-medium leading-relaxed">
              Thank you for your appraisal request. Our specialist will review your vehicle details and contact you shortly with a competitive offer.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = "/"}
            className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#ed1c24] transition-all"
          >
            RETURN HOME <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-24 px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-left border-l-4 border-[#ed1c24] pl-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-black/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
          >
            STRATEGIC APPRAISAL
          </motion.div>
          <h1 className="text-5xl font-black uppercase tracking-tight mb-4 leading-none">
            GET AN INSTANT QUOTE<br />FOR YOUR VEHICLE
          </h1>
          <p className="text-black/60 font-medium max-w-2xl leading-relaxed uppercase text-sm tracking-wide">
            Provide your vehicle details below to receive a competitive market value for your car.
          </p>
        </div>

        <motion.form 
          variants={formVariants}
          initial="hidden"
          animate="show"
          className="space-y-16" 
          onSubmit={handleSubmit}
        >
          {/* Step 1: Vehicle Identification */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">01</span>
              <h3 className="font-black uppercase tracking-[0.1em] text-sm">Vehicle Identification</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* VIN */}
              <motion.div variants={itemVariants} className="space-y-3 group md:col-span-2">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  VIN (17 Digits) <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative overflow-hidden">
                  <input 
                    name="vin"
                    required
                    maxLength={17}
                    type="text" 
                    placeholder="ENTER 17-DIGIT VIN" 
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </motion.div>

              {/* Miles */}
              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Total Accumulated Miles <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative overflow-hidden">
                  <input 
                    name="miles"
                    required
                    type="number" 
                    placeholder="00,000" 
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                  <span className="absolute right-0 bottom-2 text-[10px] font-black text-black/20 uppercase">MILES</span>
                </div>
              </motion.div>

              {/* Exterior Finish */}
              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Exterior Finish <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="exterior_finish"
                    required
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight bg-transparent appearance-none cursor-pointer group-focus-within:border-[#ed1c24] transition-all relative z-10"
                  >
                    <option value="">Select Color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Silver">Silver</option>
                    <option value="Grey">Grey</option>
                    <option value="Blue">Blue</option>
                    <option value="Red">Red</option>
                    <option value="Brown">Brown</option>
                    <option value="Gold">Gold</option>
                    <option value="Beige">Beige</option>
                    <option value="Green">Green</option>
                    <option value="Orange">Orange</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                  <ChevronDown className="absolute right-0 bottom-3 text-black/20 group-hover:text-[#ed1c24] transition-colors" size={16} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Step 2: Vehicle History */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">02</span>
              <h3 className="font-black uppercase tracking-[0.1em] text-sm">Vehicle Condition & Status</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Accident History */}
              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Accident History <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="accident_history"
                    required
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight bg-transparent appearance-none cursor-pointer group-focus-within:border-[#ed1c24] transition-all relative z-10"
                  >
                    <option value="">Select Status</option>
                    <option value="No Accidents">No Accidents</option>
                    <option value="1 Incident">1 Incident</option>
                    <option value="2+ Incidents">2+ Incidents</option>
                  </select>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                  <ChevronDown className="absolute right-0 bottom-3 text-black/20 group-hover:text-[#ed1c24] transition-colors" size={16} />
                </div>
              </motion.div>

              {/* Financial Status */}
              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Financial Status <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="financial_status"
                    required
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight bg-transparent appearance-none cursor-pointer group-focus-within:border-[#ed1c24] transition-all relative z-10"
                  >
                    <option value="">Select Status</option>
                    <option value="Finance / Loan">Finance / Loan</option>
                    <option value="Active Lease">Active Lease</option>
                    <option value="Paid In Full">Paid In Full</option>
                  </select>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500 z-20" />
                  <ChevronDown className="absolute right-0 bottom-3 text-black/20 group-hover:text-[#ed1c24] transition-colors" size={16} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Step 3: Contact Information */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">03</span>
              <h3 className="font-black uppercase tracking-[0.1em] text-sm">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Full Name */}
              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Full Name <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative overflow-hidden">
                  <input 
                    name="full_name"
                    required
                    type="text" 
                    placeholder="FULL NAME" 
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Email Address <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative overflow-hidden">
                  <input 
                    name="email"
                    required
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="space-y-3 group md:col-span-2">
                <label className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] group-focus-within:text-[#ed1c24] transition-colors">
                  Phone Number <span className="text-[#ed1c24]">*</span>
                </label>
                <div className="relative overflow-hidden">
                  <input 
                    name="phone"
                    required
                    type="tel" 
                    placeholder="PHONE NUMBER" 
                    className="w-full border-b border-black/10 pb-2 focus:outline-none font-bold text-lg uppercase tracking-tight placeholder:text-black/5 bg-transparent" 
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[#ed1c24] w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Privacy & Submit */}
          <div className="space-y-10 pt-6">
            <motion.div variants={itemVariants} className="flex gap-4 items-start">
              <input 
                type="checkbox" 
                id="privacy" 
                required
                className="mt-1.5 accent-[#ed1c24]"
              />
              <label htmlFor="privacy" className="text-[10px] font-bold text-black/40 uppercase leading-relaxed tracking-wider select-none cursor-pointer">
                I hereby acknowledge the Privacy Policy and grant explicit authorization to the PEOPLE & MOTORS MANAGER to contact me via encrypted channels (Phone/SMS/Email) regarding this strategic appraisal.
              </label>
            </motion.div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-bold text-[#ed1c24] uppercase tracking-wider"
              >
                {error}
              </motion.p>
            )}

            <motion.div variants={itemVariants} className="flex justify-start">
              <motion.button 
                disabled={isSubmitting}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-6 bg-black text-white pr-10 pl-8 h-16 transition-all hover:bg-[#ed1c24] disabled:bg-black/20 disabled:cursor-not-allowed"
              >
                <span className="font-bold text-lg uppercase tracking-widest">
                  {isSubmitting ? "PROCESSING..." : "GET MY OFFER"}
                </span>
                {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
              </motion.button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default QuoteContent;
