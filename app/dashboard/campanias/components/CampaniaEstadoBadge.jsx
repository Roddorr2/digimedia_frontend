"use client";

const ESTADO_CONFIG = {
  borrador: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    label: "📝 Borrador",
  },
  pendiente: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "⏳ Pendiente",
  },
  en_proceso: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    label: "🚀 En Proceso",
  },
  pausada_hasta_mañana: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    label: "⏸️ Pausada (Límite)",
  },
  pausada_fuera_horario: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "🌙 Pausada (Horario)",
  },
  pausada_sin_conexion: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "📵 Pausada (Sin Conexión)",
  },
  completada: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    label: "✅ Completada",
  },
  cancelada: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    label: "❌ Cancelada",
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "⚠️ Error",
  },
};

export function CampaniaEstadoBadge({ estado }) {
  const config = ESTADO_CONFIG[estado] || ESTADO_CONFIG.borrador;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
