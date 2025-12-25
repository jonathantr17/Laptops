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

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const length = items.length;

  useEffect(() => {
    if (length === 0) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(items) || length === 0) return null;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div className="relative w-full max-w-6xl mx-auto group">
      {/* Contenedor Principal */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900/40 border border-white/5 backdrop-blur-sm h-[450px] md:h-[400px]">
        
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map(item => (
            <div key={item.id} className="flex-shrink-0 w-full h-full flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
              
              {/* 🖼️ Imagen con resplandor */}
              <div className="w-full md:w-1/2 h-48 md:h-full relative flex items-center justify-center">
                <div className="absolute w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full"></div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* 📝 Info de la Oferta */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-6">
                <div>
                  <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">
                    Oferta Limitada
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm md:text-base font-medium line-clamp-2">
                  {item.description || "Potencia extrema para tus proyectos más exigentes."}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  {item.priceBefore && (
                    <span className="line-through text-gray-600 text-xl font-bold">
                      ${item.priceBefore}
                    </span>
                  )}
                  <span className="text-indigo-500 font-black text-4xl tracking-tighter">
                    ${item.priceAfter}
                  </span>
                </div>

                <div className="pt-4">
                  <a
                    href={`https://wa.me/593963351521?text=${encodeURIComponent(`Hola! Me interesa la oferta de la ${item.title}`)}`}
                    target="_blank"
                    className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                  >
                    <FaWhatsapp className="text-xl" />
                    LO QUIERO AHORA
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🎮 Controles Flechas */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600"
        >
          <FaChevronRight />
        </button>

        {/* 🔘 Indicadores (Puntos) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all rounded-full ${
                current === index ? "w-8 bg-indigo-500" : "w-2 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}