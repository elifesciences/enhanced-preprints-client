import { DM_Sans, Poppins } from 'next/font/google';
import { type JSX } from 'react';
import './common.scss';
import './claims-tree-study-page.scss';
import {ClaimsTreeSection} from '../../../molecules/mira/claims-tree-section/claims-tree-section';

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

type Study = {
  heading: string,
  title: string,
  summary: string,
};

type Protocol = {
  id: string,
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
};

type ClaimsTreeStudyPageProps = {
  study: Study,
  protocols: Array<Protocol>,
};

export const ClaimsTreeStudyPage = (props: ClaimsTreeStudyPageProps): JSX.Element => (
  <>
    <main className={`page-wrapper ${dmSans.variable} ${poppins.variable}`}>
      <a href="#" className="close">
        <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
      </a>
      <div className="claims-tree-pages-content claims-tree-study-page">
        <h1>Study 2</h1>
        <ClaimsTreeSection
          heading={props.study.heading}
          title={props.study.title}
          summary={props.study.summary}
        />
        {props.protocols.map((protocol) => (
          <ClaimsTreeSection
            key={protocol.id}
            heading={protocol.heading}
            title={protocol.title}
            summary={protocol.summary}
            attribution={protocol.attribution}
            quote={protocol.quote}
          />
        ))}
      </div>
    </main>
  </>
);
