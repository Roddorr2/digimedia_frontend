"use client";

import url from "@/api/url";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_DEV ||
  url;

const getBg = (config) => {
  if (
    config.service_color_2 &&
    config.service_color_2 !== config.service_color
  ) {
    return `linear-gradient(${config.gradient_direction || "to bottom"}, ${config.service_color}, ${config.service_color_2})`;
  }
  return config.service_color;
};

// ── Fuera del componente principal para que React no los recree en cada render ──

const inputCls =
  "w-full rounded-full px-4 py-2.5 text-gray-700 bg-white border-none focus:outline-none focus:ring-2 focus:ring-white";

function Field({ children, error }) {
  return (
    <div>
      {children}
      <p className="min-h-[16px] text-xs text-red-200 pl-4 mt-0.5">
        {error || ""}
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────

export default function ServicePopup({ idSubservicio, tiempoGlobal = null }) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState({ nombre: "", telefono: "", correo: "" });
  const [formData, setFormData] = useState({ nombre: "", telefono: "", correo: "" });

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/public/popup-configs/subservicio/${idSubservicio}`
        );
        if (response.data.success) setConfig(response.data.data);
      } catch (error) {
        console.error("Error cargando pop-up:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [idSubservicio]);

  useEffect(() => {
    if (!config) return;
    const timerDelay =
      tiempoGlobal !== null ? tiempoGlobal : (config.trigger_time || 5) * 1000;
    const timer = setTimeout(() => setOpen(true), timerDelay);
    return () => clearTimeout(timer);
  }, [config, tiempoGlobal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 9) {
        setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
      }
      if (errors.telefono) setErrors((prev) => ({ ...prev, telefono: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { nombre: "", telefono: "", correo: "" };
    let hasError = false;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Ingresa tu nombre";
      hasError = true;
    }
    if (formData.telefono.length !== 9) {
      newErrors.telefono = "Debe tener 9 dígitos";
      hasError = true;
    }
    if (!formData.correo.trim()) {
      newErrors.correo = "Ingresa tu correo";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setSending(true);
    try {
      const payload = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        correo: formData.correo,
        id_servicio: config?.subservicio?.id_servicio || idSubservicio.toString(),
      };
      const response = await axios.post(`${API_URL}/api/modales`, payload);

      setOpen(false);
      setFormData({ nombre: "", telefono: "", correo: "" });
      setErrors({ nombre: "", telefono: "", correo: "" });

      if (response.status === 201) {
        Swal.fire({
          title: "¡Mensaje enviado!",
          text: "Nos pondremos en contacto contigo pronto.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar. Intenta de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => setOpen(false);

  if (!isClient || loading || !config || !open) return null;

  // ── DESKTOP ──────────────────────────────────────────────
  if (!isMobile) {
    const leftImg = config.left_image_url;
    const rightImg = config.right_image_url;

    return createPortal(
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
          style={{ background: getBg(config) }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-2 z-20 text-white bg-black bg-opacity-40 rounded-full w-7 h-7 flex items-center justify-center hover:bg-opacity-60 transition cursor-pointer text-sm font-bold"
          >
            ✕
          </button>

          {rightImg && (
            <div className="absolute inset-0 z-0">
              <img
                src={rightImg}
                alt={config.right_alt || "Fondo"}
                className="w-full h-full object-cover"
                style={{ opacity: (config.right_opacity || 100) / 100 }}
              />
            </div>
          )}

          <div className="relative z-10 flex flex-row">
            {leftImg && (
              <div className="w-2/5 flex-shrink-0 relative min-h-[300px]">
                <Image
                  src={leftImg}
                  alt={config.left_alt || "Pop-up izquierda"}
                  fill
                  className="object-cover"
                  style={{ opacity: (config.left_opacity || 100) / 100 }}
                />
              </div>
            )}

            <div className="flex-1 px-6 pt-8 pb-6 pr-10 flex flex-col justify-center gap-3">
              <h2
                className="text-xl font-bold text-center leading-snug"
                style={{ color: config.title_color || "#FFFFFF" }}
              >
                {config.title_text || "OBTÉN UNA ASESORÍA ¡GRATIS!"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <Field error={errors.nombre}>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </Field>
                <Field error={errors.telefono}>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    maxLength={9}
                    className={inputCls}
                  />
                </Field>
                <Field error={errors.correo}>
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo electrónico"
                    value={formData.correo}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </Field>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full font-bold py-2.5 text-white transition-all hover:brightness-110 disabled:opacity-50 mt-1"
                  style={{
                    backgroundColor:
                      config.button_color || config.service_color || "#7C3FD9",
                  }}
                >
                  {sending ? "Enviando..." : config.button_text || "HAZLO YA"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // ── MOBILE ───────────────────────────────────────────────
  return createPortal(
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
        style={{ background: getBg(config) }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 text-white bg-black bg-opacity-40 rounded-full w-7 h-7 flex items-center justify-center hover:bg-opacity-60 transition cursor-pointer text-sm font-bold"
        >
          ✕
        </button>

        {config.mobile_image_url && (
          <div className="relative h-44 w-full flex-shrink-0">
            <Image
              src={config.mobile_image_url}
              alt={config.mobile_alt || "Pop-up mobile"}
              fill
              className="object-cover"
              style={{ opacity: (config.mobile_opacity || 100) / 100 }}
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

        <div
          className="px-5 pt-8 pb-5 pr-8 flex flex-col gap-3"
          style={
            config.mobile_image_url
              ? { backgroundColor: `${config.service_color}CC` }
              : {}
          }
        >
          <h2
            className="text-xl font-bold text-center leading-snug"
            style={{ color: config.title_color || "#FFFFFF" }}
          >
            {config.title_text || "OBTÉN UNA ASESORÍA ¡GRATIS!"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <Field error={errors.nombre}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
            <Field error={errors.telefono}>
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                maxLength={9}
                className={inputCls}
              />
            </Field>
            <Field error={errors.correo}>
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full font-bold py-2.5 text-white transition-all hover:brightness-110 disabled:opacity-50 mt-1"
              style={{
                backgroundColor:
                  config.button_color || config.service_color || "#7C3FD9",
              }}
            >
              {sending ? "Enviando..." : config.button_text || "HAZLO YA"}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}