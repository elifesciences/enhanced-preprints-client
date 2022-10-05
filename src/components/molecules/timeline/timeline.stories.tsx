import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Timeline } from './timeline';

export default {
  title: 'Molecules/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;

export const EventTimeline = Template.bind({});
EventTimeline.args = {
  events: [
    { name: 'event 3', date: '1999-01-01' },
    { name: 'event 2', date: '2000-02-02' },
    { name: 'event 1', date: '2001-03-03' },
  ],
};
