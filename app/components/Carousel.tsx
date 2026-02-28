"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselItem {
  id: string;
  title: string;
  priceAfter: number;
  priceBefore?: number;
  description?: string;
  imageUrl: string;
}

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const [current, setCurrent] = useState(0);
  const length = items.length;

  useEffect(() => {
    if (length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(items) || length === 0) return null;

  const next = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div className="relative bg-[#080c10] px-6 md:px-12 pb-24">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

      <div className="max-w-[1400px] mx-auto">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 pb-8">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
            Ofertas destacadas
          </span>
        </div>

        {/* Track wrapper */}
        <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/6 h-[420px] md:h-[380px]">

          {/* Slides */}
          <div
            className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full h-full flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 md:gap-12"
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex-1 relative flex items-center justify-center min-h-[160px]">
                  <div
                    className="absolute w-52 h-52 rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                      filter: "blur(50px)",
                    }}
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="relative z-10 w-full h-full max-h-[280px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-5 text-center md:text-left">
                  {/* Badge */}
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-3 py-1 rounded">
                      Oferta limitada
                    </span>
                  </div>

                  <h3 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white tracking-wide leading-none m-0">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2 m-0">
                    {item.description || "Potencia extrema para tus proyectos más exigentes."}
                  </p>

                  <div className="flex items-baseline gap-4 justify-center md:justify-start">
                    {item.priceBefore && (
                      <span className="text-xl text-white/20 line-through">${item.priceBefore}</span>
                    )}
                    <span className="font-['Bebas_Neue'] text-5xl text-indigo-500 tracking-wide leading-none">
                      ${item.priceAfter}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/593963351521?text=${encodeURIComponent(`Hola! Me interesa la oferta de la ${item.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase px-7 py-3.5 rounded-lg transition-all w-fit mx-auto md:mx-0"
                  >
                    <FaWhatsapp size={14} />
                    Lo quiero ahora
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow controls */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg bg-[#080c10]/80 border border-white/8 text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          >
            <FaChevronLeft size={13} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg bg-[#080c10]/80 border border-white/8 text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          >
            <FaChevronRight size={13} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-0.5 rounded-full transition-all border-none cursor-pointer ${i === current ? "w-8 bg-indigo-500" : "w-4 bg-white/15"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}