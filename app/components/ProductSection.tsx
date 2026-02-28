"use client";

import ProductCard from "./ProductCard";

export default function ProductSection({ title, products = [] }: { title: string; products?: any[] }) {
  return (
    <section className="relative bg-[#080c10] px-6 md:px-12 py-24 overflow-hidden">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-indigo-500" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
                Catálogo · {new Date().getFullYear()}
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white tracking-wide leading-none m-0">
              {title}
            </h2>
          </div>
          <span className="text-[11px] text-white/20 tracking-[0.15em] uppercase pb-1">
            {products.length} equipos disponibles
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((item) => (
            <ProductCard key={item.id} laptop={item} />
          ))}
        </div>
      </div>
    </section>
  );
}