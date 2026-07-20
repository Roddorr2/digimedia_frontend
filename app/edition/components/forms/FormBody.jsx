"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Type,
  AlignLeft,
  Quote,
  Clock1,
  Clock,
  CheckCircle,
  ArrowRight,
  Image as IconImage,
  Eye,
  Bookmark,
  Share2,
  Link2,
  ExternalLink as ExternalLinkIcon,
  FileText,
  Loader2,
  Palette,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar configuraciones de plantillas
import {
  getPlantillaConfig,
  DEFAULT_BODY_VALIDATION_CONFIG,
  DEFAULT_SERVICIOS,
} from "../../config/index.js";
import BotonAnadirLink from "./BotonAnadirLink.jsx";
import Swal from "sweetalert2";
import { validateImageFile, ACCEPTED_IMAGE_FORMATS } from "../../utils/imageValidation";

export default function FormBody({
  // Props de datos (estructura original para compatibilidad)
  formCommendBody, // Array de consejos: [{ id, texto, palabra, enlace }] - el enlace solo aplica si la plantilla lo permite (allowLink)
  formInfoBody, // Array [{ titulo, descripcion, palabra, enlace }]
  formEncabezadoBody, // { titulo, descripcion, fecha, alt_image1, title_image1, public_image1 }
  formGaleryBody, // { public_image2, public_image3, alt_image2, alt_image3, title_image2, title_image3 }

  // Props de setters (mantener compatibilidad)
  setFormCommendBody,
  setFormInfoBody,
  setFormEncabezadoBody,
  setFormGaleryBody,
  setValidacionBody,

  // Props de archivos
  setFileBodyHeader,
  setFileBodyFile1,
  setFileBodyFile2,

  // Props de servicios (solo para enlaces en tarjetas)
  servicios = DEFAULT_SERVICIOS,

  // Props de configuración - Ahora se puede pasar el ID de plantilla
  plantillaId = 1, // Por defecto usa Plantilla 1
  mode = "create",


  // Props de callbacks opcionales
  onChange,
  onImageChange,
  onValidationChange,

  // Props de estado
  isUploading = false,
  showValidationMessages = true,

  // Props adicionales
  className = "",
}) {
  // Estados internos
  const [activeTab, setActiveTab] = useState("info");
  const [uploading, setUploading] = useState(isUploading);
  const [fieldValidations, setFieldValidations] = useState({});
  const [gradientColorCount, setGradientColorCount] = useState(2);
  const [selectedDescriptionTexts, setSelectedDescriptionTexts] = useState({});
  const [selectedDescriptionText, setSelectedDescriptionText] = useState("");
  const [selectedConsejoTexts, setSelectedConsejoTexts] = useState({});

  // Estados para controlar visibilidad dinámica de secciones
  const [sectionsVisibility, setSectionsVisibility] = useState({
    consejos: formEncabezadoBody?.flag_consejos ?? true,
    galeria: formEncabezadoBody?.flag_galeria ?? true,
    informacion: formEncabezadoBody?.flag_informacion ?? true,
  });

  // Estado local para los colores del gradiente
  const [gradientColorsLocal, setGradientColorsLocal] = useState([]);
  const [gradientDirection, setGradientDirection] = useState("");

  // Sincronizar gradientColorsLocal con formEncabezadoBody.bg_colors
  useEffect(() => {
    if (formEncabezadoBody?.bg_colors) {
      const parts = formEncabezadoBody.bg_colors.split(",").map(c => c.trim()).filter(Boolean);
      if (parts[0]?.startsWith("to ")) {
        setGradientDirection(parts[0]);
        setGradientColorsLocal(parts.slice(1));
      } else {
        setGradientDirection("");
        setGradientColorsLocal(parts);
      }
    }
  }, [formEncabezadoBody?.bg_colors]);

  // Handler para actualizar color del gradiente
  const handleGradientColorChange = useCallback((index, value) => {
    setGradientColorsLocal(prev => {
      const newColors = [...prev];
      while (newColors.length < gradientColorCount) {
        newColors.push("#5A37A6");
      }
      newColors[index] = value;
      return newColors.slice(0, gradientColorCount);
    });
  }, [gradientColorCount]);

  // Sincronizar gradientColorsLocal con formEncabezadoBody.bg_colors (debounce)
  useEffect(() => {
    if (gradientColorsLocal.length > 0) {
      const timeout = setTimeout(() => {
        const parts = gradientDirection
          ? [gradientDirection, ...gradientColorsLocal]
          : gradientColorsLocal;
        setFormEncabezadoBody((prev) => ({
          ...prev,
          bg_colors: parts.join(","),
        }));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [gradientColorsLocal, gradientDirection, setFormEncabezadoBody]);
  const plantillaConfig = getPlantillaConfig(plantillaId);
  const finalValidationConfig = DEFAULT_BODY_VALIDATION_CONFIG;
  const mergedStyles = { ...plantillaConfig.styles };
  const mergedSectionsConfig = {
    ...plantillaConfig.sectionsConfig,
  };
  const layoutType = plantillaConfig.layoutType;

  // Sincronizar estados de visibilidad con los datos
  useEffect(() => {
    setSectionsVisibility({
      consejos: formEncabezadoBody?.flag_consejos ?? true,
      galeria: formEncabezadoBody?.flag_galeria ?? true,
      informacion: formEncabezadoBody?.flag_informacion ?? true,
    });
  }, [
    formEncabezadoBody?.flag_consejos,
    formEncabezadoBody?.flag_galeria,
    formEncabezadoBody?.flag_informacion,
  ]);

  // ✅ Garantizar que el título de la sección de consejos tenga valor por defecto
  // El backend requiere el campo "titulo_consejos" en blog_bodies
  useEffect(() => {
    if (
      formEncabezadoBody &&
      (!formEncabezadoBody.titulo_consejos ||
        formEncabezadoBody.titulo_consejos.trim() === "")
    ) {
      setFormEncabezadoBody?.((prev) => ({
        ...prev,
        titulo_consejos: "Consejos Importantes",
      }));
    }
  }, [formEncabezadoBody, setFormEncabezadoBody]);

  // Manejar cambio de tab activo cuando se deshabilitan secciones
  useEffect(() => {
    if (layoutType === "tabs") {
      const currentTabVisible =
        (activeTab === "tips" && sectionsVisibility.consejos) ||
        (activeTab === "info" && sectionsVisibility.informacion) ||
        (activeTab === "gallery" && sectionsVisibility.galeria);

      if (!currentTabVisible) {
        // Cambiar a la primera tab disponible
        if (sectionsVisibility.consejos) {
          setActiveTab("tips");
        } else if (sectionsVisibility.informacion) {
          setActiveTab("info");
        } else if (sectionsVisibility.galeria) {
          setActiveTab("gallery");
        }
      }
    }
  }, [sectionsVisibility, activeTab, layoutType]);

  // Adaptar datos originales a estructura unificada
  const data = {
    header: formEncabezadoBody || {},
    consejos: formCommendBody || [],
    galeria: formGaleryBody || {},
    informacion: formInfoBody || [],
  };

  // Función de validación - usa nombres exactos de campos originales
  const validateField = useCallback(
    (fieldName, value, section = null) => {
      // Construir clave de validación con contexto si está disponible
      const validationKey = section ? `${section}.${fieldName}` : fieldName;
      let config =
        finalValidationConfig[validationKey] ||
        finalValidationConfig[fieldName];

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
        return {
          isValid: false,
          message: `Debe tener entre ${config.min} y ${config.max} caracteres`,
        };
      }

      if (config.max && trimmedValue.length > config.max) {
        return {
          isValid: false,
          message: `Debe tener entre ${config.min || 0} y ${config.max
            } caracteres`,
        };
      }

      return {
        isValid: true,
        message: `${trimmedValue.length}/${config.max} caracteres`,
      };
    },
    [finalValidationConfig]
  );

  // Adaptar handleChange original - compatible con los setters existentes
  const handleChange = useCallback(
    (setter, context = null) =>
      (e) => {
        const { name, value } = e.target;
        const validation = validateField(name, value, context);

        const validationKey = context ? `${context}.${name}` : name;
        setFieldValidations((prev) => ({
          ...prev,
          [validationKey]: validation,
        }));

        // Actualizar estado usando el setter original
        setter((prev) => ({
          ...prev,
          [name]: value,
        }));

        // Notificar al componente padre si existe callback
        onChange?.({ fieldName: name, value, validation });
      },
    [validateField, onChange]
  );

  // Handler para controlar flags de visibilidad de secciones
  const handleSectionToggle = useCallback(
    (section, enabled) => {
      const flagName = `flag_${section}`;

      // Actualizar estado local de visibilidad
      setSectionsVisibility((prev) => ({
        ...prev,
        [section]: enabled,
      }));

      // Actualizar formEncabezadoBody con el flag
      setFormEncabezadoBody?.((prev) => ({
        ...prev,
        [flagName]: enabled,
      }));

      // Si se deshabilita una sección, limpiar sus datos
      if (!enabled) {
        switch (section) {
          case "consejos":
            // Vaciar el array: al guardar, esto elimina los consejos existentes en el backend
            setFormCommendBody?.(() => []);
            break;
          case "galeria":
            setFormGaleryBody?.({
              public_image2: "",
              public_image3: "",
              alt_image2: "",
              alt_image3: "",
              title_image2: "",
              title_image3: "",
            });
            break;
          case "informacion":
            setFormInfoBody?.((prev) =>
              // ✅ PRESERVAR IDs de tarjetas existentes
              prev.map((tarjeta) => ({
                id: tarjeta?.id,
                titulo: "",
                descripcion: "",
                palabra: "",
                enlace: "",
              }))
            );
            break;
        }
      }

      // Notificar cambio al padre
      onChange?.({
        fieldName: flagName,
        value: enabled,
        validation: { isValid: true },
      });
    },
    [
      setFormEncabezadoBody,
      setFormCommendBody,
      setFormGaleryBody,
      setFormInfoBody,
      onChange,
    ]
  );

  // Manejar cambios en arrays (formInfoBody)
  const handleChangeMap = useCallback(
    (e, index, field) => {
      const { value } = e.target;

      if (field === "link") {
        const { palabra = "", enlace = "" } = value || {};

        setFormInfoBody?.((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            palabra,
            enlace,
          };
          return updated;
        });

        return;
      }

      const validation = validateField(field, value, "informacion");
      const fullFieldName = `informacion.${index}.${field}`;

      setFieldValidations((prev) => ({
        ...prev,
        [fullFieldName]: validation,
      }));

      // Actualizar formInfoBody - asegurar que el array tenga suficientes elementos
      setFormInfoBody?.((prev) => {
        const updated = [...prev];
        // Extender array si es necesario
        while (updated.length <= index) {
          updated.push({
            titulo: "",
            descripcion: "",
            palabra: "",
            enlace: "",
          });
        }
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });

      // Notificar al padre
      onChange?.({
        fieldName: fullFieldName,
        value,
        validation,
      });
    },
    [validateField, setFormInfoBody, onChange]
  );

  // Manejar cambios de enlace en la descripción del header (formEncabezadoBody)
  const handleDescriptionLinkChange = useCallback(
    (e, _index, field) => {
      const { value } = e.target;

      if (field === "link") {
        const { palabra = "", enlace = "" } = value || {};
        setFormEncabezadoBody?.((prev) => ({
          ...prev,
          palabra,
          enlace,
        }));
        return;
      }

      setFormEncabezadoBody?.((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setFormEncabezadoBody]
  );

  // Manejar cambios en el array de consejos (formCommendBody)
  // Cada consejo tiene su propio texto y su propio enlace (palabra/enlace) independiente
  const handleConsejoChange = useCallback(
    (e, index, field) => {
      const { value } = e.target;

      if (field === "link") {
        const { palabra = "", enlace = "" } = value || {};
        setFormCommendBody?.((prev) => {
          const updated = [...(prev || [])];
          updated[index] = { ...updated[index], palabra, enlace };
          return updated;
        });
        return;
      }

      const validation = validateField(field, value, "consejos");
      const fullFieldName = `consejos.${index}.${field}`;
      setFieldValidations((prev) => ({ ...prev, [fullFieldName]: validation }));

      setFormCommendBody?.((prev) => {
        const updated = [...(prev || [])];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });

      onChange?.({ fieldName: fullFieldName, value, validation });
    },
    [validateField, setFormCommendBody, onChange]
  );

  const handleAddConsejo = useCallback(() => {
    setFormCommendBody?.((prev) => [
      ...(prev || []),
      { texto: "", palabra: "", enlace: "" },
    ]);
  }, [setFormCommendBody]);

  const handleRemoveConsejo = useCallback(
    (index) => {
      setFormCommendBody?.((prev) => (prev || []).filter((_, i) => i !== index));
    },
    [setFormCommendBody]
  );

  // Manejar carga de imagen - compatible con sistema original
  const handleImageHeader = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        setUploading(true);
        
        // Validar y convertir a WebP automáticamente si es necesario
        const validation = await validateImageFile(file, "body");
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

        // Actualizar el estado del header
        setFormEncabezadoBody?.((prev) => ({
          ...prev,
          public_image1: tempUrl,
        }));

        // Establecer archivo para upload
        setFileBodyHeader?.(processedFile);

        // Notificar al componente padre
        onImageChange?.({
          section: "header",
          field: "public_image1",
          file: processedFile,
          tempUrl,
          action: "upload",
        });
      } catch (error) {
        // Limpiar blob URL en caso de error
        if (tempUrl) {
          URL.revokeObjectURL(tempUrl);
        }
      } finally {
        setUploading(false);
      }
    },
    [onImageChange, setFormEncabezadoBody, setFileBodyHeader]
  );

  // Manejar imágenes de galería
  const handleImageBody = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const name = e.target.name; // 'public_image2' o 'public_image3'
      if (!file) return;

      try {
        setUploading(true);
        
        // Validar y convertir a WebP automáticamente si es necesario
        const validation = await validateImageFile(file, "body");
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

        // Actualizar el estado de la galería
        setFormGaleryBody?.((prev) => ({
          ...prev,
          [name]: tempUrl,
        }));

        // Establecer archivo según la imagen
        if (name === "public_image2") {
          setFileBodyFile1?.(processedFile);
        } else if (name === "public_image3") {
          setFileBodyFile2?.(processedFile);
        }

        // Notificar al componente padre
        onImageChange?.({
          section: "galeria",
          field: name,
          file: processedFile,
          tempUrl,
          action: "upload",
        });
      } catch (error) {
        // Limpiar blob URL en caso de error
        if (tempUrl) {
          URL.revokeObjectURL(tempUrl);
        }
      } finally {
        setUploading(false);
      }
    },
    [onImageChange, setFormGaleryBody, setFileBodyFile1, setFileBodyFile2]
  );

  // Limpiar blob URLs al desmontar el componente
  // useEffect(() => {
