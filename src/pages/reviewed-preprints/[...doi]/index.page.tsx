import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ArticleContent } from '../../../components/atoms/article-content/article-content';
import { Heading } from '../../../components/atoms/heading/heading';
import { Heading as JumpMenuHeading, JumpToMenu } from '../../../components/atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../../components/molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../../components/molecules/content-header/content-header';
import { ContextualData, ContextualDataProps } from '../../../components/molecules/contextual-data/contextual-data';
import { SiteHeader } from '../../../components/molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../../components/molecules/tabbed-navigation';
import { Timeline } from '../../../components/molecules/timeline/timeline';
import { config } from '../../../config';
import { Content } from '../../../types/content';
import styles from './index.module.scss';

type MetaData = ContentHeaderProps & ContextualDataProps & {
  headings: JumpMenuHeading[]
};

export const ArticlePage = ({ metaData, content }: { metaData: MetaData, content: Content }): JSX.Element => (
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
    <div className={styles['secondary-column']}>
      <ArticleStatus />
      <Timeline />
      <ContextualData citations={metaData.citations} tweets={metaData.tweets} views={metaData.views} />
    </div>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const doi = Array.isArray(context.params?.doi) ? context.params?.doi?.join('/') ?? context.params?.doi : '';
  const metaData = await fetch(`${config.API_SERVER}/api/article/${doi}/metadata`).then((res) => res.json());
  const content = await fetch(`${config.API_SERVER}/api/article/${doi}/content`).then((res) => res.json());
  return {
    props: {
      metaData,
      content,
    },
  };
};

export default ArticlePage;
