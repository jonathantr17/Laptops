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
import {
  FaCheckCircle, FaShippingFast, FaHeadset,
  FaBoxOpen, FaWhatsapp, FaArrowRight, FaStar, FaFire,
} from "react-icons/fa";

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
        getDocs(collection(db, "catalog")),
      ]);
      setProductosDestacados(snapProd.docs.map(d => ({ id: d.id, ...d.data() })));
      setOfertas(snapOff.docs.map(d => ({ id: d.id, ...d.data() })));
      if (!snapCat.empty) setCatalogo({ id: snapCat.docs[0].id, ...snapCat.docs[0].data() });
    }
    loadData();
  }, []);

  const mainOffer = ofertas.length > 0 ? ofertas[0] : null;
  const secondaryOffers = ofertas.slice(1);
  const whatsappNumber = "593963351521";

  return (
    <div className="bg-[#080c10] min-h-screen text-white/80">
      <Navbar />
      <Hero />

      {/* ── OFERTA DE LA SEMANA ─────────────────────────────── */}
      {mainOffer && (
        <section className="relative bg-[#080c10] px-6 md:px-12 py-24 overflow-hidden">

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Accent blob */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto">

            {/* Section header */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-px bg-indigo-500" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
                Oferta de la semana
              </span>
            </div>

            {/* Main offer card */}
            <div className="group relative bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden hover:border-indigo-500/25 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col lg:flex-row items-stretch">

                {/* Image side */}
                <div className="lg:w-2/5 relative flex items-center justify-center p-12 overflow-hidden min-h-[360px]"
                  style={{ background: "rgba(99,102,241,0.04)" }}>
                  {/* Glow */}
                  <div className="absolute w-72 h-72 rounded-full pointer-events-none transition-all duration-700 group-hover:opacity-150"
                    style={{ background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)", filter: "blur(60px)" }}
                  />
                  {/* Save badge */}
                  {mainOffer.priceBefore && (
                    <div className="absolute top-6 left-6 z-20 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 font-semibold text-xs tracking-[0.1em] uppercase px-4 py-2 rounded-lg backdrop-blur-sm">
                      Ahorra ${mainOffer.priceBefore - mainOffer.priceAfter}
                    </div>
                  )}
                  <img
                    src={mainOffer.imageUrl}
                    alt={mainOffer.title}
                    className="relative z-10 w-full h-auto max-h-[380px] object-contain transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.6))" }}
                  />
                </div>

                {/* Info side */}
                <div className="lg:w-2/5 p-10 md:p-14 flex flex-col justify-center gap-8 border-l border-white/5">
                  {/* Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-indigo-400">
                      Edición Limitada
                    </span>
                  </div>

                  <div>
                    <h2 className="font-['Bebas_Neue'] leading-none tracking-wide text-white mb-3 group-hover:text-indigo-200 transition-colors"
                      style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
                      {mainOffer.title}
                    </h2>
                    <p className="text-sm text-white/35 leading-relaxed line-clamp-3">
                      {mainOffer.description}
                    </p>
                  </div>

                  {/* Prices */}
                  <div>
                    {mainOffer.priceBefore && (
                      <div className="text-white/20 line-through text-base mb-1">
                        Antes: ${mainOffer.priceBefore}
                      </div>
                    )}
                    <div className="flex items-baseline gap-4">
                      <span className="font-['Bebas_Neue'] text-6xl text-indigo-500 tracking-wide leading-none">
                        ${mainOffer.priceAfter}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/25 bg-white/4 border border-white/8 px-3 py-1 rounded">
                        Envío gratis
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`¡Hola! Me interesa la oferta: ${mainOffer.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white font-semibold text-sm tracking-[0.08em] uppercase py-4 px-8 rounded-xl transition-all no-underline group/btn"
                  >
                    <FaWhatsapp size={16} />
                    Lo quiero ahora
                    <FaArrowRight size={11} className="transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Secondary carousel */}
              {secondaryOffers.length > 0 && (
                <div className="border-t border-white/5 p-8 bg-white/[0.015]">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.3em]">Más oportunidades</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <Carousel items={secondaryOffers.map(o => ({
                    id: o.id, title: o.title, description: o.description,
                    priceBefore: o.priceBefore, priceAfter: o.priceAfter, imageUrl: o.imageUrl,
                  }))} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── NUESTROS FAVORITOS ──────────────────────────────── */}
      <section className="relative bg-[#080c10] overflow-hidden">
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        {/* Section header outside ProductSection */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500 flex items-center gap-2">
              <FaStar className="text-[9px]" /> Selección Premium
            </span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-white tracking-wide leading-none">
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

      {/* ── CATÁLOGO ESPECIAL ────────────────────────────────── */}
      <section className="relative bg-[#080c10] px-6 md:px-12 pb-24 overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto">
          <div className="group relative rounded-2xl overflow-hidden border border-indigo-500/20"
            style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(99,102,241,0.06) 50%, rgba(139,92,246,0.08) 100%)" }}>

            {/* Bg glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none transition-all duration-700"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(60px)" }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 p-10 md:p-16">

              {/* Text side */}
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-indigo-400" />
                    <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-400">
                      Explorar todo
                    </span>
                  </div>
                  <h2 className="font-['Bebas_Neue'] leading-[0.9] tracking-wide text-white">
                    <span style={{ fontSize: "clamp(52px, 6vw, 88px)" }}>Catálogo</span>
                    <br />
                    <span className="text-white/30" style={{ fontSize: "clamp(36px, 4vw, 60px)" }}>
                      Completo
                    </span>
                  </h2>
                </div>
                <p className="text-white/40 text-base leading-relaxed max-w-sm">
                  {catalogo?.descripcion || "Explora nuestra colección completa de laptops con tecnología de última generación para gaming, diseño y productividad."}
                </p>
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-3 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white font-semibold text-sm tracking-[0.08em] uppercase py-4 px-8 rounded-xl transition-all no-underline group/btn"
                >
                  <FaBoxOpen size={15} className="transition-transform group-hover/btn:scale-110" />
                  Explorar equipos
                  <FaArrowRight size={11} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

              {/* Image side */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full scale-75 group-hover:scale-95 transition-transform duration-700 pointer-events-none"
                    style={{ background: "rgba(99,102,241,0.15)", filter: "blur(50px)" }}
                  />
                  <img
                    src={catalogo?.imageUrl || "/catalog-laptop.png"}
                    alt="Catálogo NexusTech"
                    className="relative w-full max-w-md h-auto object-contain rounded-2xl transition-transform duration-700 lg:rotate-3 group-hover:rotate-0"
                    style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── TARJETAS DE BENEFICIOS ───────────────────────────── */}
      <section className="relative bg-[#080c10] px-6 md:px-12 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
              Por qué elegirnos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BenefitCard
              Icon={FaCheckCircle}
              title="Calidad Élite"
              desc="Equipos rigurosamente probados y certificados para garantizar un rendimiento sin fallos."
              index={0}
            />
            <BenefitCard
              Icon={FaShippingFast}
              title="Envío Seguro"
              desc="Logística blindada a todo el país. Tu equipo llega protegido y en tiempo récord."
              index={1}
            />
            <BenefitCard
              Icon={FaHeadset}
              title="Soporte VIP"
              desc="Expertos disponibles para resolver cualquier duda técnica en tiempo real."
              index={2}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── BENEFIT CARD ──────────────────────────────────────────── */
function BenefitCard({ Icon, title, desc, index }: { Icon: any; title: string; desc: string; index: number }) {
  const accents = [
    { icon: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)", color: "#818cf8" },
    { icon: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", color: "#34d399" },
    { icon: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)", color: "#a78bfa" },
  ];
  const a = accents[index] || accents[0];

  return (
    <div className="group relative bg-white/[0.02] border border-white/6 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/12 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${a.icon} 0%, transparent 60%)` }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: a.icon, borderColor: a.border, color: a.color }}
      >
        <Icon size={20} />
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h4 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none mb-2">{title}</h4>
        <p className="text-sm text-white/30 leading-relaxed">{desc}</p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }}
      />
    </div>
  );
}