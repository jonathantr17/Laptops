"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaBoxOpen, FaEnvelope, FaHeadset, FaShoppingCart, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { text: "Catálogo", href: "/productos", icon: <FaBoxOpen /> },
    { text: "Contacto", href: "/contacto", icon: <FaEnvelope /> },
    { text: "Soporte", href: "/soporte", icon: <FaHeadset /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
        ? "bg-[#080c10]/95 backdrop-blur-xl border-b border-white/7"
        : "bg-transparent border-b border-white/4"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-['Bebas_Neue'] text-[22px] tracking-[0.12em] text-white no-underline">
          Nexus<span className="text-indigo-500">Tech</span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-0 list-none m-0 p-0">
          {links.map(({ text, href }) => (
            <li key={text}>
              <Link
                href={href}
                className="block px-5 py-2 text-[13px] font-medium tracking-[0.05em] text-white/40 hover:text-white transition-colors no-underline"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative text-white/35 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 group"
          >
            <FaShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-indigo-600 text-[9px] font-bold text-white flex items-center justify-center transition-all">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>

          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-medium tracking-[0.08em] uppercase px-5 py-2.5 rounded-lg transition-all no-underline"
          >
            <FaWhatsapp size={13} />
            Cotizar ahora
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative text-white/40 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <FaShoppingCart size={17} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-indigo-600 text-[9px] font-bold text-white flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
          <button
            className="flex items-center justify-center bg-white/5 border border-white/10 text-white p-2 rounded-lg cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={17} /> : <FaBars size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#080c10]/98 border-b border-white/7 backdrop-blur-xl px-6 py-4 flex flex-col">
          {links.map(({ text, href, icon }) => (
            <Link
              key={text}
              href={href}
              className="flex items-center justify-between py-4 border-b border-white/5 text-white/55 hover:text-white text-[15px] font-medium tracking-[0.04em] transition-colors no-underline last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="text-indigo-500 text-sm">{icon}</span>
                {text}
              </span>
              <FaArrowRight size={11} className="text-white/20" />
            </Link>
          ))}
          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2.5 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase py-4 rounded-xl transition-all no-underline"
          >
            <FaWhatsapp size={16} />
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}