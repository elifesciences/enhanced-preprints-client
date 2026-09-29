import Image, { type StaticImageData } from 'next/image';
import type {JSX} from 'react';
import './related-figure.scss';
import { dmSans } from '../../../fonts/mira';

export type RelatedFigureProps = {
  name: string,
  image: StaticImageData,
  title: string,
  summary: string,
};

export const RelatedFigure = ({
  name, image, title, summary,
}: RelatedFigureProps): JSX.Element => (
  <div className={`related-figure ${dmSans.variable}`}>
    <h2 className="label">Related figure:</h2>
    <figure className="card">
      <header>{name}</header>
      <Image src={image} alt="" />
      <figcaption>
        <p className="title">{title}</p>
        <p>{summary}</p>
      </figcaption>
    </figure>
  </div>
);
