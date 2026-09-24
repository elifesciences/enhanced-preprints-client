import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import {ClaimsTreeClaimPage} from '../../components/pages/mira/claims-tree/claims-tree-claim-page';

const Page = () => (
  <>
    <Head>
      <title>Claim 1</title>
    </Head>
    <ClaimsTreeClaimPage></ClaimsTreeClaimPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
