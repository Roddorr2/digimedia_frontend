"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { popupApi, apiRequestWithProgress } from "@/api/fetchApiWhatsApp";
import API_URL from "@/api/url";
import { Card, CardTitle } from "../TabButton";
import { EditorForm } from "./EditorForm";
import { PopupPreview } from "./PopupPreview";
import { DEFAULT_FORM } from "./constants";
import { SelectorsSection } from "./SelectorsSection";

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
  const [cargandoPorServicio, setCargandoPorServicio] = useState(false);

  // Fetch servicios
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await popupApi.getServicios();
        if (res.success) {
          const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
          setServicios(arr);
        }
      } catch (error) {}
    };
    fetchServicios();
  }, []);

  // Fetch subservicios cuando cambia servicioId
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

  // Reset form cuando cambia servicioId o subservicioId
  const resetForm = () => {
    setPopupConfig(null);
    setIsNew(true);
    setFormData({ ...DEFAULT_FORM });
    setImagePreviews({ left: null, right: null, mobile: null });
    setImageFiles({ left: null, right: null, mobile: null });
  };

  // Fetch popup config cuando cambia subservicioId (prioridad)
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
            button_text: d.button_text || DEFAULT_FORM.button_text,
            button_color: d.button_color || DEFAULT_FORM.button_color,
            service_color: d.service_color || DEFAULT_FORM.service_color,
            service_color_2: d.service_color_2 || DEFAULT_FORM.service_color_2,
            gradient_direction:
              d.gradient_direction || DEFAULT_FORM.gradient_direction,
            trigger_time: d.trigger_time || DEFAULT_FORM.trigger_time,
            trigger_type: d.trigger_type || DEFAULT_FORM.trigger_type,
            layout: d.layout || DEFAULT_FORM.layout,
            show_logo: d.show_logo ?? DEFAULT_FORM.show_logo,
            left_text: d.left_text || DEFAULT_FORM.left_text,
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

  // Fetch popup config por SERVICIO (cuando no hay subservicio seleccionado)
  useEffect(() => {
    // Si hay subservicio seleccionado, NO ejecutar esto
    if (subservicioId) return;
    // Si no hay servicio seleccionado, NO ejecutar
    if (!servicioId) {
      resetForm();
      return;
    }

    const cargarPorServicio = async () => {
      setCargandoPorServicio(true);
      setLoading(true);
      try {
        const res = await popupApi.getByServicio(servicioId);
        if (res?.success && res?.data) {
          const d = res.data;
          setPopupConfig(d);
          setIsNew(false);
          setFormData({
            button_text: d.button_text || DEFAULT_FORM.button_text,
            button_color: d.button_color || DEFAULT_FORM.button_color,
            service_color: d.service_color || DEFAULT_FORM.service_color,
            service_color_2: d.service_color_2 || DEFAULT_FORM.service_color_2,
            gradient_direction:
              d.gradient_direction || DEFAULT_FORM.gradient_direction,
            trigger_time: d.trigger_time || DEFAULT_FORM.trigger_time,
            trigger_type: d.trigger_type || DEFAULT_FORM.trigger_type,
            layout: d.layout || DEFAULT_FORM.layout,
            show_logo: d.show_logo ?? DEFAULT_FORM.show_logo,
            left_text: d.left_text || DEFAULT_FORM.left_text,
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
          console.error("Error cargando pop-up por servicio:", error);
        }
      } finally {
        setCargandoPorServicio(false);
        setLoading(false);
      }
    };

    cargarPorServicio();
  }, [servicioId, subservicioId]);

  const validate = () => {
    if (!servicioId) {
      Swal.fire("Error", "Selecciona un servicio", "warning");
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

    const form = new FormData();

    if (subservicioId) {
      form.append("id_subservicio", subservicioId);
    } else if (servicioId) {
      form.append("id_servicio", servicioId);
    } else {
      Swal.fire("Error", "No se ha seleccionado un servicio o subservicio", "warning");
      setSaving(false);
      return;
    }

    form.append("button_text", formData.button_text);
    form.append("button_color", formData.button_color);
    form.append("service_color", formData.service_color);
    form.append("service_color_2", formData.service_color_2);
    form.append("gradient_direction", formData.gradient_direction);
    form.append("trigger_time", formData.trigger_time);
    form.append("trigger_type", formData.trigger_type);
    form.append("layout", formData.layout);
    form.append("show_logo", formData.show_logo ? "1" : "0");
    form.append("left_text", formData.left_text);
    form.append("left_opacity", formData.left_opacity);
    form.append("right_opacity", formData.right_opacity);
    form.append("mobile_opacity", formData.mobile_opacity);
    form.append("left_alt", formData.left_alt);
    form.append("right_alt", formData.right_alt);
    form.append("mobile_alt", formData.mobile_alt);

    if (imageFiles.left) {
      form.append("left_image", imageFiles.left);
    } else if (!imagePreviews.left && popupConfig?.left_image_url) {
      form.append("remove_left_image", "1");
    }
    if (imageFiles.right) {
      form.append("right_image", imageFiles.right);
    } else if (!imagePreviews.right && popupConfig?.right_image_url) {
      form.append("remove_right_image", "1");
    }
    if (imageFiles.mobile) {
      form.append("mobile_image", imageFiles.mobile);
    } else if (!imagePreviews.mobile && popupConfig?.mobile_image_url) {
      form.append("remove_mobile_image", "1");
    }

    const hasImages = !!(imageFiles.left || imageFiles.right || imageFiles.mobile);
    const endpoint = isNew
      ? "/api/popup-configs"
      : `/api/popup-configs/${popupConfig.id_popup_config}/actualizar`;

    // Modal de progreso con dos fases: subida real (0-65%) + simulación Cloudinary (65-95%)
    let simulationInterval = null;

    const updateBar = (pct) => {
      const bar    = document.getElementById("swal-upload-bar");
      const pctEl  = document.getElementById("swal-upload-pct");
      const status = document.getElementById("swal-upload-status");
      if (bar)    bar.style.width   = `${pct}%`;
      if (pctEl)  pctEl.textContent = `${Math.round(pct)}%`;
      if (status) {
        if (pct < 65)       status.textContent = "Subiendo imagen...";
        else if (pct < 100) status.textContent = "Procesando la Imágen...";
        else                status.textContent = "¡Listo!";
      }
    };

    const updateProgress = (xhrPercent) => {
      // Fase 1: progreso real del XHR mapeado a 0-65%
      updateBar(Math.round(xhrPercent * 0.65));

      // Cuando el archivo llega al servidor, arranca la simulación de Cloudinary
      if (xhrPercent === 100 && !simulationInterval) {
        let sim = 65;
        simulationInterval = setInterval(() => {
          sim += (95 - sim) * 0.07; // easing asintótico: se acerca a 95% pero nunca llega
          updateBar(sim);
        }, 300);
      }
    };

    if (hasImages) {
      Swal.fire({
        title: "Guardando Pop-Up",
        html: `
          <div style="padding:0 4px">
            <p id="swal-upload-status"
              style="margin-bottom:12px;color:#6b7280;font-size:14px">
              Subiendo imagen...
            </p>
            <div style="background:#e5e7eb;border-radius:9999px;height:8px;overflow:hidden">
              <div id="swal-upload-bar"
                style="background:linear-gradient(90deg,#7c3aed,#a855f7);height:100%;width:0%;border-radius:9999px;transition:width 0.3s ease">
              </div>
            </div>
            <p id="swal-upload-pct"
              style="margin-top:8px;color:#9ca3af;font-size:12px;font-variant-numeric:tabular-nums">
              0%
            </p>
          </div>`,
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
      });
    }

    const finishProgress = () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
      }
      updateBar(100);
    };

    try {
      const res = await apiRequestWithProgress(
        endpoint,
        { method: "POST", body: form },
        hasImages ? updateProgress : null,
      );

      if (hasImages) {
        finishProgress();
        // Pausa breve para que el usuario vea el 100% antes de cerrar
        await new Promise((r) => setTimeout(r, 350));
        Swal.close();
      }

      if (res?.success) {
        Swal.fire("¡Éxito!", isNew ? "Pop-Up creado" : "Pop-Up actualizado", "success");

        // Usar res.data directamente — sin GET adicional
        if (res.data) {
          setPopupConfig(res.data);
          setIsNew(false);
          setImagePreviews({
            left: res.data.left_image_url || null,
            right: res.data.right_image_url || null,
            mobile: res.data.mobile_image_url || null,
          });
        }
        setImageFiles({ left: null, right: null, mobile: null });
      } else {
        Swal.fire("Error", res?.message || "No se pudo guardar", "error");
      }
    } catch (err) {
      if (simulationInterval) clearInterval(simulationInterval);
      if (hasImages) Swal.close();
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

  const hasSelection = servicioId !== null;
  const showEditor = hasSelection;

  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      {/* Contenedor principal: 1 columna en móviles, 12 columnas en escritorio */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Panel izquierdo (Selectores y Editor) - Ahora natural, arriba en móviles */}
        <div className="w-full lg:col-span-7 flex flex-col space-y-5">
          <SelectorsSection
            servicios={servicios}
            servicioId={servicioId}
            setServicioId={setServicioId}
            subservicios={subservicios}
            subservicioId={subservicioId}
            setSubservicioId={setSubservicioId}
            resetForm={resetForm}
            isNew={isNew}
            popupConfig={popupConfig}
            loading={loading}
          />

          {showEditor && (
            <Card>
              <EditorForm
                servicioId={servicioId}
                subservicioId={subservicioId}
                loading={loading || cargandoPorServicio}
                view={view}
                formData={formData}
                setFormData={setFormData}
                imagePreviews={imagePreviews}
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
                setImagePreviews={setImagePreviews}
                isNew={isNew}
                saving={saving}
                handleSave={handleSave}
                handleDelete={handleDelete}
              />
            </Card>
          )}
        </div>

        {/* Panel derecho: Preview - Ahora natural, abajo en móviles */}
        <div className="w-full lg:col-span-5">
          <Card>
            {/* Header del Preview mejorado para evitar que los botones colapsen en móviles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <CardTitle>Preview</CardTitle>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
                {["desktop", "mobile"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition border flex-1 sm:flex-none text-center ${
                      view === v
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-white dark:bg-slate-700 text-slate-500 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                    }`}
                  >
                    {v === "desktop" ? "Desktop" : "Mobile"}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenedor del preview con scroll horizontal si el contenido es muy ancho */}
            <div className="w-full overflow-x-auto rounded-md">
              {showEditor && formData ? (
                <div className="min-w-full">
                  <PopupPreview
                    formData={formData}
                    imagePreviews={imagePreviews}
                    view={view}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center text-slate-400">
                  <svg
                    className="h-12 w-12 sm:h-14 sm:w-14 mb-3"
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
                  <p className="text-sm sm:text-base font-medium">
                    Selecciona un servicio
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    para configurar el pop-up
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
