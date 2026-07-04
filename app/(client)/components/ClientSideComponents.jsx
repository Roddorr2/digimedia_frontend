"use client";
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
  return (
    <>
      <Clientes />
      <WhatsAppButton />
      <MayaChatbot />
    </>
  );
}
