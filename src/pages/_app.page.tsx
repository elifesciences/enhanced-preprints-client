import Head from 'next/head';
import { Noto_Serif, Noto_Sans } from 'next/font/google';
import { ReactNode, useContext } from 'react';
import { I18nextProvider } from 'react-i18next';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';
import { ELifeLayout } from '../components/layouts/elife';
import { i18n } from '../i18n';
import { HasTenant, TenantContext } from '../tenant';

const LayoutSelector = ({ children }: { children: ReactNode }) => {
  const layoutName = useContext(TenantContext).layout;
  switch (layoutName) {
    case 'elife':
      return (
        <ELifeLayout>
          {children}
        </ELifeLayout>
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
  const tenant = pageProps.tenant ?? useContext(TenantContext);

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
              --color-primary: ${tenant.colors.primary};
              --color-primary-dark: ${tenant.colors.primaryDark};
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
      <TenantContext.Provider value={tenant}>
        <I18nextProvider i18n={i18n} defaultNS={tenant.i18nNamespace}>
          <LayoutSelector>
            <Component {...pageProps} />
          </LayoutSelector>
        </I18nextProvider>
      </TenantContext.Provider>
    </>
  );
}
