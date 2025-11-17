export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white font-bold mb-2">LaptopX</h4>
            <p>Tu tienda de confianza para laptops en Ecuador.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Enlaces</h4>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-white">Inicio</a></li>
              <li><a href="/productos" className="hover:text-white">Productos</a></li>
              <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Contacto</h4>
            <p>Guayaquil, Ecuador</p>
            <p>Teléfono: 099‑XXX‑XXXX</p>
            <p>Email: soporte@laptopx.ec</p>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">&copy; {new Date().getFullYear()} LaptopX. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}