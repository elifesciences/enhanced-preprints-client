import { ReactElement, ReactNode } from 'react';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import './article-page.scss';
import { MetaData } from '../../../types';
import { contentToText } from '../../../utils/content-to-text';
import { CitationData } from '../../atoms/citation/citation';
import { getRppVersionDoi } from '../../../manuscripts';

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
  children: ReactNode,
};

export const ArticlePageLayout = (props: ArticlePageProps): JSX.Element => {
  const doi = getRppVersionDoi(props.metaData);

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
        <ArticleStatus articleStatus={props.status.status} doi={doi} articleType={props.status.articleType} pdfUrl={props.metaData.pdfUrl} title={contentToText(props.metaData.title)} citation={citation} msid={props.metaData.msid}/>
        <Timeline events={props.status.timeline}/>
      </aside>
      <main className="primary-section">
      {props.children}
      </main>
    </>
  );
};
