"use client";

import { useState } from "react";
import { FaArrowRight, FaWhatsapp, FaTimes, FaMemory, FaHdd } from "react-icons/fa"; 

const WHATSAPP_NUMBER = '593963351521'; 

interface Laptop {
    id: string;
    name: string;
    price: number; 
    image: string;
    specs?: string;
    description?: string;
}

// 1. MODAL REDISEÑADO (ESTILO DARK)
const DetailsModal = ({ laptop, onClose }: { laptop: Laptop, onClose: () => void }) => {
    const whatsappText = encodeURIComponent(`Hola LaptopX, me interesa la "${laptop.name}" ($${laptop.price}). ¿Tienen stock disponible?`);

    return (
        <div 
            className="fixed inset-0 z-[100] bg-gray-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 border border-white/10 rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-[0_0_50px_rgba(79,70,229,0.15)] flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón Cerrar */}
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white z-50 bg-white/5 p-2 rounded-full transition-colors">
                    <FaTimes size={20} />
                </button>

                {/* 🖼️ Lado Izquierdo: Galería/Imagen */}
                <div className="md:w-1/2 bg-gray-950/50 p-8 flex items-center justify-center border-r border-white/5">
                    <img src={laptop.image} alt={laptop.name} className="w-full h-auto object-contain max-h-[40vh] md:max-h-full drop-shadow-[0_0_30px_rgba(79,70,229,0.2)]" />
                </div>
                
                {/* ➡️ Lado Derecho: Info */}
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto space-y-8">
                    <div className="space-y-2">
                        <span className="text-indigo-500 font-black text-xs uppercase tracking-[0.3em]">Laptop de Alto Nivel</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">{laptop.name}</h2>
                    </div>

                    <div className="text-4xl font-black text-indigo-500 tracking-tighter">
                        ${laptop.price}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            Especificaciones Técnicas
                        </h3>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line font-medium">
                                {laptop.specs || "Contacta para specs detalladas."}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 pt-4">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 text-lg"
                        >
                            <FaWhatsapp className="text-2xl"/>
                            CONSULTAR POR WHATSAPP
                        </a>
                        <button onClick={onClose} className="w-full text-gray-500 hover:text-white font-bold py-2 transition-colors text-sm uppercase tracking-widest">
                            Volver al catálogo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. PRODUCT CARD REDISEÑADA (ESTILO DARK)
export default function ProductCard({ laptop }: { laptop: Laptop }) {
  const [showDetails, setShowDetails] = useState(false);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Info sobre ${laptop.name}`)}`;

  return (
    <>
      <div className="group bg-gray-900/40 border border-white/5 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        
        <div className="relative p-6 h-64 flex items-center justify-center bg-gray-950/20 overflow-hidden">
          {/* Badge de Precio Flotante */}
          <div className="absolute top-5 left-5 z-10 bg-indigo-600 text-white font-black text-sm py-1.5 px-4 rounded-full shadow-lg">
             ${laptop.price}
          </div>

          <img
            src={laptop.image}
            alt={laptop.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
          />
          
          {/* Overlay al hacer hover */}
          <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-black text-white line-clamp-1 tracking-tight group-hover:text-indigo-400 transition-colors">
                {laptop.name}
            </h3>
            
            <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
              {laptop.specs || "Potencia garantizada para tus proyectos."}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all border border-white/10 text-sm uppercase tracking-widest"
            >
              Detalles
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-90"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {showDetails && <DetailsModal laptop={laptop} onClose={() => setShowDetails(false)} />}
    </>
  );
}