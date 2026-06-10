//import DynamicServicePopup from "@/components/DynamicServicePopup";
import DynamicServicePopup from '../components/DynamicPopup'

export const metadata = {
  title: 'Sub servicio de Desarrollo responsive e integraciones digitales | Digimedia',
  description: 'diseño y desarrollo de interfaces responsivas e integraciones con APIs, CRM y plataformas de pago. Garantizamos rendimiento, accesibilidad y escalabilidad, con pruebas, despliegue y soporte para una experiencia digital fluida.',
  openGraph: {
    title: 'Sub servicio de Desarrollo responsive e integraciones digitales | Digimedia',
    description: 'diseño y desarrollo de interfaces responsivas e integraciones con APIs, CRM y plataformas de pago. Garantizamos rendimiento, accesibilidad y escalabilidad, con pruebas, despliegue y soporte para una experiencia digital fluida.',
    url: 'https://digimedia-marketing.com/servicios/seo/',
    siteName: 'DigiMedia - Desarrollo Responsive',
    images: [], 
    locale: 'es_PE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://digimedia-marketing.com/servicios/seo/',
  },
};

export default function SEOLayout({ children }) {
  return (
    <>
      {children}
      {/* Reutilización del puente global con los IDs correspondientes a la ruta SEO */}
      <DynamicServicePopup idServicio={1} idSubservicio={4} />
    </>
  );
}

