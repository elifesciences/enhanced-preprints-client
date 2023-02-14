import { render, screen } from '@testing-library/react';
import { Timeline } from './timeline';

describe('Timeline', () => {
  it('renders the events passed in as a param', () => {
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValueOnce('13/01/2001')
      .mockReturnValueOnce('14/02/2002');
    render(<Timeline events={[
      { name: 'event1', date: '2001-01-13' },
      { name: 'event2', date: '2002-02-14' },
    ]}/>);

    const firstEvent = screen.getByText('14 February 2002');
    const secondEvent = screen.getByText('13 January 2001');
    expect(firstEvent).toBeInTheDocument();
    expect(secondEvent).toBeInTheDocument();
    expect(firstEvent.compareDocumentPosition(secondEvent)).toBe(4);
    expect(screen.getByText('event1')).toBeInTheDocument();
    expect(screen.getByText('event2')).toBeInTheDocument();
  });
});
