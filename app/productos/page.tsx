"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";

interface Producto {
  id: string;
  title: string;
  specs: string;
  price: number;
  imageUrl: string;
  offer?: string;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const snap = await getDocs(collection(db, "products"));
        const items: Producto[] = snap.docs.map(doc => {
          const d = doc.data();
          return { id: doc.id, title: d.title, specs: d.specs, price: d.price, imageUrl: d.imageUrl, offer: d.offer };
        });
        setProductos(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProductos();
  }, []);

  const formatted = productos.map(p => ({
    id: p.id, name: p.title, specs: p.specs, price: p.price, image: p.imageUrl, offer: p.offer,
  }));

  return (
    <div className="bg-[#080c10] min-h-screen text-white/80">
      <Navbar />

      {/* ── Page header ─────────────────────────────────── */}
      <header className="relative pt-32 pb-16 overflow-hidden bg-[#080c10]">
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
              Disponibilidad inmediata
            </span>
          </div>
          <h1 className="font-['Bebas_Neue'] leading-[0.92] tracking-wide m-0"
            style={{ fontSize: "clamp(56px, 7vw, 100px)" }}>
            <span className="text-white">Catálogo de </span>
            <span className="text-indigo-500">Poder</span>
          </h1>
          <p className="mt-5 text-white/35 max-w-xl text-sm leading-relaxed">
            Laptops de alto rendimiento para gaming, diseño profesional y productividad extrema.
          </p>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </header>

      <main>
        {/* ── Product grid ─────────────────────────────── */}
        {loading ? (
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-52 bg-white/4" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-white/5 rounded w-3/4" />
                    <div className="h-3 bg-white/3 rounded w-1/2" />
                    <div className="h-10 bg-indigo-500/10 rounded mt-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : formatted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">Inventario vacío</h3>
            <p className="text-sm text-white/25">Pronto llegarán nuevas bestias. Vuelve pronto.</p>
          </div>
        ) : (
          <ProductSection title="Todos los Equipos" products={formatted} />
        )}

        {/* ── CTA Banner ─────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
          <div className="relative rounded-2xl overflow-hidden border border-indigo-500/15 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(8,12,16,0) 60%)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/40 via-transparent to-transparent" />

            <div>
              <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide mb-2">
                ¿No sabes cuál elegir?
              </h2>
              <p className="text-sm text-white/30">
                Nuestros expertos te ayudan a encontrar la laptop perfecta para tu presupuesto.
              </p>
            </div>
            <a
              href="https://wa.me/593963351521"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase px-7 py-4 rounded-xl transition-all no-underline whitespace-nowrap"
            >
              <FaWhatsapp size={15} />
              Asesoría por WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}