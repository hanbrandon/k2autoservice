'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    CheckCircle2,
    Loader2,
    ChevronRight,
    ChevronLeft,
    Building2,
    User,
    Plus,
    Trash2,
    FileText,
    ShieldCheck,
} from 'lucide-react';
import { cn } from '@/utils/cn';

type ApplicationType = 'personal' | 'business';

interface ResidenceHistory {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    years: string;
    months: string;
    type: string;
    amount: string;
}

interface WorkHistory {
    employer: string;
    jobTitle: string;
    monthlyIncome: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    years: string;
    months: string;
    otherIncome: string;
    otherSources: string;
}

const US_STATES = [
    { code: 'AL', name: 'ALABAMA' }, { code: 'AK', name: 'ALASKA' }, { code: 'AZ', name: 'ARIZONA' },
    { code: 'AR', name: 'ARKANSAS' }, { code: 'CA', name: 'CALIFORNIA' }, { code: 'CO', name: 'COLORADO' },
    { code: 'CT', name: 'CONNECTICUT' }, { code: 'DE', name: 'DELAWARE' }, { code: 'FL', name: 'FLORIDA' },
    { code: 'GA', name: 'GEORGIA' }, { code: 'HI', name: 'HAWAII' }, { code: 'ID', name: 'IDAHO' },
    { code: 'IL', name: 'ILLINOIS' }, { code: 'IN', name: 'INDIANA' }, { code: 'IA', name: 'IOWA' },
    { code: 'KS', name: 'KANSAS' }, { code: 'KY', name: 'KENTUCKY' }, { code: 'LA', name: 'LOUISIANA' },
    { code: 'ME', name: 'MAINE' }, { code: 'MD', name: 'MARYLAND' }, { code: 'MA', name: 'MASSACHUSETTS' },
    { code: 'MI', name: 'MICHIGAN' }, { code: 'MN', name: 'MINNESOTA' }, { code: 'MS', name: 'MISSISSIPPI' },
    { code: 'MO', name: 'MISSOURI' }, { code: 'MT', name: 'MONTANA' }, { code: 'NE', name: 'NEBRASKA' },
    { code: 'NV', name: 'NEVADA' }, { code: 'NH', name: 'NEW HAMPSHIRE' }, { code: 'NJ', name: 'NEW JERSEY' },
    { code: 'NM', name: 'NEW MEXICO' }, { code: 'NY', name: 'NEW YORK' }, { code: 'NC', name: 'NORTH CAROLINA' },
    { code: 'ND', name: 'NORTH DAKOTA' }, { code: 'OH', name: 'OHIO' }, { code: 'OK', name: 'OKLAHOMA' },
    { code: 'OR', name: 'OREGON' }, { code: 'PA', name: 'PENNSYLVANIA' }, { code: 'RI', name: 'RHODE ISLAND' },
    { code: 'SC', name: 'SOUTH CAROLINA' }, { code: 'SD', name: 'SOUTH DAKOTA' }, { code: 'TN', name: 'TENNESSEE' },
    { code: 'TX', name: 'TEXAS' }, { code: 'UT', name: 'UTAH' }, { code: 'VT', name: 'VERMONT' },
    { code: 'VA', name: 'VIRGINIA' }, { code: 'WA', name: 'WASHINGTON' }, { code: 'WV', name: 'WEST VIRGINIA' },
    { code: 'WI', name: 'WISCONSIN' }, { code: 'WY', name: 'WYOMING' }
];

const PreApproveForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [applicationType, setApplicationType] = useState<ApplicationType>('personal');
    
    // Step 1 State
    const [step1Data, setStep1Data] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
    });

    const [step1Errors, setStep1Errors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        zipCode: false,
    });

    // Step 2 Personal State
    const [personalData, setPersonalData] = useState({
        middleName: '',
        dob: '',
        ssn: '',
        driversLicense: '',
        dlState: '',
        homePhone: '',
        workPhone: '',
        employmentStatus: '',
    });

    const [residenceHistory, setResidenceHistory] = useState<ResidenceHistory[]>([
        { address: '', city: '', state: '', zip: '', country: 'United States', years: '', months: '', type: '', amount: '' }
    ]);

    const [workHistory, setWorkHistory] = useState<WorkHistory[]>([
        { employer: '', jobTitle: '', monthlyIncome: '', address: '', city: '', state: '', zip: '', country: 'United States', phone: '', years: '', months: '', otherIncome: '', otherSources: '' }
    ]);

    // Step 2 Business State
    const [businessInfo, setBusinessInfo] = useState({
        legalName: '',
        taxId: '',
        dba: '',
        yearsInBusiness: '',
        phone: '',
        email: '',
    });

    const [businessAddress, setBusinessAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
    });

    const [businessIncome, setBusinessIncome] = useState({
        grossProfit: '',
        annualSales: '',
    });

    const [signature, setSignature] = useState('');

    // Error State for Step 2
    const [personalErrors, setPersonalErrors] = useState<any>({});
    const [businessErrors, setBusinessErrors] = useState<any>({});
    const [signatureError, setSignatureError] = useState(false);

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

    const formatSSN = (value: string) => {
        const val = value.replace(/[^\d]/g, '');
        if (val.length <= 3) return val;
        if (val.length <= 5) return `${val.slice(0, 3)}-${val.slice(3)}`;
        return `${val.slice(0, 3)}-${val.slice(3, 5)}-${val.slice(5, 9)}`;
    };

    const formatEIN = (value: string) => {
        const val = value.replace(/[^\d]/g, '');
        if (val.length <= 2) return val;
        return `${val.slice(0, 2)}-${val.slice(2, 9)}`;
    };

    const handleStep1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        let finalValue = value;

        if (id === 'phone') {
            finalValue = formatPhoneNumber(value);
        } else if (id === 'zipCode') {
            finalValue = value.replace(/[^\d]/g, '').slice(0, 5);
        }

        setStep1Data({ ...step1Data, [id]: finalValue });
        if (step1Errors[id as keyof typeof step1Errors]) {
            setStep1Errors({ ...step1Errors, [id]: false });
        }
    };

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let finalValue = value;

        if (id === 'ssn') {
            finalValue = formatSSN(value);
        } else if (id === 'homePhone' || id === 'workPhone') {
            finalValue = formatPhoneNumber(value);
        } else if (id === 'dob') {
            // Basic date formatting MM-DD-YYYY
            const digits = value.replace(/[^\d]/g, '');
            if (digits.length <= 2) finalValue = digits;
            else if (digits.length <= 4) finalValue = `${digits.slice(0, 2)}-${digits.slice(2)}`;
            else finalValue = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
        }

        setPersonalData({ ...personalData, [id]: finalValue });
        if (personalErrors[id]) {
            setPersonalErrors({ ...personalErrors, [id]: false });
        }
    };

    const handleResidenceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const field = id.split('-')[1]; // res-address-0 -> address
        let finalValue = value;

        if (['years', 'months', 'zip'].includes(field)) {
            finalValue = value.replace(/[^\d]/g, '');
        } else if (field === 'amount') {
            finalValue = value.replace(/[^\d.]/g, '');
        }

        const newHistory = [...residenceHistory];
        // @ts-ignore
        newHistory[index][field] = finalValue;
        setResidenceHistory(newHistory);
    };

    const handleWorkChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const field = id.split('-')[1]; // work-address-0 -> address
        let finalValue = value;

        if (['years', 'months', 'zip'].includes(field)) {
            finalValue = value.replace(/[^\d]/g, '');
        } else if (field === 'monthlyIncome' || field === 'otherIncome') {
            finalValue = value.replace(/[^\d.]/g, '');
        } else if (field === 'phone') {
            finalValue = formatPhoneNumber(value);
        }

        const newHistory = [...workHistory];
        // @ts-ignore
        newHistory[index][field] = finalValue;
        setWorkHistory(newHistory);
    };

    const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const field = id.startsWith('biz-') ? id.replace('biz-', '') : id;
        let finalValue = value;

        if (field === 'taxId') {
            finalValue = formatEIN(value);
        } else if (field === 'phone') {
            finalValue = formatPhoneNumber(value);
        } else if (field === 'yearsInBusiness') {
            finalValue = value.replace(/[^\d]/g, '');
        }

        setBusinessInfo({ ...businessInfo, [field]: finalValue });
        if (businessErrors[field]) {
            setBusinessErrors({ ...businessErrors, [field]: false });
        }
    };

    const handleBusinessAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let finalValue = value;

        if (id === 'zip') {
            finalValue = value.replace(/[^\d]/g, '');
        }

        setBusinessAddress({ ...businessAddress, [id]: finalValue });
    };

    const handleBusinessIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const finalValue = value.replace(/[^\d.]/g, '');
        setBusinessIncome({ ...businessIncome, [id]: finalValue });
    };

    const addResidence = () => {
        setResidenceHistory([...residenceHistory, { address: '', city: '', state: '', zip: '', country: 'United States', years: '', months: '', type: '', amount: '' }]);
    };

    const removeResidence = (index: number) => {
        setResidenceHistory(residenceHistory.filter((_, i) => i !== index));
    };

    const addWork = () => {
        setWorkHistory([...workHistory, { employer: '', jobTitle: '', monthlyIncome: '', address: '', city: '', state: '', zip: '', country: 'United States', phone: '', years: '', months: '', otherIncome: '', otherSources: '' }]);
    };

    const removeWork = (index: number) => {
        setWorkHistory(workHistory.filter((_, i) => i !== index));
    };

    const validateStep1 = () => {
        const errors = {
            firstName: !step1Data.firstName.trim(),
            lastName: !step1Data.lastName.trim(),
            email: !step1Data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1Data.email),
            phone: step1Data.phone.replace(/[^\d]/g, '').length < 10,
            zipCode: !/^\d{5}$/.test(step1Data.zipCode),
        };

        setStep1Errors(errors);
        return !Object.values(errors).some(Boolean);
    };

    const nextStep = () => {
        if (step === 1) {
            if (validateStep1()) {
                setStep(2);
                window.scrollTo(0, 0);
            }
        } else {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };
    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const validateStep2 = () => {
        if (applicationType === 'personal') {
            const errors: any = {
                dob: !personalData.dob.trim(),
                ssn: personalData.ssn.replace(/[^\d]/g, '').length < 9,
                driversLicense: !personalData.driversLicense.trim(),
                dlState: !personalData.dlState.trim(),
                employmentStatus: !personalData.employmentStatus.trim(),
            };
            setPersonalErrors(errors);
            const isSignatureValid = signature.trim().length > 0;
            setSignatureError(!isSignatureValid);
            return !Object.values(errors).some(Boolean) && isSignatureValid;
        } else {
            const errors: any = {
                legalName: !businessInfo.legalName.trim(),
                taxId: businessInfo.taxId.replace(/[^\d]/g, '').length < 9,
                yearsInBusiness: !businessInfo.yearsInBusiness.trim(),
                phone: businessInfo.phone.replace(/[^\d]/g, '').length < 10,
                email: !businessInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessInfo.email),
                street: !businessAddress.street.trim(),
                city: !businessAddress.city.trim(),
                state: !businessAddress.state.trim(),
                zip: !businessAddress.zip.trim(),
                grossProfit: !businessIncome.grossProfit.trim(),
                annualSales: !businessIncome.annualSales.trim(),
            };
            setBusinessErrors(errors);
            const isSignatureValid = signature.trim().length > 0;
            setSignatureError(!isSignatureValid);
            return !Object.values(errors).some(Boolean) && isSignatureValid;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateStep2()) {
            window.scrollTo(0, 0);
            return;
        }

        setIsSending(true);
        setError(null);

        const payload = {
            ...step1Data,
            applicationType,
            personalData,
            residenceHistory,
            workHistory,
            businessInfo,
            businessAddress,
            businessIncome,
            signature,
        };

        try {
            const response = await fetch('/api/credit-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to submit application');

            setIsSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again or contact us.');
        } finally {
            setIsSending(false);
        }
    };

    const inputStyles = "w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#ed1c24] transition-colors placeholder:text-white/20";
    const selectStyles = cn(inputStyles, "[&_option]:bg-[#0a0a0a] [&_option]:text-white appearance-none cursor-pointer");
    const labelStyles = "block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2";
    const sectionTitleStyles = "text-xl font-bold uppercase tracking-tight mb-8 flex items-center gap-3";

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto py-20 text-center"
            >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} className="text-black" />
                </div>
                <h2 className="text-4xl font-black uppercase mb-4">Application Received</h2>
                <p className="text-white/60 mb-8">Thank you for submitting your pre-approval application. Our team will review your information and get back to you shortly.</p>
                <button suppressHydrationWarning 
                    onClick={() => window.location.href = '/'}
                    className="bg-[#ed1c24] text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#c4161b] transition-colors cursor-pointer"
                >
                    Back to Home
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center mb-16">
                <h1 className="text-condensed text-4xl md:text-6xl font-black mb-4">
                    {step === 1 ? 'Get Pre-Approved' : 'Credit Application'}
                </h1>
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
                    {step === 1 ? 'Tell us about yourself' : 'Step 2: Detailed Information'}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-12">
                <div className={cn("h-1 flex-1 transition-colors duration-500", step >= 1 ? "bg-[#ed1c24]" : "bg-white/10")} />
                <div className={cn("h-1 flex-1 transition-colors duration-500", step >= 2 ? "bg-[#ed1c24]" : "bg-white/10")} />
            </div>

            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={cn(labelStyles, step1Errors.firstName && "text-[#ed1c24]")} htmlFor="firstName">
                                    First Name {step1Errors.firstName && <span className="ml-1">*</span>}
                                </label>
                                <input suppressHydrationWarning 
                                    type="text" id="firstName" value={step1Data.firstName} 
                                    onChange={handleStep1Change} className={cn(inputStyles, step1Errors.firstName && "border-[#ed1c24]/50")} placeholder="JOHN" required 
                                />
                                {step1Errors.firstName && (
                                    <p className="text-[#ed1c24] text-[9px] font-bold mt-1 uppercase tracking-widest">This field is required</p>
                                )}
                            </div>
                            <div>
                                <label className={cn(labelStyles, step1Errors.lastName && "text-[#ed1c24]")} htmlFor="lastName">
                                    Last Name {step1Errors.lastName && <span className="ml-1">*</span>}
                                </label>
                                <input suppressHydrationWarning 
                                    type="text" id="lastName" value={step1Data.lastName} 
                                    onChange={handleStep1Change} className={cn(inputStyles, step1Errors.lastName && "border-[#ed1c24]/50")} placeholder="DOE" required 
                                />
                                {step1Errors.lastName && (
                                    <p className="text-[#ed1c24] text-[9px] font-bold mt-1 uppercase tracking-widest">This field is required</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className={cn(labelStyles, step1Errors.email && "text-[#ed1c24]")} htmlFor="email">
                                Email Address {step1Errors.email && <span className="ml-1">(INVALID)</span>}
                            </label>
                            <input suppressHydrationWarning 
                                type="email" id="email" value={step1Data.email} 
                                onChange={handleStep1Change} className={cn(inputStyles, step1Errors.email && "border-[#ed1c24]/50")} placeholder="EMAIL@EXAMPLE.COM" required 
                            />
                            {step1Errors.email && (
                                <p className="text-[#ed1c24] text-[9px] font-bold mt-1 uppercase tracking-widest">Please enter a valid email address</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={cn(labelStyles, step1Errors.phone && "text-[#ed1c24]")} htmlFor="phone">
                                    Phone Number {step1Errors.phone && <span className="ml-1">(10 DIGITS)</span>}
                                </label>
                                <input suppressHydrationWarning 
                                    type="tel" id="phone" value={step1Data.phone} 
                                    onChange={handleStep1Change} className={cn(inputStyles, step1Errors.phone && "border-[#ed1c24]/50")} placeholder="(000) 000-0000" required 
                                />
                                {step1Errors.phone && (
                                    <p className="text-[#ed1c24] text-[9px] font-bold mt-1 uppercase tracking-widest">10 digits required</p>
                                )}
                            </div>
                            <div>
                                <label className={cn(labelStyles, step1Errors.zipCode && "text-[#ed1c24]")} htmlFor="zipCode">
                                    Zip Code {step1Errors.zipCode && <span className="ml-1">(5 DIGITS)</span>}
                                </label>
                                <input suppressHydrationWarning 
                                    type="text" id="zipCode" value={step1Data.zipCode} 
                                    onChange={handleStep1Change} className={cn(inputStyles, step1Errors.zipCode && "border-[#ed1c24]/50")} placeholder="90001" required 
                                />
                                {step1Errors.zipCode && (
                                    <p className="text-[#ed1c24] text-[9px] font-bold mt-1 uppercase tracking-widest">5 digit zip code required</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-8">
                            <button suppressHydrationWarning 
                                onClick={nextStep}
                                className="w-full bg-[#ed1c24] text-white py-5 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#c4161b] transition-all cursor-pointer"
                            >
                                Continue <ChevronRight size={20} />
                            </button>
                            <p className="text-center text-[10px] text-white/30 mt-6 uppercase tracking-widest">
                                This is a quick 2-step process to submit our secure form.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-12"
                    >
                        {/* App Type Switcher */}
                        <div className="flex flex-col items-center gap-6 mb-12">
                            <label className={labelStyles}>Select Application Type</label>
                            <div className="flex gap-4 p-1 bg-white/5 border border-white/10 rounded-full">
                                <button
                                    type="button"
                                    onClick={() => setApplicationType('personal')}
                                    className={cn(
                                        "px-8 py-3 rounded-full font-bold uppercase text-xs transition-all flex items-center gap-2 cursor-pointer",
                                        applicationType === 'personal' ? "bg-white text-black" : "text-white/50 hover:text-white"
                                    )}
                                >
                                    <User size={14} /> Personal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setApplicationType('business')}
                                    className={cn(
                                        "px-8 py-3 rounded-full font-bold uppercase text-xs transition-all flex items-center gap-2 cursor-pointer",
                                        applicationType === 'business' ? "bg-white text-black" : "text-white/50 hover:text-white"
                                    )}
                                >
                                    <Building2 size={14} /> Business
                                </button>
                            </div>
                        </div>

                        {applicationType === 'personal' ? (
                            <div className="space-y-12">
                                {/* Applicant Information */}
                                <section>
                                    <h3 className={sectionTitleStyles}><User size={20} className="text-[#ed1c24]" /> Applicant Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <label className={labelStyles}>First Name</label>
                                            <input suppressHydrationWarning type="text" className={inputStyles} value={step1Data.firstName} disabled />
                                        </div>
                                        <div>
                                            <label className={labelStyles}>Last Name</label>
                                            <input suppressHydrationWarning type="text" className={inputStyles} value={step1Data.lastName} disabled />
                                        </div>
                                        <div>
                                            <label className={labelStyles} htmlFor="middleName">Middle Name</label>
                                            <input suppressHydrationWarning type="text" id="middleName" className={inputStyles} value={personalData.middleName} onChange={handlePersonalChange} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className={cn(labelStyles, personalErrors.dob && "text-[#ed1c24]")} htmlFor="dob">
                                                Date of Birth (MM-DD-YYYY) {personalErrors.dob && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="dob" className={cn(inputStyles, personalErrors.dob && "border-[#ed1c24]/50")} placeholder="01-01-1990" value={personalData.dob} onChange={handlePersonalChange} required />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, personalErrors.ssn && "text-[#ed1c24]")} htmlFor="ssn">
                                                SSN or ITIN {personalErrors.ssn && <span className="ml-1">(INVALID)</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="ssn" className={cn(inputStyles, personalErrors.ssn && "border-[#ed1c24]/50")} placeholder="XXX-XX-XXXX" value={personalData.ssn} onChange={handlePersonalChange} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className={cn(labelStyles, personalErrors.driversLicense && "text-[#ed1c24]")} htmlFor="driversLicense">
                                                Driver's License No. {personalErrors.driversLicense && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="driversLicense" className={cn(inputStyles, personalErrors.driversLicense && "border-[#ed1c24]/50")} value={personalData.driversLicense} onChange={handlePersonalChange} required />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, personalErrors.dlState && "text-[#ed1c24]")} htmlFor="dlState">
                                                DL Issuing State {personalErrors.dlState && <span className="ml-1">*</span>}
                                            </label>
                                            <select suppressHydrationWarning id="dlState" className={cn(selectStyles, personalErrors.dlState && "border-[#ed1c24]/50")} value={personalData.dlState} onChange={handlePersonalChange} required>
                                                <option value="">SELECT STATE</option>
                                                {US_STATES.map(state => (
                                                    <option key={state.code} value={state.code}>{state.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className={labelStyles}>Email</label>
                                            <input suppressHydrationWarning type="email" className={inputStyles} value={step1Data.email} disabled />
                                        </div>
                                        <div>
                                            <label className={labelStyles} htmlFor="homePhone">Home Phone</label>
                                            <input suppressHydrationWarning type="tel" id="homePhone" className={inputStyles} value={personalData.homePhone} onChange={handlePersonalChange} />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, personalErrors.employmentStatus && "text-[#ed1c24]")} htmlFor="employmentStatus">
                                                Employment Status {personalErrors.employmentStatus && <span className="ml-1">*</span>}
                                            </label>
                                            <select suppressHydrationWarning id="employmentStatus" className={cn(selectStyles, personalErrors.employmentStatus && "border-[#ed1c24]/50")} value={personalData.employmentStatus} onChange={handlePersonalChange} required>
                                                <option value="">CHOOSE STATUS</option>
                                                <option value="employed">EMPLOYED</option>
                                                <option value="self-employed">SELF-EMPLOYED</option>
                                                <option value="retired">RETIRED</option>
                                                <option value="unemployed">UNEMPLOYED</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* Residence History */}
                                <section>
                                    <h3 className={sectionTitleStyles}><Building2 size={20} className="text-[#ed1c24]" /> Residence History (2 Years)</h3>
                                    {residenceHistory.map((res, index) => (
                                        <div key={index} className="p-6 bg-white/2 border border-white/5 mb-6 relative">
                                            {index > 0 && (
                                                <button suppressHydrationWarning type="button" onClick={() => removeResidence(index)} className="absolute top-4 right-4 text-white/30 hover:text-[#ed1c24] transition-colors cursor-pointer">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div className="md:col-span-2">
                                                    <label className={labelStyles}>Street Address</label>
                                                    <input suppressHydrationWarning type="text" id={`res-address-${index}`} className={inputStyles} value={res.address} onChange={(e) => handleResidenceChange(index, e)} required />
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>City</label>
                                                    <input suppressHydrationWarning type="text" id={`res-city-${index}`} className={inputStyles} value={res.city} onChange={(e) => handleResidenceChange(index, e)} required />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={labelStyles}>State</label>
                                                        <input suppressHydrationWarning type="text" id={`res-state-${index}`} className={inputStyles} value={res.state} onChange={(e) => handleResidenceChange(index, e)} required />
                                                    </div>
                                                    <div>
                                                        <label className={labelStyles}>Zip</label>
                                                        <input suppressHydrationWarning type="text" id={`res-zip-${index}`} className={inputStyles} value={res.zip} onChange={(e) => handleResidenceChange(index, e)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                                <div>
                                                    <label className={labelStyles}>Years</label>
                                                    <input suppressHydrationWarning type="number" id={`res-years-${index}`} className={inputStyles} value={res.years} onChange={(e) => handleResidenceChange(index, e)} required />
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>Months</label>
                                                    <input suppressHydrationWarning type="number" id={`res-months-${index}`} className={inputStyles} value={res.months} onChange={(e) => handleResidenceChange(index, e)} required />
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>Residence Type</label>
                                                    <select suppressHydrationWarning id={`res-type-${index}`} className={selectStyles} value={res.type} onChange={(e) => handleResidenceChange(index, e)} required>
                                                        <option value="">SELECT</option>
                                                        <option value="own">OWN</option>
                                                        <option value="rent">RENT</option>
                                                        <option value="other">OTHER</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>Monthly Pmt</label>
                                                    <input suppressHydrationWarning type="text" id={`res-amount-${index}`} className={inputStyles} placeholder="$0.00" value={res.amount} onChange={(e) => handleResidenceChange(index, e)} required />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button suppressHydrationWarning type="button" onClick={addResidence} className="text-[10px] font-black uppercase tracking-widest text-[#ed1c24] flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                                        <Plus size={14} /> Add Another Address
                                    </button>
                                </section>

                                {/* Work History */}
                                <section>
                                    <h3 className={sectionTitleStyles}><FileText size={20} className="text-[#ed1c24]" /> Work History (2 Years)</h3>
                                    {workHistory.map((work, index) => (
                                        <div key={index} className="p-6 bg-white/2 border border-white/5 mb-6 relative">
                                            {index > 0 && (
                                                <button suppressHydrationWarning type="button" onClick={() => removeWork(index)} className="absolute top-4 right-4 text-white/30 hover:text-[#ed1c24] transition-colors cursor-pointer">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label className={labelStyles}>Current Employer</label>
                                                    <input suppressHydrationWarning type="text" id={`work-employer-${index}`} className={inputStyles} value={work.employer} onChange={(e) => handleWorkChange(index, e)} required />
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>Job Title</label>
                                                    <input suppressHydrationWarning type="text" id={`work-jobTitle-${index}`} className={inputStyles} value={work.jobTitle} onChange={(e) => handleWorkChange(index, e)} required />
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>Gross Monthly Income</label>
                                                    <input suppressHydrationWarning type="text" id={`work-monthlyIncome-${index}`} className={inputStyles} placeholder="$0,000" value={work.monthlyIncome} onChange={(e) => handleWorkChange(index, e)} required />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className={labelStyles}>Years</label>
                                                        <input suppressHydrationWarning type="number" id={`work-years-${index}`} className={inputStyles} value={work.years} onChange={(e) => handleWorkChange(index, e)} required />
                                                    </div>
                                                    <div>
                                                        <label className={labelStyles}>Months</label>
                                                        <input suppressHydrationWarning type="number" id={`work-months-${index}`} className={inputStyles} value={work.months} onChange={(e) => handleWorkChange(index, e)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <label className={labelStyles}>Employer Address</label>
                                                    <input suppressHydrationWarning type="text" id={`work-address-${index}`} className={inputStyles} value={work.address} onChange={(e) => handleWorkChange(index, e)} required />
                                                </div>
                                                <div>
                                                    <label className={labelStyles}>Employer Phone</label>
                                                    <input suppressHydrationWarning type="tel" id={`work-phone-${index}`} className={inputStyles} value={work.phone} onChange={(e) => handleWorkChange(index, e)} required />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button suppressHydrationWarning type="button" onClick={addWork} className="text-[10px] font-black uppercase tracking-widest text-[#ed1c24] flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                                        <Plus size={14} /> Add Another Job
                                    </button>
                                </section>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {/* Business Information */}
                                <section>
                                    <h3 className={sectionTitleStyles}><Building2 size={20} className="text-[#ed1c24]" /> Business Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.legalName && "text-[#ed1c24]")} htmlFor="legalName">
                                                Company Legal Name {businessErrors.legalName && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="legalName" className={cn(inputStyles, businessErrors.legalName && "border-[#ed1c24]/50")} value={businessInfo.legalName} onChange={handleBusinessInfoChange} required />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.taxId && "text-[#ed1c24]")} htmlFor="taxId">
                                                Tax ID (EIN) {businessErrors.taxId && <span className="ml-1">(INVALID)</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="taxId" className={cn(inputStyles, businessErrors.taxId && "border-[#ed1c24]/50")} value={businessInfo.taxId} onChange={handleBusinessInfoChange} required />
                                        </div>
                                        <div>
                                            <label className={labelStyles} htmlFor="dba">Company Name (DBA)</label>
                                            <input suppressHydrationWarning type="text" id="dba" className={inputStyles} value={businessInfo.dba} onChange={handleBusinessInfoChange} />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.yearsInBusiness && "text-[#ed1c24]")} htmlFor="yearsInBusiness">
                                                Years In Business {businessErrors.yearsInBusiness && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="number" id="yearsInBusiness" className={cn(inputStyles, businessErrors.yearsInBusiness && "border-[#ed1c24]/50")} value={businessInfo.yearsInBusiness} onChange={handleBusinessInfoChange} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.phone && "text-[#ed1c24]")} htmlFor="biz-phone">
                                                Business Phone {businessErrors.phone && <span className="ml-1">(10 DIGITS)</span>}
                                            </label>
                                            <input suppressHydrationWarning type="tel" id="biz-phone" className={cn(inputStyles, businessErrors.phone && "border-[#ed1c24]/50")} value={businessInfo.phone} onChange={handleBusinessInfoChange} required />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.email && "text-[#ed1c24]")} htmlFor="biz-email">
                                                Business Email {businessErrors.email && <span className="ml-1">(INVALID)</span>}
                                            </label>
                                            <input suppressHydrationWarning type="email" id="biz-email" className={cn(inputStyles, businessErrors.email && "border-[#ed1c24]/50")} value={businessInfo.email} onChange={handleBusinessInfoChange} required />
                                        </div>
                                    </div>
                                </section>

                                {/* Business Address */}
                                <section>
                                    <h3 className={sectionTitleStyles}><ShieldCheck size={20} className="text-[#ed1c24]" /> Business Address</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="md:col-span-2">
                                            <label className={cn(labelStyles, businessErrors.street && "text-[#ed1c24]")} htmlFor="street">
                                                Street Address {businessErrors.street && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="street" className={cn(inputStyles, businessErrors.street && "border-[#ed1c24]/50")} value={businessAddress.street} onChange={handleBusinessAddressChange} required />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.city && "text-[#ed1c24]")} htmlFor="city">
                                                City {businessErrors.city && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="city" className={cn(inputStyles, businessErrors.city && "border-[#ed1c24]/50")} value={businessAddress.city} onChange={handleBusinessAddressChange} required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={cn(labelStyles, businessErrors.state && "text-[#ed1c24]")} htmlFor="state">
                                                    State {businessErrors.state && <span className="ml-1">*</span>}
                                                </label>
                                                <input suppressHydrationWarning type="text" id="state" className={cn(inputStyles, businessErrors.state && "border-[#ed1c24]/50")} value={businessAddress.state} onChange={handleBusinessAddressChange} required />
                                            </div>
                                            <div>
                                                <label className={cn(labelStyles, businessErrors.zip && "text-[#ed1c24]")} htmlFor="zip">
                                                    Zip {businessErrors.zip && <span className="ml-1">*</span>}
                                                </label>
                                                <input suppressHydrationWarning type="text" id="zip" className={cn(inputStyles, businessErrors.zip && "border-[#ed1c24]/50")} value={businessAddress.zip} onChange={handleBusinessAddressChange} required />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Income Information */}
                                <section>
                                    <h3 className={sectionTitleStyles}><Plus size={20} className="text-[#ed1c24]" /> Income Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.grossProfit && "text-[#ed1c24]")} htmlFor="grossProfit">
                                                Gross Profit (Monthly) {businessErrors.grossProfit && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="grossProfit" className={cn(inputStyles, businessErrors.grossProfit && "border-[#ed1c24]/50")} placeholder="$0,000" value={businessIncome.grossProfit} onChange={handleBusinessIncomeChange} required />
                                        </div>
                                        <div>
                                            <label className={cn(labelStyles, businessErrors.annualSales && "text-[#ed1c24]")} htmlFor="annualSales">
                                                Annual Sales {businessErrors.annualSales && <span className="ml-1">*</span>}
                                            </label>
                                            <input suppressHydrationWarning type="text" id="annualSales" className={cn(inputStyles, businessErrors.annualSales && "border-[#ed1c24]/50")} placeholder="$0,000,000" value={businessIncome.annualSales} onChange={handleBusinessIncomeChange} required />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Signature Section */}
                        <section className="pt-12 border-t border-white/10">
                            <h3 className={sectionTitleStyles}><FileText size={20} className="text-[#ed1c24]" /> Terms and Conditions</h3>
                            <div className="p-6 bg-white/5 border border-white/10 mb-8 max-h-48 overflow-y-auto scrollbar-hide">
                                <p className="text-[11px] text-white/50 leading-relaxed">
                                    I certify that the above information is true and complete to the best of my knowledge. I authorize K2 Auto Group to check my credit and employment history, obtain credit reports, and/or to submit my application to one or more financial institutions for the purpose of securing credit.
                                </p>
                            </div>
                            <div>
                                <label className={cn(labelStyles, signatureError && "text-[#ed1c24]")} htmlFor="signature">
                                    Type Full Name to Sign {signatureError && <span className="ml-1">*</span>}
                                </label>
                                <input suppressHydrationWarning 
                                    type="text" id="signature" className={cn(inputStyles, "font-serif italic text-2xl", signatureError && "border-[#ed1c24]/50")} 
                                    placeholder="John Doe" value={signature} onChange={(e) => {
                                        setSignature(e.target.value);
                                        if (signatureError) setSignatureError(false);
                                    }} required 
                                />
                            </div>
                        </section>

                        {error && (
                            <p className="text-[#ed1c24] text-xs font-bold uppercase tracking-widest text-center">{error}</p>
                        )}

                        <div className="flex gap-4 pt-8">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 bg-white/5 text-white py-5 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <ChevronLeft size={20} /> Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="flex-[2] bg-[#ed1c24] text-white py-5 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#c4161b] transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {isSending ? <Loader2 className="animate-spin" size={20} /> : 'Submit Application'}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PreApproveForm;
