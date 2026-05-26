"use client";

import { useState } from "react";
import { MAX_ALT } from "./constants";

export function SeoSection({
  imagePreviews,
  formData,
  setFormData,
  type, // 'desktop' or 'mobile'
}) {
  const [isOpen, setIsOpen] = useState(false);

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400";

  const counterCls = (len) =>
    `text-xs ${len > MAX_ALT * 0.9 ? "text-red-500" : "text-slate-400"}`;

  if (type === "desktop") {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
        >
          <span>Texto Alt de Imágenes (SEO)</span>
          <span className="text-slate-400 text-xs">{isOpen ? "▲" : "▶"}</span>
        </button>
        {isOpen && (
          <div className="px-4 py-3 space-y-3 bg-white dark:bg-slate-800">
            {/* Left Alt */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Alt — Imagen Izquierda
                </label>
                <span className={counterCls(formData.left_alt?.length ?? 0)}>
                  {formData.left_alt?.length ?? 0}/{MAX_ALT}
                </span>
              </div>
              {!imagePreviews.left ? (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                  <span className="text-xs text-amber-700">
                    ⚠️ No se ha subido imagen izquierda
                  </span>
                </div>
              ) : (
                <input
                  type="text"
                  maxLength={MAX_ALT}
                  value={formData.left_alt}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, left_alt: e.target.value }))
                  }
                  placeholder="Ej: persona trabajando en laptop"
                  className={inputCls}
                />
              )}
            </div>
            {/* Right Alt */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Alt — Imagen Derecha
                </label>
                <span className={counterCls(formData.right_alt?.length ?? 0)}>
                  {formData.right_alt?.length ?? 0}/{MAX_ALT}
                </span>
              </div>
              {!imagePreviews.right ? (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                  <span className="text-xs text-amber-700">
                    ⚠️ No se ha subido imagen derecha
                  </span>
                </div>
              ) : (
                <input
                  type="text"
                  maxLength={MAX_ALT}
                  value={formData.right_alt}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, right_alt: e.target.value }))
                  }
                  placeholder="Ej: diseño web responsivo"
                  className={inputCls}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile version
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
      >
        <span>Texto Alt de Imagen (SEO)</span>
        <span className="text-slate-400 text-xs">{isOpen ? "▲" : "▶"}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white dark:bg-slate-800">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Alt — Imagen Mobile
            </label>
            <span className={counterCls(formData.mobile_alt?.length ?? 0)}>
              {formData.mobile_alt?.length ?? 0}/{MAX_ALT}
            </span>
          </div>
          {!imagePreviews.mobile ? (
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
              <span className="text-xs text-amber-700">
                ⚠️ No se ha subido imagen mobile
              </span>
            </div>
          ) : (
            <input
              type="text"
              maxLength={MAX_ALT}
              value={formData.mobile_alt}
              onChange={(e) =>
                setFormData((p) => ({ ...p, mobile_alt: e.target.value }))
              }
              placeholder="Ej: banner mobile marketing"
              className={inputCls}
            />
          )}
        </div>
      )}
    </div>
  );
}
