import Head from 'next/head';
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import Script from 'next/script';
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
    { config.cookiebotId &&
      <Script id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={config.cookiebotId}></Script>
    }
    { config.gtmId &&
      <Script id="GTM" dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.gtmId}');`,
      }}></Script>
    }
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
    </PostHogProvider>
  );
}
