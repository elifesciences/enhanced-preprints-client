import { ReactElement, useState } from 'react';
import Link from 'next/link';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import styles from './article-page-layout.module.scss';
import { MetaData } from '../../../types';

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
};

export type ArticlePageLayoutProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  children: ReactElement,
  activeTab: 'fulltext' | 'figures' | 'reviews',
};

export const ArticlePageLayout = (props: ArticlePageLayoutProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(props.activeTab);
  return (
    <div className={`${styles['grid-container']} ${styles['article-page']}`}>
      <div className={styles['grid-header']}>
        <SiteHeader />
      </div>
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
          <li className={`${styles['tabbed-navigation__tab-label']}${activeTab === 'fulltext' ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab('fulltext')}>
            <Link href={`/reviewed-preprints/${props.metaData.msid}`}>Full text</Link>
          </li>
          <li className={`${styles['tabbed-navigation__tab-label']}${activeTab === 'figures' ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab('figures')}>
            <Link href={`/reviewed-preprints/${props.metaData.msid}/figures`}>Figures and data</Link>
          </li>
          <li className={`${styles['tabbed-navigation__tab-label']}${activeTab === 'reviews' ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab('reviews')}>
            <Link href={`/reviewed-preprints/${props.metaData.msid}/reviews`}>Peer review</Link>
          </li>
        </ul>
      </div>
      {props.children}
      </main>
    </div>
  );
};
