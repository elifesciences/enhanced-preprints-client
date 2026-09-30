import Head from 'next/head';
import { type ReactNode } from 'react';
import { hardcodedStudies } from './data/hardcoded-studies';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeStudyPage } from '../../components/pages/mira/claims-tree/study/claims-tree-study-page';

const [study] = hardcodedStudies;

const Page = () => (
  <>
    <Head>
      <title>{`Claims Tree Study ${study.studyNumber}`}</title>
    </Head>
    <ClaimsTreeStudyPage
      studyNumber={study.studyNumber}
      study={study.study}
      protocols={study.protocols}
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
