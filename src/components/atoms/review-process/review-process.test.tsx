import { render, screen } from '@testing-library/react';
import { ReviewProcess } from './review-process';

describe('Review Process', () => {
  it('renders review process description in the peer review tab', () => {
    render(<ReviewProcess />);

    const firstItem = screen.getByText('Peer review process');
    expect(firstItem).toBeInTheDocument();
  });
});
