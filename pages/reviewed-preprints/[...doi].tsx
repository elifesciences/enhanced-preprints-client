import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ArticleContent } from '../../src/components/atoms/article-content/article-content';
import { Heading } from '../../src/components/atoms/heading/heading';
import { Heading as JumpMenuHeading, JumpToMenu } from '../../src/components/atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../src/components/molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../src/components/molecules/content-header/content-header';
import { ContextualData, ContextualDataProps } from '../../src/components/molecules/contextual-data/contextual-data';
import { SiteHeader } from '../../src/components/molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../src/components/molecules/tabbed-navigation';
import { Timeline } from '../../src/components/molecules/timeline/timeline';
import styles from './article-page.module.scss';

type MetaData = ContentHeaderProps & ContextualDataProps & {
  headings: JumpMenuHeading[]
};

export const ArticlePage = (metaData: MetaData): JSX.Element => (
  <div className={`${styles['grid-container']} ${styles['article-page']}`}>
    <div className={styles['grid-header']}>
      <SiteHeader />
    </div>
    <div className={styles['primary-column-header']}>
      <ContentHeader
        doi={metaData.doi}
        msas={metaData.msas}
        strengthOfEvidence={metaData.strengthOfEvidence}
        importance={metaData.importance}
        authors={metaData.authors}
        title={metaData.title}
      />
    </div>
    <main className={styles['primary-column']}>
      <TabbedNavigation>
        <Tab label="Full text">
          <JumpToMenu active={1} headings={metaData.headings} />
          <ArticleContent doi={metaData.doi} />
        </Tab>
        <Tab label="Figures and data">
          <Heading id="figures" headingLevel={2} content="Figures and data" />
        </Tab>
        <Tab label="Peer review">
          <Heading id="peer-review" headingLevel={2} content="Peer review" />
        </Tab>
      </TabbedNavigation>
    </main>
    <div className={styles['secondary-column']}>
      <ArticleStatus />
      <Timeline />
      <ContextualData citations={metaData.citations} tweets={metaData.tweets} views={metaData.views} />
    </div>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const doi = Array.isArray(context.params?.doi) ? context.params?.doi?.join('/') ?? context.params?.doi : '';
  const metaData = fetch(`http://localhost:3000/api/article/${doi}/metadata`).then((res) => res.json());
  return {
    props: metaData,
  };
};

export default ArticlePage;
