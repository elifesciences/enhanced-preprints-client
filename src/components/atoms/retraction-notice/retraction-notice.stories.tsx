import { type Meta, type StoryObj } from '@storybook/react';

import { RetractionNotice } from './retraction-notice';

const meta: Meta<typeof RetractionNotice> = {
  title: 'Atoms/Retraction Notice',
  component: RetractionNotice,
};

export default meta;
type Story = StoryObj<typeof RetractionNotice>;

export const RetractionNoticeComponent: Story = {
  args: {
    url: 'www.google.com',
  },
};
