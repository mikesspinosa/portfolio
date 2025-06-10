import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import '@/styles/certificates.css';

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
        setCertificates([{
          title: 'Ejemplo de Certificado',
          date: '2024',
          imageUrl: '/images/certificates/certificate-placeholder.jpg',
          certificateUrl: 'https://ejemplo.com',
          organization: 'Organización',
          description: 'Descripción del certificado y habilidades adquiridas'
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-4xl font-bold text-white">
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Potenciando mi Desarrollo
          </span>
          <br />
          <span className="text-2xl font-light mt-2 block text-gray-300">
            Certificaciones y Logros Profesionales
          </span>
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-visible px-8">
            <div className="relative">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full max-w-6xl mx-auto py-4 px-4 sm:py-12 sm:px-8"
              >
                <CarouselContent className="overflow-visible">
                  {certificates.map((cert, index) => (
                    <CarouselItem 
                      key={index} 
                      className="basis-[85%] sm:basis-1/2 lg:basis-1/3 overflow-visible"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="h-full overflow-visible py-2 sm:py-8"
                      >
                        <Link 
                          href={cert.certificateUrl}
                          target={cert.certificateUrl.startsWith('/') ? '_self' : '_blank'}
                          className="group block h-full transform-gpu will-change-transform"
                        >
                          <Card className="relative h-[520px] sm:h-[450px] overflow-hidden rounded-[15px] transition-all duration-500 ease-out group-hover:scale-105 bg-black/10 backdrop-blur-[2px] border-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80" />
                            
                            <CardContent className="relative h-full p-4 sm:p-6 flex flex-col">
                              <div className="relative w-full h-[200px] sm:h-[180px] mb-4 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                                <Image
                                  src={cert.imageUrl}
                                  alt={cert.organization}
                                  fill
                                  priority
                                  className={`${cert.organization === "Amigos para Siempre" ? "object-cover object-center scale-[1.2] transform translate-y-2" : "object-contain"}`}
                                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, 30vw"
                                  style={{
                                    objectPosition: cert.organization === "Amigos para Siempre" ? "50% 35%" : "center",
                                    width: '100%',
                                    height: '100%'
                                  }}
                                />
                              </div>

                              <div className="flex-1 flex flex-col">
                                <h3 className="text-xl sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                                  {cert.organization}
                                </h3>
                                <p className="text-sm sm:text-sm text-white/70 mt-2">{cert.date}</p>
                                <p className="mt-3 text-base sm:text-sm text-white/80 leading-relaxed line-clamp-[8] sm:line-clamp-6">
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
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-2 sm:-left-12 top-1/2 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute -right-2 sm:-right-12 top-1/2 transform -translate-y-1/2 z-10" />
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 