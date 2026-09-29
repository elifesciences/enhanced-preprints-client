import type {JSX} from 'react';
import './related-study.scss';
import { dmSans } from '../../../fonts/mira';

export const RelatedStudy = (): JSX.Element => (
  <div className={`related-study ${dmSans.variable}`}>
    <h2 className="label">Related study:</h2>
    <article className="card">
      <header>Study 2</header>
      <section className="summary">
        <p className="highlight">Study 2: fMRI experiment (N&nbsp;=&nbsp;44) with identical task inside scanner, plus neuroimaging acquisition and analysis.</p>
        <p>Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.</p>
      </section>
    </article>
  </div>
);
