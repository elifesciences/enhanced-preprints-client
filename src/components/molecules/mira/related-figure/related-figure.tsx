import { DM_Sans } from 'next/font/google';
import type {JSX} from 'react';
import './related-figure.scss';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const RelatedFigure = (): JSX.Element => (
  <div className={`related-figure ${dmSans.variable}`}>
    <h2 className="label">Related figure:</h2>
    <figure className="card">
      <header>Figure 4</header>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" src="/mira/figure-4.jpg" alt="Figure 4: BOLD responses." />
      <figcaption>
        <p className="title">BOLD responses.</p>
        <p>
          Regions active during risky choices (A), social decision-making (B), with TPJ and precuneus most active during participant&apos;s risky social choices (C).
          Anterior insula responded to low partner outcomes from participant choices (D&ndash;F).
          Ventral striatum tracked participant rewards (G), while left STS tracked partner prediction errors from participant decisions (H&ndash;I).
        </p>
      </figcaption>
    </figure>
  </div>
);
