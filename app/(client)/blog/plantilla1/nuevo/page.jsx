"use client";

import { usePathname } from "next/navigation";
import PlantillaClient from "../PlantillaClient";

// Sirve como respaldo cuando /blog/plantilla1/{slug}/ todavía no tiene
// build propio (post recién publicado). El .htaccess redirige aquí
// internamente sin cambiar la URL visible; leemos el slug real desde
// la barra de direcciones y traemos el contenido en vivo.
export default function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const link = segments[segments.length - 1] || "";

  return <PlantillaClient link={link} />;
}
