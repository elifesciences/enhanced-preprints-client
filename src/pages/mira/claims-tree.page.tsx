import Head from 'next/head';
import { type ReactNode } from 'react';
import { getServerSideProps, type ServerSideProps } from './get-server-side-props';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreePage } from '../../components/pages/mira/claims-tree/tree/claims-tree-page';

// ts-unused-exports:disable-next-line
export { getServerSideProps };

const Page = (props: ServerSideProps) => (
  <>
    <Head>
      <title>Claims Tree</title>
    </Head>
    <ClaimsTreePage
      questions={props.questions}
      studies={props.studies}
    ></ClaimsTreePage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <ClaimsTreeLayout>{page}</ClaimsTreeLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
