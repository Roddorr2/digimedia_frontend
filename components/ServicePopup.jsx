"use client";

import url from "@/api/url";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User, Phone, Mail } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_DEV ||
  url;

const getBg = (config) => {
  if (
    config.service_color_2 &&
    config.service_color_2 !== config.service_color
  ) {
    return `linear-gradient(${config.gradient_direction || "to bottom right"}, ${config.service_color}, ${config.service_color_2})`;
  }
  return config.service_color || "#ffffff";
};

const InputField = ({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  maxLength,
}) => (
  <div className="relative w-full">
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      className="w-full rounded-full pl-9 pr-3 py-1.5 text-xs text-black border border-gray-400 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder-gray-600 shadow-sm"
    />
  </div>
);

const SubmitButton = ({ config, sending }) => (
  <button
    type="submit"
    disabled={sending}
    className="w-3/4 mx-auto block rounded-full font-bold py-2 text-white transition-all uppercase tracking-wide text-xs shadow-md hover:opacity-90 disabled:opacity-50 mt-4"
    style={{ backgroundColor: config.button_color || "#7029E3" }}
  >
    {sending ? (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
    ) : (
      config.button_text || "ENVIAR"
    )}
  </button>
);

function FormContent({
  formData,
  handleChange,
  handleSubmit,
  config,
  sending,
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[270px] space-y-2.5">
      <InputField
        icon={User}
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <InputField
        icon={Phone}
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
        maxLength={9}
      />

      <InputField
        icon={Mail}
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        required
      />

      <SubmitButton config={config} sending={sending} />
    </form>
  );
}

