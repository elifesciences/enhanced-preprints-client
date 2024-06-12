import { render, screen } from '@testing-library/react';
import { ReviewProcess } from './review-process';

describe('Review Process', () => {
  it('renders review process', () => {
    render(<ReviewProcess />);

    const firstItem = screen.getByText('Peer review process');
    expect(firstItem).toBeInTheDocument();
  });
});
