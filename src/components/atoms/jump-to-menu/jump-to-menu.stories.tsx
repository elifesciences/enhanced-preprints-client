import { Meta, StoryObj } from '@storybook/react';

import { JumpToMenu } from './jump-to-menu';

const meta: Meta<typeof JumpToMenu> = {
  title: 'Atoms/JumpToMenu',
  component: JumpToMenu,
};

export default meta;
type Story = StoryObj<typeof JumpToMenu>;

export const JumpMenu: Story = {
  args: {
    headings: [
      { id: 's1', text: 'heading 1' },
      { id: 's2', text: 'heading 2' },
      { id: 's3', text: 'heading 3' },
    ],
  },
};
