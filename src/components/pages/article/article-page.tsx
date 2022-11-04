import { useState } from 'react';
import { ArticleContent } from '../../atoms/article-content/article-content';
import { Heading } from '../../atoms/heading/heading';
import { JumpToMenu } from '../../atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader } from '../../molecules/content-header/content-header';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../molecules/tabbed-navigation';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import styles from './article-page.module.scss';
import { EditorsAndReviewers } from '../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../atoms/review-content/review-content';
import { Abstract } from '../../atoms/abstract/abstract';
import { ReferenceList } from '../../atoms/reference-list/reference-list';
import { AuthorInformationList } from '../../molecules/author-information-list/author-information-list';
import { Content, MetaData, PeerReview } from '../../../types';

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
};

const getFigures = (content: Content): Content => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => getFigures(part));
  }
  switch (content.type) {
    case 'Figure':
      return content;
    default:
      return '';
  }
};

export const ArticlePage = (props: { metaData: MetaData, content: Content, status: ArticleStatusProps, peerReview: PeerReview }): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className={styles['primary-section-header']}>
        <ContentHeader
          doi={`10.7554/eLife.${props.metaData.msid}.${props.metaData.version}`}
          msas={props.metaData.msas}
          authors={props.metaData.authors}
          title={props.metaData.title}
        />
      </div>
      <aside className={styles['side-section']}>
        <ArticleStatus articleStatus={props.status.status} articleType={props.status.articleType} pdfUrl={props.metaData.pdfUrl}/>
        <Timeline events={props.status.timeline}/>
      </aside>
      <main className={styles['primary-section']}>
        <TabbedNavigation activeTab={activeTab} setActiveTab={setActiveTab}>
          <Tab label="Full text">
            <JumpToMenu headings={[
              { id: 'abstract', text: 'Abstract' },
              { id: 'assessment', text: 'eLife assessment' },
              ...props.metaData.headings,
              { id: 'references', text: 'References' },
              { id: 'author-list', text: 'Author Information' },
            ]} />
            <div className={styles['article-body-container']}>
              <Abstract content={props.metaData.abstract} />
              <ReviewContent content={props.peerReview.evaluationSummary.text} isAssessment={true} setActiveTab={setActiveTab}/>
              <ArticleContent content={props.content} />
              <ReferenceList references={props.metaData.references} />
              <AuthorInformationList authors={props.metaData.authors}/>
            </div>
          </Tab>
          <Tab label="Figures and data">
            <div className={styles['menu-spacer']}/>
            <div className={styles['article-body-container']}>
              <Heading id="figures" headingLevel={2} content="Figures and data" />
              <ArticleContent content={getFigures(props.content)} />
            </div>
          </Tab>
          <Tab label="Peer review">
            <div className={styles['menu-spacer']}/>
            <div className={styles['article-body-container']}>
              <EditorsAndReviewers participants={props.peerReview.evaluationSummary.participants} />
              {props.peerReview.reviews.map((review, index) => (
                <ReviewContent key={index} id={`peer-review-${index}`} content={review.text} />
              ))}
            </div>
          </Tab>
        </TabbedNavigation>
      </main>
    </>
  );
};
