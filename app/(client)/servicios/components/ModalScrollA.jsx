// "use client";
// import { useEffect, useState } from "react";

// import axios from "axios";
// import Swal from "sweetalert2";

// import { getCookie } from "cookies-next";
// import url from "../../../../api/url";
// import { Loader2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import styles from "./modal.module.css";
// import Image from "next/image";

// const URL_API = `${url}/api/modales`;

// export default function ModalScrollA({ data, time }) {
//   const [open, setOpen] = useState(false);
//   const { text, fondo, title, alt, titleAttr, serviceName, width, height } =
//     data;

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     nombre: "",
//     telefono: "",
//     correo: "",
//     id_servicio: serviceName,
//   });

//   useEffect(() => {
//     setTimeout(() => {
//       setOpen(true);
//     }, time * 1000);
//   }, []);

//   const handleChange = (e) => {
//     let { name, value } = e.target;

//     if (name === "telefono") {
//       value = value.replace(/\D/g, "");
//       if (value.length > 9) value = value.slice(0, 9);
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();

//     /*
//     const axios = (await import("axios")).default;
//     const Swal = (await import("sweetalert2")).default;
//     */

//     try {
//       if (formData.telefono.length !== 9) {
//         setOpen(false);

//         Swal.fire({
//           title: "Error",
//           text: "El número de teléfono debe ser 9 digitos.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         return;
//       }

//       const response = await axios.post(
//         `${URL_API}`,
//         {
//           ...formData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getCookie("token")}`,
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       setOpen(false);

//       if (response.status === 201) {
//         Swal.fire({
//           title: "Modal enviado Correctamente",
//           text: `Nos pondremos en contacto contigo. Servicio de ${text}.`,
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: "No se envio el contacto correctamente.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       setOpen(false);

//       Swal.fire({
//         title: "Error",
//         text: "Ocurrió un error inesperado.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//       setFormData({
//         nombre: "",
//         telefono: "",
//         correo: "",
//         id_servicio: serviceName,
//       });
//     }
//   };

