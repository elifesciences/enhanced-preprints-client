import { render } from '@testing-library/react';
import { ArticlePageLayout } from './article-page-layout';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';

describe('ArticlePage', () => {
  it('renders correctly', () => {
    expect(() => render(<ArticlePageLayout metaData={metaData} status={status} activeTab="fulltext">
        <ArticleFullTextTab content={content} peerReview={peerReview} metaData={metaData} />
      </ArticlePageLayout>)).not.toThrow();
  });

  it('renders with figures tab', () => {
    expect(() => render(<ArticlePageLayout metaData={metaData} status={status} activeTab="figures">
        <ArticleFiguresTab content={content} />
      </ArticlePageLayout>)).not.toThrow();
  });

  it('renders with figures tab', () => {
    expect(() => render(<ArticlePageLayout metaData={metaData} status={status} activeTab="reviews">
        <ArticleReviewsTab peerReview={peerReview} />
      </ArticlePageLayout>)).not.toThrow();
  });
});
