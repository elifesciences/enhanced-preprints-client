import { Content } from '../../../types/content';
import { ArticleContent } from '../../atoms/article-content/article-content';
import { Heading } from '../../atoms/heading/heading';
import { JumpToMenu } from '../../atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../molecules/content-header/content-header';
import { ContextualData, ContextualDataProps } from '../../molecules/contextual-data/contextual-data';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../molecules/tabbed-navigation';
import { Timeline } from '../../molecules/timeline/timeline';
import './article.scss';

type ArticlePageProps = ContentHeaderProps & ContextualDataProps & {
  content: Content
};

export const ArticlePage = (props: ArticlePageProps): JSX.Element => (
  <div className="article-page">
    <SiteHeader />
    <ContentHeader
      doi={props.doi}
      msas={props.msas}
      strengthOfEvidence={props.strengthOfEvidence}
      importance={props.importance}
      authors={props.authors}
      title={props.title}
    />
    <main className="primary-column">
      <TabbedNavigation>
        <Tab label="Full text">
          <JumpToMenu active={1} headings={[{ id: 'abstract', text: 'Abstract' }]} />
          <ArticleContent content={props.content} />
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
      <ContextualData citations={props.citations} tweets={props.tweets} views={props.views} />
    </div>
  </div>
);
