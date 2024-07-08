import { Meta, StoryObj } from '@storybook/react';
import { ReviewProcess } from './review-process';

const meta: Meta<typeof ReviewProcess> = {
  title: 'Atoms/Review Process',
  component: ReviewProcess,
};

export default meta;
type Story = StoryObj<typeof ReviewProcess>;

export const NotRevisedReviewProcess: Story = {
  args: {
    current: 1,
  },
};

export const RevisedReviewProcess: Story = {
  args: {
    current: 2,
  },
};
