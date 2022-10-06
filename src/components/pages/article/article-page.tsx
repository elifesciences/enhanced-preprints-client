import { ArticleContent } from '../../atoms/article-content/article-content';
import { Heading } from '../../atoms/heading/heading';
import { Heading as JumpMenuHeading, JumpToMenu } from '../../atoms/jump-to-menu/jump-to-menu';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import { ContentHeader, ContentHeaderProps } from '../../molecules/content-header/content-header';
import { ContextualData, ContextualDataProps } from '../../molecules/contextual-data/contextual-data';
import { SiteHeader } from '../../molecules/site-header/site-header';
import { Tab, TabbedNavigation } from '../../molecules/tabbed-navigation';
import { Timeline, TimelineEvent } from '../../molecules/timeline/timeline';
import { Content } from '../../../types/content';
import styles from './article-page.module.scss';
import { EditorsAndReviewers } from '../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../atoms/review-content/review-content';

export type ArticlePageProps = ContentHeaderProps & ContextualDataProps & {
  msid: string,
  version: string,
  headings: JumpMenuHeading[]
};

export type ArticleStatusProps = {
  timeline: TimelineEvent[],
  articleType: string,
  status: string,
};

enum ReviewType {
  EvaluationSummary = 'evaluation-summary',
  Review = 'review-article',
  AuthorResponse = 'reply',
}

type Participant = {
  name: string,
  role: string,
  institution: string,
};

type Evaluation = {
  date: Date,
  reviewType: ReviewType,
  text: string,
  participants: Participant[],
};

export type PeerReviewProps = {
  evaluationSummary: Evaluation,
  reviews: Evaluation[],
  authorResponse?: Evaluation,
};

export const ArticlePage = (props: { metaData: ArticlePageProps, content: Content, status: ArticleStatusProps, peerReview: PeerReviewProps }): JSX.Element => (
  <div className={`${styles['grid-container']} ${styles['article-page']}`}>
    <div className={styles['grid-header']}>
      <SiteHeader />
    </div>
    <div className={styles['primary-section-header']}>
      <ContentHeader
        doi={`10.7554/eLife.${props.metaData.msid}.${props.metaData.version}`}
        msas={props.metaData.msas}
        strengthOfEvidence={props.metaData.strengthOfEvidence}
        importance={props.metaData.importance}
        authors={props.metaData.authors}
        title={props.metaData.title}
      />
    </div>
    <main className={styles['primary-section']}>
      <TabbedNavigation>
        <Tab label="Full text">
          <JumpToMenu active={1} headings={props.metaData.headings} />
          <ArticleContent content={props.content} />
        </Tab>
        <Tab label="Figures and data">
          <Heading id="figures" headingLevel={2} content="Figures and data" />
        </Tab>
        <Tab label="Peer review">
          <EditorsAndReviewers participants={props.peerReview.evaluationSummary.participants} />
          {props.peerReview.reviews.map((review, index) => (
            <ReviewContent key={index} content={review.text} />
          ))}
        </Tab>
      </TabbedNavigation>
    </main>
    <aside className={styles['side-section']}>
      <ArticleStatus articleStatus={props.status.status} articleType={props.status.articleType}/>
      <Timeline events={props.status.timeline}/>
      <ContextualData citations={props.metaData.citations} tweets={props.metaData.tweets} views={props.metaData.views} />
    </aside>
  </div>
);
