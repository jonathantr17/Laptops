"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// Importamos 'doc', 'getDoc', y 'updateDoc' con sus tipos
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Definimos la estructura de datos para mejor tipado
interface ProductData {
  title: string;
  specs: string;
  // Usamos string para el input y lo convertiremos a number al guardar
  price: string; 
  imageUrl: string;
}

export default function EditarProducto() {
  const params = useSearchParams();
  // id puede ser string | null, lo manejamos en useEffect y save
  const id = params.get("id"); 

  const [data, setData] = useState<ProductData>({
    title: "",
    specs: "",
    price: "",
    imageUrl: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true); // Nuevo estado para la carga inicial

  // Cargar datos del producto
  useEffect(() => {
    // Verificamos si el ID no es null antes de llamar a Firestore
    if (!id) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const snap = await getDoc(doc(db, "products", id));
        if (snap.exists()) {
          // Aseguramos que price se guarde como string para el input
          const productData = snap.data();
          setData({
            ...productData,
            price: String(productData.price), // Convertimos el número a string para el input
          } as ProductData);
        }
      } catch (error) {
        console.error("Error al cargar producto:", error);
        setMsg("Error al cargar el producto.");
      } finally {
        setLoading(false);
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

    // CORRECCIÓN CLAVE: Aseguramos que ID sea un string válido.
    if (!id) {
        setMsg("❌ Error: ID del producto no encontrado.");
        return;
    }

    try {
      let imageUrl = data.imageUrl;

      // Si el usuario seleccionó una nueva imagen
      if (image instanceof File) {
        const uniqueName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
        const imageRef = ref(storage, `products/${uniqueName}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
        setMsg("Imagen subida. Guardando datos...");
      }

      // Convertimos el precio a float (número) antes de guardar en Firestore
      const newPrice = parseFloat(data.price); 

      // Guardar actualizaciones en Firestore
      await updateDoc(doc(db, "products", id), { // Ya no necesitamos 'id!'
        title: data.title,
        specs: data.specs,
        // Usamos newPrice, asegurando que sea un número. Si es NaN, usamos 0.
        price: isNaN(newPrice) ? 0 : newPrice, 
        imageUrl,
      });

      setMsg("✔ Producto actualizado correctamente");
    } catch (err) {
      console.error("Error al guardar:", err);
      setMsg("❌ Error al actualizar");
    }
  };

  if (loading) {
    return (
        <div className="p-10 text-center">
            <p>Cargando datos del producto...</p>
        </div>
    );
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Editar Producto</h1>

      {/* Si ID es null (después de cargar), mostramos error */}
      {!id ? (
        <p className="text-red-500 font-semibold">❌ Error: ID inválida o no proporcionada en la URL.</p>
      ) : (
        <form onSubmit={save} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
          
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Nombre del producto"
              required
            />
          </div>

          {/* Especificaciones */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Especificaciones</label>
            <textarea
              value={data.specs}
              onChange={(e) => setData({ ...data, specs: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Especificaciones (RAM, CPU, etc.)"
              rows={4}
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Precio ($)</label>
            <input
              type="number"
              // Usamos un patrón regex simple para asegurar números decimales positivos
              pattern="[0-9]+([\.,][0-9]+)?" 
              step="0.01"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Precio"
              required
            />
          </div>

          {/* Imagen Actual y Selector de Nueva Imagen */}
          <div className="space-y-3">
            <h3 className="text-gray-700 font-medium">Imagen del producto</h3>
            
            {/* Vista previa */}
            {data.imageUrl && (
              <img
                src={data.imageUrl}
                alt="Imagen actual"
                className="w-full h-40 object-contain rounded-lg border border-gray-200 p-2 bg-gray-50"
              />
            )}

            <label className="block text-sm text-gray-500">
              {data.imageUrl ? "Seleccionar nueva imagen (opcional):" : "Seleccionar imagen:"}
            </label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleImage}
              accept="image/*"
            />
          </div>
          

          <button 
            type="submit" 
            disabled={!!msg.includes("Actualizando") || loading}
            className={`w-full text-white p-3 rounded-lg font-bold transition duration-300 
                ${msg.includes("Actualizando") || loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                }`}
          >
            {msg.includes("Actualizando") ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      )}

      {/* Mensaje de estado */}
      {msg && <p className={`mt-4 font-semibold ${msg.includes("✔") ? 'text-green-600' : msg.includes("❌") ? 'text-red-600' : 'text-indigo-600'}`}>{msg}</p>}
    </div>
  );
}