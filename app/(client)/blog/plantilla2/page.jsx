"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import Head from "next/head";
import { Loader2 } from "lucide-react";
import Fetch from "../services/fetch";
import Header from "../components/Header";
import Body2 from "../components/Body2";
import Footer from "../components/Footer";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen text-gray-700">
          Cargando...
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
};

const PageContent = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const blog = searchParams.get("blog");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await Fetch.fetchBlogByLink(blog);

        if (response) {
          //setData(response);
          //Se quito el [0] para que reciba correctamente los datos del backend
          setData(response);
        } else {
          setError("Blog no encontrado");
        }
      } catch (e) {
        console.error("Error al obtener blog:", e);
        setError("Error inesperado");
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el blog.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (blog) fetchBlog();
  }, [blog]);

  useEffect(() => {
      if (data) {
        const title = data?.head?.meta_title || data?.titulo || "Mi Blog";
        const description =
          data?.head?.meta_descripcion || data?.descripcion || "Blog de DigiMedia";
  
        document.title = title;
  
        // Actualiza <meta name="description">
        let metaDescription = document.querySelector("meta[name='description']");
        if (!metaDescription) {
          metaDescription = document.createElement("meta");
          metaDescription.name = "description";
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description);
  
        // Actualiza etiquetas OG
        const ogTags = [
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:url", content: `https://digimedia-marketing.com/blog/${blog}` },
        ];
        ogTags.forEach(({ property, content }) => {
          let tag = document.querySelector(`meta[property='${property}']`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("property", property);
            document.head.appendChild(tag);
          }
          tag.setAttribute("content", content);
        });
  
        // ✅ Actualiza o crea <link rel="canonical">
        let canonicalLink = document.querySelector("link[rel='canonical']");
        if (!canonicalLink) {
          canonicalLink = document.createElement("link");
          canonicalLink.rel = "canonical";
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = `https://digimedia-marketing.com/blog/${blog}`;
      }
  }, [data, blog]);

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
          <button
            onClick={() => router.refresh()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
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
    <>

      <div>
<Header id_blog_head={data.id_blog_head} bg_color={data?.head?.bg_color} bg_type={data?.head?.bg_type} bg_colors={data?.head?.bg_colors} />

<div className="mx-auto px-4 py-12 relative text-white min-h-screen w-full" style={(() => {
          const bgType = data?.body?.bg_type || "solid";
          const bgColor = data?.body?.bg_color || "#5A37A6";
          const bgColors = data?.body?.bg_colors || "";
          if (bgType === "gradient" && bgColors) {
            const parts = bgColors.split(",").map(c => c.trim()).filter(Boolean);
            let direction = "";
            let colorParts = parts;
            if (parts[0]?.startsWith("to ")) {
              direction = parts[0];
              colorParts = parts.slice(1);
            }
            if (colorParts.length >= 3) {
              return { backgroundImage: `linear-gradient(${direction || "135deg"}, ${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]})` };
            }
            if (colorParts.length >= 2) {
              return { backgroundImage: `linear-gradient(${direction || "to right"}, ${colorParts[0]}, ${colorParts[1]})` };
            }
          }
          return { backgroundColor: bgColor };
        })()}>

          <Body2 id_blog_body={data.id_blog_body} fecha={data.fecha} bg_color={data?.body?.bg_color} bg_type={data?.body?.bg_type} bg_colors={data?.body?.bg_colors} />


          {data.body?.service_url && (
            <div className="flex justify-center my-8">
              <a
                href={data.body.service_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                Conoce nuestro servicio
              </a>
            </div>
          )}
          <Footer id_blog_footer={data?.id_blog_footer} bg_color={data?.footer?.bg_color} bg_type={data?.footer?.bg_type} bg_colors={data?.footer?.bg_colors} />

        </div>
      </div>
    </>
  );
};

export default Page;

