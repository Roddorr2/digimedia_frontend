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

// Igual que useDeferredReady, pero además se adelanta si el usuario ya está
// interactuando con la página (scroll, click, touch, teclado): en ese caso
// no tiene sentido seguir esperando, el usuario ya está activo.
function useDeferredReadyOrInteraction(idleTimeout, fallbackDelay) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const markReady = () => setReady(true);

    let idleId;
    let timeoutId;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(markReady, { timeout: idleTimeout });
    } else {
      timeoutId = setTimeout(markReady, fallbackDelay);
    }

    const interactionEvents = ["scroll", "click", "touchstart", "keydown"];
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, markReady, { once: true, passive: true })
    );

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, markReady)
      );
    };
  }, [idleTimeout, fallbackDelay, ready]);

  return ready;
}

export default function ClientSideComponents() {
  // Escalonado: WhatsApp primero (más liviano), luego Clientes, y al final
  // MayaChatbot (el más costoso de inicializar por sus listeners y timers),
  // para no competir todos en el mismo commit de React.
  const readyWhatsApp = useDeferredReady(800, 800);
  const readyClientes = useDeferredReady(1500, 1500);
  // MayaChatbot no es contenido SEO ni necesario en el primer pantallazo:
  // se difiere más (6s) salvo que el usuario ya esté interactuando, en cuyo
  // caso se monta de inmediato.
  const readyChatbot = useDeferredReadyOrInteraction(6000, 6000);

  return (
    <>
      {readyWhatsApp && <WhatsAppButton />}
      {readyClientes && <Clientes />}
      {readyChatbot && <MayaChatbot />}
    </>
  );
}
