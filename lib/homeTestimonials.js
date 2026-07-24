import url from "../api/url";
import { formatRelativeDate } from "./testimonials";

export async function getHomeTestimonials(page = 1, limit = 6) {
  const res = await fetch(
    `${url}/api/testimonios/home?limit=${limit}&page=${page}`
  );

  if (!res.ok) throw new Error("Error al obtener los comentarios de clientes");

  const { data, meta } = await res.json();

  return {
    data: data.map((t) => ({
      id: t.id_testimonio,
      name: t.nombre,
      date: formatRelativeDate(t.fecha_testimonio || t.created_at),
      rating: t.rating,
      text: t.texto,
      avatar: t.imagen_url,
    })),
    meta,
  };
}
