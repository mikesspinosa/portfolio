'use client';
import React, { useContext } from 'react';
import { ModalContext } from '@/app/projects/modalContext';
import { Wrench, Plus } from 'lucide-react';
import { type HSL } from '@/lib/types';

interface Props {
  index: number;
  title: string;
  tag: string;
  wip?: boolean;
  special?: string;
  color: string;
}
const hexToHsl = (hex: string): HSL | null => {
  if (!hex.startsWith('#')) return null;

  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  } else {
    return null;
  }

  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};
export default function ProjectLink({
  index,
  title,
  tag,
  wip,
  special,
  color
}: Props) {
  const { setModal } = useContext(ModalContext);
  const isRainbow = special === 'rainbow';
  const hslColor = hexToHsl(color);
  const style = hslColor
    ? ({
        '--project-h': hslColor.h,
        '--project-s': `${hslColor.s}%`
      } as React.CSSProperties)
    : {};
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="align-center flex w-full cursor-pointer justify-between border-b border-b-gray-600
      px-5 py-10 transition-all duration-200 hover:opacity-50"
    >
      <h2
        style={style}
        className={`m-0 flex items-center gap-4 text-xl font-normal transition-all duration-300 hover:translate-x-[-10px] lg:text-6xl ${
          isRainbow ? 'rainbow-text' : 'monochromatic-text'
        }`}
      >
        {title}
        {wip && <Wrench className="h-8 w-8 lg:h-12 lg:w-12" />}
        {isRainbow && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white lg:h-16 lg:w-16">
            <Plus className="h-8 w-8 lg:h-12 lg:w-12" />
          </div>
        )}
      </h2>
      <p className="text-sm font-light transition-all duration-300 hover:translate-x-[10px]">
        {tag}
      </p>
    </div>
  );
}
