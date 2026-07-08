"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import url from "../../../../api/url";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { defaultCountries, parseCountry } from "react-international-phone";
import { getExampleNumber, isValidPhoneNumber } from "libphonenumber-js";
import phoneExamples from "libphonenumber-js/mobile/examples";

const PhoneInput = dynamic(
  () => import("react-international-phone").then((mod) => mod.PhoneInput),
  { ssr: false },
);

import "react-international-phone/style.css";
const URL_API = `${url}/api/contactanos`;

// Imagen provisional de la persona — Marketing entregará la imagen definitiva
// más adelante. Reemplazar solo esta constante (mantiene proporción 1420:1872).
const CONTACT_PERSON_IMAGE = "/contactanos/contact-person.png";

// Lista de servicios disponibles (sincronizada con la tabla `servicios` de la BD)
const SERVICIOS = [
  "Diseño Web y Desarrollo Web",
  "Gestión de Redes Sociales",
  "Marketing y Gestión Digital",
  "Branding y Diseño",
];

// Genera la máscara (longitud máxima de dígitos) de cada país automáticamente a partir
// de libphonenumber-js, así react-international-phone limita la cantidad de dígitos por
// país sin necesidad de mantener una lista manual.
const countriesWithMask = defaultCountries.map((data) => {
  const country = parseCountry(data);
  const example = getExampleNumber(country.iso2.toUpperCase(), phoneExamples);
  const format = example
    ? ".".repeat(example.nationalNumber.length)
    : country.format;
  const result = [country.name, country.iso2, country.dialCode, format];
  if (country.priority !== undefined) result[4] = country.priority;
  if (country.areaCodes) result[5] = country.areaCodes;
  return result;
});

