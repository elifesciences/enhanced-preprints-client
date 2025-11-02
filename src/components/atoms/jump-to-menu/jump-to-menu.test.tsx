import { render, screen } from '@testing-library/react';

import { type Heading, JumpToMenu } from './jump-to-menu';

const headings = [
  { id: 's1', text: 'heading 1' },
  { id: 's2', text: 'heading 2' },
  { id: 's3', text: 'heading 3' },
  { id: null, text: 'heading 4' },
] as unknown as Heading[];

describe('JumpToMenu', () => {
  it('should render all the headings passed in as a prop', () => {
    render(<JumpToMenu headings={headings} />);

    expect(screen.getByText('heading 1')).toBeInTheDocument();
    expect(screen.getByText('heading 2')).toBeInTheDocument();
    expect(screen.getByText('heading 3')).toBeInTheDocument();
  });

  it('should check if heading has an id', () => {
    render(<JumpToMenu headings={headings} />);

    expect(screen.queryByText('heading 1')).toBeInTheDocument();
    expect(screen.queryByText('heading 2')).toBeInTheDocument();
    expect(screen.queryByText('heading 3')).toBeInTheDocument();
    expect(screen.queryByText('heading 4')).not.toBeInTheDocument();
  });

  it('should highlight the specified item', () => {
    render(<JumpToMenu headings={headings} />);

    expect(screen.getByText('heading 1').parentElement).toHaveClass('jump-menu-list__item--active');
    expect(screen.getByText('heading 2').parentElement).not.toHaveClass('jump-menu-list__item--active');
    expect(screen.getByText('heading 3').parentElement).not.toHaveClass('jump-menu-list__item--active');
  });

  it('should highlight the specified item', () => {
    render(<JumpToMenu headings={headings} />);

    expect(screen.getByText('heading 1').parentElement).toHaveClass('jump-menu-list__item--active');
    expect(screen.getByText('heading 2').parentElement).not.toHaveClass('jump-menu-list__item--active');
    expect(screen.getByText('heading 3').parentElement).not.toHaveClass('jump-menu-list__item--active');
  });

  it('should display content of Link but not wrap in <a> tags', () => {
    const headingsWithLinks = [
      {
        id: 's1',
        text: [
          'heading with ',
          {
            type: 'Link',
            target: '#fig2',
            content: [
              'link',
            ],
          },
        ],
      },
    ] as unknown as Heading[];

    const { container } = render(<JumpToMenu headings={headingsWithLinks} />);

    expect(container.querySelectorAll('.jump-menu-list__link a')).toHaveLength(0);
    expect(container).toHaveTextContent('heading with link');
  });
});
