import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { opacity, slideUp } from './anim';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';

export default function Description() {
  const phrase1 =
    'Ingeniero en Tecnologías de la Información y Negocios Digitales. ' +
    'Especializado en innovación tecnológica, inteligencia artificial y ' +
    'desarrollo de soluciones empresariales que transforman la manera de hacer negocios.';

  const phrase2 =
    'Mi enfoque combina la visión estratégica de negocios con conocimientos técnicos avanzados. ' +
    'Además, comparto mi pasión por la tecnología creando contenido educativo ' +
    'que inspira a otros a adentrarse en el mundo de la innovación digital.';

  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div
      ref={description}
      className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-2 space-y-6">
          <p className="m-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug">
            {phrase1.split(' ').map((word, index) => (
              <span key={index} className="relative mr-1.5 inline-flex overflow-hidden">
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? 'open' : 'closed'}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
          <p className="m-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug">
            {phrase2.split(' ').map((word, index) => (
              <span key={index} className="relative mr-1.5 inline-flex overflow-hidden">
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? 'open' : 'closed'}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>
        <div className="relative md:mt-4">
            <motion.p
              variants={opacity}
              animate={isInView ? 'open' : 'closed'}
              className="m-0 pb-3 font-light text-base sm:text-lg"
            >
              Ingeniero en Tecnologías de la Información y Negocios Digitales | Creador de contenido | AI | Tecnología con impacto positivo, esa es mi misión.
            </motion.p>
            <div data-scroll-speed={0.1} className="relative mt-8 flex justify-center md:justify-start">
              <Link href={'/about'}>
                <RoundedButton className="flex h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] cursor-pointer items-center justify-center rounded-full bg-destructive text-white text-xl">
                  Sobre mí
                </RoundedButton>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
