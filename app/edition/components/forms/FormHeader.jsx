"use client";
import {
  Type,
  AlignLeft,
  Quote,
  Image as IconImage,
  Loader2,
  Trash2,
  Search,
  FileText,
  Link2,
  Palette,
  ChevronDown,
  ChevronUp,

} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { validateImageFile, getImageRecommendationText, ACCEPTED_IMAGE_FORMATS } from "../../utils/imageValidation";

// Configuración centralizada
import {
  getPlantillaConfig,
  DEFAULT_HEADER_VALIDATION_CONFIG,
} from "../../config/index";
import { DEFAULT_IMAGES } from "../../constants/defaults";
// Configuración por defecto de estilos
const DEFAULT_STYLES = {
  //se cambió de h-[120vh] a min-h-[120vh] para evitar que el título se desborde y se superponga
  //con los tabs de navegacion
  //se aggrego break-words para titulos extensos
  container:
   "w-full min-h-[120vh] md:min-h-[93vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat py-12",
  overlay: "absolute inset-0 bg-black/60",
  content:
    "relative w-full text-white flex flex-col md:flex-row items-center justify-between gap-6",
  preview: "text-center max-w-xl",
  title: "text-5xl md:text-6xl font-extrabold mb-4 neon-textov4 break-words",
  subtitle: "text-2xl md:text-xl font-bold mb-4",
  description: "text-lg text-gray-300 font-light",
  panel:
    "bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-[450px] max-w-lg overflow-auto max-h-[80vh]",
  form: "space-y-6",
  input:
    "w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
  label: "flex items-center text-white text-sm font-medium mb-2",
  icon: "w-5 h-5 mr-2 text-purple-400",
  seoSection:
    "space-y-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30",
  imageSection:
    "mt-4 space-y-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30",
};

// Placeholders por defecto
const DEFAULT_PLACEHOLDERS = {
  titulo: "Título del Blog",
  texto_frase: "Frase destacada",
  texto_descripcion: "Descripción del blog",
  titulo_enlace: "Texto para generar el enlace del blog (opcional)",
alt: "Texto alternativo (mín 10 caracteres)",
   title: "Título de la imagen (mín 10 caracteres)",
  meta_title: "Título SEO (mín 10 caracteres, máx 120)",
  meta_descripcion: "Descripción SEO (mín 10 caracteres, máx 255)",
};

