'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CertificateCard from './CertificateCard';

interface Certificate {
  title: string;
  date: string;
  imageUrl: string;
  certificateUrl: string;
  organization: string;
  description: string;
}

interface CarouselDotsProps {
  api: any;
  count: number;
}

const CarouselDots = ({ api, count }: CarouselDotsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            index === selectedIndex 
              ? 'bg-primary w-4' 
              : 'bg-gray-400/50'
          }`}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default function CertificateTimeline() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const duplicatedCertificates = useMemo(() => {
    if (certificates.length > 0) {
      return [...certificates, ...certificates];
    }
    return [];
  }, [certificates]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-white"></div>
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }

    if (isMobile) {
      return (
        <div>
          <Carousel
            opts={{ align: "center", loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {certificates.map((cert, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 flex justify-center">
                  <CertificateCard certificate={cert} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CarouselDots api={api} count={certificates.length} />
        </div>
      );
    }

    return (
      <div className="w-full inline-flex flex-nowrap overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll hover:pause">
          {duplicatedCertificates.map((cert, index) => (
            <li key={index}>
              <CertificateCard certificate={cert} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

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
        {renderContent()}
      </div>
    </div>
  );
} 