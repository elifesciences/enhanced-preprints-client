import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { prototypeArticleContentToJsx } from '../../components/pages/mira/prototype-article/prototype-article-content';
import { PrototypeArticleFullTextTab } from '../../components/pages/mira/prototype-article/prototype-article-fulltext-tab';
import { PrototypeArticlePage } from '../../components/pages/mira/prototype-article/prototype-article-page';
import { config } from '../../config';
import {
  contentToText, contentToHeadings,
} from '../../content';
import { formatAuthorName } from '../../utils/formatters';
import { makeNullableOptional } from '../../utils/make-nullable-optional';
import { getServerSideProps as reviewedPreprintGetServerSideProps, type ServerSideProps } from '../reviewed-preprints/get-server-side-props';

const MSID = '105391';

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ServerSideProps> = (context) => reviewedPreprintGetServerSideProps({
  ...context,
  params: { path: [MSID] },
});

const Page = ({
  metaData,
  citationDoi,
  msidWithVersion,
  timeline,
  relatedContent,
  content,
  peerReview,
  metrics,
  previousVersionWarningUrl,
}: ServerSideProps) => {
  const { t } = useTranslation();

  const headings = contentToHeadings(content);

  const hostedFileMatcher = (path: string) => path.startsWith(`${metaData.msid}/v${metaData.version}/`);

  const processedRelatedContent = relatedContent.map((item) => {
    const relatedType = t(`related_type_${item.type}`, { defaultValue: t('related_type_default') });
    return {
      ...item,
      type: t(`related_intro_${item.type}`, {
        type: relatedType,
        defaultValue: t('related_intro'),
      }),
    };
  });

  const retractionNoticeUrl = relatedContent.find((item) => (item.type === 'retraction'))?.url;

  return (
    <>
      <Head>
        <title>{contentToText(metaData.title)}</title>
        <meta name="citation_title" content={contentToText(metaData.title)}/>
        <meta name="citation_publisher" content={t('publisher_long')}/>
        <meta name="citation_journal_title" content={t('publisher_short')}/>
        {metaData.volume && <meta name="citation_volume" content={metaData.volume}/>}
        <meta name="citation_id" content={metaData.eLocationId ?? `RP${metaData.msid}`}/>
        <meta name="citation_abstract" content={contentToText(metaData.abstract)}/>
        <meta name="citation_doi" content={citationDoi ?? metaData.doi}/>
        <meta name="citation_publication_date" content={metaData.publicationDate}/>
        {metaData.pdfUrl && <meta name="citation_pdf_url" content={metaData.pdfUrl}/>}
        <meta name="citation_xml_url" content={metaData.xmlUrl}/>
        <meta name="citation_fulltext_html_url" content={t('reviewed_preprints_url', { msid: metaData.msid })}/>
        <meta name="citation_language" content="en"/>
        { metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
      </Head>
      <PrototypeArticlePage
        previousVersionWarningUrl={makeNullableOptional(previousVersionWarningUrl)}
        citationDoi={citationDoi}
        metrics={makeNullableOptional(metrics)}
        relatedContent={processedRelatedContent}
        metaData={metaData}
        msidWithVersion={msidWithVersion}
        tabs={[]}
        timeline={timeline}
        activeTab="fulltext"
        retractionNoticeUrl={retractionNoticeUrl}
      >
        {/* eslint-disable-next-line @stylistic/max-len */}
        <PrototypeArticleFullTextTab metrics={metrics} headings={headings} content={prototypeArticleContentToJsx(content, { hostedFileMatcher, filesApiPath: `${config.filesApiPath}` })} metaData={metaData} peerReview={peerReview ?? undefined} peerReviewUrl={`/reviewed-preprints/${msidWithVersion}/reviews#tab-content`}></PrototypeArticleFullTextTab>
      </PrototypeArticlePage>
    </>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
