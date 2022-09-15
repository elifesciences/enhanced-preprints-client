import { Content } from '../../../types/content';
import { ArticleContent } from '../../atoms/article-content/article-content';
import { Heading } from '../../atoms/heading/heading';
import { Heading as JumpMenuHeading, JumpToMenu } from '../../atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../molecules/content-header/content-header';
import { ContextualData, ContextualDataProps } from '../../molecules/contextual-data/contextual-data';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../molecules/tabbed-navigation';
import { Timeline } from '../../molecules/timeline/timeline';
import './article.scss';

type ArticlePageProps = ContentHeaderProps & ContextualDataProps & {
  content: Content,
  headings: JumpMenuHeading[]
};

export const ArticlePage = ({
  doi,
  msas,
  strengthOfEvidence,
  importance,
  authors,
  title,
  content,
  headings,
  citations,
  tweets,
  views,
}: ArticlePageProps): JSX.Element => (
  <div className="grid-container article-page">
    <SiteHeader additionalClasses={['grid-header']} />
    <ContentHeader
      additionalClasses={['primary-column-header']}
      doi={doi}
      msas={msas}
      strengthOfEvidence={strengthOfEvidence}
      importance={importance}
      authors={authors}
      title={title}
    />
    <main className="primary-column">
      <TabbedNavigation>
        <Tab label="Full text">
          <JumpToMenu active={1} headings={headings} />
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
    <div className="secondary-column">
      <ArticleStatus />
      <Timeline />
      <ContextualData citations={citations} tweets={tweets} views={views} />
    </div>
  </div>
);
