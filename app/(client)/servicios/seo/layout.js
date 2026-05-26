import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title:
    'Sub servicio de Desarrollo responsive e integraciones digitales | Digimedia',
  description:
    'diseño y desarrollo de interfaces responsivas e integraciones con APIs, CRM y plataformas de pago. Garantizamos rendimiento, accesibilidad y escalabilidad, con pruebas, despliegue y soporte para una experiencia digital fluida.',
  openGraph: {
    title:
      'Sub servicio de Desarrollo responsive e integraciones digitales | Digimedia',
    description:
      'diseño y desarrollo de interfaces responsivas e integraciones con APIs, CRM y plataformas de pago. Garantizamos rendimiento, accesibilidad y escalabilidad, con pruebas, despliegue y soporte para una experiencia digital fluida.',
    url: 'https://digimedia-marketing.com/servicios/seo/',
    siteName: 'DigiMedia - Desarrollo Responsive',
    images: [], // se mantiene vacío por tu preferencia
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
      <ServicePopup idServicio={1} idSubservicio={4} />
    </>
  );
}
