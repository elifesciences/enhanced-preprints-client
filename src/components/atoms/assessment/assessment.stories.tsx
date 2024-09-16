import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { Assessment } from './assessment';

const meta: Meta<typeof Assessment> = {
  title: 'Atoms/Assessment',
  component: Assessment,
};

export default meta;
type Story = StoryObj<typeof Assessment>;

async function collapseTest(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await canvas.findByText('Read more about this assessment');

  await userEvent.click(canvas.getByText('Read more about this assessment'));
  await expect(canvas.getByText('Show less')).toBeInTheDocument();
  /* eslint-disable-next-line max-len */
  await expect(canvas.getByText('During the peer-review process the editor and reviewers write an eLife assessment that summarises the significance of the findings reported in the article (on a scale ranging from landmark to useful) and the strength of the evidence (on a scale ranging from exceptional to inadequate).')).toBeVisible();
}

export const ElifeAssessmentSingleTermList: Story = {
  args: {
    content: 'This is a review that is fundamental to everything',
    doi: '10.1101/123456',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ElifeAssessmentSingleTermListMultipleTerms: Story = {
  args: {
    content: 'This is a review that is important and fundamental to everything',
    doi: '10.1101/123456',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ElifeAssessmentMultipleTermList: Story = {
  args: {
    content: 'This is a review that is convincingly exceptional and fundamental to everything',
    doi: '10.1101/123456',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};
