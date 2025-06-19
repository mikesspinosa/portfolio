import { motion } from 'framer-motion';
import { perspective } from '@/components/nav/anim';
import Link from 'next/link';

type NavLinksProps = {
  links: { title: string; href?: string }[];
  setIsActive?: (isActive: boolean) => void;
};

export default function NavLinks({ links, setIsActive }: NavLinksProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {links.map((link, i) => {
        const { title, href } = link;
        return (
          <div key={`b_${i}`} className="perspective-[120px] origin-bottom">
            <motion.div
              custom={i}
              variants={perspective}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <motion.div
                whileHover={{ 
                  x: 10,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                className="relative overflow-hidden"
              >
                <Link
                  href={href!}
                  onClick={() => setIsActive && setIsActive(false)}
                  className="text-[46px] italic text-[#FFF9C4] no-underline hover:text-[#16db65] transition-colors duration-300"
                >
                  {title}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
