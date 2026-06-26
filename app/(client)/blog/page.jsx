import { Hero } from "../components/page_components/Hero";
import Enlaces from "./components/Enlaces";
import WhatsAppButton from "../components/WhatsAppButton";
import MayaChatbot from "../components/MayaChatbot";

export default function Page() {
  return (
    <>
      <Hero
        backgroundImage="/blog/fondo.webp"
        title="BLOG"
        position="center 30%"
      />

      {/* <Principal></Principal> */}
      <Enlaces></Enlaces>
      <WhatsAppButton />
      <MayaChatbot />
    </>
  );
}
