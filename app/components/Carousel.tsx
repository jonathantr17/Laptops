"use client";

import { useState, useEffect } from "react";

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
  const [modalItem, setModalItem] = useState<CarouselItem | null>(null);
  const length = items.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(items) || length === 0) return null;

  return (
    <>
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg h-64 md:h-96">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map(item => (
            <div key={item.id} className="flex-shrink-0 w-full h-64 md:h-96 flex">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-1/2 h-full object-contain rounded-l-lg bg-white p-2"
              />

              <div className="w-1/2 p-6 flex flex-col justify-center rounded-r-lg text-black">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>

                <p className="text-gray-700 text-sm mb-3">
                  {item.description || "Sin descripción disponible."}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  {item.priceBefore && (
                    <p className="line-through text-red-500 text-lg">
                      ${item.priceBefore}
                    </p>
                  )}
                  <p className="text-green-600 font-bold text-2xl">
                    ${item.priceAfter}
                  </p>
                </div>

                <div className="w-full flex justify-end">
                  <a
                    href="https://wa.me/593963351521"
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-sm rounded"
                  >
                    Contactar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 text-xl"
              onClick={() => setModalItem(null)}
            >
              ✕
            </button>

            <img
              src={modalItem.imageUrl}
              alt={modalItem.title}
              className="w-full h-60 object-cover rounded mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{modalItem.title}</h2>

            <p className="text-gray-600 mb-3">{modalItem.description || "Sin descripción disponible."}</p>

            <div className="flex items-center gap-4">
              {modalItem.priceBefore && (
                <p className="line-through text-red-500 text-lg">${modalItem.priceBefore}</p>
              )}
              <p className="text-green-600 font-bold text-2xl">${modalItem.priceAfter}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}