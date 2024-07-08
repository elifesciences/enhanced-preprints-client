import { Meta, StoryObj } from '@storybook/react';
import { ReviewContent } from './review-content';

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
};

export const ReviewBlockQuote: Story = {
  args: {
    content: `# This is a review in markdown

  > With some body *emphasised*

  Some other comments here reference the quote above`,
  },
};
