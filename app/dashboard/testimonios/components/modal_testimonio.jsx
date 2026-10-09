// app/dashboard/testimonios/components/modal_testimonio.jsx
"use client";

import { useState, useEffect } from "react";
import testimonio_service from "../services/testimonio.service";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function modal_testimonio({
  isVisible,
  onClose,
  data,
  onUpdateSuccess,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    texto: "",
    rating: 5,
    fecha_testimonio: "",
  });
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [error, setError] = useState({ status: undefined, message: "" });
  const [button, setButtonStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Resetear estados cuando el modal se cierra
  useEffect(() => {
    if (!isVisible) {
      setError({ status: undefined, message: "" });
      setButtonStatus(true);
      setIsLoading(false);
      setImagenFile(null);
      setImagenPreview(null);
    }
  }, [isVisible]);

  console.log(
    "API Key que se está enviando:",
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  );
  console.log("Cloud name que se está usando:", CLOUDINARY_CLOUD_NAME);
  
  // actualiza formData cuando cambia data
  useEffect(() => {
    if (data) {
      setFormData({
        nombre: data.nombre || "",
        cargo: data.cargo || "",
        texto: data.texto || "",
        rating: data.rating || 5,
        fecha_testimonio: data.fecha_testimonio
          ? data.fecha_testimonio.split("T")[0]
          : "",
      });
      setImagenPreview(data.imagen_url || null);
    } else if (isVisible && !data) {
      setFormData({
        nombre: "",
        cargo: "",
        texto: "",
        rating: 5,
        fecha_testimonio: new Date().toISOString().split("T")[0],
      });
      setImagenPreview(null);
    }
  }, [data, isVisible]);

  if (!isVisible) return null;

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  function handleRatingClick(value) {
    setFormData((prev) => ({ ...prev, rating: value }));
  }

  function handleImagenChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  }

  function handleClose() {
    setError({ status: undefined, message: "" });
    setButtonStatus(true);
    setIsLoading(false);
    if (typeof onClose === "function") onClose();
  }

  // Sube la imagen a Cloudinary siguiendo el flujo de firma + subida directa
  async function subirImagen(id) {
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
      timestamp,
      folder: `testimonios/${id}`,
      public_id: "foto",
      overwrite: "true",
    };

    const signatureResponse = await testimonio_service.generateUploadSignature(
      id,
      paramsToSign,
    );
    if (signatureResponse.error) {
      throw new Error("No se pudo generar la firma de subida");
    }

    const form = new FormData();
    form.append("file", imagenFile);
    form.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    form.append("timestamp", paramsToSign.timestamp);
    form.append("signature", signatureResponse.signature);
    form.append("folder", paramsToSign.folder);
    form.append("public_id", paramsToSign.public_id);
    form.append("overwrite", paramsToSign.overwrite);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: form },
    );

    const cloudinaryData = await cloudinaryResponse.json();

    if (!cloudinaryResponse.ok) {
      console.error("Respuesta de Cloudinary:", cloudinaryData);
      throw new Error(
        cloudinaryData?.error?.message ||
          "Error al subir la imagen a Cloudinary",
      );
    }

    const updateResponse = await testimonio_service.updateImage(
      id,
      cloudinaryData.public_id,
      cloudinaryData.secure_url,
    );

    if (updateResponse.error) {
      throw new Error("No se pudo guardar la imagen en el testimonio");
    }

    return updateResponse.data;
  }

  function createTestimonio() {
    if (formData.nombre.length <= 2)
      return setError({
        status: true,
        message: "Ingresar correctamente el nombre",
      });
    if (formData.texto.length <= 10)
      return setError({ status: true, message: "El testimonio es muy corto" });

    const form = {
      nombre: formData.nombre,
      cargo: formData.cargo,
      texto: formData.texto,
      rating: formData.rating,
      fecha_testimonio: formData.fecha_testimonio,
    };

    setButtonStatus(false);
    setIsLoading(true);

    testimonio_service
      .create(form)
      .then(async (response) => {
        if (response.error) {
          setError({ status: true, message: response.message });
          setButtonStatus(true);
          return;
        }

        if (response.status === 201) {
          const nuevoId = response.data.id_testimonio;

          // si el usuario seleccionó imagen, la sube después de crear el registro
          if (imagenFile) {
            try {
              await subirImagen(nuevoId);
            } catch (imgError) {
              console.error("Error al subir imagen:", imgError);
              setError({
                status: true,
                message:
                  "Testimonio creado, pero hubo un error al subir la imagen",
              });
              setButtonStatus(true);
              return;
            }
          }

          setError({
            status: false,
            message: "Testimonio creado correctamente",
          });
          setTimeout(() => {
            handleClose();
          }, 1000);
        } else {
          setError({
            status: true,
            message: "Hubo un error al crear el testimonio",
          });
          setButtonStatus(true);
        }
      })
      .catch((error) => {
        console.error("Error al crear testimonio:", error);
        setError({
          status: true,
          message: "Hubo un error al crear el testimonio",
        });
        setButtonStatus(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateTestimonio() {
    const form = {
      nombre: formData.nombre,
      cargo: formData.cargo,
      texto: formData.texto,
      rating: formData.rating,
      fecha_testimonio: formData.fecha_testimonio,
    };

    setButtonStatus(false);
    setIsLoading(true);

    testimonio_service
      .update(form, data.id_testimonio)
      .then(async (response) => {
        if (response.error) {
          setError({ status: true, message: response.message });
          setButtonStatus(true);
          return;
        }

        if (Number.parseInt(response.status) === 200) {
          // si el usuario seleccionó una imagen nueva, la sube
          if (imagenFile) {
            try {
              await subirImagen(data.id_testimonio);
            } catch (imgError) {
              console.error("Error al subir imagen:", imgError);
              setError({
                status: true,
                message:
                  "Testimonio actualizado, pero hubo un error al subir la imagen",
              });
              setButtonStatus(true);
              return;
            }
          }

          setError({
            status: false,
            message: "Testimonio actualizado correctamente",
          });

          if (typeof onUpdateSuccess === "function") {
            onUpdateSuccess({ ...data, ...form });
          }

          setTimeout(() => {
            handleClose();
          }, 1000);
        } else {
          setError({ status: true, message: response.message });
          setButtonStatus(true);
        }
      })
      .catch((error) => {
        console.error("Error al actualizar testimonio:", error);
        setError({
          status: true,
          message: "Hubo un error al actualizar el testimonio",
        });
        setButtonStatus(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function guardarTestimonio() {
    if (!data) {
      createTestimonio();
    } else {
      updateTestimonio();
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        className={`w-full max-w-7xl max-h-[calc(100vh-2rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 flex flex-col ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 "
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4 shrink-0">
          <h2 className="font-bold text-lg">
            {data ? "Editar Testimonio" : "Nuevo Testimonio"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form className="dark:text-white p-6 overflow-y-auto flex-1 min-h-0">
          {error.status !== undefined && (
            <div
              className={`border-l-4 p-4 mb-4 rounded-r flex items-center ${
                error.status === false
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
              }`}
            >
              {error.status === false ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
              )}
              <p
                className={`text-sm ${error.status === false ? "text-green-700" : "text-red-700"}`}
              >
                {error.message}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                onChange={handleChange}
                value={formData.nombre}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="cargo">
                Cargo (opcional)
              </label>
              <input
                id="cargo"
                onChange={handleChange}
                value={formData.cargo}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                type="text"
                placeholder="Ej: Cliente, CEO de..."
              />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
              <label
                className="font-semibold text-sm"
                htmlFor="fecha_testimonio"
              >
                Fecha del testimonio (como en Google Maps)
              </label>
              <input
                id="fecha_testimonio"
                onChange={handleChange}
                value={formData.fecha_testimonio}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                type="date"
              />
            </fieldset>
            <fieldset className="flex flex-col gap-2 md:col-span-2">
              <label className="font-semibold text-sm" htmlFor="texto">
                Testimonio
              </label>
              <textarea
                id="texto"
                onChange={handleChange}
                value={formData.texto}
                rows={4}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                placeholder="Escriba el testimonio del cliente"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Calificación</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    className="focus:outline-none"
                  >
                    <StarIcon
                      className={`h-7 w-7 ${
                        value <= formData.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="imagen">
                Foto (opcional)
              </label>
              <input
                id="imagen"
                onChange={handleImagenChange}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                type="file"
                accept="image/png, image/jpeg, image/webp"
              />
              {imagenPreview && (
                <img
                  src={imagenPreview}
                  alt="Vista previa"
                  className="mt-2 h-16 w-16 rounded-full object-cover"
                />
              )}
            </fieldset>
          </div>

          <div className="flex min-[330px]:flex-row flex-col justify-center gap-4 mt-6">
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              type="button"
              onClick={guardarTestimonio}
              disabled={!button || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Aceptar"
              )}
            </button>
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-colors"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
