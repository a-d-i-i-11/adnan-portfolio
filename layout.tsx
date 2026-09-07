import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adnan Maqbool — Multi-Domain Business Strategist',
  description: 'Adnan Maqbool builds business growth systems across marketing, digital transformation, international business development and AI-enabled operations.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Adnan Maqbool — Multi-Domain Business Strategist',
    description: 'A living map of the businesses, systems, ideas and future Adnan Maqbool is building toward.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
