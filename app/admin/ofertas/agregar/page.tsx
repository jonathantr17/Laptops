"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AgregarOferta() {
  const [data, setData] = useState({
    title: "",
    description: "",
    priceBefore: "",
    priceAfter: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setMsg("❌ Debes subir una imagen");
      return;
    }

    setMsg("Subiendo...");

    const imageRef = ref(storage, `offers/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "offers"), {
      ...data,
      priceBefore: parseFloat(data.priceBefore),
      priceAfter: parseFloat(data.priceAfter),
      imageUrl,
    });

    setMsg("✔ Oferta creada");
    setData({
      title: "",
      description: "",
      priceBefore: "",
      priceAfter: "",
    });
    setImage(null);
  };

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Crear Oferta</h1>

      <form onSubmit={save} className="space-y-4">
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full p-3 border rounded"
          placeholder="Título de oferta"
        />

        <textarea
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
          className="w-full p-3 border rounded"
          placeholder="Descripción"
        />

        <input
          type="number"
          value={data.priceBefore}
          onChange={(e) =>
            setData({ ...data, priceBefore: e.target.value })
          }
          className="w-full p-3 border rounded"
          placeholder="Precio antes"
        />

        <input
          type="number"
          value={data.priceAfter}
          onChange={(e) =>
            setData({ ...data, priceAfter: e.target.value })
          }
          className="w-full p-3 border rounded"
          placeholder="Precio después"
        />

        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.files?.[0] || null)
          }
          className="w-full p-3 border rounded"
        />

        <button className="bg-blue-600 text-white p-3 rounded">
          Crear Oferta
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}