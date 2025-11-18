"use client";
import { useState } from "react";
import { db, storage } from "@/lib/firebase"; // ✅ CORRECTO
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [specs, setSpecs] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !specs || !price || !image) {
      setMessage("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setMessage("Subiendo imagen..."); // 👀
    try {
      // Subir imagen
      const imageRef = ref(storage, `products/${image.name}`);
      console.log("🚀 Subiendo imagen a:", imageRef.fullPath); // 👀
      const snapshot = await uploadBytes(imageRef, image);
      console.log("✅ Imagen subida:", snapshot.metadata.fullPath); // 👀

      setMessage("Obteniendo URL..."); // 👀
      const imageUrl = await getDownloadURL(imageRef);
      console.log("🌐 URL obtenida:", imageUrl); // 👀

      setMessage("Guardando datos en Firestore..."); // 👀
      await addDoc(collection(db, "products"), {
        title,
        specs,
        price: parseFloat(price),
        imageUrl,
      });

      setMessage("✅ Producto agregado con éxito");
      setTitle("");
      setSpecs("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("🔥 Error:", error); // 👀
      setMessage("❌ Error al subir el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Título del producto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          placeholder="Especificaciones"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Subiendo..." : "Agregar Producto"}
        </button>
      </form>

      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}