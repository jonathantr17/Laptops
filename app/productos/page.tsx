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
    <div className="pt-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
          Catálogo de Productos
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : formattedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos disponibles</p>
        ) : (
          <ProductSection title="" products={formattedProducts} />
        )}
      </main>
      <Footer />
    </div>
  );
}