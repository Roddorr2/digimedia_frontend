import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: ".:: Digimedia ::.",
  description:
    "Líderes innovadores en marketing digital. Conectamos tu marca con las audiencias del futuro, impulsando tu presencia online hacia el éxito.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
      
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}