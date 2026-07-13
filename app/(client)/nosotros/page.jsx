import NosotrosClient from './NosotrosClient';
import { getTestimonials } from '@/lib/testimonials';

export default async function NosotrosPage() {
  const reviews = await getTestimonials();

  return <NosotrosClient reviews={reviews} />;
}