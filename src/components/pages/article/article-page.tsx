import { ReactElement, useState } from 'react';
import Link from 'next/link';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import './article-page.scss';
import { MetaData } from '../../../types';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';
import { contentToText } from '../../../utils/content-to-text';
import { CitationData } from '../../atoms/citation/citation';

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
  status: ArticleStatusProps,
  children: ReactElement<typeof ArticleFullTextTab | typeof ArticleFiguresTab | typeof ArticleReviewsTab>,
  activeTab: string,
  tabs?: Tab[],
};

export const ArticlePage = (props: ArticlePageProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(props.activeTab);
  const tabs = props.tabs ?? [
    {
      id: 'fulltext',
      linkElement: <Link scroll={false} href={`/reviewed-preprints/${props.metaData.msid}`}>Full text</Link>,
    },
    {
      id: 'figures',
      linkElement: <Link scroll={false} href={`/reviewed-preprints/${props.metaData.msid}/figures`}>Figures and data</Link>,
    },
    {
      id: 'reviews',
      linkElement: <Link scroll={false} href={`/reviewed-preprints/${props.metaData.msid}/reviews`}>Peer review</Link>,
    },
  ];
  const doi = `10.7554/eLife.${props.metaData.msid}.${props.metaData.version}`;

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
        <ArticleStatus articleStatus={props.status.status} doi={props.metaData.doi} articleType={props.status.articleType} pdfUrl={props.metaData.pdfUrl} title={contentToText(props.metaData.title)} citation={citation}/>
        <Timeline events={props.status.timeline}/>
      </aside>
      <main className="primary-section">
      <nav className="tabbed-navigation" aria-label="Main tabbed navigation">
        <ul className="tabbed-navigation__tabs">
          {tabs.map((tab, index) => (
            <li key={index} className={`tabbed-navigation__tab-label${activeTab === tab.id ? ' tabbed-navigation__tab-label--active' : ''}`} onClick={() => setActiveTab(tab.id)}>
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
