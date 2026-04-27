"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";
import { popupApi } from "@/api/fetchApiWhatsApp";
import { Card, CardTitle, UploadIcon } from "./TabButton";

const TIEMPOS = [
  { value: 3, label: "3s - Muy inmediato" },
  { value: 5, label: "5s - Rápido" },
  { value: 8, label: "8s - Normal" },
  { value: 12, label: "12s - Usuario explorando" },
  { value: 20, label: "20s - Lectura en progreso" },
  { value: 30, label: "30s - Alta intención" },
  { value: 60, label: "60s - Usuario muy activo" },
];

const GRADIENT_DIRS = [
  { value: "to bottom", label: "↓ Arriba → Abajo" },
  { value: "to top", label: "↑ Abajo → Arriba" },
  { value: "to right", label: "→ Izq → Der" },
  { value: "to left", label: "← Der → Izq" },
  { value: "to bottom right", label: "↘ Diagonal" },
  { value: "to bottom left", label: "↙ Diagonal" },
];

const MAX_ALT = 80;

const DEFAULT_FORM = {
  title_text: "OBTÉN UNA ASESORÍA ¡GRATIS!",
  title_color: "#FFFFFF",
  button_text: "HAZLO YA",
  button_color: "#7C3FD9",
  service_color: "#8B5CF6",
  service_color_2: "#8B5CF6",
  gradient_direction: "to bottom",
  trigger_time: 8,
  left_opacity: 80,
  right_opacity: 100,
  mobile_opacity: 100,
  left_alt: "",
  right_alt: "",
  mobile_alt: "",
};

const getBg = (f) =>
  f.service_color_2 && f.service_color_2 !== f.service_color
    ? `linear-gradient(${f.gradient_direction}, ${f.service_color}, ${f.service_color_2})`
    : f.service_color;

function ImageUploadZone({ label, preview, onFile, onDrop, onRemove }) {
  const [fileKey, setFileKey] = useState(0);

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileKey((k) => k + 1);
    onRemove();
  };

  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <div className="relative">
        <label
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-4 cursor-pointer hover:border-violet-400 transition min-h-[110px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="max-h-24 max-w-full object-contain rounded-xl"
            />
          ) : (
            <>
              <UploadIcon />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Arrastra o haz clic
              </span>
            </>
          )}
          <input
            key={fileKey}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md transition"
            title="Eliminar imagen"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

function PopupPreview({ formData, imagePreviews, view }) {
  if (view === "desktop") {
    const hasBgImage = !!imagePreviews.right;

    return (
      <div
        className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 flex items-stretch shadow-lg"
        style={{
          background: hasBgImage ? "transparent" : getBg(formData),
          minHeight: 240,
        }}
      >
        {hasBgImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={imagePreviews.right}
              alt={formData.right_alt || "Fondo"}
              className="w-full h-full object-cover"
              style={{ opacity: formData.right_opacity / 100 }}
            />
          </div>
        )}

        {imagePreviews.left && (
          <div className="w-1/3 flex-shrink-0 relative z-10">
            <img
              src={imagePreviews.left}
              alt={formData.left_alt || "Imagen izquierda"}
              className="w-full h-full object-cover"
              style={{ opacity: formData.left_opacity / 100 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
              }}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4 py-5 relative z-10">
          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">
            ✕
          </span>
          <p
            className="text-lg font-extrabold text-center leading-tight"
            style={{ color: formData.title_color }}
          >
            {formData.title_text || "OBTÉN UNA ASESORÍA ¡GRATIS!"}
          </p>
          <div className="w-full space-y-1.5 mt-1">
            {["Nombre", "Teléfono", "Correo"].map((ph) => (
              <input
                key={ph}
                readOnly
                placeholder={ph}
                className="w-full rounded-full bg-white px-3 py-1.5 text-xs text-slate-700 outline-none border border-white/50"
              />
            ))}
          </div>
          <div
            className="mt-2 w-full rounded-full py-1.5 text-xs font-bold text-white text-center"
            style={{ backgroundColor: formData.button_color }}
          >
            {formData.button_text || "HAZLO YA"}
          </div>
        </div>
      </div>
    );
  }

  const hasMobileBg = !!imagePreviews.mobile;
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 flex flex-col items-center shadow-lg mx-auto"
      style={{
        background: hasMobileBg ? "transparent" : getBg(formData),
        minHeight: 280,
        maxWidth: 200,
      }}
    >
      {hasMobileBg && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagePreviews.mobile}
            alt={formData.mobile_alt || "Fondo mobile"}
            className="w-full h-full object-cover"
            style={{ opacity: formData.mobile_opacity / 100 }}
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-2 px-4 py-4 w-full relative z-10">
        <span className="absolute top-0 right-2 w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">
          ✕
        </span>
        <p
          className="text-sm font-extrabold text-center leading-tight"
          style={{ color: formData.title_color }}
        >
          {formData.title_text || "OBTÉN UNA ASESORÍA ¡GRATIS!"}
        </p>
        <div className="w-full space-y-1.5">
          {["Nombre", "Teléfono", "Correo"].map((ph) => (
            <input
              key={ph}
              readOnly
              placeholder={ph}
              className="w-full rounded-full bg-white px-3 py-1.5 text-xs text-slate-700 outline-none border border-white/50"
            />
          ))}
        </div>
        <div
          className="w-full rounded-full py-1.5 text-xs font-bold text-white text-center"
          style={{ backgroundColor: formData.button_color }}
        >
          {formData.button_text || "HAZLO YA"}
        </div>
      </div>
    </div>
  );
}

