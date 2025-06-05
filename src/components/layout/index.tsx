import React, { PropsWithChildren } from 'react';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import { clsx } from 'clsx';

type Props = {
  title: string;
  center?: boolean;
};

export default function Layout({
  children,
  title,
  center
}: PropsWithChildren<Props>) {
  const parts = title.split('Mike');
  
  return (
    <div className="mt-36 px-8 py-16 sm:py-20">
      <h1
        className={clsx(
          'pb-14 text-3xl font-medium lg:text-[10rem]',
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
      {children} <ContrastCursor isActive={false} text={''} />
    </div>
  );
}
