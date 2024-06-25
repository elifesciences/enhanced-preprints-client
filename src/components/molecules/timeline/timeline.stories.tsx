import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Timeline } from './timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Molecules/Timeline',
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const EventTimeline: Story = {
  args: {
    events: [
      {
        date: new Date('2023-03-18'),
        version: 1,
        versionIndicator: 'v1',
        url: '#',
      },
    ],
  },
};

export const EventTimelineRevised:Story = {
  args: {
    events: [
      {
        date: new Date('2023-03-19'),
        version: 2,
        versionIndicator: 'v2',
        url: '#',
      },
    ],
  },
};

export const EventTimelineRevisedWithPrevious: Story = {
  args: {
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Show previous version');

    await expect(canvas.getByText('Show previous version')).toBeInTheDocument();

    await userEvent.click(canvas.getByText('Show previous version'));

    await expect(canvas.getByText('Hide previous version')).toBeInTheDocument();
  },
};

export const EventTimelineRevisedWithSubsequent: Story = {
  args: {
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Show all versions');

    await expect(canvas.getByText('Show all versions')).toBeInTheDocument();

    await userEvent.click(canvas.getByText('Show all versions'));

    await expect(canvas.getByText('Hide all versions')).toBeInTheDocument();
  },
};

export const EventTimelineWithMultipleVOR: Story = {
  args: {
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Show all versions');

    await expect(canvas.getByText('Show all versions')).toBeInTheDocument();

    await userEvent.click(canvas.getByText('Show all versions'));

    await expect(canvas.getByText('Hide all versions')).toBeInTheDocument();
  },
};
