import { StoryFn, Meta } from '@storybook/react';

import { JumpToMenu } from './jump-to-menu';

export default {
  title: 'Atoms/JumpToMenu',
  component: JumpToMenu,
} as Meta<typeof JumpToMenu>;

const Template: StoryFn<typeof JumpToMenu> = (args) => <JumpToMenu {...args} />;

export const JumpMenu = Template.bind({});
JumpMenu.args = {
  headings: [
    { id: 's1', text: 'heading 1' },
    { id: 's2', text: 'heading 2' },
    { id: 's3', text: 'heading 3' },
  ],
};
