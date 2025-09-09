export const metadata = {
  title: "DigiMedia - Blog",
  description:
    "La publicidad es la vida del negocio",
  openGraph: {
    title: "DigiMedia - Blog",
    description:
      "La publicidad es la vida del negocio",
    url: "https://digimedia-marketing.com/blog/",
    siteName: "Digimedia Marketing Blog",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/blog/",
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}