import { Meta, StoryObj } from '@storybook/react';

import { ArticleFlag } from './article-flag';

const meta: Meta<typeof ArticleFlag> = {
  title: 'Atoms/ArticleFlag',
  component: ArticleFlag,
};
export default meta;
type Story = StoryObj<typeof ArticleFlag>;

export const MSA: Story = {
  args: {
    flagText: 'MSA',
    url: 'https://bbc.co.uk',
  },
};
