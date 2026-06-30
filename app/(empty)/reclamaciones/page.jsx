"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Swal from 'sweetalert2';

import url from '../../../api/url';
import { Loader2 } from 'lucide-react';

const URL_API = `${url}/api/reclamaciones`;

const ComplaintForm = () => {

  const [checkReclamo, setCheckReclamo] = useState(false);
  const [aceptaPolitica, setAceptaPolitica] = useState(false);

  function cambioReclamo(valor){
    setCheckReclamo(valor);
  }

  function cambioPolitica(valor){
    setAceptaPolitica(valor);
  }


  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    numeroDocumento: '',
    email: '',
    celular: '',
    direccion: '',
    distrito: '',
    ciudad: '',
    tipoReclamo: '',
    id_servicio: '',
    reclamoPerson: '',
    fechaIncidente: '',
    checkReclamoForm: false, 
    aceptaPoliticaPrivacidad: false 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    formData.aceptaPoliticaPrivacidad = aceptaPolitica;
    formData.checkReclamoForm = checkReclamo;
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${URL_API}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Mensaje Enviado Correctamente",
          text: "Nos pondremos en contacto contigo lo antes posible.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          nombre: '',
          apellido: '',
          documento: '',
          numeroDocumento: '',
          email: '',
          celular: '',
          direccion: '',
          distrito: '',
          ciudad: '',
          tipoReclamo: '',
          id_servicio: '',
          reclamoPerson: '',
          fechaIncidente: '',
          checkReclamoForm: false,
          aceptaPoliticaPrivacidad: false
        });
        setAceptaPolitica(false);
        setCheckReclamo(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo enviar la reclamación correctamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e033f] from-80%  to-[#410C89] relative p-4">
        <button
          onClick={() => window.location.href = '/'}
          className="lg:flex bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-lg transition-all duration-300 absolute left-10 top-1/2 transform -translate-y-1/2 hidden items-center"
        >
          <img className="mr-2" src={'/headerFooter/arrow_left.svg'} alt="Regresar" />
          REGRESAR
        </button>

        <div className="flex justify-center w-full">
          <img
            src="/headerFooter/logoFooter.webp"
            alt="Digimedia"
            className="w-40 h-auto my-6"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Libro de Reclamaciones</h1>
          <p className="text-sm text-gray-600 mb-2">
            Conforme está establecido en el Código de Protección y Defensa del Consumidor contamos con un Libro de Reclamaciones Virtual a tu disposición DigiMedia.com
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Debes de tener en cuenta que tus reclamos conforme a ley deben ser resueltos en un plazo no mayor a 30 días, pudiendo extenderse el plazo cuando la naturaleza del reclamo lo acredite. Art. 24.1 Ley 29571.
          </p>
          <p className="text-sm font-semibold mb-4">
            Razón Social: DIGIMEDIA MARKETING S.A.C. RUC: 20605116559
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center mb-6">Cuestionario de quejas</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="font-semibold">Datos Personales:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Apellido"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Tipo de Documento</option>
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                  <option value="CE">CE</option>
                  <option value="PTP">PTP</option>
                  <option value="OTROS">OTROS...</option>
                </select>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  placeholder="Número de Documento"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="Celular"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  placeholder="Distrito"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  placeholder="Ciudad"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Datos de incidente:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="tipoReclamo"
                  value={formData.tipoReclamo}
                  onChange={handleChange}
                  className="w-full ml-1 p-2 border rounded"
                  required
                >
                  <option value="">Tipo de reclamo</option>
                  <option value="QUEJA">QUEJA</option>
                  <option value="RECLAMO">RECLAMO</option>
                </select>
                <select
                  name="id_servicio"
                  value={formData.id_servicio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Servicio contratado</option>
                  <option value={1}>Diseño y Desarrollo Web</option>
                  <option value={2}>Gestión de Redes Sociales</option>
                  <option value={3}>Marketing y Gestión Digital</option>
                  <option value={4}>Branding y Diseño</option>
                </select>

                <div className="ml-1">
                  <label htmlFor="fechaIncidente" className="text-gray-500">Fecha Incidente</label>
                  <input value={formData.fechaIncidente}
                  onChange={handleChange} id="fechaIncidente" name="fechaIncidente" type="date" className="w-full p-2 border rounded"required/> 
                </div>
              </div>
              <textarea
                name="reclamoPerson"
                value={formData.reclamoPerson}
                onChange={handleChange}
                placeholder="Indicar incidente"
                className="w-full p-2 border rounded h-32 ml-1"
                required
              />
            </div>

            <div className="space-y-4 ">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="checkReclamoForm"
                  checked={checkReclamo}
                  onChange={valor => cambioReclamo(valor.target.checked)}
                  className="mt-1 mr-2"
                  required
                />
                <p className="text-sm">
                  Soy consciente que la formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI. *El proveedor deberá dar respuesta al reclamo en un plazo no mayor a treinta (30) días calendario, de acuerdo a la Ley 29571
                </p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="aceptaPoliticaPrivacidad"
                  checked={aceptaPolitica}
                  onChange={valor => cambioPolitica(valor.target.checked)}
                  className="mt-1 mr-2"
                  required
                />
                <p className="text-sm">
                  Acepto las Políticas de Privacidad.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3a0a7a] hover:bg-[#5c40d1]  p-2 rounded text-white transition-all duration-300"
              disabled={isSubmitting}
              title={isSubmitting ? 'Guardando...' : 'Enviar Reclamación'}
            >
              {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin h-4 w-4 mx-auto" />
              </span>
              ) : 'Enviar Reclamación'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;