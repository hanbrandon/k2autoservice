"use client";

const brands = [
  { name: "BMW", img: "https://picsum.photos/seed/bmw/600/800" },
  { name: "MERCEDES", img: "https://picsum.photos/seed/mercedes/600/800" },
  { name: "PORSCHE", img: "https://picsum.photos/seed/porsche/600/800" },
  { name: "AUDI", img: "https://picsum.photos/seed/audi/600/800" },
  { name: "LEXUS", img: "https://picsum.photos/seed/lexus/600/800" }
];

const Partners = () => {
  return (
    <section id="partners" className="py-32 px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="section-title text-center mb-20 whitespace-normal">AUTHORIZED PARTNERS & BRANDS</h2>
        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 md:gap-6 scrollbar-hide snap-x snap-mandatory">
          {brands.map((b) => (
            <div key={b.name} className="relative min-w-[65vw] md:min-w-0 aspect-[3/4] overflow-hidden group snap-center">
              <img 
                src={b.img} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
                alt={b.name}
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 text-center group-hover:bg-[#ed1c24]/30 transition-all duration-500">
                <span className="text-white text-condensed text-xl md:text-2xl tracking-[0.2em] italic font-black uppercase">{b.name}</span>
              </div>
            </div>
          ))}
          <div className="min-w-[10vw] md:hidden" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
