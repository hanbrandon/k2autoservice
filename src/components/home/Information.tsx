"use client";

import { Clock, ArrowRight, MapPin } from "lucide-react";

const items = [
  {
    title: "SERVICE HOURS",
    desc: "Maintenance & Repairs",
    details: ["Mon ~ Fri: 08:00 AM - 07:00 PM", "Sat: 09:00 AM - 05:00 PM", "Sun: Closed"],
    icon: <Clock size={40} className="text-black" />
  },
  {
    title: "SALES CENTER",
    desc: "Showroom Hours",
    details: ["Mon ~ Sat: 09:00 AM - 08:00 PM", "Sun: 11:00 AM - 05:00 PM"],
    icon: <ArrowRight size={40} className="text-black" />
  },
  {
    title: "DMV SERVICES",
    desc: "Express Processing",
    details: ["Walk-ins welcome: 09:00 AM - 04:00 PM", "Title transfers & registration updates"],
    icon: <MapPin size={40} className="text-black" />
  }
];

const Information = () => {
  return (
    <section id="information" className="py-32 px-10 bg-[#fefefe]">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="section-title">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {items.map((item) => (
            <div key={item.title} className="relative group border-t border-black/10 pt-10">
              <h3 className="text-condensed text-4xl mb-6">{item.title}</h3>
              <div className="space-y-4 mb-10 min-h-[120px]">
                <p className="font-black text-lg text-[#ed1c24] tracking-tight italic uppercase">{item.desc}</p>
                {item.details.map((d, i) => (
                  <p key={i} className="text-sm text-black/60 leading-relaxed font-medium">{d}</p>
                ))}
              </div>
              <div className="flex justify-end pr-4 opacity-50 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Information;