//   return () => {
//     if (formEncabezadoBody?.public_image1?.startsWith("blob:")) {
//       URL.revokeObjectURL(formEncabezadoBody.public_image1);
//     }
//     if (formGaleryBody?.public_image2?.startsWith("blob:")) {
//       URL.revokeObjectURL(formGaleryBody.public_image2);
//     }
//     if (formGaleryBody?.public_image3?.startsWith("blob:")) {
//       URL.revokeObjectURL(formGaleryBody.public_image3);
//     }
//   };
// }, [
//   formEncabezadoBody?.public_image1,
//   formGaleryBody?.public_image2,
//   formGaleryBody?.public_image3,
// ]);

  // Componente de mensaje de validación - compatible con estructura original
  const ValidationMessage = ({ fieldName, index = null, context = null }) => {
    if (!showValidationMessages) return null;

    const fullFieldName =
      index !== null
        ? `${context || "informacion"}.${index}.${fieldName}`
        : context
          ? `${context}.${fieldName}`
          : fieldName;
    const validation = fieldValidations[fullFieldName];
    if (!validation) return null;

    return (
      <p
        className={`text-xs mt-1 ml-3 ${validation.isValid === null
          ? "text-gray-400"
          : validation.isValid
            ? "text-green-400"
            : "text-red-500"
          }`}
      >
        {validation.message}
      </p>
    );
  };
  // Función para escapar caracteres especiales de RegEx
  const escapeRegExp = (string) => {
    // Los caracteres especiales de RegEx son: [ ] / \ ^ $ . | ? * + ( )
    // Reemplaza cada caracter especial con una barra invertida para interpretarlo literalmente
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Función para renderizar descripción con enlace en palabra clave (CORREGIDA)
  function renderDescripcion(texto, palabraClave, link) {
    if (!palabraClave || !link || !texto) {
      return texto;
    }

    // APLICACIÓN DE LA SOLUCIÓN:
    // Escapar la palabra clave para prevenir errores de RegEx
    const palabraClaveEscapada = escapeRegExp(palabraClave);

    // Usar la palabra clave escapada en la RegEx
    // Buscar la frase completa (case insensitive)
    const regex = new RegExp(`(${palabraClaveEscapada})`, "gi");
    const partes = texto.split(regex);

    return partes.map((parte, i) => {
      // ... (Tu lógica de renderizado del enlace)
      if (parte.toLowerCase() === palabraClave.toLowerCase()) {
        return (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-bold underline hover:text-blue-200"
          >
            {parte}
          </a>
        );
      }
      return <span key={i}>{parte}</span>;
    });
  }

  // Renderizar sección de encabezado
  const renderHeaderSection = () => {
    if (layoutType === "plantilla3") {
      return (
        <div className="flex flex-col lg:flex-row gap-6 mb-6 items-center">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm font-semibold mb-2" style={{ color: "#FFB800" }}>
              {data.header.fecha || "Fecha de publicación"}
            </p>
            <h2
              className="font-extrabold text-2xl lg:text-3xl leading-tight tracking-tight mb-4"
              style={{ color: "#FFB800", letterSpacing: "-0.48px" }}
            >
              {data.header.titulo || "Título del Blog"}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#CCC3D4" }}>
              {renderDescripcion(
                data.header.descripcion || "Descripción del contenido",
                data.header.palabra,
                data.header.enlace
              )}
            </p>
          </div>
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <img
              src={data.header.public_image1 || "/blog/blog-4.webp"}
              alt={data.header.alt_image1 || data.header.titulo || "Imagen principal"}
              title={data.header.title_image1}
              className="w-full h-[200px] object-cover rounded-[20px]"
            />
          </div>
        </div>
      );
    }
    if (layoutType !== "tabs") {
      return (
        <div className="flex flex-col lg:flex-row gap-6 mb-4 items-start">
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <img
              src={data.header.public_image1 || "/blog/blog-4.webp"}
              alt={data.header.alt_image1 || data.header.titulo || "Imagen principal"}
              title={data.header.title_image1}
              className="w-full h-[260px] rounded-[20px] object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#FFB800] font-semibold text-sm mb-2">{data.header.fecha}</p>
            <h1 className="font-extrabold text-[#FFB800] text-2xl leading-tight tracking-tight mb-3">
              {data.header.titulo || "Título del Blog"}
            </h1>
            <p className="text-[#CCC3D4] text-sm leading-relaxed">
              {renderDescripcion(
                data.header.descripcion || "Descripción del contenido",
                data.header.palabra,
                data.header.enlace
              )}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={data.header.public_image1 || "/blog/blog-4.webp"}
          alt={data.header.alt_image1 || data.header.titulo || "Imagen principal"}
          title={data.header.title_image1}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
            {data.header.titulo || "Título del Blog"}
          </h1>
          <div className="w-16 h-1 bg-teal-500 mb-4"></div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>{data.header.fecha}</span>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar sección de consejos (Plantilla 1 y 3; Plantilla 2 usa su propio bloque de tabs)
  const renderConsejosSection = () => {
    const consejos = Array.isArray(data.consejos)
      ? data.consejos.filter((c) => c.texto)
      : [];

    if (consejos.length === 0) return null;

    if (layoutType === "plantilla3") {
      return (
        <div className="mb-16">
          <h3
            className="text-center font-extrabold text-5xl mb-12 tracking-tight leading-tight"
            style={{ color: "#FFB800" }}
          >
            {data.header.titulo_consejos || "Consejos Importantes"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consejos.map((consejo, index) => (
              <div
                key={index}
                className="relative rounded-[30px] overflow-hidden pt-14 pb-10 px-8"
                style={{
                  background: "linear-gradient(180deg, #000000 0%, #100043 62.02%)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[5px]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(65,12,137,0) 0%, #5F00DF 50%, rgba(65,12,137,0) 100%)",
                  }}
                />
                <div className="flex justify-center mb-6">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
                <p className="text-lg text-center leading-relaxed" style={{ color: "#CCC3D4" }}>{renderDescripcion(consejo.texto, consejo.palabra, consejo.enlace)}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Plantilla 1 (layoutType === "linear")
    return (
      <div className="mb-8">
        <div className="mb-4">
          <p className="text-[#FFB800] font-semibold text-base mb-1">Consejos importantes</p>
          <h3 className="text-[#FFB800] font-extrabold text-2xl leading-tight tracking-tight">
            {data.header.titulo_consejos || "Consejos"}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {consejos.map((consejo, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center rounded-xl overflow-hidden flex-1 min-h-[200px] p-5"
              style={{ background: "linear-gradient(180deg, #100043 0%, #08012E 50%, #130049 100%)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #5F00DF 50%, rgba(65,12,137,0) 100%)" }} />
              <p className="text-white font-extrabold text-5xl leading-none mt-5 text-center">{index + 1}</p>
              <p className="text-[#CCC3D4] text-sm leading-relaxed text-center mt-4">{renderDescripcion(consejo.texto, consejo.palabra, consejo.enlace)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizar sección de galería
  const renderGaleriaSection = () => {
    const images = [
      {
        id: 2,
        url: data.galeria.public_image2 || "/blog/blog-10.webp",
        alt: data.galeria.alt_image2,
        title: data.galeria.title_image2,
      },
      {
        id: 3,
        url: data.galeria.public_image3 || "/blog/blog-1.webp",
        alt: data.galeria.alt_image3,
        title: data.galeria.title_image3,
      },
    ];

    if (layoutType === "plantilla3") {
      return (
        <div
          className="rounded-[40px] px-10 py-12 mb-16"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #100043 -0.38deg, #2F086A 173.33deg, #100043 359.62deg, #2F086A 533.33deg)",
          }}
        >
          <h3
            className="text-center font-extrabold text-5xl mb-10 tracking-tight"
            style={{ color: "#FFB800" }}
          >
            Galería
          </h3>
          <div className="flex gap-6">
            {images.map((image, index) => (
              <div key={index} className="flex-1 overflow-hidden rounded-[30px]">
                <img
                  src={image.url}
                  alt={image.alt || `Imagen ${index + 1} del artículo`}
                  title={image.title}
                  className="w-full h-[320px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (layoutType === "linear") {
      return (
        <div className="flex gap-4 mb-8">
          {images.map((image, index) => (
            <div key={index} className="flex-1 overflow-hidden rounded-[20px]">
              <img
                src={image.url}
                alt={image.alt || `Imagen ${index + 1} del artículo`}
                title={image.title}
                className="w-full h-[240px] object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden group"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={image.url}
                alt={image.alt || `Imagen galería ${index + 1}`}
                title={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar sección de información
  const renderInformacionSection = () => {
    if (!data.informacion || data.informacion.length === 0) return null;

    if (layoutType === "plantilla3") {
      const cardBg =
        "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)";
      const CardWide = ({ item, index }) => (
        <div
          className="rounded-[30px] p-8 mb-6"
          style={{ background: cardBg, border: "1px solid rgba(95,0,223,0.2)" }}
        >
          <h4 className="font-bold text-2xl mb-3" style={{ color: "#FFB800" }}>
            {item.titulo || `Información ${index + 1}`}
          </h4>
          <p className="text-lg leading-relaxed" style={{ color: "#CCC3D4" }}>
            {renderDescripcion(item.descripcion || "Descripción del contenido", item.palabra, item.enlace)}
          </p>
        </div>
      );
      const CardNarrow = ({ item, index }) => (
        <div
          className="rounded-[30px] p-8 flex flex-col items-center text-center"
          style={{ background: cardBg, border: "1px solid rgba(95,0,223,0.2)" }}
        >
          <h4 className="font-bold text-xl mb-3" style={{ color: "#FFB800" }}>
            {item.titulo || `Información ${index + 1}`}
          </h4>
          <p className="text-base leading-relaxed" style={{ color: "#CCC3D4" }}>
            {renderDescripcion(item.descripcion || "Descripción del contenido", item.palabra, item.enlace)}
          </p>
        </div>
      );
      return (
        <div className="mb-16">
          <h3
            className="text-center font-extrabold text-5xl mb-12 tracking-tight"
            style={{ color: "#FFB800" }}
          >
            {data.header.titulo_tarjeta || "Información Detallada"}
          </h3>
          {data.informacion[0] && <CardWide item={data.informacion[0]} index={0} />}
          {(data.informacion[1] || data.informacion[2]) && (
            <div className="grid grid-cols-2 gap-6 mb-6">
              {data.informacion[1] && <CardNarrow item={data.informacion[1]} index={1} />}
              {data.informacion[2] && <CardNarrow item={data.informacion[2]} index={2} />}
            </div>
          )}
          {data.informacion[3] && <CardWide item={data.informacion[3]} index={3} />}
        </div>
      );
    }

    if (layoutType === "linear") {
      return (
        <div>
          {/* Banner amarillo */}
          <div className="flex justify-center mb-6">
            <div
              className="flex items-center justify-center rounded-[38px] px-8 h-[52px] w-full max-w-[600px]"
              style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
            >
              <span
                className="font-bold text-sm text-center"
                style={{
                  background: "linear-gradient(180deg, #100043 0%, #08012E 50%, #130049 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data.header.titulo_tarjeta || "Información Importante"}
              </span>
            </div>
          </div>
          {/* Grid tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
            {data.informacion.map((section, index) => (
              <div
                key={index}
                className="relative rounded-[20px] pt-12 pb-6 px-8"
                style={{ background: "linear-gradient(180deg, rgba(16,0,67,0.54) 0%, rgba(8,1,46,0.54) 50%, rgba(19,0,73,0.54) 100%)" }}
              >
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-[52px] h-[52px] rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                >
                  <CheckCircle className="w-5 h-5 text-[#100043]" />
                </div>
                <h3 className="text-[#FFB800] font-bold text-base mb-2">
                  {section.titulo}
                </h3>
                <p className="text-[#CCC3D4] text-xs leading-relaxed">
                  {renderDescripcion(section.descripcion, section.palabra, section.enlace)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data.informacion.map((section, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {section.titulo}
              </h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                {renderDescripcion(
                  section.descripcion,
                  section.palabra,
                  section.enlace
                )}
              </p>
              {section.enlace && section.palabra && (
                <div className="flex justify-end">
                  <a
                    href={section.enlace}
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors text-sm"
                  >
                    {section.palabra}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  {/* Renderizar controles de visibilidad de secciones */}
  const renderSectionControls = () => {
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

    // bg_color viene de formEncabezadoBody, accesible como data.header.bg_color
    const currentBgColor = formEncabezadoBody?.bg_color || plantillaConfig?.styles?.bgColor || "#5A37A6";
    const currentBgType = formEncabezadoBody?.bg_type || "solid";
    const currentBgColors = formEncabezadoBody?.bg_colors || "";


    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-yellow-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Título del controlador */}
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-yellow-400" />
            <h4 className="text-sm font-semibold text-yellow-400">
              Control de Secciones del Blog
            </h4>
          </div>

          {/* Selector de tipo y color de fondo */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Fondo:</span>
            <select
              value={currentBgType}
              onChange={(e) => setFormEncabezadoBody((prev) => ({
                ...prev,
                bg_type: e.target.value,
              }))}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg p-1 text-sm"
            >
              <option value="solid">Sólido</option>
              <option value="gradient">Gradiente</option>
            </select>
          </div>

          {/* Selector de color/es */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Color:</span>
            <div className="flex gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormEncabezadoBody((prev) => ({
                    ...prev,
                    bg_color: color,
                  }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${currentBgColor === color
                      ? "border-white scale-110"
                      : "border-gray-600 hover:border-gray-400"
                    }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <input
                type="color"
                value={currentBgColor}
                onChange={(e) => setFormEncabezadoBody((prev) => ({
                  ...prev,
                  bg_color: e.target.value,
                }))}
                className="w-8 h-8 rounded-full border-2 border-gray-600 cursor-pointer"
                title="Seleccionar color personalizado"
              />
            </div>
          </div>

          {/* Configuración de gradiente - selector de cantidad de colores */}
          {currentBgType === "gradient" && (
            <div className="flex flex-col gap-3 w-full">
              {/* Selector de dirección del gradiente */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">Dirección:</span>
                <select
                  value={gradientDirection || ""}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-600 rounded-lg p-1 text-sm"
                >
                  <option value="">Izquierda → Derecha</option>
                  <option value="to bottom">Arriba → Abajo</option>
                  <option value="to bottom right">Diagonal ↘</option>
                  <option value="to top">Abajo → Arriba</option>
                </select>
              </div>

              {/* Selector de cantidad de colores */}
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">¿Cuántos colores?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGradientColorCount(2)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${gradientColorCount === 2 ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => setGradientColorCount(3)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${gradientColorCount === 3 ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    3
                  </button>
                </div>
              </div>

              {/* Selectores de colores individuales */}
              <div className="flex flex-col gap-2 ml-7">
                {Array.from({ length: gradientColorCount }, (_, index) => {
                  const colorValue = gradientColorsLocal[index] || "#5A37A6";
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-16">Color {index + 1}:</span>
                      <input
                        type="color"
                        value={colorValue}
                        onChange={(e) => handleGradientColorChange(index, e.target.value)}
                        className="w-10 h-8 rounded border border-gray-600 cursor-pointer"
                        title={`Seleccionar color ${index + 1}`}
                      />
                      <input
                        type="text"
                        value={colorValue}
                        onChange={(e) => handleGradientColorChange(index, e.target.value)}
                        className="flex-1 bg-gray-800 text-white border border-gray-600 rounded p-1 px-2 text-sm"
                        placeholder={`#color${index + 1}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toggles en columna */}
          <div className="flex flex-col gap-3">
            {/* Toggle Consejos */}
            {mergedSectionsConfig.consejos.enabled && (
              <div className="flex items-center justify-between gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <span className="text-sm text-gray-300 flex items-center whitespace-nowrap">
                  <Quote className="w-4 h-4 mr-2 text-purple-400" />
                  Consejos
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionsVisibility.consejos}
                    onChange={(e) =>
                      handleSectionToggle("consejos", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${sectionsVisibility.consejos
                      ? "bg-yellow-500"
                      : "bg-gray-600"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sectionsVisibility.consejos
                        ? "translate-x-6"
                        : "translate-x-1"
                        }`}
                    />
                  </div>
                </label>
              </div>
            )}

            {/* Toggle Galería */}
            {mergedSectionsConfig.galeria.enabled && (
              <div className="flex items-center justify-between gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <span className="text-sm text-gray-300 flex items-center whitespace-nowrap">
                  <IconImage className="w-4 h-4 mr-2 text-blue-400" />
                  Galería
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionsVisibility.galeria}
                    onChange={(e) =>
                      handleSectionToggle("galeria", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${sectionsVisibility.galeria
                      ? "bg-yellow-500"
                      : "bg-gray-600"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sectionsVisibility.galeria
                        ? "translate-x-6"
                        : "translate-x-1"
                        }`}
                    />
                  </div>
                </label>
              </div>
            )}

            {/* Toggle Información */}
            {mergedSectionsConfig.informacion.enabled && (
              <div className="flex items-center justify-between gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <span className="text-sm text-gray-300 flex items-center whitespace-nowrap">
                  <FileText className="w-4 h-4 mr-2 text-teal-400" />
                  Información
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionsVisibility.informacion}
                    onChange={(e) =>
                      handleSectionToggle("informacion", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${sectionsVisibility.informacion
                      ? "bg-yellow-500"
                      : "bg-gray-600"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sectionsVisibility.informacion
                        ? "translate-x-6"
                        : "translate-x-1"
                        }`}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Tooltip informativo */}
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-400 flex items-start">
            <span className="mr-1">💡</span>
            Controla qué secciones se muestran en la plantilla. Los datos se
            limpian automáticamente al deshabilitar.
          </p>
        </div>
      </div>
    );
  };

  // Renderizar formularios de edición - compatible con handlers originales
  const renderEditForms = () => {
    return (
      <div className={mergedStyles.formPanel}>
        <div className={mergedStyles.formCard}>
          <form className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Editar Contenido del Header
            </h3>

            {/* Header form fields - usa formEncabezadoBody */}
            {/* cambios realizados para el limite de caracteres */}
            <div>
              <label className={mergedStyles.label}>
                <Type className={mergedStyles.icon} />
                Título
                <ValidationMessage fieldName="titulo" />
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={finalValidationConfig["titulo"]?.max}
                value={data.header.titulo || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
                placeholder="Título principal"
              />
            </div>

            <div>
              <label className={mergedStyles.label}>
                <AlignLeft className={mergedStyles.icon} />
                Descripción
                <ValidationMessage fieldName="descripcion" />
              </label>
              <textarea
                name="descripcion"
                maxLength={finalValidationConfig["descripcion"]?.max}
                value={data.header.descripcion || ""}
                onChange={(e) => {
                  setSelectedDescriptionText("");
                  handleChange(setFormEncabezadoBody)(e);
                }}
                onSelect={(e) => {
                  const { selectionStart, selectionEnd, value } =
                    e.currentTarget;
                  const selectedText = value.slice(
                    selectionStart,
                    selectionEnd
                  );

                  if (!selectedText) {
                    setSelectedDescriptionText("");
                    return;
                  }

                  setSelectedDescriptionText(selectedText);
                }}
                className={mergedStyles.textarea}
                rows={3}
                placeholder="Descripción del contenido"
              />
            </div>

            <div>
              <label className={mergedStyles.label}>
                <Link2 className="w-4 h-4 mr-2 text-purple-400" />
                Enlace en descripción (opcional)
              </label>
              <div className="flex justify-center">
                <BotonAnadirLink
                  servicios={servicios}
                  item={data.header}
                  index={0}
                  handleChange={handleDescriptionLinkChange}
                  selectedText={selectedDescriptionText}
                />
              </div>
              <ValidationMessage fieldName="palabra" />
              <ValidationMessage fieldName="enlace" />
            </div>

            <div>
              <label className={mergedStyles.label}>
                <Clock1 className="w-4 h-4 mr-2 text-purple-400" />
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={data.header.fecha || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
              />
            </div>

            {/* Image upload */}
            <div>
              <label className={mergedStyles.label}>
                <IconImage className="w-4 h-4 mr-2 text-purple-400" />
                Imagen Principal
              </label>
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
                    <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                    <span className="text-sm">
                      {data.header.public_image1
                        ? "Cambiar imagen"
                        : "Seleccionar imagen"}
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="public_image1"
                  accept={ACCEPTED_IMAGE_FORMATS}
                  className="hidden"
                  onChange={handleImageHeader}
                  disabled={uploading}
                />
              </label>
              <div className="mt-2 p-2.5 bg-purple-950/40 rounded-lg border border-purple-500/30 text-xs text-gray-300 space-y-1">
                <div className="font-semibold text-purple-300">Recomendaciones de imagen (Cuerpo):</div>
                <div className="flex flex-col gap-0.5 text-gray-400">
                  <span>• Formatos aceptados: <strong className="text-gray-300">WebP, PNG, JPG, AVIF</strong> (se convierte automáticamente)</span>
                  <span>• <strong className="text-yellow-400">Recomendado: 800×600 px</strong></span>
                  <span>• Rango permitido: <strong className="text-gray-300">400×300 a 1200×900 px</strong></span>
                  <span>• Peso máximo: <strong className="text-gray-300">400 KB</strong></span>
                </div>
              </div>
            </div>

            {/* Alt text for main image */}
            <div>
              <label className={mergedStyles.label}>
                Texto alternativo imagen
                <ValidationMessage fieldName="alt_image1" />
              </label>
              <input
                type="text"
                name="alt_image1"
                maxLength={finalValidationConfig["alt_image1"]?.max}
                value={data.header.alt_image1 || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
                placeholder="Descripción de la imagen"
              />
            </div>

            {/* Title for main image */}
            <div>
              <label className={mergedStyles.label}>
                Título de imagen
                <ValidationMessage fieldName="title_image1" />
              </label>
              <input
                type="text"
                name="title_image1"
                maxLength={finalValidationConfig["title_image1"]?.max}
                value={data.header.title_image1 || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
                placeholder="Título de la imagen"
              />
            </div>
          </form>
        </div>

        {/* Consejos form */}
        {mergedSectionsConfig.consejos.enabled &&
          sectionsVisibility.consejos && (
            <div className={mergedStyles.formCard}>
              <h4 className="text-md font-semibold text-white mb-4">
                Consejos ({data.consejos.length})
              </h4>
              <div className="space-y-4">
                {/* Título de la sección */}
                <div>
                  <label className={mergedStyles.label}>
                    <Type className="w-4 h-4 mr-2 text-purple-400" />
                    Título de la sección
                    <ValidationMessage fieldName="titulo_consejos" />
                  </label>
                  <input
                    type="text"
                    name="titulo_consejos"
                    maxLength={finalValidationConfig["titulo_consejos"]?.max}
                    value={data.header.titulo_consejos || ""}
                    onChange={handleChange(setFormEncabezadoBody)}
                    className={mergedStyles.input}
                    placeholder="Ej: Consejos Útiles, Tips Importantes"
                  />
                </div>

                {/* Swiper dinámico: un slide por consejo, cada uno con su propio enlace */}
                {data.consejos.length > 0 ? (
                  <div className="relative">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={20}
                      slidesPerView={1}
                      navigation={{
                        nextEl: ".swiper-button-next-consejos",
                        prevEl: ".swiper-button-prev-consejos",
                      }}
                      pagination={{
                        clickable: true,
                        el: ".swiper-pagination-consejos",
                      }}
                      className="consejos-swiper"
                      style={{ paddingBottom: "40px" }}
                    >
                      {data.consejos.map((consejoItem, index) => (
                        <SwiperSlide key={index}>
                          <div className="p-4 bg-gray-800/30 rounded-lg border border-purple-500/30">
                            <div className="flex items-center justify-between mb-1">
                              <label className={mergedStyles.label}>
                                <Quote className="w-4 h-4 mr-2 text-purple-400" />
                                Consejo {index + 1}
                              </label>
                              <button
                                type="button"
                                onClick={() => handleRemoveConsejo(index)}
                                className="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1 rounded transition-colors"
                                title="Eliminar este consejo"
                              >
                                Eliminar
                              </button>
                            </div>
                            <textarea
                              name="texto"
                              maxLength={finalValidationConfig["consejos.texto"]?.max}
                              value={consejoItem.texto || ""}
                              onChange={(e) => {
                                setSelectedConsejoTexts((prev) => ({
                                  ...prev,
                                  [index]: "",
                                }));
                                handleConsejoChange(e, index, "texto");
                              }}
                              onSelect={(e) => {
                                const { selectionStart, selectionEnd, value } =
                                  e.currentTarget;
                                const selectedText = value.slice(
                                  selectionStart,
                                  selectionEnd
                                );

                                if (!selectedText) return;

                                setSelectedConsejoTexts((prev) => ({
                                  ...prev,
                                  [index]: selectedText,
                                }));
                              }}
                              className={mergedStyles.textarea}
                              rows={3}
                              placeholder={`Consejo ${index + 1}`}
                            />
                            <ValidationMessage
                              fieldName="texto"
                              index={index}
                              context="consejos"
                            />

                            {/* Enlace propio de este consejo */}
                            {mergedSectionsConfig.consejos.allowLink && (
                              <div className="mt-3">
                                <label className={mergedStyles.label}>
                                  <Link2 className="w-4 h-4 mr-2 text-purple-400" />
                                  Enlace de este consejo (opcional)
                                </label>
                                <div className="flex justify-center">
                                  <BotonAnadirLink
                                    servicios={servicios}
                                    item={consejoItem}
                                    index={index}
                                    handleChange={handleConsejoChange}
                                    selectedText={selectedConsejoTexts[index] || ""}
                                  />
                                </div>
                              </div>
                            )}

                            <p className="text-xs text-gray-400 mt-3 text-center">
                              Consejo {index + 1} de {data.consejos.length}
                            </p>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Paginación personalizada */}
                    <div className="swiper-pagination-consejos flex justify-center gap-2 mt-4"></div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Todavía no hay consejos. Añade el primero con el botón de abajo.
                  </p>
                )}

                {/* Añadir nuevo consejo */}
                <button
                  type="button"
                  onClick={handleAddConsejo}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-sm font-semibold rounded-lg transition-colors"
                >
                  + Añadir consejo
                </button>

                {/* Indicador de ayuda */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span>
                    {mergedSectionsConfig.consejos.allowLink
                      ? 'Cada consejo tiene su propio enlace: selecciona texto dentro de él y pulsa "Añadir Enlace".'
                      : "Usa los puntos o desliza para navegar"}
                  </span>
                </div>
              </div>

              {/* Estilos personalizados para la paginación */}
              <style jsx global>{`
                .swiper-pagination-consejos .swiper-pagination-bullet {
                  background: #9333ea;
                  opacity: 0.5;
                  width: 10px;
                  height: 10px;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-consejos .swiper-pagination-bullet-active {
                  opacity: 1;
                  width: 30px;
                  border-radius: 5px;
                }
              `}</style>
            </div>
          )}

        {/* Galería form */}
        {mergedSectionsConfig.galeria.enabled && sectionsVisibility.galeria && (
          <div className={mergedStyles.formCard}>
            <h4 className="text-md font-semibold text-white mb-4">Galería</h4>

            {/* Swiper para galería */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-galeria",
                  prevEl: ".swiper-button-prev-galeria",
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-galeria",
                }}
                className="galeria-swiper"
                style={{ paddingBottom: "40px" }}
              >
                {["public_image2", "public_image3"].map((campo, index) => (
                  <SwiperSlide key={campo}>
                    <div className="p-4 bg-gray-800/30 rounded-lg border border-blue-500/30">
                      <h5 className="text-sm font-medium text-blue-400 mb-4 flex items-center">
                        <IconImage className="w-5 h-5 mr-2" />
                        Imagen {index + 1} de la Galería
                      </h5>

                      <div className="space-y-3">
                        {/* Upload de archivo */}
                        <div>
                          <label className={mergedStyles.label}>
                            <IconImage className="w-4 h-4 mr-2 text-purple-400" />
                            Subir imagen
                          </label>
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
                                <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                                <span className="text-sm">
                                  {data.galeria[campo]
                                    ? "Cambiar imagen"
                                    : "Seleccionar imagen"}
                                </span>
                              </>
                            )}
                            <input
                              type="file"
                              name={campo}
                              accept={ACCEPTED_IMAGE_FORMATS}
                              className="hidden"
                              onChange={handleImageBody}
                              disabled={uploading}
                            />
                          </label>
                          <div className="mt-2 p-2.5 bg-blue-950/40 rounded-lg border border-blue-500/30 text-xs text-gray-300 space-y-1">
                            <div className="font-semibold text-blue-300">Recomendaciones de imagen (Galería):</div>
                            <div className="flex flex-col gap-0.5 text-gray-400">
                              <span>• Formatos aceptados: <strong className="text-gray-300">WebP, PNG, JPG, AVIF</strong> (se convierte automáticamente)</span>
                              <span>• <strong className="text-yellow-400">Recomendado: 800×600 px</strong></span>
                              <span>• Rango permitido: <strong className="text-gray-300">400×300 a 1200×900 px</strong></span>
                              <span>• Peso máximo: <strong className="text-gray-300">400 KB</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Alt text */}
                        <div>
                          <label className={mergedStyles.label}>
                            <AlignLeft className="w-4 h-4 mr-2 text-purple-400" />
                            Texto alternativo
                          </label>
                          <input
                            type="text"
                            name={`alt_image${index + 2}`}
                            maxLength={finalValidationConfig[`alt_image${index + 2}`]?.max}
                            value={data.galeria[`alt_image${index + 2}`] || ""}
                            onChange={handleChange(
                              setFormGaleryBody,
                              "galeria"
                            )}
                            className={mergedStyles.input}
                            placeholder={`Descripción de la imagen ${index + 2
                              }`}
                          />
                          <ValidationMessage
                            fieldName={`alt_image${index + 2}`}
                            context="galeria"
                          />
                        </div>

                        {/* Title text */}
                        <div>
                          <label className={mergedStyles.label}>
                            <Type className="w-4 h-4 mr-2 text-purple-400" />
                            Título de imagen
                          </label>
                          <input
                            type="text"
                            name={`title_image${index + 2}`}
                            maxLength={finalValidationConfig[`title_image${index + 2}`]?.max}
                            value={
                              data.galeria[`title_image${index + 2}`] || ""
                            }
                            onChange={handleChange(
                              setFormGaleryBody,
                              "galeria"
                            )}
                            className={mergedStyles.input}
                            placeholder={`Título imagen ${index + 2}`}
                          />
                          <ValidationMessage
                            fieldName={`title_image${index + 2}`}
                            context="galeria"
                          />
                        </div>

                        {/* Preview de la imagen si existe */}
                        {data.galeria[campo] && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
                            <img
                              src={data.galeria[campo]}
                              alt={
                                data.galeria[`alt_image${index + 2}`] ||
                                `Preview ${index + 2}`
                              }
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}

                        <p className="text-xs text-gray-400 mt-2">
                          Slide {index + 1} de 2
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Paginación personalizada */}
              <div className="swiper-pagination-galeria flex justify-center gap-2 mt-4"></div>
            </div>

            {/* Indicador de ayuda */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Usa los puntos o desliza para navegar</span>
            </div>

            {/* Estilos personalizados para la paginación */}
            <style jsx global>{`
              .swiper-pagination-galeria .swiper-pagination-bullet {
                background: #2563eb;
                opacity: 0.5;
                width: 10px;
                height: 10px;
                transition: all 0.3s ease;
              }
              .swiper-pagination-galeria .swiper-pagination-bullet-active {
                opacity: 1;
                width: 30px;
                border-radius: 5px;
              }
            `}</style>
          </div>
        )}

        {/* Información/Tarjetas form */}
        {mergedSectionsConfig.informacion.enabled &&
          sectionsVisibility.informacion && (
            <div className={mergedStyles.formCard}>
              <h4 className="text-md font-semibold text-white mb-4">
                Tarjetas de Información (
                {mergedSectionsConfig.informacion.maxItems} máximo)
              </h4>

              {/* Título de la sección de información */}
              <div className="mb-4">
                <label className={mergedStyles.label}>
                  <Type className="w-4 h-4 mr-2 text-purple-400" />
                  Título de la sección
                  <ValidationMessage fieldName="titulo_tarjeta" />
                </label>
                <input
                  type="text"
                  name="titulo_tarjeta"
                  maxLength={finalValidationConfig["titulo_tarjeta"]?.max}
                  value={data.header.titulo_tarjeta || ""}
                  onChange={handleChange(setFormEncabezadoBody)}
                  className={mergedStyles.input}
                  placeholder="Ej: Información Detallada, Conoce Más"
                />
              </div>

              {/* Swiper para tarjetas de información */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next-info",
                    prevEl: ".swiper-button-prev-info",
                  }}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-info",
                  }}
                  className="informacion-swiper"
                  style={{ paddingBottom: "40px" }}
                >
                  {Array.from(
                    { length: mergedSectionsConfig.informacion.maxItems },
                    (_, index) => {
                      const infoItem = data.informacion[index] || {};
                      return (
                        <SwiperSlide key={index}>
                          <div className="p-4 bg-gray-800/30 rounded-lg border border-yellow-500/30">
                            <h5 className="text-sm font-medium text-yellow-400 mb-4">
                              Tarjeta {index + 1}
                            </h5>

                            {/* Título de la tarjeta */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <Type className="w-4 h-4 mr-2 text-purple-400" />
                                Título
                              </label>
                              <input
                                type="text"
                                name="titulo"
                                maxLength={finalValidationConfig["titulo"]?.max}
                                value={infoItem.titulo || ""}
                                onChange={(e) =>
                                  handleChangeMap(e, index, "titulo")
                                }
                                className={mergedStyles.input}
                                placeholder={`Título de la tarjeta ${index + 1
                                  }`}
                              />
                              <ValidationMessage
                                fieldName="titulo"
                                index={index}
                              />
                            </div>

                            {/* Descripción de la tarjeta */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <AlignLeft className="w-4 h-4 mr-2 text-purple-400" />
                                Descripción
                              </label>
                              <textarea
                                name="descripcion"
                                maxLength={finalValidationConfig["descripcion"]?.max}
                                value={infoItem.descripcion || ""}
                                onChange={(e) => {
                                  setSelectedDescriptionTexts((prev) => ({
                                    ...prev,
                                    [index]: "",
                                  }));
                                  handleChangeMap(e, index, "descripcion");
                                }}
                                onSelect={(e) => {
                                  const { selectionStart, selectionEnd, value } =
                                    e.currentTarget;
                                  const selectedText = value.slice(
                                    selectionStart,
                                    selectionEnd
                                  );

                                  if (!selectedText) return;

                                  setSelectedDescriptionTexts((prev) => ({
                                    ...prev,
                                    [index]: selectedText,
                                  }));
                                }}
                                className={mergedStyles.textarea}
                                rows={3}
                                placeholder={`Descripción detallada de la tarjeta ${index + 1
                                  }`}
                              />
                              <ValidationMessage
                                fieldName="descripcion"
                                index={index}
                              />
                            </div>

                            {/* Palabra clave */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <Link2 className="w-4 h-4 mr-2 text-purple-400" />
                                Enlace asociado (opcional)
                              </label>
                              <div className="flex justify-center">
                                <BotonAnadirLink
                                  servicios={servicios}
                                  item={infoItem}
                                  index={index}
                                  handleChange={handleChangeMap}
                                  selectedText={
                                    selectedDescriptionTexts[index] || ""
                                  }
                                />
                              </div>
                              <ValidationMessage
                                fieldName="palabra"
                                index={index}
                              />
                              <ValidationMessage
                                fieldName="enlace"
                                index={index}
                              />
                            </div>

                            <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 mt-4">
                              <p className="text-xs text-gray-400">
                                💡 El enlace solo se asocia con texto existente en la descripcion
                              </p>
                            </div>

                            <p className="text-xs text-gray-400 mt-3 text-center">
                              Tarjeta {index + 1} de{" "}
                              {mergedSectionsConfig.informacion.maxItems}
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </Swiper>

                {/* Paginación personalizada */}
                <div className="swiper-pagination-info flex justify-center gap-2 mt-4"></div>
              </div>

              {/* Indicador de ayuda */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Eye className="w-4 h-4 text-yellow-400" />
                <span>Usa los puntos o desliza para navegar</span>
              </div>

              {/* Estilos personalizados para la paginación */}
              <style jsx global>{`
                .swiper-pagination-info .swiper-pagination-bullet {
                  background: #ca8a04;
                  opacity: 0.5;
                  width: 10px;
                  height: 10px;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-info .swiper-pagination-bullet-active {
                  opacity: 1;
                  width: 30px;
                  border-radius: 5px;
                }
              `}</style>
            </div>
          )}
      </div>
    );
  };

  // Renderizar contenido principal
  const renderMainContent = () => {
    const containerClass =
      layoutType === "linear" || layoutType === "plantilla3"
        ? `${mergedStyles.container} ${mergedStyles.linearLayout}`
        : `${mergedStyles.container} ${mergedStyles.tabsLayout}`;

    const previewBgStyle = (() => {
      const bgType = formEncabezadoBody?.bg_type;
      const bgColor = formEncabezadoBody?.bg_color;
      const bgColors = formEncabezadoBody?.bg_colors || "";
      if (bgType === "gradient" && bgColors) {
        const parts = bgColors.split(",").map(c => c.trim()).filter(Boolean);
        let direction = "";
        let colorParts = parts;
        if (parts[0]?.startsWith("to ")) {
          direction = parts[0];
          colorParts = parts.slice(1);
        }
        if (colorParts.length >= 3) {
          return { background: `linear-gradient(${direction || "135deg"}, ${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]})` };
        }
        if (colorParts.length >= 2) {
          return { background: `linear-gradient(${direction || "to right"}, ${colorParts[0]}, ${colorParts[1]})` };
        }
      }
      if (bgColor) {
        return { background: bgColor };
      }
      return { background: "linear-gradient(143.3deg, #000118 0%, #410C89 50%, #000118 100%)" };
    })();

    if (layoutType === "plantilla3") {
      return (
        <div className={`${className}`}>
          <div className="w-full mb-6">{renderSectionControls()}</div>
          <div className={containerClass}>
            <div
              className={mergedStyles.previewArea + " rounded-[20px] overflow-hidden"}
              style={previewBgStyle}
            >
              <div className="p-5 pb-0">
                {renderHeaderSection()}
              </div>
              <div className="p-5">
                {mergedSectionsConfig.consejos.enabled &&
                  sectionsVisibility.consejos &&
                  renderConsejosSection()}
                {mergedSectionsConfig.galeria.enabled &&
                  sectionsVisibility.galeria &&
                  renderGaleriaSection()}
                {mergedSectionsConfig.informacion.enabled &&
                  sectionsVisibility.informacion &&
                  renderInformacionSection()}
              </div>
            </div>
            {renderEditForms()}
          </div>
        </div>
      );
    }

    if (layoutType === "linear") {
      return (
        <div className={`${className}`}>
          {/* Controles de secciones - por encima de todo */}
          <div className="w-full mb-6">{renderSectionControls()}</div>

          {/* Contenido en dos columnas: preview + forms */}
          <div className={containerClass}>
            <div
              className={mergedStyles.previewArea}
              style={previewBgStyle}
            >
              <div className="p-8">
                {renderHeaderSection()}
              </div>

              <div className={mergedStyles.previewContent} style={{ background: "transparent" }}>
                {mergedSectionsConfig.consejos.enabled &&
                  sectionsVisibility.consejos &&
                  renderConsejosSection()}
                {mergedSectionsConfig.galeria.enabled &&
                  sectionsVisibility.galeria &&
                  renderGaleriaSection()}
                {mergedSectionsConfig.informacion.enabled &&
                  sectionsVisibility.informacion &&
                  renderInformacionSection()}
              </div>
            </div>
            {renderEditForms()}
          </div>
        </div>
      );
    }

    // ── Plantilla 2: diseño oscuro con tabs ──
    if (plantillaId === 2) {
      return (
        <div className={`${className}`}>
          <div className="w-full mb-6">{renderSectionControls()}</div>
          <div className={containerClass}>
             {/* cambio para que no se aplasten las columnas una al lado de otra */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center">
              {/* Preview izquierda con el diseño Figma de Plantilla 2 */}
              <div className={mergedStyles.previewArea}>
                <div className="sticky top-4">
                  <div
                    className="rounded-[20px] overflow-hidden"
                    style={previewBgStyle}
                  >
                    <div className="px-5 py-6">

                      {/* Hero: título izquierda + imagen derecha */}
                      <div className="flex flex-col lg:flex-row gap-4 pb-5 items-center">
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          {data.header.fecha && (
                            <p className="text-[#FFB800] font-semibold text-xs mb-2">{data.header.fecha}</p>
                          )}
                          <h2
                            className="font-extrabold text-[#FFB800] text-base lg:text-xl leading-tight tracking-[-0.48px] mb-2 uppercase"
                            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                          >
                            {data.header.titulo || "Título del Blog"}
                          </h2>
                          <p className="text-[#CCC3D4] text-xs leading-relaxed">
                            {renderDescripcion(
                              data.header.descripcion || "Descripción del contenido del blog",
                              data.header.palabra,
                              data.header.enlace
                            )}
                          </p>
                        </div>
                        <div className="w-full lg:w-[45%] flex-shrink-0">
                          <img
                            src={data.header.public_image1 || "/blog/blog-4.webp"}
                            alt={data.header.alt_image1 || data.header.titulo || "Imagen principal"}
                            className="w-full h-[130px] object-cover rounded-[14px]"
                          />
                        </div>
                      </div>

                      {/* Separador superior */}
                      <div className="h-[4px]" style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #410C89 50%, rgba(65,12,137,0) 100%)" }} />

                      {/* Tabs */}
                      <div className="flex gap-5 pt-4 pb-2">
                        {["info", "tips", "gallery"].filter(tab => {
                          if (tab === "info") return sectionsVisibility.informacion;
                          if (tab === "tips") return sectionsVisibility.consejos;
                          if (tab === "gallery") return sectionsVisibility.galeria;
                          return true;
                        }).map(tab => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="text-xs font-normal transition-colors"
                            style={{ color: activeTab === tab ? "#FFB800" : "#FFFFFF" }}
                          >
                            {tab === "info" && "Información"}
                            {tab === "tips" && "Consejos"}
                            {tab === "gallery" && "Galería"}
                          </button>
                        ))}
                      </div>

                      {/* Separador bajo tabs */}
                      <div className="h-[6px] mb-4" style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #410C89 50%, rgba(65,12,137,0) 100%)" }} />

                      {/* Tab: Consejos (Plantilla 2 no tiene funcionalidad de enlace) */}
                      {activeTab === "tips" && sectionsVisibility.consejos && (
                        <div className="rounded-[20px] overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)" }}>
                          <div className="h-[6px]" style={{ background: "linear-gradient(90deg, rgba(65,12,137,0) 0%, #410C89 50%, rgba(65,12,137,0) 100%)" }} />
                          <div className="mx-3 my-3 rounded-[16px] px-4 py-4" style={{ background: "linear-gradient(180deg, rgba(19,0,73,0.69) 0%, rgba(16,0,67,0.69) 100%)" }}>
                            <h3
                              className="text-center font-bold text-xs leading-tight mb-3"
                              style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#FFB800" }}
                            >
                              {data.header.titulo_consejos || "Consejos Importantes"}
                            </h3>
                            <div className="flex flex-col gap-2">
                              {(Array.isArray(data.consejos) ? data.consejos : [])
                                .filter((c) => c.texto)
                                .map((consejo, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <div
                                      className="flex-shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center"
                                      style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                                    >
                                      <CheckCircle className="w-[18px] h-[18px] text-[#100043]" strokeWidth={2.5} />
                                    </div>
                                    <div
                                      className="flex-1 flex items-center px-3 min-h-[44px] rounded-[14px]"
                                      style={{ background: "linear-gradient(180deg, rgba(16,0,67,0.92) 0%, rgba(0,1,24,0.92) 100%)" }}
                                    >
                                      <p className="text-xs leading-relaxed" style={{ color: "#CCC3D4" }}>{consejo.texto}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div
                            className="h-[32px] flex items-center justify-center rounded-b-[20px]"
                            style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }}
                          >
                            <span
                              className="font-bold text-xs"
                              style={{
                                background: "linear-gradient(180deg, #100043 0%, #08012E 50%, #130049 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              {new Date().getFullYear()} - Todos los derechos reservados
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Tab: Información */}
                      {activeTab === "info" && sectionsVisibility.informacion && (
                        <div className="flex flex-col gap-3">
                          {(data.informacion.length > 0 ? data.informacion : [
                            { titulo: "Información 1", descripcion: "Descripción detallada del primer punto." },
                            { titulo: "Información 2", descripcion: "Descripción detallada del segundo punto." },
                          ]).map((card, index) => (
                            <div key={index} className="overflow-hidden">
                              <div className="w-full h-[10px] rounded-t-[14px]" style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }} />
                              <div className="px-4 py-3 border border-white/5 rounded-b-[14px]" style={{ background: "linear-gradient(180deg, #000118 0%, #100043 100%)" }}>
                                <h3
                                  className="font-extrabold text-xs leading-tight tracking-[-0.48px] mb-1"
                                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#FFB800" }}
                                >
                                  {card.titulo || `Información ${index + 1}`}
                                </h3>
                                <p className="text-xs leading-relaxed" style={{ color: "#CCC3D4" }}>
                                  {renderDescripcion(
                                    card.descripcion || "Descripción del contenido de este punto informativo.",
                                    card.palabra,
                                    card.enlace
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tab: Galería */}
                      {activeTab === "gallery" && sectionsVisibility.galeria && (
                        <div
                          className="rounded-[20px] overflow-hidden p-4"
                          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(16,0,67,0.3) 62.02%)" }}
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { url: data.galeria.public_image2 || "/blog/blog-10.webp", alt: data.galeria.alt_image2 || "Imagen 1" },
                              { url: data.galeria.public_image3 || "/blog/blog-1.webp",  alt: data.galeria.alt_image3 || "Imagen 2" },
                            ].map((image, index) => (
                              <div key={index} className="overflow-hidden rounded-[14px]">
                                <img
                                  src={image.url}
                                  alt={image.alt}
                                  className="w-full h-[110px] object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-4">
                        <div
                          className="relative rounded-[14px] overflow-hidden"
                          style={{
                            background: "linear-gradient(180deg, rgba(16,0,67,0.54) 0%, rgba(8,1,46,0.54) 50%, rgba(19,0,73,0.54) 100%)",
                            border: "1px solid #000000",
                          }}
                        >
                          <div className="h-[6px] w-full" style={{ background: "linear-gradient(90deg, #FFCA3A 0%, #FFAC00 100%)" }} />
                          <div className="px-4 py-4 text-center">
                            <h3
                              className="font-bold text-xs leading-tight mb-1"
                              style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#FFB800" }}
                            >
                              Contáctanos Para Más Información
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: "#CCC3D4" }}>
                              Nuestro equipo está listo para ayudarte.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Formularios de edición */}
              {renderEditForms()}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${className}`}>
        {/* Controles de secciones - por encima de todo */}
        <div className="w-full mb-6">{renderSectionControls()}</div>

        {/* Layout principal: Preview (izquierda) + Forms (derecha) con anchos fijos */}
        <div className={containerClass}>
          <div className="flex gap-6 justify-center">
            {/* Columna IZQUIERDA: Preview con Header + Tabs */}
            <div className={mergedStyles.previewArea}>
              <div className="sticky top-4">
                {/* Header con controles */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{data.header.fecha}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Bookmark className="w-5 h-5 text-teal-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Share2 className="w-5 h-5 text-teal-600" />
                    </button>
                  </div>
                </div>

                {/* Imagen de header */}
                {renderHeaderSection()}

                {/* Descripción */}
                <div className="bg-white px-6 py-5 text-base text-gray-700 leading-relaxed">
                  {renderDescripcion(
                    data.header.descripcion,
                    data.header.palabra,
                    data.header.enlace
                  )}
                </div>

                {/* Tabs navigation */}
                <div className={`${mergedStyles.tabsContainer} bg-white px-6`}>
                  {["info", "tips", "gallery"]
                    .filter((tab) => {
                      if (tab === "tips") return sectionsVisibility.consejos;
                      if (tab === "info") return sectionsVisibility.informacion;
                      if (tab === "gallery") return sectionsVisibility.galeria;
                      return true;
                    })
                    .map((tab) => (
                      <button
                        key={tab}
                        className={
                          activeTab === tab
                            ? mergedStyles.activeTab
                            : mergedStyles.inactiveTab
                        }
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === "tips" && "Consejos"}
                        {tab === "info" && "Información"}
                        {tab === "gallery" && "Galería"}
                      </button>
                    ))}
                </div>

                {/* Tabs content - sin límite de altura */}
                <div className="bg-white rounded-b-lg shadow-sm">
                  <div className="p-6">
                    {activeTab === "tips" && sectionsVisibility.consejos && (
                      <div key="tips-content">{renderConsejosSection()}</div>
                    )}
                    {activeTab === "info" && sectionsVisibility.informacion && (
                      <div key="info-content">{renderInformacionSection()}</div>
                    )}
                    {activeTab === "gallery" && sectionsVisibility.galeria && (
                      <div key="gallery-content">{renderGaleriaSection()}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna DERECHA: Formularios de edición */}
            {renderEditForms()}
          </div>
        </div>
      </div>
    );
  };

  // Validar datos iniciales (especialmente importante en modo edición)
  useEffect(() => {
    if (!finalValidationConfig) return;

    const initialValidations = {};

    // Función inline para validar (evita dependencia circular)
    const validateFieldInline = (fieldName, value, section = null) => {
      const validationKey = section ? `${section}.${fieldName}` : fieldName;
      const config =
        finalValidationConfig[validationKey] ||
        finalValidationConfig[fieldName];

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
        return {
          isValid: false,
          message: `Debe tener entre ${config.min} y ${config.max} caracteres`,
        };
      }

      if (config.max && trimmedValue.length > config.max) {
        return {
          isValid: false,
          message: `Debe tener entre ${config.min || 0} y ${config.max
            } caracteres`,
        };
      }

      return {
        isValid: true,
        message: `${trimmedValue.length}/${config.max} caracteres`,
      };
    };

    // ===== VALIDAR CAMPOS DE HEADER =====
    if (formEncabezadoBody) {
      const headerFields = [
        "titulo",
        "descripcion",
        "titulo_tarjeta",
        "titulo_consejos",
        "alt_image1",
        "title_image1",
      ];

      headerFields.forEach((fieldName) => {
        const value = formEncabezadoBody[fieldName] || "";
        const validation = validateFieldInline(fieldName, value);
        initialValidations[fieldName] = validation;
      });
    }

    // ===== VALIDAR CAMPOS DE CONSEJOS =====
    if (Array.isArray(formCommendBody) && sectionsVisibility.consejos) {
      formCommendBody.forEach((consejo, index) => {
        const validation = validateFieldInline(
          "texto",
          consejo.texto || "",
          "consejos"
        );
        initialValidations[`consejos.${index}.texto`] = validation;
      });
    }

    // ===== VALIDAR CAMPOS DE GALERÍA =====
    if (formGaleryBody && sectionsVisibility.galeria) {
      const galeriaFields = [
        "alt_image2",
        "title_image2",
        "alt_image3",
        "title_image3",
      ];

      galeriaFields.forEach((fieldName) => {
        const value = formGaleryBody[fieldName] || "";
        const validation = validateFieldInline(fieldName, value, "galeria");
        initialValidations[`galeria.${fieldName}`] = validation;
      });
    }

    // ===== VALIDAR CAMPOS DE INFORMACIÓN/TARJETAS =====
    if (formInfoBody && sectionsVisibility.informacion) {
      formInfoBody.forEach((tarjeta, index) => {
        const infoFields = ["titulo", "descripcion", "palabra"];

        infoFields.forEach((fieldName) => {
          const value = tarjeta[fieldName] || "";
          const validation = validateFieldInline(
            fieldName,
            value,
            "informacion"
          );
          initialValidations[`informacion.${index}.${fieldName}`] = validation;
        });
      });
    }

    setFieldValidations((prev) => ({ ...prev, ...initialValidations }));
  }, [
    formEncabezadoBody?.titulo,
    formEncabezadoBody?.descripcion,
    formEncabezadoBody?.titulo_tarjeta,
    formEncabezadoBody?.titulo_consejos,
    formEncabezadoBody?.alt_image1,
    formEncabezadoBody?.title_image1,
    formCommendBody,
    formGaleryBody?.alt_image2,
    formGaleryBody?.title_image2,
    formGaleryBody?.alt_image3,
    formGaleryBody?.title_image3,
    formInfoBody,
    sectionsVisibility.consejos,
    sectionsVisibility.galeria,
    sectionsVisibility.informacion,
    finalValidationConfig,
    plantillaId,
  ]);

  // Validación unificada - compatible con setValidacionBody original
  useEffect(() => {
    const allValidations = Object.values(fieldValidations);

    // En modo edición, considerar válido si no hay validaciones específicas pero hay datos requeridos
    if (
      mode === "edit" &&
      allValidations.length === 0 &&
      formEncabezadoBody?.titulo
    ) {
      const isValid = true;
      setValidacionBody?.(isValid);
      onValidationChange?.(isValid);
      return;
    }

    const isFormValid =
      allValidations.length > 0 && allValidations.every((v) => v.isValid);

    // Usar el setter original para mantener compatibilidad
    setValidacionBody?.(isFormValid);

    // Notificar al componente padre si existe callback
    onValidationChange?.(isFormValid);

    // Debug validación
  }, [
    fieldValidations,
    onValidationChange,
    setValidacionBody,
    mode,
    formEncabezadoBody?.titulo,
  ]);

  return renderMainContent();
}

