"use client";

import { GRADIENT_DIRS, getBg } from "./constants";

export function ColorSection({ formData, setFormData, hasImage }) {
  if (hasImage) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Color de Servicio (fondo)
        </label>
      </div>
      <div
        className="w-full h-8 rounded-xl mb-3 border border-slate-200 dark:border-slate-600"
        style={{ background: getBg(formData) }}
      />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Color 1</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={formData.service_color}
              onChange={(e) =>
                setFormData((p) => ({ ...p, service_color: e.target.value }))
              }
              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0"
            />
            <input
              type="text"
              maxLength={7}
              value={formData.service_color}
              onChange={(e) =>
                setFormData((p) => ({ ...p, service_color: e.target.value }))
              }
              className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="#8B5CF6"
            />
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Color 2 (degradado)</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={formData.service_color_2}
              onChange={(e) =>
                setFormData((p) => ({ ...p, service_color_2: e.target.value }))
              }
              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0"
            />
            <input
              type="text"
              maxLength={7}
              value={formData.service_color_2}
              onChange={(e) =>
                setFormData((p) => ({ ...p, service_color_2: e.target.value }))
              }
              className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="#FF6B6B"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-1">Dirección del degradado</p>
        <div className="flex flex-wrap gap-1.5">
          {GRADIENT_DIRS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() =>
                setFormData((p) => ({ ...p, gradient_direction: d.value }))
              }
              className={`rounded-full px-3 py-1 text-xs font-semibold transition border ${
                formData.gradient_direction === d.value
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-violet-400"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
