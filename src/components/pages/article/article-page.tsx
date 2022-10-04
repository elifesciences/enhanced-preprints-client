import { ArticleContent } from '../../atoms/article-content/article-content';
import { Heading } from '../../atoms/heading/heading';
import { Heading as JumpMenuHeading, JumpToMenu } from '../../atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../molecules/content-header/content-header';
import { ContextualData, ContextualDataProps } from '../../molecules/contextual-data/contextual-data';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../molecules/tabbed-navigation';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import { Content } from '../../../types/content';
import styles from './article-page.module.scss';

export type ArticlePageProps = ContentHeaderProps & ContextualDataProps & {
  headings: JumpMenuHeading[]
};

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
};

export const ArticlePage = ({ metaData, content, status }: { metaData: ArticlePageProps, content: Content, status: ArticleStatusProps }): JSX.Element => (
  <div className={`${styles['grid-container']} ${styles['article-page']}`}>
    <div className={styles['grid-header']}>
      <SiteHeader />
    </div>
    <div className={styles['primary-section-header']}>
      <ContentHeader
        doi={metaData.doi}
        msas={metaData.msas}
        strengthOfEvidence={metaData.strengthOfEvidence}
        importance={metaData.importance}
        authors={metaData.authors}
        title={metaData.title}
      />
    </div>
    <main className={styles['primary-section']}>
      <TabbedNavigation>
        <Tab label="Full text">
          <JumpToMenu active={1} headings={metaData.headings} />
          <ArticleContent content={content} />
        </Tab>
        <Tab label="Figures and data">
          <Heading id="figures" headingLevel={2} content="Figures and data" />
        </Tab>
        <Tab label="Peer review">
          <Heading id="peer-review" headingLevel={2} content="Peer review" />
        </Tab>
      </TabbedNavigation>
    </main>
    <aside className={styles['side-section']}>
      <ArticleStatus articleStatus={status.status} articleType={status.articleType}/>
      <Timeline events={status.timeline}/>
      <ContextualData citations={metaData.citations} tweets={metaData.tweets} views={metaData.views} />
    </aside>
  </div>
);
