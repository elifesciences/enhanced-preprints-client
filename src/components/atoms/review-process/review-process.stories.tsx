import { Meta, StoryObj } from '@storybook/react';
import { ReviewProcess } from './review-process';
import '../../../i18n';

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

export const NotRevisedReviewProcessWithAuthorResponse: Story = {
  args: {
    current: 1,
    authorResponse: true,
  },
};

export const RevisedReviewProcess: Story = {
  args: {
    current: 2,
  },
};
