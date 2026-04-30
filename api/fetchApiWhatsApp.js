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

  if (process.env.NODE_ENV !== "production") {
    console.log(`📡 (WS) ${url}`);
  }

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

export const campaniaApi = {
  //GET /api/campanias?estado=completada&page=1
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/api/campanias${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  },

  //GET /api/campanias/{id}
  getById: (id) => apiRequest(`/api/campanias/${id}`, { method: "GET" }),

  getLeads: (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/api/campanias/${id}/leads${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  },

  //POST /api/campanias/{id}/leads/{watModalId}/retry (Fase 2)
  retryLead: (campaniaId, watModalId) =>
    apiRequest(`/api/campanias/${campaniaId}/leads/${watModalId}/retry`, {
      method: "POST",
    }),
};
