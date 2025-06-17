import { Meta, StoryObj } from '@storybook/react';

import { RetractionNotice } from './retraction-notice';

const meta: Meta<typeof RetractionNotice> = {
  title: 'Atoms/Retraction Notice',
  component: RetractionNotice,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof RetractionNotice>;

export const RetractionNoticeComponent: Story = {
  args: {
    url: 'www.google.com',
  },
};
