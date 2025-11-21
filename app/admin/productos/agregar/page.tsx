"use client";

import React, { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AgregarProducto() {
  const [data, setData] = useState({
    title: "",
    specs: "",
    price: "",
  });

  // File | null
  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  // handler seguro para el input file (tipado)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  // save con tipado para `e` y protección para image.name
  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("Guardando...");

    try {
      let imageUrl = "";

      // sube imagen si existe y es File
      if (image instanceof File) {
        // generar nombre único para evitar colisiones
        const uniqueName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
        const imageRef = ref(storage, `products/${uniqueName}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // guarda en firestore (asegurarse parseFloat)
      await addDoc(collection(db, "products"), {
        title: data.title,
        specs: data.specs,
        price: parseFloat(String(data.price)) || 0,
        imageUrl,
      });

      setMsg("✔ Producto agregado");
      setData({ title: "", specs: "", price: "" });
      setImage(null);
    } catch (err) {
      console.error("Error al guardar:", err);
      setMsg("❌ Error al guardar el producto");
    }
  };

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Agregar Producto</h1>

      <form onSubmit={save} className="space-y-4">
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full p-3 border rounded"
          placeholder="Nombre del producto"
        />

        <textarea
          value={data.specs}
          onChange={(e) => setData({ ...data, specs: e.target.value })}
          className="w-full p-3 border rounded"
          placeholder="Especificaciones"
        />

        <input
          type="number"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          className="w-full p-3 border rounded"
          placeholder="Precio"
        />

        <input
          type="file"
          className="w-full p-3 border rounded"
          onChange={handleImage}
          accept="image/*"
        />

        <button className="bg-blue-600 text-white p-3 rounded">Guardar Producto</button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}