"use client"; // <-- Esto le indica a Next.js que es un Client Component limpio

import dynamic from "next/dynamic";

// Aquí sí es 100% legal y seguro usar ssr: false
const ServicePopup = dynamic(() => import("@/components/ServicePopup"), {
  ssr: false,
});

export default function DynamicPopup() {
  return <ServicePopup idServicio={1} idSubservicio={4} />;
}

