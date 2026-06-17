'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const socialPlatforms = [
  {
    name: 'TikTok',
    image: '/contactanos/tiktok-icon.png',
    url: 'https://www.tiktok.com/@digimedia_marketing',
  },
  {
    name: 'Facebook',
    image: '/contactanos/facebook-icon.png',
    url: 'https://www.facebook.com/DigiMedia.Marketing1',
  },
  {
    name: 'Instagram',
    image: '/contactanos/instagram-icon.png',
    url: 'https://www.instagram.com/digimediamarketing/',
  },
  {
    name: 'LinkedIn',
    image: '/contactanos/linkedin-icon.png',
    url: 'https://www.linkedin.com/company/digimedia-mkt/',
  },
  {
    name: 'YouTube',
    image: '/contactanos/youtube-icon.png',
    url: 'https://www.youtube.com/@digimediamarketing',
  },
];

const SocialMediaLinks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="w-full bg-white/0 py-16 md:py-24 flex justify-center overflow-hidden relative z-30"
      initial={{ opacity: 0, y: '30%' }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5 }}
    >
      <div className="w-full max-w-[1280px] px-6 text-center md:text-left">
        {/* Título */}
        <div className="mb-12">
          <h2 className="text-[#b326ff] font-black text-3xl md:text-4xl mb-4 leading-tight">
            TENEMOS REDES SOCIALES
          </h2>
          <p className="text-text-gray-light text-lg md:text-2xl font-normal max-w-[462px]">
            Visita y revisa el contenido de nuestras redes sociales.
          </p>
        </div>

        {/* Grid Redes */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.name}
              className={`bg-white rounded-[20px] h-[175px] w-full max-w-[220px] 
              flex flex-col items-center justify-center 
              shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
              hover:-translate-y-3 transition-all duration-300 ease-out
              ${
                index === socialPlatforms.length - 1
                  ? 'col-span-2 md:col-span-1 justify-self-center'
                  : ''
              }`}
            >
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full h-full"
              >
                <Image
                  src={platform.image}
                  alt={platform.name}
                  width={200}
                  height={200}
                  className={`mb-3 object-contain ${
                    platform.name === 'Facebook'
                      ? 'w-[180px] h-[180px]'
                      : platform.name === 'Instagram'
                        ? 'w-[95px] h-[95px]'
                        : platform.name === 'LinkedIn'
                          ? 'w-[160px] h-[160px]'
                          : platform.name === 'TikTok'
                            ? 'w-[125px] h-[125px]'
                            : platform.name === 'YouTube'
                              ? 'w-[160px] h-[160px]'
                              : 'w-[90px] h-[90px]'
                  }`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SocialMediaLinks;
