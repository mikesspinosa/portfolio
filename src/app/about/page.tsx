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
              <div className="flex flex-col gap-10">
                <div className="relative">
                  <div className="rounded-full blur-3xl" />
                  <Image
                    className="relative z-10 mx-auto h-auto w-full max-w-sm rounded-t-full shadow-lg"
                    width={1440}
                    height={1800}
                    src="/images/profile2.jpg"
                    alt="Profile picture"
                  />
                </div>
                {spotifyLoading ? (
                  <p>Loading Spotify playlists...</p>
                ) : spotifyError ? (
                  <p>Error: {spotifyError}</p>
                ) : playlists.length > 0 ? (
                  <SpotifyPlaylists playlists={playlists} />
                ) : null}
              </div>

              <div className="flex flex-col gap-10">
                <div className="text-primary-950/70 dark:text-primary-200/70 space-y-8">
                  <p className="text-2xl font-semibold">
                    Ingeniero en Tecnologías de la Información y Negocios Digitales con pasión por la innovación y la tecnología de vanguardia.
                  </p>
                  <p className="text-lg sm:text-xl">
                    En Tec de Monterrey, me especialicé en Tecnologías de la Información y Negocios Digitales. 
                    Durante mi tiempo en la universidad, participé en varios proyectos innovadores que combinaron 
                    tecnología y negocios, desarrollando soluciones que impactaron positivamente a la comunidad.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Como desarrollador full-stack, he trabajado en diversos proyectos que van desde aplicaciones web 
                    hasta soluciones de inteligencia artificial. Mi experiencia incluye el desarrollo de aplicaciones 
                    usando React, Node.js, y tecnologías cloud, siempre enfocándome en crear productos escalables y 
                    centrados en el usuario.
                  </p>
                  <p className="text-lg sm:text-xl">
                    He colaborado en proyectos de innovación tecnológica, donde he aplicado mis conocimientos en 
                    desarrollo de software y análisis de datos para crear soluciones que mejoran la eficiencia 
                    operativa y la experiencia del usuario. Mi enfoque siempre ha sido combinar la tecnología 
                    con una visión estratégica de negocios.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Actualmente, me enfoco en el desarrollo de soluciones de IA y aplicaciones web modernas, 
                    buscando siempre estar a la vanguardia de las nuevas tecnologías y tendencias del mercado. 
                    Mi objetivo es crear tecnología que no solo sea funcional, sino que también genere un 
                    impacto positivo en la sociedad.
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
