'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from '@/components/nav';
import { useEffect, useState } from 'react';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import { clsx } from 'clsx';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  title?: string;
  center?: boolean;
};

export default function Layout({ children, title, center }: Props) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const parts = title ? title.split('Mike') : [''];
  
  return (
    <div className="mt-36 px-8 py-8 lg:py-16">
      <header className="fixed z-50 w-full bg-transparent px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            {/* Existing code */}
          </Link>
        </div>
      </header>
      <main
        className={cn(
          'min-h-screen',
          center && 'flex flex-col items-center justify-center'
        )}
      >
      <h1
        className={clsx(
            'pb-8 text-6xl font-medium md:text-8xl lg:pb-14 lg:text-[10rem] whitespace-nowrap',
          center ? 'items-center text-center' : ''
        )}
      >
        {parts[0]}
        {parts.length > 1 && (
          <span className="inline-block hover:scale-110 hover:text-[#1DB954] hover:rotate-6 transition-all duration-300 ease-in-out cursor-pointer">
            Mike
          </span>
        )}
        {parts[1]}
      </h1>
        {children}
      </main>
      <ContrastCursor isActive={false} text={''} />
    </div>
  );
}
