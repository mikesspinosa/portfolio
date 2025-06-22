'use client';
import ProjectHero from '@/app/projects/project/hero';
import PageScrollParallax from '@/components/pageScrollParallax';
import Image from 'next/image';
import React from 'react';

export default function APSProject() {
  const researchAssets = [
    '/images/aps/APS3.png',
    '/images/aps/APS2.png'
  ];
  const introduction =
    'Una experiencia que transforma vidas y construye puentes entre personas. ' +
    'A través de visitas y momentos compartidos, se forman conexiones genuinas ' +
    'que nos enseñan el verdadero significado de la amistad y el servicio a los demás.';

  const description = 'Construyendo Lazos que Perduran';
  const myRole =
    'Como voluntario, tuve el privilegio de compartir momentos invaluables ' +
    'que me enseñaron lecciones de vida fundamentales. Las visitas se convirtieron en espacios de ' +
    'alegría, aprendizaje mutuo y crecimiento personal. Cada experiencia fortaleció un vínculo especial que perdurará para siempre.';

  const staticImgs = [
    '/images/aps/APS1.jpg',
    '/images/aps/APS4.png',
    '/images/aps/APS3.webp',
  ];

  return (
    <div className="bg-foreground">
      <ProjectHero
        description={myRole}
        media={'https://player.vimeo.com/video/307596948'}
        isImage={false}
        title={'Amigos Para Siempre'}
      />
      <div className="hidden lg:block">
        <PageScrollParallax
          title={'Un Viaje de Amistad y Aprendizaje'}
          body={introduction}
          word={description}
          staticImgs={staticImgs}
          textColor="text-[#FF5722]"
          textOpacity={0.8}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        {researchAssets.map((asset, index) => (
          <Image
            key={index}
            src={asset}
            alt="Momentos compartidos"
            width={700}
            height={500}
            quality={80}
            className="h-auto w-full max-w-[700px] object-cover"
          />
        ))}
      </div>
    </div>
  );
}
