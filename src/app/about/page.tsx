'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useSpotify } from '@/hooks/useSpotify';
import Layout from '@/components/layout';
import { useGitHub } from '@/hooks/useGithub';
import GitHubContributionsGraph from '@/app/about/githubActivity';
import SpotifyPlaylists from '@/app/about/spotifyPlaylists';
import Link from 'next/link';

export default function About() {
  const starsRef = useRef<HTMLDivElement>(null);
  const {
    playlists,
    isLoading: spotifyLoading,
    error: spotifyError,
    topTracks
  } = useSpotify();

  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  useEffect(() => {
    // Animate stars
    if (!starsRef.current) return;
    gsap.to(starsRef.current?.children, {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      rotation: 'random(-360, 360)',
      duration: 3,
      ease: 'none',
      repeat: -1,
      yoyo: true,
      stagger: 0.1
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#a8e6cf] via-[#dcedc1] to-[#e8f3dc]">
      <Layout title="I'm Mike" center>
        <div className="relative min-h-screen">
          <div ref={starsRef}>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white opacity-70"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="flex flex-col gap-10 justify-between">
                <div className="relative flex-shrink-0">
                  <div className="rounded-full blur-3xl" />
                  <Image
                    className="relative z-10 mx-auto h-auto w-full max-w-sm rounded-t-full shadow-lg"
                    width={1440}
                    height={1800}
                    src="/images/profile2.jpg"
                    alt="Profile picture of Mike Espinosa"
                  />
                </div>
                {spotifyLoading ? (
                  <p>Loading Spotify playlists...</p>
                ) : spotifyError ? (
                  <p>Error: {spotifyError}</p>
                ) : playlists.length > 0 ? (
                  <div className="flex-1">
                    <SpotifyPlaylists playlists={playlists} />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-10">
                <div className="text-primary-950/70 dark:text-primary-200/70 space-y-8">
                  <p className="text-2xl font-semibold">
                    Ingeniero en Tecnologías de la Información y Negocios Digitales con pasión por la innovación y la tecnología de vanguardia.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Soy <strong>Mike Espinosa</strong>, estudiante de Ingeniería en Tecnologías de la Información y Negocios Digitales en la Universidad Anáhuac Mayab, especializado en integrar soluciones técnicas con estrategias de negocio digital. Mi trayectoria combina emprendimiento temprano colaborando con marcas internacionales desde los 16 años con una visión global adquirida en proyectos transfronterizos. Creo en la tecnología como herramienta para construir oportunidades inclusivas y escalables.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Mi expertise técnica incluye dominio avanzado de <strong>Java, Python, C++, C# y SQL</strong>, complementado con frameworks como <strong>React, Node.js y Docker</strong>. Actualmente trabajo como freelancer desarrollando aplicaciones web full-stack para clientes internacionales, priorizando arquitecturas escalables y experiencias de usuario intuitivas. Mi metodología integra prácticas ágiles con documentación precisa para garantizar calidad y mantenibilidad.
                  </p>
                  <p className="text-lg sm:text-xl">
                    La resiliencia define mi camino: viviendo con diabetes tipo 1 y después de una cirugía cardíaca, he transformado los desafíos en un motor de crecimiento. Esta fortaleza se materializa en mi voluntariado enseñando programación a niños vulnerables y en mi disciplina para equilibrar salud, estudios y desarrollo profesional. Cada reto reforzó mi filosofía: <em>los límites existen para ser reprogramados</em>.
                  </p>
                  <p className="text-lg sm:text-xl">
                    A corto plazo, enfoco mis esfuerzos en mi intercambio académico en la <strong>Universidad Francisco de Vitoria (UFV)</strong> en Madrid, donde profundizaré en inteligencia artificial y ciberseguridad. Paralelamente, busco proyectos freelance desafiantes que amplíen mi experiencia en sistemas distribuidos. A largo plazo, aspiro a liderar iniciativas tecnológicas con impacto social significativo, especialmente en economías emergentes.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Mis <strong>soft skills</strong> incluyen liderazgo adaptativo, resolución creativa de problemas, comunicación efectiva, inteligencia emocional, trabajo colaborativo, gestión del tiempo y resiliencia. Estas habilidades se nutren de hobbies como edición profesional de video (Adobe Premiere, DaVinci Resolve), diseño de experiencias interactivas y análisis de narrativas digitales. Estas competencias me permiten crear soluciones técnicas con perspectiva humana. Busco colaborar con equipos innovadores que desafíen el status quo.
                  </p>
                </div>
              </div>
            </div>
            <Link
              className="flex flex-col gap-10 pt-10"
              href="https://github.com/bettinasosa"
            >
              {githubLoading ? (
                <div></div>
              ) : githubError ? (
                <div></div>
              ) : githubData ? (
                <GitHubContributionsGraph
                  contributions={githubData.contributions}
                  totalContributions={githubData.totalContributions}
                  restrictedContributions={githubData.restrictedContributions}
                />
              ) : null}
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}
