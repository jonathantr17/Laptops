"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import { FaCheckCircle, FaShippingFast, FaHeadset, FaGift } from "react-icons/fa";

export default function Home() {
  const [productosDestacados, setProductosDestacados] = useState<any[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any>(null);

  // 🔥 Cargar datos desde Firebase
  useEffect(() => {
    async function load() {
      // Cargar productos destacados
      const q = query(collection(db, "products"), where("destacado", "==", true));
      const snap = await getDocs(q);

      setProductosDestacados(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    }

    async function loadOffers() {
      // Cargar todas las ofertas
      const snap = await getDocs(collection(db, "offers"));
      setOfertas(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }

    async function loadCatalog() {
      // Cargar catálogo especial
      const snap = await getDocs(collection(db, "catalog"));
      if (snap.docs.length > 0) {
        setCatalogo({ id: snap.docs[0].id, ...snap.docs[0].data() });
      }
    }

    load();
    loadOffers();
    loadCatalog();
  }, []);

  // Seleccionar la primera oferta como la principal destacada
  const mainOffer = ofertas.length > 0 ? ofertas[0] : null;
  // Las ofertas restantes para el carrusel/grid secundario
  const secondaryOffers = ofertas.slice(1);

  // Configuración de WhatsApp
  const whatsappNumber = '593963351521';
  const whatsappText = mainOffer
    ? encodeURIComponent(`Hola, estoy interesado en la Mega Oferta del Día: ${mainOffer.title}`)
    : "Hola, estoy interesado en una de sus ofertas especiales.";


  return (
    // ✅ CORRECCIÓN 1: Agregar pt-16 al div principal para evitar que el navbar cubra el contenido.
    <div className="pt-16"> 
      <Navbar />
      
{/* 🏞️ HERO CON SU PROPIA IMAGEN */}
<Hero />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
{/* 🚨 OFERTAS ESPECIALES - Diseño con botón Índigo (Morado) */}
{mainOffer && (
  <section className="bg-white py-8 md:py-12 rounded-2xl shadow-2xl animate-fade-in"> 
    
    {/* Título más pequeño en móvil */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center text-gray-700 flex justify-center items-center space-x-2 md:space-x-3">
        <span>Ofertas Especiales</span>
    </h2>

    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-6xl mx-auto px-4">
      
      {/* ⬅️ Imagen a la Izquierda - Relación de aspecto optimizada */}
      <div className="md:w-1/2 flex-shrink-0 relative w-full"> 
        <img
          src={mainOffer.imageUrl}
          alt={mainOffer.title}
          className="w-full h-auto aspect-[3/2] md:aspect-video md:h-96 object-cover rounded-xl shadow-xl border-4 border-white transform hover:scale-[1.01] transition duration-500 ease-in-out"
        />
        {/* Etiqueta de Descuento en la imagen */}
        <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-sm md:text-lg py-1 px-3 md:py-2 md:px-5 rounded-full shadow-lg transform rotate-[-5deg]">
            ¡-{Math.round(((mainOffer.priceBefore - mainOffer.priceAfter) / mainOffer.priceBefore) * 100)}% Dcto!
        </div>
      </div>

      {/* ➡️ Contenido a la Derecha */}
      <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
        {/* Título de Producto más pequeño en móvil */}
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 md:mb-4 leading-tight">
          {mainOffer.title}
        </h3>
        <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6 max-w-prose mx-auto md:mx-0 line-clamp-2">
          {mainOffer.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <div className="text-xs md:text-sm text-gray-500 line-through">
            Antes: <span className="font-semibold">${mainOffer.priceBefore}</span>
          </div>
          {/* Precio "Ahora" más pequeño en móvil */}
          <div className="text-3xl md:text-4xl font-extrabold text-red-700">
            ¡Ahora: <span className="font-black">${mainOffer.priceAfter}</span>!
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN CORREGIDO: Usando indigo-600 y sombra/transición moderna */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
          target="_blank"
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full 
                     shadow-2xl hover:shadow-indigo-500/50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 
                     inline-block self-center md:self-start text-base md:text-lg tracking-wide max-w-xs sm:max-w-none mx-auto md:mx-0"
        >
          ¡Aprovechar Ahora!
        </a>
      </div>
    </div>

    {/* Carrusel para otras ofertas - Más compacto en móvil */}
    {secondaryOffers.length > 0 && (
      <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 px-4">
        <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 md:mb-8">Más Ofertas Destacadas</h3>
        <Carousel
          items={secondaryOffers.map((o) => ({
            id: o.id,
            name: o.title,
            description: o.description,
            priceBefore: o.priceBefore,
            price: o.priceAfter,
            image: o.imageUrl,
          }))}
        />
      </div>
    )}
  </section>
)}
       
        {/* ⭐ Mostrar SOLO productos destacados */}
        {/* ✅ CORRECCIÓN 2: Asegurar que el título del producto se pase correctamente */}
        <ProductSection
          title="Nuestros Productos"
          products={productosDestacados.map((p) => ({
            ...p,
            name: p.title || p.name,     
            title: p.title || p.name, 
            image: p.image || p.imageUrl,
            imageUrl: p.imageUrl || p.image,
          }))}
        />

{/* ⭐ Catálogo Especial */}
{catalogo && (
  <section className="max-w-7xl mx-auto px-6 py-16">
    
    <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 tracking-tight">
      Catálogo Especial
    </h2>

    <div className="flex flex-col md:flex-row items-start gap-12 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">

      {/* 📘 Imagen del catálogo */}
      <div className="md:w-1/2 w-full">
        <img
          src={catalogo.imageUrl}
          alt="Catálogo"
          className="w-full h-72 md:h-80 object-cover rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
        />
      </div>

      {/* 📕 Información */}
      <div className="md:w-1/2 w-full flex flex-col justify-start">
        
        {/* Subtítulo alineado arriba */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {catalogo.titulo || "Catálogo Especial"}
        </h3>

        <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
          {catalogo.descripcion ||
            "Explora nuestro catálogo completo con las mejores laptops del mercado."}
        </p>

        {/* Botón de acción (WhatsApp) */}
        <a
          href="https://wa.me/593963351521?text=Hola%20quiero%20ver%20el%20catálogo%20completo"
          target="_blank"
          className="self-start bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition transform hover:-translate-y-1 hover:scale-105 text-sm md:text-base flex items-center gap-2"
        >
          <img src="/whatsapp.png" className="w-8 h-8" alt="WhatsApp" />
          Ver en WhatsApp
        </a>
      </div>

    </div>
  </section>
)}

        

        {/* 🧭 Sobre Nosotros */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Sobre Nosotros
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">
              En <span className="font-semibold text-green-600">LaptopX</span> nos dedicamos a ofrecer las mejores laptops del mercado a precios accesibles. 
              Nuestra misión es brindar a nuestros clientes productos de calidad, atención personalizada y 
              un servicio confiable. ¡Descubre nuestra selección y encuentra la laptop perfecta para ti!
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-600 w-16 h-16 mb-4 animate-bounce" />
                <h4 className="font-semibold text-lg mb-2">Calidad Garantizada</h4>
                <p className="text-gray-600 text-center max-w-xs">
                  Todos nuestros productos pasan estrictos controles de calidad para asegurar su satisfacción.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaShippingFast className="text-blue-500 w-16 h-16 mb-4 animate-pulse" />
                <h4 className="font-semibold text-lg mb-2">Envío Rápido</h4>
                <p className="text-gray-600 text-center max-w-xs">
                  Entregamos tus productos de manera rápida y segura directamente a tu domicilio.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaHeadset className="text-purple-600 w-16 h-16 mb-4 animate-spin-slow" />
                <h4 className="font-semibold text-lg mb-2">Soporte 24/7</h4>
                <p className="text-gray-600 text-center max-w-xs">
                  Nuestro equipo de soporte está disponible para ayudarte en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}