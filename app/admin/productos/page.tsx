"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { FaPlus, FaStar, FaEdit, FaTrash, FaBoxOpen, FaArrowLeft } from "react-icons/fa";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "products"));
      setProductos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    load();
  }, []);

  const eliminar = async (id: string) => {
    setDeletingId(id);
    await deleteDoc(doc(db, "products", id));
    setProductos(prev => prev.filter(p => p.id !== id));
    setDeletingId(null);
  };

  const toggleDestacado = async (id: string, current: boolean) => {
    await updateDoc(doc(db, "products", id), { destacado: !current });
    setProductos(prev => prev.map(p => p.id === id ? { ...p, destacado: !current } : p));
  };

  return (
    <div className="min-h-screen bg-[#080c10] font-['DM_Sans',sans-serif]">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/6 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/25 hover:text-white transition-colors no-underline">
            <FaArrowLeft size={13} />
          </Link>
          <span className="text-white/15 text-sm">|</span>
          <span className="font-['Bebas_Neue'] text-lg text-white tracking-wide">Productos</span>
        </div>
        <Link
          href="/admin/productos/agregar"
          className="flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded-lg transition-all no-underline"
        >
          <FaPlus size={11} /> Agregar producto
        </Link>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-indigo-500" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-indigo-500">Inventario</span>
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide leading-none">
            Gestión de Productos
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/6 flex items-center justify-center">
              <FaBoxOpen size={22} className="text-white/15" />
            </div>
            <p className="font-['Bebas_Neue'] text-2xl text-white/20 tracking-wide">Sin productos aún</p>
            <Link href="/admin/productos/agregar" className="text-xs text-indigo-400 hover:text-indigo-300 underline">
              Agregar el primero
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {productos.map(p => (
              <div key={p.id} className="group relative bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-white/12 hover:-translate-y-0.5">
                {/* Featured toggle */}
                <button
                  onClick={() => toggleDestacado(p.id, p.destacado)}
                  className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${p.destacado
                      ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
                      : "bg-white/5 border-white/10 text-white/20 hover:text-white/50"
                    }`}
                  title={p.destacado ? "Quitar de destacados" : "Marcar como destacado"}
                >
                  <FaStar size={11} />
                </button>

                {/* Image */}
                <div className="h-44 bg-indigo-500/[0.04] flex items-center justify-center p-4 border-b border-white/4">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide leading-none line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-white/25 mt-1 line-clamp-2 leading-relaxed">{p.specs}</p>
                  </div>
                  <div className="font-['Bebas_Neue'] text-2xl text-indigo-400 tracking-wide leading-none">
                    ${typeof p.price === "number" ? p.price.toLocaleString() : p.price}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/admin/productos/editar?id=${p.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-white/8 text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 text-[11px] tracking-[0.1em] uppercase py-2.5 rounded-lg transition-all no-underline"
                    >
                      <FaEdit size={10} /> Editar
                    </Link>
                    <button
                      onClick={() => eliminar(p.id)}
                      disabled={deletingId === p.id}
                      className="w-9 h-9 flex items-center justify-center bg-transparent border border-white/6 text-white/20 hover:border-red-500/40 hover:text-red-400 rounded-lg transition-all cursor-pointer"
                    >
                      {deletingId === p.id ? (
                        <div className="w-3 h-3 border border-red-400/40 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <FaTrash size={11} />
                      )}
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