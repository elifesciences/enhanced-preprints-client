/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Timeline } from './timeline';

describe('Timeline', () => {
  afterEach(cleanup);
  test('renders the events passed in as a param', () => {
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
      listDescription='This is a timeline'
    />);

    const firstEvent = screen.getByText('February 14, 2002');
    const secondEvent = screen.getByText('January 13, 2001');
    expect(firstEvent).toBeTruthy();
    expect(secondEvent).toBeTruthy();
    expect(firstEvent.getAttribute('dateTime')).toStrictEqual('2002-02-14');
    expect(secondEvent.getAttribute('dateTime')).toStrictEqual('2001-01-13');
    expect(firstEvent.compareDocumentPosition(secondEvent)).toBe(4);
    expect(screen.getByText('event1')).toBeTruthy();
    expect(screen.getByText('event2')).toBeTruthy();
    expect(screen.getByLabelText('This is a timeline')).toBeTruthy();
    expect(screen.getByLabelText('event2')).toBeTruthy();
    expect(screen.getByLabelText('event2').getAttribute('href')).toStrictEqual('https://preprint.url');
  });
});
