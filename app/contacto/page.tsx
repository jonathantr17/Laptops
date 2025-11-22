"use client";

import { useState } from "react";
// 1. IMPORTAR REACT para tipos de eventos
import React from 'react'; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi"; 
import { FiSend } from "react-icons/fi"; 

// Definir la estructura de datos para mejor tipado (ayuda a TS)
interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    mensaje: string;
}

export default function ContactoPage() {
    const [formData, setFormData] = useState<FormData>({ 
        nombre: "", 
        email: "", 
        telefono: "", 
        mensaje: "" 
    });
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false); 

    // 2. CORRECCIÓN: Tipado de handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 3. CORRECCIÓN: Tipado de handleSubmit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // *** Lógica simulada de envío ***
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        setLoading(false);
        setEnviado(true);
        
        // Limpiar formulario y ocultar mensaje de éxito
        setTimeout(() => setEnviado(false), 4000);
        setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    };

    // ... (El comentario sobre la línea 42 se ignora al ser JSX)

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            
            {/* CORRECCIÓN DE ESPACIO EN BLANCO: Agregamos pt-20 al header. */}
            <header className="bg-indigo-600 pt-20 pb-12 mb-10 shadow-xl">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-extrabold text-white mb-3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Tienda Online
                    </h1>
                    <p className="text-xl text-indigo-200 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                        Tienda Online - Contáctanos para más información
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Contenido (Formulario y Contacto Info) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* --- 1. Formulario --- */}
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100 animate-fadeInUp">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                            <HiOutlineChatAlt2 className="text-indigo-600"/>
                            Envíanos un Mensaje
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Nombre */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre completo"
                                    className="w-full p-3 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300"
                                />
                            </div>

                            {/* Correo Electrónico */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="ejemplo@correo.com"
                                    className="w-full p-3 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300"
                                />
                            </div>

                            {/* Teléfono (Nuevo Campo y opcional) */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Teléfono (Opcional)</label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="+593 9..."
                                    className="w-full p-3 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300"
                                />
                            </div>

                            {/* Mensaje */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Mensaje</label>
                                <textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Describe tu solicitud o pregunta..."
                                    className="w-full p-3 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300 resize-none"
                                />
                            </div>

                            {/* Botón de Envío con estado de carga */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-3 font-bold py-3 rounded-xl shadow-xl transition-all duration-300 
                                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-[1.01] hover:shadow-indigo-300/80'}
                                `}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-5 h-5"/>
                                        Enviar Mensaje
                                    </>
                                )}
                            </button>

                            {/* Aviso de Éxito (más moderno) */}
                            {enviado && (
                                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center font-medium shadow-md animate-fadeIn">
                                    ✅ ¡Excelente! Tu mensaje ha sido enviado y te responderemos pronto.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* --- 2. Información de contacto y Mapa --- */}
                    <div className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                        <h2 className="text-3xl font-bold text-gray-900">Nuestros Canales</h2>
                        
                        <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-gray-100">
                            
                            {/* Ítem: Teléfono */}
                            <ContactItem 
                                Icon={FaPhoneAlt} 
                                title="Llámanos" 
                                value="+593 987 654 321" 
                                color="text-green-600"
                            />
                            
                            {/* Ítem: WhatsApp */}
                            <ContactItem 
                                Icon={FaWhatsapp} 
                                title="WhatsApp Directo" 
                                value="¡Chatea con nosotros!" 
                                color="text-green-500"
                                link="https://wa.me/593963351521"
                            />

                            {/* Ítem: Correo */}
                            <ContactItem 
                                Icon={FaEnvelope} 
                                title="Correo Electrónico" 
                                value="contacto@laptopx.com" 
                                color="text-red-500"
                                link="mailto:contacto@laptopx.com"
                            />

                            {/* Ítem: Dirección */}
                            <ContactItem 
                                Icon={FaMapMarkerAlt} 
                                title="Ubicación" 
                                value="La Maná, Cotopaxi, Ecuador" 
                                color="text-blue-500"
                            />
                        </div>

                        {/* Mapa Mejorado */}
<div className="mt-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
    <iframe
        // CORRECCIÓN 1: La URL de tu código anterior (https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.771120038936!2d-79.22723659999999!3d-0.9366453999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d547f48b9f1d85%3A0x6b772074d2e7b752!2sLa%20Man%C3%A1%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1678896000000!5m2!1sen!2sus) es INVÁLIDA.
        // Usamos una URL de ejemplo de Google Maps Embed (necesitarás cambiar el 'embed' con tu ubicación real)
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15767.114516752765!2d-79.37941214041695!3d-0.9405615757973715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5757a4146c641%3A0x6a0535e6912301f2!2sLa%20Man%C3%A1!5e0!3m2!1ses-419!2sec!4v1700609000000!5m2!1ses-419!2sec"
        width="100%"
        height="300"
        style={{ border: 0 }}
        // CORRECCIÓN 2: Eliminamos las comillas vacías. Solo se pone el atributo.
        allowFullScreen 
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Ubicación de La Maná, Cotopaxi"
    ></iframe>
</div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Interfaz para ContactItem
interface ContactItemProps {
    Icon: React.ElementType;
    title: string;
    value: string;
    color: string;
    link?: string;
}

// 4. CORRECCIÓN: Tipado de ContactItem
const ContactItem = ({ Icon, title, value, color, link }: ContactItemProps) => (
    <div className="flex items-center gap-4 group">
        <div className={`p-3 rounded-full ${color} bg-opacity-10 transition duration-300 group-hover:bg-opacity-20`}>
            <Icon className={`text-2xl ${color}`} />
        </div>
        
        <div className="flex flex-col">
            <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
            {link ? (
                <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    // Nota: Aquí se usa text-indigo-600 para los enlaces, pero el color primario
                    // del ContactItem es definido por la prop `color`.
                    className={`text-indigo-600 hover:text-indigo-800 font-medium transition duration-300 underline-offset-4`}
                >
                    {value}
                </a>
            ) : (
                <span className="text-gray-600 font-medium">{value}</span>
            )}
        </div>
    </div>
);