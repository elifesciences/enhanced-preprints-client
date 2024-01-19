import { render, screen } from '@testing-library/react';
import { Timeline } from './timeline';

describe('Timeline', () => {
  it('renders the events passed in as a param', () => {
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValueOnce('13/01/2001')
      .mockReturnValueOnce('14/02/2002');
    render(<Timeline events={[
      { name: 'event1', date: '2001-01-13' },
      {
        name: 'event2',
        date: '2002-02-14',
        link: {
          text: 'Go to Elliot',
          url: 'https://preprint.url',
        },
      },
    ]}
    />);

    const firstEvent = screen.getByText('February 14, 2002');
    const secondEvent = screen.getByText('January 13, 2001');
    expect(firstEvent).toBeInTheDocument();
    expect(secondEvent).toBeInTheDocument();
    expect(firstEvent).toHaveAttribute('dateTime', '2002-02-14');
    expect(secondEvent).toHaveAttribute('dateTime', '2001-01-13');
    expect(firstEvent.compareDocumentPosition(secondEvent)).toBe(4);
    expect(screen.getByText('event1')).toBeInTheDocument();
    expect(screen.getByText('event2')).toBeInTheDocument();
    expect(screen.getByLabelText('Here is the article timeline')).toBeInTheDocument();
    expect(screen.getByLabelText('event2')).toBeInTheDocument();
    expect(screen.getByLabelText('event2')).toHaveAttribute('href', 'https://preprint.url');
  });
});
