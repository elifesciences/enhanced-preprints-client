import { StoryFn, Meta } from '@storybook/react';
import { ImprovedTimeline } from './improved-timeline';

export default {
  title: 'Molecules/ImprovedTimeline',
  component: ImprovedTimeline,
} as Meta<typeof ImprovedTimeline>;

const Template: StoryFn<typeof ImprovedTimeline> = (args) => <ImprovedTimeline {...args} />;

export const EventTimeline = Template.bind({});
EventTimeline.args = {
  items: [
    {
      name: 'Reviewed preprint',
      date: '2023-03-18',
      version: 1,
    },
  ],
};

export const EventTimelineRevised = Template.bind({});
EventTimelineRevised.args = {
  items: [
    {
      name: 'Reviewed preprint',
      date: '2023-03-18',
      version: 2,
    },
  ],
};
