import dynamic from "next/dynamic";
import Banner from "./components/Home_Components/Banner";
import Testimonios from "./components/Home_Components/Testimonios";
const Servicios = dynamic(
  () => import("./components/Home_Components/Servicios") 
);

import ClientSideComponents from "./components/ClientSideComponents";

export default function Home() {
  return (
    <>
      <Banner />
      <Servicios />
      <Testimonios />
      <ClientSideComponents />
    </>
  );
}
