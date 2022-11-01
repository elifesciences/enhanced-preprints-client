import { render } from '@testing-library/react';
import { ArticlePage } from './article-page';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';

describe('ArticlePage', () => {
  it('renders correctly', () => {
    expect(() => render(<ArticlePage metaData={metaData} content={content} status={status} peerReview={peerReview}/>)).not.toThrow();
  });
});
