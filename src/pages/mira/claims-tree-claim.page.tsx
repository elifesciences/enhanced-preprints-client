import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { type StaticImageData } from 'next/image';
import { type ReactNode } from 'react';
import { hardcodedClaims } from './data/hardcoded-claims';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeClaimPage } from '../../components/pages/mira/claims-tree/claim/claims-tree-claim-page';

type Section = {
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
};

type ServerSideProps = {
  id: string,
  questionNumber: string,
  claim: Section,
  evidence: Section,
  relatedStudies: Array<{
    id: string,
    name: string,
    title: string,
    summary: string,
    studyPageHref: string,
  }>,
  relatedFigure?: {
    name: string,
    image: StaticImageData,
    title: string,
    summary: string,
  },
  previousClaimId?: string,
  nextClaimId?: string,
};

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ query }) => {
  const claimDataItem = hardcodedClaims.find(({ id }) => id === query.id);

  if (!claimDataItem) {
    return { notFound: true };
  }

  const index = hardcodedClaims.indexOf(claimDataItem);
  const previousClaim = hardcodedClaims[index - 1];
  const nextClaim = hardcodedClaims[index + 1];

  return {
    props: {
      ...claimDataItem,
      ...(previousClaim && { previousClaimId: previousClaim.id }),
      ...(nextClaim && { nextClaimId: nextClaim.id }),
      relatedStudies: claimDataItem.relatedStudies.map((relatedStudy) => ({
        ...relatedStudy,
        studyPageHref: `/mira/claims-tree/study/${relatedStudy.id}`,
      })),
    },
  };
};

const Page = ({
  id, questionNumber, claim, evidence, relatedStudies, relatedFigure, previousClaimId, nextClaimId,
}: ServerSideProps) => (
  <>
    <Head>
      <title>{`Claim ${id}`}</title>
    </Head>
    <ClaimsTreeClaimPage
      id={id}
      questionNumber={questionNumber}
      claim={claim}
      evidence={evidence}
      relatedStudies={relatedStudies}
      relatedFigure={relatedFigure}
      previousClaimId={previousClaimId}
      nextClaimId={nextClaimId}
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
