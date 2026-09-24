import { DM_Sans, Poppins } from 'next/font/google';
import { type JSX } from 'react';
import './common.scss';
import './claims-tree-claim-page.scss';
import {ClaimsTreeSection} from '../../../molecules/mira/claims-tree-section/claims-tree-section';
import {RelatedFigure} from '../../../molecules/mira/related-figure/related-figure';
import {RelatedStudy} from '../../../molecules/mira/related-study/related-study';

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

type Section = {
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
};

type ClaimsTreeClaimPageProps = {
  claim: Section,
  evidence: Section,
};

export const ClaimsTreeClaimPage = (props: ClaimsTreeClaimPageProps): JSX.Element => (
  <>
    <main className={`page-wrapper ${dmSans.variable} ${poppins.variable}`}>
      <a href="#" className="close">
        <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
      </a>
      <div className="claims-tree-pages-content claims-tree-claim-page">
        <h1>Claim 1 (Question 1)</h1>
        <ClaimsTreeSection {...props.claim} />
        <ClaimsTreeSection {...props.evidence} />
        <RelatedStudy />
        <RelatedFigure />
      </div>
    </main>

  </>
);
