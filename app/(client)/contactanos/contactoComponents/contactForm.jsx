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

const countriesWithMask = defaultCountries.map((data) => {
  const country = parseCountry(data);
  const example = getExampleNumber(country.iso2.toUpperCase(), phoneExamples);
  const format = example ? ".".repeat(example.nationalNumber.length) : country.format;
  const result = [country.name, country.iso2, country.dialCode, format];
  if (country.priority !== undefined) result[4] = country.priority;
  if (country.areaCodes) result[5] = country.areaCodes;
  return result;
});

export default function ContactForm() {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("51");
  const [countryIso2, setCountryIso2] = useState("pe");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.navigator?.modelContext) return;

    const unregister = window.navigator.modelContext.registerTool({
      name: "submit_contact_form",
      description: "Envía un mensaje de contacto con nombre, email, teléfono y contenido",
      inputSchema: { type: "object", properties: {
        nombre: { type: "string", description: "Nombre completo del usuario" },
        email: { type: "string", format: "email", description: "Dirección de email válida" },
        telefono: { type: "string", description: "Número de teléfono internacional" },
        mensaje: { type: "string", description: "Mensaje que desea enviar" },
      }, required: ["nombre", "email", "telefono", "mensaje"] },
      execute: async ({ nombre, email, telefono, mensaje }) => {
        try {
          const response = await axios.post(URL_API, { nombre, email, numero: telefono, mensaje }, {
            headers: { Authorization: `Bearer ${getCookie("token")}`, Accept: "application/json", "Content-Type": "application/json" }
          });
          return response.status === 201 ? { success: true, message: "Mensaje enviado correctamente" } : { success: false, message: "No se pudo enviar" };
        } catch (error) { return { success: false, message: error.message }; }
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true }
    });

    if (window.navigator.modelContextTesting?.listTools) {
      window.navigator.modelContextTesting.listTools().then(tools => {
        console.log("WebMCP tools registered:", tools);
      });
    }

    return () => unregister && unregister();
  }, []);

  const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };

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
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Mensaje Enviado Correctamente",
          text: "Nos pondremos en contacto contigo lo antes posible.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({ nombre: "", email: "", mensaje: "" });
        setPhone("");
        setDialCode("51");
        setCountryIso2("pe");
      }
    } catch (error) {
      console.error("Error:", error.response);
      Swal.fire({ title: "Error", text: "No se pudo enviar el mensaje", icon: "error", confirmButtonText: "OK" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-12 md:py-24">
      <div className="w-full max-w-[1280px] px-6 relative">
        <div className="flex flex-col md:flex-row gap-12 items-start relative">
          <motion.div className="w-full md:w-[620px] z-20 relative" initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="w-full bg-white rounded-[20px] border-[3px] border-[#b326ff] p-6 md:p-12 shadow-custom">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {["nombre", "email"].map((field, index) => (
                  <motion.input key={field} type={field === "email" ? "email" : "text"} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={formData[field]} onChange={handleChange} required className="w-full h-[54px] border-[3px] border-[#b326ff] rounded-[18px] px-6 text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }} viewport={{ once: true }} />
                ))}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
                  <PhoneInput defaultCountry="pe" countries={countriesWithMask} value={phone} onChange={(phoneVal, meta) => { setPhone(phoneVal); if (meta?.country?.iso2) setCountryIso2(meta.country.iso2); if (meta?.country?.dialCode) setDialCode(meta.country.dialCode); }} forceDialCode={true} inputClassName="!w-full !h-[54px] !border-[3px] !border-[#b326ff] !rounded-[18px] !px-6 !text-lg !ml-2" countrySelectorStyleProps={{ buttonClassName: "!border-[3px] !border-transparent !rounded-[18px] !h-[54px]", dropdownStyleProps: { className: "!rounded-lg" } }} containerClassName="!gap-2" />
                </motion.div>
                <motion.textarea name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange} required className="w-full h-[176px] border-[3px] border-[#b326ff] rounded-[18px] p-6 text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} />
                <motion.div className="flex justify-center md:justify-start" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }}>
                  <button type="submit" disabled={loading} className="w-[240px] h-[60px] bg-[#ffa000] text-white font-black text-xl rounded-[30px] shadow-lg">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Enviar mensaje"}</button>
                </motion.div>
              </form>
            </div>
          </motion.div>
          <motion.div className="w-full md:absolute md:left-[620px] md:top-[140px] flex justify-center" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="relative w-[300px] h-[400px] md:w-[820px] md:h-[1020px]">
              <Image src="/contactanos/man.png" alt="Persona" fill className="object-contain scale-x-[-1]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
