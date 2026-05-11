import { getCookie } from "cookies-next";
import API_URL from "./url";
import url_whatsapp from "./url_whasapp";

/**
 * ✅ Request hacia Laravel
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getCookie("token") || localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  if (!contentType.includes("application/json")) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `Respuesta no es JSON de ${url}. Tipo: ${contentType}. Inicio: ${raw.substring(0, 120)}`,
      );
    }
    return { success: response.ok, text: raw, status: response.status };
  }

  return JSON.parse(raw);
};

/**
 * ✅ Helper interno para requests al WhatsApp-service
 */
const wsRequest = async (endpoint, options = {}) => {
  const token = getCookie("token") || localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${url_whatsapp}${cleanEndpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const raw = await res.text();

  if (!contentType.includes("application/json")) {
    console.error(
      `Respuesta no es JSON de ${url}. Tipo: ${contentType}. Inicio: ${raw.substring(0, 120)}`,
    );
    return { success: res.ok, text: raw, status: res.status };
  }

  return JSON.parse(raw);
};

export const whatsappApi = {
  // ✅ Genera/renueva QR (tu router lo expone como /api/whatsapp/restart)
  restart: async () => {
    return wsRequest("/api/whatsapp/restart", { method: "POST" });
  },

  // ✅ Alternativa directa para pedir QR
  requestNewQr: async () => {
    return wsRequest("/api/whatsapp/qr-request", { method: "POST" });
  },

  // ✅ Estado de conexión
  getStatus: async () => {
    return wsRequest("/api/whatsapp/status", { method: "GET" });
  },

  // ✅ Estado del QR (si lo usas)
  getQrStatus: async () => {
    return wsRequest("/api/whatsapp/qr-status", { method: "GET" });
  },
};

export const popupApi = {
  getServicios: () => apiRequest("/api/servicios", { method: "GET" }),

  getSubservicios: () => apiRequest("/api/subservicios", { method: "GET" }),

  getSubserviciosByServicio: (idServicio) =>
    apiRequest(`/api/subservicios/by-servicio/${idServicio}`, {
      method: "GET",
    }),

  getAll: () => apiRequest("/api/popup-configs", { method: "GET" }),

  getBySubservicio: (idSubservicio) =>
    apiRequest(`/api/popup-configs/subservicio/${idSubservicio}`, {
      method: "GET",
    }),

  create: (formData) =>
    apiRequest("/api/popup-configs", { method: "POST", body: formData }),

  update: (id, formData) =>
    apiRequest(`/api/popup-configs/${id}/actualizar`, {
      method: "POST",
      body: formData,
    }),

  destroy: (id) => apiRequest(`/api/popup-configs/${id}`, { method: "DELETE" }),
};
