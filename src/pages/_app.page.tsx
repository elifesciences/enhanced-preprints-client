import Head from 'next/head';
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined' && config.posthogKey) {
  posthog.init(config.posthogKey, {
    api_host: config.posthogHost,
    // // Disable in development
    // loaded: (posthogClient) => {
    //   // if (process.env.NODE_ENV === 'development') posthogClient.opt_out_capturing();
    // },
  });
}

export default function MyApp({ Component, pageProps }: any) {
  return (
    <PostHogProvider client={posthog}>
      <Head>
        <title>Enhanced Preprints Platform</title>
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </PostHogProvider>
  );
}
