"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditarProducto() {
  const params = useSearchParams();
  const id = params.get("id");

  const [data, setData] = useState({
    title: "",
    specs: "",
    price: "",
    imageUrl: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  // Cargar datos del producto
  useEffect(() => {
    if (!id) return;

    async function load() {
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) {
        setData(snap.data() as any);
      }
    }

    load();
  }, [id]);

  // Manejo de imagen
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("Actualizando...");

    try {
      let imageUrl = data.imageUrl;

      // Si el usuario seleccionó una nueva imagen
      if (image instanceof File) {
        const uniqueName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
        const imageRef = ref(storage, `products/${uniqueName}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Guardar actualizaciones en Firestore
      await updateDoc(doc(db, "products", id!), {
        title: data.title,
        specs: data.specs,
        price: parseFloat(String(data.price)) || 0,
        imageUrl,
      });

      setMsg("✔ Producto actualizado correctamente");
    } catch (err) {
      console.error(err);
      setMsg("❌ Error al actualizar");
    }
  };

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>

      {!id ? (
        <p className="text-red-500">ID inválida</p>
      ) : (
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

          {/* Vista previa */}
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              className="w-full h-40 object-cover rounded"
            />
          )}

          <input
            type="file"
            className="w-full p-3 border rounded"
            onChange={handleImage}
            accept="image/*"
          />

          <button className="bg-blue-600 text-white p-3 rounded">
            Guardar Cambios
          </button>
        </form>
      )}

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}