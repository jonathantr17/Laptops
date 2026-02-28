"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { FaArrowLeft, FaCheck, FaUpload } from "react-icons/fa";

interface ProductData {
  title: string;
  specs: string;
  price: string;
  imageUrl: string;
  destacado?: boolean;
}

export default function EditarProducto() {
  const params = useSearchParams();
  const id = params.get("id");

  const [data, setData] = useState<ProductData>({ title: "", specs: "", price: "", imageUrl: "" });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    async function load() {
      try {
        const snap = await getDoc(doc(db, "products", id!));
        if (snap.exists()) {
          const d = snap.data();
          setData({ ...d, price: String(d.price) } as ProductData);
          setPreview(d.imageUrl || "");
        }
      } catch (e) {
        setMsg("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    setStatus("saving");
    setMsg("Guardando cambios...");
    try {
      let imageUrl = data.imageUrl;
      if (image instanceof File) {
        const imgRef = ref(storage, `products/${Date.now()}-${image.name.replace(/\s+/g, "-")}`);
        await uploadBytes(imgRef, image);
        imageUrl = await getDownloadURL(imgRef);
      }
      await updateDoc(doc(db, "products", id), {
        title: data.title,
        specs: data.specs,
        price: parseFloat(data.price) || 0,
        imageUrl,
      });
      setStatus("success");
      setMsg("Producto actualizado correctamente");
    } catch (err) {
      setStatus("error");
      setMsg("Error al actualizar el producto");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080c10] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <div className="w-5 h-5 border-2 border-indigo-400/40 border-t-indigo-400 rounded-full animate-spin" />
          Cargando producto...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c10] font-['DM_Sans',sans-serif]">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <header className="relative z-10 border-b border-white/6 px-8 py-5 flex items-center gap-3">
        <Link href="/admin/productos" className="text-white/25 hover:text-white transition-colors no-underline">
          <FaArrowLeft size={13} />
        </Link>
        <span className="text-white/15 text-sm">|</span>
        <span className="font-['Bebas_Neue'] text-lg text-white tracking-wide">Editar Producto</span>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-8 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-indigo-500" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-indigo-500">Edición</span>
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide leading-none">Editar Producto</h1>
        </div>

        {!id ? (
          <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-6 text-red-300 text-sm">
            Error: ID de producto no proporcionado en la URL.
          </div>
        ) : (
          <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left: Image */}
            <div className="space-y-4">
              <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30">Imagen del producto</p>
              <div className="relative h-56 bg-indigo-500/[0.04] border border-white/8 rounded-2xl flex items-center justify-center overflow-hidden group">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/20">
                    <FaUpload size={22} />
                    <span className="text-xs">Sin imagen</span>
                  </div>
                )}
                <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-[#080c10]/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white/60 tracking-[0.1em] uppercase">Cambiar imagen</span>
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
              </div>
              <label className="block cursor-pointer">
                <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/8 hover:border-white/16 text-white/35 hover:text-white text-xs tracking-[0.1em] uppercase py-3 rounded-xl transition-all">
                  <FaUpload size={11} />
                  {image ? image.name : "Seleccionar imagen"}
                </div>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            </div>

            {/* Right: Fields */}
            <div className="space-y-5">
              {[
                { key: "title", label: "Nombre", placeholder: "Nombre del producto", type: "text" },
                { key: "price", label: "Precio ($)", placeholder: "999.99", type: "number" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={(data as any)[key]}
                    onChange={e => setData({ ...data, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">Especificaciones</label>
                <textarea
                  value={data.specs}
                  onChange={e => setData({ ...data, specs: e.target.value })}
                  placeholder="RAM, CPU, GPU, Almacenamiento..."
                  rows={4}
                  required
                  className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit — full width */}
            <div className="md:col-span-2 space-y-3">
              {msg && (
                <div className={`text-xs px-4 py-3 rounded-xl border ${status === "success" ? "bg-green-500/10 border-green-500/25 text-green-300" :
                    status === "error" ? "bg-red-500/10 border-red-500/25 text-red-300" :
                      "bg-indigo-500/10 border-indigo-500/25 text-indigo-300"
                  }`}>
                  {msg}
                </div>
              )}
              <button
                type="submit"
                disabled={status === "saving"}
                className={`w-full flex items-center justify-center gap-3 font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-xl transition-all border cursor-pointer ${status === "saving"
                    ? "bg-white/4 border-white/8 text-white/20 cursor-not-allowed"
                    : "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white"
                  }`}
              >
                {status === "saving" ? (
                  <><div className="w-3.5 h-3.5 border-2 border-indigo-400/40 border-t-indigo-400 rounded-full animate-spin" /> Guardando...</>
                ) : status === "success" ? (
                  <><FaCheck size={12} /> Guardado</>
                ) : "Guardar cambios"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}