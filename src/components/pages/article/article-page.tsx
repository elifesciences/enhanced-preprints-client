import { ReactElement, useState } from 'react';
import Link from 'next/link';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import styles from './article-page.module.scss';
import { MetaData } from '../../../types';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';

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
  activeTab: 'fulltext' | 'figures' | 'reviews',
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
  return (
    <>
      <div className={styles['primary-section-header']}>
        <ContentHeader
          doi={`10.7554/eLife.${props.metaData.msid}.${props.metaData.version}`}
          msas={props.metaData.msas}
          authors={props.metaData.authors}
          title={props.metaData.title}
        />
      </div>
      <aside className={styles['side-section']}>
        <ArticleStatus articleStatus={props.status.status} articleType={props.status.articleType} pdfUrl={props.metaData.pdfUrl}/>
        <Timeline events={props.status.timeline}/>
      </aside>
      <main className={styles['primary-section']}>
      <div className={styles['tabbed-navigation']}>
        <ul className={styles['tabbed-navigation__tabs']}>
          {tabs.map((tab, index) => (
            <li key={index} className={`${styles['tabbed-navigation__tab-label']}${activeTab === tab.id ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.linkElement}
            </li>
          ))}
        </ul>
      </div>
      {props.children}
      </main>
    </>
  );
};
