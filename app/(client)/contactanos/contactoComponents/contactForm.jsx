"use client";

import { useState } from "react";
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

// Importar dinámicamente el PhoneInput para evitar problemas de SSR
const PhoneInput = dynamic(
  () => import("react-international-phone").then((mod) => mod.PhoneInput),
  { ssr: false },
);

import "react-international-phone/style.css";
const URL_API = `${url}/api/contactanos`;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Valida que sea un número real y con la longitud correcta para el país seleccionado
    if (!isValidPhoneNumber(phone, countryIso2.toUpperCase())) {
      Swal.fire({
        title: "Número inválido",
        text: "El número ingresado no es válido para el país seleccionado. Verifica la cantidad de dígitos.",
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
        {
          ...formData,
          numero: formattedPhone,
        },
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
      console.error("Error detallado:", error.response);

      if (error.response?.status === 400 || error.response?.status === 422) {
        Swal.fire({
          title: "Número inválido",
          text: "El número ingresado no existe o no es válido. Verifica que sea un número real.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else if (error.response?.status === 500) {
        Swal.fire({
          title: "Error del servidor",
          text: "Hubo un problema interno. Por favor, intenta más tarde.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-12 md:py-24">
      <div className="w-full max-w-[1280px] px-6 relative">
        <div className="flex flex-col md:flex-row gap-12 items-start relative">
          <motion.div
            className="w-full md:w-[620px] z-20 relative"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-full bg-white rounded-[20px] border-[3px] border-[#b326ff] p-6 md:p-12 shadow-custom">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {["nombre", "email"].map((field, index) => (
                  <motion.input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full h-[54px] border-[3px] border-[#b326ff] rounded-[18px] px-6 text-lg text-text-gray placeholder-text-gray focus:outline-none focus:ring-2 focus:ring-[#b326ff] shadow-custom"
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
                    inputClassName="!w-full !h-[54px] !border-[3px] !border-[#b326ff] !rounded-[18px] !px-6 !text-lg !ml-2"
                    countrySelectorStyleProps={{
                      buttonClassName:
                        "!border-[3px] !border-transparent !rounded-[18px] !h-[54px] !mr-2 focus:!outline-none focus:!ring-0 focus:!border-transparent",
                      dropdownStyleProps: {
                        className: "!rounded-lg",
                      },
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
                      className="w-full h-[54px] border-[3px] border-[#b326ff] rounded-[18px] px-6 pr-12 text-lg text-text-gray bg-white focus:outline-none focus:ring-2 focus:ring-[#b326ff] shadow-custom appearance-none cursor-pointer"
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
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg
                        className="w-5 h-5 text-[#b326ff]"
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
                  className="w-full h-[176px] border-[3px] border-[#b326ff] rounded-[18px] p-6 text-lg text-text-gray placeholder-text-gray resize-none focus:outline-none focus:ring-2 focus:ring-[#b326ff] shadow-custom"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                />

                <motion.div
                  className="flex justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[240px] h-[60px] bg-[#ffa000] text-white font-black text-xl rounded-[30px] shadow-lg hover:scale-105 transition-all mt-4 flex items-center justify-center"
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
            className="w-full md:absolute md:left-[620px] md:top-[140px] flex justify-center md:block z-30 pointer-events-none"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* cambios realizados para el tamaño de imagen */}
            <div className="relative w-[300px] h-[400px] md:w-[820px] md:h-[1020px]">
              <Image
                src="/contactanos/man.png"
                alt="Persona de contacto"
                fill
                className="object-contain scale-x-[-1]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;