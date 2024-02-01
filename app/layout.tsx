import type { Metadata } from 'next';
import { inter } from './ui/fonts';
import './ui/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Play Crack The Code!',
    default: 'Play Crack The Code!',
  },
  description:
    'Crack the Code: A thrilling puzzle game challenging players to decipher a hidden sequence using logic and deduction. Perfect for solo or duo players seeking a mental workout.',
  metadataBase: new URL('https://crackthecode.com'),
  openGraph: {
    title: 'Play Crack the Code',
    description:
      ' thrilling puzzle game challenging players to decipher a hidden sequence using logic and deduction.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
