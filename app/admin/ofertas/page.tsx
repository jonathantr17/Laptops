"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaTag, FaArrowLeft } from "react-icons/fa";

interface Oferta {
  id: string;
  title: string;
  description: string;
  priceBefore: number;
  priceAfter: number;
  imageUrl: string;
}

export default function OfertasPage() {
  const [offers, setOffers] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "offers"));
      setOffers(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Oferta, "id">) })));
      setLoading(false);
    }
    load();
  }, []);

  const remove = async (id: string) => {
    setDeletingId(id);
    await deleteDoc(doc(db, "offers", id));
    setOffers(prev => prev.filter(o => o.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-[#080c10] font-['DM_Sans',sans-serif]">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <header className="relative z-10 border-b border-white/6 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/25 hover:text-white transition-colors no-underline">
            <FaArrowLeft size={13} />
          </Link>
          <span className="text-white/15 text-sm">|</span>
          <span className="font-['Bebas_Neue'] text-lg text-white tracking-wide">Ofertas</span>
        </div>
        <Link
          href="/admin/ofertas/agregar"
          className="flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded-lg transition-all no-underline"
        >
          <FaPlus size={11} /> Crear oferta
        </Link>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-green-500" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-green-400">Promociones</span>
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide leading-none">Gestión de Ofertas</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/6 flex items-center justify-center">
              <FaTag size={20} className="text-white/15" />
            </div>
            <p className="font-['Bebas_Neue'] text-2xl text-white/20 tracking-wide">Sin ofertas</p>
            <Link href="/admin/ofertas/agregar" className="text-xs text-indigo-400 hover:text-indigo-300 underline">
              Crear la primera oferta
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offers.map(o => (
              <div key={o.id} className="group bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-white/12 hover:-translate-y-0.5">
                {/* Image */}
                <div className="h-48 bg-green-500/[0.04] flex items-center justify-center p-4 border-b border-white/4 relative">
                  <img src={o.imageUrl} alt={o.title} className="w-full h-full object-contain" />
                  {/* Discount badge */}
                  {o.priceBefore > o.priceAfter && (
                    <div className="absolute top-3 left-3 bg-green-500/20 border border-green-500/40 text-green-300 text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-lg">
                      -{Math.round(((o.priceBefore - o.priceAfter) / o.priceBefore) * 100)}%
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide leading-none line-clamp-1">{o.title}</h3>
                  <p className="text-xs text-white/25 line-clamp-2 leading-relaxed">{o.description}</p>
                  <div className="flex items-baseline gap-3 mt-auto">
                    <span className="text-white/20 line-through text-sm">${o.priceBefore}</span>
                    <span className="font-['Bebas_Neue'] text-2xl text-green-400 tracking-wide leading-none">${o.priceAfter}</span>
                    <span className="text-[10px] text-green-300 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded ml-auto">
                      Ahorra ${o.priceBefore - o.priceAfter}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/ofertas/editar?id=${o.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-white/8 text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 text-[11px] tracking-[0.1em] uppercase py-2.5 rounded-lg transition-all no-underline"
                    >
                      <FaEdit size={10} /> Editar
                    </Link>
                    <button
                      onClick={() => remove(o.id)}
                      disabled={deletingId === o.id}
                      className="w-9 h-9 flex items-center justify-center bg-transparent border border-white/6 text-white/20 hover:border-red-500/40 hover:text-red-400 rounded-lg transition-all cursor-pointer"
                    >
                      {deletingId === o.id ? (
                        <div className="w-3 h-3 border border-red-400/40 border-t-red-400 rounded-full animate-spin" />
                      ) : <FaTrash size={11} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}