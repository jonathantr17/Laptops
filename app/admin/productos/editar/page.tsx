import { Suspense } from "react";
import EditarProducto from "./EditarProductoComponent";

export default function EditarProductoPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#080c10] flex items-center justify-center">
                <div className="flex items-center gap-3 text-white/40">
                    <div className="w-5 h-5 border-2 border-indigo-400/40 border-t-indigo-400 rounded-full animate-spin" />
                    Cargando...
                </div>
            </div>
        }>
            <EditarProducto />
        </Suspense>
    );
}
