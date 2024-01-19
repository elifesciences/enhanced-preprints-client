import { StoryFn, Meta } from '@storybook/react';

import { Timeline } from './timeline';

export default {
  title: 'Molecules/Timeline',
  component: Timeline,
} as Meta<typeof Timeline>;

const Template: StoryFn<typeof Timeline> = (args) => <Timeline {...args} />;

export const EventTimeline = Template.bind({});
EventTimeline.args = {
  events: [
    { name: 'event 1', date: '1999-01-01' },
    { name: 'event 2', date: '2000-02-02' },
    { name: 'event 3', date: '2001-03-03' },
  ],
};
export const EventTimelineWithLinks = Template.bind({});
EventTimelineWithLinks.args = {
  events: [
    {
      name: 'event 1',
      date: '1999-01-01',
      link: {
        text: 'Go to bioRxiv',
        url: 'https://preprint.url',
      },
    },
    {
      name: 'event 2',
      date: '2000-02-02',
    },
    {
      name: 'event 3',
      date: '2001-03-03',
    },
  ],
};
export const EventTimelineWithDescriptions = Template.bind({});
EventTimelineWithDescriptions.args = {
  events: [
    {
      name: 'event 1',
      date: '1999-01-01',
      eventDescription: '(this version)',
    },
    {
      name: 'event 2',
      date: '2000-02-02',
    },
    {
      name: 'event 3',
      date: '2001-03-03',
    },
  ],
};
export const EventTimelineUnordered = Template.bind({});
EventTimelineUnordered.args = {
  events: [
    { name: 'event 1', date: '1999-01-01' },
    { name: 'event 3', date: '2001-03-03' },
    { name: 'event 2', date: '2000-02-02' },
  ],
};
export const EventTimelineISO8601 = Template.bind({});
EventTimelineISO8601.args = {
  events: [
    { name: 'event 1', date: '2022-12-31T23:59:59Z' },
    { name: 'event 2', date: '2023-01-01T00:00:00Z' },
  ],
};
