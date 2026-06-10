'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
import url from '../../../../api/url';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const URL_API = `${url}/api/contactanos`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    numero: '',
    mensaje: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(URL_API, formData, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          title: 'Mensaje Enviado Correctamente',
          text: 'Nos pondremos en contacto contigo lo antes posible.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setFormData({
          nombre: '',
          email: '',
          numero: '',
          mensaje: '',
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-12 md:py-24">
      <div className="w-full max-w-[1280px] px-6 relative">
        <div className="flex flex-col md:flex-row gap-12 items-start relative">
          {/* LEFT COLUMN - FORM */}
          {/* cambios realizados para ajuste de imagen*/}
          <motion.div
            className="w-full md:w-[620px] z-20 relative"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-full bg-white rounded-[20px] border-[3px] border-[#b326ff] p-6 md:p-12 shadow-custom">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  <motion.input
    type="text"
    name="nombre"
    placeholder="Nombre"
    value={formData.nombre}
    onChange={handleChange}
    required
    className="w-full h-[54px] border-[3px] border-[#b326ff] rounded-[18px] px-6 text-lg"
  />

  <motion.input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full h-[54px] border-[3px] border-[#b326ff] rounded-[18px] px-6 text-lg"
  />
</div>

<motion.input
  type="text"
  name="numero"
  placeholder="Teléfono"
  value={formData.numero}
  onChange={handleChange}
  required
  className="w-full h-[54px] border-[3px] border-[#b326ff] rounded-[18px] px-6 text-lg"
/>

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
                      'Enviar mensaje'
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT COLUMN IMAGE */}
          {/* cambios realizados para ajuste de la imagen */}
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
