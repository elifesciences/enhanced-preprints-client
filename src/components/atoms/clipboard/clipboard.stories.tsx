import { Meta, StoryObj } from '@storybook/react';
import { Clipboard } from './clipboard';

const meta: Meta<typeof Clipboard> = {
  title: 'Atoms/Clipboard',
  component: Clipboard,
};

export default meta;
type Story = StoryObj<typeof Clipboard>;

export const ClipboardContainer: Story = {
  args: {
    text: 'https://doi.org/10.7554/eLife.09560',
  },
};

export const ButtonTextClipboardContainer: Story = {
  args: {
    buttonText: 'Copy foo to clipboard',
    text: 'foo',
  },
};
