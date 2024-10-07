import '../article-page.scss';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Heading, JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';
import { Abstract } from '../../../atoms/abstract/abstract';
import { ReferenceList } from '../../../atoms/reference-list/reference-list';
import { ArticleAndAuthorInformation } from '../../../molecules/article-and-author-information/article-and-author-information';
import { MetaData, PeerReview } from '../../../../types';
import { JSXContent } from '../../../../utils/content';
import '../../../../i18n';
import { Metrics as MetricsType } from '../../../../types/enhanced-article';
import { Metrics } from '../../../atoms/metrics/metrics';
import { Assessment } from '../../../atoms/assessment/assessment';

type Props = {
  headings: Heading[],
  metaData: MetaData,
  content: JSXContent,
  peerReview?: PeerReview,
  peerReviewUrl?: string,
  metrics: MetricsType | null,
};

export const ArticleFullTextTab = (props: Props) => {
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
      { props.peerReview && <Assessment content={props.peerReview.evaluationSummary.text} doi={props.peerReview.evaluationSummary.doi}/> }
      <div className="tabbed-navigation__content">
        <JumpToMenu headings={headings} />
        <div className="article-body-container">
          <Abstract content={props.metaData.abstract} />
          <ArticleContent content={props.content} />
          <ReferenceList references={props.metaData.references} />
          <ArticleAndAuthorInformation authors={props.metaData.authors} authorNotes={props.metaData.authorNotes} versions={props.metaData.versionHistory} license={props.metaData.license} publishedYear={props.metaData.publishedYear} />
          { props.metrics && <Metrics metrics={props.metrics} /> }
        </div>
      </div>
    </>
  );
};
