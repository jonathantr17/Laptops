"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AgregarCatalogo() {
  const [data, setData] = useState({
    titulo: "",
    descripcion: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setMsg("❌ Debes subir una imagen del catálogo");
      return;
    }

    setMsg("Subiendo catálogo...");

    // Subir imagen
    const imageRef = ref(storage, `catalog/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    // Guardar en la colección "catalog"
    await addDoc(collection(db, "catalog"), {
      ...data,
      imageUrl,
      createdAt: new Date(),
    });

    setMsg("✔ Catálogo registrado correctamente");

    // Reset
    setData({
      titulo: "",
      descripcion: "",
    });
    setImage(null);
  };

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Agregar Catálogo</h1>

      <form onSubmit={save} className="space-y-4">

        <input
          value={data.titulo}
          onChange={(e) => setData({ ...data, titulo: e.target.value })}
          className="w-full p-3 border rounded"
          placeholder="Título del catálogo"
        />

        <textarea
          value={data.descripcion}
          onChange={(e) =>
            setData({ ...data, descripcion: e.target.value })
          }
          className="w-full p-3 border rounded"
          placeholder="Descripción del catálogo"
        />

        <input
          type="file"
          className="w-full p-3 border rounded"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button className="bg-blue-600 text-white p-3 rounded w-full">
          Guardar Catálogo
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}