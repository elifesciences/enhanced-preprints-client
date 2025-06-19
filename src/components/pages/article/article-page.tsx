import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import './article-page.scss';
import { MetaData, Metrics, TimelineEvent } from '../../../types';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';
import { contentToText } from '../../../utils/content';
import { CitationData } from '../../atoms/citation/citation';
import { RelatedContentData, RelatedContent } from '../../atoms/related-content/related-content';
import { PreviousVersionWarning } from '../../atoms/previous-version-warning/previous-version-warning';
import { RetractionNotice } from '../../atoms/retraction-notice/retraction-notice';

export type Tab = {
  id: string,
  linkElement: ReactElement,
};

export type ArticlePageProps = {
  metaData: MetaData,
  msidWithVersion: string,
  relatedContent: RelatedContentData[],
  metrics?: Metrics,
  children: ReactElement<typeof ArticleFullTextTab | typeof ArticleFiguresTab | typeof ArticleReviewsTab>,
  activeTab: string,
  tabs: Tab[],
  previousVersionWarningUrl?: string,
  retractionNoticeUrl?: string,
  timeline: TimelineEvent[],
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { t } = useTranslation();
  const { doi } = props.metaData;

  const citation: CitationData = {
    authors: props.metaData.authors,
    year: props.metaData.publishedYear,
    volume: props.metaData.volume,
    journal: t('publisher_short'),
    eLocationId: props.metaData.eLocationId,
    title: contentToText(props.metaData.title),
    doi,
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
          timeline={{ events: props.timeline, current: +props.metaData.version }}
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
