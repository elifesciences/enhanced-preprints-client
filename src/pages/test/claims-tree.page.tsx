import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreePage } from '../../components/pages/mira/claims-tree/claims-tree-page';

const Page = () => (
  <>
    <Head>
      <title>Claims Tree</title>
    </Head>
    <ClaimsTreePage></ClaimsTreePage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
