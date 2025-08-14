export const metadata = { 
  title: "Quiénes Somos | Digimedia Agencia de Marketing Digital",
  description:
    "Digimedia Marketing ayuda a marcas y emprendedores a través de SEO, redes sociales, diseño web y estrategias digitales con resultados medibles y auténticos.",
    openGraph: {
        title: "Quiénes Somos | Digimedia Agencia de Marketing Digital",
        description:
        "Digimedia Marketing ayuda a marcas y emprendedores a través de SEO, redes sociales, diseño web y estrategias digitales con resultados medibles y auténticos.",
        url: "https://digimedia-marketing.com/nosotros/",
        siteName: "Digimedia Marketing",
        images: [], 
        locale: "es_PE",
        type: "website",
    },
    alternates: {
        canonical: "https://digimedia-marketing.com/nosotros/",
    },
};

export default function nostrosLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}