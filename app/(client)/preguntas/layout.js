export const metadata = { 
  title: "Preguntas Frecuentes | Diseño Web, Redes Sociales y Branding – DigiMedia",
  description:
    "Resuelve todas tus dudas sobre diseño web, gestión de redes sociales y branding. Te damos la información clave para que tomes la mejor decisión.",
    openGraph: {
        title: "Preguntas Frecuentes | Diseño Web, Redes Sociales y Branding – DigiMedia",
        description:
        "Resuelve todas tus dudas sobre diseño web, gestión de redes sociales y branding. Te damos la información clave para que tomes la mejor decisión.",
        url: "https://digimedia-marketing.com/preguntas/",
        siteName: "Digimedia Marketing",
        images: [], 
        locale: "es_PE",
        type: "website",
    },
    alternates: {
        canonical: "https://digimedia-marketing.com/preguntas/",
    },
};

export default function preguntaLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
