"use client";
import { Type, AlignLeft, Quote, Image, Trash2, Clock1, Clock } from "lucide-react";
import { Loader2, CheckCircle, ArrowRight, Image as IconImage } from "lucide-react"

import { useState } from "react";
import BotonAñadirLink from "./BotonAñadirLink";


export default function FormBody1(props) {

  const {
    formCommendBody,
    setFormCommendBody,
    formInfoBody,
    setFormInfoBody,
    formEncabezadoBody,
    setFormEncabezadoBody,
    formGaleryBody,
    setFormGaleryBody,
    setFileBodyHeader,
    setFileBodyFile1,
    setFileBodyFile2,
    setValidacionBody,
    serviceRedirectUrl,
    setServiceRedirectUrl,
    
  } = props;

  const [isValidTituloPrincipal, setIsValidTituloPrincipal] = useState(true);
  const [isValidDescripcion, setIsValidDescripcion] = useState(true);
  const [isValidTexto1, setIsValidTexto1] = useState(true);
  const [isValidTexto2, setIsValidTexto2] = useState(true);
  const [isValidTexto3, setIsValidTexto3] = useState(true);

  const [isValidInfoTitulo1, setIsValidInfoTitulo1] = useState(true);
  const [isValidInfoDescripcion1, setIsValidInfoDescripcion1] = useState(true);

  const [isValidInfoTitulo2, setIsValidInfoTitulo2] = useState(true);
  const [isValidInfoDescripcion2, setIsValidInfoDescripcion2] = useState(true);

  const [isValidInfoTitulo3, setIsValidInfoTitulo3] = useState(true);
  const [isValidInfoDescripcion3, setIsValidInfoDescripcion3] = useState(true);

  const [isValidInfoTitulo4, setIsValidInfoTitulo4] = useState(true);
  const [isValidInfoDescripcion4, setIsValidInfoDescripcion4] = useState(true);

  const [errors, setErrors] = useState({
    titulo: { message: 'Debe tener entre 10 y 50 caracteres', isValid: null },
    texto1: { message: 'Debe tener entre 10 y 150 caracteres', isValid: null },
    texto2: { message: 'Debe tener entre 10 y 150 caracteres', isValid: null },
    texto3: { message: 'Debe tener entre 10 y 150 caracteres', isValid: null },
    descripcion: { message: 'Debe tener entre 10 y 400 caracteres', isValid: null },
  });

  const [uploading, setUploading] = useState(false);

  const servicios = [
    { label: "Diseño y Desarrollo Web", url: "/servicios/desing-desarrollo/" },
    { label: "Gestión de Redes Sociales", url: "/servicios/gestion-redes/" },
    { label: "Marketing de Gestión Digital", url: "/servicios/marketing-gestion/" },
    { label: "Branding y Diseño", url: "/servicios/branding-desing/" },
  ];


function renderDescripcion(texto, palabraClave, enlace) {
  if (!palabraClave || !enlace) {
    return texto;
  }
  return texto.split(" ").map((palabra, i) => {
    const cleanPalabra = palabra.replace(/[.,;!?]/g, ""); 
    const isMatch = cleanPalabra.toLowerCase() === palabraClave.toLowerCase();

    return isMatch ? (
      <a key={i} href={enlace} className="text-blue-400 font-bold underline hover:text-blue-200">
        {palabraClave}
      </a>
    ) : (
      <span key={i}>{" "+palabra + " "}</span>
    );
  });
}



   // Manejar cambio del select
  const handleServiceChange = (e) => {
    const url = e.target.value;
    setServiceRedirectUrl(url);

  };

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case 'titulo':
        isValid = value.trim().length >= 10 && value.length <= 50;
        setIsValidTituloPrincipal(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'descripcion':
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidDescripcion(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'texto1':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto1(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'texto2':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto2(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'texto3':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto3(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      default:
        break;
    }

    if (isValidTituloPrincipal && isValidDescripcion && isValidTexto1 && isValidTexto2 && isValidTexto3
      && isValidInfoTitulo1 && isValidInfoDescripcion1 && isValidInfoTitulo2 && isValidInfoDescripcion2 && isValidInfoTitulo3 && isValidInfoDescripcion3 && isValidInfoTitulo4 && isValidInfoDescripcion4
    ) {
      setValidacionBody(true)
    }else{
      setValidacionBody(false)
    }

    setter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ValidationMessage = ({ error }) => (
    <p className={`text-xs mt-1 ml-3 ${error.isValid === null ? 'text-gray-400' :
      error.isValid ? 'text-green-400' : 'text-red-500'}`}>
      {error.message}
    </p>
  );


  const [errorsInfoBody, setErrorsInfoBody] = useState(
    formInfoBody.map(() => ({
      titulo: { message: 'Debe tener entre 10 y 50 caracteres', isValid: null },
      descripcion: { message: 'Debe tener entre 10 y 400 caracteres', isValid: null },
    }))
  );

  const handleChangeMap = (e, index, field) => {
    const { value } = e.target;
    const name = field; 
    let isValid = true;

    switch (name) {
      case 'titulo':
        isValid = value.trim().length >= 10 && value.length <= 50;

        if (index === 0) {
          setIsValidInfoTitulo1(isValid);
        } else if (index === 1) {
          setIsValidInfoTitulo2(isValid);
        } else if (index === 2) {
          setIsValidInfoTitulo3(isValid);
        } else if (index === 3) {
          setIsValidInfoTitulo4(isValid);
        }

        break;
      case 'descripcion':
        isValid = value.trim().length >= 10 && value.length <= 400;

        if (index === 0) {
          setIsValidInfoDescripcion1(isValid);
        } else if (index === 1) {
          setIsValidInfoDescripcion2(isValid);
        } else if (index === 2) {
          setIsValidInfoDescripcion3(isValid);
        } else if (index === 3) {
          setIsValidInfoDescripcion4(isValid);
        }

        break;
      default:
        break;
    }

    if (isValidTituloPrincipal && isValidDescripcion && isValidTexto1 && isValidTexto2 && isValidTexto3
      && isValidInfoTitulo1 && isValidInfoDescripcion1 && isValidInfoTitulo2 && isValidInfoDescripcion2 && isValidInfoTitulo3 && isValidInfoDescripcion3 && isValidInfoTitulo4 && isValidInfoDescripcion4) {
      setValidacionBody(true)
    }else{
      setValidacionBody(false)
    }

    setFormInfoBody(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    setErrorsInfoBody(prev => {
      const updatedErrors = [...prev];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [field]: {
          ...updatedErrors[index][field],
          isValid: isValid
        }
      };
      return updatedErrors;
    });
  };


  const handleImageHeader = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);

      const tempUrl = URL.createObjectURL(file);
      setFormEncabezadoBody((prev) => ({
        ...prev,
        ["public_image1"]: tempUrl,
      }));

      setFileBodyHeader(file);

    } catch (error) {
      console.error("Error al subir imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al subir la imagen",
        confirmButtonColor: "#8c52ff",
      });
    } finally {
      setUploading(false);
    }
  }

  const handleImageBody = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (!file) return;
    try {
      setUploading(true);

      const tempUrl = URL.createObjectURL(file);
      setFormGaleryBody((prev) => ({
        ...prev,
        [name]: tempUrl,
      }));

      if (name === "public_image2") {
        setFileBodyFile1(file);
      } else if (name === "public_image3") {
        setFileBodyFile2(file);
      }

    } catch (error) {
      console.error("Error al subir imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al subir la imagen",
        confirmButtonColor: "#8c52ff",
      });
    } finally {
      setUploading(false);
    }
  }


  return (
    <div className="relative p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden flex flex-row my-5 justify-center">
      <div className="w-[700px]">
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute bg-black/70"></div>
          <img
            src={formEncabezadoBody.public_image1}
            alt={formEncabezadoBody.titulo || "Imagen principal"}
            className="absolute w-full h-full object-cover"
          />
          <div className="relative h-full flex flex-col justify-end p-8 bg-black/70 backdrop-blur-sm">
            <p className="text-gray-400 mb-2 font-bold">{formEncabezadoBody.fecha}</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{formEncabezadoBody.titulo}</h2>
          </div>
        </div>

        <div className="bg-black/5 p-8">
          <div className="relative mb-16 bg-white p-6 rounded-lg shadow-md -mt-12">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
            <p className="text-lg leading-relaxed text-gray-700">{formEncabezadoBody.descripcion}</p>

          </div>

          <div className="mb-[100px]  p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="h-0.5 w-12 bg-green-400 mr-4"></div>
              <h3 className="text-2xl font-bold text-green-400">{formCommendBody.titulo || "Consejos"}</h3>
              <div className="h-0.5 w-12 bg-green-400 ml-4"></div>
            </div>

            <ul className="list-none text-black-600 space-y-3 max-w-2xl mx-auto">
              {formCommendBody &&
                [
                  formCommendBody.texto1,
                  formCommendBody.texto2,
                  formCommendBody.texto3,
                ]
                  .filter((text) => text)
                  .map((text, index) => (
                    <li key={`commend-${index}`} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-left">{text}</span>
                    </li>
                  ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[formGaleryBody.public_image2 || "/blog/blog-10.jpg", formGaleryBody.public_image3 || "/blog/blog-1.jpg"].map((src, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={src}
                  alt={`Imagen ${index + 1} del artículo`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium">Ver detalle</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Información Importante
              </div>
            </div>

            <div className="grid grid-cols-1 gap-28 pt-8">
              {formInfoBody.map((section, index) => {
                const styles = [
                  "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-blue-400",
                  "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-red-400",
                  "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-green-400",
                  "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-purple-400",
                ];

                return (
                  <div
                    key={`tarjeta-${index}`}
                    className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${styles[index % styles.length]}`}
                  >
                    <h3 className="text-xl font-bold mb-3 text-blue-400">{section.titulo}</h3>
                     <p className="text-gray-100">
        {renderDescripcion(section.descripcion, section.palabra, section.enlace)}
      </p>
                    {/* <p className="text-gray-100">{section.descripcion}</p> */}
                 
                  </div>
                );
              })}
            </div>
          </div>



      <div className="display flex justify-center items-center my-8">
          {serviceRedirectUrl && (
            <a
              href={serviceRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800 hover:shadow-xl"
            >
              Conoce nuestro servicio
            </a>
          )}
     </div>
          
        </div>
      </div>

      <div className="w-[420px] flex flex-col justify-center gap-5 p-5">
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                <ValidationMessage error={errors.titulo} />
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={50}
                value={formEncabezadoBody.titulo}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
              />
            </div>
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Clock1 className="w-4 h-4 mr-1.5 text-blue-400" /> Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formEncabezadoBody.fecha}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative flex flex-column justify-center">
              <label
                className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                  ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                  : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                  }`}
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                ) : (
                  <>
                    {formEncabezadoBody.public_image1 !== "/blog/blog-4.jpg" ? (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">Cambiar imagen</span>
                      </>
                    ) : (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">Seleccionar imagen</span>
                      </>
                    )}
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  onChange={handleImageHeader}
                  disabled={uploading}
                />
              </label>
              <button
                type="button"
                onClick={props.onDeleteBodyHeaderImage}    //  Aca se puede Eliminar 
                className=" flex ml-2 p-2 rounded-full hover:bg-red-100"
                title="Eliminar imagen principal"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Descripcion
                <ValidationMessage error={errors.descripcion} />
              </label>
              <input
                name="descripcion"
                value={formEncabezadoBody.descripcion}
                maxLength={400}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Frase Secundaria"
              />
            </div>
          </form>
        </div>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                <ValidationMessage error={errors.titulo} />
              </label>
              <input
                type="text"
                name="titulo"
                value={formCommendBody.titulo}
                maxLength={50}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto1
                <ValidationMessage error={errors.texto1} />
              </label>
              <input
                type="text"
                name="texto1"
                maxLength={150}
                value={formCommendBody.texto1}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto1"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto2
                <ValidationMessage error={errors.texto2} />
              </label>
              <input
                type="text"
                name="texto2"
                maxLength={150}
                value={formCommendBody.texto2}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto2"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto3
                <ValidationMessage error={errors.texto3} />
              </label>
              <input
                type="text"
                name="texto3"
                maxLength={150}
                value={formCommendBody.texto3}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto3"
              />
            </div>
          </form>
        </div>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 2
                <h1 className="ml-3 mt-1 text-xs">250x310 píxeles</h1>
              </label>

              <div className="relative flex flex-column justify-center">
                <label
                  className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                    ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                    : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                    }`}
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                  ) : (
                    <>
                      {formGaleryBody.public_image2 !== "/blog/blog-2.jpg" ? (
                        <>
                          <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-sm">Cambiar imagen</span>
                        </>
                      ) : (
                        <>
                          <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-sm">Seleccionar imagen</span>
                        </>
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="public_image2"
                    className="hidden"
                    onChange={handleImageBody}
                    disabled={uploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={props.onDeleteBodyFile1}         //  Aca se puede Eliminar 
                  className="ml-2 p-2 rounded-full hover:bg-red-100"
                  title="Eliminar imagen galería 1"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 2
                <h1 className="ml-3 mt-1 text-xs">250x310 píxeles</h1>
              </label>

              <div className="relative flex flex-column justify-center">
                <label
                  className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                    ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                    : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                    }`}
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                  ) : (
                    <>
                      {formGaleryBody.public_image3 !== "/blog/blog-2.jpg" ? (
                        <>
                          <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-sm">Cambiar imagen</span>
                        </>
                      ) : (
                        <>
                          <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-sm">Seleccionar imagen</span>
                        </>
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="public_image3"
                    className="hidden"
                    onChange={handleImageBody}
                    disabled={uploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={props.onDeleteBodyFile2}         //  Aca se puede Eliminar 
                  className="ml-2 p-2 rounded-full hover:bg-red-100"
                  title="Eliminar imagen galería 2"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            {
              formInfoBody.map((item, index) => (
                <div key={index}>
                  <div className="pb-4">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                      <ValidationMessage error={errorsInfoBody[index]?.titulo || { isValid: null, message: '' }} />
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      value={item.titulo}
                      maxLength={50}
                      onChange={(e) => handleChangeMap(e, index, 'titulo')}
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Título principal"
                      required
                    />
                  </div>
                  <div>
                    <div>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Quote className="w-5 h-5 mr-2 text-purple-400" /> Descripción
                      <ValidationMessage error={errorsInfoBody[index]?.descripcion || { isValid: null, message: '' }} />
                    </label>
                    <textarea
                      name="descripcion"
                      value={item.descripcion}
                      maxLength={400}
                      onChange={(e) => handleChangeMap(e, index, 'descripcion')}
                      className="w-full resize-none h-[100px] bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                      placeholder="Descripción"
                    /> 
                    <div className="w-full flex justify-end">
                    <BotonAñadirLink texto={item.descripcion} item={item.palabra} index={index} servicios={servicios} handleChange={handleChangeMap}/>

                    </div>
                    </div>

                  </div>
                </div>
              ))
            }
          </form>
        </div>

 {/* NUEVO SELECT para elegir servicio */}
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

          <label className="block mb-2 font-semibold text-white">Selecciona servicio para el botón</label>
          <select
            className="w-full p-3 rounded text-white bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={serviceRedirectUrl}
            onChange={handleServiceChange}
          >
            <option value="">-- Ninguno --</option>
            {servicios.map((serv) => (
              <option key={serv.url} value={serv.url}>
                {serv.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>

  );
}
