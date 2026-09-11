import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreePage } from '../../components/pages/mira/claims-tree/claims-tree-page';

const Page = () => <><ClaimsTreePage></ClaimsTreePage></>;

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
