import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ClientWrapper from './client-wrapper';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "Average Adam's Food Reviews",
  description: 'A food review website with restaurant ratings and recommendations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

