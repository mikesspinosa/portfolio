'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from '@/components/animations/magnetic';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

export default function ContactInfo() {
  const container = useRef(null);
  const [currentTime, setCurrentTime] = useState('');
  const email = 'mike.espinosa1203@gmail.com';
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end']
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const animatedUnderlineStyle =
    'relative after:absolute after:left-1/2 after:mt-0.5 after:block after:h-px after:w-0' +
    ' after:-translate-x-1/2 after:transform after:bg-white after:duration-200 ' +
    "after:ease-linear after:content-[''] hover:after:w-full";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Merida'
      };
      setCurrentTime(now.toLocaleTimeString('es-MX', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEmailClick = () => {
    navigator.clipboard.writeText(email);
    toast.success('Correo copiado al portapapeles');
  };

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-between bg-foreground p-4 2xs:p-6 pt-32 text-white sm:justify-center"
    >
      <div className="w-full bg-foreground pt-[100px] 2xs:pt-[150px] sm:max-w-[1800px]">
        <div className="relative border-b border-gray-600 pb-8 2xs:pb-12 sm:mx-[100px]">
          <span className="flex flex-col space-y-6 2xs:space-y-8">
            <div className="flex items-start 2xs:items-center">
              <div className="relative h-14 w-14 2xs:h-16 2xs:w-16 overflow-hidden rounded-full sm:h-[100px] sm:w-[100px]">
                <Image
                  fill
                  alt={'profile'}
                  src={`/images/profile2.jpg`}
                  priority
                  sizes="(max-width: 320px) 56px, (max-width: 375px) 64px, (max-width: 640px) 100px, 100px"
                />
              </div>
              <div className="ml-4 2xs:ml-6 flex flex-col space-y-3 2xs:space-y-4">
                <h2 className="text-lg 2xs:text-xl font-medium sm:text-[5vh]">
                  ¡Trabajemos juntos!
                </h2>
                <h3 className="text-base 2xs:text-lg font-medium text-[#058c42] sm:text-2xl">
                  Miguel Angel Espinosa
                </h3>
                <div className="text-xs 2xs:text-sm text-gray-400 sm:text-base">
                  <span>Ingeniero en Tecnologías de la Información y Negocios Digitales & Creador de Contenido</span>
                </div>
              </div>
            </div>
          </span>
          <motion.div
            style={{ x }}
            className="absolute left-[calc(100%-150px)] top-[calc(100%+45px)] 2xs:left-[calc(100%-200px)] 2xs:top-[calc(100%+65px)] sm:left-[calc(100%-400px)] sm:top-[calc(100%-75px)]"
          >
            <Link href={'/contact'}>
              <RoundedButton className="absolute h-[80px] w-[80px] 2xs:h-[100px] 2xs:w-[100px] cursor-pointer items-center justify-center rounded-full bg-destructive text-white sm:h-[200px] sm:w-[200px]">
                <span className="text-sm 2xs:text-base sm:text-lg">Contáctame</span>
              </RoundedButton>
            </Link>
          </motion.div>
        </div>
        <div className="mt-4 2xs:mt-6 flex gap-3 2xs:gap-5 sm:mx-[100px]">
          <RoundedButton>
            <a 
              href={`mailto:${email}`}
              onClick={(e) => {
                e.preventDefault();
                handleEmailClick();
              }}
              className="cursor-pointer text-sm 2xs:text-base"
            >
              {email}
            </a>
          </RoundedButton>
        </div>

        <div className="mt-16 2xs:mt-20 flex flex-col justify-between p-4 2xs:p-5 space-y-8 2xs:space-y-12 sm:mx-[100px] sm:mt-48 sm:flex-row sm:space-y-0">
          <div className="flex flex-col space-y-4 2xs:space-y-6">
            <p className="min-w-screen text-sm 2xs:text-base sm:max-w-md leading-relaxed">
              Ingeniero en Tecnologías de la Información y Negocios Digitales | Influencer | AI | Tecnología con impacto positivo, esa es mi misión.
            </p>
          </div>
          <div className="flex items-end gap-2">
            <span className="flex flex-col gap-2 2xs:gap-3">
              <h3 className="m-0 cursor-default p-1 text-sm 2xs:text-base font-light text-gray-500">
                Versión
              </h3>
              <p className="relative m-0 cursor-pointer p-1 text-sm 2xs:text-base">2025.6.4</p>
            </span>
            <span className="flex flex-col gap-2 2xs:gap-3">
              <h3 className="m-0 cursor-default p-1 text-sm 2xs:text-base font-light text-gray-500">
                Timezone
              </h3>
              <p className="relative m-0 cursor-pointer p-1 text-sm 2xs:text-base">
                {currentTime} (GMT-6)
              </p>
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="flex flex-col gap-2 2xs:gap-3">
              <h3 className="m-0 cursor-default text-sm 2xs:text-base font-light text-gray-500">
                Redes Sociales
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="https://github.com/mikesspinosa"
                      className="flex items-center gap-1 group transition-all duration-300"
                    >
                      <FaGithub size={20} className="text-white group-hover:text-[#333] transition-colors duration-300" />
                      <div className="flex items-center">
                        <span className="mr-2 text-sm 2xs:text-base">GitHub</span>
                        <span className="text-[#16db65] opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm 2xs:text-base">
                          @mikesspinosa
                        </span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub: @mikesspinosa</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="https://www.linkedin.com/in/miguel-angel-espinosa-b24992291/"
                      className="flex items-center gap-1 group transition-all duration-300"
                    >
                      <FaLinkedin size={20} className="text-white group-hover:text-[#0077b5] transition-colors duration-300" />
                      <div className="flex items-center">
                        <span className="mr-2 text-sm 2xs:text-base">LinkedIn</span>
                        <span className="text-[#16db65] opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm 2xs:text-base">
                          Miguel Angel Espinosa
                        </span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn: Miguel Angel Espinosa</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="https://www.tiktok.com/@mikespinosa"
                      className="flex items-center gap-1 group transition-all duration-300"
                    >
                      <FaTiktok size={20} className="text-white group-hover:text-[#ff0050] transition-colors duration-300" />
                      <div className="flex items-center">
                        <span className="mr-2 text-sm 2xs:text-base">TikTok</span>
                        <span className="text-[#16db65] opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm 2xs:text-base">
                          @mikespinosa
                        </span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>TikTok: @mikespinosa</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
