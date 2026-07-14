
export async function getTestimonials() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DEV}/api/testimonios`);

    if (!res.ok) throw new Error("Error al obtener testimonios");

    const data = await res.json();

    return data.map((t) => ({
      id: t.id_testimonio,
      name: t.nombre,
      date: formatRelativeDate(t.fecha_testimonio || t.created_at),
      rating: t.rating,
      text: t.texto,
      avatar: t.imagen_url,
    }));
  } catch (error) {
    console.error("Error cargando testimonios:", error);
    return [];
  }
}

function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Hoy";
  if (diffDays === 1) return "Hace 1 día";
  if (diffDays < 30) return `Hace ${diffDays} días`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "Hace 1 mes";
  if (diffMonths < 12) return `Hace ${diffMonths} meses`;

  const diffYears = Math.floor(diffMonths / 12);
  if (diffYears === 1) return "Hace 1 año";
  return `Hace ${diffYears} años`;
}