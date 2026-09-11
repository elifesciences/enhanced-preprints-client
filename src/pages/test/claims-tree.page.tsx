/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreePage } from '../../components/pages/mira/claims-tree/claims-tree-page';

const Page = () => (
  <>
    <Head>
      <title>Claims Tree</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Poppins:wght@600&display=swap" rel="stylesheet"></link>
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
