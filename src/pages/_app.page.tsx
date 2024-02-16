import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';
import { BiophysicsColabLayout } from '../components/layouts/biophysics-colab';

type EPPFeatures = {
  articleStatusV2: string,
};

const growthbook = new GrowthBook<EPPFeatures>({
  enableDevMode: true,
  features: {
    articleStatusV2: {
      defaultValue: false,
      rules: [
        { condition: { 'test-article-status': { $exists: true } }, force: true },
      ],
    },
  },
});

const normaliseStringValue = (value: string): string | boolean => {
  if (['yes', 'true'].includes(value)) {
    return true;
  }
  if (['no', 'false'].includes(value)) {
    return false;
  }
  return value;
};

const LayoutSelector = ({ children }: { children: ReactNode }) => {
  switch (config.siteName) {
    case 'biophysics-colab':
      return (
        <BiophysicsColabLayout>
          {children}
        </BiophysicsColabLayout>
      );
    default:
      return (
        <DefaultLayout>
          {children}
        </DefaultLayout>
      );
  }
};

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(() => {
    growthbook.setAttributes({
      siteName: config.siteName,
      browser: navigator.userAgent,
      url: router.pathname,
      flags: Object.entries(router.query)
        .filter(([key, value]) => key.startsWith('flag-') && typeof value === 'string')
        .reduce((flags, [key, value]) => {
          const newFlags = flags;
          if (typeof value === 'string') {
            newFlags[key.substring(5)] = normaliseStringValue(value);
          }
          return newFlags;
        }, {} as { [key: string]: string | boolean }),
    });
  }, [router.pathname]);
  return (
    <>
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
      <GrowthBookProvider growthbook={growthbook}>
        <LayoutSelector>
          <Component {...pageProps} />
        </LayoutSelector>
      </GrowthBookProvider>
    </>
  );
}
