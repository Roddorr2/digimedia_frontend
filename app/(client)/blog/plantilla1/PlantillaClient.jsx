"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import Fetch from "../services/fetch";
import Header from "../components/Header";
import Body1 from "../components/Body1";
import Footer from "../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

const TEMPLATE_ID = 1;

export default function PlantillaClient({ link }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [response, cards] = await Promise.all([
          Fetch.fetchBlogByLink(link),
          Fetch.fetchCards(),
        ]);

        const publishedCards = Array.isArray(cards) ? cards : cards?.data || [];
        const isPublished = publishedCards.some(
          (c) => c.blog?.link === link && c.id_plantilla === TEMPLATE_ID
        );

        if (!response || !isPublished) {
          // Post en borrador/inexistente: no lo mostramos aunque el HTML
          // estático siga en el servidor de una publicación anterior.
          router.replace("/blog");
          return;
        }

        setData(response);
        setIsLoading(false);
      } catch (e) {
        console.error("Error al obtener blog:", e);
        setError("Error inesperado");
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el blog.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    if (link) fetchBlog();
  }, [link, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{error}</h1>
          <p className="text-gray-600 mb-6">
            No pudimos cargar el contenido del blog. Por favor, intenta
            nuevamente.
          </p>
          <a
            href="/blog"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Volver a blogs
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-gray-700 animate-spin" />
        <p className="text-gray-700 ml-3">Cargando blog...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Blog no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            El blog que estás buscando no existe o no está disponible.
          </p>
          <a
            href="/blog"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Volver a blogs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        id_blog_head={data?.id_blog_head}
        bg_color={data?.head?.bg_color}
        bg_type={data?.head?.bg_type}
        bg_colors={data?.head?.bg_colors}
      />

      <div
        className="mx-auto px-4 py-12 relative text-white min-h-screen w-full"
        style={
          data?.body?.bg_type === "gradient" && data?.body?.bg_colors
            ? (() => {
                const parts = data.body.bg_colors
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean);
                let direction = "";
                let colorParts = parts;
                if (parts[0]?.startsWith("to ")) {
                  direction = parts[0];
                  colorParts = parts.slice(1);
                }
                if (colorParts.length >= 3) {
                  return {
                    backgroundImage: `linear-gradient(${direction || "135deg"}, ${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]})`,
                  };
                }
                if (colorParts.length >= 2) {
                  return {
                    backgroundImage: `linear-gradient(${direction || "to right"}, ${colorParts[0]}, ${colorParts[1]})`,
                  };
                }
                return { backgroundColor: data?.body?.bg_color || "#000118" };
              })()
            : { backgroundColor: data?.body?.bg_color || "#000118" }
        }
      >
        <Body1
          id_blog_body={data.id_blog_body}
          fecha={data.fecha}
          bg_color={data?.body?.bg_color}
          bg_type={data?.body?.bg_type}
          bg_colors={data?.body?.bg_colors}
        />

        {data.body?.service_url && (
          <div className="flex justify-center my-8">
            <a
              href={data.body.service_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#F2A30F] text-[#060126] text-lg font-bold rounded-lg hover:bg-[#F2C230] transition-all shadow-lg"
            >
              Conoce nuestro servicio
            </a>
          </div>
        )}

        <div className="mb-20">
          <Footer
            id_blog_footer={data?.id_blog_footer}
            bg_color={data?.footer?.bg_color}
            bg_type={data?.footer?.bg_type}
            bg_colors={data?.footer?.bg_colors}
          />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <WhatsAppButton />
        <MayaChatbot />
      </div>
    </div>
  );
}
