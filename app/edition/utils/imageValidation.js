/**
 * Helper to check if a file is a valid WebP image by inspecting its magic bytes.
 * WebP files begin with the RIFF signature (52 49 46 46) and have WEBP at offset 8 (57 45 42 50).
 * 
 * @param {File} file - The file to verify
 * @returns {Promise<boolean>} Resolves to true if the file is a valid WebP file
 */
export const isWebPFile = async (file) => {
  return new Promise((resolve) => {
    // Simple MIME check as fallback/first step
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
 * Validates an image file based on the section rules (size and dimensions).
 * Only WebP files are accepted.
 * 
 * @param {File} file - The file to validate
 * @param {'header'|'body'|'footer'} section - The section of the blog where the image is used
 * @returns {Promise<{valid: boolean, errors: string[]}>} Validation result object
 */
export const validateImageFile = async (file, section) => {
  const errors = [];

  // 1. Verify file is WebP via Magic Bytes
  const isWebp = await isWebPFile(file);
  if (!isWebp) {
    errors.push("El formato del archivo no es WebP. Por favor, suba únicamente imágenes en formato .webp.");
    return { valid: false, errors };
  }

  // Define size and dimension constraints per section
  let maxSizeBytes = 0;
  let minWidth = 0;
  let minHeight = 0;
  let maxWidth = 0;
  let maxHeight = 0;
  let sectionLabel = "";

  switch (section) {
    case "header":
      maxSizeBytes = 500 * 1024; // 500 KB
      minWidth = 800;
      minHeight = 400;
      maxWidth = 1920;
      maxHeight = 800;
      sectionLabel = "cabecera";
      break;
    case "body":
      maxSizeBytes = 400 * 1024; // 400 KB
      minWidth = 400;
      minHeight = 300;
      maxWidth = 1200;
      maxHeight = 900;
      sectionLabel = "cuerpo (body)";
      break;
    case "footer":
      maxSizeBytes = 300 * 1024; // 300 KB
      minWidth = 150;
      minHeight = 100;
      maxWidth = 600;
      maxHeight = 500;
      sectionLabel = "pie de página (footer)";
      break;
    default:
      errors.push(`Sección de imagen no válida: ${section}`);
      return { valid: false, errors };
  }

  // 2. Validate File Size
  if (file.size > maxSizeBytes) {
    const limitKB = Math.round(maxSizeBytes / 1024);
    const sizeKB = Math.round(file.size / 1024);
    errors.push(`El tamaño de la imagen (${sizeKB} KB) supera el límite de ${limitKB} KB permitido para la ${sectionLabel}.`);
  }

  // 3. Validate Dimensions
  try {
    const { width, height } = await getImageDimensions(file);
    if (width < minWidth || height < minHeight) {
      errors.push(
        `Las dimensiones de la imagen (${width}x${height}px) son inferiores al mínimo de ${minWidth}x${minHeight}px requerido para la ${sectionLabel}.`
      );
    }
    if (width > maxWidth || height > maxHeight) {
      errors.push(
        `Las dimensiones de la imagen (${width}x${height}px) superan el máximo de ${maxWidth}x${maxHeight}px permitido para la ${sectionLabel}.`
      );
    }
  } catch (err) {
    errors.push(err.message || "Error al verificar las dimensiones de la imagen.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
