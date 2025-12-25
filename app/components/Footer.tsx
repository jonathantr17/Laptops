import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaHome, FaBoxOpen, FaLaptop, FaChevronRight } from "react-icons/fa"; 
import Link from "next/link"; 

export default function Footer() {
  const links = [
    { text: "Inicio", href: "/", icon: <FaHome /> },
    { text: "Productos", href: "/productos", icon: <FaBoxOpen /> },
    { text: "Contacto", href: "/contacto", icon: <FaEnvelope /> },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Efecto de luz sutil de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* 🖥️ Columna 1: Brand (4 Columnas) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white tracking-tighter group">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                <FaLaptop className="text-white text-xl" />
              </div>
              LAPTOP<span className="text-indigo-500">X</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Líderes en tecnología de alto rendimiento. Elevamos tu productividad 
              con los mejores equipos de Ecuador y un soporte técnico inigualable.
            </p>
            {/* Redes sociales integradas aquí para mejor peso visual */}
            <div className="flex gap-4 pt-2">
              {[FaFacebook, FaInstagram, FaTwitter].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-white/10">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* 🔗 Columna 2: Enlaces (3 Columnas) */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">Explorar</h4>
            <ul className="space-y-4">
              {links.map(({ text, href }) => (
                <li key={text}>
                  <Link href={href} className="group flex items-center gap-2 hover:text-white transition-colors">
                    <FaChevronRight className="text-[10px] text-indigo-500 group-hover:translate-x-1 transition-transform" />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 📞 Columna 3: Contacto (4 Columnas) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">Atención al Cliente</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="mt-1 bg-indigo-500/10 p-2 rounded-md group-hover:bg-indigo-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-indigo-500"/>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Visítanos</p>
                  <p className="text-xs text-gray-500">La Maná, Cotopaxi - Ecuador</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 bg-indigo-500/10 p-2 rounded-md group-hover:bg-indigo-500/20 transition-colors">
                  <FaPhone className="text-indigo-500"/>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Llámanos</p>
                  <p className="text-xs text-gray-500">0963351521</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 bg-indigo-500/10 p-2 rounded-md group-hover:bg-indigo-500/20 transition-colors">
                  <FaEnvelope className="text-indigo-500"/>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Escríbenos</p>
                  <p className="text-xs text-gray-500">soporte@laptopx.ec</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Derechos de Autor - Estilo Minimalista */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
            &copy; {new Date().getFullYear()} LaptopX Ecuador.
          </p>
          <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-600">
            <Link href="/privacidad" className="hover:text-indigo-500 transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-indigo-500 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}