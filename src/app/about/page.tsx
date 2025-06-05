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
    <div className="relative overflow-hidden bg-gradient-to-b from-[#a8e6cf] via-[#dcedc1] to-[#ffd3b6]">
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
                    En{' '}
                    <Link
                      href="https://www.tec.mx/"
                      className="font-semibold underline"
                    >
                      Tecnológico de Monterrey
                    </Link>
                    , me especialicé en Ingeniería en Tecnologías de la Información y Negocios Digitales. Durante mi formación, 
                    desarrollé proyectos innovadores que combinaban tecnología y estrategia empresarial, sentando las bases 
                    para mi carrera en el desarrollo tecnológico.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Mi trayectoria profesional comenzó en{' '}
                    <Link
                      href="https://www.empresa1.com"
                      className="font-semibold underline"
                    >
                      una consultora tecnológica
                    </Link>
                    , donde participé en el desarrollo de soluciones digitales para empresas líderes. 
                    Me enfoqué en la creación de aplicaciones web escalables y en la implementación 
                    de sistemas de inteligencia artificial.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Posteriormente, me sumergí en el mundo del desarrollo web moderno, trabajando con tecnologías como 
                    React, Next.js y Node.js. Durante este tiempo, contribuí al desarrollo de plataformas educativas 
                    y sistemas de gestión empresarial, siempre buscando combinar la innovación técnica con un 
                    impacto social positivo.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Recientemente, he estado enfocado en la creación de contenido educativo y el desarrollo de 
                    proyectos que utilizan inteligencia artificial. Mi objetivo es democratizar el acceso al 
                    conocimiento tecnológico y ayudar a otros a aprender programación y desarrollo web.
                  </p>
                  <p className="text-lg sm:text-xl">
                    Durante mi tiempo en la universidad, participé en varios proyectos destacados, incluyendo{' '}
                    <Link
                      href="/projects/m31"
                      className="font-semibold underline"
                    >
                      una plataforma de aprendizaje en línea
                    </Link>
                    , que fue reconocida por su innovación, y{' '}
                    <Link
                      href="/projects/axo"
                      className="font-semibold underline"
                    >
                      un sistema de gestión educativa
                    </Link>
                    , que fue implementado en varias instituciones educativas.
                  </p>
                  <p className="text-lg sm:text-xl">
                    At{' '}
                    <Link
                      href="https://www.sojo.uk/"
                      className="font-semibold underline"
                    >
                      Sojo
                    </Link>
                    , I was the founding full-stack engineer, responsible for
                    the design, development, and deployment of the
                    company&apos;s core platform. I built a scalable and
                    user-friendly app that allowed users to order repairs and
                    customisation clothing services online.
                  </p>
                  <p className="text-lg sm:text-xl">
                    After Sojo, I joined{' '}
                    <Link
                      href="https://www.catapultlabs.xyz/"
                      className="font-semibold underline"
                    >
                      Catapult Labs
                    </Link>
                    , a startup in the blockchain space, as a founding
                    full-stack software engineer. I played a key role in the
                    development of the company&apos;s flagship product, a Web3
                    profiles platform that enables networking in the
                    decentralized space.
                  </p>
                  <p className="text-lg sm:text-xl">
                    I then worked on developing decentralised financial
                    primitives and protocols to enable OTC (Over-The-Counter)
                    crypto markets on-chain, including collateral management and
                    margin trading systems. During this time I also learnt
                    Solidity, to enable the development of smart contracts to
                    enable new on-chain financial products.
                  </p>
                  <p className="text-lg sm:text-xl">
                    In recent months I have been working on an AI co-pilot for
                    digital asset trading that unifies client conversations
                    across chat clients like Telegram using OpenAI&apos;s
                    models.
                  </p>
                  <p className="text-lg sm:text-xl">
                    At Imperial College London, I studied design engineering.
                    During my time at university, I worked on a number of
                    projects, including{' '}
                    <Link
                      href="/projects/m31"
                      className="font-semibold underline"
                    >
                      Andromeda
                    </Link>
                    , which was awarded a gold prize in the Creative Conscience
                    Awards, and{' '}
                    <Link
                      href="/projects/axo"
                      className="font-semibold underline"
                    >
                      AxoWear
                    </Link>
                    , which was exhibited at the Design Museum London.
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
