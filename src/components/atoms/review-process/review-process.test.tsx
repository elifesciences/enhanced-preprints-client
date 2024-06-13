import { render, screen } from '@testing-library/react';
import { ReviewProcess } from './review-process';

describe('Review Process', () => {
  it('renders review process', () => {
    render(<ReviewProcess />);

    expect(screen.getByText('Peer review process')).toBeInTheDocument();
  });

  it('shows the not revised description when version is 1', () => {
    render(<ReviewProcess current={1} />);

    expect(screen.getByText('Not revised:')).toBeInTheDocument();
  });

  it('shows the revised description when version is above 1', () => {
    render(<ReviewProcess current={2} />);

    expect(screen.getByText('Revised:')).toBeInTheDocument();
  });
});
