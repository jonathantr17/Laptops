"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
    FaWhatsapp, FaArrowRight, FaCheck,
} from "react-icons/fa";

const WHATSAPP = "593963351521";

interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    mensaje: string;
}

const contactItems = [
    {
        icon: FaWhatsapp,
        label: "WhatsApp",
        value: "+593 963 351 521",
        href: `https://wa.me/${WHATSAPP}`,
        color: "rgba(16,185,129,0.15)",
        border: "rgba(16,185,129,0.3)",
        iconColor: "#34d399",
    },
    {
        icon: FaEnvelope,
        label: "Email",
        value: "soporte@laptopx.ec",
        href: "mailto:soporte@laptopx.ec",
        color: "rgba(99,102,241,0.15)",
        border: "rgba(99,102,241,0.3)",
        iconColor: "#818cf8",
    },
    {
        icon: FaPhoneAlt,
        label: "Teléfono",
        value: "+593 963 351 521",
        href: "tel:+593963351521",
        color: "rgba(139,92,246,0.15)",
        border: "rgba(139,92,246,0.3)",
        iconColor: "#a78bfa",
    },
    {
        icon: FaMapMarkerAlt,
        label: "Showroom",
        value: "La Maná, Cotopaxi — Ecuador",
        href: undefined,
        color: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.3)",
        iconColor: "#fbbf24",
    },
];

export default function ContactoPage() {
    const [form, setForm] = useState<FormData>({ nombre: "", email: "", telefono: "", mensaje: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        await new Promise(r => setTimeout(r, 1500));
        setStatus("success");
        setTimeout(() => {
            setStatus("idle");
            setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
        }, 3500);
    };

    return (
        <div className="bg-[#080c10] min-h-screen text-white/80">
            <Navbar />

            {/* ── Header ──────────────────────────────────────── */}
            <header className="relative pt-32 pb-16 overflow-hidden">
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
                        <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
                            Estamos aquí para ti
                        </span>
                    </div>
                    <h1 className="font-['Bebas_Neue'] leading-[0.92] tracking-wide m-0" style={{ fontSize: "clamp(56px, 7vw, 100px)" }}>
                        <span className="text-white">¿Hablamos de </span>
                        <span className="text-indigo-500">Tecnología?</span>
                    </h1>
                    <p className="mt-5 text-white/35 max-w-xl text-sm leading-relaxed">
                        Estamos en La Maná para ofrecerte la mejor asesoría en laptops de alto rendimiento.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            </header>

            <main className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                    {/* ── Form (3 cols) ───────────────────────────── */}
                    <div className="lg:col-span-3 bg-white/[0.02] border border-white/6 rounded-2xl p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-6 h-px bg-indigo-500" />
                            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-indigo-500">
                                Formulario de contacto
                            </span>
                        </div>

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                                        <FaCheck size={22} className="text-green-400" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
                                </div>
                                <div>
                                    <p className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">¡Mensaje recibido!</p>
                                    <p className="text-sm text-white/35 mt-2">Nos pondremos en contacto contigo muy pronto.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[
                                    { name: "nombre", label: "Nombre completo", type: "text", placeholder: "Juan Pérez", col: 1 },
                                    { name: "email", label: "Correo electrónico", type: "email", placeholder: "juan@correo.com", col: 1 },
                                    { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", placeholder: "+593 9...", col: 2 },
                                ].map(({ name, label, type, placeholder, col }) => (
                                    <div key={name} className={col === 2 ? "md:col-span-2" : ""}>
                                        <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">
                                            {label}
                                        </label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={(form as any)[name]}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            required
                                            className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                                        />
                                    </div>
                                ))}

                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">
                                        Mensaje
                                    </label>
                                    <textarea
                                        name="mensaje"
                                        value={form.mensaje}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all resize-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className={`w-full flex items-center justify-center gap-3 font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-xl transition-all border cursor-pointer ${status === "sending"
                                                ? "bg-white/4 border-white/8 text-white/20 cursor-not-allowed"
                                                : "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white"
                                            }`}
                                    >
                                        {status === "sending" ? (
                                            <><div className="w-3.5 h-3.5 border-2 border-indigo-400/40 border-t-indigo-400 rounded-full animate-spin" /> Enviando...</>
                                        ) : (
                                            <>Enviar consulta <FaArrowRight size={11} /></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* ── Info (2 cols) ───────────────────────────── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Contact cards */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-6 h-px bg-indigo-500" />
                            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-indigo-500">
                                Contacto directo
                            </span>
                        </div>

                        <div className="space-y-3">
                            {contactItems.map(({ icon: Icon, label, value, href, color, border, iconColor }) => {
                                const inner = (
                                    <div className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/6 rounded-xl transition-all hover:border-white/12 hover:-translate-y-0.5">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 transition-all group-hover:scale-110"
                                            style={{ background: color, borderColor: border, color: iconColor }}>
                                            <Icon size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-medium tracking-[0.15em] uppercase mb-0.5" style={{ color: iconColor }}>{label}</p>
                                            <p className="text-sm text-white/70">{value}</p>
                                        </div>
                                    </div>
                                );
                                return href ? (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block no-underline">{inner}</a>
                                ) : (
                                    <div key={label}>{inner}</div>
                                );
                            })}
                        </div>

                        {/* Map */}
                        <div className="rounded-2xl overflow-hidden border border-white/6 mt-2" style={{ filter: "grayscale(100%) brightness(0.5) contrast(1.2)" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.511394593414!2d-79.2396164!3d-0.9388147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d3600649774577%3A0xf695b293375b426!2zTGEgTWFuw6E!5e0!3m2!1ses!2sec!4v1715632000000!5m2!1ses!2sec"
                                width="100%"
                                height="240"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>

                        {/* WA quick */}
                        <a
                            href={`https://wa.me/${WHATSAPP}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-xl transition-all no-underline"
                        >
                            <FaWhatsapp size={15} />
                            Consulta rápida por WhatsApp
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}