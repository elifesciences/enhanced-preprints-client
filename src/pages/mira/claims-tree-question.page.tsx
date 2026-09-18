import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreeQuestionPage } from '../../components/pages/mira/claims-tree/claims-tree-question-page';

const Page = () => (
  <>
    <Head>
      <title>Claims Tree Question 1</title>
    </Head>
    <ClaimsTreeQuestionPage></ClaimsTreeQuestionPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
