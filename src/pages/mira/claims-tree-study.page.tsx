import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreeStudyPage } from '../../components/pages/mira/claims-tree/claims-tree-study-page';

const Page = () => (
  <>
    <Head>
      <title>Claims Tree Study</title>
    </Head>
    <ClaimsTreeStudyPage></ClaimsTreeStudyPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
