import '../article-page.scss';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Heading, JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';
import { Abstract } from '../../../atoms/abstract/abstract';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { ReferenceList } from '../../../atoms/reference-list/reference-list';
import { AuthorInformationList } from '../../../molecules/author-information-list/author-information-list';
import { MetaData, PeerReview } from '../../../../types';
import { JSXContent } from '../../../../utils/content-to-jsx';

import { BrandContext } from '../../../../brand';

type Props = {
  headings: Heading[],
  metaData: MetaData,
  content: JSXContent,
  peerReview?: PeerReview,
  peerReviewUrl?: string
};

export const ArticleFullTextTab = (props: Props) => {
  const { t } = useTranslation();
  const brand = useContext(BrandContext);
  const headings = [
    { id: 'abstract', text: 'Abstract' },
    ...props.headings,
    { id: 'references', text: 'References' },
    { id: 'author-list', text: 'Article and Author Information' },
  ];

  if (props.peerReview !== undefined) {
    headings.splice(1, 0, { id: 'assessment', text: t('heading_assessment', { publisher_short: brand.publisherShort }) });
    headings.splice(1, 0, { id: 'assessment', text: t('heading_assessment') });
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
