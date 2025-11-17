"use client";

import { useState } from "react";
import { FaLaptop, FaBars, FaTimes } from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* 🔰 Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-white hover:text-green-500 transition-colors duration-300"
        >
          <FaLaptop className="text-green-500 text-3xl" />
          LaptopX
        </Link>

        {/* 🧭 Menú Desktop */}
        <div className="hidden md:flex items-center gap-10 text-gray-200 font-medium text-lg">
          <Link href="/" className="hover:text-green-500 transition-colors duration-200">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-green-500 transition-colors duration-200">
            Productos
          </Link>
          <Link href="/contacto" className="hover:text-green-500 transition-colors duration-200">
            Contacto
          </Link>
        </div>

        {/* 🎯 Botón de acción */}
        <div className="hidden md:flex">
          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Contáctanos
          </a>
        </div>

        {/* 📱 Botón Móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none transition-transform transform hover:scale-110"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg flex flex-col items-center py-6 space-y-4 text-gray-200 font-medium text-lg">
          <Link href="/" onClick={toggleMenu} className="hover:text-green-500 transition">
            Inicio
          </Link>
          <Link href="/productos" onClick={toggleMenu} className="hover:text-green-500 transition">
            Productos
          </Link>
          <Link href="/contacto" onClick={toggleMenu} className="hover:text-green-500 transition">
            Contacto
          </Link>

          {/* Botón de acción móvil */}
          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Contáctanos
          </a>
        </div>
      )}
    </nav>
  );
}