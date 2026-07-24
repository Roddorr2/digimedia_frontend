import dynamic from "next/dynamic";
import Banner from "./components/Home_Components/Banner";

const Servicios = dynamic(
  () => import("./components/Home_Components/Servicios"), 
  { loading: () => <div className="h-[600px] bg-black" /> }
);

const Testimonios = dynamic(
  () => import("./components/Home_Components/Testimonios"),
  { loading: () => <div className="h-[400px] bg-gradient-to-br from-[#100043] to-[#410c89]" /> }
);

const TestimoniosClientes = dynamic(
  () => import("./components/Home_Components/TestimoniosClientes"),
  { loading: () => <div className="h-[600px] bg-[#000118]" /> }
);

const ClientSideComponents = dynamic(
  () => import("./components/ClientSideComponents")
);

export default function Home() {
  return (
    <>
      <Banner />
      <Servicios />
      <Testimonios />
      <TestimoniosClientes />
      <ClientSideComponents />
    </>
  );
}