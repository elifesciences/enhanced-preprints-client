import { ReactElement } from 'react';
import Link from 'next/link';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import './article-page.scss';
import { MetaData } from '../../../types';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';
import { contentToText } from '../../../utils/content-to-text';
import { CitationData } from '../../atoms/citation/citation';
import { getRppVersionDoi } from '../../../manuscripts';

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
};

export type Tab = {
  id: string,
  linkElement: ReactElement,
};

export type ArticlePageProps = {
  metaData: MetaData,
  msidWithVersion?: string,
  status: ArticleStatusProps,
  children: ReactElement<typeof ArticleFullTextTab | typeof ArticleFiguresTab | typeof ArticleReviewsTab>,
  activeTab: string,
  tabs?: Tab[],
};

export const ArticlePage = (props: ArticlePageProps): JSX.Element => {
  const id = props.msidWithVersion ?? props.metaData.msid;
  const tabs = props.tabs ?? [
    {
      id: 'fulltext',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/reviewed-preprints/${id}`} >Full text</Link>,
    },
    {
      id: 'figures',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/reviewed-preprints/${id}/figures`} >Figures and data</Link>,
    },
    {
      id: 'reviews',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/reviewed-preprints/${id}/reviews`} >Peer review</Link>,
    },
  ];
  const doi = getRppVersionDoi(props.metaData);

  const citation: CitationData = {
    authors: props.metaData.authors,
    year: props.metaData.publishedYear,
    volume: props.metaData.publishedYear - 2011,
    journal: 'eLife',
    id: `RP${props.metaData.msid}`,
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
        />
      </div>
      <aside className="side-section">
        <ArticleStatus articleStatus={props.status.status} doi={doi} articleType={props.status.articleType} pdfUrl={props.metaData.pdfUrl} title={contentToText(props.metaData.title)} citation={citation} msid={props.metaData.msid}/>
        <Timeline events={props.status.timeline}/>
      </aside>
      <main className="primary-section">
      <nav className="tabbed-navigation" aria-label="Main tabbed navigation">
        <ul className="tabbed-navigation__tabs">
          {tabs.map((tab, index) => (
            <li key={index} className={`tabbed-navigation__tab-label${props.activeTab === tab.id ? ' tabbed-navigation__tab-label--active' : ''}`}>
              {tab.linkElement}
            </li>
          ))}
        </ul>
      </nav>
      {props.children}
      </main>
    </>
  );
};
