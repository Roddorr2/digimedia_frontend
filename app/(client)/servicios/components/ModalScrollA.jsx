'use client';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import url from '../../../../api/url';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';


const URL_API = `${url}/api/modales`;


export default function ModalScrollA({data, time}) {

  const[open, setOpen] = useState(false)
  const {text,fondo,title,serviceName} = data;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    id_servicio: serviceName,
  });


  useEffect(()=>{
    setTimeout(()=>{setOpen(true)},time * 1000)
  },[])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try{
      const response = await axios.post(`${URL_API}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
     setOpen(false)
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
    }catch(error){
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error);
    }finally{
      setLoading(false);
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        id_servicio: serviceName,
      });
    }
  };

  return (
    <div
     
      onClick={()=> setOpen(false)}
      className={cn(open ? "fade-in flex":"hidden","seccionA bg-[rgba(0,0,0,0.43)] w-screen h-screen items-center justify-center fixed top-0 left-0 z-[9998]")}
    >
      <div
        
        onClick={(e) => e.stopPropagation()}
        className={cn(open ? "modal-content":"","bg-black flex w-[95%] md:w-auto relative text-white rounded-2xl overflow-hidden")}
      >
        <button onClick={()=> setOpen(false)} className="absolute top-4 right-4">
          X
        </button>
        <div className="relative w-[30%] md:w-64 overflow-hidden justify-center flex">
          <img className="w-full object-cover" src={fondo} alt="" />
          <img
            className="absolute top-4 left-4"
            src="/servicios/logo-modal.webp"
            alt="Logo de digimedia marketing de color rosado y azul"
          />
          <p className="absolute hidden md:block bottom-10 right-6 text-2xl font-semibold text-right">
            {text}
          </p>
        </div>
        <div className="p-8 flex flex-col w-[70%] md:w-96 justify-between  gap-8 bg-gradient-to-b from-[#0095ff] to-[#ff037f]">
          <p className="text-3xl text-center font-bold">{title}</p>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <Input
              label="Teléfono"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <Input
              label="Correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
            <input
              type="hidden"
              name="id_servicio"
              value={formData.id_servicio}
              readOnly
            />
            <button disabled={loading} className="bg-[#0095ff] p-2 text-2xl font-bold rounded-2xl mt-4" type="submit"
              title={loading ? 'Guardando...' : 'Enviar Mensaje'}>
            {loading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin h-4 w-4 mx-auto" />
            </span>
            ) : 'HAZLO YA'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type, name, value, onChange }) {
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
      />
    </div>
  );
}
