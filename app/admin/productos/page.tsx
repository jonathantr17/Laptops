"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function ProductosPage() {
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "products"));
      setProductos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  const eliminar = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProductos(productos.filter((p) => p.id !== id));
  };

  const toggleDestacado = async (id: string, current: boolean) => {
    const ref = doc(db, "products", id);
    await updateDoc(ref, { destacado: !current });

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, destacado: !current } : p
      )
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      <a
        href="/admin/productos/agregar"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        ➕ Agregar Producto
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {productos.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow relative">

            {/* ⭐ BOTÓN DE DESTACADO */}
            <button
              onClick={() => toggleDestacado(p.id, p.destacado)}
              className="absolute top-3 right-3 text-2xl"
            >
              {p.destacado ? "⭐" : "✩"}
            </button>

            <img
              className="w-full h-40 object-cover rounded"
              src={p.imageUrl}
            />

            <h2 className="font-bold mt-3 text-lg">{p.title}</h2>
            <p className="text-gray-600">{p.specs}</p>
            <p className="font-bold text-blue-700 mt-1">${p.price}</p>

            <div className="flex gap-2 mt-4">
              <a
                href={`/admin/productos/editar?id=${p.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </a>

              <button
                onClick={() => eliminar(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}