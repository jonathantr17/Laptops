export default function Hero() {
  return (
    <section className="bg-cover bg-center h-64 md:h-96" style={{ backgroundImage: "url('/hero-laptops.jpg')" }}>
      <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Encuentra la laptop perfecta</h1>
          <p className="text-lg md:text-2xl mb-6">Modelos para estudio, oficina y gaming</p>
          <a href="/productos" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">Ver productos</a>
        </div>
      </div>
    </section>
  )
}