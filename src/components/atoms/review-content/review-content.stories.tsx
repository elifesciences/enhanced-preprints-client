import { Meta, StoryObj } from '@storybook/react';
import { ReviewContent } from './review-content';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof ReviewContent> = {
  title: 'Atoms/Review Content',
  component: ReviewContent,
};

export default meta;
type Story = StoryObj<typeof ReviewContent>;

export const ReviewDoi: Story = {
  args: {
    content: `# This is a review in markdown

    With some body *emphasised*`,
    doi: '10.7554/eLife.81090.sa0',
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
    const canvas = within(canvasElement);
    await canvas.findByText('Read more about this assessment');

    await userEvent.click(canvas.getByText('Read more about this assessment'));
    await expect(canvas.getByText('Show less')).toBeInTheDocument();
  }
};

export const ReviewBlockQuote: Story = {
  args: {
    content: `# This is a review in markdown

  > With some body *emphasised*

  Some other comments here reference the quote above`,
  },
};
