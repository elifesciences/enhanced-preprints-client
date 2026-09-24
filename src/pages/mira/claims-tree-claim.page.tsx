import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import {ClaimsTreeClaimPage} from '../../components/pages/mira/claims-tree/claims-tree-claim-page';

const claimData = {
  claim: {
    heading: 'Claim:',
    title: 'The guilt effect is associated with increased BOLD signal in the left anterior insula.',
    summary: 'Left anterior insula activation is higher for low partner outcomes after participant choices versus partner choices.',
    attribution: 'Quoted text in Results:',
    quote: 'Thus, activation in our insula ROIs increased in situations during which participants experienced guilt for low outcomes impacting their partner, compared to similar outcomes resulting from the partner’s choices.',
  },
  evidence: {
    heading: 'Evidence:',
    title: 'Left anterior insula shows higher activation for low partner outcomes after participant choices vs partner choices (peak T = 3.95, d = 0.59, 22 voxels, MNI [−28 24 −4], FWE-corrected p = 0.024 within left anterior insula).',
    summary: 'Mass-univariate fMRI result confirming insula involvement in guilt effect.',
    attribution: 'Quoted text in Results:',
    quote: 'We found a weak response in a small cluster within the left anterior insula (peak T = 3.95, d = 0.59, 22 voxels, peak intensity at [−28 24 −4]; Figure 4F). This correction resulted in a p value of 0.024.',
  },
};

const Page = () => (
  <>
    <Head>
      <title>Claim 1</title>
    </Head>
    <ClaimsTreeClaimPage
      claim={claimData.claim}
      evidence={claimData.evidence}
    ></ClaimsTreeClaimPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