export default function ServicePopup({
  idServicio,
  idSubservicio = null,
  tiempoGlobal = null,
  buttonId = null,
}) {
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
        let response;
        if (idSubservicio) {
          response = await axios.get(
            `${API_URL}/api/public/popup-configs/subservicio/${idSubservicio}`,
          );
        } else if (idServicio) {
          response = await axios.get(
            `${API_URL}/api/public/popup-configs/servicio/${idServicio}`,
          );
        } else {
          console.error("Debe proporcionar idServicio o idSubservicio");
          setLoading(false);
          return;
        }
        if (response.data.success) {
          setConfig(response.data.data);
        } else {
          console.error("No se encontró configuración");
        }
      } catch (error) {
        console.error("Error cargando pop-up:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [idServicio, idSubservicio]);

  useEffect(() => {
    if (!config) return;
    if (config.trigger_type === "time") {
      const timerDelay =
        tiempoGlobal !== null
          ? tiempoGlobal
          : (config.trigger_time || 5) * 1000;
      const timer = setTimeout(() => setOpen(true), timerDelay);
      return () => clearTimeout(timer);
    }
    if (config.trigger_type === "click") {
      const triggerId = idSubservicio || idServicio;
      const triggerElementId = buttonId || `popup-trigger-${triggerId}`;
      const handleClick = () => setOpen(true);
      const element = document.getElementById(triggerElementId);
      if (element) {
        element.addEventListener("click", handleClick);
        return () => element.removeEventListener("click", handleClick);
      } else {
        console.warn(`Elemento con ID "${triggerElementId}" no encontrado`);
      }
    }
  }, [config, tiempoGlobal, buttonId, idServicio, idSubservicio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 9)
        setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
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
          config?.subservicio?.id_servicio ||
          idServicio ||
          idSubservicio?.toString(),
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

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpen(false);
  };

  if (loading || !config) return null;
  if (!open) return null;

  const isSplitLayout = config.layout === "split";
  const isLeftImageLayout = config.layout === "left-image" || isSplitLayout;
  const leftImg = config.left_image_url;
  const rightImg = config.right_image_url;
  const bothImages = isSplitLayout && !!(leftImg && rightImg);

  // ==========================================
  // VERSIÓN DESKTOP
  // ==========================================
  if (!isMobile) {
    return (
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-3xl overflow-hidden w-[680px] h-[440px] shadow-2xl flex flex-row"
          style={{ background: getBg(config) }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-20 text-gray-500 bg-white/50 rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-white/80 transition shadow-sm"
          >
            ✕
          </button>

          {bothImages ? (
            <>
              {/* Imagen izquierda — 43% */}
              <div className="relative w-[43%] h-full flex-shrink-0">
                <Image src={leftImg} alt={config.left_alt || "Pop-up izquierda"} fill className="object-cover" style={{ opacity: (config.left_opacity || 100) / 100 }} unoptimized />
                {config.show_logo && <img src="/servicios/digimedia-logo-modal.webp" alt="Digimedia Marketing" className="absolute top-5 left-5 w-14 z-10 drop-shadow-md" />}
                {config.left_text && <p className="absolute bottom-8 right-5 text-white text-right font-bold text-xl z-10 max-w-[85%] drop-shadow-lg leading-tight">{config.left_text}</p>}
              </div>
              {/* Imagen derecha — 57% con formulario */}
              <div className="relative flex-1 h-full">
                <Image src={rightImg} alt={config.right_alt || "Pop-up derecha"} fill className="object-cover object-left-top" style={{ opacity: (config.right_opacity || 100) / 100 }} unoptimized />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12">
                  <FormContent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} config={config} sending={sending} />
                </div>
              </div>
            </>
          ) : isLeftImageLayout ? (
            <>
              {/* Imagen izquierda — solo si existe */}
              {leftImg && (
                <div className="relative w-[45%] h-full flex-shrink-0">
                  <Image src={leftImg} alt={config.left_alt || "Pop-up izquierda"} fill className="object-cover" style={{ opacity: (config.left_opacity || 100) / 100 }} unoptimized />
                  {config.show_logo && <img src="/servicios/digimedia-logo-modal.webp" alt="Digimedia Marketing" className="absolute top-5 left-5 w-14 z-10 drop-shadow-md" />}
                  {config.left_text && <p className="absolute bottom-8 right-5 text-white text-right font-bold text-xl z-10 max-w-[85%] drop-shadow-lg leading-tight">{config.left_text}</p>}
                </div>
              )}

              {/* Panel derecho: imagen de fondo (solo en su panel) + formulario */}
              <div className="flex-1 relative h-full">
                {rightImg && (
                  <div className="absolute inset-0 z-0">
                    <img src={rightImg} alt={config.right_alt || "Fondo"} className="w-full h-full object-cover object-top" style={{ opacity: (config.right_opacity || 100) / 100 }} />
                  </div>
                )}
                <div className={`h-full flex flex-col items-center px-8 ${leftImg ? "justify-end pb-12" : "justify-center"} relative z-10`}>
                  <FormContent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} config={config} sending={sending} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Fondo completo — la imagen que exista ocupa todo */}
              {leftImg && (
                <div className="absolute inset-0 z-0">
                  <img src={leftImg} alt={config.left_alt || "Fondo"} className="w-full h-full object-cover" style={{ opacity: (config.left_opacity || 100) / 100 }} />
                </div>
              )}
              {rightImg && !leftImg && (
                <div className="absolute inset-0 z-0">
                  <img src={rightImg} alt={config.right_alt || "Fondo"} className="w-full h-full object-cover" style={{ opacity: (config.right_opacity || 100) / 100 }} />
                </div>
              )}

              {/* Formulario */}
              <div className="flex-1 px-8 flex flex-col items-center justify-center z-10">
                <FormContent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} config={config} sending={sending} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VERSIÓN MOBILE
  // ==========================================
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-2xl overflow-hidden w-full max-w-sm min-h-[420px] shadow-2xl flex flex-col"
        style={{ background: getBg(config) }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 text-white bg-black/50 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/70 transition"
        >
          ✕
        </button>

        {config.mobile_image_url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={config.mobile_image_url}
              alt={config.mobile_alt || "Pop-up mobile"}
              fill
              className="object-cover"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
              }}
            />
          </div>
        )}

        <div className="px-5 pt-8 pb-5 mt-auto relative z-10">
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <InputField
              icon={User}
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <InputField
              icon={Phone}
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
              maxLength={9}
            />
            <InputField
              icon={Mail}
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <SubmitButton config={config} sending={sending} />
          </form>
        </div>
      </div>
    </div>
  );
}
