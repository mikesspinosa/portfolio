'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

interface Certificate {
  title: string;
  date: string;
  imageUrl: string;
  certificateUrl: string;
  organization: string;
  description: string;
}

const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
  <Link 
    href={certificate.certificateUrl}
    target="_blank"
    className="group block h-full transform-gpu will-change-transform"
  >
    <Card className="relative h-[480px] w-[320px] md:h-[520px] md:w-[380px] overflow-hidden rounded-[15px] transition-all duration-500 ease-out group-hover:scale-105 bg-black/10 backdrop-blur-[2px] border-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80" />
      <CardContent className="relative h-full p-6 flex flex-col">
        <div className="relative w-full h-[180px] md:h-[220px] mb-4 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
          <Image
            src={certificate.imageUrl}
            alt={certificate.organization}
            fill
            priority
            className={`${
              certificate.organization === 'Amigos para Siempre' || certificate.organization === 'Cisco'
                ? 'object-cover object-center'
                : 'object-contain'
            }`}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, 30vw"
            style={{
              objectPosition: certificate.organization === "Amigos para Siempre" ? "50% 35%" : "center",
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
            {certificate.organization}
          </h3>
          <p className="text-sm text-white/70 mt-2">{certificate.date}</p>
          <p className="mt-3 text-sm text-white/80 leading-relaxed line-clamp-5">
            {certificate.description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
      </CardContent>
      <div className="absolute inset-0 rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: `
          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(225deg, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(315deg, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)
        `
      }} />
    </Card>
  </Link>
); 

export default CertificateCard; 