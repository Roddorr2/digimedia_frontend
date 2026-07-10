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

// Monta un widget en idle time, con un timeout de idle propio y un fallback
// setTimeout con su propio delay, para que no todos se monten en el mismo commit.
function useDeferredReady(idleTimeout, fallbackDelay) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => setReady(true), {
        timeout: idleTimeout,
      });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(() => setReady(true), fallbackDelay);
    return () => clearTimeout(timeoutId);
  }, [idleTimeout, fallbackDelay]);

  return ready;
}

export default function ClientSideComponents() {
  // Escalonado: WhatsApp primero (más liviano), luego Clientes, y al final
  // MayaChatbot (el más costoso de inicializar por sus listeners y timers),
  // para no competir todos en el mismo commit de React.
  const readyWhatsApp = useDeferredReady(800, 800);
  const readyClientes = useDeferredReady(1500, 1500);
  const readyChatbot = useDeferredReady(2200, 2200);

  return (
    <>
      {readyWhatsApp && <WhatsAppButton />}
      {readyClientes && <Clientes />}
      {readyChatbot && <MayaChatbot />}
    </>
  );
}
