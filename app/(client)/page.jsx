"use client"
import dynamic from "next/dynamic";
import Banner from './components/Home_Components/Banner';
import Servicios from './components/Home_Components/Servicios';
import Testimonios from './components/Home_Components/Testimonios';

// This is a test

const Clientes = dynamic(() => import("./components/Home_Components/Clientes"), { ssr: false });
const WhatsAppButton = dynamic(() => import("./components/WhatsAppButton"), { ssr: false });

export default function Home() {

  return (
    <>  
      <Banner />
      <Servicios />
      <Testimonios />
      <Clientes />
      <WhatsAppButton />
    </>
  );
}
