"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import { FaCheckCircle, FaShippingFast, FaHeadset } from "react-icons/fa";

// Datos de ejemplo
const ofertas = [
  { id: "o1", name: "Dell Inspiron 15", price: 399, image: "/images/laptop1.png" },
  { id: "o2", name: "MacBook Air M1", price: 899, image: "/images/laptop1.png" },
  { id: "o3", name: "HP Pavilion", price: 549, image: "/images/laptop1.png" },
];

const productos = [
  { id: "l1", name: "Lenovo IdeaPad 3", specs: "Intel i5 · 8GB · 512GB", price: 439, image: "/images/laptop1.png" },
  { id: "l2", name: "HP 14-DQ", specs: "Intel i3 · 8GB · 256GB", price: 379, image: "/images/laptop1.png", offer: "10% OFF" },
  { id: "l3", name: "Asus TUF Gaming", specs: "AMD Ryzen 7 · 16GB · 1TB", price: 1099, image: "/images/laptop1.png" },
  { id: "l4", name: "MacBook Air M2", specs: "M2 · 8GB · 256GB", price: 1199, image: "/images/laptop1.png", offer: "Nuevo" },
  { id: "l5", name: "Acer Aspire 5", specs: "Intel i7 · 12GB · 1TB", price: 899, image: "/images/laptop1.png" },
  { id: "l6", name: "HP Victus", specs: "Ryzen 5 · 16GB · 512GB", price: 799, image: "/images/laptop1.png" },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">

        {/* 🔥 Ofertas especiales */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-red-600">Ofertas especiales</h2>
          <Carousel items={ofertas} />
        </section>

        {/* 💻 Sección de productos moderna */}
        <section id="productos">
          <ProductSection title="Nuestros Productos" products={productos} />
        </section>

        {/* ⭐ Catálogo Especial */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Catálogo Especial</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="/images/laptop1.png" 
                alt="Promoción Especial" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">Promoción Especial de Temporada</h3>
              <p className="text-gray-600 mb-6">
                Aprovecha nuestra oferta exclusiva de laptops con los mejores precios y garantía de calidad.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition transform hover:-translate-y-1 hover:scale-105">
                Ver Promoción
              </button>
            </div>
          </div>
        </section>

        {/* 🧭 Sobre Nosotros */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sobre Nosotros</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">
              En <span className="font-semibold text-green-600">LaptopX</span> nos dedicamos a ofrecer las mejores laptops del mercado a precios accesibles. 
              Nuestra misión es brindar a nuestros clientes productos de calidad, atención personalizada y 
              un servicio confiable. ¡Descubre nuestra selección y encuentra la laptop perfecta para ti!
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-600 w-16 h-16 mb-4 animate-bounce" />
                <h4 className="font-semibold text-lg mb-2">Calidad Garantizada</h4>
                <p className="text-gray-600 text-center max-w-xs">
                  Todos nuestros productos pasan estrictos controles de calidad para asegurar su satisfacción.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaShippingFast className="text-blue-500 w-16 h-16 mb-4 animate-pulse" />
                <h4 className="font-semibold text-lg mb-2">Envío Rápido</h4>
                <p className="text-gray-600 text-center max-w-xs">
                  Entregamos tus productos de manera rápida y segura directamente a tu domicilio.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaHeadset className="text-purple-600 w-16 h-16 mb-4 animate-spin-slow" />
                <h4 className="font-semibold text-lg mb-2">Soporte 24/7</h4>
                <p className="text-gray-600 text-center max-w-xs">
                  Nuestro equipo de soporte está disponible para ayudarte en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}