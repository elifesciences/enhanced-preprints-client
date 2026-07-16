import { type JSX } from 'react';
import '../article-page.scss';
import { type PeerReview } from '../../../../types';
import { type JSXContent } from '../../../../utils/content';
import { Abstract } from '../../../atoms/abstract/abstract';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Assessment } from '../../../atoms/assessment/assessment';
import { type Heading, JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';
import { Metrics } from '../../../atoms/metrics/metrics';
import { ReferenceList } from '../../../atoms/reference-list/reference-list';
import { ArticleAndAuthorInformation } from '../../../molecules/article-and-author-information/article-and-author-information';
import { type ArticlePageProps } from '../article-page';

export type FulltextTabProps = {
  headings: Heading[],
  metaData: ArticlePageProps['metaData'],
  content: JSXContent,
  peerReview?: PeerReview,
  peerReviewUrl?: string,
  metrics: ArticlePageProps['metrics'] | null,
};

export const ArticleFullTextTab = (props: FulltextTabProps): JSX.Element => {
  const headings = [
    { id: 'abstract', text: 'Abstract' },
    ...props.headings,
    { id: 'references', text: 'References' },
    { id: 'article-and-author-information', text: 'Article and Author Information' },
  ];

  if (props.metrics) {
    headings.push({ id: 'metrics', text: 'Metrics' });
  }

  return (
    <>
      { (props.peerReview && props.peerReview.evaluationSummary) && <Assessment content={props.peerReview.evaluationSummary.text} doi={props.peerReview.evaluationSummary.doi}/> }
      <div className="tabbed-navigation__content">
        <JumpToMenu headings={headings} />
        <div className="article-body-container">
          <Abstract content={props.metaData.abstract} />
          <ArticleContent content={props.content} />
          <ReferenceList references={props.metaData.references} />
          <ArticleAndAuthorInformation
            authors={props.metaData.authors}
            authorNotes={props.metaData.authorNotes}
            versions={props.metaData.versionHistory}
            license={props.metaData.license}
            copyrightYear={props.metaData.copyrightYear}
            umbrellaDoi={props.metaData.umbrellaDoi}
          />
          { props.metrics && <Metrics metrics={props.metrics} doi={props.metaData.umbrellaDoi ? props.metaData.umbrellaDoi : props.metaData.doi} /> }
        </div>
      </div>
    </>
  );
};
