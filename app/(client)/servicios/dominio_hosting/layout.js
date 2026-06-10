//import DynamicServicePopup from "@/components/DynamicServicePopup";
import DynamicServicePopup from '../components/DynamicPopup'

export const metadata = {
  title: 'Sub servicio de Optimización SEO para buscadores | Digimedia',
  description:
    'auditoría técnica, optimización on-page y off-page, estrategia de contenidos y link building para mejorar la visibilidad orgánica. Monitorizamos posiciones y tráfico para aumentar conversiones y crecimiento sostenible.',
  openGraph: {
    title: 'Sub servicio de Optimización SEO para buscadores | Digimedia',
    description:
      'auditoría técnica, optimización on-page y off-page, estrategia de contenidos y link building para mejorar la visibilidad orgánica. Monitorizamos posiciones y tráfico para aumentar conversiones y crecimiento sostenible.',
    url: 'https://digimedia-marketing.com/servicios/dominio_hosting/',
    siteName: 'DigiMedia - Optimización SEO',
    images: [], // se mantiene vacío por tu preferencia
    locale: 'es_PE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://digimedia-marketing.com/servicios/dominio_hosting/',
  },
};

export default function DominioHostingLayout({ children }) {
  return (
    <>
      {children}
      {/* Se utiliza el puente global optimizado para evitar el error de ssr en Server Components */}
      <DynamicServicePopup idServicio={1} idSubservicio={2} />
    </>
  );
}

