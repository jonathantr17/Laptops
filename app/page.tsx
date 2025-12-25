"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import { FaCheckCircle, FaShippingFast, FaHeadset,FaBoxOpen, FaWhatsapp, FaArrowRight, FaStar, FaFire } from "react-icons/fa";

export default function Home() {
  const [productosDestacados, setProductosDestacados] = useState<any[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const qProd = query(collection(db, "products"), where("destacado", "==", true));
      const [snapProd, snapOff, snapCat] = await Promise.all([
        getDocs(qProd),
        getDocs(collection(db, "offers")),
        getDocs(collection(db, "catalog"))
      ]);
      setProductosDestacados(snapProd.docs.map(d => ({ id: d.id, ...d.data() })));
      setOfertas(snapOff.docs.map(d => ({ id: d.id, ...d.data() })));
      if (!snapCat.empty) setCatalogo({ id: snapCat.docs[0].id, ...snapCat.docs[0].data() });
    }
    loadData();
  }, []);

  const mainOffer = ofertas.length > 0 ? ofertas[0] : null;
  const secondaryOffers = ofertas.slice(1);
  const whatsappNumber = '593963351521';

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        
        {/* 🚨 SECCIÓN: OFERTAS DE LA SEMANA */}
{mainOffer && (
  <section className="relative animate-fade-in">
    {/* Título de la Sección */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
        Ofertas de la <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Semana</span>
      </h2>
    </div>
    
    <div className="relative bg-gray-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl group">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* Lado de la Imagen (Visual Showcase) */}
        <div className="lg:w-3/5 w-full relative bg-gray-950/50 flex items-center justify-center p-12 overflow-hidden">
          {/* Resplandor de fondo (Glow) */}
          <div className="absolute w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full group-hover:bg-indigo-600/30 transition-colors duration-700"></div>
          
          {/* ✅ Badge de Ahorro: Corregido con z-20 para estar siempre al frente */}
          <div className="absolute top-8 left-8 z-20 bg-red-600 text-white font-black px-6 py-2 rounded-2xl shadow-2xl italic tracking-tighter transform -rotate-3 select-none pointer-events-none text-sm md:text-lg border border-red-400/20">
            ¡AHORRA ${mainOffer.priceBefore - mainOffer.priceAfter}!
          </div>

          {/* Imagen de la Laptop */}
          <img
            src={mainOffer.imageUrl}
            alt={mainOffer.title}
            className="relative z-10 w-full h-auto max-h-[420px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Lado de Información (Content Box) */}
        <div className="lg:w-2/5 w-full p-10 md:p-14 flex flex-col justify-center space-y-8 bg-gradient-to-br from-gray-900 to-gray-950 border-l border-white/5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">
              <FaFire className="animate-pulse" /> Edición Limitada
            </div>
            <h3 className="text-4xl font-black text-white leading-none tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">
              {mainOffer.title}
            </h3>
            <p className="text-gray-400 font-light leading-relaxed line-clamp-3">
              {mainOffer.description}
            </p>
          </div>

          {/* Precios */}
          <div className="space-y-1">
            <span className="text-gray-600 line-through text-xl font-bold italic">
              Antes: ${mainOffer.priceBefore}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-6xl font-black text-white tracking-tighter">
                ${mainOffer.priceAfter}
              </span>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                Envío Gratis
              </span>
            </div>
          </div>

          {/* Botón de Acción */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`¡Hola LaptopX! Me interesa la oferta de la semana: ${mainOffer.title}`)}`}
            target="_blank"
            className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-lg group/btn"
          >
            ¡LO QUIERO AHORA! 
            <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>

      {/* Mini Carrusel de otras ofertas (Si existen) */}
      {secondaryOffers.length > 0 && (
        <div className="p-8 bg-gray-950/40 border-t border-white/5">
          <div className="mb-6 flex items-center gap-3">
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Más Oportunidades</span>
             <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <Carousel items={secondaryOffers.map(o => ({ 
            id: o.id, 
            title: o.title, 
            description: o.description, 
            priceBefore: o.priceBefore, 
            priceAfter: o.priceAfter, 
            imageUrl: o.imageUrl 
          }))} />
        </div>
      )}
    </div>
  </section>
)}




        {/* ⭐ SECCIÓN: NUESTROS FAVORITOS (OTRO COLOR: CIAN/TURQUESA) */}
        <section className="py-10 relative">
          {/* Decoración de fondo cian */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[120px] -z-10 rounded-full"></div>
          
<div className="text-center mb-16 space-y-2">
  {/* CAMBIO: text-cyan-400 por text-indigo-500 */}
  <div className="flex justify-center items-center gap-2 text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
    <FaStar className="animate-pulse" /> Selección Premium
  </div>
  
  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
    Nuestros <span className="text-indigo-500">Favoritos</span>
  </h2>
</div>

          <ProductSection
            title=""
            products={productosDestacados.map(p => ({
              ...p,
              name: p.title || p.name,
              image: p.imageUrl || p.image,
            }))}
          />
        </section>

        {/* 📘 CATÁLOGO ESPECIAL */}
{catalogo && (
  <section className="bg-indigo-600 rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden group shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
    {/* Decoración de fondo */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -mr-32 -mt-32 transition-all duration-700 group-hover:bg-white/20"></div>
    
    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            Catálogo <br /> 
            <span className="opacity-40 text-4xl md:text-6xl italic">Completo</span>
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0">
            {catalogo.descripcion || "Explora nuestra colección completa de laptops con tecnología de última generación."}
          </p>
        </div>

        {/* BOTÓN REDIRIGIDO AL CATÁLOGO INTERNO */}
        <Link 
          href="/productos" 
          className="inline-flex items-center gap-4 bg-white text-indigo-700 font-black py-5 px-12 rounded-2xl hover:bg-indigo-50 transition-all duration-300 shadow-2xl text-xl uppercase tracking-tighter group/btn"
        >
          <FaBoxOpen size={28} className="group-hover/btn:scale-110 transition-transform" /> 
          Explorar Equipos
          <FaArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
        </Link>
      </div>

      <div className="lg:w-1/2 flex justify-center">
        <div className="relative">
          {/* Resplandor detrás de la imagen */}
          <div className="absolute inset-0 bg-indigo-400/30 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
          <img 
            src={catalogo.imageUrl} 
            alt="Catálogo LaptopX" 
            className="relative w-full max-w-md h-auto object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform lg:rotate-6 group-hover:rotate-0 transition-transform duration-700" 
          />
        </div>
      </div>
    </div>
  </section>
)}

        {/* 🧭 BENEFICIOS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
          <BenefitCard Icon={FaCheckCircle} title="Calidad Élite" desc="Equipos rigurosamente probados para un rendimiento sin fallos." />
          <BenefitCard Icon={FaShippingFast} title="Envío Seguro" desc="Logística blindada a todo el país para proteger tu inversión." />
          <BenefitCard Icon={FaHeadset} title="Soporte VIP" desc="¿Dudas técnicas? Nuestros expertos te atienden de inmediato." />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function BenefitCard({ Icon, title, desc }: any) {
  return (
    <div className="bg-gray-900/40 border border-white/5 p-12 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 hover:bg-gray-900/60 transition-all group">
      <div className="p-6 rounded-[1.5rem] bg-indigo-600/10 text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg">
        <Icon size={36} />
      </div>
      <div className="space-y-2">
        <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">{title}</h4>
        <p className="text-gray-500 font-medium leading-relaxed text-sm px-4">{desc}</p>
      </div>
    </div>
  );
}