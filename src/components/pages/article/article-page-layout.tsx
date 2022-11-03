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

export const ArticlePageLayout = ({ children, metaData, status, activeTab }: ArticlePageLayoutProps): JSX.Element => {
  const [renderedActiveTab, setActiveTab] = useState<string>(activeTab);
  return (
    <div className={`${styles['grid-container']} ${styles['article-page']}`}>
      <div className={styles['grid-header']}>
        <SiteHeader />
      </div>
      <div className={styles['primary-section-header']}>
        <ContentHeader
          doi={`10.7554/eLife.${metaData.msid}.${metaData.version}`}
          msas={metaData.msas}
          authors={metaData.authors}
          title={metaData.title}
        />
      </div>
      <aside className={styles['side-section']}>
        <ArticleStatus articleStatus={status.status} articleType={status.articleType} pdfUrl={metaData.pdfUrl}/>
        <Timeline events={status.timeline}/>
      </aside>
      <main className={styles['primary-section']}>
      <div className={styles['tabbed-navigation']}>
        <ul className={styles['tabbed-navigation__tabs']}>
          <li className={`${styles['tabbed-navigation__tab-label']}${renderedActiveTab === 'fulltext' ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab('fulltext')}>
            <Link href={`/reviewed-preprints/${metaData.msid}`}>Full text</Link>
          </li>
          <li className={`${styles['tabbed-navigation__tab-label']}${renderedActiveTab === 'figures' ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab('figures')}>
            <Link href={`/reviewed-preprints/${metaData.msid}/figures`}>Figures and data</Link>
          </li>
          <li className={`${styles['tabbed-navigation__tab-label']}${renderedActiveTab === 'reviews' ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} onClick={() => setActiveTab('reviews')}>
            <Link href={`/reviewed-preprints/${metaData.msid}/reviews`}>Peer review</Link>
          </li>
        </ul>
      </div>
      {children}
      </main>
    </div>
  );
};
