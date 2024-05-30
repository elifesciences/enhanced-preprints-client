import { StoryFn, Meta } from '@storybook/react';
import { ImprovedTimeline } from './improved-timeline';

export default {
  title: 'Molecules/ImprovedTimeline',
  component: ImprovedTimeline,
} as Meta<typeof ImprovedTimeline>;

const Template: StoryFn<typeof ImprovedTimeline> = (args) => <ImprovedTimeline {...args} />;

export const EventTimeline = Template.bind({});
EventTimeline.args = {
  events: [
    {
      date: '2023-03-18',
      version: 1,
      versionIndicator: 'v1',
    },
  ],
};

export const EventTimelineRevised = Template.bind({});
EventTimelineRevised.args = {
  events: [
    {
      date: '2023-03-19',
      version: 2,
      versionIndicator: 'v2',
    },
  ],
};

export const EventTimelineRevisedWithPrevious = Template.bind({});
EventTimelineRevisedWithPrevious.args = {
  current: 2,
  events: [
    {
      date: '2023-03-19',
      version: 2,
      versionIndicator: 'v2',
    },
    {
      date: '2023-03-18',
      version: 1,
      versionIndicator: 'v1',
    },
  ],
};
