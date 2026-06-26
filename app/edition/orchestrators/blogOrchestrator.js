import * as API from "../services/api";
import Cloud from "../services/cloud";
import { mapConsejos, mapTarjetas } from "../mappers/blogMappers";
import { getCurrentDate } from "../utils";
import {
  DEFAULT_IMAGES,
  HEADER_DEFAULTS,
  BODY_DEFAULTS,
  FOOTER_DEFAULTS,
} from "../constants/defaults";
import { IdCard } from "lucide-react";

/**
 * BlogOrchestrator - Orquesta el flujo completo de creación/edición de blogs
 *
 * Responsabilidades:
 * - Coordinar el orden correcto de creación: Header → Body (Consejos → Tarjetas) → Footer → Blog → Card → Imágenes
 * - Manejar transacciones lógicas (rollback si falla algún paso)
 * - Aplicar lógica de negocio específica según modo (create/edit)
 * - Gestionar subida de imágenes via CardController
 * - ✅ Manejar correctamente los IDs de relaciones (id_blog_head, id_blog_body, id_blog_footer)
 */
class BlogOrchestrator {
  /**
   * Crea un nuevo blog completo siguiendo el flujo correcto del backend
   *
   * @param {Object} params - Parámetros del blog
   * @param {Object} params.headerData - Datos del header (formEncabezadoHeader + formImagenHeader)
   * @param {Object} params.bodyData - Datos del body (formEncabezadoBody + formGaleryBody + formCommendBody + formInfoBody)
   * @param {Object} params.footerData - Datos del footer (formEncabezadoFooter + formImagenFooter)
   * @param {Object} params.files - Archivos de imágenes a subir
   * @param {number} params.plantillaId - ID de la plantilla
   * @param {number} params.empleadoId - ID del empleado
   * @returns {Promise<Object>} Resultado con IDs creados y mensajes
   */
  async createBlog({
    headerData,
    bodyData,
    footerData,
    files,
    plantillaId,
    empleadoId,
    isPublicado,
  }) {
    const result = {
      success: false,
      headerId: null,
      bodyId: null,
      footerId: null,
      blogId: null,
      cardId: null,
      errors: [],
    };

    try {
      const headerPayload = {
        ...headerData.formEncabezadoHeader,
        public_image: DEFAULT_IMAGES.header.image1,
        url_image: "",
        alt: headerData.formImagenHeader.alt || HEADER_DEFAULTS.alt,
        title: headerData.formImagenHeader.title || HEADER_DEFAULTS.title,
        bg_color: headerData.formEncabezadoHeader.bg_color || HEADER_DEFAULTS.bg_color,
        bg_type: headerData.formEncabezadoHeader.bg_type || "solid",
        bg_colors: headerData.formEncabezadoHeader.bg_colors || "",
      };

      const headerResult = await API.default.createHeader(headerPayload);
      result.headerId = headerResult?.id || headerResult?.data?.id;

      if (!result.headerId) {
        throw new Error("No se pudo crear el header - ID no retornado");
      }

      // ========== PASO 2: Crear Body (con consejos y tarjetas) ==========

      // 2a. Crear CommendTarjeta (consejos) si hay datos
      let commendTarjetaId = null;
      const hasConsejos =
      //CAMBIOS REALIZADOS PARA 5 CONSEJOS
        bodyData.formCommendBody?.texto1 ||
        bodyData.formCommendBody?.texto2 ||
        bodyData.formCommendBody?.texto3 ||
        bodyData.formCommendBody?.texto4 ||
        bodyData.formCommendBody?.texto5;;

      if (hasConsejos) {
        const consejosPayload = mapConsejos(
          bodyData.formCommendBody,
          plantillaId
        );

        if (!consejosPayload.titulo || consejosPayload.titulo.trim() === "") {
          consejosPayload.titulo = "Consejos Importantes";
        }

        try {
          const consejosResult = await API.default.createCommendTarjeta(
            consejosPayload
          );
          commendTarjetaId = consejosResult?.id || consejosResult?.data?.id;
        } catch (err) {
          result.errors.push({ step: "consejos", error: err.message });
        }
      }

      // 2b. Crear Body principal SIN imágenes
      const bodyPayload = {
        ...bodyData.formEncabezadoBody,
        ...bodyData.formGaleryBody,
        public_image1: DEFAULT_IMAGES.body.image1,
        public_image2: DEFAULT_IMAGES.body.image2,
        public_image3: DEFAULT_IMAGES.body.image3,
        url_image1: "",
        url_image2: "",
        url_image3: "",
        plantilla_id: plantillaId,
        bg_color: bodyData.formEncabezadoBody.bg_color || BODY_DEFAULTS.bg_color,
        bg_type: bodyData.formEncabezadoBody.bg_type || "solid",
        bg_colors: bodyData.formEncabezadoBody.bg_colors || "",

        ...(commendTarjetaId && { id_commend_tarjeta: commendTarjetaId }),
      };

      const bodyResult = await API.default.createBody(bodyPayload);
      result.bodyId = bodyResult?.id || bodyResult?.data?.id;

      if (!result.bodyId) {
        throw new Error("No se pudo crear el body - ID no retornado");
      }

      // 2c. Crear Tarjetas individuales (información)
      if (bodyData.formInfoBody && Array.isArray(bodyData.formInfoBody)) {
        const tarjetasPayload = mapTarjetas(bodyData.formInfoBody);

        for (const [index, tarjeta] of tarjetasPayload.entries()) {
          try {
            const tarjetaData = {
              ...tarjeta,
              id_blog_body: result.bodyId,
            };

            await API.default.createTarjeta(tarjetaData);
          } catch (err) {
            result.errors.push({
              step: `tarjeta_${index}`,
              error: err.message,
            });
          }
        }
      }

      // ========== PASO 3: Crear Footer SIN imágenes ==========
      const footerEnabled =
        footerData.formEncabezadoFooter?.estado ?? FOOTER_DEFAULTS.estado;

      const footerPayload = {
        ...footerData.formEncabezadoFooter,
        palabra:
          footerData.formEncabezadoFooter.palabra || FOOTER_DEFAULTS.palabra,
        enlace:
          footerData.formEncabezadoFooter.enlace || FOOTER_DEFAULTS.enlace,
        // Imágenes por defecto
        public_image1: DEFAULT_IMAGES.footer.image1,
        public_image2: DEFAULT_IMAGES.footer.image2,
        public_image3: DEFAULT_IMAGES.footer.image3,
        url_image1: "",
        url_image2: "",
        url_image3: "",
        titulo: footerEnabled
          ? footerData.formEncabezadoFooter.titulo || FOOTER_DEFAULTS.titulo
          : FOOTER_DEFAULTS.titulo,
        descripcion: footerEnabled
          ? footerData.formEncabezadoFooter.descripcion ||
            FOOTER_DEFAULTS.descripcion
          : FOOTER_DEFAULTS.descripcion,
        bg_color: footerData.formEncabezadoFooter.bg_color || FOOTER_DEFAULTS.bg_color,
        bg_type: footerData.formEncabezadoFooter.bg_type || "solid",
        bg_colors: footerData.formEncabezadoFooter.bg_colors || "",
      };

      const footerResult = await API.default.createFooter(footerPayload);
      result.footerId = footerResult?.id || footerResult?.data?.id;

      if (!result.footerId) {
        throw new Error("No se pudo crear el footer - ID no retornado");
      }

      // ========== PASO 4: Crear Blog principal CON IDs de relaciones ==========
      const blogPayload = {
        // ✅ IDs de relaciones
        id_blog_head: result.headerId,
        id_blog_body: result.bodyId,
        id_blog_footer: result.footerId,
        fecha: bodyData.formEncabezadoBody.fecha || getCurrentDate(),
        id_empleado: empleadoId,
        link: headerData.formEncabezadoHeader.titulo_enlace || headerData.formEncabezadoHeader.titulo || "",
      };

      const blogResult = await API.default.createBlog(blogPayload);
      result.blogId = blogResult?.id || blogResult?.data?.id;

      if (!result.blogId) {
        throw new Error("No se pudo crear el blog - ID no retornado");
      }

      // ========== PASO 5: Crear Card (CRÍTICO para subir imágenes) ==========
      const cardPayload = {
        id_blog: result.blogId,
        titulo:
          headerData.formEncabezadoHeader.titulo || HEADER_DEFAULTS.titulo,
        descripcion: bodyData.formEncabezadoBody.descripcion || "",
        public_image: DEFAULT_IMAGES.header.image1,
        url_image: "",
        id_plantilla: plantillaId,
        id_empleado: empleadoId,
        estado_publicacion: Boolean(isPublicado)
      };

      const cardResult = await API.default.createCard(cardPayload);
      result.cardId = cardResult?.id || cardResult?.data?.id;

      if (!result.cardId) {
        throw new Error("No se pudo crear la card - ID no retornado");
      }

      // ========== PASO 6: Subir imágenes via CardController ==========
      await this._uploadAllImages(result.cardId, files, footerEnabled);

      // ========== ÉXITO ==========
      result.success = true;
      return result;
    } catch (err) {
      result.errors.push({ step: "main", error: err.message });
      throw new Error(`Error en creación de blog: ${err.message}`);
    }
  }

