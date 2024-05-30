import { render, screen } from '@testing-library/react';
import { ImprovedTimeline } from './improved-timeline';

describe('ImprovedTimeline', () => {
  it('renders a single timeline item', () => {
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValueOnce('13/01/2001');
    render(<ImprovedTimeline events={[
      { version: 1, date: '2001-01-13', versionIndicator: 'v1' },
    ]}
    />);

    const firstItem = screen.getByText('January 13, 2001');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem).toHaveAttribute('dateTime', '2001-01-13');
    expect(screen.getByText('Reviewed Preprint')).toBeInTheDocument();
    expect(screen.getByText('v1')).toBeInTheDocument();
    expect(screen.getByText('Not revised')).toBeInTheDocument();
  });

  it('renders a single revised timeline item', () => {
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValueOnce('14/02/2002');
    render(<ImprovedTimeline events={[
      { version: 2, date: '2002-02-14', versionIndicator: 'v2' },
    ]}
    />);

    const firstItem = screen.getByText('February 14, 2002');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem).toHaveAttribute('dateTime', '2002-02-14');
    expect(screen.getByText('Reviewed Preprint')).toBeInTheDocument();
    expect(screen.getByText('v2')).toBeInTheDocument();
    expect(screen.getByText('Revised by authors')).toBeInTheDocument();
  });
});
