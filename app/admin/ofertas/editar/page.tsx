"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Oferta {
  title: string;
  description: string;
  priceBefore: string | number;
  priceAfter: string | number;
  imageUrl: string;
}

export default function EditarOferta({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams?.id;

  const [data, setData] = useState<Oferta | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  // Evitar render mientras no haya ID → previene hydration error
  if (!id) return null;

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "offers", id));
      if (snap.exists()) {
        const info = snap.data() as Oferta;
        setData(info);
      }
    }
    load();
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setMsg("Guardando...");

    let imageUrl = data.imageUrl;

    // Si se selecciona nueva imagen
    if (image) {
      const imgRef = ref(storage, `offers/${image.name}`);
      await uploadBytes(imgRef, image);
      imageUrl = await getDownloadURL(imgRef);
    }

    await updateDoc(doc(db, "offers", id), {
      ...data,
      priceBefore: parseFloat(String(data.priceBefore)),
      priceAfter: parseFloat(String(data.priceAfter)),
      imageUrl,
    });

    setMsg("✔ Cambios guardados");
  };

  // Mientras carga Firestore
  if (!data) return <p className="p-10">Cargando…</p>;

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Editar Oferta</h1>

      <form onSubmit={save} className="space-y-4">
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full p-3 border rounded"
        />

        <textarea
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          value={data.priceBefore}
          onChange={(e) =>
            setData({ ...data, priceBefore: e.target.value })
          }
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          value={data.priceAfter}
          onChange={(e) =>
            setData({ ...data, priceAfter: e.target.value })
          }
          className="w-full p-3 border rounded"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
          className="w-full"
        />

        <button className="bg-blue-600 text-white p-3 rounded">
          Guardar Cambios
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}