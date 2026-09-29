import Image from 'next/image';
import type {JSX} from 'react';
import figure4 from '../../../../../public/mira/figure-4.jpg';
import './related-figure.scss';
import { dmSans } from '../../../fonts/mira';

export const RelatedFigure = (): JSX.Element => (
  <div className={`related-figure ${dmSans.variable}`}>
    <h2 className="label">Related figure:</h2>
    <figure className="card">
      <header>Figure 4</header>
      <Image src={figure4} alt="Figure 4: BOLD responses." />
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
