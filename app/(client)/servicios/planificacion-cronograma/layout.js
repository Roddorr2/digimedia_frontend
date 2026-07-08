import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Planificacion y cronograma",
  description:
    "Es el proceso de definir estrategias, objetivos, temáticas y tipos de contenido que se publicarán en las redes sociales. Esta etapa implica pensar a mediano y largo plazo para construir una presencia digital sólida.",
  openGraph: {
    title: "DigiMedia - Planificacion y cronograma",
    description:
      "Es el proceso de definir estrategias, objetivos, temáticas y tipos de contenido que se publicarán en las redes sociales. Esta etapa implica pensar a mediano y largo plazo para construir una presencia digital sólida.",
    url: "https://digimedia-marketing.com/servicios/planificacion-cronograma/",
    siteName: "DigiMedia - Planificacion y cronograma",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/planificacion-cronograma/",
  },
};

export default function PlanCronogramaLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="estrategia-de-contenido" />
    </>
  );
}