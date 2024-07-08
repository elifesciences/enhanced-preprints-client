import { Meta, StoryObj } from '@storybook/react';

import { ArticleFlagList } from './article-flag-list';

const meta: Meta<typeof ArticleFlagList> = {
  title: 'Molecules/ArticleFlagList',
  component: ArticleFlagList,
};

export default meta;
type Story = StoryObj<typeof ArticleFlagList>;

export const FlagList: Story = {
  args: {
    msas: ['Mad Science', 'Alchemy'],
  },
};
