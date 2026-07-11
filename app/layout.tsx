import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Queen Beauty — Luxury Beauty Store',
  description: 'Premium beauty products curated for queens.',
  verification: {
    google: 'SwGG6cKXYv-RoLQl4Qsq4RNTU45poZjgt7MuIy6Rrz8',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={geist.variable + ' h-full'}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}