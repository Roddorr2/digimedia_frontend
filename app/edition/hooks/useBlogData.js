// hooks/useBlogData.js - Hook centralizado para manejar estado del blog
import { useState, useEffect, useCallback } from "react";
import { getCookie } from "cookies-next";
import Api from "../services/api";
import Cloud from "../services/cloud";
import { getCurrentDate } from "../utils";
import {
  getPlantillaConfig,
  PLANTILLA_IDS,
  DEFAULT_SERVICIOS,
} from "../config/index";

// ========== HELPER FUNCTIONS ==========
/**
 * Extrae el path relativo de una URL completa
 * Ej: "http://localhost:8000/storage/images/..." → "/storage/images/..."
 */
function extractRelativePath(fullUrl) {
  if (!fullUrl) return "";
  if (fullUrl.startsWith("/")) return fullUrl; // Ya es un path relativo

  try {
    const url = new URL(fullUrl);
    return url.pathname; // Extrae solo el path sin dominio
  } catch (error) {
    console.warn("⚠️ Error extrayendo path relativo de:", fullUrl, error);
    return fullUrl; // Fallback: retornar la URL original
  }
}

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

  // Header (formEncabezadoHeader + formImagenHeader) - Compatible con blog_heads
  const [formEncabezadoHeader, setFormEncabezadoHeader] = useState({
    titulo: "Ingrese el título aquí",
    texto_frase: "Ingrese una frase aquí",
    texto_descripcion: "Ingrese una descripción aquí",
    meta_title: "",
    meta_descripcion: "",
  });

  const [formImagenHeader, setFormImagenHeader] = useState({
    public_image: "/blog/fondo_blog_extend.webp", // Imagen por defecto
    url_image: "",
    alt: "",
    title: "",
  });

  // Body (formEncabezadoBody + formCommendBody + formGaleryBody + formInfoBody)
  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "Título del Blog", // Valor por defecto requerido
    descripcion: "Descripción del blog",
    fecha: getCurrentDate(),
    alt_image1: "",
    title_image1: "",
    public_image1: "/blog/blog-4.webp", // Imagen por defecto
    url_image1: "", // Campo requerido por el backend
    // Campos de control dinámico según especificaciones de blog_body
    flag_galeria: true, // Control de visibilidad de galería
    flag_consejos: true, // Control de visibilidad de consejos
    flag_informacion: true, // Control de visibilidad de información
    service_url: "", // URL del servicio seleccionado
  });

  const [formCommendBody, setFormCommendBody] = useState({
    titulo: "",
    texto1: "",
    texto2: "",
    texto3: "",
    texto4: "",
    texto5: "",
  });

  const [formGaleryBody, setFormGaleryBody] = useState({
    public_image2: "/blog/blog-10.webp", // Imagen por defecto
    public_image3: "/blog/blog-1.webp", // Imagen por defecto
    url_image2: "", // Campo requerido por el backend
    url_image3: "", // Campo requerido por el backend
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
    titulo: "Footer", // Valor por defecto requerido
    descripcion: "Footer descripción", // Valor por defecto requerido
    estado: false, // Control de visibilidad del Footer
    alt_image1: "",
    title_image1: "",
    alt_image2: "",
    title_image2: "",
    alt_image3: "",
    title_image3: "",
  });

  const [formImagenFooter, setFormImagenFooter] = useState({
    public_image1: "/blog/blog-10.webp", // Imagen por defecto requerida
    public_image2: "/blog/blog-1.webp", // Imagen por defecto requerida
    public_image3: "/blog/blog-2.webp", // Imagen por defecto requerida
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

  // ========== ESTADO PARA CARDID (REQUERIDO PARA SUBIR IMÁGENES) ==========
  const [cardId, setCardId] = useState(null);

  // ========== FUNCIÓN HELPER PARA LIMPIAR BLOB URLS ==========
  const cleanupBlobUrls = useCallback(() => {
    // Limpiar URLs blob temporales para evitar memory leaks
    [
      formImagenHeader.public_image,
      formEncabezadoBody.public_image1,
      formGaleryBody.public_image2,
      formGaleryBody.public_image3,
      formImagenFooter.public_image1,
      formImagenFooter.public_image2,
      formImagenFooter.public_image3,
    ].forEach((url) => {
      if (url && url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
  }, [
    formImagenHeader.public_image,
    formEncabezadoBody.public_image1,
    formGaleryBody.public_image2,
    formGaleryBody.public_image3,
    formImagenFooter.public_image1,
    formImagenFooter.public_image2,
    formImagenFooter.public_image3,
  ]);

  // ========== COMPUTED VALUES ==========
  const isFormValid = validacionHeader && validacionBody && validacionFooter;
  const isCreateMode = mode === "create";
  const isEditMode = mode === "edit";

  // ========== FUNCIÓN HELPER PARA OBTENER ID_EMPLEADO ==========
  const getEmpleadoId = useCallback(() => {
    try {
      const empleadoCookie = getCookie("empleado");
      if (empleadoCookie) {
        const empleadoData = JSON.parse(empleadoCookie);
        return empleadoData.id_empleado || 1;
      }
      return 1; // Fallback por defecto
    } catch (error) {
      console.warn("⚠️ Error al obtener id_empleado de cookie:", error);
      return 1; // Fallback por defecto
    }
  }, []);

  // ========== FUNCIONES DE CARGA (MODO EDICIÓN) ==========
  const fetchBlogData = useCallback(async () => {
    if (!blogId || isCreateMode) return;

    try {
      setLoading(true);
      setError(null);

      // Cargar datos en paralelo para mejor performance
      const [
        blogResponse,
        headerResponse,
        bodyResponse,
        footerResponse,
        cardsResponse,
      ] = await Promise.all([
        Api.getBlogById(blogId),
        Api.getHeader(blogId).catch(() => null),
        Api.getBody(blogId).catch(() => null),
        Api.getFooter(blogId).catch(() => null),
        Api.getCards().catch(() => []), // Obtener cards para encontrar el cardId
      ]);

      // Mapear datos del blog principal - Compatible con blog_heads
      if (blogResponse) {
        // Mantener compatibilidad con estructura existente
        setFormEncabezadoHeader((prev) => ({
          ...prev,
          ...blogResponse,
        }));
      }

      // Buscar y establecer cardId para poder subir imágenes en modo edición
      if (cardsResponse && Array.isArray(cardsResponse)) {
        const associatedCard = cardsResponse.find(
          (card) => card.id_blog == blogId
        );
        if (associatedCard) {
          setCardId(associatedCard.id_card);
        } else {
          console.warn("⚠️ No se encontró card asociado al blog", blogId);
        }
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

  // ========== FUNCIONES DE IMÁGENES ==========
  const uploadImage = useCallback(async (file, ruta, name = null) => {
    try {
      if (!file) {
        console.warn("⚠️ No se proporcionó archivo para subir");
        return { url: "", public_url: "" };
      }

      const formData = new FormData();
      formData.append("file", file); // Usar "file" como en el servicio original
      if (name) formData.append("name", name);

      const result = await Cloud.uploadImage(formData, ruta);

      // Manejar la respuesta similar a SaveImage original
      if (result === undefined || result === null) {
        return { url: "ok", public_url: "ok" };
      }

      let jsonData = null;

      if (typeof result === "string") {
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            jsonData = JSON.parse(jsonMatch[0]);
          } catch (parseError) {
            console.warn("⚠️ Error al parsear JSON de respuesta string");
            if (
              result.toLowerCase().includes("success") ||
              result.includes("200")
            ) {
              return { url: "ok", public_url: "ok" };
            }
          }
        } else {
          if (
            result.toLowerCase().includes("success") ||
            result.includes("200")
          ) {
            return { url: "ok", public_url: "ok" };
          }
        }
      } else if (result?.data) {
        if (typeof result.data === "string") {
          const jsonMatch = result.data.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              jsonData = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
              console.warn("⚠️ Error al parsear JSON de data");
            }
          }
        } else {
          jsonData = result.data;
        }
      } else if (typeof result === "object") {
        jsonData = result;
      }

      // Verificar éxito por diferentes criterios
      const isSuccess =
        jsonData?.status === 200 ||
        jsonData?.status === "200" ||
        jsonData?.success === true ||
        jsonData?.message?.toLowerCase().includes("success") ||
        jsonData?.message?.includes("guardado") ||
        jsonData?.message?.includes("subido") ||
        (result && typeof result === "object" && !jsonData?.error);

      if (isSuccess) {
        // Devolver la URL de la imagen si está disponible
        return {
          url:
            jsonData?.url ||
            jsonData?.public_url ||
            jsonData?.image_url ||
            "ok",
          public_url:
            jsonData?.public_url ||
            jsonData?.url ||
            jsonData?.image_url ||
            "ok",
          ...jsonData,
        };
      }

      // Si llegamos aquí y no hay error explícito, considerar éxito
      if (
        !jsonData?.error &&
        !jsonData?.message?.toLowerCase().includes("error")
      ) {
        return { url: "ok", public_url: "ok" };
      }

      // Solo lanzar error si hay indicadores claros de fallo
      const errorMessage =
        jsonData?.message ||
        jsonData?.error ||
        "Error desconocido en el servidor";
      console.error("❌ Error al subir imagen:", errorMessage);
      throw new Error(`Error al subir imagen: ${errorMessage}`);
    } catch (err) {
      console.error("❌ Error en uploadImage:", {
        error: err.message,
        ruta,
        name,
        file: file ? file.name : "no file",
      });

      // Si el error es de red o de parsing, pero no del servidor, podríamos asumir éxito
      if (err.message.includes("JSON") || err.message.includes("undefined")) {
        return { url: "ok", public_url: "ok" };
      }

      setError("No se pudo subir la imagen");
      throw err;
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

  // Función específica para subir imágenes via CardController
  const uploadImageViaCard = useCallback(
    async (file, type, imageName = null) => {
      if (!cardId) {
        console.warn("⚠️ No hay cardId disponible para subir imagen");
        return null;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        if (imageName) {
          formData.append("name", imageName);
        }

        let result;
        switch (type) {
          case "header":
            result = await Cloud.uploadCardHeaderImage(cardId, formData);
            break;
          case "body":
            result = await Cloud.uploadCardBodyImage(cardId, formData);
            break;
          case "footer":
            result = await Cloud.uploadCardFooterImage(cardId, formData);
            break;
          default:
            throw new Error(`Tipo de imagen no válido: ${type}`);
        }

        // El backend devuelve las URLs actualizadas después de subir a Cloudinary
        // CORRECCIÓN: CardController backend tiene:
        // - public_image = URL completa (http://localhost:8000/storage/...)
        // - url_image = path relativo (/storage/...)
        // Pero necesitamos usar url_image (URL completa) para mostrar
        console.log(`🔍 Respuesta del CardController para ${type}:`, result);
        return result;
      } catch (err) {
        console.error(
          `❌ Error subiendo imagen ${type} via CardController:`,
          err
        );
        throw err;
      }
    },
    [cardId]
  );

  // Función para crear Card (separada para mayor control)
  const saveCard = useCallback(
    async (blogId) => {
      try {
        const empleadoId = getEmpleadoId();

        const cardData = {
          id_blog: blogId,
          titulo: formEncabezadoHeader.titulo || "Blog Card",
          descripcion: formEncabezadoBody.descripcion || "Descripción del blog",
          public_image:
            formImagenHeader.public_image || "/blog/fondo_blog_extend.webp",
          url_image: formImagenHeader.url_image || "",
          id_plantilla: plantillaId,
          id_empleado: empleadoId,
        };

        const result = await Api.createCard(cardData);
        const cardId = result?.id || result?.data?.id;

        if (cardId) {
          setCardId(cardId); // Establecer cardId para uso posterior
          return { id: cardId, ...result };
        } else {
          throw new Error("No se pudo obtener el ID de la card creada");
        }
      } catch (err) {
        console.error("❌ Error al crear card:", err);
        console.error("❌ Error response:", err.response?.data);
        throw new Error(`Error al crear card: ${err.message}`);
      }
    },
    [
      formEncabezadoHeader,
      formEncabezadoBody,
      formImagenHeader,
      plantillaId,
      getEmpleadoId,
    ]
  );

  // ========== FUNCIONES DE GUARDADO ==========
  const saveHeader = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (isCreateMode) {
        // MODO CREACIÓN: NO subir imagen aquí - el CardController lo hará después
        const headerData = {
          ...formEncabezadoHeader,
          // Usar valores por defecto - CardController actualizará después
          // NO usar URLs blob temporales en BD
          public_image: formImagenHeader.public_image?.startsWith("blob:")
            ? "/blog/fondo_blog_extend.webp"
            : formImagenHeader.public_image || "/blog/fondo_blog_extend.webp",
          url_image: formImagenHeader.url_image || "",
          alt: formImagenHeader.alt || "",
          title: formImagenHeader.title || "",
        };

        const result = await Api.createHeader(headerData);
        return result;
      } else {
        // MODO EDICIÓN: Preparar datos de imagen sin URLs blob temporales
        let updatedImageData = {
          // NO usar URLs blob temporales en BD, usar URLs reales o por defecto
          public_image: formImagenHeader.public_image?.startsWith("blob:")
            ? "/blog/fondo_blog_extend.webp"
            : formImagenHeader.public_image || "/blog/fondo_blog_extend.webp",
          url_image: formImagenHeader.url_image || "",
          alt: formImagenHeader.alt || "",
          title: formImagenHeader.title || "",
        };

        // Si hay archivo y cardId, subir imagen via CardController
        if (fileHeader && cardId) {
          try {
            const result = await uploadImageViaCard(fileHeader, "header");
            if (result && result.public_image) {
              updatedImageData.public_image = result.public_image;
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen del header:", err);
            // Continuar con la actualización sin imagen
          }
        }

        const headerData = {
          ...formEncabezadoHeader,
          ...updatedImageData,
        };

        const result = await Api.updateHeader(blogId, headerData);
        return result;
      }
    } catch (err) {
      console.error("❌ Error al guardar header:", err);
      console.error("❌ Error response:", err.response?.data);
      setError("No se pudo guardar el header");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [
    formEncabezadoHeader,
    formImagenHeader,
    fileHeader,
    cardId,
    uploadImageViaCard,
    isCreateMode,
    blogId,
  ]);

  const saveBody = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (isCreateMode) {
        // MODO CREACIÓN: Crear consejos y tarjetas primero, luego el body

        // 1. Crear CommendTarjeta (consejos) si hay datos
        let commendTarjetaId = null;
        const hasConsejos =
          formCommendBody?.texto1 ||
          formCommendBody?.texto2 ||
          formCommendBody?.texto3;

        if (hasConsejos) {
          const commendData = {
            titulo: formCommendBody?.titulo || "Consejos",
            texto1: formCommendBody?.texto1 || "",
            texto2: formCommendBody?.texto2 || "",
            texto3: formCommendBody?.texto3 || "",
            texto4: formCommendBody?.texto4 || "",
            texto5: formCommendBody?.texto5 || "",
          };

          const commendResult = await Api.createCommendTarjeta(commendData);
          commendTarjetaId = commendResult?.id || commendResult?.data?.id;
        }

        // 2. Subir imágenes de galería si existen archivos antes de crear el body
        let uploadedGalleryImages = {
          public_image1:
            formEncabezadoBody.public_image1 || "/blog/blog-4.webp",
          public_image2: formGaleryBody.public_image2 || "/blog/blog-10.webp",
          public_image3: formGaleryBody.public_image3 || "/blog/blog-1.webp",
          url_image1: formEncabezadoBody.url_image1 || "",
          url_image2: formGaleryBody.url_image2 || "",
          url_image3: formGaleryBody.url_image3 || "",
        };

        // Subir imagen principal del body si existe archivo
        if (fileBodyHeader) {
          try {
            const headerImageResult = await uploadImage(
              fileBodyHeader,
              "upload_body"
            );
            if (headerImageResult?.url && headerImageResult.url !== "ok") {
              uploadedGalleryImages.public_image1 = headerImageResult.url;
            } else if (
              headerImageResult?.public_url &&
              headerImageResult.public_url !== "ok"
            ) {
              uploadedGalleryImages.public_image1 =
                headerImageResult.public_url;
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen principal del body:", err);
          }
        }

        // Subir imagen 2 de galería si existe archivo
        if (fileBodyFile1) {
          try {
            const galleryImage2Result = await uploadImage(
              fileBodyFile1,
              "upload_gallery"
            );
            if (galleryImage2Result?.url && galleryImage2Result.url !== "ok") {
              uploadedGalleryImages.public_image2 = galleryImage2Result.url;
            } else if (
              galleryImage2Result?.public_url &&
              galleryImage2Result.public_url !== "ok"
            ) {
              uploadedGalleryImages.public_image2 =
                galleryImage2Result.public_url;
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen 2 de galería:", err);
          }
        }

        // Subir imagen 3 de galería si existe archivo
        if (fileBodyFile2) {
          try {
            const galleryImage3Result = await uploadImage(
              fileBodyFile2,
              "upload_gallery"
            );
            if (galleryImage3Result?.url && galleryImage3Result.url !== "ok") {
              uploadedGalleryImages.public_image3 = galleryImage3Result.url;
            } else if (
              galleryImage3Result?.public_url &&
              galleryImage3Result.public_url !== "ok"
            ) {
              uploadedGalleryImages.public_image3 =
                galleryImage3Result.public_url;
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen 3 de galería:", err);
          }
        }

        // 3. Crear Body principal con ID de commend_tarjeta e imágenes subidas

        const bodyData = {
          ...formEncabezadoBody,
          ...formGaleryBody,
          // Usar las imágenes subidas o valores por defecto
          ...uploadedGalleryImages,
          // Filtrar URLs blob temporales para no guardarlas en BD
          public_image1: uploadedGalleryImages.public_image1?.startsWith(
            "blob:"
          )
            ? "/blog/blog-4.webp"
            : uploadedGalleryImages.public_image1,
          public_image2: uploadedGalleryImages.public_image2?.startsWith(
            "blob:"
          )
            ? "/blog/blog-10.webp"
            : uploadedGalleryImages.public_image2,
          public_image3: uploadedGalleryImages.public_image3?.startsWith(
            "blob:"
          )
            ? "/blog/blog-1.webp"
            : uploadedGalleryImages.public_image3,
          // Asegurar que todos los campos requeridos estén presentes
          plantilla_id: plantillaId,
          // Solo incluir id_commend_tarjeta si se creó
          ...(commendTarjetaId && { id_commend_tarjeta: commendTarjetaId }),
        };

        const bodyResult = await Api.createBody(bodyData);
        const bodyId = bodyResult?.id || bodyResult?.data?.id;

        // 3. Crear Tarjetas individuales si hay información y se creó el body
        if (bodyId && formInfoBody && formInfoBody.length > 0) {
          for (const [index, tarjeta] of formInfoBody.entries()) {
            if (tarjeta.titulo || tarjeta.descripcion) {
              const tarjetaData = {
                titulo: tarjeta.titulo || "",
                descripcion: tarjeta.descripcion || "",
                palabra: tarjeta.palabra || null,
                enlace: tarjeta.enlace || null,
                id_blog_body: bodyId,
              };

              try {
                const tarjetaResult = await Api.createTarjeta(tarjetaData);
              } catch (err) {
                console.warn(`⚠️ Error creando tarjeta ${index + 1}:`, err);
              }
            }
          }
        }

        return bodyResult;
      } else {
        // MODO EDICIÓN: Subir imágenes nuevas si existen archivos, luego actualizar datos existentes

        // Subir imágenes nuevas si existen archivos
        let updatedImages = {
          public_image1: formEncabezadoBody.public_image1,
          public_image2: formGaleryBody.public_image2,
          public_image3: formGaleryBody.public_image3,
          url_image1: formEncabezadoBody.url_image1 || "",
          url_image2: formGaleryBody.url_image2 || "",
          url_image3: formGaleryBody.url_image3 || "",
        };

        if (fileBodyHeader) {
          try {
            const headerImageResult = await uploadImage(
              fileBodyHeader,
              "upload_body"
            );
            if (headerImageResult?.url && headerImageResult.url !== "ok") {
              updatedImages.public_image1 = headerImageResult.url;
            } else if (
              headerImageResult?.public_url &&
              headerImageResult.public_url !== "ok"
            ) {
              updatedImages.public_image1 = headerImageResult.public_url;
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen principal en edición:", err);
          }
        }

        if (fileBodyFile1) {
          try {
            const galleryImage2Result = await uploadImage(
              fileBodyFile1,
              "upload_gallery"
            );
            if (galleryImage2Result?.url && galleryImage2Result.url !== "ok") {
              updatedImages.public_image2 = galleryImage2Result.url;
              console.log(
                "✅ Imagen 2 de galería actualizada:",
                updatedImages.public_image2
              );
            } else if (
              galleryImage2Result?.public_url &&
              galleryImage2Result.public_url !== "ok"
            ) {
              updatedImages.public_image2 = galleryImage2Result.public_url;
              console.log(
                "✅ Imagen 2 de galería actualizada:",
                updatedImages.public_image2
              );
            } else {
              console.log(
                "✅ Imagen 2 de galería procesada (sin cambio en edición)"
              );
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen 2 en edición:", err);
          }
        }

        if (fileBodyFile2) {
          try {
            const galleryImage3Result = await uploadImage(
              fileBodyFile2,
              "upload_gallery"
            );
            if (galleryImage3Result?.url && galleryImage3Result.url !== "ok") {
              updatedImages.public_image3 = galleryImage3Result.url;
              console.log(
                "✅ Imagen 3 de galería actualizada:",
                updatedImages.public_image3
              );
            } else if (
              galleryImage3Result?.public_url &&
              galleryImage3Result.public_url !== "ok"
            ) {
              updatedImages.public_image3 = galleryImage3Result.public_url;
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen 3 en edición:", err);
          }
        }

        const bodyData = {
          ...formEncabezadoBody,
          ...formGaleryBody,
          // Filtrar URLs blob temporales de updatedImages
          public_image1: updatedImages.public_image1?.startsWith("blob:")
            ? "/blog/blog-4.webp"
            : updatedImages.public_image1,
          public_image2: updatedImages.public_image2?.startsWith("blob:")
            ? "/blog/blog-10.webp"
            : updatedImages.public_image2,
          public_image3: updatedImages.public_image3?.startsWith("blob:")
            ? "/blog/blog-1.webp"
            : updatedImages.public_image3,
          // Mantener URLs de eliminación
          url_image1: updatedImages.url_image1,
          url_image2: updatedImages.url_image2,
          url_image3: updatedImages.url_image3,
          plantilla_id: plantillaId,
        };

        console.log(
          "📤 Enviando datos del body (edición):",
          JSON.stringify(bodyData, null, 2)
        );

        const result = await Api.updateBody(blogId, bodyData);

        // En modo edición, las tarjetas y consejos se manejan por separado
        // TODO: Implementar actualización de tarjetas y consejos si es necesario

        return result;
      }
    } catch (err) {
      console.error("❌ Error al guardar body:", err);
      console.error("❌ Error response:", err.response?.data);
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
    fileBodyHeader,
    fileBodyFile1,
    fileBodyFile2,
    uploadImage,
    plantillaId,
    isCreateMode,
    blogId,
  ]);

  const saveFooter = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Determinar si el footer está habilitado
      const footerEnabled = formEncabezadoFooter?.estado ?? false;

      if (isCreateMode) {
        // MODO CREACIÓN: NO subir imágenes aquí - el CardController lo hará después
        const footerData = {
          ...formEncabezadoFooter,
          // Usar imágenes por defecto - CardController actualizará después
          public_image1: "/blog/blog-10.webp",
          public_image2: "/blog/blog-1.webp",
          public_image3: "/blog/blog-2.webp",
          // Si el footer está deshabilitado, usar valores por defecto para campos requeridos
          titulo: footerEnabled
            ? formEncabezadoFooter.titulo || "Footer"
            : "Footer",
          descripcion: footerEnabled
            ? formEncabezadoFooter.descripcion || "Footer descripción"
            : "Footer descripción",
        };

        const result = await Api.createFooter(footerData);
        return result;
      } else {
        // MODO EDICIÓN: Subir imágenes si existen archivos, luego actualizar footer
        let updatedFooterImages = {
          // Filtrar URLs blob temporales
          public_image1: formImagenFooter.public_image1?.startsWith("blob:")
            ? "/blog/blog-10.webp"
            : formImagenFooter.public_image1 || "/blog/blog-10.webp",
          public_image2: formImagenFooter.public_image2?.startsWith("blob:")
            ? "/blog/blog-1.webp"
            : formImagenFooter.public_image2 || "/blog/blog-1.webp",
          public_image3: formImagenFooter.public_image3?.startsWith("blob:")
            ? "/blog/blog-2.webp"
            : formImagenFooter.public_image3 || "/blog/blog-2.webp",
        };

        // Subir imágenes via CardController si hay archivos y cardId
        if (cardId && footerEnabled) {
          const imageFiles = [
            { file: fileFooterFile1, name: "image1", key: "public_image1" },
            { file: fileFooterFile2, name: "image2", key: "public_image2" },
            { file: fileFooterFile3, name: "image3", key: "public_image3" },
          ];

          for (const { file, name, key } of imageFiles) {
            if (file) {
              try {
                const result = await uploadImageViaCard(file, "footer", name);
                if (result && result.url) {
                  updatedFooterImages[key] = result.url;
                }
              } catch (err) {
                console.warn(
                  `⚠️ Error subiendo imagen ${name} del footer:`,
                  err
                );
              }
            }
          }
        }

        const footerData = {
          ...formEncabezadoFooter,
          ...updatedFooterImages,
          // Si el footer está deshabilitado, usar valores por defecto para campos requeridos
          titulo: footerEnabled
            ? formEncabezadoFooter.titulo || "Footer"
            : "Footer",
          descripcion: footerEnabled
            ? formEncabezadoFooter.descripcion || "Footer descripción"
            : "Footer descripción",
        };

        console.log(
          "📤 Enviando datos del footer (edición):",
          JSON.stringify(footerData, null, 2)
        );
        const result = await Api.updateFooter(blogId, footerData);
        return result;
      }
    } catch (err) {
      console.error("❌ Error al guardar footer:", err);
      console.error("❌ Error response:", err.response?.data);
      setError("No se pudo guardar el footer");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [
    formEncabezadoFooter,
    formImagenFooter,
    fileFooterFile1,
    fileFooterFile2,
    fileFooterFile3,
    cardId,
    uploadImageViaCard,
    isCreateMode,
    blogId,
  ]);

  // Guardar blog completo - FLUJO CORRECTO SEGÚN BACKEND
  const saveBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (isCreateMode) {
        // MODO CREACIÓN: Flujo correcto según CardController

        // 1. Crear Header SIN imagen (solo datos)

        const headerData = {
          ...formEncabezadoHeader,
          // NO incluir imágenes, usar valores por defecto
          public_image: "/blog/fondo_blog_extend.webp",
          url_image: "",
          alt: formImagenHeader.alt || "",
          title: formImagenHeader.title || "",
        };
        const headerResult = await Api.createHeader(headerData);
        const headerId = headerResult?.id || headerResult?.data?.id;
        if (!headerId) throw new Error("No se pudo crear el header");

        // 2. Crear Body SIN imágenes (crear consejos y tarjetas primero)

        // 2a. Crear CommendTarjeta si hay datos
        let commendTarjetaId = null;
        const hasConsejos =
          formCommendBody?.texto1 ||
          formCommendBody?.texto2 ||
          formCommendBody?.texto3;
        if (hasConsejos) {
          const commendData = {
            titulo: formCommendBody?.titulo || "Consejos",
            texto1: formCommendBody?.texto1 || "",
            texto2: formCommendBody?.texto2 || "",
            texto3: formCommendBody?.texto3 || "",
            texto4: formCommendBody?.texto4 || "",
            texto5: formCommendBody?.texto5 || "",
          };
          const commendResult = await Api.createCommendTarjeta(commendData);
          commendTarjetaId = commendResult?.id || commendResult?.data?.id;
        }

        // 2b. Crear Body principal SIN imágenes
        const bodyData = {
          ...formEncabezadoBody,
          // Usar imágenes por defecto
          public_image1: "/blog/blog-4.webp",
          public_image2: "/blog/blog-10.webp",
          public_image3: "/blog/blog-1.webp",
          url_image1: "",
          url_image2: "",
          url_image3: "",
          plantilla_id: plantillaId,
          ...(commendTarjetaId && { id_commend_tarjeta: commendTarjetaId }),
        };
        const bodyResult = await Api.createBody(bodyData);
        const bodyId = bodyResult?.id || bodyResult?.data?.id;
        if (!bodyId) throw new Error("No se pudo crear el body");

        // 2c. Crear Tarjetas individuales
        if (bodyId && formInfoBody && formInfoBody.length > 0) {
          for (const [index, tarjeta] of formInfoBody.entries()) {
            if (tarjeta.titulo || tarjeta.descripcion) {
              const tarjetaData = {
                titulo: tarjeta.titulo || "",
                descripcion: tarjeta.descripcion || "",
                palabra: tarjeta.palabra || null,
                enlace: tarjeta.enlace || null,
                id_blog_body: bodyId,
              };
              try {
                await Api.createTarjeta(tarjetaData);
              } catch (err) {
                console.warn(`⚠️ Error creando tarjeta ${index + 1}:`, err);
              }
            }
          }
        }

        // 3. Crear Footer SIN imágenes

        const footerEnabled = formEncabezadoFooter?.estado ?? false;
        const footerData = {
          ...formEncabezadoFooter,
          // Usar imágenes por defecto
          public_image1: "/blog/blog-10.webp",
          public_image2: "/blog/blog-1.webp",
          public_image3: "/blog/blog-2.webp",
          titulo: footerEnabled
            ? formEncabezadoFooter.titulo || "Footer"
            : "Footer",
          descripcion: footerEnabled
            ? formEncabezadoFooter.descripcion || "Footer descripción"
            : "Footer descripción",
        };
        const footerResult = await Api.createFooter(footerData);
        const footerId = footerResult?.id || footerResult?.data?.id;
        if (!footerId) throw new Error("No se pudo crear el footer");

        // 4. Crear Blog principal

        const blogData = {
          ...formEncabezadoHeader,
          // Usar imagen por defecto para el blog principal
          public_image: "/blog/fondo_blog_extend.webp",
          url_image: "",
          id_blog_head: headerId,
          id_blog_body: bodyId,
          id_blog_footer: footerId,
          fecha: formEncabezadoBody.fecha || getCurrentDate(),
          plantilla_id: plantillaId,
          service_redirect_url: serviceRedirectUrl,
        };
        const blogResult = await Api.createBlog(blogData);
        const blogId = blogResult?.id || blogResult?.data?.id;
        if (!blogId) throw new Error("No se pudo crear el blog principal");

        // 5. Crear Card (REQUERIDO para poder subir imágenes)

        const cardResult = await saveCard(blogId);
        const cardId = cardResult?.id;
        if (!cardId) throw new Error("No se pudo crear la card");

        // 6. AHORA SÍ subir imágenes usando CardController endpoints
        // Los endpoints CardController suben a Cloudinary Y actualizan la BD automáticamente
        let updatedHeaderData = null;
        let updatedBodyData = null;
        let updatedFooterData = null;

        // 6a. Subir imagen del header si existe
        if (fileHeader) {
          try {
            const formData = new FormData();
            formData.append("file", fileHeader);
            const headerResult = await Cloud.uploadCardHeaderImage(
              cardId,
              formData
            );

            // 🔍 DEBUG: Ver exactamente qué devuelve el CardController
            console.log(
              "🔍 CardController Header Response:",
              JSON.stringify(headerResult, null, 2)
            );

            // Actualizar estado local con URLs reales
            // CORRECCIÓN FINAL: En frontend usamos el PATH RELATIVO para mostrar imágenes
            // CardController: public_image=PATH_RELATIVO, url_image=URL_COMPLETA
            // Frontend: usa public_image (path relativo) para mostrar
            if (
              headerResult?.public_image ||
              headerResult?.url_image ||
              headerResult?.url
            ) {
              // Extraer path relativo de la respuesta del CardController
              const relativePath = extractRelativePath(
                headerResult.public_image ||
                  headerResult.url_image ||
                  headerResult.url
              );

              setFormImagenHeader((prev) => ({
                ...prev,
                // Usar PATH RELATIVO para mostrar
                public_image: relativePath || prev.public_image,
                // Mantener URL completa como referencia opcional
                url_image:
                  headerResult.url_image ||
                  headerResult.public_image ||
                  prev.url_image,
              }));
              updatedHeaderData = headerResult;
              console.log(`✅ Header actualizado con PATH: ${relativePath}`);
            }
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen del header:", err);
          }
        }

        // 6b. Subir imágenes del body si existen
        if (fileBodyHeader) {
          try {
            const formData = new FormData();
            formData.append("file", fileBodyHeader);
            formData.append("name", "image1");
            const bodyResult = await Cloud.uploadCardBodyImage(
              cardId,
              formData
            );

            // 🔍 DEBUG: Ver exactamente qué devuelve el CardController
            console.log(
              "🔍 CardController Body1 Response:",
              JSON.stringify(bodyResult, null, 2)
            );

            // Actualizar estado local con URLs reales
            // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
            if (
              bodyResult?.public_image1 ||
              bodyResult?.url_image1 ||
              bodyResult?.url
            ) {
              // Extraer path relativo de la respuesta del CardController
              const relativePath = extractRelativePath(
                bodyResult.public_image1 ||
                  bodyResult.url_image1 ||
                  bodyResult.url
              );

              setFormEncabezadoBody((prev) => ({
                ...prev,
                // Usar PATH RELATIVO para mostrar
                public_image1: relativePath || prev.public_image1,
                // Mantener URL completa como referencia
                url_image1:
                  bodyResult.url_image1 ||
                  bodyResult.public_image1 ||
                  prev.url_image1,
              }));
              console.log(
                `✅ Body image1 actualizada con PATH: ${relativePath}`
              );
            }
            updatedBodyData = { ...updatedBodyData, ...bodyResult };
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen principal del body:", err);
          }
        }

        if (fileBodyFile1) {
          try {
            const formData = new FormData();
            formData.append("file", fileBodyFile1);
            formData.append("name", "image2");
            const bodyResult = await Cloud.uploadCardBodyImage(
              cardId,
              formData
            );

            // Actualizar estado local con URLs reales
            // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
            if (
              bodyResult?.public_image2 ||
              bodyResult?.url_image2 ||
              bodyResult?.url
            ) {
              // Extraer path relativo de la respuesta del CardController
              const relativePath = extractRelativePath(
                bodyResult.public_image2 ||
                  bodyResult.url_image2 ||
                  bodyResult.url
              );

              setFormGaleryBody((prev) => ({
                ...prev,
                // Usar PATH RELATIVO para mostrar
                public_image2: relativePath || prev.public_image2,
                // Mantener URL completa como referencia
                url_image2:
                  bodyResult.url_image2 ||
                  bodyResult.public_image2 ||
                  prev.url_image2,
              }));
              console.log(
                `✅ Body image2 actualizada con PATH: ${relativePath}`
              );
            }
            updatedBodyData = { ...updatedBodyData, ...bodyResult };
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen 2 del body:", err);
          }
        }

        if (fileBodyFile2) {
          try {
            const formData = new FormData();
            formData.append("file", fileBodyFile2);
            formData.append("name", "image3");
            const bodyResult = await Cloud.uploadCardBodyImage(
              cardId,
              formData
            );

            // Actualizar estado local con URLs reales
            // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
            if (
              bodyResult?.public_image3 ||
              bodyResult?.url_image3 ||
              bodyResult?.url
            ) {
              // Extraer path relativo de la respuesta del CardController
              const relativePath = extractRelativePath(
                bodyResult.public_image3 ||
                  bodyResult.url_image3 ||
                  bodyResult.url
              );

              setFormGaleryBody((prev) => ({
                ...prev,
                // Usar PATH RELATIVO para mostrar
                public_image3: relativePath || prev.public_image3,
                // Mantener URL completa como referencia
                url_image3:
                  bodyResult.url_image3 ||
                  bodyResult.public_image3 ||
                  prev.url_image3,
              }));
              console.log(
                `✅ Body image3 actualizada con PATH: ${relativePath}`
              );
            }
            updatedBodyData = { ...updatedBodyData, ...bodyResult };
          } catch (err) {
            console.warn("⚠️ Error subiendo imagen 3 del body:", err);
          }
        }

        // 6c. Subir imágenes del footer si existen y está habilitado
        if (footerEnabled) {
          if (fileFooterFile1) {
            try {
              const formData = new FormData();
              formData.append("file", fileFooterFile1);
              formData.append("name", "image1");
              const footerResult = await Cloud.uploadCardFooterImage(
                cardId,
                formData
              );

              // Actualizar estado local con URLs reales
              // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
              if (
                footerResult?.public_image1 ||
                footerResult?.url_image1 ||
                footerResult?.url
              ) {
                setFormImagenFooter((prev) => ({
                  ...prev,
                  // Usar PATH RELATIVO para mostrar (viene en public_image1 del backend)
                  public_image1:
                    footerResult.public_image1 ||
                    footerResult.url ||
                    prev.public_image1,
                }));
                console.log(
                  `✅ Footer image1 actualizada con PATH: ${
                    footerResult.public_image1 || footerResult.url
                  }`
                );
              }
              updatedFooterData = { ...updatedFooterData, ...footerResult };
            } catch (err) {
              console.warn("⚠️ Error subiendo imagen 1 del footer:", err);
            }
          }

          if (fileFooterFile2) {
            try {
              const formData = new FormData();
              formData.append("file", fileFooterFile2);
              formData.append("name", "image2");
              const footerResult = await Cloud.uploadCardFooterImage(
                cardId,
                formData
              );

              // Actualizar estado local con URLs reales
              // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
              if (
                footerResult?.public_image2 ||
                footerResult?.url_image2 ||
                footerResult?.url
              ) {
                setFormImagenFooter((prev) => ({
                  ...prev,
                  // Usar PATH RELATIVO para mostrar (viene en public_image2 del backend)
                  public_image2:
                    footerResult.public_image2 ||
                    footerResult.url ||
                    prev.public_image2,
                }));
                console.log(
                  `✅ Footer image2 actualizada con PATH: ${
                    footerResult.public_image2 || footerResult.url
                  }`
                );
              }
              updatedFooterData = { ...updatedFooterData, ...footerResult };
            } catch (err) {
              console.warn("⚠️ Error subiendo imagen 2 del footer:", err);
            }
          }

          if (fileFooterFile3) {
            try {
              const formData = new FormData();
              formData.append("file", fileFooterFile3);
              formData.append("name", "image3");
              const footerResult = await Cloud.uploadCardFooterImage(
                cardId,
                formData
              );

              // Actualizar estado local con URLs reales
              // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
              if (
                footerResult?.public_image3 ||
                footerResult?.url_image3 ||
                footerResult?.url
              ) {
                setFormImagenFooter((prev) => ({
                  ...prev,
                  // Usar PATH RELATIVO para mostrar (viene en public_image3 del backend)
                  public_image3:
                    footerResult.public_image3 ||
                    footerResult.url ||
                    prev.public_image3,
                }));
                console.log(
                  `✅ Footer image3 actualizada con PATH: ${
                    footerResult.public_image3 || footerResult.url
                  }`
                );
              }
              updatedFooterData = { ...updatedFooterData, ...footerResult };
            } catch (err) {
              console.warn("⚠️ Error subiendo imagen 3 del footer:", err);
            }
          }
        }

        // 7. Limpiar archivos después de subir exitosamente
        setFileHeader(null);
        setFileBodyHeader(null);
        setFileBodyFile1(null);
        setFileBodyFile2(null);
        setFileFooterFile1(null);
        setFileFooterFile2(null);
        setFileFooterFile3(null);

        console.log(
          "🎉 Blog creado exitosamente con ID:",
          blogId,
          "y Card ID:",
          cardId
        );
        setIsDirty(false);
        return { ...blogResult, cardId };
      } else {
        // MODO EDICIÓN: Actualizar componentes existentes y manejar imágenes nuevas

        // Primero, subir imágenes nuevas si existen (usando cardId existente)
        if (
          fileHeader ||
          fileBodyHeader ||
          fileBodyFile1 ||
          fileBodyFile2 ||
          fileFooterFile1 ||
          fileFooterFile2 ||
          fileFooterFile3
        ) {
          // Obtener cardId del blog existente
          const cardsResponse = await Api.getCards();
          const existingCard = cardsResponse?.find(
            (card) => card.id_blog == blogId
          );

          if (existingCard?.id_card) {
            setCardId(existingCard.id_card);

            // Subir imágenes nuevas usando el mismo flujo que creación
            if (fileHeader) {
              try {
                const formData = new FormData();
                formData.append("file", fileHeader);
                const headerResult = await Cloud.uploadCardHeaderImage(
                  existingCard.id_card,
                  formData
                );

                // NOTA: CardController corregido - usamos campos correctos
                if (
                  headerResult?.public_image ||
                  headerResult?.url_image ||
                  headerResult?.url
                ) {
                  setFormImagenHeader((prev) => ({
                    ...prev,
                    // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                    public_image:
                      headerResult.public_image ||
                      headerResult.url ||
                      prev.public_image,
                    // Mantener URL completa como referencia
                    url_image: headerResult.url_image || prev.url_image,
                  }));
                  console.log(
                    `✅ Header edición actualizado con PATH: ${
                      headerResult.public_image || headerResult.url
                    }`
                  );
                }
              } catch (err) {
                console.warn("⚠️ Error actualizando imagen del header:", err);
              }
            }

            // Subir imágenes del body si existen
            if (fileBodyHeader) {
              try {
                const formData = new FormData();
                formData.append("file", fileBodyHeader);
                formData.append("name", "image1");
                const bodyResult = await Cloud.uploadCardBodyImage(
                  existingCard.id_card,
                  formData
                );

                // NOTA: CardController corregido - usamos campos correctos
                if (bodyResult?.public_image1 || bodyResult?.url) {
                  setFormEncabezadoBody((prev) => ({
                    ...prev,
                    // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                    public_image1:
                      bodyResult.public_image1 ||
                      bodyResult.url ||
                      prev.public_image1,
                    // Mantener URL completa como referencia
                    url_image1: bodyResult.url_image1 || prev.url_image1,
                  }));
                  console.log(
                    `✅ Body edición image1 actualizada: ${
                      bodyResult.public_image1 || bodyResult.url
                    }`
                  );
                }
              } catch (err) {
                console.warn(
                  "⚠️ Error actualizando imagen principal del body:",
                  err
                );
              }
            }

            if (fileBodyFile1) {
              try {
                const formData = new FormData();
                formData.append("file", fileBodyFile1);
                formData.append("name", "image2");
                const bodyResult = await Cloud.uploadCardBodyImage(
                  existingCard.id_card,
                  formData
                );

                // NOTA: CardController corregido - usamos campos correctos
                if (bodyResult?.public_image2 || bodyResult?.url) {
                  setFormGaleryBody((prev) => ({
                    ...prev,
                    // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                    public_image2:
                      bodyResult.public_image2 ||
                      bodyResult.url ||
                      prev.public_image2,
                    // Mantener URL completa como referencia
                    url_image2: bodyResult.url_image2 || prev.url_image2,
                  }));
                  console.log(
                    `✅ Body edición image2 actualizada: ${
                      bodyResult.public_image2 || bodyResult.url
                    }`
                  );
                }
              } catch (err) {
                console.warn("⚠️ Error actualizando imagen 2 del body:", err);
              }
            }

            if (fileBodyFile2) {
              try {
                const formData = new FormData();
                formData.append("file", fileBodyFile2);
                formData.append("name", "image3");
                const bodyResult = await Cloud.uploadCardBodyImage(
                  existingCard.id_card,
                  formData
                );

                // NOTA: CardController corregido - usamos campos correctos
                if (bodyResult?.public_image3 || bodyResult?.url) {
                  setFormGaleryBody((prev) => ({
                    ...prev,
                    // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                    public_image3:
                      bodyResult.public_image3 ||
                      bodyResult.url ||
                      prev.public_image3,
                    // Mantener URL completa como referencia
                    url_image3: bodyResult.url_image3 || prev.url_image3,
                  }));
                  console.log(
                    `✅ Body edición image3 actualizada: ${
                      bodyResult.public_image3 || bodyResult.url
                    }`
                  );
                }
              } catch (err) {
                console.warn("⚠️ Error actualizando imagen 3 del body:", err);
              }
            }

            // Subir imágenes del footer si existen
            const footerEnabled = formEncabezadoFooter?.estado ?? false;
            if (footerEnabled) {
              if (fileFooterFile1) {
                try {
                  const formData = new FormData();
                  formData.append("file", fileFooterFile1);
                  formData.append("name", "image1");
                  const footerResult = await Cloud.uploadCardFooterImage(
                    existingCard.id_card,
                    formData
                  );

                  // NOTA: CardController corregido - usamos campos correctos
                  if (footerResult?.public_image1 || footerResult?.url) {
                    setFormImagenFooter((prev) => ({
                      ...prev,
                      // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                      public_image1:
                        footerResult.public_image1 ||
                        footerResult.url ||
                        prev.public_image1,
                    }));
                    console.log(
                      `✅ Footer edición image1 actualizada: ${
                        footerResult.public_image1 || footerResult.url
                      }`
                    );
                  }
                } catch (err) {
                  console.warn(
                    "⚠️ Error actualizando imagen 1 del footer:",
                    err
                  );
                }
              }

              if (fileFooterFile2) {
                try {
                  const formData = new FormData();
                  formData.append("file", fileFooterFile2);
                  formData.append("name", "image2");
                  const footerResult = await Cloud.uploadCardFooterImage(
                    existingCard.id_card,
                    formData
                  );

                  // NOTA: CardController corregido - usamos campos correctos
                  if (footerResult?.public_image2 || footerResult?.url) {
                    setFormImagenFooter((prev) => ({
                      ...prev,
                      // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                      public_image2:
                        footerResult.public_image2 ||
                        footerResult.url ||
                        prev.public_image2,
                    }));
                    console.log(
                      `✅ Footer edición image2 actualizada: ${
                        footerResult.public_image2 || footerResult.url
                      }`
                    );
                  }
                } catch (err) {
                  console.warn(
                    "⚠️ Error actualizando imagen 2 del footer:",
                    err
                  );
                }
              }

              if (fileFooterFile3) {
                try {
                  const formData = new FormData();
                  formData.append("file", fileFooterFile3);
                  formData.append("name", "image3");
                  const footerResult = await Cloud.uploadCardFooterImage(
                    existingCard.id_card,
                    formData
                  );

                  // NOTA: CardController corregido - usamos campos correctos
                  if (footerResult?.public_image3 || footerResult?.url) {
                    setFormImagenFooter((prev) => ({
                      ...prev,
                      // CORRECCIÓN FINAL: Frontend usa PATH RELATIVO para mostrar
                      public_image3:
                        footerResult.public_image3 ||
                        footerResult.url ||
                        prev.public_image3,
                    }));
                    console.log(
                      `✅ Footer edición image3 actualizada: ${
                        footerResult.public_image3 || footerResult.url
                      }`
                    );
                  }
                } catch (err) {
                  console.warn(
                    "⚠️ Error actualizando imagen 3 del footer:",
                    err
                  );
                }
              }
            }

            // Limpiar archivos después de subir exitosamente
            setFileHeader(null);
            setFileBodyHeader(null);
            setFileBodyFile1(null);
            setFileBodyFile2(null);
            setFileFooterFile1(null);
            setFileFooterFile2(null);
            setFileFooterFile3(null);
          }
        }

        // Luego actualizar los datos en BD (que ya incluyen las URLs actualizadas por CardController)
        await Promise.all([saveHeader(), saveBody(), saveFooter()]);

        const blogData = {
          ...formEncabezadoHeader,
          // Filtrar URLs blob del header para no guardarlas en BD
          ...formImagenHeader,
          public_image: formImagenHeader.public_image?.startsWith("blob:")
            ? "/blog/fondo_blog_extend.webp"
            : formImagenHeader.public_image,
          fecha: formEncabezadoBody.fecha || getCurrentDate(),
          plantilla_id: plantillaId,
          service_redirect_url: serviceRedirectUrl,
        };

        const result = await Api.updateBlog(blogId, blogData);
        setIsDirty(false);
        return result;
      }
    } catch (err) {
      console.error("❌ Error al guardar blog completo:", err);
      setError(`No se pudo guardar el blog: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [
    // Estados de formularios
    formEncabezadoHeader,
    formImagenHeader,
    formEncabezadoBody,
    formGaleryBody,
    formCommendBody,
    formInfoBody,
    formEncabezadoFooter,
    formImagenFooter,
    // Estados de archivos
    fileHeader,
    fileBodyHeader,
    fileBodyFile1,
    fileBodyFile2,
    fileFooterFile1,
    fileFooterFile2,
    fileFooterFile3,
    // Configuración
    plantillaId,
    serviceRedirectUrl,
    isCreateMode,
    blogId,
    // Funciones de guardado (para modo edición)
    saveHeader,
    saveBody,
    saveFooter,
    saveCard,
    // Funciones helper
    getEmpleadoId,
  ]);

  // ========== FUNCIONES DE UTILIDAD ==========
  const resetForm = useCallback(() => {
    // Limpiar URLs blob antes de resetear
    cleanupBlobUrls();
    setFormEncabezadoHeader({
      titulo: "",
      texto_frase: "",
      texto_descripcion: "",
      meta_title: "",
      meta_descripcion: "",
    });

    setFormImagenHeader({
      public_image: "/blog/fondo_blog_extend.webp", // Imagen por defecto
      url_image: "",
      alt: "",
      title: "",
    });

    setFormEncabezadoBody({
      titulo: "Título del Blog", // Valor por defecto requerido
      descripcion: "Descripción del blog",
      fecha: getCurrentDate(),
      alt_image1: "",
      title_image1: "",
      public_image1: "/blog/blog-4.webp", // Imagen por defecto
      url_image1: "",
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
      public_image2: "/blog/blog-10.webp", // Imagen por defecto
      public_image3: "/blog/blog-1.webp", // Imagen por defecto
      url_image2: "",
      url_image3: "",
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
      titulo: "Footer", // Valor por defecto requerido
      descripcion: "Footer descripción", // Valor por defecto requerido
      estado: false,
      alt_image1: "",
      title_image1: "",
      alt_image2: "",
      title_image2: "",
      alt_image3: "",
      title_image3: "",
    });

    setFormImagenFooter({
      public_image1: "/blog/blog-10.webp", // Imagen por defecto requerida
      public_image2: "/blog/blog-1.webp", // Imagen por defecto requerida
      public_image3: "/blog/blog-2.webp", // Imagen por defecto requerida
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

  // ========== LIMPIEZA DE MEMORY LEAKS ==========
  // Limpiar URLs blob al desmontar para evitar memory leaks
  useEffect(() => {
    return () => {
      cleanupBlobUrls();
    };
  }, [cleanupBlobUrls]);

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
    saveCard,
    saveBlog,
    uploadImage,
    uploadImageViaCard,
    deleteImage,
    resetForm,

    // ===== FUNCIONES HELPER =====
    getEmpleadoId,

    // ===== UTILIDADES =====
    setError: (error) => setError(error),
    clearError: () => setError(null),
    setLoading: (loading) => setLoading(loading),
    cleanupBlobUrls,
  };
}
