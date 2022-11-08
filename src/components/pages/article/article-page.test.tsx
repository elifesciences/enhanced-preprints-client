import { render, screen, cleanup } from '@testing-library/react';
import { ArticlePage } from './article-page';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';

describe('ArticlePage', () => {
  it('renders correctly', () => {
    expect(() => render(<ArticlePage metaData={metaData} status={status} activeTab="fulltext">
        <ArticleFullTextTab content={content} peerReview={peerReview} metaData={metaData} />
      </ArticlePage>)).not.toThrow();
  });

  it('renders with figures tab', () => {
    expect(() => render(<ArticlePage metaData={metaData} status={status} activeTab="figures">
        <ArticleFiguresTab content={content} />
      </ArticlePage>)).not.toThrow();
  });

  it('renders with reviews tab', () => {
    expect(() => render(<ArticlePage metaData={metaData} status={status} activeTab="reviews">
        <ArticleReviewsTab peerReview={peerReview} />
      </ArticlePage>)).not.toThrow();
  });

  it('renders with tabs with correct active label', () => {
    render(<ArticlePage metaData={metaData} status={status} activeTab="fulltext">
        <ArticleFullTextTab content={content} peerReview={peerReview} metaData={metaData} />
      </ArticlePage>);
    expect(screen.getByText('Full text')).toBeInTheDocument();
    expect(screen.getByText('Figures and data')).toBeInTheDocument();
    expect(screen.getByText('Peer review')).toBeInTheDocument();

    expect(screen.getByText('Full text').parentElement?.classList.value).toContain('tab-label--active');
    expect(screen.getByText('Figures and data').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Peer review').parentElement?.classList.value).not.toContain('tab-label--active');

    cleanup();
    render(<ArticlePage metaData={metaData} status={status} activeTab="figures">
        <ArticleFullTextTab content={content} peerReview={peerReview} metaData={metaData} />
      </ArticlePage>);
    expect(screen.getByText('Full text').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Figures and data').parentElement?.classList.value).toContain('tab-label--active');
    expect(screen.getByText('Peer review').parentElement?.classList.value).not.toContain('tab-label--active');

    cleanup();
    render(<ArticlePage metaData={metaData} status={status} activeTab="reviews">
        <ArticleFullTextTab content={content} peerReview={peerReview} metaData={metaData} />
      </ArticlePage>);
    expect(screen.getByText('Full text').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Figures and data').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Peer review').parentElement?.classList.value).toContain('tab-label--active');
  });
});
