'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    ACQUISITION_FEES,
    calcRegFee,
    CA_DMV_CONSTANTS,
} from '@/constants/dmv';
import { cn } from '@/utils/cn';
import { BUSINESS_INFO } from '@/utils/businessInfo';
import {
    ChevronDown,
    X,
    Printer,
    Calculator,
    Car,
    ShoppingBag,
    History,
    Mail,
    Phone,
    User,
    ExternalLink,
} from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'leasing' | 'purchasing' | 'used'>('leasing');
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // Leasing State
    const [leaseParams, setLeaseParams] = useState({
        model: '',
        msrp: '',
        capCost: '',
        moneyFactor: '',
        residual: '',
        term: '36',
        driveOff: '0',
        rebate: '0',
        acqFee: 925,
        acqBrand: 'BMW / MINI',
        taxRate: '10.25',
    });
    const [leaseResult, setLeaseResult] = useState<any>(null);
    const [isAcqOpen, setIsAcqOpen] = useState(false);

    // Purchase State
    const [purchaseParams, setPurchaseParams] = useState({
        model: '',
        price: '',
        down: '',
        term: '60',
        apr: '5.9',
        taxRate: '10.25',
        rebate: '0',
        accessories: '0',
        kbb: '',
    });
    const [purchaseResult, setPurchaseResult] = useState<any>(null);

    // Used State
    const [usedParams, setUsedParams] = useState({
        model: '',
        price: '',
        down: '',
        term: '60',
        apr: '6.9',
        taxRate: '10.25',
        rebate: '0',
        kbb: '',
    });
    const [usedResult, setUsedResult] = useState<any>(null);

    const fmt = (n: number) =>
        '$' +
        n.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const calculateLease = () => {
        const msrp = parseFloat(leaseParams.msrp) || 0;
        const cap = parseFloat(leaseParams.capCost) || 0;
        const mf = parseFloat(leaseParams.moneyFactor) || 0;
        const res_in = parseFloat(leaseParams.residual) || 0;
        const term = parseFloat(leaseParams.term) || 0;
        const driveoff = parseFloat(leaseParams.driveOff) || 0;
        const rebate = parseFloat(leaseParams.rebate) || 0;
        const acq = leaseParams.acqFee;
        const tax_rate = parseFloat(leaseParams.taxRate) || 0;

        if (!msrp || !cap || !mf || !res_in || !term) return;

        const reg = calcRegFee(cap);
        const lt = 1 + tax_rate / 100;
        const tax_adj = 1 - tax_rate / 100;
        const tax_adj1 = 1 - (tax_rate / 100) * (tax_rate / 100);

        const cost = acq + reg + CA_DMV_CONSTANTS.OTHER_FEES;
        const drive = driveoff + rebate;
        const acc_sub1 = cost - driveoff - rebate;
        const sell_c = cap + acc_sub1;
        const acc = cap + tax_adj * acc_sub1;
        const mm = term * mf;
        const mm1 = mm + 1;
        const mm2 = mm - 1;

        let lr, lr_disp;
        if (res_in < 100) {
            lr = msrp * (res_in / 100);
            lr_disp = `${res_in.toFixed(2)}% = ${fmt(lr)}`;
        } else {
            lr = res_in;
            lr_disp = `${fmt(lr)} (${((res_in / msrp) * 100).toFixed(2)}%)`;
        }

        const lease =
            drive <= cost
                ? (sell_c * mm1 + lr * mm2) / (term - lt * mm1)
                : (acc * mm1 + lr * mm2) / (term - tax_adj1 * mm1);

        const ltax = lease * (lt - 1);
        const ltotal = lease * lt;

        setLeaseResult({
            monthly: ltotal,
            base: lease,
            tax: ltax,
            residual: lr_disp,
            reg: reg,
            apr: (mf * 2400).toFixed(2) + '%',
        });
    };

    const calculatePurchase = () => {
        const price = parseFloat(purchaseParams.price) || 0;
        const acc_v = parseFloat(purchaseParams.accessories) || 0;
        const down = parseFloat(purchaseParams.down) || 0;
        const term = parseFloat(purchaseParams.term) || 0;
        const apr = parseFloat(purchaseParams.apr) || 0;
        const tax_r = parseFloat(purchaseParams.taxRate) || 0;
        const rebate = parseFloat(purchaseParams.rebate) || 0;
        const kbb = parseFloat(purchaseParams.kbb) || 0;

        if (!price || !term) return;

        const st = 1 + tax_r / 100;
        const reg = calcRegFee(price);
        const taxAmt = (price + acc_v + CA_DMV_CONSTANTS.DOCUMENT_FEE) * (st - 1);
        const otd1 = (price + acc_v + CA_DMV_CONSTANTS.DOCUMENT_FEE) * st;
        const otd = otd1 + reg - down - rebate + CA_DMV_CONSTANTS.ELECTRONIC_FILING;
        const fin = otd;

        const r = apr / 100 / 12;
        let pay = 0;
        if (r > 0) {
            pay = (fin * (r * Math.pow(1 + r, term))) / (Math.pow(1 + r, term) - 1);
        } else {
            pay = fin / term;
        }

        setPurchaseResult({
            monthly: pay,
            otd: otd + down,
            fin: fin,
            charge: pay * term - fin,
            tax: taxAmt,
            reg: reg,
            ltv: kbb > 0 ? (((otd + down) / kbb) * 100).toFixed(1) + '%' : '-',
        });
    };

    const calculateUsed = () => {
        const price = parseFloat(usedParams.price) || 0;
        const down = parseFloat(usedParams.down) || 0;
        const term = parseFloat(usedParams.term) || 0;
        const apr = parseFloat(usedParams.apr) || 0;
        const tax_r = parseFloat(usedParams.taxRate) || 0;
        const rebate = parseFloat(usedParams.rebate) || 0;
        const kbb = parseFloat(usedParams.kbb) || 0;

        if (!price || !term) return;

        const st = 1 + tax_r / 100;
        const reg = calcRegFee(price);
        const taxAmt = (price + CA_DMV_CONSTANTS.DOCUMENT_FEE) * (st - 1);
        const otd1 = (price + CA_DMV_CONSTANTS.DOCUMENT_FEE) * st;
        const otd = otd1 + reg - down - rebate + CA_DMV_CONSTANTS.ELECTRONIC_FILING;
        const fin = otd;

        const r = apr / 100 / 12;
        let pay = 0;
        if (r > 0) {
            pay = (fin * (r * Math.pow(1 + r, term))) / (Math.pow(1 + r, term) - 1);
        } else {
            pay = fin / term;
        }

        setUsedResult({
            monthly: pay,
            otd: otd + down,
            fin: fin,
            charge: pay * term - fin,
            tax: taxAmt,
            reg: reg,
            ltv: kbb > 0 ? ((fin / kbb) * 100).toFixed(1) + '%' : '-',
        });
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        if (activeTab === 'leasing') calculateLease();
        if (activeTab === 'purchasing') calculatePurchase();
        if (activeTab === 'used') calculateUsed();
    }, [leaseParams, purchaseParams, usedParams, activeTab]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ed1c24] selection:text-white print:bg-white print:text-black">
            <div className="print:hidden">
                <Navbar />
            </div>

            <main className="pt-32 pb-20 px-6 md:px-10 print:pt-0 print:pb-0 print:px-0">
                <div className="max-w-7xl mx-auto print:max-w-none print:m-0">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 print:hidden">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-condensed text-5xl md:text-7xl font-black uppercase leading-none mb-6"
                            >
                                K2 <span className="text-[#ed1c24]">ADMIN</span>
                            </motion.h1>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: 'Tax Rate', href: 'https://www.cdtfa.ca.gov/taxes-and-fees/rates.aspx' },
                                    { label: 'Carfax', href: 'https://www.carfaxonline.com' },
                                    { label: 'QuickValue', href: 'https://www.quickvalues.com/' },
                                    { label: 'Manheim', href: 'https://www.manheim.com' },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-black tracking-widest uppercase py-2.5 px-6 border border-white/10 text-white/40 hover:text-white hover:border-[#ed1c24] transition-all flex items-center gap-2"
                                    >
                                        {link.label} <ExternalLink size={10} />
                                    </a>
                                ))}
                                <button
                                    onClick={handlePrint}
                                    className="text-[10px] font-black tracking-widest uppercase py-2.5 px-6 border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    Print <Printer size={12} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/5 border border-white/5 px-8 py-5">
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c24] shadow-lg shadow-[#ed1c24]/50" />
                                CA DMV 2025–2026
                            </span>
                            <span className="opacity-20">|</span>
                            <span>VLF 0.65%</span>
                        </div>
                    </div>

                    {/* Print Header */}
                    <div className="hidden print:block mb-6 border-b-2 border-[#ed1c24] pb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-black uppercase leading-none m-0">
                                    K2 <span className="text-[#ed1c24]">AUTO</span> GROUP
                                </h1>
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] mt-2 text-gray-500">
                                    Premium Automotive Solutions & Sales
                                </p>
                            </div>
                            <div className="text-right text-[8px] leading-tight text-gray-600 font-bold uppercase tracking-tight">
                                {BUSINESS_INFO.address}
                                <br />
                                Tel: {BUSINESS_INFO.phone} | {BUSINESS_INFO.email}
                            </div>
                        </div>
                    </div>

                    {/* Print Client Info (Compact) */}
                    <div className="hidden print:grid grid-cols-3 gap-4 mb-6 py-4 border-b border-gray-100">
                        <div>
                            <p className="text-[7px] font-black text-gray-400 uppercase mb-1">Client Name</p>
                            <p className="text-[10px] font-bold text-black uppercase">{customer.name || '—'}</p>
                        </div>
                        <div>
                            <p className="text-[7px] font-black text-gray-400 uppercase mb-1">Email Address</p>
                            <p className="text-[10px] font-bold text-black uppercase">{customer.email || '—'}</p>
                        </div>
                        <div>
                            <p className="text-[7px] font-black text-gray-400 uppercase mb-1">Phone Number</p>
                            <p className="text-[10px] font-bold text-black uppercase">{customer.phone || '—'}</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-white/5 border border-white/5 p-1 mb-10 print:hidden">
                        {[
                            { id: 'leasing', label: 'Leasing', icon: Car },
                            { id: 'purchasing', label: 'Purchasing', icon: ShoppingBag },
                            { id: 'used', label: 'Used Vehicle', icon: History },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    'flex-1 flex items-center justify-center gap-3 py-5 text-[11px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer',
                                    activeTab === tab.id
                                        ? 'bg-[#ed1c24] text-white'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                )}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 print:grid-cols-1 print:gap-6">
                        {/* Left Side: Inputs */}
                        <div className="lg:col-span-7 space-y-10 print:space-y-4">
                            {/* Customer Info (Screen Only) */}
                            <div className="bg-white/5 border border-white/5 p-8 md:p-10 print:hidden">
                                <div className="flex items-center gap-4 mb-8">
                                    <User size={18} className="text-[#ed1c24]" />
                                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">
                                        Client Information
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { id: 'name', label: 'Full Name', placeholder: 'JOHN DOE' },
                                        { id: 'email', label: 'Email', placeholder: 'HELLO@K2GROUP.US' },
                                        { id: 'phone', label: 'Phone', placeholder: '(000) 000-0000' },
                                    ].map((f) => (
                                        <div key={f.id} className="space-y-3">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                                {f.label}
                                            </label>
                                            <input
                                                type="text"
                                                value={(customer as any)[f.id]}
                                                onChange={(e) => setCustomer({ ...customer, [f.id]: e.target.value })}
                                                placeholder={f.placeholder}
                                                className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#ed1c24] transition-all font-bold uppercase text-sm tracking-tight"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Calculator Inputs */}
                            <div className="bg-white/5 border border-white/5 p-8 md:p-10 print:bg-white print:border print:border-gray-100 print:p-6 print:rounded-xl">
                                <div className="flex items-center gap-4 mb-10 print:mb-4">
                                    <Calculator size={18} className="text-[#ed1c24] print:w-3 print:h-3" />
                                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 print:text-[8px] print:text-gray-400">
                                        {activeTab === 'leasing' ? 'Lease Terms' : 'Sale Details'}
                                    </h2>
                                </div>

                                <div className="space-y-8 print:space-y-4">
                                    {/* Model Info */}
                                    <div className="space-y-3 print:space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 print:text-[7px] print:text-gray-400">
                                            Year / Make / Model
                                        </label>
                                        <input
                                            value={activeTab === 'leasing' ? leaseParams.model : activeTab === 'purchasing' ? purchaseParams.model : usedParams.model}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (activeTab === 'leasing') setLeaseParams({ ...leaseParams, model: val });
                                                else if (activeTab === 'purchasing') setPurchaseParams({ ...purchaseParams, model: val });
                                                else setUsedParams({ ...usedParams, model: val });
                                            }}
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#ed1c24] transition-all font-black text-xl uppercase tracking-tighter print:text-black print:border-gray-200 print:text-base print:py-1 print:font-bold"
                                            placeholder="E.G. 2025 PORSCHE 911 GT3"
                                        />
                                    </div>

                                    {activeTab === 'leasing' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-3 print:gap-x-6 print:gap-y-4">
                                            <InputGroup label="MSRP" value={leaseParams.msrp} onChange={(v: string) => setLeaseParams({ ...leaseParams, msrp: v })} prefix="$" />
                                            <InputGroup label="Selling Price" value={leaseParams.capCost} onChange={(v: string) => setLeaseParams({ ...leaseParams, capCost: v })} prefix="$" />
                                            <InputGroup label="Residual Value" value={leaseParams.residual} onChange={(v: string) => setLeaseParams({ ...leaseParams, residual: v })} placeholder="55% or $" />
                                            <InputGroup label="Money Factor" value={leaseParams.moneyFactor} onChange={(v: string) => setLeaseParams({ ...leaseParams, moneyFactor: v })} placeholder="0.00125" />
                                            <InputGroup label="Term (Months)" value={leaseParams.term} onChange={(v: string) => setLeaseParams({ ...leaseParams, term: v })} />
                                            <InputGroup label="Drive Off" value={leaseParams.driveOff} onChange={(v: string) => setLeaseParams({ ...leaseParams, driveOff: v })} prefix="$" />
                                            <InputGroup label="Rebate" value={leaseParams.rebate} onChange={(v: string) => setLeaseParams({ ...leaseParams, rebate: v })} prefix="$" />
                                            <InputGroup label="Tax Rate" value={leaseParams.taxRate} onChange={(v: string) => setLeaseParams({ ...leaseParams, taxRate: v })} suffix="%" />
                                            <div className="space-y-3 print:space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-white/20 print:text-[7px] print:text-gray-400">
                                                    Acq. Fee
                                                </label>
                                                <div className="relative print:hidden">
                                                    <button
                                                        onClick={() => setIsAcqOpen(!isAcqOpen)}
                                                        className="w-full bg-black/40 border border-white/5 py-4 px-6 flex items-center justify-between hover:border-[#ed1c24] transition-all text-left uppercase text-[10px] font-black tracking-widest"
                                                    >
                                                        <span>{leaseParams.acqBrand} - {fmt(leaseParams.acqFee)}</span>
                                                        <ChevronDown size={14} className={cn('transition-transform duration-300', isAcqOpen && 'rotate-180')} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {isAcqOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 5 }}
                                                                className="absolute z-50 left-0 right-0 top-full mt-2 bg-[#111] border border-white/10 shadow-2xl max-h-60 overflow-y-auto"
                                                            >
                                                                {ACQUISITION_FEES.map((fee) => (
                                                                    <button
                                                                        key={fee.brand}
                                                                        onClick={() => {
                                                                            setLeaseParams({ ...leaseParams, acqFee: fee.fee, acqBrand: fee.brand });
                                                                            setIsAcqOpen(false);
                                                                        }}
                                                                        className="w-full flex items-center justify-between p-4 hover:bg-[#ed1c24] hover:text-white transition-colors border-b border-white/5 last:border-0 text-[10px] font-black uppercase tracking-widest"
                                                                    >
                                                                        <span>{fee.brand}</span>
                                                                        <span>${fee.fee.toLocaleString()}</span>
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                <div className="hidden print:block border-b border-gray-200 py-1 font-bold text-[10px] text-black">
                                                    {leaseParams.acqBrand} ({fmt(leaseParams.acqFee)})
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(activeTab === 'purchasing' || activeTab === 'used') && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-3 print:gap-x-6 print:gap-y-4">
                                            {activeTab === 'purchasing' ? (
                                                <>
                                                    <InputGroup label="Selling Price" value={purchaseParams.price} onChange={(v: string) => setPurchaseParams({ ...purchaseParams, price: v })} prefix="$" />
                                                    <InputGroup label="Down Payment" value={purchaseParams.down} onChange={(v: string) => setPurchaseParams({ ...purchaseParams, down: v })} prefix="$" />
                                                    <InputGroup label="Accessories" value={purchaseParams.accessories} onChange={(v: string) => setPurchaseParams({ ...purchaseParams, accessories: v })} prefix="$" />
                                                    <InputGroup label="APR (%)" value={purchaseParams.apr} onChange={(v: string) => setPurchaseParams({ ...purchaseParams, apr: v })} suffix="%" />
                                                    <InputGroup label="Term (Months)" value={purchaseParams.term} onChange={(v: string) => setPurchaseParams({ ...purchaseParams, term: v })} />
                                                    <InputGroup label="KBB Value" value={purchaseParams.kbb} onChange={(v: string) => setPurchaseParams({ ...purchaseParams, kbb: v })} prefix="$" />
                                                </>
                                            ) : (
                                                <>
                                                    <InputGroup label="Selling Price" value={usedParams.price} onChange={(v: string) => setUsedParams({ ...usedParams, price: v })} prefix="$" />
                                                    <InputGroup label="Down Payment" value={usedParams.down} onChange={(v: string) => setUsedParams({ ...usedParams, down: v })} prefix="$" />
                                                    <InputGroup label="APR (%)" value={usedParams.apr} onChange={(v: string) => setUsedParams({ ...usedParams, apr: v })} suffix="%" />
                                                    <InputGroup label="Term (Months)" value={usedParams.term} onChange={(v: string) => setUsedParams({ ...usedParams, term: v })} />
                                                    <InputGroup label="KBB Value" value={usedParams.kbb} onChange={(v: string) => setUsedParams({ ...usedParams, kbb: v })} prefix="$" />
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Results */}
                        <div className="lg:col-span-5 print:col-span-1">
                            <div className="sticky top-32 space-y-8 print:static print:space-y-4">
                                {/* Main Result Card */}
                                <div className="bg-[#ed1c24] text-white p-10 md:p-12 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-2 print:border-[#ed1c24] print:shadow-none print:p-6 print:rounded-xl">
                                    <div className="relative z-10">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60 print:text-gray-400 print:mb-2 print:text-[8px]">
                                            Monthly Payment
                                        </h3>
                                        <div className="text-condensed text-7xl md:text-8xl font-black leading-none tracking-tighter mb-4 print:text-5xl print:mb-1">
                                            {activeTab === 'leasing' ? (leaseResult ? fmt(leaseResult.monthly) : '$0.00') : activeTab === 'purchasing' ? (purchaseResult ? fmt(purchaseResult.monthly) : '$0.00') : (usedResult ? fmt(usedResult.monthly) : '$0.00')}
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-60 print:text-gray-500 print:text-[7px]">
                                            <span>Including Sales Tax</span>
                                            {activeTab === 'leasing' && leaseResult && (
                                                <>
                                                    <span>•</span>
                                                    <span>Base: {fmt(leaseResult.base)}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {/* Decorative Icon (Screen Only) */}
                                    <div className="absolute -bottom-10 -right-10 opacity-10 print:hidden">
                                        <Calculator size={200} />
                                    </div>
                                </div>

                                {/* Detailed Breakdown Card */}
                                <div className="bg-white/5 border border-white/5 p-10 md:p-12 print:bg-white print:border print:border-gray-100 print:p-6 print:rounded-xl">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10 print:text-gray-400 print:mb-4 print:text-[8px]">
                                        Operational Breakdown
                                    </h4>
                                    <div className="space-y-6 print:space-y-2">
                                        {activeTab === 'leasing' && leaseResult && (
                                            <>
                                                <ResultRow label="Registration / DMV" value={fmt(leaseResult.reg)} />
                                                <ResultRow label="Monthly Tax" value={fmt(leaseResult.tax)} />
                                                <ResultRow label="Residual Value" value={leaseResult.residual} />
                                                <ResultRow label="Effective APR" value={leaseResult.apr} />
                                            </>
                                        )}
                                        {activeTab === 'purchasing' && purchaseResult && (
                                            <>
                                                <ResultRow label="Out the Door (OTD)" value={fmt(purchaseResult.otd)} highlight />
                                                <ResultRow label="Total Financed" value={fmt(purchaseResult.fin)} />
                                                <ResultRow label="Sales Tax Amount" value={fmt(purchaseResult.tax)} />
                                                <ResultRow label="Registration / DMV" value={fmt(purchaseResult.reg)} />
                                                <ResultRow label="LTV Ratio" value={purchaseResult.ltv} />
                                                <ResultRow label="Total Interest" value={fmt(purchaseResult.charge)} />
                                            </>
                                        )}
                                        {activeTab === 'used' && usedResult && (
                                            <>
                                                <ResultRow label="Out the Door (OTD)" value={fmt(usedResult.otd)} highlight />
                                                <ResultRow label="Total Financed" value={fmt(usedResult.fin)} />
                                                <ResultRow label="Sales Tax Amount" value={fmt(usedResult.tax)} />
                                                <ResultRow label="Registration / DMV" value={fmt(usedResult.reg)} />
                                                <ResultRow label="LTV Ratio" value={usedResult.ltv} />
                                                <ResultRow label="Total Interest" value={fmt(usedResult.charge)} />
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Admin Notice */}
                                <div className="p-8 bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest leading-loose text-white/20 print:text-[7px] print:text-gray-400 print:border-none print:p-0 print:mt-4 print:leading-normal">
                                    NOTICE: This calculator is for internal estimation purposes only. Final figures are subject to lender approval, primary bank validation, and finalized DMV fee assessments. All calculations based on 2025 CA DMV protocols.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="print:hidden">
                <Footer />
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 0.5cm; size: auto; }
                    body { background-color: white !important; color: black !important; -webkit-print-color-adjust: exact; }
                    .print-hidden { display: none !important; }
                    * { box-shadow: none !important; }
                }
            `}</style>
        </div>
    );
}

function InputGroup({ label, value, onChange, prefix, suffix, placeholder }: any) {
    return (
        <div className="space-y-3 print:space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 print:text-[7px] print:text-gray-400">
                {label}
            </label>
            <div className="relative">
                {prefix && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 font-bold print:text-gray-400 print:text-[10px] print:left-0">
                        {prefix}
                    </span>
                )}
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#ed1c24] transition-all font-bold text-sm tracking-tight print:text-black print:border-gray-200 print:py-1 print:text-[10px]",
                        prefix && "pl-6 print:pl-3",
                        suffix && "pr-6 print:pr-3"
                    )}
                />
                {suffix && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 font-bold print:text-gray-400 print:text-[10px] print:right-0">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}

function ResultRow({ label, value, highlight }: any) {
    return (
        <div className={cn(
            "flex justify-between items-center py-4 border-b border-white/5 last:border-0 print:border-gray-100 print:py-1.5",
            highlight && "border-b-2 border-white/10 pb-6 mb-6 print:border-b print:pb-2 print:mb-2"
        )}>
            <span className={cn(
                "text-[9px] font-black uppercase tracking-widest print:text-[7px]",
                highlight ? "text-[#ed1c24]" : "text-white/40 print:text-gray-500"
            )}>
                {label}
            </span>
            <span className={cn(
                "font-black tracking-tight",
                highlight ? "text-2xl print:text-base print:text-black" : "text-sm text-white print:text-[10px] print:text-black"
            )}>
                {value}
            </span>
        </div>
    );
}
