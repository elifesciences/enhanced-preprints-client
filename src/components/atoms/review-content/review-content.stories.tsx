import { Meta, StoryObj } from '@storybook/react';
import { ReviewContent } from './review-content';
import '../../../i18n';

const meta: Meta<typeof ReviewContent> = {
  title: 'Atoms/Review Content',
  component: ReviewContent,
};

export default meta;
type Story = StoryObj<typeof ReviewContent>;

export const ReviewDoi: Story = {
  args: {
    content: 'This is a review to say that this article is alright',
    doi: '10.7554/eLife.81090.sa0',
  },
};

export const ReviewWithHtml: Story = {
  args: {
    content: 'This is a review to say that this article is <strong>awesome</strong>',
    doi: '10.7554/eLife.81090.sa0',
  },
};

export const ReviewBlockQuote: Story = {
  args: {
    content: `This is a review
    <blockquote>with a quote</blockquote>`,
  },
};
