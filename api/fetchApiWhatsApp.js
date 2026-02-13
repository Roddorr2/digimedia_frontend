import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL_WHATSAPP_DEV || "http://localhost:5111";

export const apiRequest = async (endpoint, options = {}) => {
    // Intentar obtener el token de las cookies (usado por el dashboard) o localStorage (fallback)
    const token = getCookie('token') || localStorage.getItem('token');
    const isFormData = options.body instanceof FormData;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_URL}${cleanEndpoint}`;

    console.log(`📡 Intentando petición API a: ${url}`);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        });

        if (response.status === 401) {
            console.warn('Token expirado o sesión no autorizada');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            const text = await response.text();
            console.error(`Respuesta no es JSON de ${url}. Tipo: ${contentType}. Inicio del contenido: ${text.substring(0, 100)}`);
            return { success: response.ok, text };
        }
    } catch (error) {
        console.error(`Error en apiRequest a ${url}:`, error);
        throw error;
    }
};

export const whatsappApi = {
    requestNewQr: async (token) => {
        return apiRequest("/api/qr-request", { method: 'POST' });
    },
    getStatus: async (token) => {
        return apiRequest("/api/status", { method: 'GET' });
    }
};