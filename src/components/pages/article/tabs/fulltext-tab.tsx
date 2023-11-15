import '../article-page.scss';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';
import { Abstract } from '../../../atoms/abstract/abstract';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { ReferenceList } from '../../../atoms/reference-list/reference-list';
import { AuthorInformationList } from '../../../molecules/author-information-list/author-information-list';
import { Content, MetaData, PeerReview } from '../../../../types';
import { contentToHeadings } from '../../../../utils/content-to-headings';

export const ArticleFullTextTab = (props: { metaData: MetaData, content: Content, peerReview?: PeerReview, peerReviewUrl?: string }) => {
  const headings = [
    { id: 'abstract', text: 'Abstract' },
    ...contentToHeadings(props.content),
    { id: 'references', text: 'References' },
    { id: 'author-list', text: 'Article and Author Information' },
  ];

  if (props.peerReview !== undefined) {
    headings.splice(1, 0, { id: 'assessment', text: 'eLife assessment' });
  }

  return (
    <div className="tabbed-navigation__content">
      <JumpToMenu headings={headings} />
      <div className="article-body-container">
        <Abstract content={props.metaData.abstract} />
        { props.peerReview && <ReviewContent content={props.peerReview.evaluationSummary.text} isAssessment={true} peerReviewUrl={props.peerReviewUrl} doi={props.peerReview.evaluationSummary.doi}/> }
        <ArticleContent content={props.content} />
        <ReferenceList references={props.metaData.references} />
        <AuthorInformationList authors={props.metaData.authors} license={props.metaData.license} publishedYear={props.metaData.publishedYear} />
      </div>
    </div>
  );
};
