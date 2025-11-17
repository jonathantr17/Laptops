    "use client";

    import { useState } from "react";
    import Navbar from "../components/Navbar";
    import Footer from "../components/Footer";
    import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

    export default function ContactoPage() {
    const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
        setTimeout(() => setEnviado(false), 4000);
        setFormData({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <div className="pt-20">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-center text-green-600 mb-12">
            Contáctanos
            </h1>

            {/* Contenido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Formulario */}
            <div className="bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Envíanos un mensaje</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Enviar mensaje
                </button>

                {enviado && (
                    <p className="text-green-600 text-center font-medium animate-fadeIn">
                    ✅ Tu mensaje ha sido enviado correctamente.
                    </p>
                )}
                </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-6 text-gray-700">
                <h2 className="text-2xl font-semibold mb-6">Información de contacto</h2>

                <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-green-600 text-2xl" />
                <span className="text-lg">+593 987 654 321</span>
                </div>

                <div className="flex items-center gap-4">
                <FaEnvelope className="text-green-600 text-2xl" />
                <span className="text-lg">contacto@laptopx.com</span>
                </div>

                <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-green-600 text-2xl" />
                <span className="text-lg">La Maná, Cotopaxi, Ecuador</span>
                </div>

                {/* Mapa (opcional) */}
                <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1546091114353!2d-79.2200000!3d-0.9500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902c1f2e0b000001%3A0x123456789abcdef!2sLa%20Man%C3%A1%2C%20Cotopaxi!5e0!3m2!1ses-419!2sec!4v1699999999999"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
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