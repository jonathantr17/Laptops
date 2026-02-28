"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import {
    FaTimes, FaChevronRight, FaChevronLeft, FaTruck, FaStore,
    FaLock, FaCreditCard, FaCheck, FaWhatsapp, FaShoppingBag,
} from "react-icons/fa";

const WHATSAPP = "593963351521";
const STEPS = ["Datos", "Entrega", "Pago", "Confirmación"];

/* ---------- helpers ---------- */
function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExp(val: string) {
    return val.replace(/\D/g, "").slice(0, 4).replace(/^(.{2})(.+)/, "$1/$2");
}

/* ---------- Step indicators ---------- */
function StepBar({ step }: { step: number }) {
    return (
        <div className="flex items-center gap-0 w-full mb-8">
            {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all duration-300 ${i < step ? "bg-indigo-600 border-indigo-600 text-white" :
                                i === step ? "bg-indigo-500/20 border-indigo-500 text-indigo-300" :
                                    "bg-white/5 border-white/10 text-white/20"
                            }`}>
                            {i < step ? <FaCheck size={10} /> : i + 1}
                        </div>
                        <span className={`text-[9px] tracking-[0.12em] uppercase whitespace-nowrap ${i === step ? "text-indigo-400" : "text-white/20"
                            }`}>{label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`h-px flex-1 mx-2 mb-4 transition-all duration-500 ${i < step ? "bg-indigo-600" : "bg-white/8"}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

/* ---------- Step 1: Datos personales ---------- */
function StepPersonal({ data, onChange }: { data: any; onChange: (k: string, v: string) => void }) {
    return (
        <div className="space-y-4">
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-5">Tus datos</h3>
            {[
                { key: "name", label: "Nombre completo", type: "text", placeholder: "Juan Pérez" },
                { key: "email", label: "Correo electrónico", type: "email", placeholder: "juan@correo.com" },
                { key: "phone", label: "WhatsApp / Teléfono", type: "tel", placeholder: "+593 9..." },
                { key: "dni", label: "Cédula / RUC", type: "text", placeholder: "0901234567" },
            ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                    <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">
                        {label}
                    </label>
                    <input
                        type={type}
                        value={data[key]}
                        onChange={e => onChange(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                    />
                </div>
            ))}
        </div>
    );
}

/* ---------- Step 2: Entrega ---------- */
function StepDelivery({ method, setMethod, address, setAddress }: any) {
    return (
        <div className="space-y-5">
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-5">Método de entrega</h3>

            <div className="grid grid-cols-1 gap-3">
                {[
                    {
                        id: "servientrega",
                        icon: FaTruck,
                        title: "Servientrega",
                        sub: "Envío a domicilio · 24–48h",
                        badge: "Gratis",
                    },
                    {
                        id: "local",
                        icon: FaStore,
                        title: "Retirar en el local",
                        sub: "La Maná, Cotopaxi · Inmediato",
                        badge: "",
                    },
                ].map(({ id, icon: Icon, title, sub, badge }) => (
                    <button
                        key={id}
                        onClick={() => setMethod(id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all cursor-pointer ${method === id
                                ? "bg-indigo-500/12 border-indigo-500/50"
                                : "bg-white/[0.02] border-white/8 hover:border-white/16"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 transition-all ${method === id ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "bg-white/5 border-white/8 text-white/30"
                            }`}>
                            <Icon size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className={`font-['Bebas_Neue'] text-lg tracking-wide leading-none ${method === id ? "text-white" : "text-white/60"}`}>
                                    {title}
                                </span>
                                {badge && (
                                    <span className="text-[9px] font-semibold tracking-[0.12em] uppercase bg-green-500/15 border border-green-500/30 text-green-300 px-2 py-0.5 rounded">
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-white/25 mt-0.5">{sub}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${method === id ? "border-indigo-500 bg-indigo-500" : "border-white/20"
                            }`}>
                            {method === id && <div className="w-full h-full rounded-full flex items-center justify-center"><FaCheck size={7} className="text-white" /></div>}
                        </div>
                    </button>
                ))}
            </div>

            {method === "servientrega" && (
                <div className="space-y-3 pt-2">
                    <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">
                        Dirección de entrega
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Ej: Calle Principal 123, Quito"
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                    />
                    <input
                        type="text"
                        placeholder="Ciudad / Provincia"
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
                    />
                </div>
            )}
        </div>
    );
}

/* ---------- Step 3: Pago ---------- */
function StepPayment({ card, onChange }: { card: any; onChange: (k: string, v: string) => void }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">Datos de pago</h3>
                <div className="flex items-center gap-1.5 text-white/20">
                    <FaLock size={10} />
                    <span className="text-[10px] tracking-[0.1em] uppercase">Cifrado SSL</span>
                </div>
            </div>

            {/* Card visual */}
            <div
                className="relative w-full h-40 rounded-2xl p-5 overflow-hidden mb-6"
                style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.5) 0%, rgba(139,92,246,0.4) 50%, rgba(236,72,153,0.3) 100%)" }}
            >
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.08) 0%, transparent 60%)",
                }} />
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between">
                        <div className="w-8 h-5 bg-yellow-400/80 rounded" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }} />
                        <FaCreditCard size={22} className="text-white/40" />
                    </div>
                    <div>
                        <p className="font-mono text-white/80 text-sm tracking-[0.2em]">
                            {card.number || "•••• •••• •••• ••••"}
                        </p>
                        <div className="flex items-end justify-between mt-2">
                            <div>
                                <p className="text-[9px] text-white/30 uppercase tracking-[0.1em]">Titular</p>
                                <p className="text-xs text-white/80 font-medium tracking-[0.05em]">{card.holder || "NOMBRE APELLIDO"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-white/30 uppercase tracking-[0.1em]">Expira</p>
                                <p className="text-xs text-white/80">{card.expiry || "MM/YY"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fields */}
            <div>
                <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">Número de tarjeta</label>
                <input
                    type="text"
                    inputMode="numeric"
                    value={card.number}
                    onChange={e => onChange("number", formatCard(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-all"
                />
            </div>
            <div>
                <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">Nombre en la tarjeta</label>
                <input
                    type="text"
                    value={card.holder}
                    onChange={e => onChange("holder", e.target.value.toUpperCase())}
                    placeholder="JUAN PÉREZ"
                    className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white uppercase placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-all"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">Vencimiento</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={card.expiry}
                        onChange={e => onChange("expiry", formatExp(e.target.value))}
                        placeholder="MM/AA"
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-1.5">CVV</label>
                    <input
                        type="password"
                        inputMode="numeric"
                        value={card.cvv}
                        onChange={e => onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="•••"
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                </div>
            </div>

            <p className="text-[10px] text-white/15 text-center mt-2">
                Demo de portafolio · No se realiza ningún cobro real
            </p>
        </div>
    );
}

/* ---------- Step 4: Confirmación ---------- */
function StepConfirmation({ name, phone, total }: { name: string; phone: string; total: number }) {
    const waMsg = encodeURIComponent(`¡Hola! Acabo de realizar un pedido por $${total.toLocaleString()}. Mi nombre es ${name || "cliente"} y mi teléfono es ${phone || "—"}. ¿Podrían confirmar mi pedido?`);

    return (
        <div className="flex flex-col items-center text-center gap-6 py-4">
            {/* Animated check */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <FaCheck size={28} className="text-green-400" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
            </div>

            <div>
                <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide leading-none mb-2">
                    ¡Pedido procesado!
                </h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                    Tu pedido fue registrado exitosamente. En breve nos comunicaremos contigo por WhatsApp para coordinar el pago y la entrega.
                </p>
            </div>

            {/* Order info box */}
            <div className="w-full bg-white/[0.03] border border-white/6 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/25 uppercase tracking-[0.12em]">Total del pedido</span>
                    <span className="font-['Bebas_Neue'] text-2xl text-indigo-400 tracking-wide">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/25 uppercase tracking-[0.12em]">Estado</span>
                    <span className="text-xs text-green-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                        En proceso
                    </span>
                </div>
            </div>

            <a
                href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-xl transition-all no-underline"
            >
                <FaWhatsapp size={16} />
                Hablar con ventas por WhatsApp
            </a>

            <p className="text-[10px] text-white/15">
                Horario de atención: Lun–Sáb 8:00 – 18:00
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CHECKOUT MODAL
═══════════════════════════════════════════════════════════════ */
export default function CheckoutModal({ onClose }: { onClose: () => void }) {
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState(0);
    const [processing, setProcessing] = useState(false);

    const [personal, setPersonal] = useState({ name: "", email: "", phone: "", dni: "" });
    const [delivery, setDelivery] = useState("servientrega");
    const [address, setAddress] = useState("");
    const [card, setCard] = useState({ number: "", holder: "", expiry: "", cvv: "" });

    const updatePersonal = (k: string, v: string) => setPersonal(p => ({ ...p, [k]: v }));
    const updateCard = (k: string, v: string) => setCard(c => ({ ...c, [k]: v }));

    const canNext = () => {
        if (step === 0) return personal.name.trim() && personal.email.trim() && personal.phone.trim();
        if (step === 1) return delivery === "local" || address.trim().length > 3;
        if (step === 2) return card.number.replace(/ /g, "").length >= 15 && card.holder && card.expiry.length === 5 && card.cvv.length >= 3;
        return true;
    };

    const handleNext = async () => {
        if (step < 2) { setStep(s => s + 1); return; }
        // Step 2 → process payment simulation
        setProcessing(true);
        await new Promise(r => setTimeout(r, 2000));
        setProcessing(false);
        clearCart();
        setStep(3);
    };

    return (
        <div
            className="fixed inset-0 z-[300] bg-[#080c10]/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={e => { if (step < 3) onClose(); }}
        >
            <div
                className="bg-[#0d1117] border border-white/8 rounded-2xl w-full max-w-xl max-h-[92vh] overflow-hidden flex flex-col"
                style={{ boxShadow: "0 0 80px rgba(99,102,241,0.15)" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-white/6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <FaShoppingBag size={15} className="text-indigo-400" />
                        <span className="font-['Bebas_Neue'] text-xl text-white tracking-wide">Checkout</span>
                    </div>
                    {step < 3 && (
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 text-white/35 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                        >
                            <FaTimes size={12} />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-7 py-6">
                    {step < 3 && <StepBar step={step} />}

                    {/* Order summary pill at top of step 0 */}
                    {step === 0 && (
                        <div className="flex items-center justify-between bg-white/[0.03] border border-white/6 rounded-xl px-4 py-3 mb-5">
                            <span className="text-xs text-white/30">{items.length} {items.length === 1 ? "producto" : "productos"}</span>
                            <span className="font-['Bebas_Neue'] text-xl text-indigo-400 tracking-wide">${total.toLocaleString()}</span>
                        </div>
                    )}

                    {step === 0 && <StepPersonal data={personal} onChange={updatePersonal} />}
                    {step === 1 && <StepDelivery method={delivery} setMethod={setDelivery} address={address} setAddress={setAddress} />}
                    {step === 2 && <StepPayment card={card} onChange={updateCard} />}
                    {step === 3 && <StepConfirmation name={personal.name} phone={personal.phone} total={total === 0 ? items.reduce((s, i) => s + i.price * i.quantity, 0) : total} />}
                </div>

                {/* Footer */}
                {step < 3 && (
                    <div className="px-7 py-5 border-t border-white/6 flex items-center gap-3 flex-shrink-0">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-[0.1em] uppercase transition-colors bg-transparent border-none cursor-pointer"
                            >
                                <FaChevronLeft size={10} /> Atrás
                            </button>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={!canNext() || processing}
                            className={`ml-auto flex items-center gap-3 font-semibold text-xs tracking-[0.1em] uppercase px-7 py-3.5 rounded-xl transition-all cursor-pointer border ${canNext() && !processing
                                    ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 hover:text-white"
                                    : "bg-white/4 border-white/8 text-white/20 cursor-not-allowed"
                                }`}
                        >
                            {processing ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-indigo-400/40 border-t-indigo-400 rounded-full animate-spin" />
                                    Procesando...
                                </>
                            ) : step === 2 ? (
                                <><FaLock size={11} /> Confirmar pago</>
                            ) : (
                                <>Continuar <FaChevronRight size={10} /></>
                            )}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="px-7 pb-6 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="w-full text-center text-[11px] text-white/20 hover:text-white/40 tracking-[0.12em] uppercase transition-colors bg-transparent border-none cursor-pointer py-2"
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
