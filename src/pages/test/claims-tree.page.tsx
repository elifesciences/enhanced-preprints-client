import { type JSX, type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';

const ClaimsTreePage = (): JSX.Element => <><h1>Test</h1></>;

const Page = () => <><ClaimsTreePage></ClaimsTreePage></>;

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
