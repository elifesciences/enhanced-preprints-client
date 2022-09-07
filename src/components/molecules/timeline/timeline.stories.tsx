import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Timeline } from './timeline';

export default {
  title: 'Molecules/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = (args) => <Timeline {...args} />;

export const DefaultTimeline = Template.bind({});

export const EventTimeline = Template.bind({});
EventTimeline.args = {
  events: [
    { name: 'event 3', date: new Date('2022-03-06') },
    { name: 'event 2', date: new Date('2022-03-03') },
    { name: 'event 1', date: new Date('2021-11-08') },
  ],
};
