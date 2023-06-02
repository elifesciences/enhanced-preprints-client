import { Timeline } from '../types/enhanced-article';
import { convertTimeline } from './timeline-convert';

describe('convertTimeline', () => {
  const events: Timeline[] = [
    {
      name: 'SENT_FOR_REVIEW',
      date: new Date('2022-01-01'),
    },
    {
      name: 'PREPRINT_PUBLISHED',
      date: new Date('2022-01-02'),
      url: 'https://example.com/preprint',
    },
    {
      name: 'VERSION_PUBLISHED',
      date: new Date('2022-01-03'),
      url: 'https://example.com/version1',
    },
    {
      name: 'VERSION_PUBLISHED',
      date: new Date('2022-01-04'),
      url: 'https://example.com/version2',
    },
  ];

  const preprintServer = 'Example Preprint Server';
  const currentVersion = 1;

  it('converts the timeline events correctly', () => {
    const result = convertTimeline(events, preprintServer, currentVersion);

    expect(result).toEqual([
      {
        date: 'Tue Jan 04 2022',
        name: 'Reviewed preprint posted',
        link: {
          url: 'https://example.com/version2',
          text: 'Go to version',
        },
      },
      {
        date: 'Mon Jan 03 2022',
        name: 'Reviewed preprint posted',
        eventDescription: '(this version)',
      },
      {
        date: 'Sun Jan 02 2022',
        name: 'Posted to Example Preprint Server',
        link: {
          url: 'https://example.com/preprint',
          text: 'Go to Example Preprint Server',
        },
      },
      {
        date: 'Sat Jan 01 2022',
        name: 'Sent for peer review',
      },

    ]);
  });

  it('returns an empty array if events are not provided', () => {
    const result = convertTimeline();

    expect(result).toEqual([]);
  });
});
