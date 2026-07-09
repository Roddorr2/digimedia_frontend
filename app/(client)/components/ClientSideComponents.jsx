"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Clientes = dynamic(
  () => import("./Home_Components/Clientes"),
  { ssr: false }
);

const WhatsAppButton = dynamic(
  () => import("./WhatsAppButton"),
  { ssr: false }
);

const MayaChatbot = dynamic(
  () => import("./Chatbot"),
  { ssr: false }
);

export default function ClientSideComponents() {
  const [ready, setReady] = useState(false);

  // Difiere el montaje de widgets no críticos (marquee de clientes, WhatsApp,
  // chatbot) para no competir con el hilo principal durante la carga inicial.
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => setReady(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;

  return (
    <>
      <Clientes />
      <WhatsAppButton />
      <MayaChatbot />
    </>
  );
}