export function PopupsTab() {
  const [servicios, setServicios] = useState([]);
  const [servicioId, setServicioId] = useState(null);
  const [subservicios, setSubservicios] = useState([]);
  const [subservicioId, setSubservicioId] = useState(null);

  const [popupConfig, setPopupConfig] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });
  const [imageFiles, setImageFiles] = useState({
    left: null,
    right: null,
    mobile: null,
  });
  const [imagePreviews, setImagePreviews] = useState({
    left: null,
    right: null,
    mobile: null,
  });
  const [view, setView] = useState("desktop");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await popupApi.getServicios();

        if (res.success) setServicios(res.data ?? []);
      } catch (error) {}
    };
    fetchServicios();
  }, []);

  useEffect(() => {
    if (!servicioId) {
      setSubservicios([]);
      setSubservicioId(null);
      return;
    }
    const fetchSubservicios = async () => {
      try {
        const res = await popupApi.getSubserviciosByServicio(servicioId);
        if (res.success) setSubservicios(res.data);
      } catch (error) {
        console.error("Error cargando subservicios:", error);
      }
    };
    fetchSubservicios();
  }, [servicioId]);

  useEffect(() => {
    if (!subservicioId) return;

    const cargar = async () => {
      setLoading(true);
      try {
        const res = await popupApi.getBySubservicio(subservicioId);
        if (res?.success && res?.data) {
          const d = res.data;
          setPopupConfig(d);
          setIsNew(false);
          setFormData({
            title_text: d.title_text || DEFAULT_FORM.title_text,
            title_color: d.title_color || DEFAULT_FORM.title_color,
            button_text: d.button_text || DEFAULT_FORM.button_text,
            button_color: d.button_color || DEFAULT_FORM.button_color,
            service_color: d.service_color || DEFAULT_FORM.service_color,
            service_color_2:
              d.service_color_2 ||
              d.service_color ||
              DEFAULT_FORM.service_color_2,
            gradient_direction:
              d.gradient_direction || DEFAULT_FORM.gradient_direction,
            trigger_time: d.trigger_time || DEFAULT_FORM.trigger_time,
            left_opacity: d.left_opacity ?? DEFAULT_FORM.left_opacity,
            right_opacity: d.right_opacity ?? DEFAULT_FORM.right_opacity,
            mobile_opacity: d.mobile_opacity ?? DEFAULT_FORM.mobile_opacity,
            left_alt: d.left_alt || "",
            right_alt: d.right_alt || "",
            mobile_alt: d.mobile_alt || "",
          });
          setImagePreviews({
            left: d.left_image_url || null,
            right: d.right_image_url || null,
            mobile: d.mobile_image_url || null,
          });
        } else {
          resetForm();
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          resetForm();
        } else {
          console.error("Error cargando configuración:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [subservicioId]);

  const resetForm = () => {
    setPopupConfig(null);
    setIsNew(true);
    setFormData({ ...DEFAULT_FORM });
    setImagePreviews({ left: null, right: null, mobile: null });
    setImageFiles({ left: null, right: null, mobile: null });
  };

  const handleImageChange = (slot, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Imagen muy pesada", "Máximo 5 MB.", "warning");
      return;
    }
    setImageFiles((p) => ({ ...p, [slot]: file }));
    const reader = new FileReader();
    reader.onloadend = () =>
      setImagePreviews((p) => ({ ...p, [slot]: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (slot) => {
    setImageFiles((p) => ({ ...p, [slot]: null }));
    setImagePreviews((p) => ({ ...p, [slot]: null }));
  };

  const handleDrop = (slot, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageChange(slot, e.dataTransfer?.files?.[0]);
  };

  const setField = (field) => (e) =>
    setFormData((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    if (!subservicioId) {
      Swal.fire("Error", "Selecciona un servicio y subservicio", "warning");
      return false;
    }
    if (!formData.title_text || formData.title_text.trim().length < 5) {
      Swal.fire(
        "Error",
        "El texto principal debe tener al menos 5 caracteres",
        "warning",
      );
      return false;
    }
    if (!formData.button_text || formData.button_text.trim().length < 2) {
      Swal.fire(
        "Error",
        "El texto del botón debe tener al menos 2 caracteres",
        "warning",
      );
      return false;
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(formData.service_color)) {
      Swal.fire("Error", "Color hex de servicio inválido", "warning");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const form = new FormData();
      if (isNew) form.append("id_subservicio", subservicioId);
      form.append("title_text", formData.title_text);
      form.append("title_color", formData.title_color);
      form.append("button_text", formData.button_text);
      form.append("button_color", formData.button_color);
      form.append("service_color", formData.service_color);
      form.append("service_color_2", formData.service_color_2);
      form.append("gradient_direction", formData.gradient_direction);
      form.append("trigger_time", formData.trigger_time);
      form.append("left_opacity", formData.left_opacity);
      form.append("right_opacity", formData.right_opacity);
      form.append("mobile_opacity", formData.mobile_opacity);
      form.append("left_alt", formData.left_alt);
      form.append("right_alt", formData.right_alt);
      form.append("mobile_alt", formData.mobile_alt);
      if (imageFiles.left) form.append("left_image", imageFiles.left);
      if (imageFiles.right) form.append("right_image", imageFiles.right);
      if (imageFiles.mobile) form.append("mobile_image", imageFiles.mobile);

      const res = isNew
        ? await popupApi.create(form)
        : await popupApi.update(popupConfig.id_popup_config, form);

      if (res?.success) {
        Swal.fire(
          "¡Éxito!",
          isNew ? "Pop-Up creado" : "Pop-Up actualizado",
          "success",
        );
        const fresh = await popupApi.getBySubservicio(subservicioId);
        if (fresh?.success && fresh?.data) {
          setPopupConfig(fresh.data);
          setIsNew(false);
        }
        setImageFiles({ left: null, right: null, mobile: null });
      } else {
        Swal.fire("Error", res?.message || "No se pudo guardar", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error de conexión al guardar", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!popupConfig) return;
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar Pop-Up?",
      text: "Se eliminarán las imágenes en Cloudinary.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    });
    if (!isConfirmed) return;
    try {
      const res = await popupApi.destroy(popupConfig.id_popup_config);
      if (res?.success) {
        Swal.fire("Eliminado", "Pop-Up eliminado correctamente", "success");
        resetForm();
      } else {
        Swal.fire("Error", res?.message || "No se pudo eliminar", "error");
      }
    } catch {
      Swal.fire("Error", "Error de conexión al eliminar", "error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400";
  const labelCls =
    "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1";
  const counterCls = (len, max) =>
    `text-xs ${len > max * 0.9 ? "text-red-500" : "text-slate-400"}`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Panel izquierdo */}
        <div className="lg:col-span-7 space-y-5">
          {/* Selectores */}
          <Card>
            <CardTitle>Editor de Pop-Ups</CardTitle>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configura el pop-up de captación para cada subservicio.
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
              </div>
              <div>
                <label className={labelCls}>Subservicio</label>
                <select
                  className={`${inputCls} disabled:opacity-40 disabled:cursor-not-allowed`}
                  value={subservicioId ?? ""}
                  disabled={!servicioId}
                  onChange={(e) =>
                    setSubservicioId(Number(e.target.value) || null)
                  }
                >
                  <option className="text-slate-800 bg-white" value="">
                    — Selecciona un subservicio —
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
              </div>
            </div>
            {subservicioId && !loading && (
              <div className="mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isNew ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isNew ? "bg-amber-500" : "bg-emerald-500"}`}
                  />
                  {isNew
                    ? "Sin configuración — se creará una nueva"
                    : `Config existente · ID ${popupConfig?.id_popup_config}`}
                </span>
              </div>
            )}
          </Card>

          {/* Editor */}
          {subservicioId && (
            <Card>
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
                  <p className="text-slate-500 text-sm">
                    Cargando configuración...
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Texto Principal + Color texto */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={labelCls.replace("mb-1", "")}>
                        Texto Principal
                      </label>
                      <span
                        className={counterCls(
                          formData.title_text?.length ?? 0,
                          80,
                        )}
                      >
                        {formData.title_text?.length ?? 0}/80
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        maxLength={80}
                        value={formData.title_text}
                        onChange={setField("title_text")}
                        className={`${inputCls} flex-1`}
                        placeholder="OBTÉN UNA ASESORÍA ¡GRATIS!"
                      />
                      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                        <span className="text-[10px] text-slate-500">
                          Color texto
                        </span>
                        <input
                          type="color"
                          value={formData.title_color}
                          onChange={setField("title_color")}
                          className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Texto Botón + Color botón */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={labelCls.replace("mb-1", "")}>
                        Texto del Botón
                      </label>
                      <span
                        className={counterCls(
                          formData.button_text?.length ?? 0,
                          25,
                        )}
                      >
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
                        <span className="text-[10px] text-slate-500">
                          Color botón
                        </span>
                        <input
                          type="color"
                          value={formData.button_color}
                          onChange={setField("button_color")}
                          className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Colores de Servicio */}
                  {!(
                    (view === "desktop" && imagePreviews.right) ||
                    (view === "mobile" && imagePreviews.mobile)
                  ) && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={labelCls.replace("mb-1", "")}>
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
                              onChange={setField("service_color")}
                              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0"
                            />
                            <input
                              type="text"
                              maxLength={7}
                              value={formData.service_color}
                              onChange={setField("service_color")}
                              className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
                              placeholder="#8B5CF6"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">
                            Color 2 (degradado)
                          </p>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={formData.service_color_2}
                              onChange={setField("service_color_2")}
                              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0"
                            />
                            <input
                              type="text"
                              maxLength={7}
                              value={formData.service_color_2}
                              onChange={setField("service_color_2")}
                              className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
                              placeholder="#FF6B6B"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">
                          Dirección del degradado
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {GRADIENT_DIRS.map((d) => (
                            <button
                              key={d.value}
                              type="button"
                              onClick={() =>
                                setFormData((p) => ({
                                  ...p,
                                  gradient_direction: d.value,
                                }))
                              }
                              className={`rounded-full px-3 py-1 text-xs font-semibold transition border ${formData.gradient_direction === d.value ? "bg-violet-600 text-white border-violet-600" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-violet-400"}`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tiempo de aparición */}
                  <div>
                    <label className={labelCls}>Tiempo de Aparición</label>
                    <select
                      className={inputCls}
                      value={formData.trigger_time}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          trigger_time: Number(e.target.value),
                        }))
                      }
                    >
                      {TIEMPOS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Imágenes */}
                  <div>
                    <label className={labelCls}>Imágenes</label>
                    <div className="flex gap-2 mb-4">
                      {["desktop", "mobile"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setView(v);
                            setSeoOpen(false);
                          }}
                          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition border ${view === v ? "bg-violet-600 text-white border-violet-600" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600"}`}
                        >
                          {v === "desktop" ? "Desktop" : "Mobile"}
                        </button>
                      ))}
                    </div>

                    {view === "desktop" ? (
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <ImageUploadZone
                              label="Imagen Izquierda"
                              preview={imagePreviews.left}
                              onFile={(f) => handleImageChange("left", f)}
                              onDrop={(e) => handleDrop("left", e)}
                              onRemove={() => handleRemoveImage("left")}
                            />
                            <div>
                              <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                                <span>Opacidad</span>
                                <span>{formData.left_opacity}%</span>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={formData.left_opacity}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    left_opacity: Number(e.target.value),
                                  }))
                                }
                                className="w-full accent-violet-600"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <ImageUploadZone
                              label="Imagen Derecha"
                              preview={imagePreviews.right}
                              onFile={(f) => handleImageChange("right", f)}
                              onDrop={(e) => handleDrop("right", e)}
                              onRemove={() => handleRemoveImage("right")}
                            />
                            <div>
                              <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                                <span>Opacidad</span>
                                <span>{formData.right_opacity}%</span>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={formData.right_opacity}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    right_opacity: Number(e.target.value),
                                  }))
                                }
                                className="w-full accent-violet-600"
                              />
                            </div>
                          </div>
                        </div>

                        {/* SEO Desktop */}
                        <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setSeoOpen((p) => !p)}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
                          >
                            <span>Texto Alt de Imágenes (SEO)</span>
                            <span className="text-slate-400 text-xs">
                              {seoOpen ? "▲" : "▶"}
                            </span>
                          </button>
                          {seoOpen && (
                            <div className="px-4 py-3 space-y-3 bg-white dark:bg-slate-800">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                    Alt — Imagen Izquierda
                                  </label>
                                  <span
                                    className={counterCls(
                                      formData.left_alt?.length ?? 0,
                                      MAX_ALT,
                                    )}
                                  >
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
                                    onChange={setField("left_alt")}
                                    placeholder="Ej: persona trabajando en laptop"
                                    className={inputCls}
                                  />
                                )}
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                    Alt — Imagen Derecha
                                  </label>
                                  <span
                                    className={counterCls(
                                      formData.right_alt?.length ?? 0,
                                      MAX_ALT,
                                    )}
                                  >
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
                                    onChange={setField("right_alt")}
                                    placeholder="Ej: diseño web responsivo"
                                    className={inputCls}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="max-w-xs space-y-2">
                          <ImageUploadZone
                            label="Imagen Mobile (única)"
                            preview={imagePreviews.mobile}
                            onFile={(f) => handleImageChange("mobile", f)}
                            onDrop={(e) => handleDrop("mobile", e)}
                            onRemove={() => handleRemoveImage("mobile")}
                          />
                          <div>
                            <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                              <span>Opacidad</span>
                              <span>{formData.mobile_opacity}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={formData.mobile_opacity}
                              onChange={(e) =>
                                setFormData((p) => ({
                                  ...p,
                                  mobile_opacity: Number(e.target.value),
                                }))
                              }
                              className="w-full accent-violet-600"
                            />
                          </div>
                        </div>

                        {/* SEO Mobile */}
                        <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setSeoOpen((p) => !p)}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
                          >
                            <span>Texto Alt de Imagen (SEO)</span>
                            <span className="text-slate-400 text-xs">
                              {seoOpen ? "▲" : "▶"}
                            </span>
                          </button>
                          {seoOpen && (
                            <div className="px-4 py-3 bg-white dark:bg-slate-800">
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                  Alt — Imagen Mobile
                                </label>
                                <span
                                  className={counterCls(
                                    formData.mobile_alt?.length ?? 0,
                                    MAX_ALT,
                                  )}
                                >
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
                                  onChange={setField("mobile_alt")}
                                  placeholder="Ej: banner mobile marketing"
                                  className={inputCls}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botones */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition ${saving ? "bg-slate-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}`}
                    >
                      {saving
                        ? "Guardando..."
                        : isNew
                          ? "Crear Pop-Up"
                          : "Guardar Cambios"}
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
              )}
            </Card>
          )}
        </div>

        {/* Panel derecho: Preview */}
        <div className="lg:col-span-5">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Preview</CardTitle>
              <div className="flex gap-2">
                {["desktop", "mobile"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition border ${view === v ? "bg-violet-600 text-white border-violet-600" : "bg-white dark:bg-slate-700 text-slate-500 border-slate-300 dark:border-slate-600"}`}
                  >
                    {v === "desktop" ? "Desktop" : "Mobile"}
                  </button>
                ))}
              </div>
            </div>
            {subservicioId ? (
              <PopupPreview
                formData={formData}
                imagePreviews={imagePreviews}
                view={view}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
                <svg
                  className="h-14 w-14 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"
                  />
                </svg>
                <p className="text-sm font-medium">Selecciona un subservicio</p>
                <p className="text-xs mt-1">para ver el preview del pop-up</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
