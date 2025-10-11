import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext";

const montserrat = localFont({
  src: [
    { path: "../public/fonts/montserrat/Montserrat-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/montserrat/Montserrat-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const telegraf = localFont({
  src: [
    { path: "../public/fonts/telegraf/Telegraf-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/telegraf/Telegraf-UltraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-telegraf",
  display: "swap",
});

export const metadata = {
  verification: {
    google: "xhfnSm5zX45Ov_N5NO-py7sXFqI6VC5EDAb4FhYafNQ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MR2MC9SB');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} ${telegraf.variable} antialiased`}>
        {/* El AuthProvider debe envolver todo el contenido */}
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* Google Tag Manager (no-script) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MR2MC9SB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
