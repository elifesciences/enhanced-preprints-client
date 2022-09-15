import { useEffect, useState } from 'react';
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

type MetaData = ContentHeaderProps & ContextualDataProps & {
  headings: JumpMenuHeading[]
};

export const ArticlePage = ({ doi }: { doi: string }): JSX.Element => {
  const [metaData, setMetaData] = useState<MetaData>();
  useEffect(() => {
    fetch(`http://localhost:3000/metadata/${doi}`)
      .then((res) => res.json())
      .then(setMetaData);
  }, [doi]);

  if (!metaData) return <span>loading...</span>;

  return (
    <div className="grid-container article-page">
      <div className="grid-header">
        <SiteHeader />
      </div>
      <div className="primary-column-header">
        <ContentHeader
          doi={doi}
          msas={metaData.msas}
          strengthOfEvidence={metaData.strengthOfEvidence}
          importance={metaData.importance}
          authors={metaData.authors}
          title={metaData.title}
        />
      </div>
      <main className="primary-column">
        <TabbedNavigation>
          <Tab label="Full text">
            <JumpToMenu active={1} headings={metaData.headings} />
            <ArticleContent doi={doi} />
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
        <ContextualData citations={metaData.citations} tweets={metaData.tweets} views={metaData.views} />
      </div>
    </div>
  );
};
