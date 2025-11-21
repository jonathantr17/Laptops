import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaHome, FaBoxOpen, FaLaptop } from "react-icons/fa"; // Importamos FaLaptop
import Link from "next/link"; 

export default function Footer() {
  const links = [
    { text: "Inicio", href: "/", icon: <FaHome className="inline mr-2" /> },
    { text: "Productos", href: "/productos", icon: <FaBoxOpen className="inline mr-2" /> },
    { text: "Contacto", href: "/contacto", icon: <FaEnvelope className="inline mr-2" /> },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 shadow-inner-lg">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Contenido principal: 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-10 mb-10">
          
          {/* 🖥️ Columna 1: Sobre la tienda (ÍCONO CAMBIADO) */}
          <div className="space-y-3">
            {/* CAMBIO: Usamos FaLaptop en lugar de FaBoxOpen */}
            <h4 className="text-indigo-400 font-extrabold mb-3 text-xl flex items-center gap-2">
                <FaLaptop className="text-indigo-500"/> LaptopX
            </h4>
            <p className="text-gray-400">Tu tienda de confianza para laptops en Ecuador. Ofrecemos calidad, garantía y el mejor soporte.</p>
          </div>
          
          {/* 🔗 Columna 2: Enlaces */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xl tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {links.map(({ text, href, icon }) => (
                <li key={text}>
                  <Link href={href} className="hover:text-indigo-400 transition-colors flex items-center text-lg">
                    {icon}
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 📞 Columna 3: Contacto y Redes */}
          <div className="space-y-3">
            <h4 className="text-white font-bold mb-5 text-xl tracking-wide">Contáctanos</h4>
            
            <p className="flex items-center gap-2 text-gray-400"><FaMapMarkerAlt className="text-indigo-500"/> La Maná, Cotopaxi</p>
            <p className="flex items-center gap-2 text-gray-400"><FaPhone className="text-indigo-500"/> 0963351521</p>
            <p className="flex items-center gap-2 text-gray-400"><FaEnvelope className="text-indigo-500"/> soporte@laptopx.ec</p>
            
            {/* Redes sociales */}
            <div className="flex gap-5 pt-4">
              <a href="#" className="hover:text-indigo-500 transition-colors"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-indigo-500 transition-colors"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-indigo-500 transition-colors"><FaTwitter size={24} /></a>
            </div>
          </div>
        </div>

        {/* Derechos de Autor */}
        <div className="pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LaptopX. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}