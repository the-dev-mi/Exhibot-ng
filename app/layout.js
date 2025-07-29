import { IBM_Plex_Sans, DM_Sans } from 'next/font/google';
import './globals.css';

const ibm = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm' 
});

const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibm.variable} ${dm.variable}`}>
      <body>{children}</body>
    </html>
  );
}