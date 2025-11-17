import { FaArrowRight } from "react-icons/fa";

export default function ProductCard({ laptop, variant }: { laptop: any; variant: string }) {
  let cardStyle = "bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105";
  let buttonStyle = "mt-4 inline-flex items-center font-semibold py-2 px-4 rounded-lg transition-transform duration-300";

  if (variant === "oferta") {
    cardStyle += " border-2 border-red-500";
    buttonStyle += " bg-red-500 text-white hover:bg-red-600";
  } else if (variant === "destacado") {
    cardStyle += " bg-gray-50";
    buttonStyle += " bg-blue-600 text-white hover:bg-blue-700";
  } else {
    buttonStyle += " bg-green-600 text-white hover:bg-green-700";
  }

  return (
    <div className={cardStyle}>
      <img src={laptop.image} alt={laptop.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{laptop.name}</h3>
        <p className="text-gray-500 mt-2">{laptop.specs}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-lg">${laptop.price}</span>
          <button className={buttonStyle}>
            Ver detalle
            <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}