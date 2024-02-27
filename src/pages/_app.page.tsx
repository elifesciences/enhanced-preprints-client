import Head from 'next/head';
import Script from 'next/script';
import { I18nextProvider } from 'react-i18next';
import { DefaultLayout } from '../components/layouts/default';
import { config } from '../config';
import { Brand, BrandContext, defaultBrand } from '../brand';
import { i18n } from '../i18n';
import { contentToText } from '../utils/content-to-text';
import { Author, TimelineEvent } from '../types';
import { formatAuthorName } from '../utils/format-author-name';

const getPublishedDate = (events: TimelineEvent[]): string | undefined => {
  const publishedEvent = events.find(({ eventDescription }) => eventDescription?.length);
  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  return undefined;
};

export default function MyApp({ Component, pageProps }: any) {
  const brand: Brand = pageProps.brand ?? defaultBrand;
  if (brand.translationNamespace) {
    i18n.setDefaultNamespace(brand.translationNamespace);
  }
  return (
    <>
      <Head>
        {pageProps.metaData ? <>
          <title>{contentToText(pageProps.metaData.title)}</title>
          <meta name="citation_title" content={contentToText(pageProps.metaData.title)}/>
          <meta name="citation_publisher" content={i18n.t('publisher_long')}/>
          <meta name="citation_journal_title" content={i18n.t('publisher_short')}/>
          <meta name="citation_volume" content={pageProps.metaData.volume}/>
          <meta name="citation_id" content={`RP${pageProps.metaData.msid}`}/>
          <meta name="citation_abstract" content={contentToText(pageProps.metaData.abstract)}/>
          <meta name="citation_doi" content={pageProps.metaData.doi}/>
          <meta name="citation_publication_date" content={getPublishedDate(pageProps.status.timeline)}/>
          <meta name="citation_pdf_url" content={pageProps.metaData.pdfUrl}/>
          <meta name="citation_fulltext_html_url" content={(brand.appUrlPrefix ?? '/reviewed-preprints/') + pageProps.metaData.msid }/>
          <meta name="citation_language" content="en"/>
          { pageProps.metaData.authors.map((author: Author, index: number) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
        </> : <title>Enhanced Preprints Platform</title> }
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
