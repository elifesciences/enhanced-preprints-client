import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchContent, fetchMetadata, fetchReviews } from '../../../utils/fetch-data';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../../components/pages/article/tabs';
import { config } from '../../../config';
import { getManuscript, getRppDoi } from '../../../manuscripts';
import { contentToText } from '../../../utils/content-to-text';
import { TimelineEvent } from '../../../components/molecules/timeline/timeline';

const extractIdAndTab = (idParts: string[]) => {
  if (idParts === undefined) {
    console.log('no id in path'); // eslint-disable-line no-console
    notFound();
  }

  if (['fulltext', 'figures', 'reviews'].includes(idParts[idParts.length - 1])) {
    return {
      tab: idParts.pop() as string,
      id: idParts.join('/'),
    };
  }

  return {
    tab: 'fulltext',
    id: idParts.join('/'),
  };
};

export const getIdFromPath = (id: string[]) => {
  const extracted = extractIdAndTab(id);
  if (extracted.id === undefined) {
    console.log('id not found in path'); // eslint-disable-line no-console
    notFound();
  }
  return extracted;
};

const getPublishedDate = (events: TimelineEvent[]): string | undefined => {
  const publishedEvent = events.find(({ name }) => name === 'Reviewed preprint posted');
  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  return undefined;
};


export async function generateMetadata({ params }: { params: { path: string[] } }): Promise<Metadata> {
  const { id } = getIdFromPath(params.path);
  const manuscriptConfig = getManuscript(config.manuscriptConfigFile, id);
  const serverMetaData = await fetchMetadata(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`);
  const metaData = {
    ...serverMetaData,
    ...manuscriptConfig.pdfUrl ? { pdfUrl: manuscriptConfig.pdfUrl } : {},
    msid: manuscriptConfig.msid,
    version: manuscriptConfig.version,
    msas: manuscriptConfig.msas,
    publishedYear: manuscriptConfig.publishedYear,
  };

  const citationMeta: { [index: string]: string } = {
    citation_title: contentToText(metaData.title),
    citation_publisher: 'eLife Sciences Publications Limited',
    citation_journal_title: 'eLife',
    citation_volume: (metaData.publishedYear - 2011).toString(),
    citation_id: `RP${metaData.msid}`,
    citation_abstract: contentToText(metaData.abstract),
    citation_doi: getRppDoi(metaData),
    citation_fulltext_html_url: `https://elifesciences.org/reviewed-preprints/${metaData.msid}`,
    citation_language: 'en',
  };

  const publishedDate = getPublishedDate(manuscriptConfig.status.timeline);
  if (publishedDate) {
    citationMeta.citation_publication_date = publishedDate;
  }
  if (metaData.pdfUrl) {
    citationMeta.citation_pdf_url = metaData.pdfUrl;
  }

  return {
    title: contentToText(metaData.title),
    other: {
      ...citationMeta,
    },
  };
}

export const Page = async ({ params }: { params: { path: string[] } }): Promise<JSX.Element> => {
  const { tab: activeTab, id } = getIdFromPath(params.path);

  const manuscriptConfig = getManuscript(config.manuscriptConfigFile, id);

  const [serverMetaData, content, peerReview] = await Promise.all([
    fetchMetadata(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchContent(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchReviews(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
  ]);

  const metaData = {
    ...serverMetaData,
    msid: `preview-${serverMetaData.doi}`,
    version: '0',
    pdfUrl: '',
    msas: [],
    publishedYear: new Date().getFullYear(),
  };

  const childTabs: { [key: string]: () => JSX.Element } = {
    fulltext: () => <ArticleFullTextTab content={content} metaData={metaData} peerReview={peerReview}></ArticleFullTextTab>,
    figures: () => <ArticleFiguresTab content={content}></ArticleFiguresTab>,
    reviews: () => <ArticleReviewsTab peerReview={peerReview}></ArticleReviewsTab>,
    pdf: () => (<>
        <ArticleFullTextTab content={content} metaData={metaData} peerReview={peerReview}></ArticleFullTextTab>
        <ArticleReviewsTab peerReview={peerReview}></ArticleReviewsTab>
      </>),
  };
  const childTab = childTabs[activeTab]();
  const tabs = [
    {
      id: 'fulltext',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/reviewed-preprints/${id}#tab-content`}>Full text</Link>,
    },
    {
      id: 'figures',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/reviewed-preprints/${id}/figures#tab-content`}>Figures and data</Link>,
    },
    {
      id: 'reviews',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/reviewed-preprints/${id}/reviews#tab-content`}>Reviews</Link>,
    },
  ];
  return (
    <>
      <nav className="tabbed-navigation" aria-label="Main tabbed navigation">
        <ul className="tabbed-navigation__tabs">
          {tabs.map((tab, index) => (
            <li key={index} className={`tabbed-navigation__tab-label${activeTab === tab.id ? ' tabbed-navigation__tab-label--active' : ''}`}>
              {tab.linkElement}
            </li>
          ))}
        </ul>
      </nav>
      <a id="tab-content" />
      {childTab}
  </>
  );
};

export default Page;