//   return (
//     <div
//       onClick={() => setOpen(false)}
//       className={cn(
//         open ? "fade-in flex" : "hidden",
//         "seccionA bg-[rgba(0,0,0,0.43)] w-screen h-screen items-center justify-center fixed top-0 left-0 z-[9998]",
//       )}>
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={cn(
//           open ? styles["modal-content"] : "",
//           "flex w-[65%] md:w-[600px] relative text-white rounded-2xl overflow-hidden",
//         )}>
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute top-3 right-3 z-50 text-white text-lg font-bold">
//           X
//         </button>

//         <div className="hidden md:flex relative md:w-64 overflow-hidden justify-center">
//           <Image
//             className="w-full object-cover"
//             src={fondo}
//             alt={alt || title}
//             title={titleAttr}
//             width={width || 200}
//             height={height || 100}
//           />
//           <Image
//             className="absolute top-4 left-4"
//             src="/servicios/digimedia-logo-modal.webp"
//             alt="Logo en rosado y azul de Digimedia Marketing"
//             title="Digimedia + logo + agencia + marketing digital + rosado + azul"
//             width={60}
//             height={40}
//           />
//           <p className="absolute bottom-10 right-6 text-2xl font-semibold text-right">
//             {text}
//           </p>
//         </div>

//         <div className="p-8 flex flex-col w-full md:w-96 justify-between gap-8 bg-gradient-to-b from-[#8B3FD9] via-[#A855D9] to-[#FF6B35]">
//           <p className="text-3xl text-center font-bold">{title}</p>
//           <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
//             <Input
//               label="Nombre"
//               type="text"
//               name="nombre"
//               value={formData.nombre}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               label="Teléfono"
//               type="tel"
//               name="telefono"
//               value={formData.telefono}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               label="Correo"
//               type="text"
//               name="correo"
//               value={formData.correo}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="hidden"
//               name="id_servicio"
//               value={formData.id_servicio}
//               readOnly
//             />

//             <button
//               disabled={loading}
//               className="bg-[#7C3FD9] p-2 text-2xl font-bold rounded-2xl mt-4"
//               type="submit">
//               {loading ? (
//                 <Loader2 className="animate-spin h-4 w-4 mx-auto" />
//               ) : (
//                 "HAZLO YA"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Input({ label, type, name, value, onChange, ...props }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="font-semibold" htmlFor={name}>
//         {label}
//       </label>
//       <input
//         className="p-1 outline-none rounded-md text-black"
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         {...props}
//       />
//     </div>
//   );
// }



"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import url from "../../../../api/url";
import { cn } from "@/lib/utils";

import styles from "./modal.module.css";

const URL_API = `${url}/api/modales`;

export default function ModalScrollA({ data, time }) {
  const {
    text,
    fondo,
    title,
    alt,
    titleAttr,
    serviceName,
    width,
    height,
  } = data;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialFormData = useMemo(
    () => ({
      nombre: "",
      telefono: "",
      correo: "",
      id_servicio: serviceName,
    }),
    [serviceName]
  );

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, time * 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const handleChange = useCallback((e) => {
    let { name, value } = e.target;

    if (name === "telefono") {
      value = value.replace(/\D/g, "");

      if (value.length > 9) {
        value = value.slice(0, 9);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const axios = (await import("axios")).default;
    const Swal = (await import("sweetalert2")).default;

    try {
      if (formData.telefono.length !== 9) {
        setOpen(false);

        Swal.fire({
          title: "Error",
          text: "El número de teléfono debe ser 9 dígitos.",
          icon: "error",
          confirmButtonText: "OK",
        });

        return;
      }

      const response = await axios.post(
        URL_API,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setOpen(false);

      if (response.status === 201) {
        Swal.fire({
          title: "Modal enviado correctamente",
          text: `Nos pondremos en contacto contigo. Servicio de ${text}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se envió el contacto correctamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setOpen(false);

      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
      setFormData(initialFormData);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className={cn(
        "fade-in flex fixed inset-0 z-[9998] items-center justify-center bg-[rgba(0,0,0,0.43)]"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          styles["modal-content"],
          "relative flex w-[65%] overflow-hidden rounded-2xl text-white md:w-[600px]"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-50 text-lg font-bold text-white"
        >
          X
        </button>

        <div className="relative hidden justify-center overflow-hidden md:flex md:w-64">
          <Image
            className="w-full object-cover"
            src={fondo}
            alt={alt || title}
            title={titleAttr}
            width={width || 200}
            height={height || 100}
            sizes="256px"
            quality={70}
          />

          <Image
            className="absolute left-4 top-4"
            src="/servicios/digimedia-logo-modal.webp"
            alt="Logo en rosado y azul de Digimedia Marketing"
            title="Digimedia logo"
            width={60}
            height={40}
            sizes="60px"
            quality={60}
          />

          <p className="absolute bottom-10 right-6 text-right text-2xl font-semibold">
            {text}
          </p>
        </div>

        <div className="flex w-full flex-col justify-between gap-8 bg-gradient-to-b from-[#8B3FD9] via-[#A855D9] to-[#FF6B35] p-8 md:w-96">
          <p className="text-center text-3xl font-bold">
            {title}
          </p>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <Input
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />

            <Input
              label="Correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <input
              type="hidden"
              name="id_servicio"
              value={formData.id_servicio}
              readOnly
            />

            <button
              disabled={loading}
              className="mt-4 rounded-2xl bg-[#7C3FD9] p-2 text-2xl font-bold"
              type="submit"
            >
              {loading ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                "HAZLO YA"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Input = memo(function Input({
  label,
  type,
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="font-semibold"
        htmlFor={name}
      >
        {label}
      </label>

      <input
        className="rounded-md p-1 text-black outline-none"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
});