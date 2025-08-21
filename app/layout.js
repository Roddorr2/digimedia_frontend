import "./globals.css";
import localFont from "next/font/local";

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

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${telegraf.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
