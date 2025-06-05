import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import Animations from './animations';
import Header from '@/components/layout/header';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Miguel Angel Espinosa',
  description: 'Portfolio personal de Miguel Angel Espinosa'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <SpeedInsights />
        <Animations>
          <main>
            <Header />
            <div className="flex flex-col bg-background text-foreground">
              <main className={`flex-grow ${inter.className}`}>{children}</main>
              <Analytics />
            </div>
            <Toaster position="bottom-right" />
          </main>
        </Animations>
      </body>
    </html>
  );
}
