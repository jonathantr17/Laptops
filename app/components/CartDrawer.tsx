"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import CheckoutModal from "./CheckoutModal";
import {
    FaTimes, FaPlus, FaMinus, FaTrash,
    FaWhatsapp, FaShoppingBag, FaArrowRight,
} from "react-icons/fa";

const WHATSAPP = "593963351521";

export default function CartDrawer() {
    const { items, count, total, isOpen, removeItem, updateQty, clearCart, closeCart } = useCart();
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const buildWhatsAppMsg = () => {
        const lines = items.map(i => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toLocaleString()}`);
        return encodeURIComponent(
            `¡Hola! Quiero realizar el siguiente pedido:\n\n${lines.join("\n")}\n\n💰 Total: $${total.toLocaleString()}\n\n¿Pueden confirmarme?`
        );
    };

    const handleCheckout = () => {
        closeCart();
        setCheckoutOpen(true);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-[150] bg-[#080c10]/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-[200] bg-[#0d1117] border-l border-white/8 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
                    <div className="flex items-center gap-3">
                        <FaShoppingBag size={15} className="text-indigo-400" />
                        <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none">Tu Carrito</span>
                        {count > 0 && (
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                                {count}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {items.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-[11px] text-white/20 hover:text-white/50 tracking-[0.1em] uppercase transition-colors bg-transparent border-none cursor-pointer"
                            >
                                Limpiar
                            </button>
                        )}
                        <button
                            onClick={closeCart}
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 text-white/40 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                        >
                            <FaTimes size={13} />
                        </button>
                    </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/6 flex items-center justify-center">
                                <FaShoppingBag size={22} className="text-white/15" />
                            </div>
                            <div>
                                <p className="font-['Bebas_Neue'] text-2xl text-white/20 tracking-wide">Carrito vacío</p>
                                <p className="text-xs text-white/15 mt-1">Agrega equipos para continuar</p>
                            </div>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 p-4 bg-white/[0.025] border border-white/5 rounded-xl group">
                                <div className="w-16 h-16 rounded-lg bg-indigo-500/8 border border-white/5 flex items-center justify-center flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-['Bebas_Neue'] text-lg text-white tracking-wide leading-none line-clamp-1">{item.name}</h4>
                                    <p className="text-indigo-400 font-['Bebas_Neue'] text-xl tracking-wide leading-none mt-0.5">
                                        ${item.price.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2.5">
                                        <button
                                            onClick={() => updateQty(item.id, item.quantity - 1)}
                                            className="w-6 h-6 rounded-md bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                                        >
                                            <FaMinus size={9} />
                                        </button>
                                        <span className="text-sm text-white w-5 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQty(item.id, item.quantity + 1)}
                                            className="w-6 h-6 rounded-md bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                                        >
                                            <FaPlus size={9} />
                                        </button>
                                        <span className="ml-auto text-xs text-white/30">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="self-start text-white/15 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-0 opacity-0 group-hover:opacity-100"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-white/6 px-6 py-6 space-y-3">
                        {/* Total */}
                        <div className="flex items-end justify-between mb-4">
                            <span className="text-[11px] text-white/30 tracking-[0.15em] uppercase">Total estimado</span>
                            <div className="text-right">
                                <span className="font-['Bebas_Neue'] text-4xl text-indigo-400 tracking-wide leading-none">
                                    ${total.toLocaleString()}
                                </span>
                                <p className="text-[10px] text-white/20 mt-0.5">Envío gratis a todo Ecuador</p>
                            </div>
                        </div>

                        {/* PRIMARY: Comprar ahora */}
                        <button
                            onClick={handleCheckout}
                            className="flex items-center justify-center gap-3 w-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-xl transition-all cursor-pointer group"
                        >
                            Comprar ahora
                            <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* SECONDARY: WhatsApp directo */}
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=${buildWhatsAppMsg()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full bg-transparent border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60 font-medium text-xs tracking-[0.1em] uppercase py-3.5 rounded-xl transition-all no-underline"
                        >
                            <FaWhatsapp size={13} />
                            Pedir por WhatsApp
                        </a>

                        <p className="text-center text-[10px] text-white/15 tracking-[0.06em]">
                            Confirmaremos disponibilidad y coordinaremos el pago
                        </p>
                    </div>
                )}
            </div>

            {/* Checkout modal */}
            {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
        </>
    );
}
