export default function Hero() {
  return (
    <section
      className="relative h-96 md:h-[600px] w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/portada.webp')" }}
      aria-label="Encuentra la laptop perfecta"
    >
      {/* Overlay - Gradiente sutil para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>

      {/* Contenido principal */}
      <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
        <div className="text-center text-white max-w-4xl space-y-6">
          
          {/* Título animado */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg 
                       animate-fadeInUp" // Clase que inicia la animación
            style={{ animationDelay: '0.2s' }} // Se muestra con un pequeño retraso
          >
            <span className="block">Encuentra la laptop perfecta</span>
          </h1>

          {/* Subtítulo animado */}
          <p 
            className="text-xl sm:text-2xl md:text-3xl font-light drop-shadow-md 
                       animate-fadeInUp" // Clase que inicia la animación
            style={{ animationDelay: '0.4s' }}
          >
            Modelos de alto rendimiento para estudio, oficina y gaming
          </p>

          {/* Botón con sombra y transición */}
          <a
            href="/productos"
            className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 
                       text-white font-semibold text-lg py-4 px-10 rounded-full 
                       shadow-2xl hover:shadow-indigo-500/50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explorar Catálogo
          </a>
        </div>
      </div>
    </section>
  );
}