/**
 * imageValidation.js
 * 
 * Centraliza todas las restricciones y validaciones de imágenes del sistema de blogs.
 * Incluye conversión automática de formatos (PNG, JPG, etc.) a WebP optimizado.
 */

// ============================================================
// CONSTANTES CENTRALIZADAS DE RESTRICCIONES POR SECCIÓN
// ============================================================
export const IMAGE_CONSTRAINTS = {
  header: {
    maxSizeBytes: 500 * 1024,     // 500 KB
    minWidth: 800,
    minHeight: 400,
    maxWidth: 1920,
    maxHeight: 800,
    recommendedWidth: 1280,
    recommendedHeight: 600,
    label: "cabecera",
    quality: 90,                   // Quality WebP para canvas conversion
  },
  body: {
    maxSizeBytes: 400 * 1024,     // 400 KB
    minWidth: 400,
    minHeight: 300,
    maxWidth: 1200,
    maxHeight: 900,
    recommendedWidth: 800,
    recommendedHeight: 600,
    label: "cuerpo (body)",
    quality: 90,
  },
  footer: {
    maxSizeBytes: 300 * 1024,     // 300 KB
    minWidth: 150,
    minHeight: 100,
    maxWidth: 600,
    maxHeight: 500,
    recommendedWidth: 400,
    recommendedHeight: 300,
    label: "pie de página (footer)",
    quality: 90,
  },
};

/**
 * Genera el texto de recomendación de dimensiones para una sección.
 * Usado en los formularios para mostrar información al equipo de diseño.
 * 
 * @param {'header'|'body'|'footer'} section
 * @returns {string}
 */
export function getImageRecommendationText(section) {
  const c = IMAGE_CONSTRAINTS[section];
  if (!c) return "";
  return `Recomendado: ${c.recommendedWidth}×${c.recommendedHeight} px (rango: ${c.minWidth}×${c.minHeight} a ${c.maxWidth}×${c.maxHeight} px)`;
}

// ============================================================
// FORMATOS ACEPTADOS
// ============================================================
// Formatos que el input acepta (para el atributo `accept` del input file)
export const ACCEPTED_IMAGE_FORMATS = "image/webp,image/png,image/jpeg,image/jpg,image/avif";

// Tipos MIME válidos para conversión
const CONVERTIBLE_MIME_TYPES = ["image/webp", "image/png", "image/jpeg", "image/jpg", "image/avif", "image/gif"];

// ============================================================
// VERIFICACIÓN DE MAGIC BYTES
// ============================================================

/**
 * Helper to check if a file is a valid WebP image by inspecting its magic bytes.
 * WebP files begin with the RIFF signature (52 49 46 46) and have WEBP at offset 8 (57 45 42 50).
 * 
 * @param {File} file - The file to verify
 * @returns {Promise<boolean>} Resolves to true if the file is a valid WebP file
 */
