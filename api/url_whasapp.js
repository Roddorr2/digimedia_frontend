const url_whasapp = (
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_WHATSAPP_PROD
    : process.env.NEXT_PUBLIC_API_URL_WHATSAPP_DEV
) || "http://localhost:5111"; // Fallback por seguridad

if (typeof window !== 'undefined') {
  console.log("🌐 WhatsApp API URL:", url_whasapp);
}

export default url_whasapp;