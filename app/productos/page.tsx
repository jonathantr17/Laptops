"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

  const fetchProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items: Producto[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          title: data.title,
          specs: data.specs,
          price: data.price,
          imageUrl: data.imageUrl,
          offer: data.offer || undefined,
        });
      });
      setProductos(items);
    } catch (error) {
      console.error("Error al traer productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const formattedProducts = productos.map((p) => ({
    id: p.id,
    name: p.title,
    specs: p.specs,
    price: p.price,
    image: p.imageUrl,
    offer: p.offer,
  }));

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <Navbar />
      
      {/* 🚀 Encabezado de la Página */}
      <header className="relative pt-32 pb-10 overflow-hidden">
        {/* Luz de fondo sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-indigo-600/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Catálogo de <span className="text-indigo-500 italic">Poder</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Explora nuestra selección de laptops optimizadas para gaming, diseño profesional y productividad extrema.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        
        {loading ? (
          /* 🦴 Skeleton Loader: Simula las tarjetas mientras carga */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-900/50 border border-white/5 rounded-3xl h-[400px] animate-pulse">
                <div className="bg-white/5 h-48 rounded-t-3xl mb-4"></div>
                <div className="px-6 space-y-3">
                  <div className="h-6 bg-white/5 rounded w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  <div className="h-10 bg-indigo-600/20 rounded mt-8"></div>
                </div>
              </div>
            ))}
          </div>
        ) : formattedProducts.length === 0 ? (
          <div className="text-center py-32 space-y-6">
            <div className="inline-flex p-6 bg-gray-900 rounded-full border border-white/5 mb-4">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Inventario vacío</h3>
            <p className="text-gray-500">Pronto llegarán nuevas bestias tecnológicas. Vuelve pronto.</p>
          </div>
        ) : (
          /* 💻 Grid de Productos */
          <div className="animate-fade-in">
            <ProductSection title="" products={formattedProducts} />
          </div>
        )}

        {/* 🛠️ Banner de Soporte Técnico */}
        <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-indigo-900/20 to-gray-900 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white">¿No sabes cuál elegir?</h2>
                <p className="text-gray-400">Nuestros expertos te ayudan a encontrar la laptop que se adapte a tu presupuesto.</p>
            </div>
            <a 
                href="https://wa.me/593963351521" 
                target="_blank"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 whitespace-nowrap"
            >
                Asesoría WhatsApp
            </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}