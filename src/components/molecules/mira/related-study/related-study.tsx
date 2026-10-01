import type {JSX} from 'react';
import './related-study.scss';
import { dmSans } from '../../../fonts/mira';
import { preventNavigationOnTextSelection } from '../prevent-navigation-on-text-selection';

export type RelatedStudyProps = {
  name: string,
  title: string,
  summary: string,
  studyPageHref: string,
};

export const RelatedStudy = ({
  name, title, summary, studyPageHref,
}: RelatedStudyProps): JSX.Element => (
  <div className={`related-study ${dmSans.variable}`}>
    <a href={studyPageHref} draggable="false" onClick={preventNavigationOnTextSelection} className="study-card">
      <article>
        <header>{name}</header>
        <section className="summary">
          <p className="highlight">{title}</p>
          <p>{summary}</p>
        </section>
      </article>
    </a>
  </div>
);
