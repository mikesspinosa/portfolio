'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProjectLink from '@/app/projects/projectLink';
import Modal from '@/app/projects/project/modal';
import Layout from '@/components/layout';
import { ModalContext } from './modalContext';

const projects = [
  {
    title: 'APS',
    src: 'aps/APS1.jpg',
    description:
      'A video/audio game controller to make digital entertainment more approachable to those with visual impairments.',
    href: '/projects/aps',
    tag: 'Voluntariado',
    color: '#FF1493'
  },
  {
    title: '2Garzas',
    src: '2Garzas/2Garzas1.png',
    href: 'https://2garzas.com.mx/',
    tag: 'Comida Gourmet',
    color: '#e3f6f0'
  },
  {
    title: 'Hemodialisis Renal',
    description: 'UX/UI & Dev',
    src: 'HemodialisisRenal/HemodialisisRenal.png',
    href: 'https://renal-seven.vercel.app/',
    tag: 'Suministros Médicos',
    color: '#b6c1e1'
  },
  {
    title: 'GlucoMind',
    description:
      'Reusable packaging made of highly recyclable materials for baby bathing products.',
    src: 'GlucoMind/GlucoMind1.png',
    href: 'https://github.com/mikesspinosa/diabetes-app',
    tag: 'App para Diabetes',
    color: '#1a6ad8',
    wip: true
  },
  {
    title: 'Creemos algo juntos',
    description: 'An interstellar games arcade with a hologram screen.',
    src: 'CreemosAlgoJuntos/CreemosAlgoJuntos1.png',
    href: '/contact',
    tag: '',
    color: '#303030',
    special: 'rainbow'
  }

  // {
  //   title: 'DAO social network',
  //   src: 'sojo/astra.png',
  //   href: '/projects/catapult-v1',
  //   tag: 'Software',
  //   color: '#303030'
  // },
  // {
  //   title: 'SOJO',
  //   src: 'sojo/astra.png',
  //   href: '/projects/sojo',
  //   tag: 'Software',
  //   color: '#303030'
  // },
  // {
  //   title: 'JENGA',
  //   src: 'jenga.jpg',
  //   href: '/projects/robot-jenga',
  //   tag: 'Robotics',
  //   color: '#706D63'
  // },
  // {
  //   title: 'Woody',
  //   src: 'woody.jpg',
  //   href: '/projects/woody',
  //   tag: 'Electronics',
  //   color: '#706D63'
  // },
  // {
  //   title: 'DAFT(PUNK)BOT',
  //   src: 'cubo/cubo.jpg',
  //   href: '/projects/cubo',
  //   tag: 'Electronics',
  //   color: '#EFE8D3'
  // },
  // {
  //   title: 'Tandem bike',
  //   src: 'bike.png',
  //   href: '/projects/tandem-bike-bike',
  //   tag: 'CAD & optimisation',
  //   color: '#EFE8D3'
  // },
  // {
  //   title: 'TETRIS',
  //   src: 'tetris.png',
  //   href: '/projects/tetris',
  //   tag: 'Software',
  //   color: '#EFE8D3'
  // },
  // {
  //   title: 'Bike',
  //   description: 'UX/UI & Dev',
  //   src: 'bike.png',
  //   link: '/projects/bike',
  //   color: '#000000',
  // },
];

export default function ProjectsHome() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Layout title={'Mi Trayecto'}>
        <div className="m-0">
          <div className="m-0 overflow-hidden">
            {projects.map((project, index) => {
              const isExternal = project.href.startsWith('http');
              if (isExternal) {
                return (
                  <a
                    href={project.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ProjectLink
                      index={index}
                      title={project.title}
                      tag={project.tag}
                      wip={project.wip}
                      special={project.special}
                      color={project.color}
                    />
                  </a>
                );
              }
              return (
                <Link href={project.href} key={index}>
                  <ProjectLink
                    index={index}
                    title={project.title}
                    tag={project.tag}
                    wip={project.wip}
                    special={project.special}
                    color={project.color}
                  />
                </Link>
              );
            })}
          </div>
          <Modal projects={projects} />
        </div>
      </Layout>
    </ModalContext.Provider>
  );
}
