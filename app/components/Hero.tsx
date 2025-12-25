export default function Hero() {
  return (
    <section
      className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-gray-950"
      aria-label="Encuentra la laptop perfecta"
    >
      {/* 🖼️ Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/portada.webp')",
          transform: "scale(1.02)" 
        }}
      >
        <div className="absolute inset-0 bg-gray-950/70 backdrop-brightness-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/30"></div>
      </div>

{/* 💻 Contenido Principal (Modificamos esta línea) */}
<div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24 md:pt-25">

        
        {/* Reducimos el space-y de 10 a 8 para ganar espacio vertical */}
        <div className="space-y-8 text-center lg:text-left">
          
          {/* Badge Superior - Más pequeño */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] animate-pulse">
            DISPONIBILIDAD INMEDIATA • 2025
          </div>

          {/* Título - Reducimos tallas (text-8xl a 7xl en desktop) */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter">
              Laptops de <br className="hidden sm:block" />
              <span className="text-indigo-500 italic">Alto Nivel</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Equipos potentes para gaming, diseño y productividad. <br className="hidden lg:block" />
              Encuentra la herramienta que define tu éxito.
            </p>
          </div>

          {/* Botones - Reducimos padding y tamaño de texto */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="/productos"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-10 rounded-xl shadow-xl shadow-indigo-600/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 text-base"
            >
              Ver Catálogo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="https://wa.me/593963351521"
              target="_blank"
              className="w-full sm:w-auto py-3.5 px-10 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all backdrop-blur-sm text-center text-base"
            >
              Asesoría Gratis
            </a>
          </div>

          {/* Stats en la base - Reducimos tamaño de stats */}
          <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 border-t border-white/5">
            <div className="text-center lg:text-left">
              <span className="block text-xl font-bold text-white tracking-tighter italic">Envío Gratis</span>
              <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">En todo el país</span>
            </div>
            <div className="text-center lg:text-left">
              <span className="block text-xl font-bold text-white tracking-tighter italic">Garantía</span>
              <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">12 Meses Oficial</span>
            </div>
            <div className="text-center lg:text-left">
              <span className="block text-xl font-bold text-white tracking-tighter italic">Soporte</span>
              <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Técnico experto</span>
            </div>
          </div>

        </div>
      </div>

      {/* Decoración Visual sutil */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-indigo-600/5 blur-[100px] rounded-full"></div>
    </section>
  );
}