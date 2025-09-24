import Fetch from "../../services/fetch";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const data = await Fetch.fetchBlogByLink(slug);

        if (!data) {
      return {
        title: "Blog no encontrado | Mi Blog",
        description: "El blog que buscas no existe o fue eliminado.",
      };
    }

    return {
      title: data?.head.meta_title || data?.titulo || "Blog DigiMedia",
      description: data?.head.meta_descripcion || data?.descripcion || "Contenido del blog",
      openGraph: {
        title: data?.head.meta_title || data?.titulo || "Blog DigiMedia",
        description: data?.head.meta_descripcion || data?.descripcion || "Contenido del blog",
        url: `https://digimedia-marketing.com/blog/plantilla2/${slug}`,
        siteName: "Digimedia",
        images: data?.public_image ? [data.public_image] : [],
        locale: "es_PE",
        type: "article",
      },
    };
  } catch (err) {
    console.error("Error cargando metadata:", err);
    return {
      title: "Error cargando blog",
      description: "No se pudo cargar la metadata del blog.",
    };
  }
}

// Layout del blog
export default function Plantilla2Layout({ children }) {
  return <>{children}</>;
}


