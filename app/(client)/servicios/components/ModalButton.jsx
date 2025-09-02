'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
import url from '../../../../api/url';
import { Loader2 } from 'lucide-react';
import styles from './modal.module.css'

const URL_API = `${url}/api/modales`
const URL_WHASAPP=`${process.env.NEXT_PUBLIC_API_URL_WHATSAPP}/api/send-message`;

export default function ModalClick({ text, fondo, title, serviceName }) {
  const modalRef = useRef(null);
  const backgroundRef = useRef(null);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    backgroundRef.current.classList.remove('hidden');
    backgroundRef.current.classList.add('fade-in');
    modalRef.current.classList.add('modal-content');
  };

  const hideModal = () => {
    backgroundRef.current.classList.add('fade-out-bg');
    modalRef.current.classList.add('fade-out-modal');

    setTimeout(() => {
      backgroundRef.current.classList.add('hidden');
      backgroundRef.current.classList.remove('fade-in', 'fade-out-bg');
      modalRef.current.classList.remove('modal-content', 'fade-out-modal');
    }, 500);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id === 'modal-button') {
        showModal();
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, telefono, correo, id_servicio: serviceName };

      const rawPhone = data.telefono;
      const phoneWithPrefix = `51${rawPhone}`;
      const fecha = new Date();
      const fechaActual = fecha.toISOString().split("T")[0];
      const horaActual = fecha.toTimeString().slice(0, 5);

    setLoading(true);
    try{
      const response = await axios.post(`${URL_API}`, data, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      await axios.post(URL_WHASAPP, {

      telefono: phoneWithPrefix,
      nombre:data.nombre,
      fecha: fechaActual,
      hora: horaActual,
      templateOption: 'cita_gratis'

    });

      hideModal();
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
      setEmail("");
      setNombre("");
      setTelefono("");
    }
  };

  return (
    <div
      ref={backgroundRef}
      onClick={hideModal}
      className={`${styles.seccionA} bg-[rgba(0,0,0,0.5)] w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-[9999] hidden`}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-black flex relative text-white rounded-2xl overflow-hidden bg-gradient-to-bl from-[#B721FF] to-[#21D4FD] p-8 gap-8"
      >
        <button onClick={hideModal} className="absolute top-4 right-4">
          X
        </button>
        <div>
          <p className="font-bold text-2xl text-center mb-4 max-w-sm">
            {title}
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Nombre"
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              label="Teléfono"
              type="text"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <Input
              label="Correo"
              type="email"
              name="correo"
              value={correo}  
              onChange={(e) => setEmail(e.target.value)}
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
        <div className="flex-col justify-center items-center gap-8 hidden md:flex">
          <img className="max-w-60 max-h-52 w-auto" src={fondo} alt="" />
          <p className="font-medium max-w-48 text-center">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type, name, value, onChange }) {
  return (
    <div className="flex gap-2 justify-between items-center">
      <label className="font-semibold shrink-0 basis-20" htmlFor={name}>
        {label}
      </label>
      <input
        className="p-1 rounded-md grow text-black"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
