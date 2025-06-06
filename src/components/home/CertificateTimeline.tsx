import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Certificate {
  title: string;
  date: string;
  imageUrl: string;
  certificateUrl: string;
  organization: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    title: 'Ejemplo de Certificado',
    date: '2024',
    imageUrl: '/images/certificates/certificate-placeholder.jpg',
    certificateUrl: 'https://ejemplo.com',
    organization: 'Organización',
    description: 'Descripción del certificado y habilidades adquiridas'
  }
  // Aquí podrás agregar más certificados
];

export default function CertificateTimeline() {
  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">Certificaciones</h2>
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-white/20" />
          
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-16 flex ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } items-center justify-center gap-8`}
            >
              {/* Punto en la línea de tiempo */}
              <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-primary" />
              
              {/* Contenido */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <Link 
                  href={cert.certificateUrl}
                  target="_blank"
                  className="group block overflow-hidden rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{cert.title}</h3>
                  <p className="mt-2 text-sm text-primary">{cert.organization}</p>
                  <p className="mt-1 text-sm text-gray-400">{cert.date}</p>
                  <p className="mt-4 text-gray-300">{cert.description}</p>
                </Link>
              </div>
              
              {/* Espacio para mantener el centrado */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 