
import Head from 'next/head';
import { DefaultLayout } from '../components/layouts/default';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
    <Head>
      <title>Enhanced Preprints Platform</title>
    </Head>
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
    </>
  );
}