const inputBaseClass =
  "w-full h-[54px] sm:h-[58px] md:h-[62px] bg-white/[0.86] rounded-[31.5px] px-6 text-base sm:text-lg text-[#100043] placeholder:text-[#5B5470] shadow-[0_4px_4px_rgba(0,0,0,0.25)] outline-none focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-0 transition-shadow";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    servicio: "",
  });
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("51");
  const [countryIso2, setCountryIso2] = useState("pe");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.navigator?.modelContext)
      return;

    const unregister = window.navigator.modelContext.registerTool({
      name: "submit_contact_form",
      description:
        "Envía un mensaje de contacto con nombre, email, teléfono y contenido",
      inputSchema: {
        type: "object",
        properties: {
          nombre: {
            type: "string",
            description: "Nombre completo del usuario",
          },
          email: {
            type: "string",
            format: "email",
            description: "Dirección de email válida",
          },
          telefono: {
            type: "string",
            description: "Número de teléfono internacional",
          },
          mensaje: { type: "string", description: "Mensaje que desea enviar" },
          servicio: { type: "string", description: "Servicio seleccionado del catálogo" },
        },
        required: ["nombre", "email", "telefono", "mensaje"],
      },
      execute: async ({ nombre, email, telefono, servicio, mensaje }) => {
        try {
          const response = await axios.post(
            URL_API,
            { nombre, email, numero: telefono, servicio, mensaje },
            {
              headers: {
                Authorization: `Bearer ${getCookie("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            },
          );
          return response.status === 201
            ? { success: true, message: "Mensaje enviado correctamente" }
            : { success: false, message: "No se pudo enviar" };
        } catch (error) {
          return { success: false, message: error.message };
        }
      },
      annotations: { readOnlyHint: false, openWorldHint: true, destructiveHint: false, idempotentHint: false },
    });

    if (window.navigator.modelContextTesting?.listTools) {
      window.navigator.modelContextTesting.listTools().then((tools) => {
        console.log("WebMCP tools registered:", tools);
      });
    }

    return () => unregister && unregister();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidPhoneNumber(phone, countryIso2.toUpperCase())) {
      Swal.fire({
        title: "Número inválido",
        text: "El número ingresado no es válido. Verifica la cantidad de dígitos.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setLoading(false);
      return;
    }

    try {
      const nationalNumber = phone.slice(dialCode.length + 1);
      const formattedPhone = `+${dialCode} ${nationalNumber}`;

      const response = await axios.post(
        URL_API,
        { ...formData, numero: formattedPhone },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Mensaje Enviado Correctamente",
          text: "Nos pondremos en contacto contigo lo antes posible.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          nombre: "",
          email: "",
          mensaje: "",
          servicio: "",
        });
        setPhone("");
        setDialCode("51");
        setCountryIso2("pe");
      }
    } catch (error) {
      console.error("Error:", error.response);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el mensaje",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full px-4 sm:px-6 md:px-10 lg:px-12 pt-8 sm:pt-10 md:pt-12 lg:pt-12 pb-16 md:pb-20 lg:pb-20 overflow-hidden">
      {/* Brillos decorativos (se ocultan en móvil por claridad/rendimiento) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 left-[8%] w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#FFB800]/10 blur-[60px] hidden sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[6%] w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#FFB800]/10 blur-[60px] hidden sm:block"
      />

      <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,709px)_minmax(0,1fr)] gap-10 lg:gap-8 lg:items-end">
        <motion.div
          className="relative z-20 w-full max-w-[709px] mx-auto lg:mx-0"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="relative overflow-hidden rounded-[22px] px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-10 lg:py-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(19,0,73,0.69) 0%, rgba(16,0,67,0.69) 100%)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(65,12,137,0) 0%, #5F00DF 50%, rgba(65,12,137,0) 100%)",
              }}
            />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-5"
              toolname="submit_contact_form"
              tooldescription="Envía un mensaje de contacto con nombre, email, teléfono y contenido"
            >
              {["nombre", "email"].map((field, index) => (
                <motion.input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  toolparamdescription={
                    field === "nombre"
                      ? "Nombre completo del usuario"
                      : "Dirección de email válida"
                  }
                  className={inputBaseClass}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                />
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <PhoneInput
                  defaultCountry="pe"
                  countries={countriesWithMask}
                  value={phone}
                  onChange={(phoneVal, meta) => {
                    setPhone(phoneVal);
                    if (meta?.country?.iso2)
                      setCountryIso2(meta.country.iso2);
                    if (meta?.country?.dialCode)
                      setDialCode(meta.country.dialCode);
                  }}
                  forceDialCode={true}
                  inputClassName="!w-full !h-[54px] sm:!h-[58px] md:!h-[62px] !bg-white/[0.86] !border-none !rounded-[31.5px] !px-6 !text-base sm:!text-lg !text-[#100043] !shadow-[0_4px_4px_rgba(0,0,0,0.25)] !ml-2"
                  countrySelectorStyleProps={{
                    buttonClassName:
                      "!bg-white/[0.86] !border-none !rounded-[31.5px] !h-[54px] sm:!h-[58px] md:!h-[62px]",
                    dropdownStyleProps: { className: "!rounded-lg" },
                  }}
                  containerClassName="!gap-2"
                />
              </motion.div>

              {/* ── SELECTOR DE SERVICIO ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className={`${inputBaseClass} pr-12 appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Selecciona un servicio
                    </option>
                    {SERVICIOS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {/* Flecha custom */}
                  <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                    <svg
                      className="w-5 h-5 text-[#100043]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.textarea
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                toolparamdescription="Mensaje que desea enviar"
                className="w-full h-[140px] sm:h-[160px] md:h-[175px] bg-white/[0.86] rounded-[24px] md:rounded-[31.5px] p-6 text-base sm:text-lg text-[#100043] placeholder:text-[#5B5470] resize-none shadow-[0_4px_4px_rgba(0,0,0,0.25)] outline-none focus:ring-2 focus:ring-[#FFB800] transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              />

              <motion.div
                className="flex justify-center sm:justify-start pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-[260px] md:w-[322px] h-[54px] sm:h-[58px] md:h-[62px] bg-[#FFB800] text-[#100043] font-extrabold text-lg sm:text-xl rounded-full shadow-lg hover:scale-105 hover:bg-[#ffc233] transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Contenedor fluido: el ancho nunca excede la columna disponible
              (evita overflow horizontal entre 1024 y 1440px); el alto se
              deriva de la proporción real de la imagen (1420:1872), por lo
              que no queda espacio vacío dentro de su propio recuadro. */}
          <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[420px] xl:max-w-[540px] aspect-[1420/1872] mx-auto lg:mx-0">
            <Image
              src={CONTACT_PERSON_IMAGE}
              alt="Persona atendiendo una consulta de contacto"
              fill
              className="object-contain object-bottom scale-x-[-1]"
              sizes="(max-width: 1024px) 320px, 540px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
