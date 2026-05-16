"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { tiemposApi } from "@/api/fetchApiWhatsApp";

const SERVICIOS = [
  { id: 1, nombre: "Diseño y Desarrollo Web" },
  { id: 2, nombre: "Gestión de Redes Sociales" },
  { id: 3, nombre: "Marketing y Gestión Digital" },
  { id: 4, nombre: "Branding y Diseño" },
];

const UNIDADES = [
  { value: "minutos", label: "min" },
  { value: "horas", label: "hrs" },
  { value: "dias", label: "días" },
];

function formatTiempo(valor, unidad) {
  if (valor === 0) return "Inmediato";
  const label = UNIDADES.find((u) => u.value === unidad)?.label || unidad;
  return `+${valor} ${label}`;
}

export function TiemposEditor({ tipo, onConfiguracionGuardada }) {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(1);
  const [configuracion, setConfiguracion] = useState({
    email: [],
    whatsapp: [],
  });
  const [configuracionOriginal, setConfiguracionOriginal] = useState({
    email: [],
    whatsapp: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadConfiguracion();
  }, [servicioSeleccionado]);

  const loadConfiguracion = async () => {
    setLoading(true);
    try {
      const res = await tiemposApi.getByServicio(servicioSeleccionado);
      if (res.status === 200 && res.data) {
        setConfiguracion(res.data);
        setConfiguracionOriginal(JSON.parse(JSON.stringify(res.data)));
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Error cargando configuración:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMensajes = () =>
    tipo === "email" ? configuracion.email : configuracion.whatsapp;

  const getMensajesOriginales = () =>
    tipo === "email"
      ? configuracionOriginal.email
      : configuracionOriginal.whatsapp;

  const handleChange = (index, field, value) => {
    const nuevos = [...getMensajes()];
    nuevos[index] = { ...nuevos[index], [field]: value };
    setConfiguracion((prev) => ({ ...prev, [tipo]: nuevos }));
    setHasChanges(true);
  };

  const handleAdd = () => {
    const actuales = getMensajes();
    const nuevoNumero =
      actuales.length > 0
        ? Math.max(...actuales.map((m) => m.numero_mensaje)) + 1
        : 1;
    const nuevos = [
      ...actuales,
      {
        numero_mensaje: nuevoNumero,
        unidad_tiempo: "minutos",
        valor_tiempo: 0,
      },
    ];
    setConfiguracion((prev) => ({ ...prev, [tipo]: nuevos }));
    setHasChanges(true);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "¿Eliminar mensaje?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        const renumerados = getMensajes()
          .filter((_, i) => i !== index)
          .map((m, i) => ({ ...m, numero_mensaje: i + 1 }));
        setConfiguracion((prev) => ({ ...prev, [tipo]: renumerados }));
        setHasChanges(true);
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const mensajesActuales = getMensajes();
      const mensajesOriginales = getMensajesOriginales();

      // IDs de mensajes actuales y originales
      const idsActuales = mensajesActuales.map((m) => m.numero_mensaje);
      const idsOriginales = mensajesOriginales.map((m) => m.numero_mensaje);

      // 1. Eliminar los que ya no existen
      const idsAEliminar = idsOriginales.filter(
        (id) => !idsActuales.includes(id),
      );

      for (const numMensaje of idsAEliminar) {
        await tiemposApi.destroy(servicioSeleccionado, tipo, numMensaje);
      }

      // 2. Guardar cada mensaje actual (nuevo o modificado)
      for (const msg of mensajesActuales) {
        const original = mensajesOriginales.find(
          (o) => o.numero_mensaje === msg.numero_mensaje,
        );

        // Si es nuevo o cambió, guardar
        if (
          !original ||
          original.valor_tiempo !== msg.valor_tiempo ||
          original.unidad_tiempo !== msg.unidad_tiempo
        ) {
          await tiemposApi.store(servicioSeleccionado, {
            tipo: tipo,
            numero_mensaje: msg.numero_mensaje,
            unidad_tiempo: msg.unidad_tiempo,
            valor_tiempo: msg.valor_tiempo,
          });
        }
      }

      Swal.fire("¡Éxito!", "Tiempos actualizados correctamente", "success");

      // Recargar para sincronizar
      await loadConfiguracion();
      onConfiguracionGuardada?.(servicioSeleccionado, configuracion);
    } catch (error) {
      console.error("Error guardando:", error);
      Swal.fire("Error", "Error de conexión al guardar", "error");
    } finally {
      setSaving(false);
    }
  };

  const mensajes = getMensajes();
  const tipoLabel = tipo === "email" ? "Email" : "WhatsApp";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 overflow-hidden">
      {/* Header strip */}
      <div
        className={`px-5 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-700 ${
          tipo === "whatsapp"
            ? "bg-cyan-50 dark:bg-cyan-900/20"
            : "bg-violet-50 dark:bg-violet-900/20"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
              tipo === "whatsapp"
                ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-cyan-300"
                : "bg-violet-100 text-violet-700 dark:bg-violet-800 dark:text-violet-300"
            }`}
          >
            {tipoLabel}
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Tiempos de envío
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-700">
              ● Sin guardar
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              saving || !hasChanges
                ? "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed"
                : tipo === "whatsapp"
                  ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-sm"
                  : "bg-violet-500 hover:bg-violet-600 text-white shadow-sm"
            }`}
          >
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Selector de servicio — pills */}
        <div className="flex flex-wrap gap-1.5">
          {SERVICIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setServicioSeleccionado(s.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all border ${
                servicioSeleccionado === s.id
                  ? tipo === "whatsapp"
                    ? "bg-cyan-500 border-cyan-500 text-white shadow-sm"
                    : "bg-violet-500 border-violet-500 text-white shadow-sm"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 bg-transparent"
              }`}
            >
              {s.nombre}
            </button>
          ))}
        </div>

        {/* Tabla de mensajes */}
        {loading ? (
          <div className="flex justify-center py-6">
            <div
              className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent ${
                tipo === "whatsapp" ? "border-cyan-500" : "border-violet-500"
              }`}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {mensajes.length === 0 ? (
              <p className="text-center text-sm text-slate-400 py-4">
                Sin mensajes configurados
              </p>
            ) : (
              mensajes.map((msg, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 px-4 py-2.5"
                >
                  {/* Número */}
                  <span
                    className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                      tipo === "whatsapp"
                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                        : "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                    }`}
                  >
                    {msg.numero_mensaje}
                  </span>

                  {/* Input valor */}
                  <input
                    type="number"
                    min="0"
                    value={msg.valor_tiempo}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "valor_tiempo",
                        Number(e.target.value),
                      )
                    }
                    className="w-16 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-center text-sm font-medium px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:text-slate-200"
                  />

                  {/* Select unidad */}
                  <select
                    value={msg.unidad_tiempo}
                    onChange={(e) =>
                      handleChange(index, "unidad_tiempo", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:text-slate-200"
                  >
                    {UNIDADES.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>

                  {/* Badge preview */}
                  <span
                    className={`flex-1 text-xs font-semibold px-2 py-1 rounded-full text-center ${
                      msg.valor_tiempo === 0
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : tipo === "whatsapp"
                          ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                          : "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                    }`}
                  >
                    {formatTiempo(msg.valor_tiempo, msg.unidad_tiempo)}
                  </span>

                  {/* Borrar */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                    title="Eliminar"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}

            <button
              onClick={handleAdd}
              className={`w-full mt-1 rounded-xl border-2 border-dashed py-2 text-xs font-semibold transition-colors ${
                tipo === "whatsapp"
                  ? "border-cyan-200 text-cyan-500 hover:border-cyan-400 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-500 dark:hover:bg-cyan-900/20"
                  : "border-violet-200 text-violet-500 hover:border-violet-400 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-500 dark:hover:bg-violet-900/20"
              }`}
            >
              + Añadir mensaje
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
