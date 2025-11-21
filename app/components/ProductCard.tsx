"use client";

import { useState } from "react";
import { FaArrowRight, FaWhatsapp, FaTimes } from "react-icons/fa"; 

const WHATSAPP_NUMBER = '593963351521'; 

// 1. DEFINIR INTERFAZ DE LAPTOP (Añadida para tipado)
interface Laptop {
    id: string; // Asumimos que hay un ID
    name: string;
    price: number; 
    image: string;
    specs?: string;
    description?: string;
}

// 2. TIPAR DetailsModal
// El error se produce aquí porque TypeScript no sabe el tipo de { laptop, onClose }
const DetailsModal = ({ laptop, onClose }: { laptop: Laptop, onClose: () => void }) => {
    // Texto de WhatsApp para el botón "Comprar"
    const whatsappText = encodeURIComponent(`Hola, estoy interesado en el producto "${laptop.name}" que tiene un precio de $${laptop.price}.`);

    return (
        // Overlay y contenedor del modal
        <div 
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-95 animate-scaleUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 bg-white/80 p-2 rounded-full shadow-lg transition z-50"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                {/* Contenido del Modal (Imagen y Detalles) */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* ⬅️ Lado Izquierdo: Imagen */}
                    <div className="md:h-full p-4 md:p-6 flex items-center justify-center bg-gray-50 rounded-l-3xl">
                         <img
                            src={laptop.image}
                            alt={laptop.name}
                            className="w-full max-h-[50vh] md:max-h-full object-contain rounded-xl shadow-lg"
                        />
                    </div>
                    
                    {/* ➡️ Lado Derecho: Detalles y Acciones */}
                    <div className="p-6 md:p-8 space-y-5">
                        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight border-b pb-3">{laptop.name}</h2>
                        
                        {/* Precio */}
                        <div className="flex justify-between items-center text-3xl font-black text-indigo-600">
                            <span>Precio:</span>
                            <span>${laptop.price}</span>
                        </div>

                        {/* Especificaciones */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-gray-800">Especificaciones:</h3>
                            <p className="text-gray-700 text-base whitespace-pre-line">
                                {laptop.specs || "Especificaciones detalladas no disponibles."}
                            </p>
                            
                            {/* Si tienes un campo de descripción detallado: */}
                            {laptop.description && (
                                <p className="text-gray-600 text-sm italic pt-3 border-t">
                                    {laptop.description}
                                </p>
                            )}
                        </div>
                        
                        {/* Botones de Acción */}
                        <div className="pt-6 flex flex-col gap-4 border-t">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                // Nota: Usé green-600 para el botón de WhatsApp por convención
                                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.01]"
                            >
                                <FaWhatsapp className="w-6 h-6"/>
                                Comprar por WhatsApp
                            </a>
                            <button
                                onClick={onClose}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition"
                            >
                                Seguir Navegando
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Componente Principal: ProductCard
// 3. TIPAR ProductCard (Reemplazando 'any' con 'Laptop')
export default function ProductCard({ laptop }: { laptop: Laptop }) {
  const [showDetails, setShowDetails] = useState(false);

  // Generar texto para el botón de WhatsApp
  const whatsappTextShort = encodeURIComponent(`Hola, estoy interesado en saber más sobre la laptop "${laptop.name}".`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappTextShort}`;

  return (
    <>
      {/* Tarjeta del Producto */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300">
        
        {/* 🖼️ Contenedor de Imagen y Elementos Absolutos */}
        <div className="overflow-hidden relative">
          
          {/* Imagen con efecto hover */}
          <img
            src={laptop.image}
            alt={laptop.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Precio (Derecha Superior) */}
          <div className="absolute top-3 right-3 bg-indigo-600 text-white font-black text-lg py-1 px-3 rounded-lg shadow-md">
             ${laptop.price}
          </div>

          {/* Botón de WhatsApp (Izquierda Inferior, flotando) */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 left-3 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
        </div>

        {/* 📋 Información y Botones */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{laptop.name}</h3>
            
            <p className="text-gray-600 text-sm line-clamp-3">
              {laptop.specs || laptop.description || "Especificaciones clave no listadas."}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-end">
            
            {/* Botón "Ver Detalle" que abre el modal */}
            <button
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-md"
              onClick={() => setShowDetails(true)}
            >
              Ver detalle
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Renderizar Modal si showDetails es true */}
      {showDetails && (
        <DetailsModal 
          laptop={laptop} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
}