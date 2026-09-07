import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank-layout';

const Page = () => <h1>Test custom layout</h1>;

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
