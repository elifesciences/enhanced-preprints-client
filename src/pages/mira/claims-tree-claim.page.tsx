import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { type StaticImageData } from 'next/image';
import { type ReactNode } from 'react';
import { type ClaimDataItem, hardCodedClaimsFromExtendedMiraWithRelationships as claims } from './data/hard-coded-claims-from-extended-mira-with-relationships';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeClaimPage } from '../../components/pages/mira/claims-tree/claim/claims-tree-claim-page';

type Section = {
  heading: string,
  title: string,
  summary?: string,
  attribution?: string,
  quote?: string,
};

type ServerSideProps = {
  id: string,
  questionNumber: string,
  claim: Section,
  evidence?: Array<Section & { id: string }>,
  relatedStudies?: Array<NonNullable<ClaimDataItem['relatedStudies']>[number] & { studyPageHref: string }>,
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
  const claimDataItem = claims.find(({ id }) => id === query.id);

  if (!claimDataItem) {
    return { notFound: true };
  }

  const { summary: claimSummary, ...claim } = claimDataItem.claim;

  const index = claims.indexOf(claimDataItem);
  const previousClaim = claims[index - 1];
  const nextClaim = claims[index + 1];

  return {
    props: {
      id: claimDataItem.id,
      questionNumber: claimDataItem.questionNumber,
      claim: { ...claim, title: claimSummary ?? claim.title },
      ...(claimDataItem.evidence && {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        evidence: claimDataItem.evidence.map(({ summary, ...evidence }) => evidence),
      }),
      ...(claimDataItem.relatedStudies && {
        relatedStudies: claimDataItem.relatedStudies.map((relatedStudy) => ({
          ...relatedStudy,
          studyPageHref: `/mira/claims-tree/study/${relatedStudy.id}`,
        })),
      }),
      ...(claimDataItem.relatedFigure && { relatedFigure: claimDataItem.relatedFigure }),
      ...(previousClaim && { previousClaimId: previousClaim.id }),
      ...(nextClaim && { nextClaimId: nextClaim.id }),
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
