const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

// Solo trae los blogs publicados (estado_publicacion = 1), usado en build time
// para generar las rutas estáticas y el sitemap.
export async function getAllPublishedBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/cards_public`);
    if (!res.ok) return [];
    const cards = await res.json();
    if (!Array.isArray(cards)) return [];
    return cards
      .filter((c) => c.blog?.link && c.id_plantilla)
      .map((c) => ({
        template: `plantilla${c.id_plantilla}`,
        templateId: c.id_plantilla,
        link: c.blog.link,
      }));
  } catch (e) {
    console.error("Error al obtener cards_public en build:", e.message);
    return [];
  }
}

export async function getBlogByLinkServer(link) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/links/${link}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (e) {
    console.error("Error al obtener blog por link en build:", e.message);
    return null;
  }
}

export function buildBlogMetadata({ link, templateId, blog }) {
  const canonicalUrl = `https://digimedia-marketing.com/blog/plantilla${templateId}/${link}/`;
  const title =
    blog?.head?.seo?.meta_title || blog?.head?.titulo || "Blog - DigiMedia";
  const description =
    blog?.head?.seo?.meta_descripcion ||
    blog?.head?.texto_descripcion ||
    "Blog de Digimedia Marketing.";
  const image = blog?.head?.imagen?.path;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Digimedia Marketing",
      images: image ? [image] : [],
      locale: "es_PE",
      type: "article",
    },
  };
}
