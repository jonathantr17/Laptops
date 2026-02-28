"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes, FaArrowRight, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";

const WHATSAPP_NUMBER = "593963351521";

interface Laptop {
  id: string;
  name: string;
  price: number;
  image: string;
  specs?: string;
  description?: string;
}

/* ─── ZOOM LENS HOOK ────────────────────────────────────────────── */
function useZoomLens() {
  const [lens, setLens] = useState<{
    x: number; y: number; visible: boolean;
    cw: number; ch: number;
  }>({ x: 0, y: 0, visible: false, cw: 0, ch: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLens({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
      cw: rect.width,
      ch: rect.height,
    });
  };

  const handleMouseLeave = () => setLens(l => ({ ...l, visible: false }));

  return { lens, handleMouseMove, handleMouseLeave };
}

/* ─── MODAL ────────────────────────────────────────────────────── */
const DetailsModal = ({ laptop, onClose }: { laptop: Laptop; onClose: () => void }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { lens, handleMouseMove, handleMouseLeave } = useZoomLens();
  const ZOOM = 1.5;
  const LENS_SIZE = 160;

  const whatsappText = encodeURIComponent(
    `Hola! Me interesa la "${laptop.name}" ($${laptop.price}). ¿Tienen stock?`
  );

  const handleAdd = () => {
    addItem({ id: laptop.id, name: laptop.name, price: laptop.price, image: laptop.image });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#080c10]/85 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0d1117] border border-white/8 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
        style={{ boxShadow: "0 0 60px rgba(99,102,241,0.12)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/5 border border-white/8 text-white/40 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
        >
          <FaTimes size={13} />
        </button>

        {/* Image with zoom lens */}
        <div
          className="md:w-[52%] flex items-center justify-center p-10 relative overflow-hidden min-h-[280px] cursor-crosshair select-none"
          style={{ background: "rgba(99,102,241,0.04)", borderRight: "1px solid rgba(255,255,255,0.05)" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glow */}
          <div
            className="absolute w-60 h-60 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          <img
            src={laptop.image}
            alt={laptop.name}
            className="relative z-10 w-full max-h-[320px] object-contain"
            draggable={false}
          />

          {/* Zoom lens */}
          {lens.visible && (
            <div
              className="absolute z-30 rounded-full border-2 border-indigo-500/60 pointer-events-none overflow-hidden shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_8px_32px_rgba(0,0,0,0.6)]"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: lens.x - LENS_SIZE / 2,
                top: lens.y - LENS_SIZE / 2,
                backgroundImage: `url(${laptop.image})`,
                backgroundSize: `${lens.cw * ZOOM}px ${lens.ch * ZOOM}px`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `${-(lens.x * ZOOM - LENS_SIZE / 2)}px ${-(lens.y * ZOOM - LENS_SIZE / 2)}px`,
              }}
            />
          )}

          {/* Zoom hint */}
          {!lens.visible && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/20 tracking-[0.15em] uppercase flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              Pasa el cursor para ampliar
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-8 md:p-10 overflow-y-auto flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-indigo-500">
              Alto rendimiento · Disponible
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide leading-none mt-2">
              {laptop.name}
            </h2>
          </div>

          <div className="font-['Bebas_Neue'] text-5xl text-indigo-500 tracking-wide leading-none">
            ${laptop.price.toLocaleString()}
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-3">
              Especificaciones técnicas
            </p>
            <div className="bg-white/[0.03] border border-white/6 rounded-xl p-5">
              <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                {laptop.specs || "Contacta para especificaciones detalladas."}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-3 font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-xl transition-all cursor-pointer border ${added
                ? "bg-green-500/15 border-green-500/40 text-green-300"
                : "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white"
                }`}
            >
              {added ? <FaCheck size={14} /> : <FaShoppingCart size={14} />}
              {added ? "¡Agregado al carrito!" : "Agregar al carrito"}
            </button>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-transparent border border-white/8 text-white/35 hover:border-white/20 hover:text-white font-semibold text-xs tracking-[0.1em] uppercase py-3.5 rounded-xl transition-all no-underline"
            >
              <FaWhatsapp size={14} />
              Consultar por WhatsApp
            </a>

            <button
              onClick={onClose}
              className="text-white/20 hover:text-white/50 text-[11px] tracking-[0.15em] uppercase py-2 transition-colors bg-transparent border-none cursor-pointer"
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── PRODUCT CARD ──────────────────────────────────────────────── */
export default function ProductCard({ laptop }: { laptop: Laptop }) {
  const [showDetails, setShowDetails] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const { lens, handleMouseMove, handleMouseLeave } = useZoomLens();
  const ZOOM = 1.5;
  const LENS_SIZE = 120;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: laptop.id, name: laptop.name, price: laptop.price, image: laptop.image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <>
      <div
        className="group bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/35"
        style={{ boxShadow: "none" }}
        onClick={() => setShowDetails(true)}
      >
        {/* Image */}
        <div
          className="relative h-56 bg-indigo-500/[0.04] border-b border-white/4 flex items-center justify-center overflow-hidden cursor-crosshair select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={e => e.stopPropagation()}
        >
          <div
            className="absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          <div className="absolute top-3 left-3 z-10 font-['Bebas_Neue'] text-lg text-indigo-400 bg-[#080c10]/80 border border-indigo-500/30 rounded-md px-2.5 py-0.5 backdrop-blur-sm tracking-wide">
            ${laptop.price.toLocaleString()}
          </div>
          <img
            src={laptop.image}
            alt={laptop.name}
            className="relative z-10 w-[85%] h-full object-contain"
            draggable={false}
          />

          {/* Zoom lens */}
          {lens.visible && (
            <div
              className="absolute z-30 rounded-full border-2 border-indigo-500/60 pointer-events-none overflow-hidden shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_4px_20px_rgba(0,0,0,0.6)]"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: lens.x - LENS_SIZE / 2,
                top: lens.y - LENS_SIZE / 2,
                backgroundImage: `url(${laptop.image})`,
                backgroundSize: `${lens.cw * ZOOM}px ${lens.ch * ZOOM}px`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `${-(lens.x * ZOOM - LENS_SIZE / 2)}px ${-(lens.y * ZOOM - LENS_SIZE / 2)}px`,
              }}
            />
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1 gap-4">
          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none transition-colors group-hover:text-indigo-300">
              {laptop.name}
            </h3>
            <p className="text-xs text-white/28 leading-relaxed mt-1.5 line-clamp-2">
              {laptop.specs || "Potencia garantizada para tus proyectos."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto" onClick={e => e.stopPropagation()}>
            {/* Details */}
            <button
              onClick={e => { e.stopPropagation(); setShowDetails(true); }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-white/8 text-white/45 hover:border-white/20 hover:text-white text-[11px] font-medium tracking-[0.12em] uppercase py-3 rounded-lg transition-all cursor-pointer"
            >
              Ver detalles
              <FaArrowRight size={9} />
            </button>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all cursor-pointer border ${justAdded
                ? "bg-green-500/20 border-green-500/40 text-green-300 scale-90"
                : "bg-indigo-500/15 border-indigo-500/35 text-indigo-300 hover:bg-indigo-500/30 hover:text-white"
                }`}
              title="Agregar al carrito"
            >
              {justAdded ? <FaCheck size={13} /> : <FaShoppingCart size={14} />}
            </button>
          </div>
        </div>
      </div>

      {showDetails && <DetailsModal laptop={laptop} onClose={() => setShowDetails(false)} />}
    </>
  );
}