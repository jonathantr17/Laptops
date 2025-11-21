"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// 🔥 Definimos la interfaz de oferta
interface Oferta {
  id: string;
  title: string;
  description: string;
  priceBefore: number;
  priceAfter: number;
  imageUrl: string;
}

export default function OfertasPage() {
  // 🔥 Tipar la lista evita errores
  const [offers, setOffers] = useState<Oferta[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "offers"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Oferta, "id">),
      }));

      setOffers(data);
    }
    load();
  }, []);

  // 🔥 Tipo para id
  const remove = async (id: string) => {
    await deleteDoc(doc(db, "offers", id));
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Ofertas</h1>

      <a
        href="/admin/ofertas/agregar"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        ➕ Crear Oferta
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {offers.map((o) => (
          <div key={o.id} className="bg-white p-4 shadow rounded-xl">
            <img
              src={o.imageUrl}
              className="w-full h-40 rounded object-cover"
            />

            <h2 className="text-lg font-bold mt-3">{o.title}</h2>
            <p className="text-gray-600">{o.description}</p>

            <p className="mt-2">
              Antes:{" "}
              <span className="line-through">${o.priceBefore}</span>
            </p>
            <p className="text-green-600 font-bold">
              Ahora: ${o.priceAfter}
            </p>

            <div className="flex gap-2 mt-4">
              <a
                href={`/admin/ofertas/editar?id=${o.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </a>

              <button
                onClick={() => remove(o.id)}
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