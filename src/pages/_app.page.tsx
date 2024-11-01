import Head from 'next/head';
import { Noto_Serif, Noto_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';
import { BiophysicsColabLayout } from '../components/layouts/biophysics-colab';
import { i18n } from '../i18n';
import { HasTenant } from '../tenant';

const LayoutSelector = ({ layoutName, children }: { layoutName?: string, children: ReactNode }) => {
  switch (layoutName) {
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

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: [
    '400', '600', '700',
  ],
  display: 'swap',
  fallback: ['serif'],
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: [
    '400', '600',
  ],
  display: 'swap',
  fallback: ['arial', 'helvetica', 'sans-serif'],
});

export default function MyApp({ Component, pageProps }: { Component: any, pageProps: HasTenant }) {
  if (!pageProps.tenant) {
    throw new Error('tenant not passed to PageProps. Make sure to specify a union type with TenantConfiguredPageProps and pass the tenant prop');
  }

  return (
    <>
      <Head>
        <title>Enhanced Preprints Platform</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
            }
            body {
              --font-family-primary: ${notoSans.style.fontFamily};
              --font-family-secondary: ${notoSerif.style.fontFamily};
              --color-primary: ${pageProps.tenant.colors.primary};
              --color-primary-dark: ${pageProps.tenant.colors.primaryDark};
            }
          `,
        }} />
        { config.cookiebotId &&
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={config.cookiebotId}></script>
        }
        { config.gtmId &&
          // eslint-disable-next-line @next/next/next-script-for-ga
          <script id="GTM" dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.gtmId}');`,
          }}></script>
        }
      </Head>
      <I18nextProvider i18n={i18n} defaultNS={pageProps.tenant.i18nNamespace}>
        <LayoutSelector layoutName={pageProps.tenant.layout}>
          <Component {...pageProps} />
        </LayoutSelector>
      </I18nextProvider>
    </>
  );
}
