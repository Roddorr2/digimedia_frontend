import "../styles/globals.css";

export const metadata = {
  title: ".:: Digimedia ::.",
  description:
    "Líderes innovadores en marketing digital. Conectamos tu marca con las audiencias del futuro, impulsando tu presencia online hacia el éxito.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