  /**
   * Actualiza un blog existente
   *
   * @param {Object} params - Parámetros del blog
   * @param {string} params.blogId - ID del blog principal a actualizar
   * @param {Object} params.headerData - Datos del header
   * @param {Object} params.bodyData - Datos del body
   * @param {Object} params.footerData - Datos del footer
   * @param {Object} params.files - Archivos de imágenes a subir
   * @param {number} params.plantillaId - ID de la plantilla
   * @param {number|null} params.cardId - ID de la card existente (si hay)
   * @param {Object} params.blogRelations - IDs de relaciones (id_blog_head, id_blog_body, id_blog_footer)
   * @returns {Promise<Object>} Resultado de la actualización
   */
  async updateBlog({
    blogId,
    headerData,
    bodyData,
    footerData,
    files,
    empleadoId,
    plantillaId,
    cardId = null,
    blogRelations = {},
    isPublicado,
  }) {
    const result = {
      success: false,
      errors: [],
    };

    try {
      // Actualizar Header si existe id_blog_head
      if (blogRelations.id_blog_head) {
        const headerUpdatePayload = {
          ...headerData.formEncabezadoHeader,
          ...headerData.formImagenHeader,
          alt: headerData.formImagenHeader.alt || HEADER_DEFAULTS.alt,
          title: headerData.formImagenHeader.title || HEADER_DEFAULTS.title,
          bg_color: headerData.formEncabezadoHeader.bg_color || HEADER_DEFAULTS.bg_color,
          bg_type: headerData.formEncabezadoHeader.bg_type || "solid",
          bg_colors: headerData.formEncabezadoHeader.bg_colors || "",
        };
        await API.default.updateHeader(blogRelations.id_blog_head, headerUpdatePayload);
      }

      // Actualizar Body si existe id_blog_body
      if (blogRelations.id_blog_body) {
        const bodyId = blogRelations.id_blog_body;

        // ========== PASO 1: Actualizar/crear CommendTarjeta (consejos) ==========
        let commendTarjetaId = null;
        const hasConsejos =
        //actualizar bodyData para consejos 4 y 5
          bodyData.formCommendBody?.texto1 ||
          bodyData.formCommendBody?.texto2 ||
          bodyData.formCommendBody?.texto3 ||
          bodyData.formCommendBody?.texto4 ||
          bodyData.formCommendBody?.texto5;;

        if (hasConsejos) {
          const consejosPayload = mapConsejos(bodyData.formCommendBody, plantillaId);

          // Garantizar que tenga título
          if (!consejosPayload.titulo || consejosPayload.titulo.trim() === "") {
            consejosPayload.titulo = "Consejos Importantes";
          }

          try {
            if (bodyData.formCommendBody.id) {
              await API.default.updateCommendTarjeta(
                bodyData.formCommendBody.id,
                consejosPayload
              );
              commendTarjetaId = bodyData.formCommendBody.id;
            } else {
              const consejosResult = await API.default.createCommendTarjeta(consejosPayload);
              commendTarjetaId = consejosResult?.id || consejosResult?.data?.id;
            }
          } catch (err) {
            result.errors.push({ step: "consejos", error: err.message });
          }
        }

        // ========== PASO 2: Actualizar Body principal ==========
        const bodyUpdatePayload = {
          ...bodyData.formEncabezadoBody,
          ...bodyData.formGaleryBody,
          bg_color: bodyData.formEncabezadoBody.bg_color || BODY_DEFAULTS.bg_color,
          bg_type: bodyData.formEncabezadoBody.bg_type || "solid",
          bg_colors: bodyData.formEncabezadoBody.bg_colors || "",
          plantilla_id: plantillaId,
          ...(commendTarjetaId && { id_commend_tarjeta: commendTarjetaId }),
        };
        await API.default.updateBody(bodyId, bodyUpdatePayload);

        // ========== PASO 3: Actualizar Tarjetas de información ==========
        if (bodyData.formInfoBody && Array.isArray(bodyData.formInfoBody)) {
          try {
            const validTarjetas = bodyData.formInfoBody.filter(
              (t) => t.titulo || t.descripcion || t.palabra
            );
            const currentTarjetaIds = [];

            for (const [index, tarjeta] of validTarjetas.entries()) {
              const tarjetaData = {
                titulo: tarjeta.titulo || "",
                descripcion: tarjeta.descripcion || "",
                palabra: tarjeta.palabra || "",
                enlace: tarjeta.enlace || "",
                id_blog_body: bodyId,
              };

              try {
                if (tarjeta.id) {
                  await API.default.updateTarjeta(tarjeta.id, tarjetaData);
                  currentTarjetaIds.push(tarjeta.id);
                } else {
                  const tarjetaResult = await API.default.createTarjeta(tarjetaData);
                  if (tarjetaResult?.id) {
                    currentTarjetaIds.push(tarjetaResult.id);
                  }
                }
              } catch (err) {
                result.errors.push({ step: `tarjeta_${index}`, error: err.message });
              }
            }

            // Eliminar tarjetas que ya no están en el formulario
            const allTarjetas = await API.default.getTarjetas();
            const existingTarjetas = allTarjetas.filter(
              (tarjeta) => tarjeta.id_blog_body === bodyId
            );

            for (const dbTarjeta of existingTarjetas) {
              const tarjetaId = dbTarjeta.id || dbTarjeta.id_tarjeta;
              if (!currentTarjetaIds.includes(tarjetaId)) {
                try {
                  await API.default.deleteTarjeta(tarjetaId);
                } catch (err) {
                  result.errors.push({ step: `delete_tarjeta_${tarjetaId}`, error: err.message });
                }
              }
            }
          } catch (err) {
            result.errors.push({ step: "tarjetas", error: err.message });
          }
        }
      }

      // Actualizar Footer si existe id_blog_footer
      if (blogRelations.id_blog_footer) {
        const footerUpdatePayload = {
          ...footerData.formEncabezadoFooter,
          bg_color: footerData.formEncabezadoFooter.bg_color || FOOTER_DEFAULTS.bg_color,
          bg_type: footerData.formEncabezadoFooter.bg_type || "solid",
          bg_colors: footerData.formEncabezadoFooter.bg_colors || "",
        };
        await API.default.updateFooter(blogRelations.id_blog_footer, footerUpdatePayload);
      }

      // Actualizar Blog principal
      const blogPayload = {
        fecha: bodyData.formEncabezadoBody.fecha || getCurrentDate(),
        id_empleado: empleadoId,
        link: headerData.formEncabezadoHeader.titulo_enlace || headerData.formEncabezadoHeader.titulo || "",
        ...(blogRelations.id_blog_head && {
          id_blog_head: blogRelations.id_blog_head,
        }),
        ...(blogRelations.id_blog_body && {
          id_blog_body: blogRelations.id_blog_body,
        }),
        ...(blogRelations.id_blog_footer && {
          id_blog_footer: blogRelations.id_blog_footer,
        }),
      };

      await API.default.updateBlog(blogId, blogPayload);

      // Actualizar Card si hay cardId
      if (cardId) {
        const cardPayload = {
          id_blog: blogId,
          titulo:
            headerData.formEncabezadoHeader.titulo || HEADER_DEFAULTS.titulo,
          descripcion: bodyData.formEncabezadoBody.descripcion || "",
          public_image:
            headerData.formImagenHeader.public_image ||
            DEFAULT_IMAGES.header.image1,
          url_image: "",
          id_plantilla: plantillaId,
          id_empleado: empleadoId,
          estado_publicacion: isPublicado ? 1 : 0,
        };

        await API.default.updateCard(cardId, cardPayload);

        // Subir imágenes
        const footerEnabled = footerData.formEncabezadoFooter?.estado ?? false;
        await this._uploadAllImages(cardId, files, footerEnabled);
      }

      result.success = true;
      return result;
    } catch (err) {
      result.errors.push({ step: "update", error: err.message });
      throw new Error(`Error en actualización de blog: ${err.message}`);
    }
  }

