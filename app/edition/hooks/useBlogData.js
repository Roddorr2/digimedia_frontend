// hooks/useBlogData.js - Hook centralizado para manejar estado del blog
import { useState, useEffect, useCallback } from "react";
import Api from "../services/api";
import Cloud from "../services/cloud";
import { getCurrentDate } from "../utils";
import {
  getPlantillaConfig,
  PLANTILLA_IDS,
  DEFAULT_SERVICIOS,
} from "../config/index";

/**
 * Hook principal para manejar el estado del blog
 * Soporta tanto creación como edición de blogs
 *
 * @param {number} plantillaId - ID de la plantilla (1, 2, 3)
 * @param {string|null} blogId - ID del blog para edición (null para creación)
 * @param {string} mode - Modo: 'create' | 'edit'
 */
export default function useBlogData(
  plantillaId = PLANTILLA_IDS.CLASICA,
  blogId = null,
  mode = "create"
) {
  // ========== CONFIGURACIÓN DINÁMICA ==========
  const plantillaConfig = getPlantillaConfig(plantillaId);

  // ========== ESTADOS BASE ==========
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false); // Indica si hay cambios sin guardar

  // ========== ESTADOS COMPATIBLES CON ESTRUCTURA ORIGINAL ==========
  // Mantener compatibilidad total con FormBody, FormHeader, FormFooter existentes

  // Header (formEncabezadoHeader + formImagenHeader) - Compatible con blog_heads
  const [formEncabezadoHeader, setFormEncabezadoHeader] = useState({
    titulo: "",
    texto_frase: "",
    texto_descripcion: "",
    meta_title: "",
    meta_descripcion: "",
  });

  const [formImagenHeader, setFormImagenHeader] = useState({
    public_image: "",
    alt: "",
    title: "",
  });

  // Body (formEncabezadoBody + formCommendBody + formGaleryBody + formInfoBody)
  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "",
    descripcion: "",
    fecha: getCurrentDate(),
    alt_image1: "",
    title_image1: "",
    public_image1: "",
    // Campos de control dinámico según especificaciones de blog_body
    flag_galeria: true,     // Control de visibilidad de galería
    flag_consejos: true,    // Control de visibilidad de consejos
    flag_informacion: true, // Control de visibilidad de información
    service_url: "",        // URL del servicio seleccionado
  });

  const [formCommendBody, setFormCommendBody] = useState({
    titulo: "", // Para plantilla 2
    texto1: "",
    texto2: "",
    texto3: "",
    texto4: "", // Solo plantilla 2
    texto5: "", // Solo plantilla 2
  });

  const [formGaleryBody, setFormGaleryBody] = useState({
    public_image2: "",
    public_image3: "",
    alt_image2: "",
    alt_image3: "",
    title_image2: "",
    title_image3: "",
  });

  const [formInfoBody, setFormInfoBody] = useState([
    { titulo: "", descripcion: "", palabra: "", enlace: "" },
    { titulo: "", descripcion: "", palabra: "", enlace: "" },
    { titulo: "", descripcion: "", palabra: "", enlace: "" },
    { titulo: "", descripcion: "", palabra: "", enlace: "" },
  ]);

  // Footer (formEncabezadoFooter + formImagenFooter)
  const [formEncabezadoFooter, setFormEncabezadoFooter] = useState({
    titulo: "",
    descripcion: "",
    estado: false, // Control de visibilidad del Footer
    alt_image1: "",
    title_image1: "",
    alt_image2: "",
    title_image2: "",
    alt_image3: "",
    title_image3: "",
  });

  const [formImagenFooter, setFormImagenFooter] = useState({
    public_image1: "",
    public_image2: "",
    public_image3: "",
  });

  // ========== ESTADOS DE ARCHIVOS ==========
  const [fileHeader, setFileHeader] = useState(null);
  const [fileBodyHeader, setFileBodyHeader] = useState(null);
  const [fileBodyFile1, setFileBodyFile1] = useState(null);
  const [fileBodyFile2, setFileBodyFile2] = useState(null);
  const [fileFooterFile1, setFileFooterFile1] = useState(null);
  const [fileFooterFile2, setFileFooterFile2] = useState(null);
  const [fileFooterFile3, setFileFooterFile3] = useState(null);

  // ========== ESTADOS DE VALIDACIÓN ==========
  const [validacionHeader, setValidacionHeader] = useState(false);
  const [validacionBody, setValidacionBody] = useState(false);
  const [validacionFooter, setValidacionFooter] = useState(false);

  // ========== ESTADOS DE SERVICIOS ==========
  const [serviceRedirectUrl, setServiceRedirectUrl] = useState("");

  // ========== COMPUTED VALUES ==========
  const isFormValid = validacionHeader && validacionBody && validacionFooter;
  const isCreateMode = mode === "create";
  const isEditMode = mode === "edit";

  // ========== FUNCIONES DE CARGA (MODO EDICIÓN) ==========
  const fetchBlogData = useCallback(async () => {
    if (!blogId || isCreateMode) return;

    try {
      setLoading(true);
      setError(null);

      // Cargar datos en paralelo para mejor performance
      const [blogResponse, headerResponse, bodyResponse, footerResponse] =
        await Promise.all([
          Api.getBlogById(blogId),
          Api.getHeader(blogId).catch(() => null),
          Api.getBody(blogId).catch(() => null),
          Api.getFooter(blogId).catch(() => null),
        ]);

      // Mapear datos del blog principal - Compatible con blog_heads
      if (blogResponse) {
        // Mantener compatibilidad con estructura existente
        setFormEncabezadoHeader((prev) => ({
          ...prev,
          ...blogResponse,
        }));
      }

      // Mapear header
      if (headerResponse) {
        setFormEncabezadoHeader((prev) => ({ ...prev, ...headerResponse }));
        setFormImagenHeader((prev) => ({ ...prev, ...headerResponse }));
      }

      // Mapear body
      if (bodyResponse) {
        setFormEncabezadoBody((prev) => ({ ...prev, ...bodyResponse }));
        setFormGaleryBody((prev) => ({ ...prev, ...bodyResponse }));

        // Mapear consejos según plantilla
        const consejos = {
          titulo: bodyResponse.titulo_consejos || "",
          texto1: bodyResponse.texto1 || "",
          texto2: bodyResponse.texto2 || "",
          texto3: bodyResponse.texto3 || "",
        };

        // Plantilla 2 tiene consejos adicionales
        if (plantillaId === 2) {
          consejos.texto4 = bodyResponse.texto4 || "";
          consejos.texto5 = bodyResponse.texto5 || "";
        }

        setFormCommendBody(consejos);

        // Mapear información (tarjetas)
        if (
          bodyResponse.informacion &&
          Array.isArray(bodyResponse.informacion)
        ) {
          setFormInfoBody(bodyResponse.informacion);
        }
      }

      // Mapear footer
      if (footerResponse) {
        setFormEncabezadoFooter((prev) => ({ ...prev, ...footerResponse }));
        setFormImagenFooter((prev) => ({ ...prev, ...footerResponse }));
      }

      setIsDirty(false);
    } catch (err) {
      console.error("Error al cargar blog:", err);
      setError("No se pudo cargar el blog");
    } finally {
      setLoading(false);
    }
  }, [blogId, isCreateMode, plantillaId]);

  // Cargar datos al montar o cambiar blogId
  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  // ========== FUNCIONES DE GUARDADO ==========
  const saveHeader = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headerData = {
        ...formEncabezadoHeader,
        ...formImagenHeader,
      };

      let result;
      if (isCreateMode || !blogId) {
        result = await Api.createHeader(headerData);
      } else {
        result = await Api.updateHeader(blogId, headerData);
      }

      return result;
    } catch (err) {
      console.error("Error al guardar header:", err);
      setError("No se pudo guardar el header");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formEncabezadoHeader, formImagenHeader, isCreateMode, blogId]);

  const saveBody = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const bodyData = {
        ...formEncabezadoBody,
        ...formGaleryBody,
        ...formCommendBody,
        informacion: formInfoBody,
        plantilla_id: plantillaId,
      };

      let result;
      if (isCreateMode || !blogId) {
        result = await Api.createBody(bodyData);
      } else {
        result = await Api.updateBody(blogId, bodyData);
      }

      return result;
    } catch (err) {
      console.error("Error al guardar body:", err);
      setError("No se pudo guardar el body");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [
    formEncabezadoBody,
    formGaleryBody,
    formCommendBody,
    formInfoBody,
    plantillaId,
    isCreateMode,
    blogId,
  ]);

  const saveFooter = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const footerData = {
        ...formEncabezadoFooter,
        ...formImagenFooter,
      };

      let result;
      if (isCreateMode || !blogId) {
        result = await Api.createFooter(footerData);
      } else {
        result = await Api.updateFooter(blogId, footerData);
      }

      return result;
    } catch (err) {
      console.error("Error al guardar footer:", err);
      setError("No se pudo guardar el footer");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formEncabezadoFooter, formImagenFooter, isCreateMode, blogId]);

  // Guardar blog completo
  const saveBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const blogData = {
        // Header data
        ...formEncabezadoHeader,
        ...formImagenHeader,

        // Body data
        body: {
          ...formEncabezadoBody,
          ...formGaleryBody,
          ...formCommendBody,
          informacion: formInfoBody,
        },

        // Footer data
        footer: {
          ...formEncabezadoFooter,
          ...formImagenFooter,
        },

        // Meta data
        plantilla_id: plantillaId,
        service_redirect_url: serviceRedirectUrl,
      };

      let result;
      if (isCreateMode) {
        result = await Api.createBlog(blogData);
      } else {
        result = await Api.updateBlog(blogId, blogData);
      }

      setIsDirty(false);
      return result;
    } catch (err) {
      console.error("Error al guardar blog completo:", err);
      setError("No se pudo guardar el blog");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [
    formEncabezadoHeader,
    formImagenHeader,
    formEncabezadoBody,
    formGaleryBody,
    formCommendBody,
    formInfoBody,
    formEncabezadoFooter,
    formImagenFooter,
    plantillaId,
    serviceRedirectUrl,
    isCreateMode,
    blogId,
  ]);

  // ========== FUNCIONES DE IMÁGENES ==========
  const uploadImage = useCallback(async (file, ruta) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", file);

      const result = await Cloud.uploadImage(formData, ruta);
      return result;
    } catch (err) {
      console.error("Error al subir imagen:", err);
      setError("No se pudo subir la imagen");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteImage = useCallback(async (publicId) => {
    try {
      setLoading(true);
      await Cloud.deleteImage(publicId);
    } catch (err) {
      console.error("Error al eliminar imagen:", err);
      setError("No se pudo eliminar la imagen");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ========== FUNCIONES DE UTILIDAD ==========
  const resetForm = useCallback(() => {
    setFormEncabezadoHeader({
      titulo: "",
      texto_frase: "",
      texto_descripcion: "",
      meta_title: "",
      meta_descripcion: "",
    });

    setFormImagenHeader({
      public_image: "",
      alt: "",
      title: "",
    });

    setFormEncabezadoBody({
      titulo: "",
      descripcion: "",
      fecha: getCurrentDate(),
      alt_image1: "",
      title_image1: "",
      public_image1: "",
    });

    setFormCommendBody({
      titulo: "",
      texto1: "",
      texto2: "",
      texto3: "",
      texto4: "",
      texto5: "",
    });

    setFormGaleryBody({
      public_image2: "",
      public_image3: "",
      alt_image2: "",
      alt_image3: "",
      title_image2: "",
      title_image3: "",
    });

    setFormInfoBody([
      { titulo: "", descripcion: "", palabra: "", enlace: "" },
      { titulo: "", descripcion: "", palabra: "", enlace: "" },
      { titulo: "", descripcion: "", palabra: "", enlace: "" },
      { titulo: "", descripcion: "", palabra: "", enlace: "" },
    ]);

    setFormEncabezadoFooter({
      titulo: "",
      descripcion: "",
      alt_image1: "",
      title_image1: "",
      alt_image2: "",
      title_image2: "",
      alt_image3: "",
      title_image3: "",
    });

    setFormImagenFooter({
      public_image1: "",
      public_image2: "",
      public_image3: "",
    });

    // Reset files
    setFileHeader(null);
    setFileBodyHeader(null);
    setFileBodyFile1(null);
    setFileBodyFile2(null);
    setFileFooterFile1(null);
    setFileFooterFile2(null);
    setFileFooterFile3(null);

    // Reset validation
    setValidacionHeader(false);
    setValidacionBody(false);
    setValidacionFooter(false);

    setServiceRedirectUrl("");
    setIsDirty(false);
    setError(null);
  }, []);

  // Marcar como modificado cuando cambien los datos
  useEffect(() => {
    if (!loading) {
      setIsDirty(true);
    }
  }, [
    formEncabezadoHeader,
    formImagenHeader,
    formEncabezadoBody,
    formCommendBody,
    formGaleryBody,
    formInfoBody,
    formEncabezadoFooter,
    formImagenFooter,
    serviceRedirectUrl,
    loading,
  ]);

  // ========== RETURN DEL HOOK ==========
  return {
    // ===== CONFIGURACIÓN =====
    plantillaConfig,
    plantillaId,
    mode,
    isCreateMode,
    isEditMode,

    // ===== ESTADOS PRINCIPALES =====
    loading,
    error,
    isDirty,
    isFormValid,

    // ===== ESTADOS DE FORMULARIOS (COMPATIBILIDAD TOTAL) =====
    // Header
    formEncabezadoHeader,
    setFormEncabezadoHeader,
    formImagenHeader,
    setFormImagenHeader,

    // Body
    formEncabezadoBody,
    setFormEncabezadoBody,
    formCommendBody,
    setFormCommendBody,
    formGaleryBody,
    setFormGaleryBody,
    formInfoBody,
    setFormInfoBody,

    // Footer
    formEncabezadoFooter,
    setFormEncabezadoFooter,
    formImagenFooter,
    setFormImagenFooter,

    // ===== ESTADOS DE ARCHIVOS =====
    fileHeader,
    setFileHeader,
    fileBodyHeader,
    setFileBodyHeader,
    fileBodyFile1,
    setFileBodyFile1,
    fileBodyFile2,
    setFileBodyFile2,
    fileFooterFile1,
    setFileFooterFile1,
    fileFooterFile2,
    setFileFooterFile2,
    fileFooterFile3,
    setFileFooterFile3,

    // ===== ESTADOS DE VALIDACIÓN =====
    validacionHeader,
    setValidacionHeader,
    validacionBody,
    setValidacionBody,
    validacionFooter,
    setValidacionFooter,

    // ===== SERVICIOS =====
    serviceRedirectUrl,
    setServiceRedirectUrl,
    servicios: DEFAULT_SERVICIOS,

    // ===== ACCIONES =====
    fetchBlogData,
    saveHeader,
    saveBody,
    saveFooter,
    saveBlog,
    uploadImage,
    deleteImage,
    resetForm,

    // ===== UTILIDADES =====
    setError: (error) => setError(error),
    clearError: () => setError(null),
    setLoading: (loading) => setLoading(loading),
  };
}
