import Head from 'next/head';
import { GrowthBook } from '@growthbook/growthbook';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import { useEffect } from 'react';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';

export default function MyApp({ Component, pageProps }: any) {
  const growthbook = new GrowthBook({
    apiHost: config.growthbookHost,
    clientKey: config.growthbookKey,
    enableDevMode: true,
  });

  useEffect(() => {
    // Load features asynchronously when the app renders
    growthbook.loadFeatures();
  }, []);

  return (
    <>
    <GrowthBookProvider growthbook={growthbook}>
    <Head>
      <title>Enhanced Preprints Platform</title>
    </Head>
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
    </GrowthBookProvider>
    </>
  );
}
