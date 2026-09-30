import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { type ReactNode } from 'react';
import { hardcodedStudies } from './data/hardcoded-studies';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeStudyPage } from '../../components/pages/mira/claims-tree/study/claims-tree-study-page';

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

type ServerSideProps = {
  id: string,
  study: Study,
  protocols: Array<Protocol>,
};

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ query }) => {
  const studyDataItem = hardcodedStudies.find(({ id }) => id === query.id);

  return studyDataItem ? { props: studyDataItem } : { notFound: true };
};

const Page = ({ id, study, protocols }: ServerSideProps) => (
  <>
    <Head>
      <title>{`Claims Tree Study ${id}`}</title>
    </Head>
    <ClaimsTreeStudyPage
      id={id}
      study={study}
      protocols={protocols}
    ></ClaimsTreeStudyPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <ClaimsTreeLayout>{page}</ClaimsTreeLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
