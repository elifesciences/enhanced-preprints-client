import { Meta, StoryObj } from '@storybook/react';
import { ReviewProcess } from './review-process';
import '../../../i18n';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '../../../i18n';

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
  render: (args) => <I18nextProvider i18n={i18n} defaultNS="elife"><ReviewProcess {...args} /></I18nextProvider>,
};

export const NotRevisedReviewProcessWithAuthorResponse: Story = {
  args: {
    current: 1,
    authorResponse: true,
  },
  render: (args) => <I18nextProvider i18n={i18n} defaultNS="elife"><ReviewProcess {...args} /></I18nextProvider>,
};

export const RevisedReviewProcess: Story = {
  args: {
    current: 2,
  },
  render: (args) => <I18nextProvider i18n={i18n} defaultNS="elife"><ReviewProcess {...args} /></I18nextProvider>,
};
