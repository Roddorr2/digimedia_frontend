"use client";

import dynamic from "next/dynamic";

// Mantenemos la importación dinámica limpia con ssr: false aquí dentro
const ServicePopup = dynamic(() => import("@/components/ServicePopup"), {
  ssr: false,
});

// Ahora el componente acepta propiedades dinámicas
export default function DynamicServicePopup({ idServicio, idSubservicio, subservicioSlug }) {
  return (
    <ServicePopup
      idServicio={idServicio}
      idSubservicio={idSubservicio}
      subservicioSlug={subservicioSlug}
    />
  );
}
