const url_whasapp = (
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_WHATSAPP_PROD
    : process.env.NEXT_PUBLIC_API_URL_WHATSAPP_DEV
) || "http://localhost:5111"; // Fallback por seguridad

export default url_whasapp;