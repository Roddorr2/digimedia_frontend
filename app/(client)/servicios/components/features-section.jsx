'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export function FeaturesSection({ features }) {
  return (
    <section className="bg-white py-20 pt-0">
      <div className="mx-auto max-w-6xlxl px-6">
        {/* MOBILE →  CARRUSEL */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true, el: '.features-pagination' }}
            speed={400}
            spaceBetween={20}
            slidesPerView={1}
          >
            {features.map((feature, index) => {
              const bgColor = index % 2 === 0 ? 'bg-[#F89319]' : 'bg-[#B326FF]';

              return (
                <SwiperSlide key={index}>
                  <div
                    className={`${bgColor} rounded-3xl shadow-lg px-8 py-12 flex flex-col items-center text-center`}
                  >
                    <div className="mb-6 w-24 h-24 flex items-center justify-center">
                      {feature.icon}
                    </div>

                    <h3 className="text-white font-bold uppercase text-sm tracking-widest mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-white text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="features-pagination flex justify-center mt-4" />
          <style jsx global>{`
            .features-pagination {
              display: flex;
              justify-content: center;
              gap: 1px;
            }

:global(.features-pagination .swiper-pagination-bullet) {
  background: #d1d1d1;
  opacity: 1;
  width: 8px;
  height: 8px;
  margin: 0 6px !important;
  transition: transform 200ms ease, background 200ms ease;
}

:global(.features-pagination .swiper-pagination-bullet-active) {
  background: #a855f7;
  transform: scale(1.6);
}
            }
          `}</style>
        </div>

        <div className="hidden md:grid gap-10 justify-center grid-cols-[repeat(auto-fit,320px)]">
          {features.map((feature, index) => {
            const bgColor = index % 2 === 0 ? 'bg-[#F89319]' : 'bg-[#B326FF]';

            return (
              <div
                key={index}
                className={`${bgColor} rounded-3xl shadow-lg px-10 py-10 flex flex-col items-center text-center`}
              >
                <div className="mb-6 w-32 h-32 flex items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="text-white font-bold uppercase text-sm tracking-widest mb-4">
                  {feature.title}
                </h3>

                <p className="text-white text-sm leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
