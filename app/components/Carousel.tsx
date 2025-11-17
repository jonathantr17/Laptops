"use client";

import { useState, useEffect } from "react";

interface CarouselItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const length = items.length;

  // Avance automático cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(items) || length === 0) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg h-64 md:h-96">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map(item => (
          <div key={item.id} className="flex-shrink-0 w-full relative">
            <img src={item.image} alt={item.name} className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones */}
      <button
        onClick={() => setCurrent(current === 0 ? length - 1 : current - 1)}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrent(current === length - 1 ? 0 : current + 1)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
}