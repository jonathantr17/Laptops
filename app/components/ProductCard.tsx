import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function ProductCard({ laptop }: { laptop: any }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={laptop.image}
          alt={laptop.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold">{laptop.name}</h3>
          <p className={`text-gray-500 text-sm ${!showDetails ? "line-clamp-3" : ""}`}>
            {laptop.specs}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-blue-600">${laptop.price}</span>
          <button
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-transform duration-300"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Cerrar" : "Ver detalle"}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}