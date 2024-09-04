import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { ReviewContent } from './review-content';

const meta: Meta<typeof ReviewContent> = {
  title: 'Atoms/Review Content',
  component: ReviewContent,
};

export default meta;
type Story = StoryObj<typeof ReviewContent>;

async function collapseTest(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await canvas.findByText('Read more about this assessment');

  await userEvent.click(canvas.getByText('Read more about this assessment'));
  await expect(canvas.getByText('Show less')).toBeInTheDocument();
  /* eslint-disable-next-line max-len */
  await expect(canvas.getByText('During the peer-review process the editor and reviewers write an eLife assessment that summarises the significance of the findings reported in the article (on a scale ranging from useful to landmark) and the strength of the evidence (on a scale ranging from inadequate to exceptional).')).toBeVisible();
}

export const ReviewDoi: Story = {
  args: {
    content: `# This is a review in markdown

    With some body *emphasised*`,
    doi: '10.7554/eLife.81090.sa0',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ReviewAssessmentAndDoi: Story = {
  args: {
    content: `# This is a review in markdown

    With some body *emphasised*`,
    isAssessment: true,
    peerReviewUrl: '#',
    doi: '10.7554/eLife.81090.sa0',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ReviewBlockQuote: Story = {
  args: {
    content: `# This is a review in markdown

  > With some body *emphasised*

  Some other comments here reference the quote above`,
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ElifeAssessmentSingleTermList: Story = {
  args: {
    content: 'This is a review that is fundamental to everything',
    isAssessment: true,
    peerReviewUrl: '#',
    doi: '10.7554/eLife.81090.sa0',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ElifeAssessmentSingleTermListMultipleTerms: Story = {
  args: {
    content: 'This is a review that is important and fundamental to everything',
    isAssessment: true,
    peerReviewUrl: '#',
    doi: '10.7554/eLife.81090.sa0',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};

export const ElifeAssessmentMultipleTermList: Story = {
  args: {
    content: 'This is a review that is exceptional and fundamental to everything',
    isAssessment: true,
    peerReviewUrl: '#',
    doi: '10.7554/eLife.81090.sa0',
  },
  play: async ({ canvasElement }) => {
    await collapseTest(canvasElement);
  },
};
