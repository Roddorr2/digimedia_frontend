'use client';
import { useEffect,  useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import url from '../../../../api/url';
import url_whasapp from '@/api/url_whasapp';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './modal.module.css'
import Image from 'next/image';

const URL_API = `${url}/api/modales`;
const URL_WHASAPP = `${url_whasapp}/api/send-message`;

export default function ModalScrollA({ data, time }) {
  const [open, setOpen] = useState(false);
  const { text, fondo, title, serviceName, width, height } = data;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    id_servicio: serviceName,
  });

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, time * 1000);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "telefono") {
      value = value.replace(/\D/g, "");
      if (value.length > 9) value = value.slice(0, 9);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const rawPhone = formData.telefono;
      const phoneWithPrefix = `51${rawPhone}`;
      const fecha = new Date();

      const fechaActual = fecha.toISOString().split("T")[0];

      const horaActual = fecha.toTimeString().slice(0, 5);

      if (formData.telefono.length !== 9) {
        setOpen(false);

        Swal.fire({
          title: "Error",
          text: "El número de teléfono debe ser 9 digitos.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      console.log(formData);
      const response = await axios.post(
        `${URL_API}`,
        {
          ...formData,
          // telefono: rawPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseWhasapp = await axios.post(URL_WHASAPP, {
        telefono: phoneWithPrefix,
        nombre: formData.nombre,
        fecha: fechaActual,
        hora: horaActual,
        // templateOption: data.text
        templateOption: "cita_gratis",
      });

      setOpen(false);
      if (response.status === 201) {
        Swal.fire({
          title: "Modal enviado Correctamente",
          text: `Nos pondremos en contacto contigo. Servicio de ${text}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se envio el contacto correctamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        id_servicio: serviceName,
      });
    }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className={cn(
        open ? "fade-in flex" : "hidden",
        "seccionA bg-[rgba(0,0,0,0.43)] w-screen h-screen items-center justify-center fixed top-0 left-0 z-[9998]"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          open ? styles["modal-content"] : "",
          "flex w-[65%] md:w-[600px] relative text-white rounded-2xl overflow-hidden"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-50 text-white text-lg font-bold"
        >
          X
        </button>
       
        <div className="hidden md:flex relative md:w-64 overflow-hidden justify-center">
          <Image className="w-full object-cover" src={fondo} alt={title} width={width || 200} height={height || 100} />
          <Image
            className="absolute top-4 left-4"
            src="/servicios/logo-modal.webp"
            alt="Logo de digimedia marketing de color rosado y azul"
            width={width || 60}
            height={height || 40}
          />
          <p className="absolute bottom-10 right-6 text-2xl font-semibold text-right">
            {text}
          </p>
        </div>

        <div className="p-8 flex flex-col w-full md:w-96 justify-between gap-8 bg-gradient-to-b from-[#0095ff] to-[#ff037f]">

          <p className="text-3xl text-center font-bold">{title}</p>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
              maxLength={9}
              inputMode="numeric"
              pattern="[0-9]{9}"
              placeholder="Ej: 987654321"
              required
            />
            <Input
              label="Correo"
              type="text"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              placeholder="ejemplo@correo.com"
            />
            <input
              type="hidden"
              name="id_servicio"
              value={formData.id_servicio}
              readOnly
            />
            <button
              disabled={loading}
              className="bg-[#0095ff] p-2 text-2xl font-bold rounded-2xl mt-4"
              type="submit"
              title={loading ? "Guardando..." : "Enviar Mensaje"}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mx-auto" />
                </span>
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

function Input({ label, type, name, value, onChange, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        className="p-1 outline-none rounded-md text-black"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
