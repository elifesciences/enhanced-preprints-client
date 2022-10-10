import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockContent } from '../article-content/mock-content';
import { Abstract } from './abstract';

export default {
  title: 'Atoms/Abstract',
  component: Abstract,
} as ComponentMeta<typeof Abstract>;

const Template: ComponentStory<typeof Abstract> = (args) => (
  <Abstract {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content: mockContent,
};
