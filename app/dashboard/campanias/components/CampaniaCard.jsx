"use client";

import { useRouter } from "next/navigation";
import { CampaniaEstadoBadge } from "./CampaniaEstadoBadge";

export default function CampaniaCard({ campania }) {
  const router = useRouter();

  const porcentaje = Math.min(Math.max(campania.porcentaje || 0, 0), 100);

  const fecha = new Date(campania.created_at).toLocaleString("es-PE", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="border rounded-xl p-4 shadow-sm space-y-3 hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <span className="font-semibold">#{campania.id_campania}</span>
        <CampaniaEstadoBadge estado={campania.estado} />
      </div>

      {/* SERVICIO */}
      <p className="text-sm text-gray-600 line-clamp-2">{campania.servicio}</p>

      {/* FECHA */}
      <p className="text-xs text-gray-400">{fecha}</p>

      {/* PROGRESO */}
      <div className="space-y-1">
        <p className="text-sm">
          {campania.envios_exitosos}/{campania.total_destinatarios}
        </p>

        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-green-500 h-2 rounded transition-all"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>

      {/* ACCIÓN */}
      <button
        onClick={() =>
          router.push(`/dashboard/campanias/${campania.id_campania}`)
        }
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        Ver detalle →
      </button>
    </div>
  );
}
