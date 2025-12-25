"use client";

import { useState, useEffect } from "react";
import React from 'react'; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi"; 
import { FiSend } from "react-icons/fi"; 

interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    mensaje: string;
}

export default function ContactoPage() {
    const [formData, setFormData] = useState<FormData>({ 
        nombre: "", email: "", telefono: "", mensaje: "" 
    });
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setLoading(false);
        setEnviado(true);
        setTimeout(() => setEnviado(false), 4000);
        setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    };

    return (
        <div className="bg-gray-950 min-h-screen text-gray-200">
            <Navbar />
            
            {/* Header con estilo Dark Tech */}
            <header className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] rounded-full -top-24 -left-24"></div>
                <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                        ¿Hablamos de <span className="text-indigo-500 italic">Tecnología?</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Estamos en La Maná para ofrecerte la mejor asesoría en laptops de alto nivel.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

                    {/* --- 1. Formulario Estilo Premium (3 Columnas) --- */}
                    <div className="lg:col-span-3 bg-gray-900/50 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <HiOutlineChatAlt2 className="text-white text-2xl"/>
                            </div>
                            Envíanos un Mensaje
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1 uppercase tracking-widest">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre completo"
                                    className="w-full bg-gray-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white placeholder:text-gray-600"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1 uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="ejemplo@correo.com"
                                    className="w-full bg-gray-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white placeholder:text-gray-600"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1 uppercase tracking-widest">Mensaje</label>
                                <textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="¿En qué podemos ayudarte?"
                                    className="w-full bg-gray-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white placeholder:text-gray-600 resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex items-center justify-center gap-3 font-black text-lg py-5 rounded-2xl shadow-xl transition-all duration-300 
                                        ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white transform hover:-translate-y-1 shadow-indigo-600/20'}
                                    `}
                                >
                                    {loading ? "ENVIANDO..." : <><FiSend /> ENVIAR CONSULTA</>}
                                </button>
                            </div>

                            {enviado && (
                                <div className="md:col-span-2 mt-4 p-4 bg-indigo-500/10 border border-indigo-500/50 text-indigo-400 rounded-2xl text-center font-bold animate-pulse">
                                    ¡Mensaje recibido! Nos pondremos en contacto pronto.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* --- 2. Info de contacto (2 Columnas) --- */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-white tracking-tighter italic">Conéctate Directo</h2>
                            <p className="text-gray-400 font-light">Si prefieres atención inmediata, utiliza nuestros canales directos:</p>
                        </div>
                        
                        <div className="space-y-6">
                            <ContactItem 
                                Icon={FaWhatsapp} 
                                title="WhatsApp" 
                                value="Chatea con nosotros" 
                                color="text-green-500"
                                link="https://wa.me/593963351521"
                            />
                            <ContactItem 
                                Icon={FaEnvelope} 
                                title="Email" 
                                value="soporte@laptopx.ec" 
                                color="text-indigo-400"
                                link="mailto:soporte@laptopx.ec"
                            />
                            <ContactItem 
                                Icon={FaMapMarkerAlt} 
                                title="Showroom" 
                                value="La Maná, Cotopaxi, Ecuador" 
                                color="text-indigo-500"
                            />
                        </div>

                        {/* Mapa Minimalista */}
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.511394593414!2d-79.2396164!3d-0.9388147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d3600649774577%3A0xf695b293375b426!2zTGEgTWFuw6E!5e0!3m2!1ses!2sec!4v1715632000000!5m2!1ses!2sec"
                                width="100%"
                                height="280"
                                style={{ border: 0 }}
                                allowFullScreen 
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const ContactItem = ({ Icon, title, value, color, link }: any) => (
    <div className="flex items-center gap-5 group">
        <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-indigo-600 group-hover:border-indigo-600`}>
            <Icon className={`text-2xl ${color} group-hover:text-white`} />
        </div>
        <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{title}</h3>
            {link ? (
                <a href={link} className="text-lg font-bold text-white hover:text-indigo-400 transition-colors">
                    {value}
                </a>
            ) : (
                <span className="text-lg font-bold text-white">{value}</span>
            )}
        </div>
    </div>
);