
export const metadata = {
  title: "DigiMedia - Pagina de Inicio",
  description:
    "¿No sabes por dónde empezar? Impulsa tu marca al siguiente nivel con nosotros",
  openGraph: {
    title: "DigiMedia - Pagina de Inicio",
    description:
      "¿No sabes por dónde empezar? Impulsa tu marca al siguiente nivel con nosotros",
    url: "https://digimedia-marketing.com/",
    siteName: "DigiMedia Pagina de Inicio",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/",
  },
};

export default function HomeLayout({ children }) {
  return <>{children}</>;
}