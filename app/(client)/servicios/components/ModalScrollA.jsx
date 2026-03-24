'use client';
import { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import url from '../../../../api/url';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './modal.module.css'
import Image from 'next/image';

const URL_API = `${url}/api/modales`;

export default function ModalScrollA({ data, time }) {
  const [open, setOpen] = useState(false);
  const { text, fondo, title, serviceName, width, height, imageTitle, imageAlt } = data;

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

      const response = await axios.post(
        `${URL_API}`,
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
      setOpen(false);

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
          <Image className="w-full object-cover" src={fondo} alt={imageAlt || title} title={imageTitle || ''} width={width || 200} height={height || 100} />
          <Image
            className="absolute top-4 left-4"
            src="/servicios/digimedia-logo-modal.webp"
            alt="Logo en rosado y azul de Digimedia Marketing"
            title="Digimedia + logo + agencia + marketing digital + rosado + azul"
            width={60}
            height={40}
          />
          <p className="absolute bottom-10 right-6 text-2xl font-semibold text-right">
            {text}
          </p>
        </div>

        <div className="p-8 flex flex-col w-full md:w-96 justify-between gap-8 bg-gradient-to-b from-[#8B3FD9] via-[#A855D9] to-[#FF6B35]">
          <p className="text-3xl text-center font-bold">{title}</p>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input label="Nombre" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            <Input label="Teléfono" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            <Input label="Correo" type="text" name="correo" value={formData.correo} onChange={handleChange} required />
            <input type="hidden" name="id_servicio" value={formData.id_servicio} readOnly />

            <button disabled={loading} className="bg-[#7C3FD9] p-2 text-2xl font-bold rounded-2xl mt-4" type="submit">
              {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : "HAZLO YA"}
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
      <label className="font-semibold" htmlFor={name}>{label}</label>
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