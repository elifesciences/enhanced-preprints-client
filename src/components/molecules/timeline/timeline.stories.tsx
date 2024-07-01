import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Timeline } from './timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Molecules/Timeline',
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const timeLineTest = async (canvasElement: HTMLElement, expandText: string, collapseText: string, numberExpected: number) => {
  const canvas = within(canvasElement);
  await canvas.findByText(expandText);

  const collapsedDts = Array.from(document.querySelectorAll('.review-timeline dt')).filter((node) => node.checkVisibility());
  expect(collapsedDts).toHaveLength(1);

  await expect(canvas.getByText(expandText)).toBeInTheDocument();

  await userEvent.click(canvas.getByText(expandText));

  await expect(canvas.getByText(collapseText)).toBeInTheDocument();

  const expandedDts = Array.from(document.querySelectorAll('.review-timeline dt')).filter((node) => node.checkVisibility());
  expect(expandedDts).toHaveLength(numberExpected);
};

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
    await timeLineTest(canvasElement, 'Show previous version', 'Hide previous version', 2);
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
    await timeLineTest(canvasElement, 'Show all versions', 'Hide all versions', 3);
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
    await timeLineTest(canvasElement, 'Show all versions', 'Hide all versions', 5);
  },
};
