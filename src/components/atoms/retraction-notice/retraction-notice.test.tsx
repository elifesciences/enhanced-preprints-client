import { render } from '@testing-library/react';
import { RetractionNotice } from './retraction-notice';

describe('RetractionNotice', () => {
  it('renders correctly', () => {
    const { getByText } = render(<RetractionNotice url="www.google.com" />);

    expect(getByText('This article is retracted.')).toBeInTheDocument();
  });
});
