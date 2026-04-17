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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {brands.map((b) => (
            <div key={b.name} className="relative aspect-[3/4] overflow-hidden group">
              <img 
                src={b.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
                alt={b.name}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center group-hover:bg-[#ed1c24]/20 transition-all">
                <span className="text-white text-condensed text-3xl tracking-tight italic drop-shadow-lg font-black">{b.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
