"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";

interface Producto {
  id: string;
  title: string;
  specs: string;
  price: number;
  imageUrl: string;
  offer?: string;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  // Traer productos desde Firestore
  const fetchProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items: Producto[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          title: data.title,
          specs: data.specs,
          price: data.price,
          imageUrl: data.imageUrl,
          offer: data.offer || undefined,
        });
      });
      setProductos(items);
    } catch (error) {
      console.error("Error al traer productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Mapear productos para que ProductSection los reciba correctamente
  const formattedProducts = productos.map((p) => ({
    id: p.id,
    name: p.title,
    specs: p.specs,
    price: p.price,
    image: p.imageUrl,
    offer: p.offer,
  }));

  return (
    <div className="pt-20 bg-gray-50 min-h-screen"> {/* Agregamos un fondo sutil */}
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">

        {/* CAMBIO: text-indigo-600 y estilo más impactante */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-600 mb-0 tracking-tight">
          Nuestros productos
        </h1>

        {loading ? (
          // Mejora visual del estado de carga
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p className="ml-4 text-lg text-gray-600">Cargando productos...</p>
          </div>
        ) : formattedProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-500 py-20">
            Aún no hay productos disponibles en el catálogo.
          </p>
        ) : (
          <ProductSection title="" products={formattedProducts} />
        )}
      </main>
      <Footer />
    </div>
  );
}