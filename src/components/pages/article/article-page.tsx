import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import './article-page.scss';
import { MetaData } from '../../../types';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';
import { contentToText } from '../../../utils/content-to-text';
import { CitationData } from '../../atoms/citation/citation';
import '../../../i18n';
import { RelatedContentData, RelatedContent } from '../../atoms/related-content/related-content';
import { Metrics } from '../../../types/enhanced-article';
import { PreviousVersionWarning } from '../../atoms/previous-version-warning/previous-version-warning';

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
  isPreview: boolean,
};

export type Tab = {
  id: string,
  linkElement: ReactElement,
};

export type ArticlePageProps = {
  metaData: MetaData,
  msidWithVersion: string,
  status: ArticleStatusProps,
  relatedContent: RelatedContentData[],
  metrics?: Metrics | null,
  children: ReactElement<typeof ArticleFullTextTab | typeof ArticleFiguresTab | typeof ArticleReviewsTab>,
  activeTab: string,
  tabs: Tab[],
  previousWarningFeature?: boolean | null,
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
        {props.previousWarningFeature && <PreviousVersionWarning url="#" />}
        <ArticleStatus
          articleStatus={props.status.status}
          doi={doi}
          articleType={props.status.articleType}
          pdfUrl={props.metaData.pdfUrl}
          title={contentToText(props.metaData.title)}
          citation={citation}
          msid={props.metaData.msid}
          metrics={props.activeTab !== 'pdf' ? props.metrics : null}
        />
        <Timeline events={props.status.timeline}/>
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
