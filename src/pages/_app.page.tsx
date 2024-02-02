import Head from 'next/head';
import Script from 'next/script';
import { I18nextProvider } from 'react-i18next';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';
import { Brand, BrandContext, defaultBrand } from '../brand';
import { i18n } from '../i18n';

export default function MyApp({ Component, pageProps }: any) {
  const brand: Brand = pageProps.brand ?? defaultBrand;
  if (brand.translationNamespace) {
    i18n.setDefaultNamespace(brand.translationNamespace);
  }
  return (
    <>
      <Head>
        <title>Enhanced Preprints Platform</title>
      </Head>
      {config.cookiebotId &&
        <Script id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={config.cookiebotId}></Script>
      }
      {config.gtmId &&
        <Script id="GTM" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.gtmId}');`,
        }}></Script>
      }
      <I18nextProvider i18n={i18n}>
        <BrandContext.Provider value={brand}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </BrandContext.Provider>
      </I18nextProvider>
    </>
  );
}
