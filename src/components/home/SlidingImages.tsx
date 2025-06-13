import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Slider = {
  color: string;
  src: string;
};
type Props = {
  slider1: Slider[];
  slider2: Slider[];
};

export default function SlidingImages({ slider1, slider2 }: Props) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x1Mobile = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const x2Mobile = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div
      ref={container}
      className="relative z-20 flex flex-col gap-8 md:gap-12 py-20 md:py-32 bg-background overflow-hidden"
    >
      <motion.div
        style={{ x: isDesktop ? x1 : x1Mobile }}
        className="flex gap-4 md:gap-8 justify-center"
      >
        {slider1.map((project, index) => {
          const projectPath = project.src.includes('aps/') ? '/projects/aps' : '/projects';
          return (
            <Link href={projectPath} key={index} className="flex-shrink-0 w-4/5 md:w-1/3 lg:w-1/4 h-60 md:h-80 shadow-lg">
              <div
                className="w-full h-full"
                style={{ backgroundColor: project.color }}
              >
                <div className="relative h-full w-full">
                  <Image
                    alt="image"
                    src={`/images/${project.src}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
      <motion.div
        style={{ x: isDesktop ? x2 : x2Mobile }}
        className="flex gap-4 md:gap-8 justify-center"
      >
        {slider2.map((project, index) => {
          const projectPath = project.src.includes('aps/') ? '/projects/aps' : '/projects';
          return (
            <Link href={projectPath} key={index} className="flex-shrink-0 w-4/5 md:w-1/3 lg:w-1/4 h-60 md:h-80 shadow-lg">
              <div
                className="w-full h-full"
                style={{ backgroundColor: project.color }}
              >
                <div key={index} className="relative h-full w-full shadow-lg ">
                  <Image
                    fill
                    alt="image"
                    src={`/images/${project.src}`}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
      <div className="flex w-full justify-center mt-8 md:mt-12">
        <Link href={'/projects'}>
          <RoundedButton className="text-lg md:text-xl px-8 py-4">Ver Experiencia</RoundedButton>
        </Link>
      </div>
    </div>
  );
}
