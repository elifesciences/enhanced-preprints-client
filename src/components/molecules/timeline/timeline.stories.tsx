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
    {
      date: new Date('2023-03-18'),
      version: 1,
      versionIndicator: 'v1',
      url: '#',
    },
  ],
};

export const EventTimelineRevised = Template.bind({});
EventTimelineRevised.args = {
  events: [
    {
      date: new Date('2023-03-19'),
      version: 2,
      versionIndicator: 'v2',
      url: '#',
    },
  ],
};

export const EventTimelineRevisedWithPrevious = Template.bind({});
EventTimelineRevisedWithPrevious.args = {
  current: 2,
  events: [
    {
      url: '#',
      date: new Date('2023-03-19'),
      version: 2,
      versionIndicator: 'v2',
    },
    {
      url: '#',
      date: new Date('2023-03-18'),
      version: 1,
      versionIndicator: 'v1',
    },
  ],
};

export const EventTimelineRevisedWithSubsequent = Template.bind({});
EventTimelineRevisedWithSubsequent.args = {
  current: 2,
  events: [
    {
      name: 'Version of Record',
      url: '#',
      date: new Date('2023-03-20'),
      version: 3,
    },
    {
      url: '#',
      date: new Date('2023-03-19'),
      version: 2,
      versionIndicator: 'v2',
    },
    {
      url: '#',
      date: new Date('2023-03-18'),
      version: 1,
      versionIndicator: 'v1',
    },
  ],
};
