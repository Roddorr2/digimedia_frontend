"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { tiemposApi, plantillaApi } from "@/api/fetchApiWhatsApp";

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

const LIMITES_TIEMPO = {
  minutos: { min: 0, max: 60, label: "0 a 60 min" },
  horas: { min: 1, max: 24, label: "1 a 24 hrs" },
  dias: { min: 1, max: 30, label: "1 a 30 días" },
};

function formatTiempo(valor, unidad) {
  if (valor === 0 || valor === "0") return "Inmediato";
  const label = UNIDADES.find((u) => u.value === unidad)?.label || unidad;
  return `+${valor} ${label}`;
}

export function TiemposEditor({ tipo, onConfiguracionGuardada }) {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(1);
  const [plantillasDisponibles, setPlantillasDisponibles] = useState([1, 2, 3]);
  const [huerfanosDetectados, setHuerfanosDetectados] = useState([]);
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
  }, [servicioSeleccionado, tipo]);

  const loadConfiguracion = async () => {
    setLoading(true);
    try {
      const [resTiempos, resPlantillas] = await Promise.all([
        tiemposApi.getByServicio(servicioSeleccionado),
        plantillaApi.getByOwner(tipo, "servicio", servicioSeleccionado).catch(() => null),
      ]);

      let numerosPlantillas = [1, 2, 3];
      if (
        resPlantillas?.success &&
        Array.isArray(resPlantillas.data) &&
        resPlantillas.data.length > 0
      ) {
        numerosPlantillas = resPlantillas.data
          .map((p) => p.numero_plantilla)
          .sort((a, b) => a - b);
      }
      setPlantillasDisponibles(numerosPlantillas);

      if (resTiempos?.status === 200 && resTiempos?.data) {
        setConfiguracionOriginal(JSON.parse(JSON.stringify(resTiempos.data)));

        const rawMensajes = resTiempos.data[tipo] || [];

        // Detectar tiempos huérfanos (guardados en BD sin plantilla correspondiente)
        const huerfanos = rawMensajes
          .filter((m) => !numerosPlantillas.includes(m.numero_mensaje))
          .map((m) => m.numero_mensaje);
        setHuerfanosDetectados(huerfanos);

        // Mapear solo para los números de plantilla existentes
        const sincronizados = numerosPlantillas.map((num) => {
          const existente = rawMensajes.find((m) => m.numero_mensaje === num);
          if (existente) {
            return { ...existente };
          }
          const defaultValor = num === 1 ? 0 : num === 2 ? 30 : 60;
          return {
            numero_mensaje: num,
            unidad_tiempo: "minutos",
            valor_tiempo: defaultValor,
          };
        });

        setConfiguracion({
          ...resTiempos.data,
          [tipo]: sincronizados,
        });

        // Si existen huérfanos, marcamos cambios para que el usuario pueda limpiar de inmediato
        setHasChanges(huerfanos.length > 0);
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

  const handleValorChange = (index, rawValue) => {
    const msg = getMensajes()[index];
    const limits = LIMITES_TIEMPO[msg.unidad_tiempo] || { min: 0, max: 30 };
    if (rawValue === "") {
      handleChange(index, "valor_tiempo", "");
      return;
    }
    const num = Number(rawValue);
    if (isNaN(num)) return;
    const clamped = Math.max(0, Math.min(num, limits.max));
    handleChange(index, "valor_tiempo", clamped);
  };

  const handleValorBlur = (index) => {
    const msg = getMensajes()[index];
    const limits = LIMITES_TIEMPO[msg.unidad_tiempo] || { min: 0, max: 30 };
    let val = Number(msg.valor_tiempo);
    if (isNaN(val) || val < limits.min) {
      val = limits.min;
    } else if (val > limits.max) {
      val = limits.max;
    }
    handleChange(index, "valor_tiempo", val);
  };

  const handleUnidadChange = (index, newUnidad) => {
    const msg = getMensajes()[index];
    const limits = LIMITES_TIEMPO[newUnidad] || { min: 0, max: 30 };
    let newValor = Number(msg.valor_tiempo) || 0;
    if (newValor > limits.max) {
      newValor = limits.max;
    } else if (newValor < limits.min) {
      newValor = limits.min;
    }
    const nuevos = [...getMensajes()];
    nuevos[index] = {
      ...nuevos[index],
      unidad_tiempo: newUnidad,
      valor_tiempo: newValor,
    };
    setConfiguracion((prev) => ({ ...prev, [tipo]: nuevos }));
    setHasChanges(true);
  };

  // Añadir tiempo solo para plantillas que no tengan tiempo configurado en la lista
  const handleAddParaPlantilla = (numeroPlantilla) => {
    const actuales = getMensajes();
    const defaultValor = numeroPlantilla === 1 ? 0 : numeroPlantilla === 2 ? 30 : 60;
    const nuevos = [
      ...actuales,
      {
        numero_mensaje: numeroPlantilla,
        unidad_tiempo: "minutos",
        valor_tiempo: defaultValor,
      },
    ].sort((a, b) => a.numero_mensaje - b.numero_mensaje);
    setConfiguracion((prev) => ({ ...prev, [tipo]: nuevos }));
    setHasChanges(true);
  };

  const handleDelete = (index) => {
    const msg = getMensajes()[index];
    Swal.fire({
      title: `¿Quitar tiempo de Plantilla #${msg.numero_mensaje}?`,
      text: "Podrás volver a asignarlo cuando lo necesites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, quitar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mantener números originales intactos (sin renumerar arbitrariamente)
        const restantes = getMensajes().filter((_, i) => i !== index);
        setConfiguracion((prev) => ({ ...prev, [tipo]: restantes }));
        setHasChanges(true);
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const mensajesActuales = getMensajes();
      const mensajesOriginales = getMensajesOriginales() || [];

      // Validar que ningún tiempo exceda los límites antes de guardar
      for (const msg of mensajesActuales) {
        const limits = LIMITES_TIEMPO[msg.unidad_tiempo] || { min: 0, max: 30, label: "0 a 30" };
        const val = Number(msg.valor_tiempo);
        if (isNaN(val) || val < limits.min || val > limits.max) {
          Swal.fire({
            icon: "warning",
            title: "Límite de tiempo excedido",
            text: `La plantilla #${msg.numero_mensaje} (${msg.valor_tiempo} ${msg.unidad_tiempo}) supera el límite permitido de ${limits.label}. Por favor, corrígelo antes de guardar.`,
          });
          setSaving(false);
          return;
        }
      }

      // IDs de mensajes actuales y originales
      const idsActuales = mensajesActuales.map((m) => m.numero_mensaje);
      const idsOriginales = mensajesOriginales.map((m) => m.numero_mensaje);

      // 1. Eliminar los que ya no existen (incluye huérfanos que estuvieran en BD)
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

      const mensajeExito =
        idsAEliminar.length > 0
          ? `Tiempos actualizados y ${idsAEliminar.length} registros no asociados depurados correctamente`
          : "Tiempos actualizados correctamente";

      Swal.fire("¡Éxito!", mensajeExito, "success");

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

  // Identificar qué plantillas existentes aún no tienen tiempo configurado
  const plantillasFaltantes = plantillasDisponibles.filter(
    (num) => !mensajes.some((m) => m.numero_mensaje === num),
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 overflow-hidden">
      {/* Header strip */}
      <div
        className={`px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-700 ${
          tipo === "whatsapp"
            ? "bg-cyan-50 dark:bg-cyan-900/20"
            : "bg-violet-50 dark:bg-violet-900/20"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shrink-0 ${
              tipo === "whatsapp"
                ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-cyan-300"
                : "bg-violet-100 text-violet-700 dark:bg-violet-800 dark:text-violet-300"
            }`}
          >
            {tipoLabel}
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
            Tiempos de envío
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {hasChanges ? (
            <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-700 whitespace-nowrap">
              ● Sin guardar
            </span>
          ) : (
            <span className="hidden sm:inline" />
          )}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`text-xs font-semibold px-3.5 py-2 sm:py-1.5 rounded-lg transition-all ${
              !hasChanges ? "w-full sm:w-auto" : "w-auto"
            } ${
              saving || !hasChanges
                ? "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed"
                : tipo === "whatsapp"
                  ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-sm active:scale-95"
                  : "bg-violet-500 hover:bg-violet-600 text-white shadow-sm active:scale-95"
            }`}
          >
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Selector de servicio — pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {SERVICIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setServicioSeleccionado(s.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all border whitespace-nowrap shrink-0 ${
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
            {/* Banner de aviso si existen registros huérfanos en BD */}
            {huerfanosDetectados.length > 0 && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                <span className="text-sm shrink-0">⚠️</span>
                <div className="flex-1">
                  <span className="font-semibold block">
                    Registros no asociados detectados
                  </span>
                  <span className="opacity-90">
                    Existen {huerfanosDetectados.length} tiempos en la base de datos sin plantilla vinculada ({huerfanosDetectados.map((n) => `#${n}`).join(", ")}).
                    Al hacer clic en <strong>Guardar</strong> se depurarán automáticamente.
                  </span>
                </div>
              </div>
            )}

            {mensajes.length > 0 && (
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1 pb-0.5">
                <span>Secuencia vinculada a plantillas</span>
                <span>Límites máx.: 60 min · 24 hrs · 30 días</span>
              </div>
            )}
            {mensajes.length === 0 ? (
              <p className="text-center text-sm text-slate-400 py-4">
                Sin plantillas configuradas
              </p>
            ) : (
              mensajes.map((msg, index) => {
                const limits = LIMITES_TIEMPO[msg.unidad_tiempo] || { min: 0, max: 30, label: "0 a 30" };
                const isExceeded = Number(msg.valor_tiempo) > limits.max;

                return (
                  <div
                    key={msg.numero_mensaje}
                    className={`flex items-center gap-2 sm:gap-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border px-3 sm:px-4 py-2.5 transition-colors ${
                      isExceeded
                        ? "border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20"
                        : "border-slate-100 dark:border-slate-700"
                    }`}
                  >
                    {/* Número y etiqueta de plantilla */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                          tipo === "whatsapp"
                            ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                            : "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                        }`}
                      >
                        {msg.numero_mensaje}
                      </span>
                      <span className="hidden sm:inline text-xs font-medium text-slate-500 dark:text-slate-400">
                        Plantilla {msg.numero_mensaje}
                      </span>
                    </div>

                    {/* Input valor */}
                    <input
                      type="number"
                      min={limits.min}
                      max={limits.max}
                      value={msg.valor_tiempo}
                      onChange={(e) =>
                        handleValorChange(index, e.target.value)
                      }
                      onBlur={() => handleValorBlur(index)}
                      title={`Límite permitido: ${limits.label}`}
                      className={`w-14 sm:w-16 shrink-0 rounded-lg border bg-white dark:bg-slate-800 text-center text-sm font-medium px-1 sm:px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:text-slate-200 ${
                        isExceeded
                          ? "border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-400 ring-1 ring-amber-400"
                          : "border-slate-200 dark:border-slate-600"
                      }`}
                    />

                    {/* Select unidad */}
                    <select
                      value={msg.unidad_tiempo}
                      onChange={(e) =>
                        handleUnidadChange(index, e.target.value)
                      }
                      className="rounded-lg shrink-0 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm px-1.5 sm:px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:text-slate-200"
                    >
                      {UNIDADES.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>

                    {/* Badge preview */}
                    <span
                      title={
                        isExceeded
                          ? `Excede el límite permitido (${limits.label})`
                          : undefined
                      }
                      className={`flex-1 min-w-0 truncate text-xs font-semibold px-2 py-1 rounded-full text-center ${
                        isExceeded
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-300 dark:border-amber-700"
                          : msg.valor_tiempo === 0 || msg.valor_tiempo === "0"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : tipo === "whatsapp"
                              ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                              : "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                      }`}
                    >
                      {isExceeded
                        ? `+${msg.valor_tiempo} (Máx: ${limits.max})`
                        : formatTiempo(msg.valor_tiempo, msg.unidad_tiempo)}
                    </span>

                    {/* Borrar / Desasignar tiempo */}
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-colors shrink-0 p-1"
                      title="Quitar tiempo"
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
                );
              })
            )}

            {/* Asignación de tiempo para plantillas que falten o mensaje de sincronización total */}
            {plantillasFaltantes.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                {plantillasFaltantes.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAddParaPlantilla(num)}
                    className={`w-full rounded-xl border-2 border-dashed py-2 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      tipo === "whatsapp"
                        ? "border-cyan-200 text-cyan-600 hover:border-cyan-400 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
                        : "border-violet-200 text-violet-600 hover:border-violet-400 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-900/20"
                    }`}
                  >
                    <span>+ Asignar tiempo a Plantilla #{num}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 py-2.5 px-3 mt-1 rounded-xl bg-slate-50/80 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
                <svg
                  className="w-4 h-4 text-emerald-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Todas las plantillas de este servicio ({plantillasDisponibles.length}) tienen su tiempo vinculado
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