  /**
   * Sube todas las imágenes del blog via CardController
   *
   * @param {number} cardId - ID de la card
   * @param {Object} files - Archivos a subir
   * @param {boolean} footerEnabled - Si el footer está habilitado
   * @private
   */
  async _uploadAllImages(cardId, files, footerEnabled) {
    const uploadErrors = [];

    try {
      // ========== HEADER IMAGE ==========
      if (files.fileHeader) {
        try {
          const headerFormData = new FormData();
          headerFormData.append("file", files.fileHeader);
          await Cloud.uploadCardHeaderImage(cardId, headerFormData);
        } catch (err) {
          uploadErrors.push({ image: "header", error: err.message });
        }
      }

      // ========== BODY IMAGES (SUBIR UNA POR UNA) ==========
      // Imagen principal del body (public_image1)
      if (files.fileBodyHeader) {
        try {
          const formData = new FormData();
          formData.append("file", files.fileBodyHeader);
          formData.append("name", "image1");
          await Cloud.uploadCardBodyImage(cardId, formData);
        } catch (err) {
          uploadErrors.push({ image: "body_image1", error: err.message });
        }
      }

      // Imagen 2 del body (public_image2)
      if (files.fileBodyFile1) {
        try {
          const formData = new FormData();
          formData.append("file", files.fileBodyFile1);
          formData.append("name", "image2");
          await Cloud.uploadCardBodyImage(cardId, formData);
        } catch (err) {
          uploadErrors.push({ image: "body_image2", error: err.message });
        }
      }

      // Imagen 3 del body (public_image3)
      if (files.fileBodyFile2) {
        try {
          const formData = new FormData();
          formData.append("file", files.fileBodyFile2);
          formData.append("name", "image3");
          await Cloud.uploadCardBodyImage(cardId, formData);
        } catch (err) {
          uploadErrors.push({ image: "body_image3", error: err.message });
        }
      }

      // ========== FOOTER IMAGES (SUBIR UNA POR UNA) ==========
      if (footerEnabled) {
        // Imagen 1 del footer (public_image1)
        if (files.fileFooterFile1) {
          try {
            const formData = new FormData();
            formData.append("file", files.fileFooterFile1);
            formData.append("name", "image1");
            await Cloud.uploadCardFooterImage(cardId, formData);
          } catch (err) {
            uploadErrors.push({ image: "footer_image1", error: err.message });
          }
        }

        // Imagen 2 del footer (public_image2)
        if (files.fileFooterFile2) {
          try {
            const formData = new FormData();
            formData.append("file", files.fileFooterFile2);
            formData.append("name", "image2");
            await Cloud.uploadCardFooterImage(cardId, formData);
          } catch (err) {
            uploadErrors.push({ image: "footer_image2", error: err.message });
          }
        }

        // Imagen 3 del footer (public_image3)
        if (files.fileFooterFile3) {
          try {
            const formData = new FormData();
            formData.append("file", files.fileFooterFile3);
            formData.append("name", "image3");
            await Cloud.uploadCardFooterImage(cardId, formData);
          } catch (err) {
            uploadErrors.push({ image: "footer_image3", error: err.message });
          }
        }
      }

      if (uploadErrors.length > 0) {
        console.warn(
          `⚠️ Se encontraron ${uploadErrors.length} errores al subir imágenes:`,
          uploadErrors
        );
      }
    } catch (err) {
      throw new Error(`Error subiendo imágenes: ${err.message}`);
    }
  }

  /**
   * Valida que todos los datos requeridos estén presentes antes de guardar
   *
   * @param {Object} data - Datos a validar
   * @param {string} mode - Modo: 'create' | 'edit'
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validateBlogData(data, mode = "create") {
    const errors = [];

    // Validaciones comunes
    if (!data.headerData?.formEncabezadoHeader?.titulo) {
      errors.push("El título del header es requerido");
    }

    if (!data.bodyData?.formEncabezadoBody?.titulo) {
      errors.push("El título del body es requerido");
    }

    if (!data.bodyData?.formEncabezadoBody?.descripcion) {
      errors.push("La descripción del body es requerida");
    }

    if (!data.plantillaId) {
      errors.push("El ID de plantilla es requerido");
    }

    // Validaciones específicas de modo
    if (mode === "create") {
      if (!data.empleadoId) {
        errors.push("El ID de empleado es requerido para creación");
      }
    } else {
      if (!data.blogId) {
        errors.push("El ID del blog es requerido para edición");
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Exportar instancia singleton
export default new BlogOrchestrator();