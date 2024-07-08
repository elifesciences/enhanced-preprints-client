import { Meta, StoryObj } from '@storybook/react';

import { PreviousVersionWarning } from './previous-version-warning';

const meta: Meta<typeof PreviousVersionWarning> = {
  title: 'Atoms/Previous Version Warning',
  component: PreviousVersionWarning,
};

export default meta;
type Story = StoryObj<typeof PreviousVersionWarning>;

export const PreviousVersionWarningComponent: Story = {
  args: {
    url: 'www.google.com',
  },
};
