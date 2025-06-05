import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { opacity, slideUp } from './anim';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';

export default function Description() {
  const phrase1 =
    'Ingeniero en Tecnologías de la Información y Negocios Digitales. ' +
    'Especializado en AI, desarrollo fullstack, con experiencia en tecnologías ' +
    'modernas y enfoques en crear soluciones innovadoras y escalables.';

  const phrase2 =
    '🚀 Explorando la intersección entre tecnología y creatividad. ' +
    'Cada línea de código es una oportunidad para innovar, ' +
    'cada proyecto una historia que contar. ' +
    'Construyendo el futuro digital, un commit a la vez. ' +
    '💡 Donde la lógica encuentra la imaginación.';

  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div
      ref={description}
      className="relative flex flex-col justify-center gap-12 p-8 sm:mt-[200px] sm:flex-row sm:p-20"
    >
      <div className="space-y-4">
        <p className="m-0 gap-2 leading-snug sm:text-4xl">
          {phrase1.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
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
        <p className="m-0 gap-2 leading-snug sm:text-4xl">
          {phrase2.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
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
      <div>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 pb-3 font-light sm:text-lg"
        >
          Ingeniero en Tecnologías de la Información y Negocios Digitales | Influencer | AI | Tecnología con impacto positivo, esa es mi misión.
        </motion.p>
        <div data-scroll-speed={0.1}>
          <Link href={'/about'}>
            <RoundedButton className="absolute ml-56 mt-6 flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full bg-[#058c42] text-white sm:ml-16 sm:mt-16 sm:h-[200px] sm:w-[200px]">
              Sobre mí
            </RoundedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
