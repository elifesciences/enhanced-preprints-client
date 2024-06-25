import { StoryFn, Meta } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
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

EventTimelineRevisedWithPrevious.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByText('Show previous version');

  await expect(canvas.getByText('Show previous version')).toBeInTheDocument();

  await userEvent.click(canvas.getByText('Show previous version'));

  await expect(canvas.getByText('Hide previous version')).toBeInTheDocument();
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
EventTimelineRevisedWithSubsequent.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByText('Show all versions');

  await expect(canvas.getByText('Show all versions')).toBeInTheDocument();

  await userEvent.click(canvas.getByText('Show all versions'));

  await expect(canvas.getByText('Hide all versions')).toBeInTheDocument();
};

export const EventTimelineWithMultipleVOR = Template.bind({});
EventTimelineWithMultipleVOR.args = {
  current: 2,
  events: [
    {
      name: 'Version of Record',
      url: '#',
      date: new Date('2023-03-21'),
      version: 4,
    },
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

EventTimelineWithMultipleVOR.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByText('Show all versions');

  await expect(canvas.getByText('Show all versions')).toBeInTheDocument();

  await userEvent.click(canvas.getByText('Show all versions'));

  await expect(canvas.getByText('Hide all versions')).toBeInTheDocument();
};
