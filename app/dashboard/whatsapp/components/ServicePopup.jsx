"use client";

import url from "@/api/url";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL_PROD || process.env.NEXT_PUBLIC_API_URL_DEV || url;

const getBg = (config) => {
  if (
    config.service_color_2 &&
    config.service_color_2 !== config.service_color
  ) {
    return `linear-gradient(${config.gradient_direction || "to bottom"}, ${config.service_color}, ${config.service_color_2})`;
  }
  return config.service_color;
};

export default function ServicePopup({ idSubservicio, tiempoGlobal = null }) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

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
          `${API_URL}/api/public/popup-configs/subservicio/${idSubservicio}`,
        );
        if (response.data.success) {
          setConfig(response.data.data);
        } else {
          console.error("No se encontró configuración para este subservicio");
        }
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
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.telefono.length !== 9) {
      Swal.fire({
        title: "Error",
        text: "El número de teléfono debe tener 9 dígitos",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setSending(true);
    try {
      const payload = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        correo: formData.correo,
        id_servicio:
          config?.subservicio?.id_servicio || idSubservicio.toString(),
      };
      const response = await axios.post(`${API_URL}/api/modales`, payload);
      if (response.status === 201) {
        Swal.fire({
          title: "¡Mensaje enviado!",
          text: "Nos pondremos en contacto contigo pronto.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setOpen(false);
        setFormData({ nombre: "", telefono: "", correo: "" });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar tu mensaje",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => setOpen(false);

  if (loading || !config) return null;
  if (!open) return null;

  const ImagePanel = ({ src, alt, opacity }) => (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt || ""}
        title={alt || ""}
        className="w-full h-full object-cover"
        style={{ opacity: opacity / 100 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
        }}
      />
    </div>
  );

  if (!isMobile) {
    const leftImg = config.left_image_url;
    const rightImg = config.right_image_url;

    return (
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      >
        <div
          className="relative rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
          style={{ background: getBg(config), minHeight: 320 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition"
          >
            ✕
          </button>

          {/* Imagen derecha = fondo completo */}
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

          <div className="relative z-10 flex flex-col md:flex-row">
            {/* Imagen izquierda */}
            {leftImg && (
              <div className="md:w-2/5 relative min-h-[300px] md:min-h-[500px]">
                <Image
                  src={leftImg}
                  alt={config.left_alt || "Pop-up izquierda"}
                  fill
                  className="object-cover"
                  style={{ opacity: (config.left_opacity || 100) / 100 }}
                />
              </div>
            )}

            {/* Formulario */}
            <div className="flex-1 p-6 md:p-8">
              <h2
                className="text-2xl md:text-3xl font-bold text-center mb-6"
                style={{ color: config.title_color || "#FFFFFF" }}
              >
                {config.title_text || "OBTÉN UNA ASESORÍA ¡GRATIS!"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full px-5 py-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  maxLength={9}
                  className="w-full rounded-full px-5 py-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full px-5 py-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full font-bold py-3 text-white transition-all hover:brightness-110 disabled:opacity-50"
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
      </div>
    );
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
        style={{ background: getBg(config) }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition"
        >
          ✕
        </button>

        {/* Imagen mobile de fondo */}
        {config.mobile_image_url && (
          <div className="relative h-48 w-full">
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

        {/* Formulario */}
        <div
          className="p-6"
          style={
            config.mobile_image_url
              ? { backgroundColor: `${config.service_color}CC` }
              : {}
          }
        >
          <h2
            className="text-xl md:text-2xl font-bold text-center mb-6"
            style={{ color: config.title_color || "#FFFFFF" }}
          >
            {config.title_text || "OBTÉN UNA ASESORÍA ¡GRATIS!"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full rounded-full px-4 py-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
              maxLength={9}
              className="w-full rounded-full px-4 py-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full rounded-full px-4 py-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full font-bold py-3 text-white transition-all hover:brightness-110 disabled:opacity-50"
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
  );
}
