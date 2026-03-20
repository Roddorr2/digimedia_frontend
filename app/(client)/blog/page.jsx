import { Hero } from '../components/page_components/Hero';
import Enlaces from './components/Enlaces';
import Principal from './components/Principal';

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
    </>
  );
}
