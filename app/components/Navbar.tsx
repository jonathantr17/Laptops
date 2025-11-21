"use client";

import { useState } from "react";
import { FaLaptop, FaBars, FaTimes, FaHome, FaBoxOpen, FaEnvelope } from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { text: "Inicio", href: "/", icon: <FaHome className="inline mr-2" /> },
    { text: "Productos", href: "/productos", icon: <FaBoxOpen className="inline mr-2" /> },
    { text: "Contacto", href: "/contacto", icon: <FaEnvelope className="inline mr-2" /> },
  ];

  return (
    <nav className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* 🔰 Logo */}
        <Link
          href="/"
          // CAMBIO: hover:text-indigo-500
          className="flex items-center gap-2 text-2xl font-extrabold text-white hover:text-indigo-500 transition-colors duration-300"
        >
          {/* CAMBIO: text-indigo-500 */}
          <FaLaptop className="text-indigo-500 text-3xl" />
          LaptopX
        </Link>

        {/* 🧭 Menú Desktop */}
        <div className="hidden md:flex items-center gap-10 text-gray-200 font-medium text-lg">
          {links.map(({ text, href, icon }) => (
            <Link
              key={text}
              href={href}
              // CAMBIO: hover:text-indigo-500
              className="relative group hover:text-indigo-500 px-2"
            >
              {icon}
              {text}
              {/* CAMBIO: bg-indigo-500 */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* 🎯 Botón de acción */}
        <div className="hidden md:flex">
          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            // CAMBIO: bg-indigo-600 y hover:bg-indigo-700
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-full shadow-md transition-transform transform hover:scale-105"
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
          {links.map(({ text, href, icon }) => (
            <Link 
              key={text} 
              href={href} 
              onClick={toggleMenu} 
              // CAMBIO: hover:text-indigo-500
              className="hover:text-indigo-500 transition flex items-center"
            >
              {icon}
              {text}
            </Link>
          ))}

          {/* Botón de acción móvil */}
          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
            // CAMBIO: bg-indigo-600 y hover:bg-indigo-700
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Contáctanos
          </a>
        </div>
      )}
    </nav>
  );
}