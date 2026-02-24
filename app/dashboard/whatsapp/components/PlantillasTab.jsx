"use client";

import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { apiRequest } from "@/api/fetchApiWhatsApp";
import { Card, CardTitle, UploadIcon } from "./TabButton";

export function PlantillasTab() {
  const [tipo, setTipo] = useState("whatsapp"); // "whatsapp" | "email"
  const [plantillas, setPlantillas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const servicios = useMemo(
    () => [
      { id: 1, nombre: "Diseño y Desarrollo Web" },
      { id: 2, nombre: "Gestión de Redes Sociales" },
      { id: 3, nombre: "Marketing y Gestión Digital" },
      { id: 4, nombre: "Branding y Diseño" },
    ],
    []
  );

  // Cargar plantillas cuando cambia el tipo
  useEffect(() => {
    loadPlantillas();
  }, [tipo]);

  // Actualizar formData cuando cambia la plantilla seleccionada
  useEffect(() => {
    if (selectedPlantilla) {
      setFormData({
        id: getPlantillaId(selectedPlantilla),
        id_servicio: selectedPlantilla.id_servicio,
        numero_plantilla: selectedPlantilla.numero_plantilla,
        ...(tipo === "whatsapp"
          ? {
              mensaje: selectedPlantilla.mensaje || "",
              imagen_url: selectedPlantilla.imagen_url || "",
            }
          : {
              asunto: selectedPlantilla.asunto || "",
              encabezado: selectedPlantilla.encabezado || "",
              mensaje: selectedPlantilla.mensaje || "",
              imagen_url: selectedPlantilla.imagen_url || "",
              mensaje_boton: selectedPlantilla.mensaje_boton || "",
              url_boton: selectedPlantilla.url_boton || "",
              footer: selectedPlantilla.footer || "",
              red_facebook: selectedPlantilla.red_facebook || "",
              red_instagram: selectedPlantilla.red_instagram || "",
              red_linkedin: selectedPlantilla.red_linkedin || "",
              red_tiktok: selectedPlantilla.red_tiktok || "",
            }),
      });
      setImagePreview(selectedPlantilla.imagen_url || null);
      setImageFile(null);
    } else {
      setFormData({});
      setImagePreview(null);
      setImageFile(null);
    }
  }, [selectedPlantilla, tipo]);

  const loadPlantillas = async () => {
    setLoading(true);
    try {
      const res = await apiRequest(`/api/plantillas/${tipo}`, {
        method: "GET",
      });

      if (res.success && res.data) {
        setPlantillas(res.data);
      } else {
        console.error("Error cargando plantillas:", res.message);
        Swal.fire("Error", res.message || "No se pudieron cargar las plantillas", "error");
      }
    } catch (error) {
      console.error("Error en loadPlantillas:", error);
      Swal.fire("Error", "Error de conexión al cargar plantillas", "error");
    } finally {
      setLoading(false);
    }
  };

  const getPlantillaId = (plantilla) => {
    if (!plantilla) return null;
    return tipo === "whatsapp" 
      ? plantilla.id_plantilla_whatsapp 
      : plantilla.id_plantilla_email;
  };

  const handleSelectPlantilla = (plantilla) => {
    setSelectedPlantilla(plantilla);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const insertPlaceholder = (field) => {
    const textarea = document.getElementById(field);
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = formData[field] || "";
    const newValue = currentValue.substring(0, start) + "{nombre}" + currentValue.substring(end);

    handleInputChange(field, newValue);

    // Restaurar el foco y posición del cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 8, start + 8); // 8 = longitud de "{nombre}"
    }, 0);
  };

  const hasNombrePlaceholder = (text) => {
    return text && text.includes("{nombre}");
  };

  const handleImageChange = (file) => {
    if (!file) return;

    const max2mb = 2 * 1024 * 1024;
    if (file.size > max2mb) {
      Swal.fire("Imagen muy pesada", "Debe ser menor a 2MB.", "warning");
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      Swal.fire("Formato no permitido", "Usa JPG, PNG o WEBP.", "warning");
      return;
    }

    setImageFile(file);

    // Preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageChange(e.dataTransfer?.files?.[0]);
  };

  const handleSave = async () => {
    if (!selectedPlantilla) {
      Swal.fire("Error", "Selecciona una plantilla para editar", "warning");
      return;
    }

    // Validaciones básicas
    if (tipo === "whatsapp") {
      if (!formData.mensaje || formData.mensaje.trim().length < 10) {
        Swal.fire("Error", "El mensaje debe tener al menos 10 caracteres", "warning");
        return;
      }
    } else {
      if (!formData.asunto || formData.asunto.trim().length < 3) {
        Swal.fire("Error", "El asunto debe tener al menos 3 caracteres", "warning");
        return;
      }
      if (!formData.encabezado || formData.encabezado.trim().length < 5) {
        Swal.fire("Error", "El encabezado debe tener al menos 5 caracteres", "warning");
        return;
      }
      if (!formData.mensaje || formData.mensaje.trim().length < 10) {
        Swal.fire("Error", "El mensaje debe tener al menos 10 caracteres", "warning");
        return;
      }
    }

    setSaving(true);

    try {
      const form = new FormData();

      // Campos comunes
      if (tipo === "whatsapp") {
        form.append("mensaje", formData.mensaje);
        if (!imageFile && formData.imagen_url) {
          form.append("imagen_url_actual", formData.imagen_url);
        }
      } else {
        form.append("asunto", formData.asunto);
        form.append("encabezado", formData.encabezado);
        form.append("mensaje", formData.mensaje);
        form.append("mensaje_boton", formData.mensaje_boton || "");
        form.append("url_boton", formData.url_boton || "");
        form.append("footer", formData.footer || "");
        form.append("red_facebook", formData.red_facebook || "");
        form.append("red_instagram", formData.red_instagram || "");
        form.append("red_linkedin", formData.red_linkedin || "");
        form.append("red_tiktok", formData.red_tiktok || "");
        if (!imageFile && formData.imagen_url) {
          form.append("imagen_url_actual", formData.imagen_url);
        }
      }

      // Imagen (si se cambió)
      if (imageFile) {
        form.append("imagen", imageFile);
      }

      const plantillaId = getPlantillaId(selectedPlantilla);
      const res = await apiRequest(`/api/plantillas/${tipo}/${plantillaId}/actualizar`, {
        method: "POST",
        body: form,
      });

      if (res.success) {
        Swal.fire("¡Éxito!", "Plantilla actualizada correctamente", "success");
        await loadPlantillas();
        
        // Actualizar la plantilla seleccionada con los nuevos datos
        const selectedId = getPlantillaId(selectedPlantilla);
        const updatedPlantilla = plantillas.find(p => getPlantillaId(p) === selectedId);
        if (updatedPlantilla) {
          setSelectedPlantilla({ ...updatedPlantilla, ...res.data });
        }
      } else {
        Swal.fire("Error", res.message || "No se pudo actualizar la plantilla", "error");
      }
    } catch (error) {
      console.error("Error en handleSave:", error);
      Swal.fire("Error", "Error de conexión al guardar", "error");
    } finally {
      setSaving(false);
    }
  };

  const getNombreServicio = (id_servicio) => {
    const servicio = servicios.find((s) => s.id === id_servicio);
    return servicio ? servicio.nombre : `Servicio ${id_servicio}`;
  };

  const getTiempoEnvio = (numero_plantilla) => {
    switch (numero_plantilla) {
      case 1:
        return "Inmediato";
      case 2:
        return "+30 minutos";
      case 3:
        return "+3 horas";
      default:
        return `Plantilla ${numero_plantilla}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector de tipo */}
      <Card>
        <CardTitle>Gestión de Plantillas</CardTitle>
        <p className="mt-2 text-sm text-slate-500">
          Edita las plantillas de mensajes automáticos para WhatsApp y correos electrónicos.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              setTipo("whatsapp");
              setSelectedPlantilla(null);
            }}
            className={`flex-1 rounded-xl border-2 px-6 py-4 text-sm font-semibold transition ${
              tipo === "whatsapp"
                ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </div>
          </button>

          <button
            onClick={() => {
              setTipo("email");
              setSelectedPlantilla(null);
            }}
            className={`flex-1 rounded-xl border-2 px-6 py-4 text-sm font-semibold transition ${
              tipo === "email"
                ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </div>
          </button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista de plantillas */}
        <div className="lg:col-span-1">
          <Card>
            <CardTitle>
              Plantillas {tipo === "whatsapp" ? "WhatsApp" : "Email"}
            </CardTitle>

            {loading ? (
              <div className="mt-4 flex justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {servicios.map((servicio) => {
                  const plantillasServicio = plantillas.filter(
                    (p) => p.id_servicio === servicio.id
                  );

                  return (
                    <div key={servicio.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <h3 className="mb-2 text-sm font-semibold text-slate-700">
                        {servicio.nombre}
                      </h3>
                      <div className="space-y-1">
                        {[1, 2, 3].map((numero) => {
                          const plantilla = plantillasServicio.find(
                            (p) => p.numero_plantilla === numero
                          );
                          const isSelected = getPlantillaId(selectedPlantilla) === getPlantillaId(plantilla);

                          return (
                            <button
                              key={numero}
                              onClick={() => plantilla && handleSelectPlantilla(plantilla)}
                              disabled={!plantilla}
                              className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                                isSelected
                                  ? "bg-cyan-500 text-white"
                                  : plantilla
                                  ? "bg-white text-slate-600 hover:bg-slate-100"
                                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              {getTiempoEnvio(numero)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {!selectedPlantilla ? (
            <Card>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg
                  className="h-16 w-16 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-lg font-semibold text-slate-700">
                  Selecciona una plantilla
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Elige una plantilla de la lista para editarla
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {getNombreServicio(selectedPlantilla.id_servicio)}
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-500">
                    {getTiempoEnvio(selectedPlantilla.numero_plantilla)} · ID: {selectedPlantilla.id}
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
                    saving
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700"
                  }`}
                >
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {/* Formulario WhatsApp */}
                {tipo === "whatsapp" && (
                  <>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-700">
                          Mensaje
                        </label>
                        <button
                          type="button"
                          onClick={() => insertPlaceholder("mensaje")}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 active:bg-slate-300"
                        >
                          + Insertar {"{nombre}"}
                        </button>
                      </div>
                      <textarea
                        id="mensaje"
                        value={formData.mensaje || ""}
                        onChange={(e) => handleInputChange("mensaje", e.target.value)}
                        rows={12}
                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="Escribe el mensaje aquí... Usa {nombre} para personalizar"
                      />
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          <strong className="text-slate-700">Importante:</strong> <code className="rounded bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 font-semibold text-cyan-700">{"{nombre}"}</code> es un placeholder del sistema que se reemplaza automáticamente con el nombre del cliente desde la base de datos.
                        </p>
                        {!hasNombrePlaceholder(formData.mensaje) && formData.mensaje && (
                          <p className="text-xs font-medium text-amber-600 flex items-center gap-1 whitespace-nowrap">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Sin personalización
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Imagen
                      </label>
                      <div className="mt-2 grid gap-4 sm:grid-cols-2">
                        <div
                          onDrop={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:border-cyan-400 hover:bg-cyan-50/30"
                        >
                          <UploadIcon />
                          <p className="mt-2 text-sm font-semibold text-slate-700">
                            Arrastra una imagen
                          </p>
                          <p className="text-xs text-slate-500">o haz clic para buscar</p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => handleImageChange(e.target.files[0])}
                            className="mt-3 text-xs"
                          />
                        </div>

                        {imagePreview && (
                          <div className="relative overflow-hidden rounded-lg border border-slate-200">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                            {imageFile && (
                              <div className="absolute bottom-2 left-2 rounded bg-cyan-500 px-2 py-1 text-xs font-semibold text-white">
                                Nueva imagen
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Formulario Email */}
                {tipo === "email" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Asunto del correo
                      </label>
                      <input
                        type="text"
                        value={formData.asunto || ""}
                        onChange={(e) => handleInputChange("asunto", e.target.value)}
                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="Asunto del email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Encabezado
                      </label>
                      <input
                        type="text"
                        value={formData.encabezado || ""}
                        onChange={(e) => handleInputChange("encabezado", e.target.value)}
                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="Título principal del correo"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-700">
                          Mensaje
                        </label>
                        <button
                          type="button"
                          onClick={() => insertPlaceholder("mensaje")}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 active:bg-slate-300"
                        >
                          + Insertar {"{nombre}"}
                        </button>
                      </div>
                      <textarea
                        id="mensaje"
                        value={formData.mensaje || ""}
                        onChange={(e) => handleInputChange("mensaje", e.target.value)}
                        rows={8}
                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="Contenido del mensaje... Usa {nombre} para personalizar"
                      />
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          <strong className="text-slate-700">Importante:</strong> <code className="rounded bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 font-semibold text-cyan-700">{"{nombre}"}</code> es un placeholder del sistema que se reemplaza automáticamente con el nombre del cliente desde la base de datos.
                        </p>
                        {!hasNombrePlaceholder(formData.mensaje) && formData.mensaje && (
                          <p className="text-xs font-medium text-amber-600 flex items-center gap-1 whitespace-nowrap">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Sin personalización
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Imagen
                      </label>
                      <div className="mt-2 grid gap-4 sm:grid-cols-2">
                        <div
                          onDrop={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:border-cyan-400 hover:bg-cyan-50/30"
                        >
                          <UploadIcon />
                          <p className="mt-2 text-sm font-semibold text-slate-700">
                            Arrastra una imagen
                          </p>
                          <p className="text-xs text-slate-500">o haz clic para buscar</p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => handleImageChange(e.target.files[0])}
                            className="mt-3 text-xs"
                          />
                        </div>

                        {imagePreview && (
                          <div className="relative overflow-hidden rounded-lg border border-slate-200">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                            {imageFile && (
                              <div className="absolute bottom-2 left-2 rounded bg-cyan-500 px-2 py-1 text-xs font-semibold text-white">
                                Nueva imagen
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700">
                          Texto del botón
                        </label>
                        <input
                          type="text"
                          value={formData.mensaje_boton || ""}
                          onChange={(e) => handleInputChange("mensaje_boton", e.target.value)}
                          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                          placeholder="Ej: Ver más información"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700">
                          URL del botón
                        </label>
                        <input
                          type="url"
                          value={formData.url_boton || ""}
                          onChange={(e) => handleInputChange("url_boton", e.target.value)}
                          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Footer
                      </label>
                      <textarea
                        value={formData.footer || ""}
                        onChange={(e) => handleInputChange("footer", e.target.value)}
                        rows={3}
                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="Pie de página del correo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Redes Sociales
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1">Facebook</label>
                          <input
                            type="url"
                            value={formData.red_facebook || ""}
                            onChange={(e) => handleInputChange("red_facebook", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                            placeholder="https://facebook.com/..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-600 mb-1">Instagram</label>
                          <input
                            type="url"
                            value={formData.red_instagram || ""}
                            onChange={(e) => handleInputChange("red_instagram", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                            placeholder="https://instagram.com/..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-600 mb-1">LinkedIn</label>
                          <input
                            type="url"
                            value={formData.red_linkedin || ""}
                            onChange={(e) => handleInputChange("red_linkedin", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                            placeholder="https://linkedin.com/..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-600 mb-1">TikTok</label>
                          <input
                            type="url"
                            value={formData.red_tiktok || ""}
                            onChange={(e) => handleInputChange("red_tiktok", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                            placeholder="https://tiktok.com/@..."
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
