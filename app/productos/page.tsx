"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";

export default function ProductosPage() {
  const productos = [
    { id: "l1", name: "Lenovo IdeaPad 3", specs: "Intel i5 · 8GB · 512GB", price: 439, image: "/images/laptop1.png" },
    { id: "l2", name: "HP 14-DQ", specs: "Intel i3 · 8GB · 256GB", price: 379, image: "/images/laptop1.png", offer: "10% OFF" },
    { id: "l3", name: "Asus TUF Gaming", specs: "AMD Ryzen 7 · 16GB · 1TB", price: 1099, image: "/images/laptop1.png" },
    { id: "l4", name: "MacBook Air M2", specs: "M2 · 8GB · 256GB", price: 1199, image: "/images/laptop1.png", offer: "Nuevo" },
    { id: "l5", name: "Acer Aspire 5", specs: "Intel i7 · 12GB · 1TB", price: 899, image: "/images/laptop1.png" },
    { id: "l6", name: "HP Victus", specs: "Ryzen 5 · 16GB · 512GB", price: 799, image: "/images/laptop1.png" },
  ];

  return (
    <div className="pt-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
          Catálogo de Productos
        </h1>
        <ProductSection title="Todos los Productos" products={productos} />
      </main>
      <Footer />
    </div>
  );
}