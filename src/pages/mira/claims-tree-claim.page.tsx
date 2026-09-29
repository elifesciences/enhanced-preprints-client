import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { type ReactNode } from 'react';
import figure4 from '../../../public/mira/figure-4.jpg';
import figure5 from '../../../public/mira/figure-5.jpg';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeClaimPage } from '../../components/pages/mira/claims-tree/claim/claims-tree-claim-page';

const claimData = [
  {
    id: '1',
    questionNumber: '1',
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
    relatedStudy: {
      name: 'Study 2',
      title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
      summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
    },
    relatedFigure: {
      name: 'Figure 4',
      image: figure4,
      title: 'BOLD responses.',
      // eslint-disable-next-line @stylistic/max-len
      summary: 'Regions active during risky choices (A), social decision-making (B), with TPJ and precuneus most active during participant\'s risky social choices (C). Anterior insula responded to low partner outcomes from participant choices (D–F). Ventral striatum tracked participant rewards (G), while left STS tracked partner prediction errors from participant decisions (H–I).',
    },
  },
  {
    id: '2',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'Functional connectivity between the left anterior insula and the right inferior frontal gyrus varies with choice and condition, suggesting the right IFG is sensitive to guilt-related information during social choices.',
      summary: 'PPI analysis shows insula–right IFG connectivity strongest when participants make risky choices for themselves and safe choices for both.',
      attribution: 'Quoted text in Results:',
      quote: 'Connectivity between this region and the right inferior frontal gyrus varied depending on choice and experimental condition, suggesting that this part of prefrontal cortex is sensitive to guilt-related information during social choices.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'Right IFG connectivity with left insula is highest for risky choices in Solo and safe choices in Social (pFWE = 0.020, T = 4.34, d = 0.80, 115 voxels, MNI [46 16 22]).',
      summary: 'PPI analysis shows condition- and choice-dependent insula–IFG connectivity.',
      attribution: 'Quoted text in Results:',
      // eslint-disable-next-line @stylistic/max-len
      quote: 'The first analysis revealed a cluster in the right IFG whose connectivity to the insula (the seed region) was highest when participants made Risky choices for themselves and Safe choices for both players (pFWE = 0.020, T = 4.34, d = 0.80, Z = 4.21, 115 vox',
    },
    relatedStudy: {
      name: 'Study 2',
      title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
      summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
    },
    relatedFigure: {
      name: 'Figure 5',
      image: figure5,
      title: 'Functional connectivity changes.',
      // eslint-disable-next-line @stylistic/max-len
      summary: 'Connectivity between the left anterior insula (seed) and a cluster in the right inferior frontal gyrus varied based on condition and choice type, being highest during risky solo choices and safe social choices. This suggests information flow about guilt-related processing during social decision-making.',
    },
  },
];

type ClaimData = (typeof claimData)[number];

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ClaimData> = async ({ query }) => {
  const claimDataItem = claimData.find(({ id }) => id === query.id);

  return claimDataItem ? { props: claimDataItem } : { notFound: true };
};

const Page = ({
  id, questionNumber, claim, evidence, relatedStudy, relatedFigure,
}: ClaimData) => (
  <>
    <Head>
      <title>{`Claim ${id}`}</title>
    </Head>
    <ClaimsTreeClaimPage
      id={id}
      questionNumber={questionNumber}
      claim={claim}
      evidence={evidence}
      relatedStudy={relatedStudy}
      relatedFigure={relatedFigure}
    ></ClaimsTreeClaimPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <ClaimsTreeLayout>{page}</ClaimsTreeLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
