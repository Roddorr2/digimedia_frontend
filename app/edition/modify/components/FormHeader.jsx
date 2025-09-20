"use client";
import {
  Type,
  AlignLeft,
  Quote,
  Image as IconImage,
  Loader2,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Asegúrate de importar Swal

export default function FormHeader({
  dataHeader,
  setFormData,
  setFile,
  onDeleteImage,
  setValidacionHeader,
  setIsDisabled,
}) {
  const [uploading, setUploading] = useState(false);

  const [isValid_titulo, setIsValid_titulo] = useState(true);
  const [isValid_texto_frase, setIsValid_texto_frase] = useState(true);
  const [isValid_texto_descripcion, setIsValid_texto_descripcion] =
    useState(true);
  const [isValid_alt, setIsValid_alt] = useState(true);
  const [isValid_title, setIsValid_title] = useState(true);
  const [isValid_meta_title, setIsValid_meta_title] = useState(true);
  const [isValid_meta_descripcion, setIsValid_meta_descripcion] =
    useState(true);

  const [previewImageUrl, setPreviewImageUrl] = useState(
    dataHeader.public_image || "/blog/fondo_blog_extend.webp"
  ); // Nuevo estado para la previsualización

  useEffect(() => {
    // Actualizar la previsualización cuando dataHeader.public_image cambie (ej. al cargar datos iniciales o después de guardar)
    setPreviewImageUrl(
      dataHeader.public_image || "/blog/fondo_blog_extend.webp"
    );
  }, [dataHeader.public_image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case "titulo":
        isValid =
          value.trim() !== "" && value.length <= 30 && value.length >= 10;
        setIsValid_titulo(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "texto_frase":
        isValid =
          value.trim() !== "" && value.length <= 50 && value.length >= 10;
        setIsValid_texto_frase(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "texto_descripcion":
        isValid =
          value.trim() !== "" && value.length <= 80 && value.length >= 10;
        setIsValid_texto_descripcion(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "alt":
        isValid =
          value.trim() !== "" && value.length <= 100 && value.length >= 5;
        setIsValid_alt(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "title":
        isValid =
          value.trim() !== "" && value.length <= 100 && value.length >= 5;
        setIsValid_title(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "meta_title":
        isValid =
          value.trim() !== "" && value.length <= 100 && value.length >= 5;
        setIsValid_meta_title(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "meta_descripcion":
        isValid =
          value.trim() !== "" && value.length <= 100 && value.length >= 5;
        setIsValid_meta_descripcion(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      default:
        break;
    }

    if (isValid_titulo && isValid_texto_frase && isValid_texto_descripcion && isValid_alt && isValid_title && isValid_meta_title && isValid_meta_descripcion) {
      setValidacionHeader(true);
    } else {
      setValidacionHeader(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // Mensajes de validación pero no se usa
  const ValidationMessage = ({ error }) => (
    <h1
      className={`text-xs mt-1 ml-3 ${
        error.isValid === null
          ? "text-gray-500"
          : error.isValid
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {error.message}
    </h1>
  );

  const [errors, setErrors] = useState({
    titulo: { message: "Máximo 30 caracteres", isValid: null },
    texto_frase: { message: "Máximo 50 caracteres", isValid: null },
    texto_descripcion: { message: "Máximo 80 caracteres", isValid: null },
  });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);

      const tempUrl = URL.createObjectURL(file);
      setPreviewImageUrl(tempUrl); // Usar el nuevo estado para la previsualización
      setFile(file); // Esto es correcto, el archivo real se pasa al padre
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
  };

  useEffect(() => {
    const allValid = Object.values(errors).every(
      (error) => error.isValid === true
    );
    setIsDisabled && setIsDisabled(!allValid);
  }, [errors]);

  if (!dataHeader) {
    return (
      <div className="w-full h-screen md:h-[80vh] flex items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-500">Cargando...</h1>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[120vh] md:h-[93vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
      id="file-name"
      style={{
        backgroundImage: `url(${previewImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-full text-white flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Vista previa izquierda */}
        <div className="text-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">
            {dataHeader.titulo || "Título del Blog"}
          </h1>
          <h2 className="text-2xl md:text-xl font-bold mb-4">
            {dataHeader.texto_frase || "Frase destacada"}
          </h2>
          <p className="text-lg text-gray-300 font-light">
            {dataHeader.texto_descripcion || "Descripción del blog"}
          </p>
        </div>

        {/* Panel de edición scrolleable */}
        <div className="w-full flex justify-end">
          <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-[450px] max-w-lg overflow-auto max-h-[80vh]">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Encabezado
              </h3>

              {/* Título */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={dataHeader.titulo || ""}
                  onChange={handleChange}
                  maxLength={30}
                  minLength={5}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3"
                  placeholder="Título principal"
                  required
                />
              </div>

              {/* Frase destacada */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" /> Frase
                  Destacada
                </label>
                <input
                  type="text"
                  name="texto_frase"
                  value={dataHeader.texto_frase || ""}
                  onChange={handleChange}
                  maxLength={50}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3"
                  placeholder="Frase destacada"
                  required
                />
              </div>

              {/* Frase secundaria */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Frase
                  Secundaria
                </label>
                <input
                  name="texto_descripcion"
                  value={dataHeader.texto_descripcion || ""}
                  onChange={handleChange}
                  maxLength={80}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3"
                  placeholder="Frase Secundaria"
                  required
                />
              </div>

              {/* Imagen principal */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <IconImage className="w-5 h-5 mr-2 text-purple-400" /> Imagen
                  Principal
                  <span className="ml-3 text-xs text-gray-400">
                    1080x520 píxeles
                  </span>
                </label>
                <div className="relative flex flex-row">
                  <label
                    className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${
                      uploading
                        ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                        : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                    }`}
                  >
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                    ) : (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">Seleccionar imagen</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      onChange={handleImage}
                      disabled={uploading}
                    />
                  </label>
                  <div className="flex justify-center mt-2">
                    <button
                      type="button"
                      onClick={onDeleteImage}
                      title="Eliminar imagen"
                      className="p-2 rounded-full hover:bg-red-100"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Campos adicionales SEO */}
              <div className="mt-4 space-y-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">
                  Información SEO de la Imagen
                </h4>
                <div>
                  <label className="text-white text-sm font-medium mb-2">
                    Texto Alternativo (Alt)
                  </label>
                  <input
                    type="text"
                    name="alt"
                    value={dataHeader.alt || ""}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="off"
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3"
                    placeholder="Descripción de la imagen para accesibilidad"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2">
                    Título de la Imagen
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={dataHeader.title || ""}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="off"
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3"
                    placeholder="Título que aparece al pasar el mouse"
                  />
                </div>
              </div>
              <div className="space-y-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <h4 className="text-sm font-semibold text-green-300 mb-2">
                  Información SEO
                </h4>
                <div>
                  <label className="text-white text-sm font-medium mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={dataHeader.meta_title || ""}
                    onChange={handleChange}
                    maxLength={60}
                    autoComplete="off"
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3"
                    placeholder="Título SEO (máx 60 caracteres)"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="meta_descripcion"
                    value={dataHeader.meta_descripcion || ""}
                    onChange={handleChange}
                    maxLength={160}
                    autoComplete="off"
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 resize-none"
                    placeholder="Descripción SEO (máx 160 caracteres)"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
