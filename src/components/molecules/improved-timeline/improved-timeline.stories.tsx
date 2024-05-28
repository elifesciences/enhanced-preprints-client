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
      { name: 'Reviewed preprint', date: 'March 18, 2023' },
    ],
  };
