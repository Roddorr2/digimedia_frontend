'use client';

import axios from 'axios';
import url from '../../../../api/url';
import { getCookie } from 'cookies-next';

const Fetch = {

    // Obtener todos los blogs
    fetchBlogs: async function fetchBlogs() {
        try {
            const response = await axios.get(`${url}/api/blogs/`);
            return response.status === 200 ? response.data : null;
        } catch (error) {
            console.error("❌ Error al obtener blogs:", error.response?.data || error.message);
            return null;
        }
    },

    // Obtener blog por ID
    fetchBlogById: async function fetchBlogById(id) {
        try {
            const response = await axios.get(`${url}/api/blogs/${id}`);
            return response.status === 200 ? response.data.data : null;
        } catch (error) {
            console.error("❌ Error al obtener blog por ID:", error.response?.data || error.message);
            return null;
        }
    },
    // Obtener blog por link
    fetchBlogByLink: async function fetchBlogByLink(link) {
        try {
            const response = await axios.get(`${url}/api/blogs/links/${link}`);
            return response.status === 200 ? response.data.data : null;
        } catch (error) {
            console.error("❌ Error al obtener blog por link:", error.response?.data || error.message);
            return null;
        }
    },
    // Obtener tarjetas
    fetchCards: async function fetchCards() {
        try {
            const response = await axios.get(`${url}/api/cards_public`);
            return response.status === 200 ? response.data : null;
        } catch (error) {
            console.error("❌ Error al obtener cards:", error.response?.data || error.message);
            return null;
        }
    },
    // Obtener blog head
    fetchBlogHead: async function fetchBlogHead(id) {
        try {
            const response = await axios.get(`${url}/api/blog_head/${id}`);
            return response.status === 200 ? response.data.data : null;
        } catch (error) {
            console.error("❌ Error al obtener blog head:", error.response?.data || error.message);
            return null;
        }
    },

    // Obtener blog footer
    fetchBlogFooter: async function fetchBlogFooter(id) {
        try {
            const response = await axios.get(`${url}/api/blog_footer/${id}`);
            return response.status === 200 ? response.data.data : null;
        } catch (error) {
            console.error("❌ Error al obtener blog footer:", error.response?.data || error.message);
            return null;
        }
    },

    // Obtener blog body por ID
    fetchBlogBodyById: async function fetchBlogBodyById(id) {
        try {
            const response = await axios.get(`${url}/api/blog_body/${id}`);
            return response.status === 200 ? response.data.data : null;
        } catch (error) {
            console.error("❌ Error al obtener blog body:", error.response?.data || error.message);
            return null;
        }
    },

    fetchBlogAuditoria: async function () {
        try {
            const token = getCookie("token");

            if (!token) return [];

            const response = await axios.get(`${url}/api/blogs_auditoria`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return Array.isArray(response?.data?.data) ? response.data.data : [];

        } catch (error) {
            // Si la API devuelve 404, devolvemos array vacío
            if (error.response?.status === 404) {
                return [];
            }

            console.error("❌ Error al obtener auditoría:", error.response?.data || error.message);
            return [];
        }
    }


}

export default Fetch;
