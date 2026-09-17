import Head from 'next/head';
import { type ReactNode } from 'react';
import { getServerSideProps, type ServerSideProps } from './get-server-side-props';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreePage } from '../../components/pages/mira/claims-tree/claims-tree-page';

// ts-unused-exports:disable-next-line
export { getServerSideProps };

const Page = (props: ServerSideProps) => (
  <>
    <Head>
      <title>Claims Tree</title>
    </Head>
    <ClaimsTreePage
      questions={props.questions}
    ></ClaimsTreePage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
