import { motion } from 'framer-motion';
import React from 'react';
import NavLinks from '@/components/nav/NavLinks';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Menu() {
  return (
    <div className="flex items-center space-x-4 text-white text-sm sm:text-base lg:hidden">
      <Link href="/about" className="hover:text-[#16db65] transition-colors duration-300 whitespace-nowrap">Sobre mí</Link>
      <Link href="/projects" className="hover:text-[#16db65] transition-colors duration-300">Proyectos</Link>
      <Link href="/contact" className="hover:text-[#16db65] transition-colors duration-300 flex items-center space-x-1">
        <span>Contacto</span>
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
