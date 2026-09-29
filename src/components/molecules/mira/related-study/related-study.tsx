import type {JSX} from 'react';
import './related-study.scss';
import { dmSans } from '../../../fonts/mira';

export type RelatedStudyProps = {
  name: string,
  title: string,
  summary: string,
};

export const RelatedStudy = ({ name, title, summary }: RelatedStudyProps): JSX.Element => (
  <div className={`related-study ${dmSans.variable}`}>
    <h2 className="label">Related study:</h2>
    <article className="card">
      <header>{name}</header>
      <section className="summary">
        <p className="highlight">{title}</p>
        <p>{summary}</p>
      </section>
    </article>
  </div>
);
