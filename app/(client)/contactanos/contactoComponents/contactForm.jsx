'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
import url from '../../../../api/url';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Importar dinámicamente el PhoneInput para evitar problemas de SSR
const PhoneInput = dynamic(
  () => import('react-international-phone').then((mod) => mod.PhoneInput),
  { ssr: false }
);

import 'react-international-phone/style.css';
const URL_API = `${url}/api/contactanos`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [phone, setPhone] = useState('');
  const [dialCode, setDialCode] = useState('51');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
      Swal.fire({
        title: 'Número inválido',
        text: 'El número de teléfono debe tener al menos 9 dígitos.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      setLoading(false);
      return;
    }
    if (cleanPhone.length > 15) {
      Swal.fire({
        title: 'Número inválido',
        text: 'El número ingresado es demasiado largo. Verifica que sea un número real.',
        icon: 'warning',
        confirmButtonText: 'OK',
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
            Authorization: `Bearer ${getCookie('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: 'Mensaje Enviado Correctamente',
          text: 'Nos pondremos en contacto contigo lo antes posible.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        //console.log('Respuesta del servidor:', response.data);
        //console.log('Datos enviados:',formData, 'Número de teléfono:', phone);

        setFormData({
          nombre: '',
          email: '',
          mensaje: '',
        });
        setPhone('');
        setDialCode('51');
      }
    } catch (error) {
      console.error('Error detallado:', error.response);
      
      if (error.response?.status === 400 || error.response?.status === 422) {
        Swal.fire({
          title: 'Número inválido',
          text: 'El número ingresado no existe o no es válido. Verifica que sea un número real.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      } else if (error.response?.status === 500) {
        Swal.fire({
          title: 'Error del servidor',
          text: 'Hubo un problema interno. Por favor, intenta más tarde.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el mensaje. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'OK',
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
            className="w-full md:w-[739px] z-20 relative"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-full bg-white rounded-[20px] border-[3px] border-[#b326ff] p-6 md:p-12 shadow-custom">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {['nombre', 'email'].map((field, index) => (
                  <motion.input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
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
                value={phone}
                onChange={(phoneVal, meta) => {
                  setPhone(phoneVal);
                  if (meta?.country?.dialCode) setDialCode(meta.country.dialCode);
                }}
                forceDialCode={true}
                inputClassName="!w-full !h-[54px] !border-[3px] !border-[#b326ff] !rounded-[18px] !px-6 !text-lg !ml-2"
                countrySelectorStyleProps={{
                  buttonClassName: "!border-[3px] !border-transparent !rounded-[18px] !h-[54px] !mr-2 focus:!outline-none focus:!ring-0 focus:!border-transparent",
                  dropdownStyleProps: {
                    className: "!rounded-lg"
                  }
                }}
                containerClassName="!gap-2"
              />
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
                    className="w-[215px] h-[54px] bg-[#ffa000] text-white font-black text-xl rounded-[20px] shadow-custom hover:brightness-95 transition-all mt-4 flex items-center justify-center"
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

          <motion.div
            className="w-full md:absolute md:left-[500px] md:top-[30px] flex justify-center md:block z-0 pointer-events-none"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-[300px] h-[400px] md:w-[950px] md:h-[1181px]">
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