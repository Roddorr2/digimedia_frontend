// app/dashboard/testimonios/services/testimonio.service.js
"use client";
import url from "../../../../api/url";
import { getCookie } from "cookies-next";
import Swal from 'sweetalert2';

const api_url = `${url}/api/testimonios`;

const handlePermissionError = (response) => {
    if (response.status === 403) {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes los permisos necesarios para realizar esta acción.',
            confirmButtonColor: '#6f4be8'
        });
        return true;
    }
    return false;
};

const testimonio_service = {
    // Listado paginado (admin)
    testimoniosByPage: async (page, limit = 10, search = '') => {
        try {
            const reqParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search && search.trim() !== '') {
                reqParams.append('search', search);
            }

            const response = await fetch(`${api_url}/panel?${reqParams}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener testimonios:", error);
            return { error: true, message: error.message };
        }
    },

    testimonioById: async (id) => {
        try {
            if (!id) {
                return { status: 400, error: true, message: "ID no proporcionado" };
            }

            const response = await fetch(`${api_url}/panel/${id}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener testimonio por ID:", error);
            return { error: true, message: error.message };
        }
    },

    create: async (form) => {
        try {
            const response = await fetch(`${api_url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const data = await response.json();
                return { status: response.status, error: true, message: data.errors || data.message };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al crear testimonio:", error);
            return { status: 500, error: true, message: error.message };
        }
    },toggleActivo: async (id) => {
    try {
        const response = await fetch(`${api_url}/${id}/toggle-activo`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${getCookie('token')}`
            }
        });

        if (!response.ok) {
            return { status: response.status, error: true };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cambiar estado del testimonio:", error);
        return { error: true, message: error.message };
    }
    },

    update: async (form, id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const data = await response.json();
                return { status: response.status, error: true, message: data.errors || data.message };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al actualizar testimonio:", error);
            return { status: 500, error: true, message: error.message };
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            if (handlePermissionError(response)) {
                return { error: true, status: 403 };
            }

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al eliminar testimonio:", error);
            return { error: true, message: error.message };
        }
    },

    // ---- Imagen vía Cloudinary ----

    generateUploadSignature: async (id, params) => {
        try {
            const response = await fetch(`${api_url}/${id}/upload-signature`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al generar firma de subida:", error);
            return { error: true, message: error.message };
        }
    },

    updateImage: async (id, publicId, secureUrl) => {
        try {
            const response = await fetch(`${api_url}/${id}/image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify({ public_id: publicId, secure_url: secureUrl })
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al actualizar imagen:", error);
            return { error: true, message: error.message };
        }
    },

    deleteImage: async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}/image`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al eliminar imagen:", error);
            return { error: true, message: error.message };
        }
    },
};

export default testimonio_service;