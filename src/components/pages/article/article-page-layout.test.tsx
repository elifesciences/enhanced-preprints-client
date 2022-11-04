import { render } from '@testing-library/react';
import { ArticlePageLayout } from './article-page-layout';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticlePageFullTextTab } from './tabs/fulltext-tab.stories';

describe('ArticlePage', () => {
  it('renders correctly', () => {
    expect(() => render(<ArticlePageLayout metaData={metaData} status={status} activeTab="fulltext">
        <ArticlePageFullTextTab content={content} peerReview={peerReview} metaData={metaData} status={status} />
      </ArticlePageLayout>)).not.toThrow();
  });
});
