import { render } from '@testing-library/react';
import { content, metaData, peerReview } from '../../../../utils/mocks';
import { ArticleFullTextTab } from './fulltext-tab';

describe('FulltextTab', () => {
  it('renders with fulltext tab', () => {
    expect(() => render(<ArticleFullTextTab content={content} metaData={metaData} peerReview={peerReview}/>)).not.toThrow();
  });

  it.todo('renders the evaluation summary when one is passed in');
  it.todo('jump to menu navigates to relevant content when clicked');
});
