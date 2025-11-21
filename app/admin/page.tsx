export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-10">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/productos"
          className="p-8 bg-white shadow rounded-xl text-center hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">Productos</h2>
          <p className="text-gray-600 mt-2">
            Ver, editar y agregar productos
          </p>
        </a>

        <a
          href="/admin/ofertas"
          className="p-8 bg-white shadow rounded-xl text-center hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">Ofertas</h2>
          <p className="text-gray-600 mt-2">
            Crear y administrar ofertas especiales
          </p>
        </a>
      </div>
    </div>
  );
}