export const isWebPFile = async (file) => {
  return new Promise((resolve) => {
    if (file.type !== "image/webp") {
      resolve(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (!e.target || !e.target.result) {
        resolve(false);
        return;
      }
      const arr = new Uint8Array(e.target.result);
      if (arr.length < 12) {
        resolve(false);
        return;
      }
      // Check for 'RIFF' at 0-3 and 'WEBP' at 8-11
      const isRIFF = arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46;
      const isWEBP = arr[8] === 0x57 && arr[9] === 0x45 && arr[10] === 0x42 && arr[11] === 0x50;
      resolve(isRIFF && isWEBP);
    };
    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
};

/**
 * Verifica si el archivo es un tipo de imagen aceptado para conversión.
 * 
 * @param {File} file
 * @returns {boolean}
 */
export const isConvertibleImage = (file) => {
  return CONVERTIBLE_MIME_TYPES.includes(file.type);
};

// ============================================================
// CONVERSIÓN A WEBP
// ============================================================

/**
 * Gets the dimensions (width and height) of an image file.
 * 
 * @param {File} file - The image file
 * @returns {Promise<{width: number, height: number}>} Resolves to an object containing natural width and height
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo cargar la imagen para verificar dimensiones."));
    };
    img.src = url;
  });
};

/**
 * Convierte un archivo de imagen a formato WebP usando Canvas API.
 * Preserva las dimensiones originales y aplica compresión optimizada.
 * Si el archivo ya es WebP y pesa menos del límite, lo retorna sin procesar.
 * 
 * @param {File} file - El archivo de imagen original
 * @param {number} quality - Calidad WebP (0-1), por defecto 0.90
 * @returns {Promise<File>} El archivo convertido como WebP
 */
export const convertToWebP = (file, quality = 0.90) => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo obtener el contexto 2D del canvas."));
        return;
      }

      // Fondo blanco para imágenes con transparencia (PNG)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("No se pudo convertir la imagen a WebP."));
            return;
          }

          // Crear nuevo File con tipo WebP
          const originalName = file.name.replace(/\.[^/.]+$/, ""); // sin extensión
          const webpFile = new File([blob], `${originalName}.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          resolve(webpFile);
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo cargar la imagen para conversión."));
    };

    img.src = url;
  });
};

// ============================================================
// VALIDACIÓN PRINCIPAL
// ============================================================

/**
 * Valida y convierte automáticamente un archivo de imagen.
 * 
 * Flujo:
 * 1. Verifica que sea un formato de imagen aceptado (PNG, JPG, WebP, AVIF, etc.)
 * 2. Si no es WebP, lo convierte automáticamente preservando calidad
 * 3. Valida el tamaño del archivo resultante
 * 4. Valida las dimensiones del archivo resultante
 * 
 * @param {File} file - The file to validate
 * @param {'header'|'body'|'footer'} section - The section of the blog where the image is used
 * @returns {Promise<{valid: boolean, errors: string[], file: File}>} Validation result with (possibly converted) file
 */
export const validateImageFile = async (file, section) => {
  const errors = [];

  // 1. Verificar que sea un formato de imagen aceptado
  if (!isConvertibleImage(file)) {
    errors.push(
      `Formato de imagen no válido. Se aceptan: WebP, PNG, JPG/JPEG y AVIF. Recibido: ${file.type || "desconocido"}.`
    );
    return { valid: false, errors, file };
  }

  // Obtener restricciones de la sección
  const constraints = IMAGE_CONSTRAINTS[section];
  if (!constraints) {
    errors.push(`Sección de imagen no válida: ${section}`);
    return { valid: false, errors, file };
  }

  const { maxSizeBytes, minWidth, minHeight, maxWidth, maxHeight, label, quality, recommendedWidth, recommendedHeight } = constraints;

  // 2. Convertir a WebP si no lo es ya (o si es WebP pero muy pesado)
  let processedFile = file;
  let wasConverted = false;

  const isAlreadyWebP = await isWebPFile(file);

  if (!isAlreadyWebP) {
    try {
      processedFile = await convertToWebP(file, quality / 100);
      wasConverted = true;
    } catch (conversionError) {
      errors.push(`No se pudo convertir la imagen a WebP: ${conversionError.message}`);
      return { valid: false, errors, file };
    }
  }

  // 3. Validar tamaño del archivo (después de la conversión)
  if (processedFile.size > maxSizeBytes) {
    const limitKB = Math.round(maxSizeBytes / 1024);
    const sizeKB = Math.round(processedFile.size / 1024);

    // Si fue convertido y sigue siendo muy pesado, intentar con menor calidad
    if (wasConverted) {
      try {
        const lowerQualityFile = await convertToWebP(file, 0.75);
        if (lowerQualityFile.size <= maxSizeBytes) {
          processedFile = lowerQualityFile;
        } else {
          errors.push(
            `El tamaño de la imagen (${sizeKB} KB) supera el límite de ${limitKB} KB para la ${label}. ` +
            `Intenta reducir la resolución a ${recommendedWidth}×${recommendedHeight} px antes de subir.`
          );
        }
      } catch {
        errors.push(
          `El tamaño de la imagen (${sizeKB} KB) supera el límite de ${limitKB} KB permitido para la ${label}.`
        );
      }
    } else {
      errors.push(
        `El tamaño de la imagen (${sizeKB} KB) supera el límite de ${limitKB} KB permitido para la ${label}. ` +
        `Intenta reducir la resolución a ${recommendedWidth}×${recommendedHeight} px.`
      );
    }
  }

  // 4. Validar dimensiones
  if (errors.length === 0) {
    try {
      const { width, height } = await getImageDimensions(processedFile);

      if (width < minWidth || height < minHeight) {
        errors.push(
          `Las dimensiones de la imagen (${width}×${height}px) son menores al mínimo requerido ` +
          `de ${minWidth}×${minHeight}px para la ${label}. ` +
          `Recomendamos ${recommendedWidth}×${recommendedHeight}px.`
        );
      } else if (width > maxWidth || height > maxHeight) {
        errors.push(
          `Las dimensiones de la imagen (${width}×${height}px) superan el máximo permitido ` +
          `de ${maxWidth}×${maxHeight}px para la ${label}. ` +
          `El backend redimensionará automáticamente.`
        );
      }
    } catch (err) {
      errors.push(err.message || "Error al verificar las dimensiones de la imagen.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    file: processedFile,    // archivo convertido listo para subir
    wasConverted,
  };
};
