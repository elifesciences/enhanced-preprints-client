import Head from 'next/head';
import Script from 'next/script';
import { ReactNode } from 'react';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';
import { BiophysicsColabLayout } from '../components/layouts/biophysics-colab';

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
      <LayoutSelector>
        <Component {...pageProps} />
      </LayoutSelector>
    </>
  );
}
