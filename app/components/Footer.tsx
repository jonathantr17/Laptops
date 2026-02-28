import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { text: "Catálogo", href: "/productos" },
    { text: "Contacto", href: "/contacto" },
    { text: "Soporte", href: "/soporte" },
  ];

  const contact = [
    { icon: FaMapMarkerAlt, label: "Visítanos", value: "Quito, Pichincha — Ecuador" },
    { icon: FaPhone, label: "Llámanos", value: "0963 351 521" },
    { icon: FaEnvelope, label: "Escríbenos", value: "info@gmail.com" },
  ];

  return (
    <footer className="relative bg-[#080c10] border-t border-white/5 overflow-hidden font-sans">

      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

        {/* ── Main grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16 py-20 border-b border-white/4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block font-['Bebas_Neue'] text-3xl tracking-[0.12em] text-white mb-5">
              Nexus<span className="text-indigo-500">Tech</span>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs mb-7">
              Líderes en tecnología de alto rendimiento. Elevamos tu productividad
              con los mejores equipos de Ecuador y soporte técnico inigualable.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com/" },
                { Icon: FaInstagram, href: "https://www.instagram.com/" },
                { Icon: FaWhatsapp, href: "https://wa.me/593963351521" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/4 border border-white/7 flex items-center justify-center text-white/30 hover:bg-indigo-500/15 hover:border-indigo-500/35 hover:text-indigo-300 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/25 mb-6">Explorar</p>
            <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
              {navLinks.map(({ text, href }) => (
                <li key={text}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors"
                  >
                    <span className="w-4 h-px bg-indigo-500/40 group-hover:bg-indigo-500 group-hover:w-6 transition-all inline-block" />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/25 mb-6">Contacto</p>
            <div className="flex flex-col gap-5">
              {contact.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/8 border border-indigo-500/15 flex items-center justify-center text-indigo-500 flex-shrink-0">
                    <Icon size={13} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.08em] uppercase text-white/25 mb-0.5">{label}</p>
                    <p className="text-sm text-white/60">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WA Banner ─────────────────────────────────── */}
        <div className="flex items-center justify-between gap-6 flex-wrap py-8 border-b border-white/4">
          <div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-1">
              ¿Tienes alguna consulta?
            </h3>
            <p className="text-xs text-white/30">Nuestro equipo responde en menos de 5 minutos por WhatsApp</p>
          </div>
          <a
            href="https://wa.me/593963351521"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white text-xs font-semibold tracking-[0.1em] uppercase px-6 py-3 rounded-lg transition-all whitespace-nowrap"
          >
            <FaWhatsapp size={14} />
            Chatear ahora
          </a>
        </div>

        {/* ── Bottom ────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3 py-6">
          <span className="text-[11px] text-white/15 tracking-[0.12em] uppercase">
            © {new Date().getFullYear()} NexusTech Ecuador. Todos los derechos reservados.
          </span>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-[11px] text-white/15 tracking-[0.12em] uppercase hover:text-indigo-500 transition-colors">Privacidad</Link>
            <Link href="/terminos" className="text-[11px] text-white/15 tracking-[0.12em] uppercase hover:text-indigo-500 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}