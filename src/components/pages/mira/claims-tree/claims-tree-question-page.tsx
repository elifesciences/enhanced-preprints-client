import { DM_Sans, Poppins } from 'next/font/google';
import { type JSX } from 'react';
import './claims-tree-page.scss';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-poppins',
});

export const ClaimsTreeQuestionPage = (): JSX.Element => (
  <>
    <main className={`page-wrapper ${dmSans.variable} ${poppins.variable}`}>
      <h1>Question 1</h1>
    </main>

  </>
);
