import apiClient from "./apiClient";

const Cloud = {
  // Eliminar imagen de Cloudinary (endpoint original)
  deleteImage: (public_id) =>
    apiClient.post("/delete_image", { public_id }).then((r) => r.data),

  // Upload de imagen usando el endpoint original con ruta dinámica
  uploadImage: (formData, ruta) =>
    apiClient
      .post(`/${ruta}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  // Métodos de conveniencia que usan el uploadImage base
  uploadHeaderImage: (formData) =>
    Cloud.uploadImage(formData, "upload_header"),

  uploadBodyImage: (formData) =>
    Cloud.uploadImage(formData, "upload_body"),

  uploadFooterImage: (formData) =>
    Cloud.uploadImage(formData, "upload_footer"),

  uploadGalleryImage: (formData) =>
    Cloud.uploadImage(formData, "upload_gallery"),

  // Eliminar múltiples imágenes (si la API lo soporta)
  deleteImages: (public_ids) =>
    apiClient.post("/delete_images", { public_ids }).then((r) => r.data),

  // Eliminar carpeta de imágenes (endpoint original)
  deleteImagesCarpet: (id) =>
    apiClient.delete(`/delete_carpet/${id}`).then((r) => r.data),

  // ========== ENDPOINTS DEL CARDCONTROLLER (CORRECTO) ==========
  // Subir imagen del header usando CardController
  uploadCardHeaderImage: (cardId, formData) =>
    apiClient
      .post(`/card/blog/image_head/${cardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  // Subir imágenes del body usando CardController
  uploadCardBodyImage: (cardId, formData) =>
    apiClient
      .post(`/card/blog/images_body/${cardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  // Subir imágenes del footer usando CardController
  uploadCardFooterImage: (cardId, formData) =>
    apiClient
      .post(`/card/blog/images_footer/${cardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
};

export default Cloud;
