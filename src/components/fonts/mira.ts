import { DM_Sans, Poppins } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-poppins',
});
