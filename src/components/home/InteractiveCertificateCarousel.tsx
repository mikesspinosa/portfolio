'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Certificate {
  title: string;
  date: string;
  imageUrl: string;
  certificateUrl: string;
  organization: string;
  description: string;
}

export default function CertificateTimeline() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/linkedin-certificates');
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        const data = await response.json();
        setCertificates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching certificates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="relative z-10 py-16 w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Potenciando mi Desarrollo
            </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-light mt-2 text-gray-300">
            Certificaciones y Logros Profesionales
            </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {certificates.map((cert, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Link 
                    href={cert.certificateUrl}
                    target="_blank"
                    className="group block h-full transform-gpu will-change-transform"
                  >
                    <Card className="relative h-[500px] sm:h-[450px] w-full overflow-hidden rounded-[15px] transition-all duration-500 ease-out group-hover:scale-105 bg-black/10 backdrop-blur-[2px] border-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80" />
                      
                      <CardContent className="relative h-full p-6 flex flex-col">
                        <div className="relative w-full h-[160px] sm:h-[180px] mb-4 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                          <Image
                            src={cert.imageUrl}
                            alt={cert.organization}
                            fill
                            priority
                            className={`${
                              cert.organization === 'Amigos para Siempre' || cert.organization === 'Cisco'
                                ? 'object-cover object-center'
                                : 'object-contain'
                            }`}
                            sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, 30vw"
                            style={{
                              objectPosition: cert.organization === "Amigos para Siempre" ? "50% 35%" : "center",
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          <h3 className="text-lg sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                            {cert.organization}
                          </h3>
                          <p className="text-sm text-white/70 mt-2">{cert.date}</p>
                          <p className="mt-3 text-sm text-white/80 leading-relaxed line-clamp-5">
                            {cert.description}
                          </p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
} 