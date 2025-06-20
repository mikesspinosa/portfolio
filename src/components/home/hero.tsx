import React from 'react';
import CertificateTimeline from './CertificateTimeline';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Particles = dynamic(() => import('../animations/Particles'), {
  ssr: false,
});

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-foreground align-middle">
      <Particles />
      <div className="flex-grow" />
      <CertificateTimeline />
      <div className="flex-grow" />
    </div>
  );
}
