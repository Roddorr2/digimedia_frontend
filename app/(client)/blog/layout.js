export const metadata = { 
  title: "Blog de DigiMedia Marketing Digital: Tendencias, Estrategias y Consejos",
  description:
    "Descubre el blog de DigiMedia con artículos sobre marketing digital, SEO, branding y estrategias clave para hacer crecer tu negocio.",
    openGraph: {
        title: "Blog de DigiMedia Marketing Digital: Tendencias, Estrategias y Consejos",
        description:
        "Descubre el blog de DigiMedia con artículos sobre marketing digital, SEO, branding y estrategias clave para hacer crecer tu negocio.",
        url: "https://digimedia-marketing.com/blog/",
        siteName: "Digimedia Marketing",
        images: [], 
        locale: "es_PE",
        type: "website",
    },
    alternates: {
        canonical: "https://digimedia-marketing.com/blog/",
    },
};

export default function blogLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}