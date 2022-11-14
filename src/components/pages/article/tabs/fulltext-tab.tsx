import styles from '../article-page.module.scss';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Content } from '../../../../types/content';
import { JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';
import { Abstract } from '../../../atoms/abstract/abstract';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { ReferenceList } from '../../../atoms/reference-list/reference-list';
import { AuthorInformationList } from '../../../molecules/author-information-list/author-information-list';
import { MetaData, PeerReview } from '../../../../types';

export const ArticleFullTextTab = (props: { metaData: MetaData, content: Content, peerReview: PeerReview }): JSX.Element => (
  <div className={styles['tabbed-navigation__content']}>
    <JumpToMenu headings={[
      { id: 'abstract', text: 'Abstract' },
      { id: 'assessment', text: 'eLife assessment' },
      ...props.metaData.headings,
      { id: 'references', text: 'References' },
      { id: 'author-list', text: 'Author Information' },
    ]} />
    <div className={styles['article-body-container']}>
      <Abstract content={props.metaData.abstract} />
      <ReviewContent content={props.peerReview.evaluationSummary.text} isAssessment={true} peerReviewUrl={`/reviewed-preprints/${props.metaData.msid}/reviews`}/>
      <ArticleContent content={props.content} />
      <ReferenceList references={props.metaData.references} />
      <AuthorInformationList authors={props.metaData.authors}/>
    </div>
  </div>
);
