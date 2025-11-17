"use client";

export default function ProductSection({ title, products }: { title: string; products: any[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 tracking-tight">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {item.offer && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {item.offer}
                </span>
              )}
            </div>

            <div className="p-5 flex flex-col justify-between h-48">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.specs}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">${item.price}</span>
                <button className="relative inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 group">
                  <span className="mr-2">Ver detalle</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}