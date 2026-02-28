"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaWhatsapp, FaHeadset, FaBook, FaTools, FaShippingFast, FaCheck, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const faqs = [
    {
        q: "¿Cuánto tiempo tarda el envío por Servientrega?",
        a: "El envío estándar tarda entre 24 y 48 horas hábiles a todo el país. Una vez despachado el equipo, recibirás un número de guía para rastrear tu pedido.",
    },
    {
        q: "¿Los equipos tienen garantía?",
        a: "Sí. Todos nuestros equipos cuentan con garantía oficial del fabricante (mínimo 12 meses). Además ofrecemos soporte técnico post-venta sin costo adicional.",
    },
    {
        q: "¿Puedo probar el equipo antes de comprarlo?",
        a: "Si te encuentras en La Maná, Cotopaxi, puedes visitar nuestro showroom y probar cualquier equipo disponible en nuestro inventario físico.",
    },
    {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos transferencias bancarias, depósitos, pago con tarjeta de crédito/débito (Visa, Mastercard) y pagos en cuotas previa consulta.",
    },
    {
        q: "¿Hacen reparaciones o mantenimiento?",
        a: "Sí. Contamos con técnicos certificados para mantenimiento preventivo, limpieza profunda, cambio de pasta térmica, upgrade de RAM/SSD y más.",
    },
];

const services = [
    {
        icon: FaHeadset,
        title: "Soporte Técnico",
        desc: "Atención especializada para dudas sobre tu equipo, configuración de software y diagnóstico remoto o presencial.",
        color: "rgba(99,102,241,0.15)",
        border: "rgba(99,102,241,0.3)",
        iconColor: "#818cf8",
    },
    {
        icon: FaTools,
        title: "Mantenimiento",
        desc: "Limpieza profunda, cambio de pasta térmica, actualización de RAM y SSD, reparación de hardware.",
        color: "rgba(16,185,129,0.12)",
        border: "rgba(16,185,129,0.3)",
        iconColor: "#34d399",
    },
    {
        icon: FaBook,
        title: "Asesoría de compra",
        desc: "Te ayudamos a elegir el equipo perfecto según tu presupuesto y necesidades, sin presionarte a comprar.",
        color: "rgba(139,92,246,0.12)",
        border: "rgba(139,92,246,0.3)",
        iconColor: "#a78bfa",
    },
    {
        icon: FaShippingFast,
        title: "Soporte post-venta",
        desc: "Una vez que tienes tu equipo, te acompañamos con configuración inicial, instalación de software y dudas técnicas.",
        color: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.3)",
        iconColor: "#fbbf24",
    },
];

function FAQ({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-white/6 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
                <span className="text-sm text-white/70 font-medium pr-4">{q}</span>
                <FaChevronDown
                    size={12}
                    className={`text-indigo-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01]">
                    <p className="text-sm text-white/35 leading-relaxed">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function SoportePage() {
    return (
        <div className="bg-[#080c10] min-h-screen text-white/80">
            <Navbar />

            {/* Header */}
            <header className="relative pt-32 pb-16 overflow-hidden bg-[#080c10]">
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
                />
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-indigo-500" />
                        <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500 flex items-center gap-2">
                            <FaHeadset size={10} /> Centro de soporte
                        </span>
                    </div>
                    <h1 className="font-['Bebas_Neue'] leading-[0.92] tracking-wide m-0" style={{ fontSize: "clamp(56px, 7vw, 100px)" }}>
                        <span className="text-white">Soporte </span>
                        <span className="text-indigo-500">VIP</span>
                    </h1>
                    <p className="mt-5 text-white/35 max-w-xl text-sm leading-relaxed">
                        Estamos contigo antes, durante y después de tu compra. Expertos disponibles de lunes a sábado.
                    </p>

                    {/* Quick WA CTA */}
                    <a
                        href="https://wa.me/593963351521"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white font-semibold text-xs tracking-[0.1em] uppercase px-7 py-3.5 rounded-xl transition-all no-underline"
                    >
                        <FaWhatsapp size={15} />
                        Hablar con soporte ahora
                    </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            </header>

            <main>
                {/* Services */}
                <section className="relative bg-[#080c10] px-6 md:px-12 py-20 overflow-hidden">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-8 h-px bg-indigo-500" />
                            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">Nuestros servicios</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {services.map(({ icon: Icon, title, desc, color, border, iconColor }) => (
                                <div key={title} className="group relative bg-white/[0.02] border border-white/6 rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/12 overflow-hidden">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: `radial-gradient(ellipse at top left, ${color} 0%, transparent 60%)` }}
                                    />
                                    <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110"
                                        style={{ background: color, borderColor: border, color: iconColor }}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide leading-none mb-1.5">{title}</h3>
                                        <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                                        style={{ background: `linear-gradient(90deg, ${iconColor}, transparent)` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="relative bg-[#080c10] px-6 md:px-12 pb-20 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="max-w-[860px] mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-8 h-px bg-indigo-500" />
                            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">Preguntas frecuentes</span>
                        </div>
                        <div className="space-y-3">
                            {faqs.map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
                    <div className="relative rounded-2xl overflow-hidden border border-indigo-500/15 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
                        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(8,12,16,0) 60%)" }}>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/40 via-transparent to-transparent" />
                        <div className="text-center md:text-left">
                            <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide mb-2">¿Tienes un problema técnico?</h2>
                            <p className="text-sm text-white/30">Nuestros técnicos responden en menos de 10 minutos por WhatsApp.</p>
                        </div>
                        <div className="flex gap-3 flex-wrap justify-center">
                            <a href="https://wa.me/593963351521" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2.5 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase px-7 py-4 rounded-xl transition-all no-underline">
                                <FaWhatsapp size={15} /> Soporte WhatsApp
                            </a>
                            <div className="flex items-center gap-2 text-xs text-white/20">
                                <FaCheck size={9} className="text-green-400" />
                                Lun–Sáb 8:00–18:00
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
