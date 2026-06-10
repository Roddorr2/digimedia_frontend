"use client";

import {
  TRIGGER_TYPES,
  LAYOUTS,
  DEFAULT_FORM,
  MAX_IMAGE_SIZE_BYTES,
  MAX_MOBILE_IMAGE_SIZE_BYTES,
  ACCEPTED_IMAGE_TYPE,
} from "./constants";
import { DesktopEditor } from "./DesktopEditor";
import { MobileEditor } from "./MobileEditor";
import Swal from "sweetalert2";

export function EditorForm({
  servicioId,
  subservicioId,
  loading,
  view,
  formData,
  setFormData,
  imagePreviews,
  imageFiles,
  setImageFiles,
  setImagePreviews,
  isNew,
  saving,
  handleSave,
  handleDelete,
}) {
  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400";
  const labelCls =
    "block text-base font-semibold text-slate-700 dark:text-slate-300 mb-1";
  const counterCls = (len, max) =>
    `text-xs ${len > max * 0.9 ? "text-red-500" : "text-slate-400"}`;

  const handleImageChange = (slot, file) => {
    if (!file) return;
    if (file.type !== ACCEPTED_IMAGE_TYPE) {
      Swal.fire(
        "Formato incorrecto",
        "Solo se aceptan imágenes en formato <strong>WebP</strong>.",
        "warning",
      );
      return;
    }
    const maxBytes =
      slot === "mobile" ? MAX_MOBILE_IMAGE_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;
    const maxLabel = slot === "mobile" ? "600 KB" : "400 KB";
    if (file.size > maxBytes) {
      Swal.fire(
        "Imagen muy pesada",
        `Máximo ${maxLabel} en formato WebP.`,
        "warning",
      );
      return;
    }
    setImageFiles((p) => ({ ...p, [slot]: file }));
    const objectUrl = URL.createObjectURL(file);
    setImagePreviews((p) => {
      if (p[slot]?.startsWith("blob:")) URL.revokeObjectURL(p[slot]);
      return { ...p, [slot]: objectUrl };
    });
  };

  const handleRemoveImage = (slot) => {
    setImageFiles((p) => ({ ...p, [slot]: null }));
    setImagePreviews((p) => {
      if (p[slot]?.startsWith("blob:")) URL.revokeObjectURL(p[slot]);
      return { ...p, [slot]: null };
    });
  };

  const handleDrop = (slot, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageChange(slot, e.dataTransfer?.files?.[0]);
  };

  const setField = (field) => (e) =>
    setFormData((p) => ({ ...p, [field]: e.target.value }));

  const hasSelection = servicioId || subservicioId;
  if (!hasSelection) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
        <p className="text-slate-500 text-sm">Cargando configuración...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Texto Botón + Color botón */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={labelCls.replace("mb-1", "")}>
            Texto del Botón
          </label>
          <span className={counterCls(formData.button_text?.length ?? 0, 25)}>
            {formData.button_text?.length ?? 0}/25
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            maxLength={25}
            value={formData.button_text}
            onChange={setField("button_text")}
            className={`${inputCls} flex-1`}
            placeholder="HAZLO YA"
          />
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <span className="text-[10px] text-slate-500">Color botón</span>
            <input
              type="color"
              value={formData.button_color}
              onChange={setField("button_color")}
              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5"
            />
          </div>
        </div>
      </div>

      {/* Texto lateral izquierdo */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={labelCls.replace("mb-1", "")}>Texto lateral</label>
          <span className={counterCls(formData.left_text?.length ?? 0, 90)}>
            {formData.left_text?.length ?? 0}/90
          </span>
        </div>
        <input
          type="text"
          maxLength={90}
          value={formData.left_text || ""}
          onChange={setField("left_text")}
          className={inputCls}
          placeholder="Ej: Transformamos tu negocio con diseño web profesional"
        />
      </div>

      {/* Tipo de disparo */}
      <div>
        <label className={labelCls}>Tipo de disparo</label>
        <select
          className={inputCls}
          value={formData.trigger_type || "time"}
          onChange={(e) => setField("trigger_type")(e)}
        >
          {TRIGGER_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {formData.trigger_type === "time" && (
          <div className="mt-2">
            <label className={labelCls}>Tiempo de aparición (segundos)</label>

            <input
              type="number"
              min={1}
              step={1}
              className={inputCls}
              value={formData.trigger_time || ""}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  trigger_time: Number(e.target.value),
                }))
              }
              placeholder="Ej: 5"
            />
          </div>
        )}
        {formData.trigger_type === "click" && (
          <p className="text-xs text-slate-400 mt-1">
            El pop-up se abrirá al hacer clic en un elemento con ID:
            popup-trigger-{servicioId || subservicioId}
          </p>
        )}
      </div>

      {/* Layout */}
      <div>
        <label className={labelCls}>Disposición</label>
        <select
          className={inputCls}
          value={formData.layout || "left-image"}
          onChange={(e) => setField("layout")(e)}
        >
          {LAYOUTS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar logo */}
      <div className="flex items-center justify-between">
        <label className={labelCls}>Mostrar logo Digimedia</label>
        <button
          type="button"
          onClick={() =>
            setFormData((p) => ({ ...p, show_logo: !p.show_logo }))
          }
          className={`w-12 h-6 rounded-full transition ${
            formData.show_logo ? "bg-violet-600" : "bg-slate-400"
          } relative`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${
              formData.show_logo ? "left-6" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Editor según vista */}
      {view === "desktop" ? (
        <DesktopEditor
          formData={formData}
          setFormData={setFormData}
          imagePreviews={imagePreviews}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleDrop={handleDrop}
        />
      ) : (
        <MobileEditor
          formData={formData}
          setFormData={setFormData}
          imagePreviews={imagePreviews}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleDrop={handleDrop}
        />
      )}

      {/* Botones */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition ${
            saving
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
        >
          {saving ? "Guardando..." : isNew ? "Crear Pop-Up" : "Guardar Cambios"}
        </button>
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 transition"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
