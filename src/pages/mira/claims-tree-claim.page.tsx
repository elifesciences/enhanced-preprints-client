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
  relatedStudy: {
    name: string,
    title: string,
    summary: string,
  },
  relatedFigure?: {
    name: string,
    image: StaticImageData,
    title: string,
    summary: string,
  },
};

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ query }) => {
  const claimDataItem = hardcodedClaims.find(({ id }) => id === query.id);

  return claimDataItem ? { props: claimDataItem } : { notFound: true };
};

const Page = ({
  id, questionNumber, claim, evidence, relatedStudy, relatedFigure,
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
