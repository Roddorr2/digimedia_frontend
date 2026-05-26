"use client";

import { Card, CardTitle } from "../TabButton";

export function SelectorsSection({
  servicios,
  servicioId,
  setServicioId,
  subservicios,
  subservicioId,
  setSubservicioId,
  resetForm,
  isNew,
  popupConfig,
  loading,
}) {
  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400";
  const labelCls =
    "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1";

  const isEditingByService = servicioId && !subservicioId;

  // Determinar si el popupConfig actual es de un servicio (tiene subservicio con id_servicio)
  const isServiceLevelConfig = popupConfig?.subservicio?.id_servicio;
  // Determinar si es de un subservicio específico
  const isSubserviceLevelConfig =
    popupConfig?.id_subservicio && !isServiceLevelConfig;

  return (
    <Card>
      <CardTitle>Editor de Pop-Ups</CardTitle>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Configura el pop-up de captación para cada servicio o subservicio.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Servicio</label>
          <select
            className={inputCls}
            value={servicioId ?? ""}
            onChange={(e) => {
              const id = Number(e.target.value) || null;
              setServicioId(id);
              setSubservicioId(null);
              resetForm();
            }}
          >
            <option className="text-slate-800 bg-white" value="">
              — Selecciona un servicio —
            </option>
            {servicios.map((s) => (
              <option
                className="text-slate-800 bg-white"
                key={s.id_servicio}
                value={s.id_servicio}
              >
                {s.nombre}
              </option>
            ))}
          </select>
          {isEditingByService && !loading && (
            <p className="text-xs text-amber-500 mt-1">
              Editando pop-up para TODO el servicio. Los pop-ups por subservicio
              tienen prioridad.
            </p>
          )}
        </div>
        <div>
          <label className={labelCls}>Subservicio (opcional)</label>
          <select
            className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed`}
            value={subservicioId ?? ""}
            disabled={!servicioId}
            onChange={(e) => setSubservicioId(Number(e.target.value) || null)}
          >
            <option className="text-slate-800 bg-white" value="">
              — Todos los subservicios —
            </option>
            {subservicios.map((s) => (
              <option
                className="text-slate-800 bg-white"
                key={s.id_subservicio}
                value={s.id_subservicio}
              >
                {s.nombre}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">
            Si seleccionas un subservicio, el pop-up solo aparecerá allí.
          </p>
        </div>
      </div>

      {/* Estado cuando hay subservicio seleccionado (edición específica) */}
      {subservicioId && !loading && (
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isNew
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isNew ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            {isNew
              ? "Sin configuración — se creará una nueva"
              : `Config existente para este subservicio · ID ${subservicioId}`}
          </span>
        </div>
      )}

      {/* Estado cuando hay servicio seleccionado SIN subservicio (edición por servicio) */}
      {isEditingByService && !loading && popupConfig && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {`Pop-up configurado para TODO el servicio · ID ${servicioId}`}
          </span>
        </div>
      )}

      {/* Estado cuando hay servicio seleccionado SIN subservicio y NO hay configuración */}
      {isEditingByService && !loading && !popupConfig && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Sin configuración para este servicio — se creará una nueva
          </span>
        </div>
      )}
    </Card>
  );
}
