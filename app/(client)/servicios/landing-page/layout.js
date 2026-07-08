import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: 'Sub servicio de Landing Page | Digimedia',
  description:
    'Diseñamos landing pages de alta conversión que transforman visitantes en clientes. Mensajes persuasivos, diseño optimizado para móviles y llamadas a la acción estratégicas para maximizar tus resultados digitales.',
  openGraph: {
    title: 'Sub servicio de Landing Page | Digimedia',
    description:
      'Diseñamos landing pages de alta conversión que transforman visitantes en clientes. Mensajes persuasivos, diseño optimizado para móviles y llamadas a la acción estratégicas para maximizar tus resultados digitales.',
    url: 'https://digimedia-marketing.com/servicios/landing-page/',
    siteName: 'DigiMedia - Landing Page',
    images: [],
    locale: 'es_PE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://digimedia-marketing.com/servicios/landing-page/',
  },
};

export default function LandingPageLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="landing-page" />
    </>
  );
}
