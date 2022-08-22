import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleFlag } from './article-flag';

export default {
  title: 'Atoms | ArticleFlag',
  component: ArticleFlag,
} as ComponentMeta<typeof ArticleFlag>;

const Template: ComponentStory<typeof ArticleFlag> = (args) => <ArticleFlag {...args} />;

export const MSA = Template.bind({});
MSA.args = {
  isMSA: true,
  flagText: 'MSA',
};

export const CurationLabel = Template.bind({});
CurationLabel.args = {
  isMSA: false,
  flagText: 'Curation'
};