function renderDescripcion(texto, palabra, enlace) {
  if (!texto || !palabra || !enlace) return texto;

  const palabraEscapada = palabra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${palabraEscapada})`, "gi");

  return texto.split(regex).map((parte, index) =>
    parte.toLowerCase() === palabra.toLowerCase() ? (
      <a
        key={index}
        href={enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline"
      >
        {parte}
      </a>
    ) : (
      <span key={index}>{parte}</span>
    )
  );
}

export default function FormHeader({
  // Props de datos
  data = {},
  defaultImage = DEFAULT_IMAGES.header.image1,

  // Props de configuración
  plantillaId,
  validationConfig = DEFAULT_HEADER_VALIDATION_CONFIG,
  styles = DEFAULT_STYLES,
  placeholders = DEFAULT_PLACEHOLDERS,
  mode = "create", // "create" | "edit"

  // Props de callbacks
  onChange,
  onLinkChange,
  onImageChange,
  onImageDelete,
  onValidationChange,

  // Props de estado
  isUploading = false,
  showValidationMessages = false,

  // Props adicionales
  className = "",
  imageRecommendedSize = getImageRecommendationText("header"),
}) {
  // Estados internos
  const [uploading, setUploading] = useState(isUploading);
  const [fieldValidations, setFieldValidations] = useState({});
  //modificacion para imagen preview
  const [previewImageUrl, setPreviewImageUrl] = useState(defaultImage);

  // Combinar estilos
  const mergedStyles = { ...DEFAULT_STYLES, ...styles };
  const mergedPlaceholders = { ...DEFAULT_PLACEHOLDERS, ...placeholders };

  // Función de validación
  const validateField = useCallback(
    (fieldName, value) => {
      const config = validationConfig[fieldName];
      if (!config) return { isValid: true, message: "" };

      const trimmedValue = value?.toString().trim() || "";

      // Si el campo NO es requerido y está vacío, es válido
      if (!config.required && !trimmedValue) {
        return { isValid: true, message: "Opcional" };
      }

      // Si el campo es requerido y está vacío, es inválido
      if (config.required && !trimmedValue) {
        return { isValid: false, message: "Este campo es requerido" };
      }

      // Si tiene contenido, validar min/max
      if (config.min && trimmedValue.length < config.min) {
        return { isValid: false, message: `Mínimo ${config.min} caracteres` };
      }

      if (config.max && trimmedValue.length > config.max) {
        return { isValid: false, message: `Máximo ${config.max} caracteres` };
      }

      return {
        isValid: true,
        message: `${trimmedValue.length}/${config.max} caracteres`,
      };
    },
    [validationConfig]
  );

  // Manejar cambios en los campos
  const handleFieldChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const validation = validateField(name, value);

      setFieldValidations((prev) => ({
        ...prev,
        [name]: validation,
      }));

      // Notificar al componente padre
      onChange?.({ name, value, validation });
    },
    [validateField, onChange]
  );

  // Manejar carga de imagen
  const handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        setUploading(true);
        
        // Validar y convertir a WebP automáticamente si es necesario
        const validation = await validateImageFile(file, "header");
        if (!validation.valid) {
          Swal.fire({
            icon: "error",
            title: "Imagen inválida",
            html: validation.errors.map(err => `<p style="margin-bottom: 5px;">• ${err}</p>`).join(""),
            confirmButtonColor: "#8c52ff",
          });
          e.target.value = ""; // Reset file input
          return;
        }

        // Usar el archivo procesado (ya convertido a WebP si era PNG/JPG)
        const processedFile = validation.file;
        const tempUrl = URL.createObjectURL(processedFile);
        setPreviewImageUrl(tempUrl);

        // Notificar al componente padre con el archivo convertido
        onImageChange?.({ file: processedFile, tempUrl });
      } catch (error) {
        // El manejo de errores lo deja al componente padre
        onImageChange?.({ error });
      } finally {
        setUploading(false);
      }
    },
    [onImageChange]
  );

  // Manejar eliminación de imagen
  const handleImageDelete = useCallback(() => {
    // Limpiar blob URL si existe para evitar memory leaks
    if (previewImageUrl && previewImageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewImageUrl);
    }
    setPreviewImageUrl(defaultImage);
    onImageDelete?.();
  }, [defaultImage, onImageDelete, previewImageUrl]);

  // Sincronizar imagen cuando cambie data.public_image 
  const currentImagePath = data?.url_image ||                 
    data?.imagen?.path ||              
    data?.blog_head?.url_image ||      
    data?.blogHead?.url_image ||       
    data?.public_image;
 // Sincronizar imagen cuando cambie la data desde Laravel (Modo Edición)
  useEffect(() => {
  // Detectar si viene vacío o es explícitamente la imagen por defecto del sistema
  const esImagenPorDefecto = 
    !currentImagePath || 
    currentImagePath.includes("fondo_blog_extend");

  if (esImagenPorDefecto) {
    
    setPreviewImageUrl(defaultImage);
    return;
  }

  // Si es un Blob temporal de una imagen recién subida por el usuario
  if (currentImagePath.startsWith("blob:") || currentImagePath.startsWith("http")) {
    
    setPreviewImageUrl(currentImagePath);
    return;
  }

  //Si la ruta de la BD ya incluye "/storage/" al inicio, solo le pegamos el dominio del backend
  if (currentImagePath.startsWith("/storage/") || currentImagePath.includes("storage/")) {
    // Limpiamos barras duplicadas por si acaso (ej: de //storage a /storage)
    const rutaLimpia = currentImagePath.startsWith("/") ? currentImagePath : `/${currentImagePath}`;
    const completa = `${process.env.NEXT_PUBLIC_API_URL_DEV}${rutaLimpia}`;
    
    setPreviewImageUrl(completa);
  } else {
    //Si la BD guardara solo "images/templates...", aquí sí le metemos el /storage/ de fallback
    const completa = `${process.env.NEXT_PUBLIC_API_URL_DEV}/storage/${currentImagePath}`;
    
    setPreviewImageUrl(completa);
  }
}, [currentImagePath, defaultImage]);

  // Limpiar blob URLs al desmontar el componente para evitar memory leaks
  //comentado porque generaba la eliminacion de la img guardada para preview
  //useEffect(() => {
    //return () => {
      //if (previewImageUrl && previewImageUrl.startsWith("blob:")) {
        //URL.revokeObjectURL(previewImageUrl);
     // }
    //};
  //}, [previewImageUrl]);

  // Validar datos iniciales (especialmente importante en modo edición)
  useEffect(() => {
    if (!data || !validationConfig) return;

    const initialValidations = {};
    const fieldsToValidate = [
      "titulo",
      "texto_frase",
      "texto_descripcion",
      "alt",
      "title",
      "titulo_enlace",
      "meta_title",
      "meta_descripcion",
    ];

    fieldsToValidate.forEach((fieldName) => {
      const value = data[fieldName] || "";
      const validation = validateField(fieldName, value);
      initialValidations[fieldName] = validation;
    });

    setFieldValidations(initialValidations);
  }, [data, validateField, validationConfig]);

  // Notificar validación general
  useEffect(() => {
    const allValidations = Object.values(fieldValidations);

    // En modo edición, considerar válido si no hay validaciones específicas pero hay datos
    if (mode === "edit" && allValidations.length === 0 && data.titulo) {
      onValidationChange?.(true);
      return;
    }

    const isFormValid =
      allValidations.length > 0 && allValidations.every((v) => v.isValid);
    onValidationChange?.(isFormValid);

    // Debug validación
  }, [fieldValidations, onValidationChange, mode, data.titulo]);

  // Componente de mensaje de validación
  const ValidationMessage = ({ fieldName }) => {
    if (!showValidationMessages) return null;

    const validation = fieldValidations[fieldName];
    if (!validation) return null;

    return (
      <span
        className={`text-xs ml-2 ${
          validation.isValid ? "text-green-500" : "text-red-500"
        }`}
      >
        {validation.message}
      </span>
    );
  };

  // 1. Campos SEO
  const seoFields = [
    {
      name: "meta_title",
      label: "Meta Title (SEO)",
      icon: Search,
      type: "input",
      placeholder: mergedPlaceholders.meta_title,
    },

    {
      name: "meta_descripcion",
      label: "Meta Description (SEO)",
      icon: FileText,
      type: "textarea",
      placeholder: mergedPlaceholders.meta_descripcion,
    },
  ];

  // 2. Campo de link personalizado
  const linkField = {
    name: "titulo_enlace",
    icon: Link2,
    label: "Título para Enlace del Blog",
    type: "input",
    placeholder: mergedPlaceholders.titulo_enlace,
    helpText:
      "Este texto se usará para generar el slug/enlace del blog. Si se deja vacío, se usará el Título Principal.",
  };
  const formFields = [
    {
      name: "titulo",
      icon: Type,
      label: "Título Principal",
      type: "input",
      placeholder: mergedPlaceholders.titulo,
    },
    {
      name: "texto_frase",
      icon: Quote,
      label: "Frase Destacada",
      type: "input",
      placeholder: mergedPlaceholders.texto_frase,
    },
    {
      name: "texto_descripcion",
      icon: AlignLeft,
      label: "Frase Secundaria",
      type: "textarea",
      placeholder: mergedPlaceholders.texto_descripcion,
    },
  ];

  const seoImageFields = [
    {
      name: "alt",
      label: "Texto Alternativo (Alt)",
      placeholder: mergedPlaceholders.alt,
    },
    {
      name: "title",
      label: "Título de la Imagen",
      placeholder: mergedPlaceholders.title,
    },
  ];

  // Opciones de colores predefinidos
  const colorOptions = [
    "#ffffff",
    "#5A37A6",
    "#1E40AF",
    "#059669",
    "#DC2626",
    "#7C3AED",
    "#F59E0B",
  ];

  // Valores por defecto del header
  const HEADER_DEFAULTS = {
    bg_color: "#5A37A6",
    titulo: "Título del Blog",
    texto_frase: "Frase destacada",
    texto_descripcion: "Descripción del blog",
  };

  return (
    <div
      className={`${mergedStyles.container} ${className}`}
      style={{
        backgroundImage: `url(${previewImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className={mergedStyles.overlay}></div>

      <div className={mergedStyles.content}>
        {/* Vista previa */}
        <div className={mergedStyles.preview}>
          <h1 className={mergedStyles.title}>
            {data.titulo || mergedPlaceholders.titulo}
          </h1>
          <h2 className={mergedStyles.subtitle}>
            {data.texto_frase || mergedPlaceholders.texto_frase}
          </h2>
          <p className={mergedStyles.description}>
            {renderDescripcion(
              data.texto_descripcion || mergedPlaceholders.texto_descripcion,
              data.palabra,
              data.enlace
            )}
          </p>
        </div>

        {/* Panel de edición */}
        <div className="w-full flex justify-end">
          <div className={mergedStyles.panel}>
            <form className={mergedStyles.form}>
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Encabezado
              </h3>

{/* 0. SELECTOR DE COLOR DE FONDO - Header */}
                <div className="mb-6 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Fondo del Header
                  </h4>



                  {/* Selector de tipo: sólido o gradiente */}
                  <div className="mb-3">
                    <select
                      value={data.bg_type || "solid"}
                      onChange={(e) => handleFieldChange({ target: { name: "bg_type", value: e.target.value } })}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-2"
                    >
                      <option value="solid">Color sólido</option>
                      <option value="gradient">Gradiente</option>
                    </select>
                  </div>

                  {/* Selector de color/es */}
                  <div className="flex gap-2 items-center flex-wrap">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleFieldChange({ target: { name: "bg_color", value: color } })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${data.bg_color === color ? "border-white scale-110" : "border-gray-600 hover:border-gray-400"}`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    <input
                      type="color"
                      value={data.bg_color || HEADER_DEFAULTS.bg_color}
                      onChange={(e) => handleFieldChange({ target: { name: "bg_color", value: e.target.value } })}
                      className="w-8 h-8 rounded-full border-2 border-gray-600 cursor-pointer"
                      title="Seleccionar color personalizado"
                    />

                    {/* Selector de colores para gradiente */}
                    {(data.bg_type === "gradient" || true) && (
                      <input
                        type="text"
                        placeholder="#color1,#color2,#color3"
                        value={data.bg_colors?.startsWith("to ") ? data.bg_colors.slice(data.bg_colors.indexOf(",") + 1) : (data.bg_colors || "")}
                        onChange={(e) => {
                          const prefix = data.bg_colors?.startsWith("to ") ? data.bg_colors.slice(0, data.bg_colors.indexOf(",") + 1) : "";
                          handleFieldChange({ target: { name: "bg_colors", value: `${prefix}${e.target.value}` } });
                        }}
                        className="flex-1 min-w-[200px] bg-gray-800 text-white border border-gray-600 rounded-lg p-1 px-2 text-sm"
                        title="Gradiente: #color1,#color2,#color3"
                      />
                    )}
                  </div>

                  {/* Selector de dirección del gradiente */}
                  {data.bg_type === "gradient" && (
                    <div className="mt-2">
                      <select
                        value={data.bg_colors?.startsWith("to ") ? data.bg_colors.slice(0, data.bg_colors.indexOf(",")) : ""}
                        onChange={(e) => {
                          const base = data.bg_colors?.startsWith("to ")
                            ? data.bg_colors.slice(data.bg_colors.indexOf(",") + 1)
                            : (data.bg_colors || "");
                          const newVal = e.target.value ? `${e.target.value},${base}` : base;
                          handleFieldChange({ target: { name: "bg_colors", value: newVal } });
                        }}
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-1 text-sm"
                      >
                        <option value="">Izquierda → Derecha</option>
                        <option value="to bottom">Arriba → Abajo</option>
                        <option value="to bottom right">Diagonal ↘</option>
                        <option value="to top">Abajo → Arriba</option>
                      </select>
                    </div>
                  )}

                  {(data.bg_type === "gradient" && data.bg_colors) && (
                    <div className="mt-2 text-xs text-gray-400">
                      Preview: {data.bg_colors}
                    </div>
                  )}
                </div>

               {/* 1. BLOQUE SEO */}


              <div className={mergedStyles.seoSection}>
                <h4 className="text-sm font-semibold text-green-300 mb-3 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Información SEO
                </h4>

                {seoFields.map(
                  ({ name, label, type, placeholder, icon: Icon }) => (
                    <div key={name} className="mb-3">
                      <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Icon className="w-4 h-4 mr-2 text-green-400" />

                        {label}

                        <ValidationMessage fieldName={name} />
                      </label>

                      {type === "textarea" ? (
                        <textarea
                          name={name}
                          value={data[name] || ""}
                          onChange={handleFieldChange}
                          maxLength={validationConfig[name]?.max}
                          autoComplete="off"
                          rows={3}
                          className={`${mergedStyles.input} resize-none`}
                          placeholder={placeholder}
                          required={validationConfig[name]?.required}
                        />
                      ) : (
                        <input
                          type="text"
                          name={name}
                          value={data[name] || ""}
                          onChange={handleFieldChange}
                          maxLength={validationConfig[name]?.max}
                          autoComplete="off"
                          className={mergedStyles.input}
                          placeholder={placeholder}
                          required={validationConfig[name]?.required}
                        />
                      )}
                    </div>
                  )
                )}
              </div>

              {/* 2. CAMPO LINK PERSONALIZADO */}

              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center">
                  <Link2 className="w-4 h-4 mr-2" />
                  Enlace del Blog
                </h4>

                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Link2 className="w-4 h-4 mr-2 text-blue-400" />

                    {linkField.label}

                    <ValidationMessage fieldName={linkField.name} />
                  </label>

                  <input
                    type="text"
                    name={linkField.name}
                    value={data[linkField.name] || ""}
                    onChange={handleFieldChange}
                    maxLength={validationConfig[linkField.name]?.max}
                    autoComplete="off"
                    className={mergedStyles.input}
                    placeholder={linkField.placeholder}
                    required={validationConfig[linkField.name]?.required}
                  />

                  {linkField.helpText && (
                    <p className="text-xs text-gray-400 mt-1">
                      {linkField.helpText}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. CAMPOS DE CONTENIDO */}
              {formFields.map(
                ({ name, icon: Icon, label, type, placeholder }) => (
                  <div key={name}>
                    <label className={mergedStyles.label}>
                      <Icon className={mergedStyles.icon} />
                      {label}
                      <ValidationMessage fieldName={name} />
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        name={name}
                        value={data[name] || ""}
                        onChange={handleFieldChange}
                        maxLength={validationConfig[name]?.max}
                        minLength={validationConfig[name]?.min}
                        autoComplete="off"
                        rows={3}
                        className={`${mergedStyles.input} resize-none`}
                        placeholder={placeholder}
                        required={validationConfig[name]?.required}
                      />
                    ) : (
                      <input
                        type="text"
                        name={name}
                        value={data[name] || ""}
                        onChange={handleFieldChange}
                        maxLength={validationConfig[name]?.max}
                        minLength={validationConfig[name]?.min}
                        autoComplete="off"
                        className={mergedStyles.input}
                        placeholder={placeholder}
                        required={validationConfig[name]?.required}
                      />
                    )}
                  </div>
                )
              )}

              {/* 4. IMAGEN PRINCIPAL */}
              <div>
                <label className={mergedStyles.label}>
                  <IconImage className={mergedStyles.icon} />
                  Imagen Principal
                  <span className="ml-3 text-xs text-gray-400">
                    {imageRecommendedSize}
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
                        <span className="text-sm">
                          {previewImageUrl !== defaultImage
                            ? "Cambiar imagen"
                            : "Seleccionar imagen"}
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept={ACCEPTED_IMAGE_FORMATS}
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                  <div className="flex justify-center mt-2">
                    <button
                      type="button"
                      onClick={handleImageDelete}
                      title="Eliminar imagen"
                      className="p-2 rounded-full hover:bg-red-100"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 p-2.5 bg-purple-950/40 rounded-lg border border-purple-500/30 text-xs text-gray-300 space-y-1">
                  <div className="font-semibold text-purple-300">Recomendaciones de imagen (Header):</div>
                  <div className="flex flex-col gap-0.5 text-gray-400">
                    <span>• Formatos aceptados: <strong className="text-gray-300">WebP, PNG, JPG, AVIF</strong> (se convierte a WebP automáticamente)</span>
                    <span>• <strong className="text-yellow-400">Recomendado: 1280×600 px</strong></span>
                    <span>• Rango permitido: <strong className="text-gray-300">800×400 a 1920×800 px</strong></span>
                    <span>• Peso máximo: <strong className="text-gray-300">500 KB</strong></span>
                  </div>
                </div>
              </div>

              {/* 5. SEO DE IMAGEN */}
              <div className={mergedStyles.imageSection}>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">
                  Información SEO de la Imagen
                </h4>
                {seoImageFields.map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      {label}
                      <ValidationMessage fieldName={name} />
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={data[name] || ""}
                      onChange={handleFieldChange}
                      maxLength={validationConfig[name]?.max}
                      autoComplete="off"
                      className={mergedStyles.input}
                      placeholder={placeholder}
                      required={validationConfig[name]?.required}
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

