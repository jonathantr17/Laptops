import Link from "next/link";
import { FaBoxOpen, FaTag, FaBook, FaArrowRight, FaChartBar } from "react-icons/fa";

const cards = [
  {
    href: "/admin/productos",
    icon: FaBoxOpen,
    label: "Productos",
    desc: "Gestiona el catálogo completo de laptops",
    color: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.3)",
    iconColor: "#818cf8",
  },
  {
    href: "/admin/ofertas",
    icon: FaTag,
    label: "Ofertas",
    desc: "Crea y administra ofertas especiales",
    color: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.3)",
    iconColor: "#34d399",
  },
  {
    href: "/admin/catalogo/agregar",
    icon: FaBook,
    label: "Catálogo",
    desc: "Actualiza la sección del catálogo en el home",
    color: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
    iconColor: "#a78bfa",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#080c10] font-['DM_Sans',sans-serif]">
      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/6 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-['Bebas_Neue'] text-xl text-white tracking-[0.12em]">
            Nexus<span className="text-indigo-500">Tech</span>
          </span>
          <span className="text-white/15 text-sm">/</span>
          <span className="text-white/40 text-sm">Admin</span>
        </div>
        <Link href="/" className="text-[11px] text-white/25 hover:text-white tracking-[0.12em] uppercase transition-colors no-underline">
          ← Ir al sitio
        </Link>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        {/* Hero */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-indigo-500" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-indigo-500 flex items-center gap-1.5">
              <FaChartBar size={9} /> Panel de control
            </span>
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white tracking-wide leading-none">
            Administración
          </h1>
          <p className="text-white/30 text-sm mt-3">Gestiona el contenido de tu tienda desde aquí.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map(({ href, icon: Icon, label, desc, color, border, iconColor }) => (
            <Link
              key={href}
              href={href}
              className="group relative bg-white/[0.02] border border-white/6 rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/12 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] no-underline overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${color} 0%, transparent 60%)` }}
              />
              <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                style={{ background: color, borderColor: border, color: iconColor }}>
                <Icon size={18} />
              </div>
              <div className="relative z-10">
                <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none mb-1">{label}</h2>
                <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase mt-auto transition-colors" style={{ color: iconColor }}>
                Gestionar <FaArrowRight size={9} className="transition-transform group-hover:translate-x-1" />
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${iconColor}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}