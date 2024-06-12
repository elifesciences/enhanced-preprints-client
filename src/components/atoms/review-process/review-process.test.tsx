import { render, screen } from '@testing-library/react';
import { ReviewProcess } from './review-process';

describe('Review Process', () => {
  it('renders review process', () => {
    render(<ReviewProcess />);

    expect(screen.getByText('Peer review process')).toBeInTheDocument();
  });
});
