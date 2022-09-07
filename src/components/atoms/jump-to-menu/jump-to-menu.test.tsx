import { render, screen } from '@testing-library/react';

import { JumpToMenu } from './jump-to-menu';

const headings = [
  { id: 's1', text: 'heading 1' },
  { id: 's2', text: 'heading 2' },
  { id: 's3', text: 'heading 3' },
];

describe('JumpToMenu', () => {
  it('should render all the headings passed in as a prop', () => {
    render(<JumpToMenu headings={headings} active={0} />);

    expect(screen.getByText('heading 1')).toBeInTheDocument();
    expect(screen.getByText('heading 2')).toBeInTheDocument();
    expect(screen.getByText('heading 3')).toBeInTheDocument();
  });

  it('should higlight the specified item', () => {
    render(<JumpToMenu headings={headings} active={0} />);

    expect(screen.getByText('heading 1').parentElement).toHaveClass('jump-menu-list__item--active');
    expect(screen.getByText('heading 2').parentElement).not.toHaveClass('jump-menu-list__item--active');
    expect(screen.getByText('heading 3').parentElement).not.toHaveClass('jump-menu-list__item--active');
  });
});
