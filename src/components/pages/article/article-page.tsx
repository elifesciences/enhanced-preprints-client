import { type JSX, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import './article-page.scss';
import { type ArticleFiguresTab, type ArticleFullTextTab, type ArticleReviewsTab } from './tabs';
import {type ServerSideProps} from "../../../pages/reviewed-preprints/get-server-side-props";
import { contentToText } from '../../../utils/content';
import { PreviousVersionWarning } from '../../atoms/previous-version-warning/previous-version-warning';
import { type RelatedContentData, RelatedContent } from '../../atoms/related-content/related-content';
import { RetractionNotice } from '../../atoms/retraction-notice/retraction-notice';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';

export type Tab = {
  id: string,
  linkElement: ReactElement<any>,
};

export type CitationData = {
  authors: ServerSideProps['metaData']['authors'],
  year?: number,
  volume?: string,
  journal: string,
  eLocationId?: string,
  title: string,
  doi: string,
};

export type ArticlePageProps = {
  metaData: ServerSideProps['metaData'],
  citationDoi?: string,
  msidWithVersion: string,
  relatedContent: RelatedContentData[],
  metrics?: NonNullable<ServerSideProps['metrics']>,
  children: ReactElement<typeof ArticleFullTextTab | typeof ArticleFiguresTab | typeof ArticleReviewsTab>,
  activeTab: string,
  tabs: Tab[],
  previousVersionWarningUrl?: string,
  retractionNoticeUrl?: string,
  timeline: ServerSideProps['timeline'],
};

export const ArticlePage = (props: ArticlePageProps): JSX.Element => {
  const { t } = useTranslation();
  const { doi } = props.metaData;
  const citationDoi = props.citationDoi ?? doi;

  const citation: CitationData = {
    authors: props.metaData.authors,
    year: props.metaData.publishedYear,
    volume: props.metaData.volume,
    journal: t('publisher_short'),
    eLocationId: props.metaData.eLocationId,
    title: contentToText(props.metaData.title),
    doi: citationDoi,
  };

  const banner = () => {
    if (props.retractionNoticeUrl) {
      return <RetractionNotice url={props.retractionNoticeUrl}/>;
    }
    if (props.previousVersionWarningUrl) {
      return <PreviousVersionWarning url={props.previousVersionWarningUrl} />;
    }
    return null;
  };

  return (
    <>
      <div className="primary-section-header">
        <ContentHeader
          doi={doi}
          msas={props.metaData.msas}
          authors={props.metaData.authors}
          title={props.metaData.title}
          license={props.metaData.license}
          institutions={props.metaData.institutions}
        />
      </div>
      <aside className="side-section">
        { banner() }
        <ArticleStatus
          doi={doi}
          umbrellaDoi={props.metaData.umbrellaDoi}
          pdfUrl={props.metaData.pdfUrl}
          title={contentToText(props.metaData.title)}
          citation={citation}
          msid={props.metaData.msid}
          {...(props.activeTab !== 'pdf' && { metrics: props.metrics })}
          timeline={{ current: +props.metaData.version, events: props.timeline }}
        />
        {(props.relatedContent.length > 0 && props.activeTab !== 'pdf') && <RelatedContent articles={props.relatedContent} />}
      </aside>
      <main className="primary-section">
        <nav className="tabbed-navigation" aria-label="Main tabbed navigation">
          <ul className="tabbed-navigation__tabs">
            {props.tabs.map((tab, index) => (
              <li key={index} className={`tabbed-navigation__tab-label${props.activeTab === tab.id ? ' tabbed-navigation__tab-label--active' : ''}`}>
                {tab.linkElement}
              </li>
            ))}
          </ul>
        </nav>
        <a id="tab-content" />
        {props.children}
      </main>
    </>
  );
};
