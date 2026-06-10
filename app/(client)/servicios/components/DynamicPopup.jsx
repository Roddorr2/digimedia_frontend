/*
"use client"; // <-- Esto le indica a Next.js que es un Client Component limpio

import dynamic from "next/dynamic";

// Aquí sí es 100% legal y seguro usar ssr: false
const ServicePopup = dynamic(() => import("@/components/ServicePopup"), {
  ssr: false,
});

export default function DynamicPopup() {
  return <ServicePopup idServicio={1} idSubservicio={4} />;
}
*/

"use client";

import dynamic from "next/dynamic";

// Mantenemos la importación dinámica limpia con ssr: false aquí dentro
const ServicePopup = dynamic(() => import("@/components/ServicePopup"), {
  ssr: false,
});

// Ahora el componente acepta propiedades dinámicas
export default function DynamicServicePopup({ idServicio, idSubservicio }) {
  return <ServicePopup idServicio={idServicio} idSubservicio={idSubservicio} />;
}


