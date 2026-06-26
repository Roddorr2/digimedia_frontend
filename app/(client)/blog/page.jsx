import { Hero } from '../components/page_components/Hero';
import Enlaces from './components/Enlaces';
import Principal from './components/Principal';

export default function Page() {
  return (
    <>
      <Hero
        backgroundImage="/blog/fondo.webp"
        title="BLOG"
        position="center 40%"
      />

      {/* <Principal></Principal> */}
      <Enlaces></Enlaces>
    </>
  );
}
