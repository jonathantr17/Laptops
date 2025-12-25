"use client";

import { useState, useEffect } from "react";
import { FaLaptop, FaBars, FaTimes, FaHome, FaBoxOpen, FaEnvelope, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { text: "Inicio", href: "/", icon: <FaHome /> },
    { text: "Productos", href: "/productos", icon: <FaBoxOpen /> },
    { text: "Contacto", href: "/contacto", icon: <FaEnvelope /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "py-3" : "py-6"
    }`}>
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500`}>
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled 
            ? "bg-gray-950/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
            : "bg-transparent border border-transparent"
        }`}>
          
          {/* 🔰 Logo Estilizado */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-indigo-600 p-2 rounded-lg text-white shadow-lg">
                <FaLaptop className="text-xl" />
              </div>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
              LAPTOP<span className="text-indigo-500">X</span>
            </span>
          </Link>

          {/* 🧭 Menú Desktop (Centrado) */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ text, href }) => (
              <Link
                key={text}
                href={href}
                className="px-5 py-2 text-sm font-bold text-gray-400 hover:text-white transition-all rounded-full hover:bg-white/5 relative group"
              >
                {text}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            ))}
          </div>

          {/* 🎯 Acciones */}
          <div className="hidden md:flex items-center gap-5">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors group">
              <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
              <span className="absolute top-0 right-0 bg-indigo-600 text-[9px] font-black text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-gray-950">
                0
              </span>
            </button>

            <a
              href="https://wa.me/593963351521"
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 text-xs uppercase tracking-widest"
            >
              <FaWhatsapp className="text-lg" />
              Consultar
            </a>
          </div>

          {/* 📱 Controles Móviles */}
          <div className="md:hidden flex items-center gap-5">
            <div className="relative text-gray-400">
               <FaShoppingCart className="text-xl" />
               <span className="absolute -top-2 -right-2 bg-indigo-600 text-[8px] text-white w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white bg-white/5 p-2.5 rounded-xl border border-white/10"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Menú móvil (Overlay Moderno) */}
      <div className={`md:hidden absolute top-full left-0 w-full px-6 transition-all duration-500 ${
        menuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"
      }`}>
        <div className="bg-gray-950 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-6">
            {links.map(({ text, href, icon }) => (
              <Link 
                key={text} 
                href={href} 
                onClick={() => setMenuOpen(false)} 
                className="flex items-center justify-between text-gray-300 text-lg font-bold group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-indigo-500">{icon}</span>
                  {text}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <FaArrowRight size={12} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/593963351521"
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20"
          >
            <FaWhatsapp size={24} />
            CHAT DIRECTO
          </a>
        </div>
      </div>
    </nav>
  );
}

// Necesitas importar FaArrowRight de react-icons/fa para el menú móvil
import { FaArrowRight } from "react-icons/fa";