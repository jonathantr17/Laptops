"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [counts, setCounts] = useState({ equipos: 0, garantia: 0, envio: 0 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const duration = 1800;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        equipos: Math.floor(500 * ease),
        garantia: Math.floor(12 * ease),
        envio: Math.floor(24 * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [loaded]);

  // Transition classes based on loaded state
  const visible = "opacity-100 translate-y-0";
  const hidden = "opacity-0 translate-y-4";

  return (
    <div className="relative bg-[#080c10] min-h-screen flex flex-col pt-[72px] overflow-hidden font-['DM_Sans',sans-serif]">

      {/* ── Background effects ─────────────────────────────── */}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Blob 1 — top right */}
      <div
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Blob 2 — bottom left */}
      <div
        className="absolute bottom-24 left-48 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Main content ───────────────────────────────────── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 px-6 md:px-12 py-16 max-w-[1400px] mx-auto w-full box-border items-center">

        {/* ── LEFT ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-9 lg:pr-16">

          {/* Eyebrow */}
          <div className={`flex items-center gap-3 transition-all duration-700 ${loaded ? visible : hidden}`}>
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-indigo-500">
              Disponibilidad inmediata · 2025
            </span>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-100 ${loaded ? visible : hidden}`}>
            <h1 className="font-['Bebas_Neue'] leading-[0.92] m-0 tracking-[0.01em]"
              style={{ fontSize: "clamp(72px, 8vw, 120px)" }}>
              <span className="block text-white">Potencia</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(99,102,241,0.7)" }}
              >
                Sin Límites
              </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Para Ti
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className={`max-w-[420px] text-white/45 text-[15px] leading-7 font-light m-0 transition-all duration-700 delay-200 ${loaded ? visible : hidden}`}>
            Laptops de alto rendimiento para gaming, diseño y productividad.
            Elige la herramienta que define tu próximo nivel.
          </p>

          {/* Actions */}
          <div className={`flex items-center gap-5 transition-all duration-700 delay-300 ${loaded ? visible : hidden}`}>
            {/* Primary CTA */}
            <a
              href="/productos"
              className="inline-flex items-center gap-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-semibold tracking-[0.06em] uppercase px-8 py-4 rounded-xl no-underline transition-all hover:-translate-y-0.5 group"
              style={{ boxShadow: "0 0 40px rgba(99,102,241,0.35)" }}
            >
              Ver catálogo
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Ghost WhatsApp */}
            <a
              href="https://wa.me/593963351521"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white/50 hover:text-white text-[13px] font-medium tracking-[0.05em] no-underline transition-colors"
            >
              <div
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center border transition-colors"
                style={{
                  background: "rgba(37,211,102,0.12)",
                  borderColor: "rgba(37,211,102,0.3)",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(37,211,102,0.9)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.525 5.845L.057 23.18a.75.75 0 0 0 .922.899l5.224-1.633A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.736-.518-5.29-1.42l-.38-.221-3.104.97.91-3.196-.245-.391A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
              Asesoría gratis
            </a>
          </div>

          {/* Stats */}
          <div className={`flex gap-10 pt-6 border-t border-white/6 transition-all duration-700 delay-[400ms] ${loaded ? visible : hidden}`}>
            {[
              { value: `+${counts.equipos}`, label: "Equipos vendidos", dot: true },
              { value: `${counts.garantia} M`, label: "Garantía oficial" },
              { value: `${counts.envio}H`, label: "Envío express" },
            ].map(({ value, label, dot }) => (
              <div key={label}>
                <div className="font-['Bebas_Neue'] text-[28px] text-white tracking-[0.05em] leading-none tabular-nums">
                  {dot && <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5 align-middle" />}
                  {value}
                </div>
                <div className="text-[10px] text-white/30 tracking-[0.15em] uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────── */}
        <div
          className={`relative flex items-center justify-center min-h-[420px] lg:min-h-[420px] mt-10 lg:mt-0 transition-opacity duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative w-full max-w-[400px]">

            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-indigo-500/12 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-indigo-500/6 pointer-events-none" />

            {/* Floating badge — top right */}
            <div className="hidden lg:block absolute -top-12 -right-5 bg-[#0f1118]/90 border border-white/8 rounded-xl px-4 py-3 backdrop-blur-xl z-10 animate-floatY2">
              <div className="text-[10px] text-white/30 tracking-[0.1em] uppercase">En stock</div>
              <div className="font-['Bebas_Neue'] text-[22px] text-white tracking-[0.05em] leading-tight flex items-center gap-1">
                Listo
                <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] ml-1 animate-pulseDot"
                  style={{ boxShadow: "0 0 8px #10b981" }} />
              </div>
            </div>

            {/* Product card */}
            <div className="bg-white/[0.03] border border-white/8 rounded-[20px] p-5 backdrop-blur-xl relative z-[2]">

              {/* Laptop visual */}
              <div className="w-full relative flex items-center justify-center mb-6">
                {/* Glow behind image */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-full pointer-events-none"
                  style={{ background: "rgba(99,102,241,0.3)", filter: "blur(40px)" }}
                />
                {/* Chip badge */}
                <div className="absolute top-2 right-2 bg-indigo-500/20 border border-indigo-500/40 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-indigo-300 uppercase z-10">
                  M5 Pro
                </div>
                {/* Mac image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mac.png"
                  alt="MacBook Pro"
                  className="w-full object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 0 40px rgba(99,102,241,0.25))" }}
                />
              </div>

              {/* Product info */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-['Bebas_Neue'] text-[26px] text-white tracking-[0.05em] leading-none">
                    Macbook M5
                  </div>
                  <div className="text-[11px] text-white/30 tracking-[0.08em] mt-1">
                    Apple M5 · 16GB RAM · 512GB SSD
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/25 tracking-[0.1em] uppercase">Desde</div>
                  <div className="font-['Bebas_Neue'] text-[32px] text-indigo-500 tracking-[0.03em] leading-none">$1,699</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mt-5 flex-wrap">
                {["Gaming", "Diseño", "IA / ML", "Workstation"].map((tag, i) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full border ${i === 0
                      ? "border-indigo-500/30 text-indigo-300"
                      : "border-white/8 text-white/35"
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating card — bottom left */}
            <div className="hidden lg:flex absolute -bottom-15 -left-7 bg-[#0f1118]/90 border border-white/8 rounded-xl px-4 py-3.5 backdrop-blur-xl z-10 items-center gap-3 whitespace-nowrap animate-floatY">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  borderColor: "rgba(16,185,129,0.3)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(16,185,129,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-white">Envío Gratis</div>
                <div className="text-[10px] text-white/35 mt-0.5 tracking-[0.05em]">Todo el país · Llegada en 24h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-t border-white/4">
        {/* Scroll hint */}
        <div className="flex items-center gap-2.5 text-white/20 text-[11px] tracking-[0.15em] uppercase">
          <div className="relative w-10 h-px bg-white/12 overflow-hidden animate-slideRight" />
          Explorar
        </div>

        {/* Brand row */}
        <div className="flex items-center gap-7 text-white/15 text-[11px] font-bold tracking-[0.18em] uppercase">
          {["Apple", "Asus", "Dell", "Lenovo", "HP"].map((brand, i, arr) => (
            <span key={brand} className="flex items-center gap-7">
              {brand}
              {i < arr.length - 1 && (
                <span className="w-[3px] h-[3px] rounded-full bg-white/15 -ml-3.5" />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
